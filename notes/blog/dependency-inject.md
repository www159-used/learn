---
title: "依赖注入"
date: 2026-06-29
---

最开始听到依赖注入这个名词，是在某个java八股文介绍springboot。

后来工作了一段时间深有感触，依赖管理是一个无法避免的工程问题。

任何项目时间一长，就会产生各种各样的新对象。
如果不借助依赖注入框架，会产生很多的样板代码，以及增加单测的难度。

接下来将基于[guice](https://github.com/google/guice/wiki/Motivation)来讲解依赖注入的需求，思想，样例

## 注入是什么

假设你需要设计一个简单的retry执行器，负责间隔几秒重试
```java
final class RetryExecutor {

    public final int second;

    RetryExecutor(int second) {
        this.second = second;     
    }

    public void execute(Runnable block) {
        try {
            block.call();
        } catch(Exception e) {
            TimeUnit.SECONDS.sleep(second);
        }
    }
}
```

当你开始写单测的时候，发现单测运行时间依赖sleep。
这是一个很严重的问题：second越大，sleep的时间越长。

因此最好的做法是将sleep功能注入
```java
final class RetryExecutor {

    public final int second;
    public final Sleeper sleeper;

    RetryExecutor(int second, Sleeper sleeper) {
        this.second = second;     
        this.sleeper = sleeper;
    }

    public void execute(Runnable block) {
        try {
            block.call();
        } catch(Exception e) {
            sleeper.sleep(second);
        }        
    }
}
```
这样在单测的时候就可以注入一个sleeper，避免阻塞单测执行。

这个例子里，`RetryExecutor`依赖`Sleeper`，也可以说`Sleeper`注入了`RetryExecutor`。

## 注入框架

想象你是一个资深javaer，有一天突然厌恶了随地大小new。你发现
1. 依赖实际是一个树
2. 可以用2型文法描述这棵树
3. 分析完2后，可以交给一个执行器去完成new，注入，new。直到完成初始化

恭喜你发明了一个依赖注入框架！

使用注入框架可以省略很多样板代码。

需要注意的是，注入只负责对象初始化，下面的场景无法覆盖：
1. 服务启停依赖分析。
服务启停可以用[guava的service](https://mvnrepository.com/artifact/com.google.guava/guava)
2. 运行时new对象（工厂类）

guice提供了几个[绑定方式](https://github.com/google/guice/wiki/Bindings)，
最常用的是linked，provider。

optinal看个人，socpe以及named其实没有必要，徒增复杂度。
另外考虑到了代码审计，不会特意在代码中留dev后门，一般情况下也没必要集成测试。



## guice绑定方式

guice提供了几种注入的绑定方式

### linked bind

链式绑定。最基础的绑定，将实现类绑定到抽象接口

```java
public class BillingModule extends AbstractModule {
  @Provides
  TransactionLog provideTransactionLog(DatabaseTransactionLog databaseTransactionLog) {
    return databaseTransactionLog;
  }

  @Provides
  DatabaseTransactionLog provideDatabaseTransactionLog(MySqlDatabaseTransactionLog impl) {
    return impl;
  }
}
```

### bind annotation

注解绑定。如果一个接口被多个类实现，或者绑定多个同一类型的实例，需要以注解的形式做区分。

```java
public class RealBillingService implements BillingService {

  @Inject
  public RealBillingService(@PayPal CreditCardProcessor processor,
      TransactionLog transactionLog) {
    ...
  }
```

guice提供了`@Named`注解来方便我们区分

```java
public class RealBillingService implements BillingService {

  @Inject
  public RealBillingService(@Named("Checkout") CreditCardProcessor processor,
      TransactionLog transactionLog) {
    ...
  }
```

### instance binding

绑定实例，字面意思。直接将值绑定到实例上。一般用在基础数据类型比如int，String

``` java
    bind(String.class)
        .annotatedWith(Names.named("JDBC URL"))
        .toInstance("jdbc:mysql://localhost/pizza");
    bind(Integer.class)
        .annotatedWith(Names.named("login timeout seconds"))
        .toInstance(10);
```

### @Provides methods

如果需要注入一个自己new的对象，可以用这个方式
```java
public class BillingModule extends AbstractModule {
  @Override
  protected void configure() {
    ...
  }

  @Provides
  static TransactionLog provideTransactionLog() {
    DatabaseTransactionLog transactionLog = new DatabaseTransactionLog();
    transactionLog.setJdbcUrl("jdbc:mysql://localhost/pizza");
    transactionLog.setThreadPoolSize(30);
    return transactionLog;
  }
}
```

### untargeted bindings

简单绑定。可以直接绑定一个类，而不通过接口实现。

```java
    bind(MyConcreteClass.class);
    bind(AnotherConcreteClass.class).in(Singleton.class);
```

### Constructor Bindings

构造器绑定。如果你想绑定一个lib的对象，无法直接为lib代码加上`@Inject`注解，构造器绑定就派上用场。
```java
public class BillingModule extends AbstractModule {
  @Override
  protected void configure() {
    try {
      bind(TransactionLog.class).toConstructor(
          DatabaseTransactionLog.class.getConstructor(DatabaseConnection.class));
    } catch (NoSuchMethodException e) {
      addError(e);
    }
  }
}
```

### Build-in Bindings

guice内置了一些注入比如`java.util.log`，平时基本用不上。

### Just-in-time Bindings

guice支持通过@Inject静态分析依赖树，然后生成绑定和注入的代码。

这也被称为隐式绑定。

### MultiBindings

guice为重复绑定设计了一些集合，目前没碰到场景。
todo: 还没碰到 MultiBindings 的场景

### 限制绑定

针对lib guice的场景设计。如果guice项目依赖了一个guice lib，lib不希望暴露内部的注入。

限制绑定就派上用场。

```java
// Modules annotated with this Permit can provide Network bindings.
@RestrictedBindingSource.Permit
@Retention(RetentionPolicy.RUNTIME)
@interface NetworkPermit {}

// Bindings with the @IpAddress qualifier annotation can only be provided by
// modules with the NetworkPermit annotation.
@RestrictedBindingSource(
  explanation = "Please install NetworkModule instead of binding network bindings yourself.",
  permits = {NetworkPermit.class})
@Qualifier
@Retention(RetentionPolicy.RUNTIME)
public @interface IpAddress {}

// The RoutingTable binding can only be provided by modules annotated with the
// NetworkPermit annotation.
@RestrictedBindingSource(
  explanation = "Please install NetworkModule instead of binding network bindings yourself.",
  permits = {NetworkPermit.class})
public interface RoutingTable {
  int getNextHopIpAddress(int destinationIpAddress);
}

@NetworkPermit
public final class NetworkModule extends AbstractModule {
  @Provides @IpAddress int provideIp( ... ) { ... }

  @Override
  protected void configure() {
    // RoutingModule is permitted to provide the RoutingTable binding because
    // it is installed by NetworkModule, which is annotated with NetworkPermit
    // - ie. it's enough for any module providing a binding (directly or
    // indirectly) to have the right permit.
    install(new RoutingModule());
  }
}

private final RoutingModule extends AbstractModule {
  @Provides RoutingTable provideRoutingTable( ... ) { ... }
}

```

## guice的最佳实践

来自guice wiki的[best practice](https://github.com/google/guice/wiki/BestPractices)。
google的开发风格，批判看待。

这里挑几个个人认为重要的展开讲讲。

### 1. 尽量不是用Injector

guice内置了[injector注入](#build-in-bindings)。

这让我们能更加方便动态修改注入，但是guice无法对动态注入依赖分析。

### 2. 直接注入

如果依赖一个类，直接注入，**没必要**通过间接类的注入来访问。

这也引出了1，常常碰到这样的代码：

```java
return context.getInjector().getInstance(AlertPreTestExecJob.class);
```

完全没必要。但是没这么绝对，如果这样写更有条理其实也没事。

### 3.使用@Nullable

guice的注入会检查null。因此如果想注入可空依赖，必须使用`@Nullable`注解

特殊的，guice可以识别targets为`PARAMETER`和`FIELD`的`@Nullable`

### 4. 避免副作用对象

todo: 目前没碰到
