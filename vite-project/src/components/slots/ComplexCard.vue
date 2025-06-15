<template>
  <div class="complex-card">
    <!-- 头部作用域插槽 -->
    <div class="complex-header">
      <slot name="header" :title="cardData.title" :subtitle="cardData.subtitle">
        <div class="default-header">
          <h4>{{ cardData.title }}</h4>
          <p>{{ cardData.subtitle }}</p>
        </div>
      </slot>
    </div>

    <!-- 内容作用域插槽 -->
    <div class="complex-content">
      <slot name="content" :data="cardData.items" :loading="loading">
        <div v-if="loading" class="default-loading">
          <div class="spinner"></div>
          <p>默认加载中...</p>
        </div>
        <div v-else class="default-content">
          <div v-for="item in cardData.items" :key="item.id" class="default-item">
            {{ item.name }}: {{ item.value }}
          </div>
        </div>
      </slot>
    </div>

    <!-- 底部作用域插槽 -->
    <div class="complex-footer">
      <slot name="footer" :stats="stats">
        <div class="default-footer">
          <span>总计: {{ stats.total }}</span>
          <span>平均: {{ stats.average }}</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

// 卡片数据
const cardData = reactive({
  title: '复杂卡片示例',
  subtitle: '展示作用域插槽的强大功能',
  items: []
})

const loading = ref(true)

// 计算统计数据
const stats = computed(() => {
  const values = cardData.items.map(item => item.value)
  const total = values.reduce((sum, val) => sum + val, 0)
  const average = values.length > 0 ? (total / values.length).toFixed(1) : 0
  
  return {
    total,
    average,
    count: values.length
  }
})

// 模拟数据加载
const loadData = async () => {
  loading.value = true
  
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  cardData.items = [
    { id: 1, name: '项目A', value: 150, icon: '📊' },
    { id: 2, name: '项目B', value: 230, icon: '📈' },
    { id: 3, name: '项目C', value: 180, icon: '📉' },
    { id: 4, name: '项目D', value: 320, icon: '💹' },
    { id: 5, name: '项目E', value: 95, icon: '📋' }
  ]
  
  loading.value = false
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.complex-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  overflow: hidden;
}

.complex-header {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.complex-content {
  padding: 20px;
  min-height: 200px;
}

.complex-footer {
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #e0e0e0;
}

.default-header h4 {
  margin: 0 0 5px 0;
}

.default-header p {
  margin: 0;
  opacity: 0.9;
}

.default-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 150px;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.default-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.default-item {
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 3px solid #42b883;
}

.default-footer {
  display: flex;
  gap: 20px;
  color: #666;
  font-size: 14px;
}
</style>
