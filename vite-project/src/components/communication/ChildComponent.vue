<template>
  <div class="child-component">
    <h4>子组件</h4>
    <div class="child-content">
      <p><strong>接收到的消息:</strong> {{ message }}</p>
      <p><strong>接收到的计数:</strong> {{ count }}</p>
      <p><strong>子组件内部计数:</strong> {{ internalCount }}</p>
      
      <div class="child-controls">
        <input 
          v-model="childMessage" 
          placeholder="输入消息给父组件"
          @input="sendMessageToParent"
        >
        <button @click="incrementCount" class="btn btn-primary">
          增加计数
        </button>
        <button @click="sendCustomEvent" class="btn btn-info">
          发送自定义事件
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// 定义 props
const props = defineProps({
  message: {
    type: String,
    default: ''
  },
  count: {
    type: Number,
    default: 0
  }
})

// 定义 emits
const emit = defineEmits(['update-message', 'increment', 'custom-event'])

// 子组件内部状态
const childMessage = ref('')
const internalCount = ref(0)

// 发送消息给父组件
const sendMessageToParent = () => {
  emit('update-message', childMessage.value)
}

// 增加计数并通知父组件
const incrementCount = () => {
  internalCount.value++
  emit('increment', internalCount.value)
}

// 发送自定义事件
const sendCustomEvent = () => {
  emit('custom-event', {
    type: 'custom',
    data: {
      timestamp: Date.now(),
      message: '这是一个自定义事件',
      count: internalCount.value
    }
  })
}

// 监听 props 变化
watch(() => props.count, (newCount) => {
  console.log('父组件计数变化:', newCount)
})
</script>

<style scoped>
.child-component {
  border: 2px solid #17a2b8;
  border-radius: 8px;
  padding: 15px;
  margin-top: 15px;
  background-color: #f0f9ff;
}

.child-component h4 {
  margin-top: 0;
  color: #17a2b8;
}

.child-content {
  background-color: white;
  padding: 15px;
  border-radius: 4px;
}

.child-controls {
  margin-top: 15px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.child-controls input {
  flex: 1;
  min-width: 200px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
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

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
}

@media (max-width: 768px) {
  .child-controls {
    flex-direction: column;
  }
  
  .child-controls input {
    min-width: auto;
  }
}
</style>
