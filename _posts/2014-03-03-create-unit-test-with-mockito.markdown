---
layout: post
title: "Create Unit Test with Mockito"
date: 2014-03-03 15:21:30 +0700
comments: true
categories: java unit test mockito
---


Assume you want to create a unit test for UserService class, getUserByUserName(String username) method.

```java
@Service("userService")
public class UserServiceImpl implements UserService {
 
    @Autowired
    private UserDao userDao;
 
    public User getUserByUserName(String username) {
        ...
        userDao.getUserByName(username);
        ...
    }
}
```

#### Create new class name UserServiceImplTest

```java
public class UserServiceImplTest {
    ...
}
```

#### Inject class you want to test

```java
@InjectMocks
private UserServiceImpl userService;

```

#### Mock related objects

```java
@Mock
private UserDao userDaoMock;
```

#### Setup annotation support
```java
@Before
public void setup() {
    initMocks(this);
}
```

#### Create test method

```java
@Test
public void shoudXXX() {
 
}
```

#### Verify expectation

```java
verify(userService).getUserById("admin");
assertThat(true, equalTo(true));
```

#### Static import required classes

```java
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
 
import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;
```

#### Method Template
```java
@Test
public void should<Expecting>When<Criteria>On<MehtodName> {
    // Given
    Declare your mock object and expectation.
 
    // When
    Invoke method you want to test.
 
    // Then
    Verify method invocation.
    Check return value from the method.
}
```

#### Example

```java
@Test
public void shouldReturnUserWhenUserNameIsNotNullOnGetUserByUserName {
    // Given
    User userMock = mock(User.class);
    when(userDaoMock.getByUserName("admin")).thenReturn(userMock);
 
    // When
    User returnUser = userService.getUserByUserName("admin");
 
    // Then
    assertThat(returnUser, equalTo(userMock));
 
}
```
