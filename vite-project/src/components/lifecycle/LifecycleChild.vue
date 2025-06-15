<template>
  <div class="lifecycle-child">
    <h4>生命周期子组件</h4>
    <div class="child-content">
      <p><strong>子组件状态:</strong> {{ childStatus }}</p>
      <p><strong>创建时间:</strong> {{ createTime }}</p>
      <p><strong>内部计数:</strong> {{ internalCount }}</p>
      
      <div class="child-actions">
        <button @click="incrementCount" class="btn btn-primary">
          增加计数
        </button>
        <button @click="changeStatus" class="btn btn-info">
          改变状态
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  ref, 
  onBeforeMount, 
  onMounted, 
  onBeforeUpdate, 
  onUpdated, 
  onBeforeUnmount, 
  onUnmounted 
} from 'vue'

// 定义 emits
const emit = defineEmits(['lifecycle-event'])

// 子组件状态
const childStatus = ref('初始化')
const createTime = ref('')
const internalCount = ref(0)

// 发送生命周期事件给父组件
const emitLifecycleEvent = (phase, message) => {
  emit('lifecycle-event', { phase, message })
}

// 生命周期钩子
onBeforeMount(() => {
  childStatus.value = '挂载前'
  emitLifecycleEvent('beforeMount', '子组件挂载前')
})

onMounted(() => {
  createTime.value = new Date().toLocaleString()
  childStatus.value = '已挂载'
  emitLifecycleEvent('mounted', '子组件已挂载')
})

onBeforeUpdate(() => {
  emitLifecycleEvent('beforeUpdate', '子组件更新前')
})

onUpdated(() => {
  emitLifecycleEvent('updated', '子组件已更新')
})

onBeforeUnmount(() => {
  childStatus.value = '卸载前'
  emitLifecycleEvent('beforeUnmount', '子组件卸载前')
})

onUnmounted(() => {
  emitLifecycleEvent('unmounted', '子组件已卸载')
})

// 子组件方法
const incrementCount = () => {
  internalCount.value++
}

const changeStatus = () => {
  const statuses = ['运行中', '暂停', '活跃', '空闲']
  childStatus.value = statuses[Math.floor(Math.random() * statuses.length)]
}
</script>

<style scoped>
.lifecycle-child {
  border: 2px solid #ffc107;
  border-radius: 4px;
  padding: 15px;
  margin-top: 15px;
  background-color: #fff3cd;
}

.lifecycle-child h4 {
  margin-top: 0;
  color: #856404;
}

.child-content {
  background-color: white;
  padding: 15px;
  border-radius: 4px;
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

.btn-info {
  background-color: #17a2b8;
  color: white;
}
</style>
