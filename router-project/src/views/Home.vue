<template>
  <div class="home">
    <h1>首页</h1>
    <p>欢迎来到Vue Router示例项目！</p>
    
    <div class="features">
      <h2>路由功能演示</h2>
      <ul>
        <li>基础路由导航</li>
        <li>带参数的路由</li>
        <li>嵌套路由</li>
        <li>懒加载路由</li>
        <li>路由守卫</li>
        <li>404错误页面</li>
      </ul>
    </div>

    <div class="quick-links">
      <h3>快速链接</h3>
      <router-link to="/about" class="btn">关于我们</router-link>
      <router-link to="/contact" class="btn">联系我们</router-link>
      <router-link to="/user/123" class="btn">用户页面</router-link>
      <router-link to="/lazy" class="btn">懒加载页面</router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('首页组件已挂载')
})
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.features {
  margin: 30px 0;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.features ul {
  list-style-type: none;
  padding: 0;
}

.features li {
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.features li:last-child {
  border-bottom: none;
}

.quick-links {
  margin: 30px 0;
}

.btn {
  display: inline-block;
  margin: 5px 10px 5px 0;
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #369870;
}
</style>
