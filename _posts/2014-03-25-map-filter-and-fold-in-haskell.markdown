---
layout: post
title: "Map, Filter and Fold in Haskell"
date: 2014-03-25 11:56:46 +0700
comments: true
categories: haskell functional programming map filter fold
---

This example shows 3 key features of functional programming: `map` `filter` and `map` function using __haskell__.

### Map
The function takes a function from a to b `(a -> b)` and a list of a `[a]` then product a list of b `[b]`.

```haskell

map :: (a -> b) -> [a] -> [b]
map f xs = [ f x | x <- xs ]

mapRec :: (a -> b) -> [a] -> [b]
mapRec f []     = []
mapRec f (x:xs) = f x : mapRec f xs

```


### Filter
The function takes a predicate function `(a -> Bool)` that return boolean (true/false) and a list `[a]` then produce a filtered list `[a]`.

```haskell
filter :: (a -> Bool) -> [a] -> [a]
filter p xs = [ x | x <- xs, p x ]

filterRec :: (a -> Bool) -> [a] -> [a]
filterRec p []                 = []
filterRec p (x:xs) | p x       = x : filterRec p xs
                   | otherwise = filterRec p xs


```

### Fold
The function takes a 2 parameters function `(a -> a -> a)`, an initial accumulator and a list then return an accumulate result.

```haskell

foldr :: (a -> a -> a) -> a -> [a] -> a
foldr f a []     = a
foldr f a (x:xs) = f x (foldr f a xs)

foldl :: (a -> a -> a) -> a -> [a] -> a
foldl f a []     = a
foldl f a (x:xs) = foldl f (f a x) xs

```