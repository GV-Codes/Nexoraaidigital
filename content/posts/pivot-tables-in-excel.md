---
title: "Pivot Tables in Excel: Your First Five Minutes"
date: 2026-11-07
description: "Summarize thousands of rows by dragging a few fields, no formulas required."
labels: ["Data Analytics", "Excel"]
---

A pivot table turns a long list of rows into a summary, and you build it by dragging, not coding. Once you've made one, you'll wonder how you managed without.

## Get your data ready

Your data should sit in a tidy table: one header row, no blank rows or columns, and one record per row. Something like date, region, product, sales.

## Build one

1. Click anywhere in the data.
2. Go to **Insert > PivotTable** and click OK.
3. Drag **Region** into **Rows**.
4. Drag **Sales** into **Values**. Excel adds them up for you.

You now have total sales by region.

## Slice it further

- Drag **Product** into **Columns** to compare products across regions.
- Drag **Date** into **Rows** and group it by months or quarters.
- Drag a field into **Filters** to look at one segment at a time.

## Change the calculation

Click the field in Values, choose **Value Field Settings**, and switch from Sum to Count, Average, Max or Min.

## Remember to refresh

A pivot table doesn't update on its own when your data changes. Right-click it and choose **Refresh**.

## Try it today

Take a spreadsheet you already have, build a pivot table of sales (or any number) by category, then add one more field to answer a second question.
