---
title: "Prompt Engineering Basics: Write Prompts That Get Better Answers"
date: 2026-10-13
description: "A complete beginner-to-practitioner guide to writing AI prompts: the five-part formula, proven techniques, templates, common mistakes and a testing routine."
labels: ["Artificial Intelligence", "Prompt Engineering"]
---

Most disappointing AI answers don't come from a weak model. They come from a vague request. A language model can't read your mind, see your screen or remember the meeting you were in this morning. It only has the words you typed, and if those words are thin, the answer will be generic.

The good news is that writing better prompts is a learnable skill, and the basics take an afternoon to pick up. This guide walks through a simple structure you can use for almost any task, the techniques that make the biggest difference, ready-to-copy templates, the mistakes to avoid, and a way to test and improve your prompts over time.

## Key takeaways

- A good prompt gives the model a role, a task, context, a format and constraints.
- Specific beats clever. Detail about your situation matters more than magic phrases.
- Examples are the fastest way to show what "good" looks like.
- Treat the first answer as a draft and refine it in follow-up messages.
- Always verify facts, numbers and quotes before relying on them.
- Save prompts that work so you never start from scratch twice.

## What prompt engineering actually is

"Prompt engineering" sounds technical, but at its core it's clear communication with a system that takes your words literally and has no background knowledge of your situation. If you've ever briefed a freelancer, delegated a task to a new colleague or written a good ticket for a developer, you already have the instincts. The difference is that a person will often ask clarifying questions, while a model will usually just guess and proceed.

That guessing is where most bad outputs come from. When you leave out the audience, the model assumes a general one. When you leave out the format, it picks one. When you leave out the goal, it settles for the most common version of the task. Your job is to remove as many of those guesses as you reasonably can.

## The five-part prompt

When a task matters, build your prompt from these five parts, in this order.

### 1. Role

Tell the model who it should be. "You are an experienced HR manager" or "You are a patient math tutor for high-school students" changes vocabulary, depth and tone. A role isn't a magic spell, but it sets expectations about expertise and voice.

### 2. Task

State the one thing you want done, using a clear verb: summarize, compare, rewrite, classify, draft, critique, outline. If you have two tasks, consider sending two prompts. Models do best when the request has a single, obvious goal.

### 3. Context

This is the part people skip, and it's the part that matters most. Who is this for? What's the background? What have you already tried? What does success look like? Two or three sentences of real context usually improve a result more than any other change.

### 4. Format

Say how the answer should look: a bulleted list, a table with specific columns, a 150-word email, JSON with certain fields, three options ranked by effort. If you don't specify, you'll get whatever the model finds most typical.

### 5. Constraints

Set boundaries: word count, reading level, tone, things to avoid, sources to rely on. "Use plain language, no jargon, and don't mention pricing" prevents a whole round of revisions.

## A before-and-after example

Here's a weak prompt:

```
Write something about our new product.
```

The model has to invent the product, the audience, the length, the tone and the purpose. You'll get a bland paragraph of marketing filler.

Now the same request with the five parts:

```
You are a marketing writer for a small accounting software company.

Task: Write a 100-word announcement for our new invoice-reminder feature.

Context: Our readers are freelancers who hate chasing late payments.
The feature automatically sends polite reminders at 7, 14 and 30 days
after an invoice is overdue. It's included in all paid plans.

Format: One short paragraph followed by a single call-to-action sentence.

Constraints: Friendly, plain language, no jargon, no exclamation marks.
```

The second version tells the model who it is, who it's writing for, what the feature does, how long to go and how to sound. You'll usually get something close to usable on the first try, and the revisions that follow are small.

## Seven techniques that make a real difference

### Show an example (few-shot prompting)

One of the most reliable improvements is to include one to three examples of what you want. If you're asking for product descriptions, paste in one you love and say "match this style and length." Models are excellent at pattern matching, so a sample communicates tone, structure and level of detail faster than a paragraph of instructions.

### Separate instructions from material

When you paste in text to be processed, mark where it starts and ends. Delimiters like triple quotes, XML-style tags or a line of dashes help the model know what's an instruction and what's content.

```
Summarize the article below in three bullet points for a busy executive.

<article>
[paste text here]
</article>
```

This also reduces the chance that instructions hidden inside pasted text get mistaken for your own.

### Ask for reasoning on complex tasks

For analysis, planning or anything with several steps, ask the model to work through the problem before answering: "Think through this step by step, then give your recommendation." This tends to improve accuracy on tasks that involve logic, math or trade-offs. For simple tasks it just adds length, so use it where it earns its keep.

### Define the output structure

If you'll feed the answer into a spreadsheet, a document template or another tool, specify the structure exactly. For example: "Return a table with columns Task, Owner, Due date and Risk level." The more precisely you describe the shape, the less cleanup you do afterward.

### Give the model permission to say it doesn't know

Add a line such as "If the information isn't in the text I provided, say so instead of guessing." This reduces confident invention, which is one of the most common problems with AI-generated content.

### Ask for options, then choose

Instead of "write a headline," try "write five headlines in different styles: informative, curious, urgent, plain and playful." Choosing among options is easier than fixing a single mediocre one, and you'll often combine ideas.

### Iterate in follow-ups

Treat the first reply as a draft. Respond with specific directions: "Shorter, and lead with the benefit," "Make the tone warmer," "Explain it as if I'm new to the topic," "Add a concrete example in the second paragraph." A conversation of three or four refinements usually beats a single perfect prompt.

## Ready-to-use templates

### Summarizing a document

```
You are an analyst preparing a briefing for a busy director.
Summarize the document below in no more than 150 words.
Start with the main conclusion, then list the three most important
supporting points, then note any risks or open questions.
If something is unclear in the text, say so rather than guessing.

<document>
[paste here]
</document>
```

### Drafting a professional email

```
Write an email from me to [recipient and relationship].
Purpose: [what I need].
Key points to include: [bullets].
Tone: [warm / formal / direct].
Length: under 120 words.
End with a clear next step and a suggested date.
```

### Explaining something difficult

```
Explain [topic] to someone with [background level].
Use one everyday analogy and one concrete example.
Keep it under 250 words and avoid jargon. If you must use a technical
term, define it in a short phrase.
```

### Critiquing your own work

```
You are a tough but fair editor. Review the draft below.
Give me the three biggest weaknesses, with a specific suggestion for
each. Don't rewrite the draft. Then tell me what's working well.

<draft>
[paste here]
</draft>
```

## Common mistakes and how to fix them

**Being vague about the audience.** "Write a guide to budgeting" could mean a teenager or a CFO. Name the reader.

**Stacking too many tasks.** A prompt that asks for a summary, a critique, a rewrite and a slide outline will do all four poorly. Split it up.

**Contradicting yourself.** "Be extremely detailed but keep it under 50 words" forces the model to choose. Make sure your constraints agree.

**Forgetting the format.** If you need a table, ask for a table.

**Accepting the first answer.** The first response is a starting point, not a verdict on the tool.

**Pasting sensitive data.** Don't put passwords, customer records or confidential documents into tools your organization hasn't approved. Replace names and numbers with placeholders when you can.

**Trusting without checking.** Models can produce confident statements that are wrong, including invented sources and statistics. Anything that matters should be verified against a reliable source.

## How to test and improve a prompt

If you use a prompt repeatedly, such as a weekly report or a customer reply template, it's worth improving deliberately.

1. **Pick three real examples** of the input you'll typically give it.
2. **Run the prompt on each one** and note where the output disappoints you.
3. **Change one thing at a time**: add context, tighten the format, include an example. Changing five things at once makes it impossible to know what helped.
4. **Re-run on all three inputs** and compare.
5. **Save the best version** with a note on what you changed and why.

Over a few weeks, this habit turns scattered prompts into a small library of dependable tools.

## A pre-send checklist

Before you hit enter on an important prompt, check:

- Does it say who the model should be?
- Is there exactly one clear task?
- Have I given the background a smart stranger would need?
- Did I specify the format and length?
- Have I listed what to avoid?
- Is there anything confidential I should remove?
- Do I plan to verify the facts in the answer?

## Frequently asked questions

**Do I need to say "please" or use special phrases?** No. Clear, specific instructions matter far more than politeness markers or trendy wording. Being courteous is fine, but it won't change the quality much.

**Is longer always better?** No. Longer prompts help when the extra words are useful context. Padding and repetition don't help. Aim for complete, not lengthy.

**Why does the same prompt give different answers each time?** Most models include some randomness, so outputs vary. If you need consistency, give strict format instructions and examples, and use any setting your tool offers for lowering variability.

**Will prompts that work today work forever?** Models change. Keep your prompts in a library and retest them occasionally, especially after a major update.

**Can AI replace my own thinking?** It can speed up drafting, structuring and exploring, but the judgment is yours. The best results come from people who use AI to think faster, not to stop thinking.

## Your next step

Pick one task you do every week, whether that's an email, a summary or a meeting agenda. Write it as a five-part prompt, run it, refine it twice, and save the final version somewhere you can find it. Next week, reuse it and improve it again. That small loop is how prompt skills compound, and it's the start of your own prompt library.
