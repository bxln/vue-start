<template>
  <div class="dynamic-slot-card">
    <!-- 头部区域 -->
    <div class="slot-section header-section">
      <h5>Header 区域</h5>
      <div class="slot-content">
        <slot name="header">
          <div class="empty-slot">Header 插槽为空</div>
        </slot>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="slot-section content-section">
      <h5>Content 区域</h5>
      <div class="slot-content">
        <slot name="content">
          <div class="empty-slot">Content 插槽为空</div>
        </slot>
      </div>
    </div>

    <!-- 底部区域 -->
    <div class="slot-section footer-section">
      <h5>Footer 区域</h5>
      <div class="slot-content">
        <slot name="footer">
          <div class="empty-slot">Footer 插槽为空</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dynamic-slot-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  overflow: hidden;
}

.slot-section {
  border-bottom: 1px solid #e0e0e0;
}

.slot-section:last-child {
  border-bottom: none;
}

.slot-section h5 {
  margin: 0;
  padding: 10px 15px;
  background-color: #f8f9fa;
  color: #666;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.slot-content {
  padding: 15px;
  min-height: 60px;
  display: flex;
  align-items: center;
}

.header-section .slot-content {
  background-color: #fff5f5;
}

.content-section .slot-content {
  background-color: #f5f5ff;
}

.footer-section .slot-content {
  background-color: #f5fff5;
}

.empty-slot {
  color: #999;
  font-style: italic;
  text-align: center;
  width: 100%;
}
</style>
