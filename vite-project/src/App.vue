<script setup>
import { ref } from 'vue'
import FormBindingExample from './components/FormBindingExample.vue'
import ComputedWatchExample from './components/ComputedWatchExample.vue'
import ConditionalListExample from './components/ConditionalListExample.vue'
import EventHandlingExample from './components/EventHandlingExample.vue'
import ComponentCommunication from './components/ComponentCommunication.vue'
import LifecycleExample from './components/LifecycleExample.vue'
import ReactivityExample from './components/ReactivityExample.vue'
import SlotExample from './components/SlotExample.vue'
import PhotoWall from './components/PhotoWall.vue'

const activeTab = ref('forms')

const tabs = [
  { id: 'forms', name: '表单绑定', component: FormBindingExample },
  { id: 'computed', name: '计算属性&监听器', component: ComputedWatchExample },
  { id: 'conditional', name: '条件&列表渲染', component: ConditionalListExample },
  { id: 'events', name: '事件处理', component: EventHandlingExample },
  { id: 'communication', name: '组件通信', component: ComponentCommunication },
  { id: 'lifecycle', name: '生命周期', component: LifecycleExample },
  { id: 'reactivity', name: '响应式数据', component: ReactivityExample },
  { id: 'slots', name: '插槽示例', component: SlotExample }, 
  { id: 'photo-wall', name: '图片墙', component: PhotoWall }
]

const setActiveTab = (tabId) => {
  activeTab.value = tabId
}
</script>

<template>
  <div id="app">
    <!-- 头部 -->
    <header class="header">
      <div class="header-content">
        <div class="logo-section">
          <img src="./assets/vue.svg" class="logo" alt="Vue logo" />
          <h1>Vue 3 常用示例</h1>
        </div>
        <p class="subtitle">Vue 3 Composition API 和常用功能演示</p>
      </div>
    </header>

    <!-- 标签页导航 -->
    <nav class="tab-nav">
      <div class="tab-container">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="setActiveTab(tab.id)"
          :class="['tab-button', { active: activeTab === tab.id }]"
        >
          {{ tab.name }}
        </button>
      </div>
    </nav>

    <!-- 内容区域 -->
    <main class="main-content">
      <div class="content-container">
        <component
          :is="tabs.find(tab => tab.id === activeTab)?.component"
          :key="activeTab"
        />
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>&copy; 2024 Vue 3 示例项目 - 学习Vue 3的最佳实践</p>
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

/* 头部样式 */
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px 20px;
  text-align: center;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
}

.logo {
  height: 60px;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-top: 10px;
}

/* 标签页导航 */
.tab-nav {
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 20px;
  overflow-x: auto;
}

.tab-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 0;
}

.tab-button {
  background: none;
  border: none;
  padding: 15px 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
  white-space: nowrap;
}

.tab-button:hover {
  color: #42b883;
  background-color: #f8f9fa;
}

.tab-button.active {
  color: #42b883;
  border-bottom-color: #42b883;
  background-color: #f0f8f0;
}

/* 主要内容 */
.main-content {
  flex: 1;
  padding: 40px 20px;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* 页脚 */
.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .logo-section {
    flex-direction: column;
    gap: 10px;
  }

  .tab-container {
    justify-content: flex-start;
  }

  .tab-button {
    padding: 12px 16px;
    font-size: 13px;
  }

  .main-content {
    padding: 20px 15px;
  }
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
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
