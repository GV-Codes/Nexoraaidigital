---
title: "Cleaning Messy Data: A Practical Checklist"
date: 2026-11-06
description: "The unglamorous work that makes every later step trustworthy, in a checklist you can reuse."
labels: ["Data Analytics"]
---

Real data is messy. Dates come in three formats, names have trailing spaces, and someone typed "N/A" where a number should be. Analysts spend a large share of their time on this, and for good reason: bad inputs ruin good analysis.

## Before you start

**Keep the raw file untouched.** Work on a copy so you can always go back.

## The checklist

- **Duplicates:** are any rows repeated by mistake?
- **Missing values:** how many are blank, and does a blank mean zero, unknown or not applicable?
- **Inconsistent text:** "USA," "U.S.A." and "United States" should be one value. Watch capitalization and stray spaces.
- **Date formats:** make sure every date is a real date, not text.
- **Data types:** numbers stored as text won't sum properly.
- **Units and scale:** dollars versus thousands of dollars, kilograms versus pounds.
- **Outliers:** unusual values may be errors, or may be the most interesting rows in the file. Investigate before deleting.

## Keep a change log

Write down every cleaning step: what you changed, how many rows it affected and why. Future you, and anyone checking your work, will be grateful.

## Check your counts

Compare row counts and totals before and after cleaning. If a number moved, make sure you know why.

## Try it today

Open a dataset you use often and run through the checklist. Note how many problems you find in ten minutes.
