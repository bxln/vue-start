<template>
  <div class="conditional-list-example">
    <h2>条件渲染和列表渲染示例</h2>
    <p class="description">演示Vue 3中v-if、v-show、v-for等指令的使用</p>

    <div class="examples-grid">
      <!-- 条件渲染基础 -->
      <div class="example-card">
        <h3>条件渲染 (v-if / v-show)</h3>
        <div class="controls">
          <button @click="showContent = !showContent" class="btn btn-primary">
            {{ showContent ? '隐藏' : '显示' }} 内容
          </button>
          <button @click="useVShow = !useVShow" class="btn btn-secondary">
            切换到 {{ useVShow ? 'v-if' : 'v-show' }}
          </button>
        </div>

        <div class="demo-area">
          <p><strong>当前使用:</strong> {{ useVShow ? 'v-show' : 'v-if' }}</p>
          
          <!-- v-if 示例 -->
          <div v-if="!useVShow">
            <div v-if="showContent" class="content-box">
              <h4>v-if 渲染的内容</h4>
              <p>这个元素使用 v-if，会被完全添加/移除DOM</p>
            </div>
            <div v-else class="content-box">
              <p>v-if 的 else 分支</p>
            </div>
          </div>

          <!-- v-show 示例 -->
          <div v-if="useVShow">
            <div v-show="showContent" class="content-box">
              <h4>v-show 渲染的内容</h4>
              <p>这个元素使用 v-show，只是切换 display 样式</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 多条件渲染 -->
      <div class="example-card">
        <h3>多条件渲染</h3>
        <div class="form-group">
          <label>用户状态:</label>
          <select v-model="userStatus">
            <option value="guest">游客</option>
            <option value="user">普通用户</option>
            <option value="vip">VIP用户</option>
            <option value="admin">管理员</option>
          </select>
        </div>

        <div class="status-display">
          <div v-if="userStatus === 'guest'" class="status-card guest">
            <h4>👤 游客模式</h4>
            <p>请登录以获得更多功能</p>
            <button class="btn btn-primary">立即登录</button>
          </div>
          
          <div v-else-if="userStatus === 'user'" class="status-card user">
            <h4>🙂 普通用户</h4>
            <p>欢迎回来！您可以使用基础功能</p>
            <button class="btn btn-secondary">升级VIP</button>
          </div>
          
          <div v-else-if="userStatus === 'vip'" class="status-card vip">
            <h4>⭐ VIP用户</h4>
            <p>享受专属VIP服务和特权</p>
            <button class="btn btn-gold">VIP专区</button>
          </div>
          
          <div v-else-if="userStatus === 'admin'" class="status-card admin">
            <h4>👑 管理员</h4>
            <p>您拥有系统管理权限</p>
            <button class="btn btn-danger">管理后台</button>
          </div>
        </div>
      </div>

      <!-- 基础列表渲染 -->
      <div class="example-card">
        <h3>基础列表渲染 (v-for)</h3>
        <div class="controls">
          <button @click="addFruit" class="btn btn-primary">添加水果</button>
          <button @click="shuffleFruits" class="btn btn-secondary">随机排序</button>
        </div>

        <div class="fruit-list">
          <div 
            v-for="(fruit, index) in fruits" 
            :key="fruit.id"
            class="fruit-item"
          >
            <span class="fruit-emoji">{{ fruit.emoji }}</span>
            <span class="fruit-name">{{ fruit.name }}</span>
            <span class="fruit-price">¥{{ fruit.price }}</span>
            <button @click="removeFruit(index)" class="remove-btn">删除</button>
          </div>
        </div>
        <p class="result">共 {{ fruits.length }} 种水果</p>
      </div>

      <!-- 对象遍历 -->
      <div class="example-card">
        <h3>对象遍历</h3>
        <div class="form-group">
          <label>添加属性:</label>
          <div class="add-property">
            <input v-model="newKey" placeholder="属性名" class="small-input">
            <input v-model="newValue" placeholder="属性值" class="small-input">
            <button @click="addProperty" class="btn btn-primary">添加</button>
          </div>
        </div>

        <div class="object-display">
          <h4>用户信息对象:</h4>
          <div class="property-list">
            <div 
              v-for="(value, key, index) in userInfo" 
              :key="key"
              class="property-item"
            >
              <span class="property-index">{{ index + 1 }}.</span>
              <span class="property-key">{{ key }}:</span>
              <span class="property-value">{{ value }}</span>
              <button @click="removeProperty(key)" class="remove-btn">删除</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 嵌套循环 -->
      <div class="example-card">
        <h3>嵌套循环</h3>
        <div class="categories">
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="category-section"
          >
            <h4>{{ category.name }}</h4>
            <div class="items-grid">
              <div 
                v-for="item in category.items" 
                :key="item.id"
                class="item-card"
              >
                <div class="item-icon">{{ item.icon }}</div>
                <div class="item-name">{{ item.name }}</div>
                <div class="item-price">¥{{ item.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 条件列表渲染 -->
      <div class="example-card">
        <h3>条件列表渲染</h3>
        <div class="controls">
          <div class="filter-controls">
            <label>价格筛选:</label>
            <select v-model="priceFilter">
              <option value="all">全部</option>
              <option value="low">低价 (< ¥50)</option>
              <option value="medium">中价 (¥50-100)</option>
              <option value="high">高价 (> ¥100)</option>
            </select>
          </div>
          
          <div class="filter-controls">
            <label>
              <input v-model="showOnlyAvailable" type="checkbox">
              只显示有库存
            </label>
          </div>
        </div>

        <div class="product-list">
          <template v-for="product in filteredProducts" :key="product.id">
            <div 
              v-if="shouldShowProduct(product)"
              class="product-item"
              :class="{ 'out-of-stock': product.stock === 0 }"
            >
              <div class="product-info">
                <h5>{{ product.name }}</h5>
                <p class="product-price">¥{{ product.price }}</p>
                <p class="product-stock">
                  库存: {{ product.stock > 0 ? product.stock : '缺货' }}
                </p>
              </div>
              <div class="product-actions">
                <button 
                  v-if="product.stock > 0" 
                  class="btn btn-primary"
                  @click="buyProduct(product)"
                >
                  购买
                </button>
                <button 
                  v-else 
                  class="btn btn-disabled" 
                  disabled
                >
                  缺货
                </button>
              </div>
            </div>
          </template>
        </div>
        
        <div v-if="filteredProducts.length === 0" class="empty-state">
          <p>没有找到符合条件的商品</p>
        </div>
      </div>

      <!-- 动态组件列表 -->
      <div class="example-card">
        <h3>动态组件列表</h3>
        <div class="controls">
          <button @click="addTask" class="btn btn-primary">添加任务</button>
          <button @click="toggleAllTasks" class="btn btn-secondary">
            {{ allCompleted ? '全部未完成' : '全部完成' }}
          </button>
        </div>

        <div class="task-list">
          <div 
            v-for="task in tasks" 
            :key="task.id"
            class="task-item"
            :class="{ completed: task.completed }"
          >
            <input 
              v-model="task.completed" 
              type="checkbox"
              class="task-checkbox"
            >
            <span class="task-text">{{ task.text }}</span>
            <span class="task-priority" :class="task.priority">
              {{ task.priority }}
            </span>
            <button @click="removeTask(task.id)" class="remove-btn">删除</button>
          </div>
        </div>

        <div class="task-stats">
          <p>总任务: {{ tasks.length }}</p>
          <p>已完成: {{ completedTasks }}</p>
          <p>未完成: {{ incompleteTasks }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// 条件渲染状态
const showContent = ref(true)
const useVShow = ref(false)
const userStatus = ref('guest')

// 基础列表数据
const fruits = reactive([
  { id: 1, name: '苹果', emoji: '🍎', price: 5 },
  { id: 2, name: '香蕉', emoji: '🍌', price: 3 },
  { id: 3, name: '橙子', emoji: '🍊', price: 4 },
  { id: 4, name: '葡萄', emoji: '🍇', price: 8 }
])

let fruitIdCounter = 5

const addFruit = () => {
  const newFruits = [
    { name: '草莓', emoji: '🍓', price: 12 },
    { name: '西瓜', emoji: '🍉', price: 15 },
    { name: '桃子', emoji: '🍑', price: 6 },
    { name: '菠萝', emoji: '🍍', price: 10 }
  ]
  const randomFruit = newFruits[Math.floor(Math.random() * newFruits.length)]
  fruits.push({
    id: fruitIdCounter++,
    ...randomFruit
  })
}

const removeFruit = (index) => {
  fruits.splice(index, 1)
}

const shuffleFruits = () => {
  for (let i = fruits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fruits[i], fruits[j]] = [fruits[j], fruits[i]]
  }
}

// 对象遍历
const userInfo = reactive({
  name: '张三',
  age: 25,
  email: 'zhangsan@example.com',
  city: '北京'
})

const newKey = ref('')
const newValue = ref('')

const addProperty = () => {
  if (newKey.value && newValue.value) {
    userInfo[newKey.value] = newValue.value
    newKey.value = ''
    newValue.value = ''
  }
}

const removeProperty = (key) => {
  delete userInfo[key]
}

// 嵌套循环数据
const categories = reactive([
  {
    id: 1,
    name: '电子产品',
    items: [
      { id: 1, name: '手机', icon: '📱', price: 3999 },
      { id: 2, name: '电脑', icon: '💻', price: 8999 },
      { id: 3, name: '耳机', icon: '🎧', price: 299 }
    ]
  },
  {
    id: 2,
    name: '服装',
    items: [
      { id: 4, name: 'T恤', icon: '👕', price: 99 },
      { id: 5, name: '牛仔裤', icon: '👖', price: 199 },
      { id: 6, name: '运动鞋', icon: '👟', price: 399 }
    ]
  }
])

// 条件列表渲染
const priceFilter = ref('all')
const showOnlyAvailable = ref(false)

const products = reactive([
  { id: 1, name: '笔记本电脑', price: 5999, stock: 5 },
  { id: 2, name: '无线鼠标', price: 99, stock: 0 },
  { id: 3, name: '机械键盘', price: 299, stock: 3 },
  { id: 4, name: '显示器', price: 1299, stock: 2 },
  { id: 5, name: '音响', price: 199, stock: 0 },
  { id: 6, name: '摄像头', price: 399, stock: 1 }
])

const filteredProducts = computed(() => {
  return products.filter(product => {
    // 价格筛选
    if (priceFilter.value === 'low' && product.price >= 50) return false
    if (priceFilter.value === 'medium' && (product.price < 50 || product.price > 100)) return false
    if (priceFilter.value === 'high' && product.price <= 100) return false
    
    // 库存筛选
    if (showOnlyAvailable.value && product.stock === 0) return false
    
    return true
  })
})

const shouldShowProduct = (product) => {
  return true // 这里可以添加额外的显示条件
}

const buyProduct = (product) => {
  if (product.stock > 0) {
    product.stock--
    alert(`购买了 ${product.name}`)
  }
}

// 任务列表
const tasks = reactive([
  { id: 1, text: '学习Vue 3', completed: false, priority: 'high' },
  { id: 2, text: '写项目文档', completed: true, priority: 'medium' },
  { id: 3, text: '代码review', completed: false, priority: 'low' }
])

let taskIdCounter = 4

const addTask = () => {
  const taskTexts = [
    '修复bug',
    '优化性能',
    '添加新功能',
    '写单元测试',
    '更新依赖'
  ]
  const priorities = ['high', 'medium', 'low']
  
  tasks.push({
    id: taskIdCounter++,
    text: taskTexts[Math.floor(Math.random() * taskTexts.length)],
    completed: false,
    priority: priorities[Math.floor(Math.random() * priorities.length)]
  })
}

const removeTask = (id) => {
  const index = tasks.findIndex(task => task.id === id)
  if (index > -1) {
    tasks.splice(index, 1)
  }
}

const completedTasks = computed(() => {
  return tasks.filter(task => task.completed).length
})

const incompleteTasks = computed(() => {
  return tasks.filter(task => !task.completed).length
})

const allCompleted = computed(() => {
  return tasks.length > 0 && tasks.every(task => task.completed)
})

const toggleAllTasks = () => {
  const newStatus = !allCompleted.value
  tasks.forEach(task => {
    task.completed = newStatus
  })
}
</script>

<style scoped>
.conditional-list-example {
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

.controls {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.demo-area {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 15px;
  background-color: #f9f9f9;
}

.content-box {
  padding: 15px;
  background-color: white;
  border-radius: 4px;
  border-left: 3px solid #42b883;
}

.status-display {
  margin-top: 15px;
}

.status-card {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.status-card.guest {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
}

.status-card.user {
  background-color: #e8f5e8;
  border: 1px solid #42b883;
}

.status-card.vip {
  background-color: #fff3cd;
  border: 1px solid #ffc107;
}

.status-card.admin {
  background-color: #f8d7da;
  border: 1px solid #dc3545;
}

.fruit-list {
  margin: 15px 0;
}

.fruit-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.fruit-emoji {
  font-size: 20px;
}

.fruit-name {
  flex: 1;
  font-weight: 500;
}

.fruit-price {
  color: #e74c3c;
  font-weight: bold;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.add-property {
  display: flex;
  gap: 10px;
}

.small-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.property-list {
  margin-top: 10px;
}

.property-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.property-index {
  color: #666;
  font-weight: bold;
}

.property-key {
  font-weight: 500;
  color: #42b883;
}

.property-value {
  flex: 1;
}

.categories {
  margin-top: 15px;
}

.category-section {
  margin-bottom: 20px;
}

.category-section h4 {
  color: #333;
  margin-bottom: 10px;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
}

.item-card {
  text-align: center;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.item-icon {
  font-size: 24px;
  margin-bottom: 5px;
}

.item-name {
  font-weight: 500;
  margin-bottom: 5px;
}

.item-price {
  color: #e74c3c;
  font-weight: bold;
}

.filter-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.filter-controls select {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.product-list {
  margin: 15px 0;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 10px;
}

.product-item.out-of-stock {
  opacity: 0.6;
  background-color: #f8f9fa;
}

.product-info h5 {
  margin: 0 0 5px 0;
  color: #333;
}

.product-price {
  color: #e74c3c;
  font-weight: bold;
  margin: 0;
}

.product-stock {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
}

.task-list {
  margin: 15px 0;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.task-item.completed {
  opacity: 0.6;
}

.task-item.completed .task-text {
  text-decoration: line-through;
}

.task-checkbox {
  width: auto;
}

.task-text {
  flex: 1;
}

.task-priority {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.task-priority.high {
  background-color: #ffebee;
  color: #c62828;
}

.task-priority.medium {
  background-color: #fff3e0;
  color: #ef6c00;
}

.task-priority.low {
  background-color: #e8f5e8;
  color: #2e7d32;
}

.task-stats {
  margin-top: 15px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.task-stats p {
  margin: 5px 0;
}

.result {
  margin-top: 15px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  color: #666;
}

.remove-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
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

.btn-gold {
  background-color: #ffc107;
  color: #212529;
}

.btn-gold:hover {
  background-color: #e0a800;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-disabled {
  background-color: #6c757d;
  color: white;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .examples-grid {
    grid-template-columns: 1fr;
  }
  
  .controls {
    flex-direction: column;
  }
  
  .add-property {
    flex-direction: column;
  }
  
  .items-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .product-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
