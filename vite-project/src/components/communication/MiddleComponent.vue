<template>
  <div class="middle-component">
    <h5>中间层组件 (不使用注入的数据)</h5>
    <p>这个组件只是传递层，不直接使用注入的数据</p>
    
    <!-- 孙子组件 -->
    <GrandChildComponent />
  </div>
</template>

<script setup>
import GrandChildComponent from './GrandChildComponent.vue'
</script>

<style scoped>
.middle-component {
  border: 1px solid #6c757d;
  border-radius: 4px;
  padding: 15px;
  margin-top: 15px;
  background-color: #f8f9fa;
}

.middle-component h5 {
  margin-top: 0;
  color: #6c757d;
}
</style>
