可以。我们就**从你现在这个 Spring Initializr
页面开始**，一步一步做一个真正能运行的：

> **Spring Boot 3.5.16 + MyBatis + MySQL 后端项目**

我会尽量不跳步骤，而且每一步都告诉你**为什么这么选**。

先确认版本：Spring Boot 3.5.16 官方要求 **Java 17+**，Maven 至少
3.6.3；MyBatis 官方说明 **MyBatis-Spring-Boot-Starter 3.0.x 支持 Spring
Boot 3.2--3.5、Java 17+**，所以我们这里使用 **JDK 21 + Spring Boot
3.5.16 + MyBatis Starter
3.0.x**。([Home](https://docs.spring.io/spring-boot/3.5/system-requirements.html?utm_source=chatgpt.com "System Requirements :: Spring Boot"))

------------------------------------------------------------------------

# 一、先准备环境

我们先统一版本，避免后面出现奇奇怪怪的兼容问题。

  软件建议版本   
  -------------- --------------------
  JDK            **21**
  Spring Boot    **3.5.16**
  Maven          **3.6.3+**
  MySQL          8.x
  IDEA           你现在这个版本即可
  MyBatis        **3.0.x Starter**
  前端           后面再做 Vue3

如果你电脑已经装好了 JDK 21，可以先在 IDEA Terminal 执行：

``` bash
java -version
```

正常应该类似：

``` text
java version "21.x.x"
```

再执行：

``` bash
mvn -v
```

应该能看到 Maven 版本。

**如果这两个已经没问题，就继续。**

------------------------------------------------------------------------

# 二、创建 Spring Boot 项目

你现在就在 Spring Initializr 页面。

我们先不要管它没有 3.5.16。

因为它现在默认展示 4.x，但我们可以生成项目后手动指定 3.5.16。

------------------------------------------------------------------------

## ① Project

选择：

``` text
Maven
```

不要选择：

``` text
Gradle
```

因为你现在正在重新学习 Java Web，Maven 更适合跟着国内 Java 后端教程走。

------------------------------------------------------------------------

## ② Language

选择：

``` text
Java
```

------------------------------------------------------------------------

## ③ Spring Boot

这里你现在只能看到：

``` text
4.1.1
4.0.8
```

**暂时随便选一个，比如 4.0.8。**

后面我们会把它改成：

``` text
3.5.16
```

所以不用担心。

------------------------------------------------------------------------

# 三、Project Metadata 怎么填写？

这里我建议你这样填。

### Group

``` text
com.example
```

或者如果你想认真一点：

``` text
com.kite
```

我更建议你用：

``` text
com.kite
```

------------------------------------------------------------------------

### Artifact

我们现在做一个学习项目：

``` text
springboot-mybatis-demo
```

------------------------------------------------------------------------

### Name

一般会自动变成：

``` text
springboot-mybatis-demo
```

------------------------------------------------------------------------

### Package name

自动生成：

``` text
com.kite.springbootmybatisdemo
```

可以。

不过为了后面学习方便，我更喜欢：

``` text
com.kite.demo
```

所以你可以手动改成：

``` text
com.kite.demo
```

------------------------------------------------------------------------

### Packaging

选择：

``` text
Jar
```

不要选择 War。

------------------------------------------------------------------------

### Configuration

你截图里面：

``` text
Properties
YAML
```

这里我建议选择：

``` text
YAML
```

也就是：

``` text
application.yml
```

因为后面我们会写：

``` yaml
spring:
  datasource:
    url: ...
    username: ...
    password: ...
```

YAML 对这种配置比较舒服。

------------------------------------------------------------------------

# 四、添加依赖

点击：

> **ADD DEPENDENCIES**

然后搜索。

## ① Spring Web

搜索：

``` text
Spring Web
```

选择它。

作用：

``` text
Controller
REST API
HTTP
Spring MVC
```

也就是以后你写：

``` java
@RestController
```

需要它。

------------------------------------------------------------------------

## ② MyBatis Framework

搜索：

``` text
MyBatis Framework
```

选择。

注意：

**不是 MyBatis-Flex。**

我们现在就是学习最经典的：

``` text
Spring Boot
+
MyBatis
```

------------------------------------------------------------------------

## ③ MySQL Driver

搜索：

``` text
MySQL Driver
```

选择。

它负责：

``` text
Java
 ↓
JDBC
 ↓
MySQL
```

之间的连接。

------------------------------------------------------------------------

## ④ Lombok

搜索：

``` text
Lombok
```

也勾上。

以后可以减少：

``` java
getter
setter
constructor
```

这种样板代码。

------------------------------------------------------------------------

## ⑤ Validation

再搜索：

``` text
Validation
```

也可以加入。

后面做接口参数校验的时候会用到：

``` java
@NotNull
@NotBlank
@Size
```

等。

------------------------------------------------------------------------

### 最终依赖

你的页面应该类似：

``` text
Spring Web
MyBatis Framework
MySQL Driver
Lombok
Validation
```

**先不要乱加 Redis、JWT、Spring Security、Swagger 等东西。**

我们现在第一步就是把：

> Spring Boot → MyBatis → MySQL

这条链跑通。

------------------------------------------------------------------------

# 五、点击 Generate

现在点击：

> **GENERATE**

下载 ZIP。

例如：

``` text
springboot-mybatis-demo.zip
```

然后解压。

比如：

``` text
D:\JavaProjects\springboot-mybatis-demo
```

------------------------------------------------------------------------

# 六、用 IDEA 打开

打开 IDEA。

选择：

``` text
Open
```

找到：

``` text
springboot-mybatis-demo
```

打开。

IDEA 会自动识别：

``` text
pom.xml
```

然后 Maven 开始下载依赖。

第一次可能比较慢。

**不要看到 IDEA 一直转圈就强制关闭。**

等 Maven 下载完。

------------------------------------------------------------------------

# 七、现在最关键：修改 Spring Boot 版本

找到：

``` text
pom.xml
```

打开。

你现在可能看到：

``` xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>4.0.8</version>
    <relativePath/>
</parent>
```

把：

``` xml
4.0.8
```

改成：

``` xml
3.5.16
```

最终：

``` xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.5.16</version>
    <relativePath/>
</parent>
```

然后保存。

------------------------------------------------------------------------

# 八、这里有一个重要问题：MyBatis 版本

这一步非常重要。

因为：

``` text
Spring Boot 3.5
```

对应：

``` text
MyBatis Spring Boot Starter 3.0.x
```

官方兼容表明确写了：

``` text
MyBatis Spring Boot Starter 3.0
        ↓
Spring Boot 3.2 - 3.5
Java 17+
```

而：

``` text
MyBatis Spring Boot Starter 4.0
        ↓
Spring Boot 4.0+
```

所以**千万不要因为现在 Initializr 生成的是 Spring Boot 4，就把 MyBatis
Starter 4.x
留下来。**([MyBatis](https://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/?utm_source=chatgpt.com "Introduction – mybatis-spring-boot-autoconfigure"))

------------------------------------------------------------------------

## 检查 pom.xml

找到：

``` xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
</dependency>
```

如果没有 `<version>`，这是正常的。

因为 Spring Boot 的 dependency management 会管理版本。

但我们要确保它最终解析的是 **3.0.x**。

------------------------------------------------------------------------

# 九、推荐你直接使用这份 pom.xml

为了避免 Initializr 生成 4.x 依赖造成版本问题，你可以把 `pom.xml`
整体调整成下面这个版本：

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.5.16</version>
        <relativePath/>
    </parent>

    <groupId>com.kite</groupId>
    <artifactId>springboot-mybatis-demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <name>springboot-mybatis-demo</name>
    <description>Spring Boot MyBatis MySQL Demo</description>

    <properties>
        <java.version>21</java.version>
    </properties>

    <dependencies>

        <!-- Spring MVC / REST API -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- MyBatis -->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
        </dependency>

        <!-- MySQL -->
        <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- 参数校验 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>

        <!-- 测试 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>

    <build>
        <plugins>

            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>

        </plugins>
    </build>

</project>
```

然后 IDEA 右边 Maven 面板点击：

``` text
Reload All Maven Projects
```

或者右键项目：

``` text
Maven
→ Reload project
```

------------------------------------------------------------------------

# 十、确认 Spring Boot 真的变成 3.5.16

打开 Terminal。

进入项目目录：

``` bash
mvn spring-boot:run
```

或者：

``` bash
mvn clean package
```

如果成功，你应该看到类似：

``` text
BUILD SUCCESS
```

然后运行：

``` bash
mvn spring-boot:run
```

如果看到：

``` text
Started SpringbootMybatisDemoApplication
```

说明：

> **Spring Boot 3.5.16 已经成功跑起来了。**

------------------------------------------------------------------------

# 十一、接下来配置 MySQL

现在我们开始真正连接数据库。

先打开 MySQL。

创建一个数据库：

``` sql
CREATE DATABASE springboot_demo
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

然后：

``` sql
USE springboot_demo;
```

创建一个测试表：

``` sql
CREATE TABLE user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    age INT
);
```

插入两条数据：

``` sql
INSERT INTO user (username, password, age)
VALUES
('zhangsan', '123456', 20),
('lisi', '123456', 21);
```

现在数据库里面有：

``` text
springboot_demo
└── user
    ├── 1 zhangsan 123456 20
    └── 2 lisi     123456 21
```

------------------------------------------------------------------------

# 十二、创建 application.yml

找到：

``` text
src
└── main
    └── resources
        └── application.yml
```

写：

``` yaml
spring:
  application:
    name: springboot-mybatis-demo

  datasource:
    url: jdbc:mysql://localhost:3306/springboot_demo?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
    username: root
    password: 你的MySQL密码
    driver-class-name: com.mysql.cj.jdbc.Driver

server:
  port: 8080

mybatis:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.kite.demo.entity
```

把：

``` text
你的MySQL密码
```

换成你自己的 MySQL 密码。

------------------------------------------------------------------------

# 十三、现在创建项目目录

你的 Java 包建议整理成：

``` text
com.kite.demo
│
├── DemoApplication.java
│
├── controller
│
├── service
│
├── mapper
│
├── entity
│
└── ...
```

完整一点：

``` text
src
└── main
    ├── java
    │   └── com.kite.demo
    │       ├── DemoApplication.java
    │       │
    │       ├── controller
    │       │
    │       ├── service
    │       │
    │       ├── mapper
    │       │
    │       └── entity
    │
    └── resources
        ├── application.yml
        └── mapper
            └── UserMapper.xml
```

这个结构非常重要。

因为你以后面试经常会被问：

> Spring Boot 项目一般怎么分层？

你就能真正理解：

``` text
Controller
    ↓
Service
    ↓
Mapper
    ↓
MySQL
```

而不是死记概念。

------------------------------------------------------------------------

# 十四、创建 User 实体类

创建：

``` text
entity/User.java
```

写：

``` java
package com.kite.demo.entity;

import lombok.Data;

@Data
public class User {

    private Long id;

    private String username;

    private String password;

    private Integer age;
}
```

------------------------------------------------------------------------

# 十五、创建 Mapper

创建：

``` text
mapper/UserMapper.java
```

写：

``` java
package com.kite.demo.mapper;

import com.kite.demo.entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    List<User> findAll();

    User findById(Long id);
}
```

这里的：

``` java
@Mapper
```

非常重要。

它告诉 MyBatis：

> 这是一个 Mapper 接口，需要交给 MyBatis 管理。

MyBatis-Spring-Boot-Starter 会自动扫描带有 `@Mapper` 的
Mapper。([MyBatis](https://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/?utm_source=chatgpt.com "Introduction – mybatis-spring-boot-autoconfigure"))

------------------------------------------------------------------------

# 十六、创建 UserMapper.xml

在：

``` text
src/main/resources
```

创建：

``` text
mapper
```

然后创建：

``` text
UserMapper.xml
```

写：

``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.kite.demo.mapper.UserMapper">

    <select id="findAll"
            resultType="com.kite.demo.entity.User">

        SELECT
            id,
            username,
            password,
            age
        FROM user

    </select>

    <select id="findById"
            parameterType="long"
            resultType="com.kite.demo.entity.User">

        SELECT
            id,
            username,
            password,
            age
        FROM user
        WHERE id = #{id}

    </select>

</mapper>
```

现在你应该能看懂 MyBatis 最核心的一条链了：

``` text
UserMapper.java

List<User> findAll();
          ↓
          ↓
UserMapper.xml

<select id="findAll">
    SELECT ...
</select>
          ↓
          ↓
MySQL
```

这就是 MyBatis 的核心工作方式之一。

------------------------------------------------------------------------

# 十七、创建 Service

创建：

``` text
service/UserService.java
```

``` java
package com.kite.demo.service;

import com.kite.demo.entity.User;
import com.kite.demo.mapper.UserMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserMapper userMapper;

    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public List<User> findAll() {
        return userMapper.findAll();
    }

    public User findById(Long id) {
        return userMapper.findById(id);
    }
}
```

------------------------------------------------------------------------

# 十八、创建 Controller

创建：

``` text
controller/UserController.java
```

``` java
package com.kite.demo.controller;

import com.kite.demo.entity.User;
import com.kite.demo.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> findAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User findById(@PathVariable Long id) {
        return userService.findById(id);
    }
}
```

------------------------------------------------------------------------

# 十九、启动项目

启动：

``` text
DemoApplication.java
```

如果成功，你会看到：

``` text
Tomcat started on port 8080
```

然后浏览器访问：

``` text
http://localhost:8080/users
```

你应该得到：

``` json
[
  {
    "id": 1,
    "username": "zhangsan",
    "password": "123456",
    "age": 20
  },
  {
    "id": 2,
    "username": "lisi",
    "password": "123456",
    "age": 21
  }
]
```

再访问：

``` text
http://localhost:8080/users/1
```

得到：

``` json
{
  "id": 1,
  "username": "zhangsan",
  "password": "123456",
  "age": 20
}
```

🎉 **这时候你就真正把 Spring Boot + MyBatis + MySQL 跑通了。**

------------------------------------------------------------------------

# 二十、你现在实际上已经完成了一条完整链路

你不要把刚才这些代码当成一堆零散代码。

你要理解成：

``` text
浏览器
   │
   │ GET /users
   ↓
UserController
   │
   ↓
UserService
   │
   ↓
UserMapper
   │
   ↓
UserMapper.xml
   │
   ↓
MySQL
   │
   ↓
查询结果
   │
   ↓
Java对象 User
   │
   ↓
JSON
   │
   ↓
浏览器
```

这就是你接下来学习 Java Web / Spring Boot 最应该建立起来的**整体认知**。

------------------------------------------------------------------------

## 还有一个细节：为什么我们用 JDK 21？

因为 Spring Boot 3.5.16 最低要求 Java 17，同时支持到 Java
25。([Home](https://docs.spring.io/spring-boot/3.5/system-requirements.html?utm_source=chatgpt.com "System Requirements :: Spring Boot"))

所以：

``` text
JDK 17 ✅
JDK 21 ✅
JDK 25 ✅
```

都可以。

你现在如果是重新开始学，我建议直接：

``` text
JDK 21
```

就行。

------------------------------------------------------------------------

# 你现在先不要继续往下加东西

你目前的目标不是马上做一个"高大上"的项目。

**第一阶段只做这件事：**

``` text
Spring Boot 3.5.16
        ↓
Spring Web
        ↓
Controller
        ↓
Service
        ↓
MyBatis
        ↓
MySQL
```

等这个跑通以后，我们再增加：

``` text
MyBatis
 ↓
CRUD
 ↓
分页
 ↓
统一返回结果
 ↓
异常处理
 ↓
参数校验
 ↓
RESTful API
 ↓
Swagger/OpenAPI
 ↓
Redis
 ↓
登录/JWT
 ↓
Vue3
```

这样你才是在**重新练企业开发**，而不是重新把黑马课程从第一集看到最后一集。

**你现在可以先做到第十步：把项目创建出来并把** **`pom.xml`** **改成
3.5.16。** 如果你做到这里，把你的 **`pom.xml`**
**截图发给我**，我可以直接帮你检查版本和依赖，然后我们继续往 **MySQL →
MyBatis → CRUD → Vue3 前后端联调**走。
