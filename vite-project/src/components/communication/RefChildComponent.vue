<template>
  <div class="ref-child">
    <h5>Ref 子组件</h5>
    <div class="ref-content">
      <input 
        ref="inputRef"
        v-model="internalData" 
        placeholder="子组件输入框"
        class="child-input"
      >
      <p><strong>内部数据:</strong> {{ internalData }}</p>
      <p><strong>方法调用次数:</strong> {{ methodCallCount }}</p>
      
      <div class="child-actions">
        <button @click="internalMethod" class="btn btn-primary">
          内部方法
        </button>
        <button @click="clearData" class="btn btn-secondary">
          清空数据
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 内部状态
const internalData = ref('子组件数据')
const methodCallCount = ref(0)
const inputRef = ref(null)

// 内部方法
const internalMethod = () => {
  internalData.value += '!'
  methodCallCount.value++
}

const clearData = () => {
  internalData.value = ''
}

// 暴露给父组件的方法
const childMethod = () => {
  methodCallCount.value++
  internalData.value = `父组件调用了方法 (${methodCallCount.value})`
  console.log('子组件方法被父组件调用')
}

const getChildData = () => {
  return {
    data: internalData.value,
    callCount: methodCallCount.value,
    timestamp: Date.now()
  }
}

const focusInput = () => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
}

// 使用 defineExpose 暴露方法给父组件
defineExpose({
  childMethod,
  getChildData,
  focusInput
})
</script>

<style scoped>
.ref-child {
  border: 2px solid #dc3545;
  border-radius: 4px;
  padding: 15px;
  margin-top: 15px;
  background-color: #fdf2f2;
}

.ref-child h5 {
  margin-top: 0;
  color: #dc3545;
}

.ref-content {
  background-color: white;
  padding: 15px;
  border-radius: 4px;
}

.child-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

.child-input:focus {
  outline: none;
  border-color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
}

.child-actions {
  margin-top: 15px;
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

.btn-secondary {
  background-color: #6c757d;
  color: white;
}
</style>
