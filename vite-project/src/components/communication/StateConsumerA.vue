<template>
  <div class="state-consumer-a">
    <h5>状态消费者 A</h5>
    <div class="consumer-content">
      <p><strong>全局用户:</strong> {{ globalState.user.name }}</p>
      <p><strong>全局计数:</strong> {{ globalState.count }}</p>
      <p><strong>全局主题:</strong> {{ globalState.theme }}</p>
      
      <div class="local-actions">
        <button @click="localIncrement" class="btn btn-primary">
          本地增加计数
        </button>
        <button @click="localUpdateUser" class="btn btn-info">
          本地更新用户
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { globalState } from '../../utils/shared'

// 本地操作全局状态
const localIncrement = () => {
  globalState.count += 10
}

const localUpdateUser = () => {
  globalState.user.name = `消费者A更新-${Date.now()}`
}
</script>

<style scoped>
.state-consumer-a {
  border: 1px solid #007bff;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f0f8ff;
}

.state-consumer-a h5 {
  margin-top: 0;
  color: #007bff;
}

.consumer-content {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
}

.local-actions {
  margin-top: 10px;
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

.btn-info {
  background-color: #17a2b8;
  color: white;
}
</style>
