<template>
  <div class="lifecycle-example">
    <h2>生命周期示例</h2>
    <p class="description">演示Vue 3 Composition API中的生命周期钩子函数</p>

    <div class="examples-grid">
      <!-- 生命周期日志 -->
      <div class="example-card">
        <h3>生命周期钩子</h3>
        <div class="lifecycle-info">
          <p><strong>当前状态:</strong> {{ currentPhase }}</p>
          <p><strong>组件挂载时间:</strong> {{ mountTime }}</p>
          <p><strong>更新次数:</strong> {{ updateCount }}</p>
        </div>

        <div class="lifecycle-controls">
          <button @click="triggerUpdate" class="btn btn-primary">
            触发更新
          </button>
          <button @click="toggleChild" class="btn btn-secondary">
            {{ showChild ? '销毁' : '创建' }} 子组件
          </button>
        </div>

        <div class="lifecycle-logs">
          <h4>生命周期日志:</h4>
          <div class="log-container">
            <div v-for="(log, index) in lifecycleLogs" :key="index" class="log-item">
              <span class="log-time">{{ log.time }}</span>
              <span class="log-phase">{{ log.phase }}</span>
              <span class="log-message">{{ log.message }}</span>
            </div>
          </div>
          <button @click="clearLogs" class="btn btn-info">清空日志</button>
        </div>

        <!-- 动态子组件 -->
        <LifecycleChild v-if="showChild" @lifecycle-event="handleChildLifecycle" />
      </div>

      <!-- 数据获取示例 -->
      <div class="example-card">
        <h3>数据获取生命周期</h3>
        <div class="data-fetch-demo">
          <div class="fetch-controls">
            <button @click="fetchData" class="btn btn-primary" :disabled="loading">
              {{ loading ? '加载中...' : '获取数据' }}
            </button>
            <button @click="refreshData" class="btn btn-secondary">
              刷新数据
            </button>
          </div>

          <div class="fetch-status">
            <p><strong>加载状态:</strong> {{ loading ? '加载中' : '已完成' }}</p>
            <p><strong>数据状态:</strong> {{ dataStatus }}</p>
            <p><strong>最后更新:</strong> {{ lastUpdate }}</p>
          </div>

          <div v-if="userData" class="user-data">
            <h4>用户数据:</h4>
            <div class="user-card">
              <p><strong>姓名:</strong> {{ userData.name }}</p>
              <p><strong>邮箱:</strong> {{ userData.email }}</p>
              <p><strong>公司:</strong> {{ userData.company?.name }}</p>
              <p><strong>网站:</strong> {{ userData.website }}</p>
            </div>
          </div>

          <div v-if="error" class="error-message">
            <p><strong>错误:</strong> {{ error }}</p>
          </div>
        </div>
      </div>

      <!-- 定时器和清理 -->
      <div class="example-card">
        <h3>定时器和资源清理</h3>
        <div class="timer-demo">
          <div class="timer-display">
            <p><strong>计时器:</strong> {{ timer }}秒</p>
            <p><strong>随机数:</strong> {{ randomNumber }}</p>
            <p><strong>窗口大小:</strong> {{ windowSize.width }} x {{ windowSize.height }}</p>
          </div>

          <div class="timer-controls">
            <button @click="startTimer" class="btn btn-success" :disabled="timerRunning">
              开始计时
            </button>
            <button @click="stopTimer" class="btn btn-danger" :disabled="!timerRunning">
              停止计时
            </button>
            <button @click="resetTimer" class="btn btn-secondary">
              重置计时
            </button>
          </div>

          <div class="resource-info">
            <h4>活跃资源:</h4>
            <p>定时器: {{ timerRunning ? '运行中' : '已停止' }}</p>
            <p>窗口监听器: {{ windowListenerActive ? '活跃' : '未活跃' }}</p>
            <p>随机数生成器: {{ randomGeneratorActive ? '活跃' : '未活跃' }}</p>
          </div>
        </div>
      </div>

      <!-- 异步组件加载 -->
      <div class="example-card">
        <h3>异步组件加载</h3>
        <div class="async-demo">
          <div class="async-controls">
            <button @click="loadAsyncComponent" class="btn btn-primary" :disabled="asyncLoading">
              {{ asyncLoading ? '加载中...' : '加载异步组件' }}
            </button>
            <button @click="unloadAsyncComponent" class="btn btn-secondary">
              卸载组件
            </button>
          </div>

          <div class="async-status">
            <p><strong>组件状态:</strong> {{ asyncComponentStatus }}</p>
            <p><strong>加载时间:</strong> {{ asyncLoadTime }}ms</p>
          </div>

          <!-- 异步组件占位 -->
          <div v-if="asyncLoading" class="loading-placeholder">
            <div class="spinner"></div>
            <p>组件加载中...</p>
          </div>

          <component 
            v-if="asyncComponent" 
            :is="asyncComponent" 
            @component-ready="handleAsyncReady"
          />
        </div>
      </div>

      <!-- 错误边界模拟 -->
      <div class="example-card">
        <h3>错误处理</h3>
        <div class="error-demo">
          <div class="error-controls">
            <button @click="triggerError" class="btn btn-danger">
              触发错误
            </button>
            <button @click="recoverFromError" class="btn btn-success">
              恢复错误
            </button>
          </div>

          <div class="error-status">
            <p><strong>错误状态:</strong> {{ hasError ? '有错误' : '正常' }}</p>
            <p><strong>错误信息:</strong> {{ errorMessage || '无' }}</p>
          </div>

          <div v-if="!hasError" class="normal-content">
            <h4>正常内容</h4>
            <p>这是正常显示的内容</p>
            <button @click="normalAction" class="btn btn-info">正常操作</button>
          </div>

          <div v-else class="error-content">
            <h4>错误状态</h4>
            <p>组件遇到了错误，请尝试恢复</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  ref, 
  reactive, 
  onMounted, 
  onUpdated, 
  onUnmounted, 
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount,
  onErrorCaptured,
  nextTick
} from 'vue'

// 导入子组件
import LifecycleChild from './lifecycle/LifecycleChild.vue'

// 生命周期状态
const currentPhase = ref('初始化')
const mountTime = ref('')
const updateCount = ref(0)
const lifecycleLogs = ref([])
const showChild = ref(false)

// 添加生命周期日志
const addLifecycleLog = (phase, message) => {
  const log = {
    time: new Date().toLocaleTimeString(),
    phase,
    message
  }
  lifecycleLogs.value.unshift(log)
  if (lifecycleLogs.value.length > 20) {
    lifecycleLogs.value.pop()
  }
  currentPhase.value = phase
}

// 生命周期钩子
onBeforeMount(() => {
  addLifecycleLog('beforeMount', '组件挂载前')
})

onMounted(() => {
  mountTime.value = new Date().toLocaleString()
  addLifecycleLog('mounted', '组件已挂载')
  
  // 启动窗口大小监听
  startWindowListener()
  startRandomGenerator()
})

onBeforeUpdate(() => {
  addLifecycleLog('beforeUpdate', '组件更新前')
})

onUpdated(() => {
  updateCount.value++
  addLifecycleLog('updated', `组件已更新 (第${updateCount.value}次)`)
})

onBeforeUnmount(() => {
  addLifecycleLog('beforeUnmount', '组件卸载前')
  
  // 清理资源
  stopTimer()
  stopWindowListener()
  stopRandomGenerator()
})

onUnmounted(() => {
  addLifecycleLog('unmounted', '组件已卸载')
})

onErrorCaptured((error, instance, info) => {
  addLifecycleLog('errorCaptured', `捕获错误: ${error.message}`)
  console.error('组件错误:', error, info)
  return false
})

// 基础操作
const triggerUpdate = () => {
  // 触发响应式更新
  updateCount.value = updateCount.value
}

const toggleChild = () => {
  showChild.value = !showChild.value
}

const clearLogs = () => {
  lifecycleLogs.value = []
}

const handleChildLifecycle = (data) => {
  addLifecycleLog('子组件', `子组件${data.phase}: ${data.message}`)
}

// 数据获取示例
const loading = ref(false)
const userData = ref(null)
const error = ref('')
const dataStatus = ref('未加载')
const lastUpdate = ref('')

const fetchData = async () => {
  loading.value = true
  error.value = ''
  dataStatus.value = '加载中'
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 模拟随机成功/失败
    if (Math.random() > 0.2) {
      userData.value = {
        name: `用户${Math.floor(Math.random() * 100)}`,
        email: `user${Math.floor(Math.random() * 100)}@example.com`,
        company: {
          name: `公司${Math.floor(Math.random() * 10)}`
        },
        website: `https://example${Math.floor(Math.random() * 10)}.com`
      }
      dataStatus.value = '加载成功'
      lastUpdate.value = new Date().toLocaleString()
    } else {
      throw new Error('网络请求失败')
    }
  } catch (err) {
    error.value = err.message
    dataStatus.value = '加载失败'
    userData.value = null
  } finally {
    loading.value = false
  }
}

const refreshData = () => {
  userData.value = null
  error.value = ''
  fetchData()
}

// 定时器和资源管理
const timer = ref(0)
const timerRunning = ref(false)
const randomNumber = ref(0)
const windowSize = reactive({ width: 0, height: 0 })
const windowListenerActive = ref(false)
const randomGeneratorActive = ref(false)

let timerInterval = null
let randomInterval = null

const startTimer = () => {
  if (!timerRunning.value) {
    timerRunning.value = true
    timerInterval = setInterval(() => {
      timer.value++
    }, 1000)
  }
}

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
    timerRunning.value = false
  }
}

const resetTimer = () => {
  stopTimer()
  timer.value = 0
}

const updateWindowSize = () => {
  windowSize.width = window.innerWidth
  windowSize.height = window.innerHeight
}

const startWindowListener = () => {
  updateWindowSize()
  window.addEventListener('resize', updateWindowSize)
  windowListenerActive.value = true
}

const stopWindowListener = () => {
  window.removeEventListener('resize', updateWindowSize)
  windowListenerActive.value = false
}

const startRandomGenerator = () => {
  randomGeneratorActive.value = true
  randomInterval = setInterval(() => {
    randomNumber.value = Math.floor(Math.random() * 1000)
  }, 2000)
}

const stopRandomGenerator = () => {
  if (randomInterval) {
    clearInterval(randomInterval)
    randomInterval = null
    randomGeneratorActive.value = false
  }
}

// 异步组件加载
const asyncComponent = ref(null)
const asyncLoading = ref(false)
const asyncComponentStatus = ref('未加载')
const asyncLoadTime = ref(0)

const loadAsyncComponent = async () => {
  asyncLoading.value = true
  asyncComponentStatus.value = '加载中'
  const startTime = Date.now()
  
  try {
    // 模拟异步组件加载
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 动态导入组件
    const { default: AsyncComp } = await import('./lifecycle/AsyncComponent.vue')
    asyncComponent.value = AsyncComp
    
    asyncLoadTime.value = Date.now() - startTime
    asyncComponentStatus.value = '已加载'
  } catch (err) {
    asyncComponentStatus.value = '加载失败'
    console.error('异步组件加载失败:', err)
  } finally {
    asyncLoading.value = false
  }
}

const unloadAsyncComponent = () => {
  asyncComponent.value = null
  asyncComponentStatus.value = '已卸载'
  asyncLoadTime.value = 0
}

const handleAsyncReady = () => {
  asyncComponentStatus.value = '已就绪'
}

// 错误处理
const hasError = ref(false)
const errorMessage = ref('')

const triggerError = () => {
  hasError.value = true
  errorMessage.value = '模拟的组件错误'
}

const recoverFromError = () => {
  hasError.value = false
  errorMessage.value = ''
}

const normalAction = () => {
  console.log('执行正常操作')
}

// 组件挂载时获取初始数据
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.lifecycle-example {
  max-width: 1200px;
  margin: 0 auto;
}

.description {
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.example-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.example-card h3 {
  color: #42b883;
  margin-bottom: 15px;
  font-size: 18px;
}

.lifecycle-info {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 3px solid #42b883;
}

.lifecycle-controls {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.lifecycle-logs {
  margin-bottom: 20px;
}

.log-container {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 10px;
  background-color: #f8f9fa;
  margin-bottom: 10px;
}

.log-item {
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
  font-size: 12px;
  font-family: monospace;
}

.log-time {
  color: #666;
  min-width: 80px;
}

.log-phase {
  color: #42b883;
  font-weight: bold;
  min-width: 100px;
}

.log-message {
  color: #333;
}

.data-fetch-demo,
.timer-demo,
.async-demo,
.error-demo {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.fetch-controls,
.timer-controls,
.async-controls,
.error-controls {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.fetch-status,
.timer-display,
.async-status,
.error-status {
  margin-bottom: 15px;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
}

.user-data {
  margin-top: 15px;
}

.user-card {
  background-color: white;
  padding: 15px;
  border-radius: 4px;
  border-left: 3px solid #28a745;
}

.error-message {
  margin-top: 15px;
  padding: 15px;
  background-color: #f8d7da;
  border-radius: 4px;
  border-left: 3px solid #dc3545;
  color: #721c24;
}

.resource-info {
  margin-top: 15px;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
}

.loading-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: white;
  border-radius: 4px;
  margin: 15px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.normal-content,
.error-content {
  padding: 15px;
  background-color: white;
  border-radius: 4px;
  margin-top: 15px;
}

.error-content {
  background-color: #f8d7da;
  color: #721c24;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #42b883;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #369870;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #5a6268;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background-color: #218838;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background-color: #c82333;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover:not(:disabled) {
  background-color: #138496;
}

@media (max-width: 768px) {
  .examples-grid {
    grid-template-columns: 1fr;
  }
  
  .lifecycle-controls,
  .fetch-controls,
  .timer-controls,
  .async-controls,
  .error-controls {
    flex-direction: column;
  }
}
</style>
