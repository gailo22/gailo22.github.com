---
layout: post
title: "Translation of For in scala"
date: 2014-04-23 11:05:13 +0700
comments: true
categories: scala for translation
---
> There are 2 kinds of **for** in scala:
>> 1. for-loops
>> 2. for-comprehensions

for-loops
===
The for-loops is like for-loops in `java`

```scala
for (x <- xs) f(x)
```
is the same as:

```scala
xs.foreach(x => f(x))
```

for-comprehensions
===

This example shows how scala translate `for` comprehensions into term of expression `map` `flatMap` and `filter`.

1. A simple for-expression (1 generator)
---
```scala
for (x <- e1) yield e2
```
to:

```scala
e1.map(x => e2)
```

2. A for-expression with if
---

```scala
for (x <- e1 if f; s) yield e2
```
to:

```scala
for (x <- e1.withFilter(x => f); s) yield e2
```
and traslate continue until be a simple form

3. A for-expression with 2 generators
---

```scala
for (x <- e1; y <- e2; s) yield e3
```
to:

```scala
e1.flatMap(x => for (y <- e2; s) yield e3)
```
and traslate continue until be a simple form

Example:
----

```scala
for {
	x <- 1 to N
	y <- 1 to x
	if (x % y == 0)
} yield (x, y)
```

to:

```scala
(1 to N) flatMap (x =>
  (1 to x) withFilter (y =>
    x % y == 0) map (y => (x, y)))
```