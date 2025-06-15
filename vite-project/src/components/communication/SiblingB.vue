<template>
  <div class="sibling-b">
    <h5>兄弟组件 B</h5>
    <div class="sibling-content">
      <input v-model="message" placeholder="输入消息给兄弟组件A">
      <button @click="sendMessage" class="btn btn-success">
        发送消息
      </button>
      <button @click="sendAction" class="btn btn-warning">
        发送动作
      </button>
      
      <div class="received-messages">
        <h6>接收到的消息:</h6>
        <div v-for="(msg, index) in receivedMessages" :key="index" class="message-item">
          {{ msg }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { eventBus } from '../../utils/shared'

const message = ref('')
const receivedMessages = ref([])

// 发送消息给兄弟组件
const sendMessage = () => {
  if (message.value.trim()) {
    eventBus.emit('sibling-message', {
      message: message.value,
      from: 'SiblingB'
    })
    message.value = ''
  }
}

// 发送动作
const sendAction = () => {
  eventBus.emit('sibling-action', {
    action: 'data-update',
    from: 'SiblingB',
    timestamp: Date.now()
  })
}

// 监听来自兄弟组件的消息
const handleSiblingMessage = (data) => {
  if (data.from !== 'SiblingB') {
    receivedMessages.value.unshift(`${data.from}: ${data.message}`)
    if (receivedMessages.value.length > 5) {
      receivedMessages.value.pop()
    }
  }
}

const handleSiblingAction = (data) => {
  if (data.from !== 'SiblingB') {
    receivedMessages.value.unshift(`${data.from} 执行了: ${data.action}`)
    if (receivedMessages.value.length > 5) {
      receivedMessages.value.pop()
    }
  }
}

onMounted(() => {
  eventBus.on('sibling-message', handleSiblingMessage)
  eventBus.on('sibling-action', handleSiblingAction)
})

onUnmounted(() => {
  eventBus.off('sibling-message', handleSiblingMessage)
  eventBus.off('sibling-action', handleSiblingAction)
})
</script>

<style scoped>
.sibling-b {
  border: 2px solid #28a745;
  border-radius: 4px;
  padding: 15px;
  background-color: #f0fff0;
}

.sibling-b h5 {
  margin-top: 0;
  color: #28a745;
}

.sibling-content {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
}

.sibling-content input {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

.sibling-content button {
  margin-right: 10px;
  margin-bottom: 10px;
}

.received-messages {
  margin-top: 15px;
}

.received-messages h6 {
  margin-bottom: 10px;
  color: #333;
}

.message-item {
  padding: 5px;
  background-color: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 5px;
  font-size: 12px;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}
</style>
