<template>
  <div class="user-list">
    <h4>用户列表</h4>
    <div class="users">
      <!-- 作用域插槽：为每个用户提供数据 -->
      <div v-for="(user, index) in users" :key="user.id" class="user-slot">
        <slot name="user" :user="user" :index="index">
          <!-- 默认用户显示 -->
          <div class="default-user">
            <span>{{ user.name }}</span>
            <span class="email">{{ user.email }}</span>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

// 模拟用户数据
const users = reactive([
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: 'user' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: 'user' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'moderator' }
])
</script>

<style scoped>
.user-list {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  margin-bottom: 15px;
}

.user-list h4 {
  margin: 0;
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
  color: #333;
}

.users {
  padding: 10px;
}

.user-slot {
  margin-bottom: 10px;
}

.user-slot:last-child {
  margin-bottom: 0;
}

.default-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.email {
  color: #666;
  font-size: 14px;
}
</style>
