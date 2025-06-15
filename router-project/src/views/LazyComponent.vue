<template>
  <div class="lazy-component">
    <h1>懒加载组件</h1>
    <p>这是一个懒加载的组件示例！</p>
    
    <div class="info-box">
      <h2>🚀 懒加载的优势</h2>
      <ul>
        <li>减少初始包大小</li>
        <li>提高首屏加载速度</li>
        <li>按需加载资源</li>
        <li>优化用户体验</li>
      </ul>
    </div>

    <div class="code-example">
      <h3>懒加载路由配置示例</h3>
      <pre><code>{{lazyRouteExample}}</code></pre>
    </div>

    <div class="loading-demo">
      <h3>模拟加载状态</h3>
      <button @click="simulateLoading" :disabled="isLoading" class="load-btn">
        {{ isLoading ? '加载中...' : '模拟异步加载' }}
      </button>
      
      <div v-if="loadedData" class="loaded-content">
        <h4>加载完成！</h4>
        <p>{{ loadedData }}</p>
      </div>
    </div>

    <div class="navigation">
      <router-link to="/" class="back-btn">返回首页</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(false)
const loadedData = ref('')

const lazyRouteExample = `{
  path: '/lazy',
  name: 'Lazy',
  component: () => import('../views/LazyComponent.vue')
}`

const simulateLoading = async () => {
  isLoading.value = true
  loadedData.value = ''
  
  // 模拟异步操作
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  isLoading.value = false
  loadedData.value = '这是异步加载的数据内容！懒加载组件可以在需要时才加载，提高应用性能。'
}

onMounted(() => {
  console.log('懒加载组件已挂载')
})
</script>

<style scoped>
.lazy-component {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.info-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 12px;
  margin: 30px 0;
}

.info-box h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

.info-box ul {
  list-style: none;
  padding: 0;
}

.info-box li {
  padding: 8px 0;
  position: relative;
  padding-left: 25px;
}

.info-box li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4ade80;
  font-weight: bold;
}

.code-example {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 30px 0;
  border-left: 4px solid #42b883;
}

.code-example h3 {
  margin-top: 0;
  color: #42b883;
}

.code-example pre {
  background-color: #2d3748;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 15px 0 0 0;
}

.code-example code {
  font-family: 'Courier New', monospace;
  font-size: 14px;
}

.loading-demo {
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin: 30px 0;
}

.loading-demo h3 {
  margin-top: 0;
  color: #333;
}

.load-btn {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.load-btn:hover:not(:disabled) {
  background-color: #369870;
}

.load-btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.loaded-content {
  margin-top: 20px;
  padding: 20px;
  background-color: #f0f9ff;
  border-radius: 8px;
  border-left: 4px solid #0ea5e9;
}

.loaded-content h4 {
  margin-top: 0;
  color: #0ea5e9;
}

.navigation {
  text-align: center;
  margin-top: 40px;
}

.back-btn {
  display: inline-block;
  padding: 12px 24px;
  background-color: #6c757d;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: #5a6268;
}

@media (max-width: 768px) {
  .lazy-component {
    padding: 15px;
  }
  
  .info-box {
    padding: 20px;
  }
  
  .code-example pre {
    font-size: 12px;
  }
}
</style>
