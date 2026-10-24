---
title: "Phishing 101: How to Spot a Scam Email in 30 Seconds"
date: 2026-10-12
description: "A thorough guide to recognizing phishing emails, from quick visual checks to technical clues, with real-world scenarios, a response plan and a checklist for individuals and teams."
labels: ["Cybersecurity", "Phishing"]
---

Phishing remains one of the most common ways accounts and organizations are compromised, and the reason is simple: it targets people rather than software. A firewall can't stop you from handing over a password if you've been convinced it's the right thing to do. Industry breach reports consistently find that the human element plays a role in a majority of incidents, and phishing sits near the top of the list of entry points.

The encouraging part is that phishing relies on a small set of tricks, and a short, repeatable routine will catch most of them. This guide covers what phishing is, the 30-second check, the technical clues behind the scenes, realistic examples, what to do if you've already clicked, and how teams can build a culture that catches attacks early.

## Key takeaways

- Phishing tries to make you act quickly, without verifying.
- The 30-second check: sender, pressure, links, attachments, requests and a separate route to confirm.
- Never use the contact details inside a suspicious message to verify it.
- If you clicked or entered information, act fast: change passwords, enable multi-factor authentication and report it.
- Reporting quickly matters far more than avoiding embarrassment.

## What phishing is, and why it works

Phishing is a message designed to trick you into revealing sensitive information, installing malware or sending money. It usually imitates a trusted source: your bank, a delivery company, your IT department, a boss or a software provider you use every day.

It works because it exploits ordinary human responses. We tend to trust authority, respond to urgency, worry about losing access and want to be helpful. Attackers don't need you to be careless, only busy, distracted or caught at the wrong moment. Modern phishing emails are often well written, use accurate logos and even reference real projects or colleagues, so the old advice to "look for spelling mistakes" is no longer enough.

## The 30-second check

Run through these six steps whenever an email asks you to click, open, pay or log in.

### 1. Look at the sender's address, not just the name

Display names are easy to fake. An email might show `Support` or even `Microsoft 365 Team`, while the actual address is something like `help@m1crosoft-security.com`. Check the domain, which is everything after the @ sign. Watch for swapped letters (`paypa1`), extra words (`company-support-center`), odd endings and unfamiliar domains. On mobile, tap the sender's name to reveal the full address.

### 2. Notice the pressure

Phrases like "your account will be closed in 24 hours," "immediate action required" or "final notice" are designed to short-circuit your thinking. Legitimate organizations do send urgent messages, but they rarely demand that you act within minutes through a link in an email. Urgency is a reason to slow down, not speed up.

### 3. Hover before you click

On a computer, move your cursor over a link without clicking and look at the real destination in the corner of the window. On a phone, press and hold the link to preview it. If the text says `www.yourbank.com` but the destination is a different address, don't click. Also be careful with shortened links, which hide where they lead.

### 4. Treat unexpected attachments with suspicion

Invoices, voicemails, "shared documents," resumes and shipping labels that you weren't expecting are common carriers for malware or fake login pages. Even if the sender looks familiar, confirm with them through another channel before opening anything unexpected. Be especially wary of files that ask you to "enable macros" or "enable editing."

### 5. Watch for unusual requests

Be alert when a message asks you to do something outside normal routine: buy gift cards, change bank details for a supplier, send a password or a verification code, or keep something secret from colleagues. These are classic signs of fraud, including business email compromise, where attackers impersonate executives or vendors to redirect payments.

### 6. Go around the message

When in doubt, don't use the message to verify itself. Open the company's website by typing the address yourself, use its official app, or call the number on the back of your card or on a recent bill. If the message is real, the issue will also show up there.

## Technical clues for the curious

You don't need these for the 30-second check, but understanding them makes you sharper and helps when you report an email to a security team.

- **Reply-To mismatch.** The "from" address and the address replies go to may differ, a sign someone is hiding their real inbox.
- **Authentication results.** Email systems check records called SPF, DKIM and DMARC to see whether a message really came from the domain it claims. A failure in these checks, visible in the full message headers, is a warning sign, although passing them doesn't guarantee a message is safe, since attackers can register lookalike domains and authenticate those.
- **Lookalike domains.** Attackers register addresses that look nearly identical to the real thing, using swapped letters or look-alike characters.
- **Mismatched links.** The visible text and the true destination differ.
- **QR codes in emails or documents.** Sometimes called "quishing," these send you to a fake login page when scanned with a phone, bypassing the link-checking your computer might do.

## Common disguises and what they really want

| Disguise | What the attacker wants |
| --- | --- |
| Delivery notice | Your card details for a "redelivery fee" |
| Boss asking for a favor | Gift cards or an urgent payment |
| Shared document | Your work login credentials |
| Security alert | Your password and verification code |
| HR or payroll update | Your login, or a change to your direct deposit |
| Invoice from a vendor | A payment to a new bank account |
| Prize or refund | Personal and financial information |

## Three realistic scenarios

**The payroll update.** An email appears to come from HR, asking you to confirm your direct deposit details through a link before Friday. The link goes to a page that looks like your company login. Your check: don't use the link. Go to the HR portal directly, or ask HR through a channel you already trust.

**The CEO request.** A message that appears to come from a senior leader says, "I'm in a meeting and need you to buy gift cards for a client. I'll reimburse you. Keep this between us." Your check: the secrecy, the urgency and the unusual payment method are all red flags. Contact the leader by phone or chat to confirm, and report the email.

**The changed bank details.** A supplier you've worked with for years emails to say their bank account has changed and asks you to update it before the next payment. Your check: call the supplier using a number from your records, not from the email, and follow your company's process for changing payment details.

## If you already clicked

It happens to nearly everyone, so don't panic or hide it. Speed is what limits the damage.

1. **Stop interacting.** Close the page and don't enter anything more.
2. **Disconnect if you opened a file.** If you think you may have installed something, disconnect the device from the network and contact your IT team.
3. **Change your password** on the real site, and on any other account where you used the same one. Use a unique password for each.
4. **Turn on multi-factor authentication** on important accounts.
5. **Report it** to your IT or security team immediately. At work, quick reporting can mean the difference between a minor incident and a major one.
6. **Watch your accounts.** Check for unfamiliar logins, new email forwarding rules, and unusual transactions. If financial details were involved, contact your bank.
7. **Keep evidence.** Don't delete the original message. Your security team can learn from it.

## How to report phishing

- Use the "Report phishing" or "Report junk" button in your email program if you have one.
- At work, forward the message to your security team's reporting address, or follow your company's process.
- In the US, you can forward phishing emails to reportphishing@apwg.org and report scams at reportfraud.ftc.gov.
- Delete the message once it's been reported.

## Building a team habit

Individuals can do a lot, but organizations are stronger when everyone catches attacks together.

- **Make reporting easy and blame-free.** If people fear punishment, they'll hide mistakes, and attackers benefit.
- **Run short, regular training** with real examples rather than a long annual session.
- **Use simulated phishing tests** to practice, treating results as learning rather than a scoreboard.
- **Set up verification rules for money.** Require a second person and a call-back for any change to payment details.
- **Use multi-factor authentication everywhere,** ideally phishing-resistant methods such as passkeys or security keys.
- **Use a password manager.** It won't autofill on a fake site, which is a surprisingly useful warning.

## A quick checklist

Before clicking, ask:

- Do I recognize the sender's actual address?
- Is the message pushing me to hurry?
- Where does this link really go?
- Was I expecting this attachment?
- Is it asking for something unusual?
- Can I confirm this another way?

## Frequently asked questions

**Can I get infected just by opening an email?** It's uncommon with modern email programs, but possible in some circumstances. The much bigger risk is clicking links or opening attachments.

**Are phishing emails always full of mistakes?** No. Many are polished, and some use AI to write convincing text. Judge by the request and the sender, not the grammar.

**What if the email comes from someone I know?** Accounts get hijacked. If the message is unusual for that person, check with them through another channel.

**Is a padlock on a website proof it's safe?** No. The padlock only means the connection is encrypted. Scam sites can have one too.

**What's the difference between phishing and spear phishing?** Phishing is sent broadly. Spear phishing is targeted at a specific person or organization, using details that make it more believable.

## Your next step

Use a password manager, turn on multi-factor authentication for your email and banking, and agree with your family or team on one rule: when a message asks for money, credentials or secrecy, verify it through a separate channel. A real organization can wait five minutes.
