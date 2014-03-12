---
layout: post
title: "Hello Python"
date: 2012-12-06 09:01
comments: true
author: gailo22
categories: python closure lambda
---

This is my first program with python using gvim is a editor.

{% codeblock lang:python %}
def square(x):
    return x * x

def make_add(x):
    def f(y):
        return x + y
    return f

def make_add_lambda(x):
    return lambda y: x + y

{% endcodeblock %}

How to use it

{% codeblock%}
agile@COM:~/Desktop$ python -i o.py
>>> square(2)
4
>>> make_add3 = make_add(3)
>>> make_add3(5)
8
>>>

{% endcodeblock %}
