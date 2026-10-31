import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parse as parseYaml } from "yaml";
import { marked } from "marked";

const BLOG_ID = process.env.BLOGGER_BLOG_ID;
const CLIENT_ID = process.env.BLOGGER_CLIENT_ID;
const CLIENT_SECRET = process.env.BLOGGER_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.BLOGGER_REFRESH_TOKEN;
const PUBLISH_NEW = String(process.env.PUBLISH_NEW_POSTS || "false").toLowerCase() === "true";
const API = "https://www.googleapis.com/blogger/v3";
const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "content", "posts");
const MARKER_PREFIX = "github-sync:";

for (const [name, value] of Object.entries({
  BLOGGER_BLOG_ID: BLOG_ID,
  BLOGGER_CLIENT_ID: CLIENT_ID,
  BLOGGER_CLIENT_SECRET: CLIENT_SECRET,
  BLOGGER_REFRESH_TOKEN: REFRESH_TOKEN,
})) {
  if (!value) throw new Error(`Missing required GitHub Actions secret/environment variable: ${name}`);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getAccessToken() {
  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    refresh_token: REFRESH_TOKEN,
    grant_type: "refresh_token",
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Google OAuth token refresh failed (${response.status}): ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

let accessToken = await getAccessToken();

async function api(endpoint, { method = "GET", body, params = {} } = {}) {
  const url = new URL(`${API}/blogs/${BLOG_ID}/${endpoint}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, String(value));
  }

  let lastError;
  for (let attempt = 0; attempt < 7; attempt++) {
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401 && attempt < 6) {
      accessToken = await getAccessToken();
      continue;
    }

    const data = await response.json().catch(() => ({}));
    if (response.ok) return data;

    const reason = data?.error?.errors?.[0]?.reason || "";
    const retryable =
      response.status === 429 ||
      response.status >= 500 ||
      (response.status === 403 && /rateLimit|userRateLimit/i.test(reason));

    if (!retryable || attempt === 6) {
      throw new Error(`Blogger API failed (${response.status}): ${JSON.stringify(data)}`);
    }

    const retryAfter = Number(response.headers.get("retry-after"));
    const exponential = Math.min(60000, 2000 * (2 ** attempt));
    const jitter = Math.floor(Math.random() * 1000);
    const waitMs = retryAfter > 0 ? retryAfter * 1000 : exponential + jitter;
    console.warn(`Blogger rate limit/server error (${response.status}); retry ${attempt + 1}/6 in ${Math.ceil(waitMs / 1000)}s`);
    await sleep(waitMs);
  }
  throw lastError || new Error("Blogger API request failed after retries");
}

async function listAllPosts() {
  const all = [];
  for (const status of ["LIVE", "DRAFT", "SCHEDULED"]) {
    let pageToken;
    do {
      const result = await api("posts", {
        params: { status, maxResults: 500, pageToken },
      });
      all.push(...(result.items || []));
      pageToken = result.nextPageToken;
      await sleep(700);
    } while (pageToken);
  }
  return all;
}

function parseMarkdown(raw, filename) {
  const normalized = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const match = normalized.match(/^---[ \t]*\n([\s\S]*?)\n---[ \t]*(?:\n|$)/);
  let meta = {};
  let markdown = normalized;
  if (match) {
    meta = parseYaml(match[1]) || {};
    markdown = normalized.slice(match[0].length);
  }
  if (!meta || typeof meta !== "object" || Array.isArray(meta)) {
    throw new Error(`Invalid YAML front matter in ${filename}`);
  }
  const title = String(meta.title || path.basename(filename, ".md")).trim();
  const labelsRaw = meta.labels ?? [];
  const labels = (Array.isArray(labelsRaw) ? labelsRaw : String(labelsRaw).split(","))
    .map((label) => String(label).trim())
    .filter(Boolean);
  const marker = `${MARKER_PREFIX}${path.basename(filename, ".md")}`;
  if (!labels.includes(marker)) labels.push(marker);

  const content = marked.parse(markdown, { async: false });
  const summary = meta.summary ? String(meta.summary) : "";
  const image = meta.image ? String(meta.image) : "";
  const html = [
    summary ? `<p>${escapeHtml(summary)}</p>` : "",
    image && /^https?:\/\//i.test(image) ? `<p><img src="${escapeAttribute(image)}" alt="${escapeAttribute(title)}"></p>` : "",
    content,
  ].filter(Boolean).join("\n");

  const date = meta.date ? new Date(meta.date) : new Date();
  if (Number.isNaN(date.getTime())) throw new Error(`Invalid date in ${filename}: ${meta.date}`);

  return {
    title,
    content: html,
    labels,
    published: date.toISOString(),
    updated: new Date().toISOString(),
    marker,
    filename,
  };
}

function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeAttribute(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

async function readMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await readMarkdownFiles(full));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) files.push(full);
  }
  return files.sort();
}

function findExisting(posts, article) {
  // Marker match is authoritative. Title fallback adopts posts created by an earlier
  // sync version that did not yet attach the marker, reducing duplicate risk.
  return posts.find((post) => (post.labels || []).includes(article.marker))
    || posts.find((post) => String(post.title || "").trim().toLowerCase() === article.title.toLowerCase());
}

const files = await readMarkdownFiles(POSTS_DIR);
console.log(`Found ${files.length} Markdown articles in content/posts.`);
const existingPosts = await listAllPosts();
console.log(`Found ${existingPosts.length} existing Blogger posts across LIVE, DRAFT and SCHEDULED.`);
const claimedIds = new Set();

for (const file of files) {
  const relative = path.relative(ROOT, file).split(path.sep).join("/");
  const article = parseMarkdown(await fs.readFile(file, "utf8"), file);
  let existing = findExisting(existingPosts, article);
  if (existing && claimedIds.has(existing.id)) existing = undefined;

  if (existing) {
    claimedIds.add(existing.id);
    const payload = {
      title: article.title,
      content: article.content,
      labels: article.labels,
      published: existing.published || article.published,
    };
    // Blogger's update endpoint preserves the post's current publication/draft state.
    await api(`posts/${existing.id}`, { method: "PUT", body: payload });
    console.log(`Updated (${existing.status || "existing"}): ${article.title}`);
  } else {
    const payload = {
      title: article.title,
      content: article.content,
      labels: article.labels,
      published: article.published,
    };
    const created = await api("posts", {
      method: "POST",
      params: { isDraft: !PUBLISH_NEW },
      body: payload,
    });
    console.log(`${PUBLISH_NEW ? "Published" : "Created draft"}: ${article.title}`);
    if (created?.id) {
      existingPosts.push({ ...created, status: PUBLISH_NEW ? "LIVE" : "DRAFT" });
      claimedIds.add(created.id);
    }
  }

  // Keep calls comfortably below burst limits; 429s are retried with backoff above.
  await sleep(1200);
}

console.log("Blogger sync completed. Source deletions do not delete Blogger posts.");
