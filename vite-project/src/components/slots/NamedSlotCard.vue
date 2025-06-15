<template>
  <div class="named-slot-card">
    <!-- 头部插槽 -->
    <div v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </div>

    <!-- 主要内容插槽 -->
    <div class="card-body">
      <slot>
        <p class="default-content">默认主要内容</p>
      </slot>
    </div>

    <!-- 底部插槽 -->
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.named-slot-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  overflow: hidden;
}

.card-header {
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
}

.card-header h4 {
  margin: 0;
  color: #333;
}

.card-body {
  padding: 20px;
}

.card-footer {
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.default-content {
  color: #666;
  font-style: italic;
  margin: 0;
}
</style>
