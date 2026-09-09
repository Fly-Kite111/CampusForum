# CampusForum 校园论坛

一个面向校园交流场景的论坛前端项目，提供用户登录、内容分类浏览、热门帖子轮播、站内搜索、帖子详情和异常页面等基础功能。

项目目前处于前端原型阶段，前端基于 Vue 3、TypeScript、Vite 和 Element Plus 构建；后端目录已预留，后续计划接入 Spring Boot 与真实业务接口。

## 项目状态

- 前端页面与基础交互已完成
- 登录、帖子列表和帖子详情暂时使用本地模拟数据
- 搜索功能目前展示成功提示并跳转到结果占位页
- `Backend` 目录暂未包含后端实现

## 功能介绍

- **用户登录**：包含账号、密码必填校验和登录结果提示
- **校园首页**：展示站点标题、搜索框、分类导航和热门帖子轮播
- **分类导航**：支持课程、教师和社团等校园内容分类切换
- **帖子跳转**：点击热门帖子可进入对应的帖子详情页
- **路由处理**：提供登录页、首页、帖子详情页、成功页和 404 页面
- **状态管理**：已接入 Pinia，为后续用户状态和业务数据管理预留基础

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 前端框架 | Vue 3 |
| 开发语言 | TypeScript |
| 构建工具 | Vite |
| UI 组件库 | Element Plus |
| 路由管理 | Vue Router |
| 状态管理 | Pinia |
| HTTP 客户端 | Axios |
| 代码格式化 | Prettier |
| 后端规划 | Spring Boot |

## 项目结构

```text
CampusForum/
├─ Backend/                  # 后端预留目录
│  └─ .gitkeep
├─ Frontend/                 # Vue 前端项目
│  ├─ public/                # 公共静态资源
│  ├─ src/
│  │  ├─ assets/             # 页面资源
│  │  ├─ router/             # 路由配置
│  │  ├─ stores/             # Pinia 状态管理
│  │  ├─ views/              # 页面组件
│  │  │  ├─ post/            # 帖子相关页面
│  │  │  ├─ Home.vue         # 首页
│  │  │  ├─ Login.vue        # 登录页
│  │  │  ├─ NotFound.vue     # 404 页面
│  │  │  └─ Success.vue      # 搜索结果占位页
│  │  ├─ App.vue             # 根组件
│  │  └─ main.ts             # 应用入口
│  ├─ package.json
│  └─ vite.config.ts
├─ .gitignore
└─ README.md
```

## 环境要求

- Node.js `^22.18.0` 或 `>=24.12.0`
- npm（随 Node.js 安装）

可通过以下命令检查本地环境：

```bash
node -v
npm -v
```

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/Fly-Kite111/CampusForum.git
cd CampusForum
```

### 2. 安装前端依赖

```bash
cd Frontend
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

启动成功后，根据终端输出访问本地地址，通常为：

```text
http://localhost:5173
```

## 演示账号

当前登录逻辑使用前端硬编码数据，仅用于页面演示：

| 账号 | 密码 |
| --- | --- |
| `admin` | `123456` |

> 请勿将当前演示登录逻辑用于生产环境。接入后端后，应通过安全的身份认证接口完成登录，并避免在前端保存明文密码。

## 常用命令

在 `Frontend` 目录中执行：

```bash
# 启动开发环境
npm run dev

# TypeScript 类型检查并构建生产版本
npm run build

# 预览生产构建结果
npm run preview

# 格式化 src 目录下的代码
npm run format
```

## 页面路由

| 路径 | 页面 | 说明 |
| --- | --- | --- |
| `/` | 登录页 | 用户登录入口 |
| `/home` | 首页 | 分类导航、搜索和热门帖子 |
| `/post/:postId` | 帖子详情 | 根据帖子 ID 展示详情 |
| `/success` | 成功页 | 当前作为搜索结果占位页 |
| `/:pathMatch(.*)*` | 404 页面 | 处理不存在的访问路径 |

## 当前说明

- 登录账号和密码直接写在前端代码中，仅适合开发演示
- 首页分类、热门帖子和帖子详情均为模拟数据
- Axios 已安装，但尚未连接真实后端接口
- 项目暂未配置自动化测试
- 后端启动方式、数据库配置和接口文档将在后端实现后补充

## 后续计划

- 使用 Spring Boot 实现用户、帖子、评论和分类接口
- 接入数据库并完善数据持久化
- 使用 Token 或 Session 实现登录鉴权与路由守卫
- 实现帖子发布、编辑、删除、评论和点赞功能
- 将搜索功能接入真实帖子数据
- 增加用户中心、权限管理和内容审核
- 补充单元测试、接口测试和持续集成流程

## 贡献指南

欢迎通过 Issue 或 Pull Request 提交建议与改进：

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/your-feature`
3. 提交修改：`git commit -m "feat: add your feature"`
4. 推送分支：`git push origin feature/your-feature`
5. 创建 Pull Request

## License

本项目暂未添加开源许可证。在许可证明确之前，默认保留所有权利。
