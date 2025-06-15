<template>
  <div class="conditional-slot-card">
    <div class="card-layout">
      <!-- 头部插槽 -->
      <div v-if="$slots.header" class="header-area">
        <slot name="header"></slot>
      </div>

      <div class="main-area">
        <!-- 侧边栏插槽 -->
        <div v-if="$slots.sidebar" class="sidebar-area">
          <slot name="sidebar"></slot>
        </div>

        <!-- 主要内容插槽 -->
        <div class="content-area" :class="{ 'full-width': !$slots.sidebar }">
          <slot>
            <div class="default-content">
              <h4>主要内容区域</h4>
              <p>这里是默认的主要内容</p>
            </div>
          </slot>
        </div>
      </div>

      <!-- 底部插槽 -->
      <div v-if="$slots.footer" class="footer-area">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.conditional-slot-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: white;
  overflow: hidden;
}

.card-layout {
  display: flex;
  flex-direction: column;
  min-height: 300px;
}

.header-area {
  border-bottom: 1px solid #e0e0e0;
}

.main-area {
  display: flex;
  flex: 1;
}

.sidebar-area {
  width: 200px;
  border-right: 1px solid #e0e0e0;
  background-color: #f8f9fa;
}

.content-area {
  flex: 1;
  padding: 20px;
}

.content-area.full-width {
  width: 100%;
}

.footer-area {
  border-top: 1px solid #e0e0e0;
}

.default-content {
  text-align: center;
  color: #666;
}

.default-content h4 {
  margin-top: 0;
  color: #333;
}

@media (max-width: 768px) {
  .main-area {
    flex-direction: column;
  }
  
  .sidebar-area {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
  }
}
</style>
