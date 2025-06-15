<template>
  <div class="about">
    <h1>关于我们</h1>
    <p>这是一个Vue Router的示例项目，展示了Vue 3中路由的各种用法。</p>
    
    <div class="content">
      <h2>Vue Router 特性</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <h3>声明式导航</h3>
          <p>使用 &lt;router-link&gt; 组件进行页面导航</p>
          <code>&lt;router-link to="/about"&gt;关于&lt;/router-link&gt;</code>
        </div>
        
        <div class="feature-card">
          <h3>编程式导航</h3>
          <p>使用 router.push() 方法进行页面跳转</p>
          <button @click="goToContact" class="nav-btn">跳转到联系页面</button>
        </div>
        
        <div class="feature-card">
          <h3>路由参数</h3>
          <p>通过URL传递参数</p>
          <button @click="goToUser" class="nav-btn">访问用户页面</button>
        </div>
        
        <div class="feature-card">
          <h3>查询参数</h3>
          <p>使用查询字符串传递数据</p>
          <button @click="goWithQuery" class="nav-btn">带查询参数跳转</button>
        </div>
      </div>
    </div>

    <div class="router-info">
      <h3>当前路由信息</h3>
      <p><strong>路径:</strong> {{ $route.path }}</p>
      <p><strong>名称:</strong> {{ $route.name }}</p>
      <p><strong>查询参数:</strong> {{ JSON.stringify($route.query) }}</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// 编程式导航示例
const goToContact = () => {
  router.push('/contact')
}

const goToUser = () => {
  router.push('/user/456')
}

const goWithQuery = () => {
  router.push({
    path: '/contact',
    query: { from: 'about', timestamp: Date.now() }
  })
}
</script>

<style scoped>
.about {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.content {
  margin: 30px 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.feature-card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.feature-card h3 {
  color: #42b883;
  margin-bottom: 10px;
}

.feature-card code {
  background-color: #e8e8e8;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  display: block;
  margin-top: 10px;
}

.nav-btn {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.nav-btn:hover {
  background-color: #369870;
}

.router-info {
  margin: 30px 0;
  padding: 20px;
  background-color: #f0f8ff;
  border-radius: 8px;
  border-left: 4px solid #42b883;
}

.router-info p {
  margin: 8px 0;
}
</style>
