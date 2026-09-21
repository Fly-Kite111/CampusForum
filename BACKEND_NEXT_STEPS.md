# CampusForum 后端开发下一步指南

本文档对应当前项目状态：`Frontend` 已有 Vue 页面和路由，`Backend` 目录尚未创建 Spring Boot 工程。

目标是先在本地启动 Java 后端，并逐步替换前端的模拟登录、热门帖子和帖子详情数据。

## 1. 准备环境

已安装 IDEA 和 Maven 后，还需要确认 JDK 已可用。推荐 **JDK 21**，最低使用 JDK 17。

在 IDEA 中打开 `File -> Project Structure -> SDKs`，确认已添加 JDK。新建项目时也必须能在 **JDK** 下拉框中选到它。

可在 PowerShell 验证：

```powershell
java -version
mvn -v
```

若 Maven 未加入系统 `PATH`，不影响使用 IDEA 内置 Maven；后续项目生成 Maven Wrapper 后，也可使用项目中的 `mvnw.cmd`。

## 2. 在 IDEA 创建 Spring Boot 项目

1. 选择 `File -> New -> Project`。
2. 选择 **Spring Boot**。
3. 填写以下配置：

| 配置项 | 值 |
| --- | --- |
| Name | `campus-forum-backend` |
| Location | `D:\CampusForum\Backend` |
| Language | Java |
| Type | Maven |
| JDK / Java | 21（或 17） |
| Group | `com.campusforum` |
| Artifact | `campus-forum-backend` |
| Package name | `com.campusforum` |
| Packaging | Jar |
| Spring Boot | 3.5.x |

4. 在依赖选择页面勾选：

```text
Spring Web
Spring Data JPA
Spring Security
Validation
MySQL Driver
Lombok
Spring Boot DevTools (可选)
```

5. 点击创建，等待 IDEA 下载 Maven 依赖并完成索引。

创建完成后，`Backend` 应至少包含：

```text
Backend/
  pom.xml
  mvnw
  mvnw.cmd
  src/main/java/com/campusforum/CampusForumBackendApplication.java
  src/main/resources/application.properties
```

> 如果 IDEA 不允许直接在非空 `Backend` 中创建项目，可先删除其中空的 `.gitkeep`，或在 `Backend` 中创建工程后保留该文件也可以。

## 3. 创建 MySQL 数据库

先确保本机 MySQL 服务已启动，然后在 MySQL 客户端执行：

```sql
CREATE DATABASE campus_forum
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

将 `src/main/resources/application.properties` 改名为 `application.yml`，并写入以下配置。把数据库账户和密码替换为自己的本地值：

```yaml
spring:
  application:
    name: campus-forum-backend

  datasource:
    url: jdbc:mysql://localhost:3306/campus_forum?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
    username: root
    password: 替换为你的MySQL密码

  jpa:
    hibernate:
      ddl-auto: update
    open-in-view: false
    properties:
      hibernate:
        format_sql: true

server:
  port: 8080
```

开发环境使用 `ddl-auto: update` 可以让 JPA 根据实体自动建表。上线前改用 Flyway 或 Liquibase 管理数据库迁移，并将其设为 `validate`。

不要把真实数据库密码提交到 Git。后续可以新增未提交的 `application-local.yml`，或改为读取环境变量。

## 4. 建立推荐的代码目录

在 `src/main/java/com/campusforum` 下创建：

```text
auth/       # 注册、登录、JWT
user/       # 用户实体与用户资料
category/   # 课程、教师、社团等分类
post/       # 帖子查询和发布
comment/    # 评论
common/     # 统一响应、全局异常、分页对象
config/     # CORS、Spring Security 等配置
```

第一期只需要实现 `auth`、`category`、`post` 和 `config`。

## 5. 编写并验证第一个接口

新建 `src/main/java/com/campusforum/common/HealthController.java`：

```java
package com.campusforum.common;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthController {

    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "ok");
    }
}
```

Spring Security 会默认保护全部接口。开发初期新建
`src/main/java/com/campusforum/config/SecurityConfig.java`：

```java
package com.campusforum.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll())
                .build();
    }
}
```

运行 `CampusForumBackendApplication`。启动成功后访问：

```text
http://localhost:8080/api/health
```

应看到：

```json
{"status":"ok"}
```

## 6. 第一阶段的数据模型

先建立以下实体，不急于做管理员、内容审核等扩展功能：

| 实体 | 核心字段 |
| --- | --- |
| User | `id`, `username`, `passwordHash`, `nickname`, `role`, `createdAt` |
| Category | `id`, `name`, `type`, `sortOrder` |
| Post | `id`, `author`, `category`, `title`, `content`, `viewCount`, `likeCount`, `createdAt` |
| Comment | `id`, `post`, `author`, `content`, `parentId`, `createdAt` |
| PostLike | `user`, `post`, `createdAt` |

密码只能保存 BCrypt 哈希值，不能保存明文密码，也不要保留当前前端演示用的 `admin / 123456` 校验逻辑。

## 7. 先固定接口契约

建议所有接口前缀为 `/api`，并按以下顺序实现：

| 顺序 | 接口 | 用途 |
| --- | --- | --- |
| 1 | `POST /api/auth/register` | 注册 |
| 2 | `POST /api/auth/login` | 登录并返回 JWT |
| 3 | `GET /api/auth/me` | 获取当前用户 |
| 4 | `GET /api/categories` | 首页分类 |
| 5 | `GET /api/posts/hot` | 首页热门帖子 |
| 6 | `GET /api/posts/{postId}` | 帖子详情 |
| 7 | `GET /api/posts?keyword=&categoryId=&page=&size=` | 搜索与分页列表 |
| 8 | `POST /api/posts` | 发布帖子 |
| 9 | `GET/POST /api/posts/{postId}/comments` | 评论读取与发布 |
| 10 | `POST/DELETE /api/posts/{postId}/likes` | 点赞与取消点赞 |

推荐统一返回格式：

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

列表接口的 `data` 建议包含 `content`、`page`、`size`、`total`，以便前端实现分页。

## 8. 与现有前端联调

后端启动在 `8080` 端口，前端 Vite 默认在 `5173` 端口。编辑
`Frontend/vite.config.ts`，增加开发代理：

```ts
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
```

前端调用时只写相对路径，例如：

```ts
axios.get('/api/posts/hot')
```

不要在 Vue 文件中硬编码 `http://localhost:8080`。应创建一个 Axios 实例，并将它集中放在 `Frontend/src/api/` 下。

需要替换的前端位置：

| 文件 | 当前状态 | 后续改动 |
| --- | --- | --- |
| `Frontend/src/views/Login.vue` | 硬编码登录校验 | 调用 `POST /api/auth/login` |
| `Frontend/src/views/Home.vue` | 本地分类、热门帖子 | 调用分类和热门帖子接口 |
| `Frontend/src/views/post/PostDetail.vue` | 模拟帖子对象 | 调用 `GET /api/posts/{postId}` |
| `Frontend/src/views/Success.vue` | 搜索结果占位 | 改为真正的帖子列表页 |

## 9. 推荐实施顺序

按下面顺序推进，每一步均应先启动验证再继续：

1. 创建工程、连接 MySQL、完成 `/api/health`。
2. 建立 `User` 实体和 Repository。
3. 实现注册、BCrypt 密码加密、登录 JWT。
4. 添加 Axios 实例和 Pinia 用户状态，替换 `Login.vue` 的模拟逻辑。
5. 建立 `Category`、`Post` 实体，准备少量初始化数据。
6. 实现首页分类、热门帖子、详情和搜索接口，并替换前端模拟数据。
7. 实现登录后发布帖子、评论、点赞。
8. 最后增加权限、内容审核、单元测试和数据库迁移。

## 10. 完成第一步的检查清单

- [ ] IDEA 能选中 JDK 17 或 21。
- [ ] `Backend/pom.xml` 已生成并且 Maven 依赖下载完成。
- [ ] MySQL 中存在 `campus_forum` 数据库。
- [ ] 后端可以启动在 `8080` 端口。
- [ ] 浏览器访问 `/api/health` 返回 `{"status":"ok"}`。
- [ ] 前端 Vite 代理已配置，但尚未替换模拟接口。

当以上检查全部通过后，再开始登录和 JWT 模块。
