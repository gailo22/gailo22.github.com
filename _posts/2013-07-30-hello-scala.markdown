---
layout: post
title: "Hello Scala"
date: 2013-07-30 17:58
comments: true
categories: scala functional
---

### Hello World!

```scala

def hello = println("Hello world!")

```

### Functional style

```scala
def append[A](xs: List[A], ys: List[A]): List[A] =
  if (xs == Nil) ys else xs.head :: append(xs.tail, ys)

def map[A, B](f: A => B, xs: List[A]): List[B] =
  xs match {
    case Nil => Nil
    case h::t => f(h) :: map(f, t)
  }

def increment(x: Int): Int = x + 1

```

### Usage
```scala
scala> val a = map(increment, List(1,2,3,4,5))
a: List[Int] = List(2, 3, 4, 5, 6)
```