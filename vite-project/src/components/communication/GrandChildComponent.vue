<template>
  <div class="grandchild-component">
    <h6>孙子组件 (使用 inject)</h6>
    <div class="injected-data">
      <p><strong>注入的主题:</strong> {{ appData?.theme }}</p>
      <p><strong>注入的语言:</strong> {{ appData?.language }}</p>
      <p><strong>注入的用户:</strong> {{ appData?.user?.name }} ({{ appData?.user?.role }})</p>
      
      <button @click="updateData" class="btn btn-primary">
        更新祖父组件数据
      </button>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

// 注入数据
const appData = inject('appData')
const updateData = inject('updateData')
</script>

<style scoped>
.grandchild-component {
  border: 1px solid #28a745;
  border-radius: 4px;
  padding: 15px;
  margin-top: 15px;
  background-color: #f0fff0;
}

.grandchild-component h6 {
  margin-top: 0;
  color: #28a745;
}

.injected-data {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-top: 10px;
}

.btn-primary {
  background-color: #42b883;
  color: white;
}

.btn-primary:hover {
  background-color: #369870;
}
</style>
