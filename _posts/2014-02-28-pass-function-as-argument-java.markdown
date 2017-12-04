---
layout: post
title: "Pass function as argument in Java"
date: 2014-02-28 11:57:17 +0700
comments: true
categories: java function passing
---

This is an example of passing function as argument in java. It kind of ugly but it can solve my duplicate code problem as below:

### Before
```
public class BinaryTest {

	public static void main(String[] args) {

		byte[] bs = "gailo".getBytes();

		System.out.println("oct: " + toOct(bs));
		System.out.println("binary: " + toBin(bs));
		System.out.println("hex: " + toHex(bs));

	}

	private static String toOct(byte[] bs) {
		StringBuilder sb = new StringBuilder();
		for (byte b : bs) {
			sb.append(b);
			sb.append(" ");
		}
		return sb.toString();
	}

	private static String toBin(byte[] bs) {
		StringBuilder sb = new StringBuilder();
		for (byte b : bs) {
			sb.append(Integer.toBinaryString(b));
			sb.append(" ");
		}
		return sb.toString();
	}

	private static String toHex(byte[] bs) {
		StringBuilder sb = new StringBuilder();
		for (byte b : bs) {
			sb.append(Integer.toHexString(b));
			sb.append(" ");
		}
		return sb.toString();
	}

}

```

### After

```

import com.google.common.base.Function;

public class BinaryTest {

	public static void main(String[] args) {

		byte[] bs = "gailo".getBytes();

		System.out.println("oct: " + toString(bs, new Function<Integer, String>() {

			@Override
			public String apply(Integer input) {
				return input.toString();
			}
		}));

		System.out.println("binary: " + toString(bs, new Function<Integer, String>() {

			@Override
			public String apply(Integer input) {
				return Integer.toBinaryString(input);
			}

		}));

		System.out.println("hex: " + toString(bs, new Function<Integer, String>() {

			@Override
			public String apply(Integer input) {
				return Integer.toHexString(input);
			}
		}));

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




