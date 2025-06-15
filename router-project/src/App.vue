<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <!-- Logo -->
        <router-link to="/" class="nav-logo" @click="closeMobileMenu">
          <img src="./assets/vue.svg" alt="Vue Logo" class="logo-img">
          <span>Vue Router 示例</span>
        </router-link>

        <!-- 桌面端导航菜单 -->
        <div class="nav-menu">
          <router-link to="/" class="nav-link" @click="closeMobileMenu">首页</router-link>
          <router-link to="/about" class="nav-link" @click="closeMobileMenu">关于</router-link>
          <router-link to="/contact" class="nav-link" @click="closeMobileMenu">联系</router-link>
          <router-link to="/user/123" class="nav-link" @click="closeMobileMenu">用户</router-link>
          <router-link to="/lazy" class="nav-link" @click="closeMobileMenu">懒加载</router-link>
        </div>

        <!-- 移动端菜单按钮 -->
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <span class="hamburger" :class="{ active: isMobileMenuOpen }"></span>
        </button>
      </div>

      <!-- 移动端导航菜单 -->
      <div class="mobile-menu" :class="{ active: isMobileMenuOpen }">
        <router-link to="/" class="mobile-nav-link" @click="closeMobileMenu">首页</router-link>
        <router-link to="/about" class="mobile-nav-link" @click="closeMobileMenu">关于</router-link>
        <router-link to="/contact" class="mobile-nav-link" @click="closeMobileMenu">联系</router-link>
        <router-link to="/user/123" class="mobile-nav-link" @click="closeMobileMenu">用户</router-link>
        <router-link to="/lazy" class="mobile-nav-link" @click="closeMobileMenu">懒加载</router-link>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <!-- 路由视图 -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2024 Vue Router 示例项目</p>
        <p>当前路由: <code>{{ route.path }}</code></p>
      </div>
    </footer>
  </div>
</template>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 导航栏样式 */
.navbar {
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.nav-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #42b883;
  font-weight: bold;
  font-size: 18px;
}

.logo-img {
  height: 32px;
  margin-right: 10px;
}

.nav-menu {
  display: flex;
  gap: 30px;
}

.nav-link {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s;
}

.nav-link:hover {
  color: #42b883;
  background-color: #f0f8f0;
}

.nav-link.router-link-active {
  color: #42b883;
  background-color: #e8f5e8;
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.hamburger {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #333;
  position: relative;
  transition: all 0.3s;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 3px;
  background-color: #333;
  transition: all 0.3s;
}

.hamburger::before {
  top: -8px;
}

.hamburger::after {
  bottom: -8px;
}

.hamburger.active {
  background-color: transparent;
}

.hamburger.active::before {
  transform: rotate(45deg);
  top: 0;
}

.hamburger.active::after {
  transform: rotate(-45deg);
  bottom: 0;
}

/* 移动端菜单 */
.mobile-menu {
  display: none;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  padding: 20px;
}

.mobile-menu.active {
  display: block;
}

.mobile-nav-link {
  display: block;
  text-decoration: none;
  color: #666;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 500;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  color: #42b883;
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 页脚 */
.footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 20px;
  margin-top: auto;
}

.footer-content p {
  margin: 5px 0;
}

.footer code {
  background-color: #555;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .main-content {
    padding: 20px 15px;
  }

  .nav-container {
    padding: 0 15px;
  }
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
