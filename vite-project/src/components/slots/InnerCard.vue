<template>
  <div class="inner-card">
    <!-- 标题区域 -->
    <div v-if="$slots.title" class="inner-header">
      <slot name="title"></slot>
    </div>

    <!-- 内容区域 -->
    <div class="inner-body">
      <slot name="content">
        <p class="default-inner-content">默认内部内容</p>
      </slot>
    </div>

    <!-- 操作区域 -->
    <div v-if="$slots.actions" class="inner-footer">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<style scoped>
.inner-card {
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: white;
  margin-top: 10px;
  overflow: hidden;
}

.inner-header {
  padding: 15px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
}

.inner-body {
  padding: 20px;
}

.inner-footer {
  padding: 15px;
  background-color: #f8f9fa;
  border-top: 1px solid #ddd;
}

.default-inner-content {
  color: #666;
  font-style: italic;
  margin: 0;
}
</style>
