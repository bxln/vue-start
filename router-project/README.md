# Vue Router 示例项目

这是一个完整的 Vue 3 + Vue Router 4 示例项目，展示了 Vue Router 的各种功能和最佳实践。

## 🚀 项目概述

本项目是一个全面的 Vue Router 学习示例，包含了从基础路由配置到高级功能的完整演示。通过这个项目，您可以学习到：

- 基础路由配置和导航
- 动态路由参数
- 嵌套路由
- 路由守卫
- 懒加载路由
- 编程式导航
- 查询参数处理
- 404错误页面处理

## 🛠️ 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vue Router 4** - Vue.js 官方路由管理器
- **Vite** - 下一代前端构建工具
- **JavaScript ES6+** - 现代 JavaScript 语法

## 📦 安装和运行

### 环境要求

- Node.js 16.0 或更高版本
- npm 或 yarn 包管理器

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📁 项目结构

```
router-project/
├── public/                 # 静态资源
├── src/
│   ├── assets/            # 资源文件
│   │   └── vue.svg        # Vue logo
│   ├── components/        # 可复用组件
│   │   └── HelloWorld.vue # 示例组件
│   ├── router/            # 路由配置
│   │   └── index.js       # 路由主配置文件
│   ├── views/             # 页面组件
│   │   ├── Home.vue       # 首页
│   │   ├── About.vue      # 关于页面
│   │   ├── Contact.vue    # 联系页面
│   │   ├── User.vue       # 用户主页面
│   │   ├── UserProfile.vue # 用户资料页面
│   │   ├── UserPosts.vue  # 用户文章页面
│   │   ├── LazyComponent.vue # 懒加载示例
│   │   └── NotFound.vue   # 404错误页面
│   ├── App.vue            # 根组件
│   ├── main.js            # 应用入口
│   └── style.css          # 全局样式
├── index.html             # HTML 模板
├── package.json           # 项目配置
├── vite.config.js         # Vite 配置
└── README.md              # 项目说明
```

## 🗺️ 路由配置详解

### 路由表结构

项目的路由配置位于 `src/router/index.js`，包含以下路由：

| 路径 | 组件 | 名称 | 说明 |
|------|------|------|------|
| `/` | Home.vue | Home | 首页，展示项目概览 |
| `/about` | About.vue | About | 关于页面，演示编程式导航 |
| `/contact` | Contact.vue | Contact | 联系页面，展示查询参数 |
| `/user/:id` | User.vue | User | 用户页面，动态路由参数 |
| `/user/:id/profile` | UserProfile.vue | UserProfile | 用户资料，嵌套路由 |
| `/user/:id/posts` | UserPosts.vue | UserPosts | 用户文章，嵌套路由 |
| `/lazy` | LazyComponent.vue | Lazy | 懒加载组件示例 |
| `/:pathMatch(.*)*` | NotFound.vue | NotFound | 404错误页面 |

### 路由特性

#### 1. 基础路由
```javascript
{
  path: '/',
  name: 'Home',
  component: Home
}
```

#### 2. 动态路由参数
```javascript
{
  path: '/user/:id',
  name: 'User',
  component: User
}
```

#### 3. 嵌套路由
```javascript
{
  path: '/user/:id',
  component: User,
  children: [
    {
      path: 'profile',
      name: 'UserProfile',
      component: UserProfile
    }
  ]
}
```

#### 4. 懒加载路由
```javascript
{
  path: '/lazy',
  name: 'Lazy',
  component: () => import('../views/LazyComponent.vue')
}
```

#### 5. 路由守卫
```javascript
// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('导航到:', to.path)
  next()
})

// 全局后置钩子
router.afterEach((to, from) => {
  document.title = to.name || 'Vue Router 示例'
})
```

## 📄 组件详解

### 1. App.vue - 根组件
**路径**: `src/App.vue`
**功能**: 应用的根组件，包含导航栏和路由出口

**主要特性**:
- 响应式导航栏，支持移动端
- 路由链接高亮显示
- 页面过渡动画
- 移动端汉堡菜单

**关键代码**:
```vue
<template>
  <nav class="navbar">
    <router-link to="/" class="nav-link">首页</router-link>
    <!-- 其他导航链接 -->
  </nav>

  <main class="main-content">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>
```

### 2. Home.vue - 首页
**路径**: `src/views/Home.vue`
**路由**: `/`
**功能**: 项目首页，展示功能概览和快速导航

**主要特性**:
- 项目功能介绍
- 快速导航链接
- 响应式布局

### 3. About.vue - 关于页面
**路径**: `src/views/About.vue`
**路由**: `/about`
**功能**: 演示编程式导航和路由信息展示

**主要特性**:
- 编程式导航示例 (`router.push()`)
- 路由信息实时显示
- 查询参数处理演示

**关键代码**:
```vue
<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const goToContact = () => {
  router.push('/contact')
}

const goWithQuery = () => {
  router.push({
    path: '/contact',
    query: { from: 'about', timestamp: Date.now() }
  })
}
</script>
```

### 4. Contact.vue - 联系页面
**路径**: `src/views/Contact.vue`
**路由**: `/contact`
**功能**: 展示查询参数处理和表单交互

**主要特性**:
- 查询参数读取和显示
- 联系表单处理
- 返回导航功能

**关键代码**:
```vue
<script setup>
const route = useRoute()
const fromQuery = computed(() => route.query.from)
const timestampQuery = computed(() => route.query.timestamp)
</script>
```

### 5. User.vue - 用户主页面
**路径**: `src/views/User.vue`
**路由**: `/user/:id`
**功能**: 展示动态路由参数和嵌套路由

**主要特性**:
- 动态路由参数获取 (`$route.params.id`)
- 嵌套路由导航
- 路由参数变化监听
- 路由信息详细展示

**关键代码**:
```vue
<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const userId = computed(() => route.params.id)

// 监听路由参数变化
watch(
  () => route.params.id,
  (newId, oldId) => {
    console.log(`用户ID从 ${oldId} 变更为 ${newId}`)
  }
)
</script>

<template>
  <div class="user-nav">
    <router-link :to="`/user/${userId}/profile`">个人资料</router-link>
    <router-link :to="`/user/${userId}/posts`">用户文章</router-link>
  </div>

  <!-- 嵌套路由出口 -->
  <router-view></router-view>
</template>
```

### 6. UserProfile.vue - 用户资料页面
**路径**: `src/views/UserProfile.vue`
**路由**: `/user/:id/profile` (嵌套路由)
**功能**: 展示用户详细资料信息

**主要特性**:
- 嵌套路由组件
- 模拟用户数据获取
- 响应式用户界面
- 技能标签展示

### 7. UserPosts.vue - 用户文章页面
**路径**: `src/views/UserPosts.vue`
**路由**: `/user/:id/posts` (嵌套路由)
**功能**: 展示用户文章列表和搜索功能

**主要特性**:
- 嵌套路由组件
- 文章列表展示
- 搜索和过滤功能
- 分页加载模拟

### 8. LazyComponent.vue - 懒加载组件
**路径**: `src/views/LazyComponent.vue`
**路由**: `/lazy` (懒加载)
**功能**: 演示路由懒加载功能

**主要特性**:
- 代码分割演示
- 异步加载模拟
- 懒加载优势说明

**路由配置**:
```javascript
{
  path: '/lazy',
  name: 'Lazy',
  component: () => import('../views/LazyComponent.vue')
}
```

### 9. NotFound.vue - 404错误页面
**路径**: `src/views/NotFound.vue`
**路由**: `/:pathMatch(.*)* ` (通配符路由)
**功能**: 处理未匹配的路由，显示404错误页面

**主要特性**:
- 友好的错误提示
- 返回导航选项
- 有用的链接推荐
- 技术详情展示

## 🔄 路由关系图

```
App.vue (根组件)
├── 导航栏
│   ├── 首页 → Home.vue (/)
│   ├── 关于 → About.vue (/about)
│   ├── 联系 → Contact.vue (/contact)
│   ├── 用户 → User.vue (/user/:id)
│   └── 懒加载 → LazyComponent.vue (/lazy)
│
├── 路由出口 <router-view>
│   ├── Home.vue - 首页展示
│   ├── About.vue - 编程式导航演示
│   ├── Contact.vue - 查询参数处理
│   ├── User.vue - 动态参数 + 嵌套路由
│   │   ├── <router-view> 嵌套出口
│   │   ├── UserProfile.vue (/user/:id/profile)
│   │   └── UserPosts.vue (/user/:id/posts)
│   ├── LazyComponent.vue - 懒加载演示
│   └── NotFound.vue - 404处理
│
└── 页脚
```

## 🎯 学习要点

### 1. 路由配置
- 学习如何在 `router/index.js` 中配置路由
- 理解路由对象的各个属性 (`path`, `name`, `component`)
- 掌握嵌套路由的 `children` 配置

### 2. 导航方式
- **声明式导航**: `<router-link to="/path">`
- **编程式导航**: `router.push()`, `router.replace()`, `router.go()`

### 3. 路由参数
- **动态参数**: `/user/:id` → `$route.params.id`
- **查询参数**: `?name=value` → `$route.query.name`

### 4. 组合式API
- `useRouter()` - 获取路由器实例
- `useRoute()` - 获取当前路由信息

### 5. 高级功能
- 路由守卫 (beforeEach, afterEach)
- 懒加载 (代码分割)
- 嵌套路由
- 路由元信息

## 🌟 最佳实践

1. **组件组织**: 页面组件放在 `views/` 目录，可复用组件放在 `components/` 目录
2. **路由命名**: 为每个路由设置有意义的 `name` 属性
3. **懒加载**: 对于大型应用，使用懒加载减少初始包大小
4. **错误处理**: 始终配置404页面处理未匹配的路由
5. **导航守卫**: 合理使用路由守卫进行权限控制和页面标题设置

## 📚 相关文档

- [Vue Router 官方文档](https://router.vuejs.org/zh/)
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Vite 官方文档](https://cn.vitejs.dev/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个示例项目！

## 📄 许可证

MIT License
