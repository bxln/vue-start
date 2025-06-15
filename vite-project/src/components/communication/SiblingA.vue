<template>
  <div class="sibling-a">
    <h5>兄弟组件 A</h5>
    <div class="sibling-content">
      <input v-model="message" placeholder="输入消息给兄弟组件B">
      <button @click="sendMessage" class="btn btn-primary">
        发送消息
      </button>
      <button @click="sendAction" class="btn btn-info">
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
      from: 'SiblingA'
    })
    message.value = ''
  }
}

// 发送动作
const sendAction = () => {
  eventBus.emit('sibling-action', {
    action: 'button-click',
    from: 'SiblingA',
    timestamp: Date.now()
  })
}

// 监听来自兄弟组件的消息
const handleSiblingMessage = (data) => {
  if (data.from !== 'SiblingA') {
    receivedMessages.value.unshift(`${data.from}: ${data.message}`)
    if (receivedMessages.value.length > 5) {
      receivedMessages.value.pop()
    }
  }
}

const handleSiblingAction = (data) => {
  if (data.from !== 'SiblingA') {
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
.sibling-a {
  border: 2px solid #007bff;
  border-radius: 4px;
  padding: 15px;
  background-color: #f0f8ff;
}

.sibling-a h5 {
  margin-top: 0;
  color: #007bff;
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

.btn-primary {
  background-color: #42b883;
  color: white;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}
</style>
