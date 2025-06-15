<template>
  <div class="slot-example">
    <h2>插槽示例</h2>
    <p class="description">演示Vue 3中各种插槽的使用方法，包括默认插槽、具名插槽、作用域插槽等</p>

    <div class="examples-grid">
      <!-- 默认插槽 -->
      <div class="example-card">
        <h3>默认插槽</h3>
        <div class="slot-demo">
          <BasicCard>
            <h4>这是插槽内容</h4>
            <p>这些内容会被插入到组件的默认插槽中</p>
            <button class="btn btn-primary">插槽中的按钮</button>
          </BasicCard>

          <BasicCard>
            <div class="custom-content">
              <span class="icon">🎉</span>
              <span>不同的插槽内容</span>
            </div>
          </BasicCard>

          <BasicCard>
            <!-- 空插槽，会显示默认内容 -->
          </BasicCard>
        </div>
      </div>

      <!-- 具名插槽 -->
      <div class="example-card">
        <h3>具名插槽</h3>
        <div class="slot-demo">
          <NamedSlotCard>
            <template #header>
              <h4>自定义标题</h4>
              <span class="subtitle">这是副标题</span>
            </template>

            <template #default>
              <p>这是主要内容区域</p>
              <p>可以包含任意内容</p>
            </template>

            <template #footer>
              <button class="btn btn-primary">确定</button>
              <button class="btn btn-secondary">取消</button>
            </template>
          </NamedSlotCard>

          <NamedSlotCard>
            <template #header>
              <div class="header-with-icon">
                <span class="icon">⚙️</span>
                <span>设置</span>
              </div>
            </template>

            <p>只有标题和内容，没有底部</p>
          </NamedSlotCard>
        </div>
      </div>

      <!-- 作用域插槽 -->
      <div class="example-card">
        <h3>作用域插槽</h3>
        <div class="slot-demo">
          <UserList>
            <template #user="{ user, index }">
              <div class="user-card">
                <div class="user-avatar">{{ user.name.charAt(0) }}</div>
                <div class="user-info">
                  <h5>{{ user.name }}</h5>
                  <p>{{ user.email }}</p>
                  <span class="user-index">用户 #{{ index + 1 }}</span>
                </div>
                <div class="user-actions">
                  <button class="btn btn-small btn-info">编辑</button>
                  <button class="btn btn-small btn-danger">删除</button>
                </div>
              </div>
            </template>
          </UserList>

          <UserList>
            <template #user="{ user, index }">
              <div class="user-simple">
                {{ index + 1 }}. {{ user.name }} ({{ user.email }})
              </div>
            </template>
          </UserList>
        </div>
      </div>

      <!-- 动态插槽 -->
      <div class="example-card">
        <h3>动态插槽</h3>
        <div class="slot-demo">
          <div class="dynamic-controls">
            <label>选择插槽:</label>
            <select v-model="selectedSlot">
              <option value="header">Header</option>
              <option value="content">Content</option>
              <option value="footer">Footer</option>
            </select>
          </div>

          <DynamicSlotCard>
            <template #[selectedSlot]>
              <div class="dynamic-content">
                <h4>动态插槽内容</h4>
                <p>当前插槽: {{ selectedSlot }}</p>
                <p>时间: {{ new Date().toLocaleTimeString() }}</p>
              </div>
            </template>
          </DynamicSlotCard>
        </div>
      </div>

      <!-- 条件插槽 -->
      <div class="example-card">
        <h3>条件插槽</h3>
        <div class="slot-demo">
          <div class="conditional-controls">
            <label>
              <input v-model="showHeader" type="checkbox">
              显示头部
            </label>
            <label>
              <input v-model="showFooter" type="checkbox">
              显示底部
            </label>
            <label>
              <input v-model="showSidebar" type="checkbox">
              显示侧边栏
            </label>
          </div>

          <ConditionalSlotCard>
            <template v-if="showHeader" #header>
              <div class="conditional-header">
                <h4>条件头部</h4>
                <p>这个头部是条件显示的</p>
              </div>
            </template>

            <template #default>
              <p>主要内容始终显示</p>
              <p>其他插槽根据条件显示</p>
            </template>

            <template v-if="showSidebar" #sidebar>
              <div class="conditional-sidebar">
                <h5>侧边栏</h5>
                <ul>
                  <li>菜单项 1</li>
                  <li>菜单项 2</li>
                  <li>菜单项 3</li>
                </ul>
              </div>
            </template>

            <template v-if="showFooter" #footer>
              <div class="conditional-footer">
                <p>条件底部内容</p>
                <button class="btn btn-primary">操作</button>
              </div>
            </template>
          </ConditionalSlotCard>
        </div>
      </div>

      <!-- 插槽传递 -->
      <div class="example-card">
        <h3>插槽传递</h3>
        <div class="slot-demo">
          <SlotWrapper>
            <template #title>
              <h4>传递的标题</h4>
            </template>

            <template #content>
              <p>这个内容会被传递到内部组件</p>
              <div class="nested-content">
                <span class="icon">📦</span>
                <span>嵌套的插槽内容</span>
              </div>
            </template>

            <template #actions>
              <button class="btn btn-success">保存</button>
              <button class="btn btn-warning">重置</button>
            </template>
          </SlotWrapper>
        </div>
      </div>

      <!-- 插槽组合 -->
      <div class="example-card">
        <h3>复杂插槽组合</h3>
        <div class="slot-demo">
          <ComplexCard>
            <template #header="{ title, subtitle }">
              <div class="complex-header">
                <h4>{{ title }}</h4>
                <p class="subtitle">{{ subtitle }}</p>
                <div class="header-actions">
                  <button class="btn btn-small btn-info">设置</button>
                  <button class="btn btn-small btn-secondary">更多</button>
                </div>
              </div>
            </template>

            <template #content="{ data, loading }">
              <div v-if="loading" class="loading">
                <div class="spinner"></div>
                <p>加载中...</p>
              </div>
              <div v-else class="complex-content">
                <div v-for="item in data" :key="item.id" class="data-item">
                  <span class="item-icon">{{ item.icon }}</span>
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-value">{{ item.value }}</span>
                </div>
              </div>
            </template>

            <template #footer="{ stats }">
              <div class="complex-footer">
                <div class="stats">
                  <span>总计: {{ stats.total }}</span>
                  <span>平均: {{ stats.average }}</span>
                </div>
                <div class="footer-actions">
                  <button class="btn btn-primary">导出</button>
                  <button class="btn btn-secondary">刷新</button>
                </div>
              </div>
            </template>
          </ComplexCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 导入插槽组件
import BasicCard from './slots/BasicCard.vue'
import NamedSlotCard from './slots/NamedSlotCard.vue'
import UserList from './slots/UserList.vue'
import DynamicSlotCard from './slots/DynamicSlotCard.vue'
import ConditionalSlotCard from './slots/ConditionalSlotCard.vue'
import SlotWrapper from './slots/SlotWrapper.vue'
import ComplexCard from './slots/ComplexCard.vue'

// 动态插槽控制
const selectedSlot = ref('header')

// 条件插槽控制
const showHeader = ref(true)
const showFooter = ref(true)
const showSidebar = ref(false)
</script>

<style scoped>
.slot-example {
  max-width: 1200px;
  margin: 0 auto;
}

.description {
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
}

.example-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.example-card h3 {
  color: #42b883;
  margin-bottom: 15px;
  font-size: 18px;
}

.slot-demo {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.custom-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background-color: #f0f8ff;
  border-radius: 4px;
}

.icon {
  font-size: 20px;
}

.subtitle {
  color: #666;
  font-size: 14px;
}

.header-with-icon {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: white;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #42b883;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.user-info {
  flex: 1;
}

.user-info h5 {
  margin: 0 0 5px 0;
  color: #333;
}

.user-info p {
  margin: 0 0 5px 0;
  color: #666;
  font-size: 14px;
}

.user-index {
  font-size: 12px;
  color: #999;
}

.user-actions {
  display: flex;
  gap: 5px;
}

.user-simple {
  padding: 10px;
  border-bottom: 1px solid #eee;
  font-family: monospace;
}

.dynamic-controls,
.conditional-controls {
  margin-bottom: 15px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.dynamic-controls select {
  margin-left: 10px;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.conditional-controls {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.conditional-controls label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.dynamic-content {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  text-align: center;
}

.conditional-header {
  padding: 15px;
  background-color: #e8f5e8;
  border-radius: 4px;
  border-left: 3px solid #42b883;
}

.conditional-sidebar {
  padding: 15px;
  background-color: #f0f8ff;
  border-radius: 4px;
}

.conditional-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
}

.conditional-sidebar li {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}

.conditional-footer {
  padding: 15px;
  background-color: #fff3cd;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nested-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #f0f8f0;
  border-radius: 4px;
  margin-top: 10px;
}

.complex-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.header-actions {
  display: flex;
  gap: 5px;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.complex-content {
  padding: 15px;
}

.data-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.item-icon {
  font-size: 18px;
}

.item-name {
  flex: 1;
  font-weight: 500;
}

.item-value {
  color: #42b883;
  font-weight: bold;
}

.complex-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.stats {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #666;
}

.footer-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn-small {
  padding: 4px 8px;
  font-size: 12px;
}

.btn-primary {
  background-color: #42b883;
  color: white;
}

.btn-primary:hover {
  background-color: #369870;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}

.btn-warning:hover {
  background-color: #e0a800;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

@media (max-width: 768px) {
  .examples-grid {
    grid-template-columns: 1fr;
  }
  
  .user-card {
    flex-direction: column;
    text-align: center;
  }
  
  .conditional-controls {
    flex-direction: column;
    gap: 10px;
  }
  
  .complex-header {
    flex-direction: column;
    gap: 10px;
  }
  
  .complex-footer {
    flex-direction: column;
    gap: 15px;
  }
  
  .stats {
    justify-content: center;
  }
}
</style>
