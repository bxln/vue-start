<template>
  <div class="contact">
    <h1>联系我们</h1>
    
    <div v-if="fromQuery" class="query-info">
      <p>您是从 <strong>{{ fromQuery }}</strong> 页面跳转过来的</p>
      <p v-if="timestampQuery">跳转时间: {{ new Date(parseInt(timestampQuery)).toLocaleString() }}</p>
    </div>

    <div class="contact-form">
      <h2>联系表单</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">姓名:</label>
          <input 
            type="text" 
            id="name" 
            v-model="form.name" 
            required
          >
        </div>
        
        <div class="form-group">
          <label for="email">邮箱:</label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email" 
            required
          >
        </div>
        
        <div class="form-group">
          <label for="message">消息:</label>
          <textarea 
            id="message" 
            v-model="form.message" 
            rows="5" 
            required
          ></textarea>
        </div>
        
        <button type="submit" class="submit-btn">发送消息</button>
      </form>
    </div>

    <div class="contact-info">
      <h2>联系信息</h2>
      <div class="info-grid">
        <div class="info-item">
          <h3>📧 邮箱</h3>
          <p>contact@example.com</p>
        </div>
        <div class="info-item">
          <h3>📞 电话</h3>
          <p>+86 123-4567-8900</p>
        </div>
        <div class="info-item">
          <h3>📍 地址</h3>
          <p>北京市朝阳区示例街道123号</p>
        </div>
      </div>
    </div>

    <div class="navigation">
      <button @click="goBack" class="back-btn">返回上一页</button>
      <router-link to="/" class="home-link">回到首页</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 表单数据
const form = ref({
  name: '',
  email: '',
  message: ''
})

// 获取查询参数
const fromQuery = computed(() => route.query.from)
const timestampQuery = computed(() => route.query.timestamp)

// 表单提交
const submitForm = () => {
  alert(`感谢您的消息，${form.value.name}！我们会尽快回复您。`)
  // 重置表单
  form.value = {
    name: '',
    email: '',
    message: ''
  }
}

// 返回上一页
const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
.contact {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.query-info {
  background-color: #e8f5e8;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 4px solid #42b883;
}

.contact-form {
  margin: 30px 0;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #42b883;
}

.submit-btn {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:hover {
  background-color: #369870;
}

.contact-info {
  margin: 30px 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.info-item {
  padding: 20px;
  background-color: #f0f8ff;
  border-radius: 8px;
  text-align: center;
}

.info-item h3 {
  color: #42b883;
  margin-bottom: 10px;
}

.navigation {
  margin: 30px 0;
  text-align: center;
}

.back-btn {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.back-btn:hover {
  background-color: #5a6268;
}

.home-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.home-link:hover {
  background-color: #369870;
}
</style>
