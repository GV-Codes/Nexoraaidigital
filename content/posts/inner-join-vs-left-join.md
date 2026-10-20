---
title: "INNER JOIN vs LEFT JOIN: The Difference in Plain Words"
date: 2026-11-08
description: "Two of the most common SQL joins, when to use each, and a classic mistake to avoid."
labels: ["SQL", "Data Analytics"]
---

Joins combine tables, but the kind of join you choose decides which rows survive. Using the same two tables as before, `customers` and `orders`, let's compare the two you'll use most.

## INNER JOIN: only the matches

```
SELECT c.name, o.order_id
FROM customers c
INNER JOIN orders o ON o.customer_id = c.customer_id;
```

You get only customers who have at least one order. Customers with no orders disappear from the results.

## LEFT JOIN: everything on the left

```
SELECT c.name, o.order_id
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.customer_id;
```

Every customer appears. If they have orders, you see them. If not, the order columns show `NULL`.

## A handy trick: find what's missing

```
SELECT c.name
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.customer_id
WHERE o.order_id IS NULL;
```

That lists customers who never ordered, which is a surprisingly useful question.

## The classic mistake

If one customer has five orders, a join returns five rows for them. Add up a customer-level number, such as a credit limit, after joining and you'll count it five times. When totals look too high, check whether a join is multiplying your rows.

## Try it today

Run both joins on a small dataset and compare the row counts. Explain out loud why they differ.
