import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';

const BLOG_ID = process.env.BLOGGER_BLOG_ID;
const CLIENT_ID = process.env.BLOGGER_CLIENT_ID;
const CLIENT_SECRET = process.env.BLOGGER_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.BLOGGER_REFRESH_TOKEN;
const POSTS_DIR = path.resolve('content/posts');

for (const [key, value] of Object.entries({ BLOGGER_BLOG_ID: BLOG_ID, BLOGGER_CLIENT_ID: CLIENT_ID, BLOGGER_CLIENT_SECRET: CLIENT_SECRET, BLOGGER_REFRESH_TOKEN: REFRESH_TOKEN })) {
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
}

async function getAccessToken() {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) throw new Error(`Google OAuth failed (${response.status}): ${JSON.stringify(data)}`);
  return data.access_token;
}

const accessToken = await getAccessToken();
const apiBase = `https://www.googleapis.com/blogger/v3/blogs/${encodeURIComponent(BLOG_ID)}`;

async function api(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!response.ok) throw new Error(`Blogger API failed (${response.status}): ${JSON.stringify(data)}`);
  return data;
}

async function getAllPosts() {
  const posts = [];
  let pageToken;
  do {
    const url = new URL(`${apiBase}/posts`);
    url.searchParams.set('maxResults', '500');
    url.searchParams.set('status', 'live');
    if (pageToken) url.searchParams.set('pageToken', pageToken);
    const data = await api(url);
    posts.push(...(data.items || []));
    pageToken = data.nextPageToken;
  } while (pageToken);
  return posts;
}

function parseFrontMatter(source, fileName) {
  let frontMatter = {};
  let body = source;
  const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);
  if (match) {
    body = source.slice(match[0].length);
    for (const line of match[1].split(/\r?\n/)) {
      const separator = line.indexOf(':');
      if (separator < 0) continue;
      const key = line.slice(0, separator).trim();
      let value = line.slice(separator + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
      frontMatter[key] = value;
    }
  }
  const title = frontMatter.title || path.basename(fileName, '.md').replace(/[-_]/g, ' ');
  const labels = (frontMatter.labels || '').split(',').map((item) => item.trim()).filter(Boolean);
  const published = /^\d{4}-\d{2}-\d{2}$/.test(frontMatter.date || '') ? `${frontMatter.date}T09:00:00Z` : undefined;
  return { title, labels, published, body: body.trim() };
}

const fileNames = (await readdir(POSTS_DIR)).filter((name) => name.toLowerCase().endsWith('.md')).sort();
const currentPosts = await getAllPosts();
const byTitle = new Map();
for (const post of currentPosts) {
  const key = String(post.title || '').trim().toLocaleLowerCase();
  if (key && !byTitle.has(key)) byTitle.set(key, post);
}

let created = 0;
let updated = 0;
for (const fileName of fileNames) {
  const source = await readFile(path.join(POSTS_DIR, fileName), 'utf8');
  const parsed = parseFrontMatter(source, fileName);
  const existing = byTitle.get(parsed.title.trim().toLocaleLowerCase());
  const resource = {
    title: parsed.title,
    content: marked.parse(parsed.body),
    labels: parsed.labels,
  };
  if (parsed.published) resource.published = parsed.published;

  if (existing?.id) {
    await api(`${apiBase}/posts/${encodeURIComponent(existing.id)}`, {
      method: 'PUT',
      body: JSON.stringify(resource),
    });
    updated++;
    console.log(`Updated: ${parsed.title}`);
  } else {
    await api(`${apiBase}/posts/`, {
      method: 'POST',
      body: JSON.stringify(resource),
    });
    created++;
    console.log(`Published: ${parsed.title}`);
  }
}
console.log(`Blogger sync complete. Published ${created} new post(s); updated ${updated} existing post(s).`);
console.log('Markdown files removed from GitHub are not deleted from Blogger automatically.');
