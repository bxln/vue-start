<template>
  <div class="component-communication">
    <h2>组件通信示例</h2>
    <p class="description">演示Vue 3中父子组件、兄弟组件之间的通信方式</p>

    <div class="examples-grid">
      <!-- Props 和 Emits -->
      <div class="example-card">
        <h3>Props 和 Emits (父子通信)</h3>
        <div class="parent-component">
          <h4>父组件</h4>
          <div class="controls">
            <input v-model="parentMessage" placeholder="输入消息给子组件">
            <button @click="sendToChild" class="btn btn-primary">发送给子组件</button>
          </div>
          
          <div class="message-display">
            <p><strong>来自子组件的消息:</strong> {{ childMessage }}</p>
            <p><strong>子组件计数:</strong> {{ childCount }}</p>
          </div>

          <!-- 子组件 -->
          <ChildComponent 
            :message="parentMessage"
            :count="parentCount"
            @update-message="handleChildMessage"
            @increment="handleChildIncrement"
            @custom-event="handleCustomEvent"
          />
        </div>
      </div>

      <!-- v-model 双向绑定 -->
      <div class="example-card">
        <h3>v-model 双向绑定</h3>
        <div class="vmodel-demo">
          <h4>父组件</h4>
          <p><strong>当前值:</strong> {{ vmodelValue }}</p>
          
          <CustomInput v-model="vmodelValue" placeholder="自定义输入组件" />
          
          <div class="controls">
            <button @click="vmodelValue = '重置值'" class="btn btn-secondary">
              重置值
            </button>
            <button @click="vmodelValue += '!'" class="btn btn-info">
              添加感叹号
            </button>
          </div>
        </div>
      </div>

      <!-- Provide/Inject -->
      <div class="example-card">
        <h3>Provide/Inject (跨层级通信)</h3>
        <div class="provide-inject-demo">
          <h4>祖父组件 (Provider)</h4>
          <div class="controls">
            <input v-model="providedData.theme" placeholder="主题">
            <input v-model="providedData.language" placeholder="语言">
            <button @click="updateProvidedData" class="btn btn-primary">
              更新数据
            </button>
          </div>
          
          <div class="provided-data">
            <p><strong>提供的数据:</strong></p>
            <pre>{{ JSON.stringify(providedData, null, 2) }}</pre>
          </div>

          <!-- 中间层组件 -->
          <MiddleComponent />
        </div>
      </div>

      <!-- 事件总线 (Event Bus) -->
      <div class="example-card">
        <h3>事件总线 (兄弟组件通信)</h3>
        <div class="event-bus-demo">
          <div class="sibling-components">
            <SiblingA />
            <SiblingB />
          </div>
          
          <div class="event-log">
            <h4>事件日志:</h4>
            <div class="log-container">
              <div v-for="(log, index) in eventBusLogs" :key="index" class="log-item">
                {{ log }}
              </div>
            </div>
            <button @click="clearEventLogs" class="btn btn-secondary">清空日志</button>
          </div>
        </div>
      </div>

      <!-- Ref 引用 -->
      <div class="example-card">
        <h3>Ref 引用 (直接访问子组件)</h3>
        <div class="ref-demo">
          <h4>父组件控制子组件</h4>
          <div class="controls">
            <button @click="callChildMethod" class="btn btn-primary">
              调用子组件方法
            </button>
            <button @click="getChildData" class="btn btn-info">
              获取子组件数据
            </button>
            <button @click="focusChildInput" class="btn btn-secondary">
              聚焦子组件输入框
            </button>
          </div>
          
          <div class="ref-result">
            <p><strong>子组件数据:</strong> {{ refChildData }}</p>
          </div>

          <RefChildComponent ref="refChild" />
        </div>
      </div>

      <!-- 状态管理模拟 -->
      <div class="example-card">
        <h3>简单状态管理</h3>
        <div class="state-management">
          <h4>全局状态</h4>
          <div class="global-state">
            <p><strong>用户:</strong> {{ globalState.user.name }}</p>
            <p><strong>计数:</strong> {{ globalState.count }}</p>
            <p><strong>主题:</strong> {{ globalState.theme }}</p>
          </div>
          
          <div class="state-controls">
            <button @click="updateUser" class="btn btn-primary">更新用户</button>
            <button @click="incrementGlobalCount" class="btn btn-info">增加计数</button>
            <button @click="toggleTheme" class="btn btn-secondary">切换主题</button>
          </div>

          <!-- 使用全局状态的组件 -->
          <StateConsumerA />
          <StateConsumerB />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, provide, inject, onMounted } from 'vue'
import { eventBus, globalState } from '../utils/shared'

// 导入子组件
import ChildComponent from './communication/ChildComponent.vue'
import CustomInput from './communication/CustomInput.vue'
import MiddleComponent from './communication/MiddleComponent.vue'
import SiblingA from './communication/SiblingA.vue'
import SiblingB from './communication/SiblingB.vue'
import RefChildComponent from './communication/RefChildComponent.vue'
import StateConsumerA from './communication/StateConsumerA.vue'
import StateConsumerB from './communication/StateConsumerB.vue'

// Props 和 Emits 示例
const parentMessage = ref('来自父组件的消息')
const parentCount = ref(0)
const childMessage = ref('')
const childCount = ref(0)

const sendToChild = () => {
  parentCount.value++
}

const handleChildMessage = (message) => {
  childMessage.value = message
}

const handleChildIncrement = (count) => {
  childCount.value = count
}

const handleCustomEvent = (data) => {
  console.log('自定义事件:', data)
}

// v-model 示例
const vmodelValue = ref('初始值')

// Provide/Inject 示例
const providedData = reactive({
  theme: 'light',
  language: 'zh-CN',
  user: {
    name: '张三',
    role: 'admin'
  }
})

// 提供数据给子组件
provide('appData', providedData)
provide('updateData', updateProvidedData)

function updateProvidedData() {
  providedData.user.name = `用户${Math.floor(Math.random() * 100)}`
  console.log('更新了提供的数据')
}

// 事件总线示例
const eventBusLogs = ref([])

const addEventLog = (message) => {
  const timestamp = new Date().toLocaleTimeString()
  eventBusLogs.value.unshift(`[${timestamp}] ${message}`)
  if (eventBusLogs.value.length > 10) {
    eventBusLogs.value.pop()
  }
}

const clearEventLogs = () => {
  eventBusLogs.value = []
}

// 监听事件总线
onMounted(() => {
  eventBus.on('sibling-message', (data) => {
    addEventLog(`兄弟组件消息: ${data.message} (来自: ${data.from})`)
  })
  
  eventBus.on('sibling-action', (data) => {
    addEventLog(`兄弟组件动作: ${data.action} (来自: ${data.from})`)
  })
})

// Ref 引用示例
const refChild = ref(null)
const refChildData = ref('')

const callChildMethod = () => {
  if (refChild.value) {
    refChild.value.childMethod()
  }
}

const getChildData = () => {
  if (refChild.value) {
    refChildData.value = refChild.value.getChildData()
  }
}

const focusChildInput = () => {
  if (refChild.value) {
    refChild.value.focusInput()
  }
}

// 全局状态管理
const updateUser = () => {
  const names = ['张三', '李四', '王五', '赵六']
  globalState.user.name = names[Math.floor(Math.random() * names.length)]
}

const incrementGlobalCount = () => {
  globalState.count++
}

const toggleTheme = () => {
  globalState.theme = globalState.theme === 'light' ? 'dark' : 'light'
}
</script>

<style scoped>
.component-communication {
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

.parent-component {
  border: 2px solid #42b883;
  border-radius: 8px;
  padding: 15px;
  background-color: #f0f8f0;
}

.parent-component h4 {
  margin-top: 0;
  color: #42b883;
}

.controls {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.controls input {
  flex: 1;
  min-width: 200px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.message-display {
  margin-bottom: 15px;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  border-left: 3px solid #42b883;
}

.vmodel-demo {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.provide-inject-demo {
  padding: 15px;
  border: 1px solid #17a2b8;
  border-radius: 4px;
  background-color: #f0f9ff;
}

.provided-data {
  margin: 15px 0;
}

.provided-data pre {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
  overflow-x: auto;
}

.event-bus-demo {
  padding: 15px;
  border: 1px solid #ffc107;
  border-radius: 4px;
  background-color: #fffbf0;
}

.sibling-components {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.event-log {
  margin-top: 20px;
}

.log-container {
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 10px;
  background-color: white;
  margin-bottom: 10px;
}

.log-item {
  font-size: 12px;
  margin-bottom: 5px;
  font-family: monospace;
  color: #666;
}

.ref-demo {
  padding: 15px;
  border: 1px solid #dc3545;
  border-radius: 4px;
  background-color: #fdf2f2;
}

.ref-result {
  margin: 15px 0;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
}

.state-management {
  padding: 15px;
  border: 1px solid #6f42c1;
  border-radius: 4px;
  background-color: #f8f5ff;
}

.global-state {
  margin-bottom: 15px;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
}

.state-controls {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #42b883;
  color: white;
}

.btn-primary:hover {
  background-color: #369870;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
}

@media (max-width: 768px) {
  .examples-grid {
    grid-template-columns: 1fr;
  }
  
  .sibling-components {
    grid-template-columns: 1fr;
  }
  
  .controls {
    flex-direction: column;
  }
  
  .controls input {
    min-width: auto;
  }
  
  .state-controls {
    flex-direction: column;
  }
}
</style>
