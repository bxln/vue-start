<template>
  <div class="state-consumer-b">
    <h5>状态消费者 B</h5>
    <div class="consumer-content">
      <p><strong>全局用户:</strong> {{ globalState.user.name }}</p>
      <p><strong>全局计数:</strong> {{ globalState.count }}</p>
      <p><strong>全局主题:</strong> {{ globalState.theme }}</p>
      
      <div class="theme-display" :class="globalState.theme">
        当前主题: {{ globalState.theme }}
      </div>
      
      <div class="local-actions">
        <button @click="localDecrement" class="btn btn-warning">
          本地减少计数
        </button>
        <button @click="localResetUser" class="btn btn-danger">
          重置用户
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { globalState } from '../../utils/shared'

// 本地操作全局状态
const localDecrement = () => {
  globalState.count -= 5
}

const localResetUser = () => {
  globalState.user.name = '默认用户'
}
</script>

<style scoped>
.state-consumer-b {
  border: 1px solid #28a745;
  border-radius: 4px;
  padding: 15px;
  background-color: #f0fff0;
}

.state-consumer-b h5 {
  margin-top: 0;
  color: #28a745;
}

.consumer-content {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
}

.theme-display {
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
  text-align: center;
  font-weight: bold;
}

.theme-display.light {
  background-color: #fff;
  color: #333;
  border: 1px solid #ddd;
}

.theme-display.dark {
  background-color: #333;
  color: #fff;
  border: 1px solid #666;
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

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}
</style>
