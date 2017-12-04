---
layout: post
title: "Java 7 Features that I have missed"
date: 2014-07-14 17:00:29 +0700
comments: true
categories: java 7 features missed
---

I never have a chance to use the new features of Java 7 in my day-to-day basis project, so just want to keep it as a reference here:

  - Strings in switch
  - Diamond Operator
  - try-with-resources statement
  - Multi-catch exception
  - Files
  - equals, hashCode and comparaTo methods
  - Null checks


#### Strings in switch

```java
String s = ...

switch (s) {
	case "hello": ...; break;
	...
}
```

#### Diamond Operator

Instread of:
```java
Map<String, Integer> = new HashMap<String, Integer>();
```
You can write:
```java
Map<String, Integer> = new HashMap<>();
```

#### try-with-resources statement

```java
try (Resource res = ...) {
	...
}
```

when the `try` block exit, `res.close()` will be called autometically.

#### Multi-catch exception

```java
try {
 //do someting;
}
catch(Exception1, Exception2 e) {
 handleException(e)
}

```

#### Files

It provided static methods to manage a file e.g. `Files`, `Paths`:

```java
Path absolute = Paths.get("/", "home", "dev")
Path relative = Paths.get("app", "config", "user.properties")

```

#### equals, hashCode and comparaTo methods

There are static mehtods of `Objects` class:

```java
Objects.equals(a, b)
Objects.hashCode(a)
Objects.hash(first, last)

Integer.compare(a, b)

```

#### Null checks

A static method to check null:

```java
String hello = ...
Objects.requireNonNull(hello)

```