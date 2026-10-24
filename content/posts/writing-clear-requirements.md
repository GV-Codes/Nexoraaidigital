---
title: "Business Analysis Starter Kit: Writing Clear Requirements"
date: 2026-10-10
description: "A practical guide to writing requirements that teams can build and test: problem statements, user stories, acceptance criteria, non-functional requirements, templates and a review checklist."
labels: ["Business Analysis", "Requirements"]
---

Projects rarely fail because people can't build things. They fail because people build the wrong thing, or build the right thing in a way nobody expected. Unclear, incomplete or untestable requirements are one of the most common causes, and fixing them early is far cheaper than fixing them after development, when a misunderstanding has already become code, screens and training material.

This guide shows how to write requirements that everyone understands the same way. It covers how to start from the problem, how to write user stories and acceptance criteria, how to handle the requirements people forget, how to review your work and how to keep requirements healthy as a project changes. You'll also find templates you can copy straight into your own work.

## Key takeaways

- Start with the problem and the goal, not the solution.
- A good requirement is clear, specific, testable and tied to a business need.
- User stories describe value, and acceptance criteria describe "done."
- Non-functional requirements (speed, security, accessibility) matter as much as features.
- Remove vague words, or replace them with numbers.
- Review requirements with both the people who asked for them and the people who will build them.

## Start with the problem, not the solution

Many requests arrive as solutions: "We need a dashboard," "Add a button here," "Build an app." Behind each is a problem that may have a better answer. Before writing anything, answer three questions:

1. **Who** has the problem?
2. **What** are they trying to do, and what's getting in the way?
3. **Why** does it matter to the business?

"We need a dashboard" is a solution. "Sales managers spend about two hours every Monday collecting numbers from three systems for the weekly review, and the figures are often out of date" is a problem. When you understand the second statement, you can judge whether a dashboard is the right fix, or whether automating a report or changing the data source would do more good for less effort.

A simple problem statement template helps:

```
[Who] currently [does what] using [current method].
This causes [problem and impact].
Success would mean [measurable outcome].
```

## What makes a requirement good

Experienced analysts check each requirement against a few qualities:

- **Clear:** one reasonable reading, with no ambiguity.
- **Specific:** includes the detail needed to build it.
- **Testable:** someone can check, yes or no, whether it's met.
- **Necessary:** traceable to a real business need.
- **Consistent:** doesn't contradict another requirement.
- **Feasible:** possible within the project's limits.
- **Singular:** says one thing. If it contains "and," consider splitting it.

If two reasonable people could disagree about whether a requirement has been met, it isn't clear enough yet.

## The user story format

User stories keep attention on who benefits and why. A common template:

> As a **[type of user]**, I want **[a capability]**, so that **[a benefit]**.

For example:

> As a **sales manager**, I want **a weekly summary of team results**, so that **I can prepare for Monday's review in minutes instead of hours**.

The "so that" clause is the most important and most often skipped. It records why the requirement exists, which helps the team make good decisions when trade-offs appear.

Good stories tend to be **INVEST**: Independent, Negotiable, Valuable, Estimable, Small and Testable. If a story is too large to finish in one iteration, split it, for example by workflow step, by user type or by data source.

## Acceptance criteria: defining "done"

A story starts a conversation. Acceptance criteria make the outcome concrete. They can be written as a simple list:

- The summary shows revenue, deals closed and pipeline by team member.
- Data refreshes automatically every Monday at 7:00.
- The summary can be exported to PDF.
- A manager can open it on a phone.

Or in the **Given / When / Then** format, which is especially good for behavior:

```
Given a manager is logged in with access to Team A
When they open the weekly summary
Then they see revenue, deals closed and pipeline for each member of Team A
And they do not see data for other teams
```

Aim for three to eight criteria per story. Include the unhappy paths too: what happens when there's no data, when the user lacks permission, or when an input is invalid.

## The requirements people forget

Features get most of the attention, but many project problems come from missing **non-functional requirements**, which describe how well the system must work rather than what it does.

| Category | Example of a testable requirement |
| --- | --- |
| Performance | Pages load in under 3 seconds for 95% of requests |
| Availability | The system is available 99.9% of the time, excluding planned maintenance |
| Security | Passwords are stored hashed, and sessions expire after 15 minutes of inactivity |
| Accessibility | All pages meet WCAG 2.1 AA guidelines |
| Usability | A new user can complete an order in under 5 minutes without help |
| Compatibility | Works on the latest two versions of major browsers and on mobile |
| Data and privacy | Personal data is retained for no more than 24 months and can be deleted on request |
| Audit | Every change to a customer record is logged with user and timestamp |

Also remember **business rules** (for example, "discounts over 20% need manager approval"), **data requirements**, **reporting needs**, **integration points** with other systems and **transition needs** such as training and data migration.

## Words to avoid, and what to say instead

Vague language is the enemy of testing. Watch for these:

| Vague word | Ask instead |
| --- | --- |
| Fast | How many seconds, under what load? |
| User-friendly | Which task, done by whom, in how many steps? |
| Secure | Against which risks, to what standard? |
| Regularly | Daily, weekly, at what time? |
| Flexible | Flexible in which specific ways? |
| Etc. / and so on | List every item |
| As appropriate | Who decides, and by what rule? |
| Should be able to | Must it, or is it optional? |

Also look out for unclear pronouns ("it," "they"), passive statements with no actor ("the report is sent") and terms that mean different things to different teams. A short glossary helps everyone use the same words.

## A worked example: before and after

**Before:**

> The system should send customers notifications when their order status changes and should be fast and reliable.

**Problems:** which notifications, through which channels, for which statuses, how fast, and what does reliable mean?

**After:**

> **Story:** As a customer, I want to receive an email when my order ships, so that I know when to expect delivery.
>
> **Acceptance criteria:**
> - An email is sent within 5 minutes of the status changing to "Shipped."
> - The email includes the order number, carrier name, tracking link and estimated delivery date.
> - If the email fails to send, the system retries up to three times over 30 minutes and logs the failure.
> - Customers who have opted out of notifications do not receive the email.
> - The email displays correctly on mobile and desktop.

The second version can be built, tested and demonstrated, and nobody has to guess what it means.

## A simple requirements template

For each requirement or story, capture:

```
ID:
Title:
Story: As a ___, I want ___, so that ___.
Business need / goal it supports:
Priority (Must / Should / Could / Won't):
Acceptance criteria:
  -
  -
Dependencies:
Assumptions:
Out of scope:
Owner:
Status:
```

Recording **assumptions** and **out of scope** items is a quiet superpower. They surface hidden disagreements early.

## Gathering requirements well

Good requirements come from good conversations. Combine several techniques:

- **Interviews** with people who do the work, asking them to walk you through real examples.
- **Observation** of the current process, which often reveals steps nobody mentions.
- **Workshops** to align groups with conflicting views.
- **Document and data review,** including existing reports, tickets and complaints.
- **Prototypes or sketches,** which help people react to something concrete.

Ask open questions such as "What's the hardest part?" and "What happens when this goes wrong?" Then ask "Why?" a few times to reach the real need.

## Prioritizing

Not everything can be done at once. A common approach is **MoSCoW**: Must have, Should have, Could have and Won't have this time. Ask for each Must, "If we launched without this, would the release still be worth launching?" Record the reason for the priority so the decision can be explained later.

## Reviewing your requirements

Before sign-off, read them back to the person who asked for them, and to the person who will build and test them. Use this checklist:

- Is each requirement clear and singular?
- Can each one be tested with a pass or fail result?
- Are numbers used instead of vague terms?
- Does each trace to a business goal?
- Are non-functional requirements covered?
- Are error cases and edge cases considered?
- Are terms defined consistently?
- Are conflicts between requirements resolved?
- Are assumptions and exclusions recorded?
- Have the right stakeholders reviewed and agreed?

## Keeping requirements healthy as things change

Requirements aren't carved in stone, but changes should be deliberate.

- Keep one **source of truth** that everyone uses.
- Use a **change process:** what's changing, why, the impact on time, cost and risk, and who approves.
- Maintain **traceability** from business goal to requirement to test, so you can see what a change affects.
- Keep a **log of decisions** so the same debate doesn't repeat.
- Revisit priorities regularly as the business learns.

## Common mistakes

- Writing the solution instead of the need
- Mixing several requirements into one sentence
- Skipping non-functional requirements
- Using words that can't be tested
- Writing alone instead of with stakeholders
- Treating sign-off as the end of the conversation
- Ignoring the people who'll use the system every day

## Frequently asked questions

**How detailed should requirements be?** Detailed enough that the team can build and test without guessing, and no more. Complex or regulated work needs more detail than a small internal tool.

**Are user stories enough on their own?** Usually not. Stories need acceptance criteria and often supporting material such as process maps, mockups and data definitions.

**What's the difference between a requirement and a user story?** A story is one way of expressing a requirement. Requirements can also be written as formal statements ("The system shall...") or use cases.

**Who owns the requirements?** The business owner owns the need and priorities. The analyst owns the quality and clarity of the documentation. The delivery team owns how it's built.

**How do I handle stakeholders who disagree?** Bring the disagreement into the open, connect each option to the business goal, quantify trade-offs where you can, and escalate to the decision-maker if needed.

## Your next step

Take one request sitting in your inbox right now. Write the problem statement, rewrite the request as a user story, add five testable acceptance criteria, and list two assumptions. Then send it back to the requester with one question: "Did I get this right?" That single exchange can save weeks of rework.
