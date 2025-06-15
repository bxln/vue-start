<template>
  <div class="computed-watch-example">
    <h2>计算属性和监听器示例</h2>
    <p class="description">演示Vue 3中computed计算属性和watch监听器的使用</p>

    <div class="examples-grid">
      <!-- 计算属性基础示例 -->
      <div class="example-card">
        <h3>计算属性基础</h3>
        <div class="form-group">
          <label>名字:</label>
          <input v-model="firstName" type="text" placeholder="请输入名字">
        </div>
        <div class="form-group">
          <label>姓氏:</label>
          <input v-model="lastName" type="text" placeholder="请输入姓氏">
        </div>
        <div class="result">
          <p><strong>全名:</strong> {{ fullName }}</p>
          <p><strong>全名长度:</strong> {{ fullNameLength }}</p>
          <p><strong>首字母:</strong> {{ initials }}</p>
        </div>
      </div>

      <!-- 购物车计算示例 -->
      <div class="example-card">
        <h3>购物车计算</h3>
        <div class="cart-items">
          <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
            <span>{{ item.name }}</span>
            <div class="item-controls">
              <span>¥{{ item.price }}</span>
              <input 
                v-model.number="item.quantity" 
                type="number" 
                min="0" 
                class="quantity-input"
              >
              <button @click="removeItem(index)" class="remove-btn">删除</button>
            </div>
          </div>
        </div>
        <button @click="addItem" class="btn btn-primary">添加商品</button>
        
        <div class="cart-summary">
          <p><strong>商品总数:</strong> {{ totalItems }}</p>
          <p><strong>总价:</strong> ¥{{ totalPrice }}</p>
          <p><strong>平均价格:</strong> ¥{{ averagePrice }}</p>
          <p><strong>折扣后价格:</strong> ¥{{ discountedPrice }}</p>
        </div>
      </div>

      <!-- 搜索过滤示例 -->
      <div class="example-card">
        <h3>搜索过滤</h3>
        <div class="form-group">
          <label>搜索用户:</label>
          <input v-model="searchQuery" type="text" placeholder="输入姓名或邮箱搜索">
        </div>
        <div class="form-group">
          <label>排序方式:</label>
          <select v-model="sortBy">
            <option value="name">按姓名</option>
            <option value="age">按年龄</option>
            <option value="email">按邮箱</option>
          </select>
        </div>
        
        <div class="user-list">
          <div v-for="user in filteredAndSortedUsers" :key="user.id" class="user-item">
            <strong>{{ user.name }}</strong> ({{ user.age }}岁)
            <br>
            <small>{{ user.email }}</small>
          </div>
        </div>
        <p class="result">找到 {{ filteredAndSortedUsers.length }} 个用户</p>
      </div>

      <!-- 监听器示例 */
      <div class="example-card">
        <h3>监听器 (Watch)</h3>
        <div class="form-group">
          <label>监听的值:</label>
          <input v-model="watchedValue" type="text" placeholder="输入内容观察变化">
        </div>
        
        <div class="form-group">
          <label>深度监听对象:</label>
          <input v-model="deepWatchObj.name" type="text" placeholder="姓名">
          <input v-model="deepWatchObj.age" type="number" placeholder="年龄">
        </div>

        <div class="watch-logs">
          <h4>监听日志:</h4>
          <div class="log-container">
            <div v-for="(log, index) in watchLogs" :key="index" class="log-item">
              {{ log }}
            </div>
          </div>
          <button @click="clearLogs" class="btn btn-secondary">清空日志</button>
        </div>
      </div>

      <!-- 异步计算示例 -->
      <div class="example-card">
        <h3>异步数据处理</h3>
        <div class="form-group">
          <label>用户ID:</label>
          <input v-model.number="userId" type="number" min="1" max="10" placeholder="输入1-10">
        </div>
        
        <div class="async-result">
          <div v-if="userLoading" class="loading">加载中...</div>
          <div v-else-if="userData" class="user-data">
            <h4>用户信息:</h4>
            <p><strong>姓名:</strong> {{ userData.name }}</p>
            <p><strong>邮箱:</strong> {{ userData.email }}</p>
            <p><strong>网站:</strong> {{ userData.website }}</p>
          </div>
          <div v-else-if="userError" class="error">
            加载失败: {{ userError }}
          </div>
        </div>
      </div>

      <!-- 表单验证示例 -->
      <div class="example-card">
        <h3>表单验证</h3>
        <div class="form-group">
          <label>邮箱:</label>
          <input 
            v-model="validationForm.email" 
            type="email" 
            placeholder="请输入邮箱"
            :class="{ invalid: !isEmailValid && validationForm.email }"
          >
          <p v-if="!isEmailValid && validationForm.email" class="error-msg">
            请输入有效的邮箱地址
          </p>
        </div>

        <div class="form-group">
          <label>密码:</label>
          <input 
            v-model="validationForm.password" 
            type="password" 
            placeholder="请输入密码"
            :class="{ invalid: !isPasswordValid && validationForm.password }"
          >
          <p v-if="!isPasswordValid && validationForm.password" class="error-msg">
            密码至少需要8个字符
          </p>
        </div>

        <div class="form-group">
          <label>确认密码:</label>
          <input 
            v-model="validationForm.confirmPassword" 
            type="password" 
            placeholder="请确认密码"
            :class="{ invalid: !isPasswordMatch && validationForm.confirmPassword }"
          >
          <p v-if="!isPasswordMatch && validationForm.confirmPassword" class="error-msg">
            两次输入的密码不一致
          </p>
        </div>

        <div class="validation-result">
          <p><strong>表单状态:</strong> 
            <span :class="isFormValid ? 'valid' : 'invalid'">
              {{ isFormValid ? '有效' : '无效' }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, watchEffect } from 'vue'

// 基础计算属性示例
const firstName = ref('张')
const lastName = ref('三')

const fullName = computed(() => {
  return `${lastName.value}${firstName.value}`
})

const fullNameLength = computed(() => {
  return fullName.value.length
})

const initials = computed(() => {
  return `${lastName.value.charAt(0)}${firstName.value.charAt(0)}`
})

// 购物车示例
const cartItems = reactive([
  { name: 'iPhone 15', price: 5999, quantity: 1 },
  { name: 'MacBook Pro', price: 12999, quantity: 1 },
  { name: 'AirPods', price: 1299, quantity: 2 }
])

const totalItems = computed(() => {
  return cartItems.reduce((total, item) => total + item.quantity, 0)
})

const totalPrice = computed(() => {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const averagePrice = computed(() => {
  return totalItems.value > 0 ? (totalPrice.value / totalItems.value).toFixed(2) : 0
})

const discountedPrice = computed(() => {
  const discount = totalPrice.value > 10000 ? 0.9 : 1
  return (totalPrice.value * discount).toFixed(2)
})

const addItem = () => {
  const newItems = [
    { name: 'iPad', price: 3999, quantity: 1 },
    { name: 'Apple Watch', price: 2999, quantity: 1 },
    { name: 'Magic Mouse', price: 799, quantity: 1 }
  ]
  const randomItem = newItems[Math.floor(Math.random() * newItems.length)]
  cartItems.push({ ...randomItem })
}

const removeItem = (index) => {
  cartItems.splice(index, 1)
}

// 搜索过滤示例
const searchQuery = ref('')
const sortBy = ref('name')

const users = reactive([
  { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
  { id: 3, name: '王五', age: 28, email: 'wangwu@example.com' },
  { id: 4, name: '赵六', age: 35, email: 'zhaoliu@example.com' },
  { id: 5, name: '钱七', age: 22, email: 'qianqi@example.com' }
])

const filteredAndSortedUsers = computed(() => {
  let filtered = users
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = users.filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    )
  }
  
  return filtered.sort((a, b) => {
    if (sortBy.value === 'age') {
      return a.age - b.age
    } else if (sortBy.value === 'email') {
      return a.email.localeCompare(b.email)
    } else {
      return a.name.localeCompare(b.name)
    }
  })
})

// 监听器示例
const watchedValue = ref('')
const deepWatchObj = reactive({ name: '', age: 0 })
const watchLogs = ref([])

// 监听简单值
watch(watchedValue, (newVal, oldVal) => {
  watchLogs.value.unshift(`watchedValue: "${oldVal}" → "${newVal}"`)
})

// 深度监听对象
watch(deepWatchObj, (newVal, oldVal) => {
  watchLogs.value.unshift(`deepWatchObj 发生变化: ${JSON.stringify(newVal)}`)
}, { deep: true })

const clearLogs = () => {
  watchLogs.value = []
}

// 异步数据示例
const userId = ref(1)
const userData = ref(null)
const userLoading = ref(false)
const userError = ref('')

// 模拟异步获取用户数据
const fetchUserData = async (id) => {
  userLoading.value = true
  userError.value = ''
  userData.value = null
  
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (id > 0 && id <= 10) {
      userData.value = {
        name: `用户${id}`,
        email: `user${id}@example.com`,
        website: `https://user${id}.example.com`
      }
    } else {
      throw new Error('用户不存在')
    }
  } catch (error) {
    userError.value = error.message
  } finally {
    userLoading.value = false
  }
}

// 监听userId变化，自动获取数据
watch(userId, (newId) => {
  if (newId) {
    fetchUserData(newId)
  }
}, { immediate: true })

// 表单验证示例
const validationForm = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(validationForm.email)
})

const isPasswordValid = computed(() => {
  return validationForm.password.length >= 8
})

const isPasswordMatch = computed(() => {
  return validationForm.password === validationForm.confirmPassword
})

const isFormValid = computed(() => {
  return isEmailValid.value && isPasswordValid.value && isPasswordMatch.value
})
</script>

<style scoped>
.computed-watch-example {
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
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #42b883;
}

.form-group input.invalid {
  border-color: #e74c3c;
}

.result {
  margin-top: 15px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 3px solid #42b883;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-input {
  width: 60px;
  padding: 4px 8px;
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

.cart-summary {
  margin-top: 15px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.user-list {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 10px;
}

.user-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.user-item:last-child {
  border-bottom: none;
}

.watch-logs {
  margin-top: 15px;
}

.log-container {
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f8f9fa;
}

.log-item {
  font-size: 12px;
  margin-bottom: 5px;
  font-family: monospace;
}

.loading {
  text-align: center;
  color: #666;
  padding: 20px;
}

.user-data {
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.error {
  color: #e74c3c;
  padding: 15px;
  background-color: #fdf2f2;
  border-radius: 4px;
}

.error-msg {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
}

.validation-result .valid {
  color: #27ae60;
}

.validation-result .invalid {
  color: #e74c3c;
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

@media (max-width: 768px) {
  .examples-grid {
    grid-template-columns: 1fr;
  }
  
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
