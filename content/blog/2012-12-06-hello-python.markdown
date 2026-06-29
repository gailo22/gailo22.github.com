---
author: gailo22
categories: python closure lambda
comments: true
date: '2012-12-06T00:00:00Z'
title: Hello Python
---

This is my first program with python using gvim is a editor.

```python
def square(x):
    return x * x

def make_add(x):
    def f(y):
        return x + y
    return f

def make_add_lambda(x):
    return lambda y: x + y

```

### How to use it

```sh
agile@COM:~/Desktop$ python -i o.py
>>> square(2)
4
>>> make_add3 = make_add(3)
>>> make_add3(5)
8
>>>

```
