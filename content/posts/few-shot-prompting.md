---
title: "Show, Don't Tell: Few-Shot Prompting With Examples"
date: 2026-10-22
description: "Why a couple of examples in your prompt beat a long description, with a ready-to-copy template."
labels: ["Prompt Engineering", "Artificial Intelligence"]
---

Describing what you want in words is hard. Showing a few examples is often easier and works better. Prompt engineers call this few-shot prompting.

## The idea

A zero-shot prompt gives the task and nothing else. A few-shot prompt adds a handful of examples of the input and the output you want, then gives the model a new input to handle.

## An example

Say you want support tickets sorted into categories:

```
Classify each support ticket as Billing, Technical or Other.

Ticket: "I was charged twice this month."
Category: Billing

Ticket: "The app crashes when I open settings."
Category: Technical

Ticket: "Do you have a student discount?"
Category: Other

Ticket: "My invoice shows the wrong company name."
Category:
```

The model picks up the format and the logic without you spelling out every rule.

## Tips for better examples

- **Use two to five.** More isn't always better.
- **Vary them.** Cover different cases so the model doesn't copy one pattern.
- **Include a tricky one.** Show how you want edge cases handled.
- **Keep the format identical** across every example.
- **Label clearly** so the model can tell inputs from outputs.

## Try it today

Think of a repetitive text task, like tagging feedback or rewriting product titles. Write three examples, add a fourth input, and see whether the model gets it right.
