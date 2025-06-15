<template>
  <div class="not-found">
    <div class="error-content">
      <div class="error-icon">
        <span class="number">4</span>
        <span class="zero">0</span>
        <span class="number">4</span>
      </div>
      
      <h1>页面未找到</h1>
      <p class="error-message">
        抱歉，您访问的页面 <code>{{ $route.fullPath }}</code> 不存在。
      </p>
      
      <div class="suggestions">
        <h3>可能的原因：</h3>
        <ul>
          <li>URL地址输入错误</li>
          <li>页面已被移动或删除</li>
          <li>链接已过期</li>
          <li>您没有访问权限</li>
        </ul>
      </div>

      <div class="actions">
        <router-link to="/" class="btn btn-primary">
          🏠 返回首页
        </router-link>
        <button @click="goBack" class="btn btn-secondary">
          ← 返回上一页
        </button>
        <button @click="refresh" class="btn btn-outline">
          🔄 刷新页面
        </button>
      </div>

      <div class="helpful-links">
        <h3>您可能想要访问：</h3>
        <div class="link-grid">
          <router-link to="/" class="help-link">
            <span class="icon">🏠</span>
            <span class="text">首页</span>
          </router-link>
          <router-link to="/about" class="help-link">
            <span class="icon">ℹ️</span>
            <span class="text">关于我们</span>
          </router-link>
          <router-link to="/contact" class="help-link">
            <span class="icon">📞</span>
            <span class="text">联系我们</span>
          </router-link>
          <router-link to="/user/123" class="help-link">
            <span class="icon">👤</span>
            <span class="text">用户页面</span>
          </router-link>
        </div>
      </div>
    </div>

    <div class="error-details">
      <details>
        <summary>技术详情</summary>
        <div class="tech-info">
          <p><strong>请求路径:</strong> {{ $route.fullPath }}</p>
          <p><strong>路由名称:</strong> {{ $route.name || '未定义' }}</p>
          <p><strong>时间戳:</strong> {{ new Date().toLocaleString() }}</p>
          <p><strong>用户代理:</strong> {{ navigator.userAgent }}</p>
        </div>
      </details>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  // 如果有历史记录，返回上一页，否则跳转到首页
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

const refresh = () => {
  window.location.reload()
}
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.error-content {
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.error-icon {
  font-size: 120px;
  font-weight: bold;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.number {
  color: #fff;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.zero {
  color: #ff6b6b;
  animation: pulse 2s infinite;
  text-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.error-content h1 {
  font-size: 36px;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.error-message {
  font-size: 18px;
  margin-bottom: 30px;
  opacity: 0.9;
}

.error-message code {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

.suggestions {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  text-align: left;
}

.suggestions h3 {
  margin-top: 0;
  margin-bottom: 15px;
}

.suggestions ul {
  margin: 0;
  padding-left: 20px;
}

.suggestions li {
  margin-bottom: 8px;
}

.actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.btn {
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border: none;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background-color: #42b883;
  color: white;
}

.btn-primary:hover {
  background-color: #369870;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
  transform: translateY(-2px);
}

.btn-outline {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn-outline:hover {
  background-color: white;
  color: #667eea;
  transform: translateY(-2px);
}

.helpful-links {
  margin-bottom: 30px;
}

.helpful-links h3 {
  margin-bottom: 20px;
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
}

.help-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-decoration: none;
  color: white;
  transition: all 0.3s;
}

.help-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.help-link .icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.help-link .text {
  font-size: 14px;
}

.error-details {
  margin-top: 40px;
  width: 100%;
  max-width: 600px;
}

.error-details details {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 15px;
}

.error-details summary {
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 10px;
}

.tech-info {
  margin-top: 15px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  text-align: left;
}

.tech-info p {
  margin: 8px 0;
  word-break: break-all;
}

@media (max-width: 768px) {
  .error-icon {
    font-size: 80px;
  }
  
  .error-content h1 {
    font-size: 28px;
  }
  
  .error-message {
    font-size: 16px;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 200px;
    justify-content: center;
  }
  
  .link-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
