<template>
  <div class="reactivity-example">
    <h2>响应式数据示例</h2>
    <p class="description">演示Vue 3中ref、reactive、computed、watch等响应式API的使用</p>

    <div class="examples-grid">
      <!-- ref 示例 -->
      <div class="example-card">
        <h3>ref 响应式引用</h3>
        <div class="ref-demo">
          <div class="form-group">
            <label>字符串 ref:</label>
            <input v-model="stringRef" type="text" placeholder="输入文本">
            <p class="result">值: "{{ stringRef }}" (长度: {{ stringRef.length }})</p>
          </div>

          <div class="form-group">
            <label>数字 ref:</label>
            <input v-model.number="numberRef" type="number">
            <div class="number-controls">
              <button @click="numberRef++" class="btn btn-primary">+1</button>
              <button @click="numberRef--" class="btn btn-secondary">-1</button>
              <button @click="numberRef *= 2" class="btn btn-info">×2</button>
            </div>
            <p class="result">值: {{ numberRef }} (平方: {{ numberRef * numberRef }})</p>
          </div>

          <div class="form-group">
            <label>布尔 ref:</label>
            <label class="checkbox-label">
              <input v-model="booleanRef" type="checkbox">
              {{ booleanRef ? '开启' : '关闭' }}
            </label>
            <p class="result">状态: {{ booleanRef ? '✅ 激活' : '❌ 未激活' }}</p>
          </div>

          <div class="form-group">
            <label>数组 ref:</label>
            <div class="array-controls">
              <input v-model="newItem" placeholder="添加项目" @keyup.enter="addItem">
              <button @click="addItem" class="btn btn-primary">添加</button>
              <button @click="arrayRef = []" class="btn btn-danger">清空</button>
            </div>
            <div class="array-display">
              <div v-for="(item, index) in arrayRef" :key="index" class="array-item">
                {{ item }}
                <button @click="removeItem(index)" class="remove-btn">删除</button>
              </div>
            </div>
            <p class="result">数组长度: {{ arrayRef.length }}</p>
          </div>
        </div>
      </div>

      <!-- reactive 示例 -->
      <div class="example-card">
        <h3>reactive 响应式对象</h3>
        <div class="reactive-demo">
          <div class="form-group">
            <label>用户信息:</label>
            <input v-model="userInfo.name" placeholder="姓名">
            <input v-model.number="userInfo.age" type="number" placeholder="年龄">
            <input v-model="userInfo.email" type="email" placeholder="邮箱">
          </div>

          <div class="form-group">
            <label>地址信息:</label>
            <input v-model="userInfo.address.city" placeholder="城市">
            <input v-model="userInfo.address.street" placeholder="街道">
            <input v-model="userInfo.address.zipCode" placeholder="邮编">
          </div>

          <div class="form-group">
            <label>爱好 (数组):</label>
            <div class="hobby-controls">
              <input v-model="newHobby" placeholder="添加爱好" @keyup.enter="addHobby">
              <button @click="addHobby" class="btn btn-primary">添加</button>
            </div>
            <div class="hobby-list">
              <span v-for="(hobby, index) in userInfo.hobbies" :key="index" class="hobby-tag">
                {{ hobby }}
                <button @click="removeHobby(index)" class="tag-remove">×</button>
              </span>
            </div>
          </div>

          <div class="object-preview">
            <h4>对象预览:</h4>
            <pre>{{ JSON.stringify(userInfo, null, 2) }}</pre>
          </div>
        </div>
      </div>

      <!-- computed 计算属性 -->
      <div class="example-card">
        <h3>computed 计算属性</h3>
        <div class="computed-demo">
          <div class="form-group">
            <label>商品列表:</label>
            <div class="product-list">
              <div v-for="(product, index) in products" :key="index" class="product-item">
                <input v-model="product.name" placeholder="商品名">
                <input v-model.number="product.price" type="number" placeholder="价格">
                <input v-model.number="product.quantity" type="number" placeholder="数量">
                <button @click="removeProduct(index)" class="remove-btn">删除</button>
              </div>
            </div>
            <button @click="addProduct" class="btn btn-primary">添加商品</button>
          </div>

          <div class="computed-results">
            <h4>计算结果:</h4>
            <p><strong>商品总数:</strong> {{ totalProducts }}</p>
            <p><strong>总价值:</strong> ¥{{ totalValue.toFixed(2) }}</p>
            <p><strong>平均价格:</strong> ¥{{ averagePrice.toFixed(2) }}</p>
            <p><strong>最贵商品:</strong> {{ mostExpensive?.name || '无' }} (¥{{ mostExpensive?.price || 0 }})</p>
            <p><strong>库存状态:</strong> {{ stockStatus }}</p>
          </div>
        </div>
      </div>

      <!-- watch 监听器 -->
      <div class="example-card">
        <h3>watch 监听器</h3>
        <div class="watch-demo">
          <div class="form-group">
            <label>监听的值:</label>
            <input v-model="watchedValue" placeholder="输入内容观察变化">
            <p class="result">当前值: "{{ watchedValue }}"</p>
          </div>

          <div class="form-group">
            <label>深度监听对象:</label>
            <input v-model="deepWatchObj.user.name" placeholder="用户名">
            <input v-model.number="deepWatchObj.user.age" type="number" placeholder="年龄">
            <input v-model="deepWatchObj.settings.theme" placeholder="主题">
          </div>

          <div class="form-group">
            <label>监听多个值:</label>
            <input v-model="multiWatch.x" placeholder="X坐标">
            <input v-model="multiWatch.y" placeholder="Y坐标">
            <p class="result">坐标: ({{ multiWatch.x }}, {{ multiWatch.y }})</p>
          </div>

          <div class="watch-logs">
            <h4>监听日志:</h4>
            <div class="log-container">
              <div v-for="(log, index) in watchLogs" :key="index" class="log-item">
                <span class="log-time">{{ log.time }}</span>
                <span class="log-type">{{ log.type }}</span>
                <span class="log-message">{{ log.message }}</span>
              </div>
            </div>
            <button @click="clearWatchLogs" class="btn btn-secondary">清空日志</button>
          </div>
        </div>
      </div>

      <!-- toRefs 和 toRef -->
      <div class="example-card">
        <h3>toRefs 和 toRef</h3>
        <div class="torefs-demo">
          <div class="form-group">
            <label>原始对象:</label>
            <input v-model="originalObj.title" placeholder="标题">
            <input v-model="originalObj.content" placeholder="内容">
            <input v-model.number="originalObj.count" type="number" placeholder="计数">
          </div>

          <div class="form-group">
            <label>解构的 refs:</label>
            <input v-model="title" placeholder="解构的标题">
            <input v-model="content" placeholder="解构的内容">
            <input v-model="count" type="number" placeholder="解构的计数">
          </div>

          <div class="form-group">
            <label>单个 ref:</label>
            <input v-model="singleRef" placeholder="单个引用">
          </div>

          <div class="refs-comparison">
            <h4>对比:</h4>
            <div class="comparison-grid">
              <div class="comparison-item">
                <h5>原始对象:</h5>
                <pre>{{ JSON.stringify(originalObj, null, 2) }}</pre>
              </div>
              <div class="comparison-item">
                <h5>解构的值:</h5>
                <p>title: {{ title }}</p>
                <p>content: {{ content }}</p>
                <p>count: {{ count }}</p>
                <p>singleRef: {{ singleRef }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 响应式工具 -->
      <div class="example-card">
        <h3>响应式工具函数</h3>
        <div class="utils-demo">
          <div class="form-group">
            <label>测试对象:</label>
            <input v-model="testObj.name" placeholder="名称">
            <input v-model.number="testObj.value" type="number" placeholder="值">
          </div>

          <div class="utils-results">
            <h4>工具函数结果:</h4>
            <p><strong>isRef(stringRef):</strong> {{ isRef(stringRef) }}</p>
            <p><strong>isReactive(userInfo):</strong> {{ isReactive(userInfo) }}</p>
            <p><strong>isProxy(testObj):</strong> {{ isProxy(testObj) }}</p>
            <p><strong>unref(stringRef):</strong> {{ unref(stringRef) }}</p>
            <p><strong>toRaw(userInfo):</strong> {{ JSON.stringify(toRaw(userInfo)) }}</p>
          </div>

          <div class="readonly-demo">
            <h4>只读对象:</h4>
            <p>只读用户名: {{ readonlyUser.name }}</p>
            <p>只读年龄: {{ readonlyUser.age }}</p>
            <button @click="tryModifyReadonly" class="btn btn-warning">
              尝试修改只读对象
            </button>
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
  computed, 
  watch, 
  watchEffect,
  toRefs, 
  toRef,
  isRef,
  isReactive,
  isProxy,
  unref,
  toRaw,
  readonly
} from 'vue'

// ref 示例
const stringRef = ref('Hello Vue 3')
const numberRef = ref(42)
const booleanRef = ref(true)
const arrayRef = ref(['Vue', 'React', 'Angular'])
const newItem = ref('')

const addItem = () => {
  if (newItem.value.trim()) {
    arrayRef.value.push(newItem.value.trim())
    newItem.value = ''
  }
}

const removeItem = (index) => {
  arrayRef.value.splice(index, 1)
}

// reactive 示例
const userInfo = reactive({
  name: '张三',
  age: 25,
  email: 'zhangsan@example.com',
  address: {
    city: '北京',
    street: '朝阳区',
    zipCode: '100000'
  },
  hobbies: ['编程', '阅读']
})

const newHobby = ref('')

const addHobby = () => {
  if (newHobby.value.trim()) {
    userInfo.hobbies.push(newHobby.value.trim())
    newHobby.value = ''
  }
}

const removeHobby = (index) => {
  userInfo.hobbies.splice(index, 1)
}

// computed 示例
const products = reactive([
  { name: 'iPhone', price: 5999, quantity: 2 },
  { name: 'MacBook', price: 12999, quantity: 1 },
  { name: 'AirPods', price: 1299, quantity: 3 }
])

const totalProducts = computed(() => {
  return products.reduce((total, product) => total + product.quantity, 0)
})

const totalValue = computed(() => {
  return products.reduce((total, product) => total + (product.price * product.quantity), 0)
})

const averagePrice = computed(() => {
  return totalProducts.value > 0 ? totalValue.value / totalProducts.value : 0
})

const mostExpensive = computed(() => {
  return products.reduce((max, product) => 
    !max || product.price > max.price ? product : max, null
  )
})

const stockStatus = computed(() => {
  const lowStock = products.filter(p => p.quantity < 2).length
  if (lowStock === 0) return '库存充足'
  if (lowStock === products.length) return '库存不足'
  return '部分库存不足'
})

const addProduct = () => {
  products.push({
    name: `商品${products.length + 1}`,
    price: Math.floor(Math.random() * 1000) + 100,
    quantity: Math.floor(Math.random() * 5) + 1
  })
}

const removeProduct = (index) => {
  products.splice(index, 1)
}

// watch 示例
const watchedValue = ref('')
const deepWatchObj = reactive({
  user: {
    name: '李四',
    age: 30
  },
  settings: {
    theme: 'light'
  }
})
const multiWatch = reactive({ x: 0, y: 0 })
const watchLogs = ref([])

const addWatchLog = (type, message) => {
  const log = {
    time: new Date().toLocaleTimeString(),
    type,
    message
  }
  watchLogs.value.unshift(log)
  if (watchLogs.value.length > 10) {
    watchLogs.value.pop()
  }
}

// 监听简单值
watch(watchedValue, (newVal, oldVal) => {
  addWatchLog('watch', `值变化: "${oldVal}" → "${newVal}"`)
})

// 深度监听对象
watch(deepWatchObj, (newVal) => {
  addWatchLog('deep watch', `对象变化: ${JSON.stringify(newVal)}`)
}, { deep: true })

// 监听多个值
watch([() => multiWatch.x, () => multiWatch.y], ([newX, newY], [oldX, oldY]) => {
  addWatchLog('multi watch', `坐标变化: (${oldX}, ${oldY}) → (${newX}, ${newY})`)
})

// watchEffect
watchEffect(() => {
  if (stringRef.value.length > 10) {
    addWatchLog('watchEffect', `字符串长度超过10: ${stringRef.value.length}`)
  }
})

const clearWatchLogs = () => {
  watchLogs.value = []
}

// toRefs 和 toRef 示例
const originalObj = reactive({
  title: '原始标题',
  content: '原始内容',
  count: 100
})

// 解构响应式对象
const { title, content, count } = toRefs(originalObj)

// 单个 ref
const singleRef = toRef(originalObj, 'title')

// 响应式工具示例
const testObj = reactive({
  name: '测试对象',
  value: 123
})

const readonlyUser = readonly(userInfo)

const tryModifyReadonly = () => {
  try {
    // 这会在开发模式下发出警告
    readonlyUser.name = '尝试修改'
  } catch (error) {
    console.warn('无法修改只读对象:', error)
  }
}
</script>

<style scoped>
.reactivity-example {
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

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 8px;
}

.form-group input:focus {
  outline: none;
  border-color: #42b883;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-label input {
  width: auto;
  margin: 0;
}

.result {
  margin-top: 8px;
  padding: 8px;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  border-left: 3px solid #42b883;
}

.number-controls,
.array-controls,
.hobby-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.array-display {
  margin: 10px 0;
}

.array-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 5px;
}

.hobby-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.hobby-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  background-color: #42b883;
  color: white;
  border-radius: 12px;
  font-size: 12px;
}

.tag-remove {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag-remove:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.object-preview {
  margin-top: 20px;
}

.object-preview pre {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.4;
}

.product-list {
  margin-bottom: 15px;
}

.product-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.computed-results {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f8f0;
  border-radius: 4px;
  border-left: 3px solid #42b883;
}

.watch-logs {
  margin-top: 20px;
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

.log-type {
  color: #42b883;
  font-weight: bold;
  min-width: 100px;
}

.log-message {
  color: #333;
  flex: 1;
}

.refs-comparison {
  margin-top: 20px;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.comparison-item {
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.comparison-item h5 {
  margin-bottom: 10px;
  color: #333;
}

.comparison-item pre {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  font-size: 11px;
  overflow-x: auto;
}

.utils-results {
  margin: 20px 0;
  padding: 15px;
  background-color: #f0f8ff;
  border-radius: 4px;
  border-left: 3px solid #17a2b8;
}

.readonly-demo {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff3cd;
  border-radius: 4px;
  border-left: 3px solid #ffc107;
}

.remove-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.btn {
  padding: 6px 12px;
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

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}

.btn-warning:hover {
  background-color: #e0a800;
}

@media (max-width: 768px) {
  .examples-grid {
    grid-template-columns: 1fr;
  }
  
  .number-controls,
  .array-controls,
  .hobby-controls {
    flex-direction: column;
  }
  
  .product-item {
    grid-template-columns: 1fr;
    gap: 5px;
  }
  
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}
</style>
