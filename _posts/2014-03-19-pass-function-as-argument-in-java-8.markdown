---
layout: post
title: "Pass Function as Argument in Java 8"
date: 2014-03-19 11:15:38 +0700
comments: true
categories: java 8 function passing argument first class
---

Last time I posted about [How to pass function as argument in Java](/blog/2014/02/28/pass-function-as-argument-java/) this version using java before java 8, today java 8 is just [released](https://blogs.oracle.com/thejavatutorials/entry/jdk_8_is_released), I will update the previous code to use java. It kinds of cool now. :D

```java

import java.util.function.Function;

public class BinaryTest {

	public static void main(String[] args) {

		byte[] bs = "gailo".getBytes();

		System.out.println("oct: " + toString(bs, (x) -> Integer.toString(x)));

		System.out.println("binary: " + toString(bs, Integer::toBinaryString));

		System.out.println("hex: " + toString(bs, Integer::toHexString));

	}

	private static String toString(byte[] bs, Function<Integer, String> function) {
		StringBuilder sb = new StringBuilder();
		for (byte b : bs) {
			sb.append(function.apply(new Integer(b)));
			sb.append(" ");
		}
		return sb.toString();
	}

}


```