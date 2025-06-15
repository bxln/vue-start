<template>
  <div class="slot-wrapper">
    <h4>插槽包装器</h4>
    <p>这个组件演示插槽的传递</p>
    
    <!-- 使用内部组件，并传递插槽 -->
    <InnerCard>
      <!-- 传递标题插槽 -->
      <template #title>
        <div class="wrapper-title">
          <span class="wrapper-icon">📦</span>
          <slot name="title"></slot>
        </div>
      </template>

      <!-- 传递内容插槽 -->
      <template #content>
        <div class="wrapper-content">
          <slot name="content"></slot>
        </div>
      </template>

      <!-- 传递操作插槽 -->
      <template #actions>
        <div class="wrapper-actions">
          <slot name="actions"></slot>
        </div>
      </template>
    </InnerCard>
  </div>
</template>

<script setup>
import InnerCard from './InnerCard.vue'
</script>

<style scoped>
.slot-wrapper {
  border: 2px dashed #42b883;
  border-radius: 8px;
  padding: 15px;
  background-color: #f0f8f0;
}

.slot-wrapper h4 {
  margin-top: 0;
  color: #42b883;
}

.wrapper-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.wrapper-icon {
  font-size: 18px;
}

.wrapper-content {
  padding: 10px;
  background-color: rgba(66, 184, 131, 0.1);
  border-radius: 4px;
  border-left: 3px solid #42b883;
}

.wrapper-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}
</style>
