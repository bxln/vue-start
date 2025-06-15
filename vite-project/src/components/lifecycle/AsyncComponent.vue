<template>
  <div class="async-component">
    <h4>异步加载的组件</h4>
    <div class="async-content">
      <p><strong>组件ID:</strong> {{ componentId }}</p>
      <p><strong>加载时间:</strong> {{ loadTime }}</p>
      <p><strong>状态:</strong> {{ status }}</p>
      
      <div class="async-data">
        <h5>异步数据:</h5>
        <div v-if="loading" class="loading">加载数据中...</div>
        <div v-else-if="data" class="data-display">
          <p><strong>标题:</strong> {{ data.title }}</p>
          <p><strong>内容:</strong> {{ data.content }}</p>
          <p><strong>作者:</strong> {{ data.author }}</p>
        </div>
      </div>
      
      <div class="async-actions">
        <button @click="refreshData" class="btn btn-primary">
          刷新数据
        </button>
        <button @click="simulateError" class="btn btn-danger">
          模拟错误
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 定义 emits
const emit = defineEmits(['component-ready'])

// 组件状态
const componentId = ref(Math.random().toString(36).substr(2, 9))
const loadTime = ref('')
const status = ref('初始化')
const loading = ref(false)
const data = ref(null)

// 模拟异步数据获取
const fetchAsyncData = async () => {
  loading.value = true
  status.value = '加载数据'
  
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    data.value = {
      title: `异步标题 ${Math.floor(Math.random() * 100)}`,
      content: '这是异步加载的内容，展示了组件的异步数据获取能力。',
      author: `作者${Math.floor(Math.random() * 10)}`
    }
    
    status.value = '数据已加载'
  } catch (error) {
    status.value = '加载失败'
    console.error('异步数据加载失败:', error)
  } finally {
    loading.value = false
  }
}

const refreshData = () => {
  data.value = null
  fetchAsyncData()
}

const simulateError = () => {
  status.value = '发生错误'
  throw new Error('模拟的异步组件错误')
}

// 组件挂载时的操作
onMounted(async () => {
  loadTime.value = new Date().toLocaleString()
  status.value = '已挂载'
  
  // 获取初始数据
  await fetchAsyncData()
  
  // 通知父组件组件已就绪
  emit('component-ready')
})
</script>

<style scoped>
.async-component {
  border: 2px solid #6f42c1;
  border-radius: 4px;
  padding: 15px;
  margin-top: 15px;
  background-color: #f8f5ff;
}

.async-component h4 {
  margin-top: 0;
  color: #6f42c1;
}

.async-content {
  background-color: white;
  padding: 15px;
  border-radius: 4px;
}

.async-data {
  margin: 15px 0;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.async-data h5 {
  margin-top: 0;
  color: #333;
}

.loading {
  text-align: center;
  color: #666;
  font-style: italic;
}

.data-display {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  border-left: 3px solid #6f42c1;
}

.async-actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.btn-primary {
  background-color: #42b883;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}
</style>
