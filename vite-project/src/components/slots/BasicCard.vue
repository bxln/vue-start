<template>
  <div class="basic-card">
    <div class="card-content">
      <!-- 默认插槽 -->
      <slot>
        <div class="default-content">
          <h4>默认内容</h4>
          <p>这是默认插槽内容，当没有提供插槽内容时显示</p>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.basic-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
}

.card-content {
  padding: 20px;
}

.default-content {
  text-align: center;
  color: #666;
  font-style: italic;
}

.default-content h4 {
  margin-top: 0;
  color: #999;
}
</style>
