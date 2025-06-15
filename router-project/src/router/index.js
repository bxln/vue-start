import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import User from '../views/User.vue'
import UserProfile from '../views/UserProfile.vue'
import UserPosts from '../views/UserPosts.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    // 带参数的路由
    path: '/user/:id',
    name: 'User',
    component: User,
    // 嵌套路由
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'profile',
        name: 'UserProfile',
        component: UserProfile
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'posts',
        name: 'UserPosts',
        component: UserPosts
      }
    ]
  },
  {
    // 懒加载路由
    path: '/lazy',
    name: 'Lazy',
    component: () => import('../views/LazyComponent.vue')
  },
  {
    // 404 页面 - 必须放在最后
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('导航到:', to.path)
  // 这里可以添加认证逻辑
  next()
})

// 全局后置钩子
router.afterEach((to, from) => {
  console.log('导航完成:', to.path)
  // 这里可以添加页面标题设置等逻辑
  document.title = to.name || 'Vue Router 示例'
})

export default router
