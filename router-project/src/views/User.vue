<template>
  <div class="user">
    <h1>用户页面</h1>
    <p>用户ID: <strong>{{ userId }}</strong></p>
    
    <div class="user-nav">
      <router-link 
        :to="`/user/${userId}/profile`" 
        class="nav-tab"
        :class="{ active: $route.name === 'UserProfile' }"
      >
        个人资料
      </router-link>
      <router-link 
        :to="`/user/${userId}/posts`" 
        class="nav-tab"
        :class="{ active: $route.name === 'UserPosts' }"
      >
        用户文章
      </router-link>
    </div>

    <!-- 嵌套路由的出口 -->
    <div class="user-content">
      <router-view></router-view>
    </div>

    <div class="user-actions">
      <button @click="changeUser" class="action-btn">切换用户</button>
      <button @click="goToUserWithQuery" class="action-btn">带参数访问用户</button>
    </div>

    <div class="route-info">
      <h3>路由信息</h3>
      <p><strong>完整路径:</strong> {{ $route.fullPath }}</p>
      <p><strong>路由参数:</strong> {{ JSON.stringify($route.params) }}</p>
      <p><strong>查询参数:</strong> {{ JSON.stringify($route.query) }}</p>
      <p><strong>匹配的路由:</strong> {{ $route.matched.map(r => r.name).join(' > ') }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 获取用户ID参数
const userId = computed(() => route.params.id)

// 监听路由参数变化
watch(
  () => route.params.id,
  (newId, oldId) => {
    console.log(`用户ID从 ${oldId} 变更为 ${newId}`)
    // 这里可以重新获取用户数据
  }
)

// 切换用户
const changeUser = () => {
  const newUserId = Math.floor(Math.random() * 1000) + 1
  router.push(`/user/${newUserId}`)
}

// 带查询参数访问用户
const goToUserWithQuery = () => {
  router.push({
    name: 'User',
    params: { id: userId.value },
    query: { 
      tab: 'profile',
      timestamp: Date.now(),
      source: 'button-click'
    }
  })
}
</script>

<style scoped>
.user {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.user-nav {
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  margin: 20px 0;
}

.nav-tab {
  padding: 12px 24px;
  text-decoration: none;
  color: #666;
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
}

.nav-tab:hover {
  color: #42b883;
  background-color: #f5f5f5;
}

.nav-tab.active {
  color: #42b883;
  border-bottom-color: #42b883;
  font-weight: bold;
}

.user-content {
  min-height: 300px;
  padding: 20px 0;
}

.user-actions {
  margin: 30px 0;
  text-align: center;
}

.action-btn {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 10px;
  font-size: 14px;
}

.action-btn:hover {
  background-color: #369870;
}

.route-info {
  margin: 30px 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #42b883;
}

.route-info h3 {
  color: #42b883;
  margin-bottom: 15px;
}

.route-info p {
  margin: 8px 0;
  font-family: 'Courier New', monospace;
  font-size: 14px;
}
</style>
