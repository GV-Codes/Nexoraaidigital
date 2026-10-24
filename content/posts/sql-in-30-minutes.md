---
title: "SQL in 30 Minutes: The Five Queries You Actually Need"
date: 2026-10-11
description: "A hands-on SQL tutorial with a small sample dataset and exact results for SELECT, WHERE, ORDER BY, GROUP BY and JOIN, plus common mistakes, practice exercises and an FAQ."
labels: ["Data Analytics", "SQL"]
---

SQL (Structured Query Language) is the standard way to ask questions of data stored in a database, and it's one of the most valuable skills in analytics, business analysis, marketing, finance and software. The good news is that you don't need to learn the whole language to be useful. A handful of building blocks answers most everyday questions.

In this tutorial, we'll work with a small sample dataset so you can see the exact results of every query. By the end, you'll know how to select and filter data, sort it, summarize it and combine tables, which covers a large share of real-world analysis.

## Key takeaways

- Five building blocks cover most daily work: SELECT/FROM, WHERE, ORDER BY with LIMIT, GROUP BY and JOIN.
- Read queries as a sentence: from these tables, keep these rows, group like this, show these columns, sort this way.
- JOINs decide which rows survive. Choose the type deliberately.
- Many errors come from joins that multiply rows or from filtering at the wrong stage.
- Practice on small data where you can check answers by hand.

## The sample data

Imagine two tables.

**customers**

| customer_id | name | country |
| --- | --- | --- |
| 1 | Ana | USA |
| 2 | Ben | UK |
| 3 | Chloe | USA |
| 4 | Dev | India |

**orders**

| order_id | customer_id | order_date | amount |
| --- | --- | --- | --- |
| 101 | 1 | 2026-01-05 | 120.00 |
| 102 | 1 | 2026-02-11 | 80.00 |
| 103 | 2 | 2026-02-14 | 250.00 |
| 104 | 3 | 2026-03-01 | 60.00 |
| 105 | 3 | 2026-03-20 | 150.00 |
| 106 | 1 | 2026-03-22 | 200.00 |

Notice that Dev has no orders. That detail will matter when we get to joins.

## 1. SELECT and FROM: look at your data

Every query starts by saying which columns you want and where they live.

```
SELECT order_id, order_date, amount
FROM orders;
```

This returns those three columns for all six orders. To see every column, use `SELECT *`, which is handy for exploring but best avoided in finished reports because it returns more than you need and can break if the table changes.

You can also rename columns in the output with `AS`:

```
SELECT order_id, amount AS order_value
FROM orders;
```

## 2. WHERE: filter rows

`WHERE` keeps only the rows that meet a condition.

```
SELECT order_id, amount
FROM orders
WHERE amount > 100;
```

Result: orders 101 (120), 103 (250), 105 (150) and 106 (200). Four rows.

You can combine conditions:

```
SELECT order_id, amount
FROM orders
WHERE amount > 100
  AND order_date >= '2026-02-01';
```

Now only orders from February onward that are above 100 remain: 103, 105 and 106.

Useful operators include `=`, `<>` (not equal), `>`, `<`, `BETWEEN`, `IN ('USA', 'UK')`, `LIKE 'A%'` for pattern matching, and `IS NULL` for missing values. Use parentheses when mixing `AND` and `OR` so the logic is unambiguous.

## 3. ORDER BY and LIMIT: sort and trim

```
SELECT order_id, amount
FROM orders
ORDER BY amount DESC
LIMIT 3;
```

Result: 103 (250), 106 (200), 105 (150). `DESC` sorts from highest to lowest, while `ASC` (the default) sorts from lowest to highest.

One note: the keyword for limiting rows varies by database. MySQL, PostgreSQL and SQLite use `LIMIT`. SQL Server uses `SELECT TOP 3`, and Oracle uses `FETCH FIRST 3 ROWS ONLY`. The idea is the same.

## 4. GROUP BY: summarize

This is where SQL starts to feel powerful. `GROUP BY` collapses rows into groups, and aggregate functions calculate something for each group.

```
SELECT customer_id,
       COUNT(*)    AS orders,
       SUM(amount) AS total_spent
FROM orders
GROUP BY customer_id;
```

Result:

| customer_id | orders | total_spent |
| --- | --- | --- |
| 1 | 3 | 400.00 |
| 2 | 1 | 250.00 |
| 3 | 2 | 210.00 |

The main aggregate functions are `COUNT`, `SUM`, `AVG`, `MIN` and `MAX`.

### Filtering groups with HAVING

`WHERE` filters rows before grouping. `HAVING` filters groups after.

```
SELECT customer_id, SUM(amount) AS total_spent
FROM orders
GROUP BY customer_id
HAVING SUM(amount) > 300;
```

Only customer 1 appears, with 400. A simple rule: if your condition involves an aggregate such as SUM, it belongs in `HAVING`.

## 5. JOIN: combine tables

Real questions usually need more than one table. A join links rows using a shared column, here `customer_id`.

```
SELECT c.name,
       c.country,
       SUM(o.amount) AS total_spent
FROM orders o
INNER JOIN customers c
  ON c.customer_id = o.customer_id
GROUP BY c.name, c.country
ORDER BY total_spent DESC;
```

Result:

| name | country | total_spent |
| --- | --- | --- |
| Ana | USA | 400.00 |
| Ben | UK | 250.00 |
| Chloe | USA | 210.00 |

Now the report shows names instead of ID numbers. Notice that Dev is missing. An `INNER JOIN` keeps only rows that match in both tables, and Dev has no orders.

### LEFT JOIN: keep everyone on the left

```
SELECT c.name,
       COALESCE(SUM(o.amount), 0) AS total_spent
FROM customers c
LEFT JOIN orders o
  ON o.customer_id = c.customer_id
GROUP BY c.name
ORDER BY total_spent DESC;
```

Now Dev appears with 0. `LEFT JOIN` keeps every row from the left table and fills in `NULL` where no match exists, and `COALESCE` replaces that `NULL` with a default.

A handy variation finds what's missing, such as customers who never ordered:

```
SELECT c.name
FROM customers c
LEFT JOIN orders o
  ON o.customer_id = c.customer_id
WHERE o.order_id IS NULL;
```

## Reading a query as a sentence

SQL is written in one order but logically processed in another. Roughly, the database does this:

1. **FROM / JOIN:** gather and combine the tables
2. **WHERE:** filter rows
3. **GROUP BY:** form groups
4. **HAVING:** filter groups
5. **SELECT:** choose and calculate columns
6. **ORDER BY / LIMIT:** sort and trim

Keeping this order in mind explains many puzzling errors, for example why you can't use a column alias from `SELECT` inside `WHERE` in most databases.

## Common mistakes

**Row multiplication in joins.** If one customer has three orders, a join returns three rows for that customer. Add up a customer-level value, such as a credit limit, after joining and you'll count it three times. When totals look too high, check whether a join is duplicating rows.

**Using WHERE when you need HAVING.** Aggregates can't go in `WHERE`.

**Forgetting NULL behaves differently.** `NULL = NULL` isn't true. Use `IS NULL` and `IS NOT NULL`.

**Selecting columns that aren't grouped.** Most databases require every non-aggregated column in `SELECT` to appear in `GROUP BY`.

**Filtering a LEFT JOIN in WHERE.** Putting a condition on the right-hand table in `WHERE` can silently turn a left join into an inner join. Put it in the `ON` clause instead if you want to keep unmatched rows.

**Trusting results without checking.** Compare totals to a number you know. If a query says total sales were ten times last year's, suspect the query first.

## Tips for writing readable SQL

- Put each major clause on its own line.
- Use short, meaningful aliases (`c` for customers, `o` for orders).
- Name calculated columns with `AS`.
- Add comments with `--` to explain why, not what.
- Build queries in steps: start simple, check the result, then add one piece at a time.

## Practice exercises

Using the sample data, try to write queries that:

1. List all orders placed in March 2026.
2. Show the average order amount.
3. Find the customer with the most orders.
4. Show total sales by country.
5. List customers whose total spending is below 220.

Work them out by hand first. With such small tables, you can verify every answer.

## Frequently asked questions

**Which database should I learn on?** Any of them. PostgreSQL, MySQL and SQLite are free, and the core of SQL is the same across all of them. SQLite is the easiest to start with because it needs almost no setup.

**Is SQL case sensitive?** Keywords aren't. Table and column names may be, depending on the database. Many people write keywords in capitals for readability.

**What about subqueries and window functions?** They're the natural next step once these five feel comfortable. Window functions in particular are worth learning for rankings and running totals.

**Do I need to memorize everything?** No. Analysts look up syntax constantly. Understanding the logic matters more than remembering every keyword.

## Your next step

Download a free database tool, load a CSV of something you care about, such as expenses, workouts or sales, and ask one real question. Write the query, run it, then change one thing and predict the result before running it again. That cycle of predict, run and check is how SQL really starts to click.
