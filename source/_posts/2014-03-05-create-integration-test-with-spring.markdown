---
layout: post
title: "Create Integration Test with Spring"
date: 2014-03-05 11:20:55 +0700
comments: true
categories: java integration test spring
---

Assume you want to create a integration test for UserDao class which has CRUD methods e.g find, save, update, delete.

### Please note that for integration test:

+ we are testing with other system like db so, we may require populate example data before test.
+ the test method name should say that we are expecting the actual return value or save successfully, NOT invoke or interaction with some method

- shouldReturnNewUserWhenCreateNewUserOnSave() –> **OK**
- shouldInvokeSaveMehtodWhenUserIsNotNullOnSave() –> **NOT** 

```java
@Repository("userDao")
public class UserDaoImpl implements UserDao {
 
    User find(PK id) {...}
    User save(User object) {...}
    boolean delete(PK id) {...}
 
}
```

Create new class name UserDaoIntegrationTest with annotations as below
--------------------------
```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext-dao-test.xml")
@Transactional
public class UserDaoIntegrationTest {
    ...
}
```

Inject class you want to test
--------------------------

```java
@Autowired
private UserDao userDao;
```

Crete test method
--------------------------
```java
@Test
public void shoudXXX() {
    ...  
}
```

Verify actual return value
--------------------------
```java
assertThat(user.getUserName(), equalTo("user1"));
```

Method Template
============
```java
@Test
public void should<Expecting>When<Criteria>On<MehtodName> {
    // Given
    Populate require arguments for testing method.
 
    // When
    Invoke method you want to test with actual value.
 
    // Then
    Check return value from the method.
}
```

Example
============
```java
@Test
public void shouldReturnUserOnFindByKey() throws Exception {
	// Given // When 
	final User user = this.userDao.find(1L);
 
	// Then
	assertThat(user.getUserName(), equalTo("user1"));
}
 
@Test
public void shouldCreateNewUserOnSave() throws Exception {
	// Given 
	final User newUser = User.getDefaultObject();
	newUser.setReferenceType(ReferenceType.MYKAD);
	newUser.setUserName("abc");
	newUser.setPassword("password");
	newUser.setName("name");
	newUser.setEmail("abc@email.com");
	newUser.setUserStatus(UserStatus.ACTIVE);
	newUser.setCreatedBy("admin");
	newUser.setLastModifiedBy("admin");
 
	// When
	final User createdUser = this.userDao.save(newUser);
 
	// Then
	final User foundUser = this.userDao.find(createdUser.getId());
	assertThat(foundUser.getUserName(), equalTo("abc"));
	assertThat(foundUser.getPassword(), equalTo("password"));
	assertThat(foundUser.getEmail(), equalTo("abc@email.com"));
	assertThat(foundUser.getCreatedBy(), equalTo("admin"));
	assertThat(foundUser.getLastModifiedBy(), equalTo("admin"));
}
```