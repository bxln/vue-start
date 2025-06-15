import { reactive } from 'vue'

// 简单的事件总线实现
class EventBus {
  constructor() {
    this.events = {}
  }

  // 监听事件
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  // 移除事件监听
  off(event, callback) {
    if (!this.events[event]) return
    
    const index = this.events[event].indexOf(callback)
    if (index > -1) {
      this.events[event].splice(index, 1)
    }
  }

  // 触发事件
  emit(event, data) {
    if (!this.events[event]) return
    
    this.events[event].forEach(callback => {
      callback(data)
    })
  }

  // 清空所有事件
  clear() {
    this.events = {}
  }
}

// 创建全局事件总线实例
export const eventBus = new EventBus()

// 全局状态管理 (简单版本)
export const globalState = reactive({
  user: {
    name: '张三',
    role: 'user'
  },
  count: 0,
  theme: 'light',
  
  // 状态更新方法
  updateUser(userData) {
    Object.assign(this.user, userData)
  },
  
  incrementCount(amount = 1) {
    this.count += amount
  },
  
  setTheme(theme) {
    this.theme = theme
  },
  
  reset() {
    this.user = { name: '张三', role: 'user' }
    this.count = 0
    this.theme = 'light'
  }
})

// 工具函数
export const utils = {
  // 格式化时间
  formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString()
  },
  
  // 生成随机ID
  generateId() {
    return Math.random().toString(36).substr(2, 9)
  },
  
  // 深拷贝
  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj))
  },
  
  // 防抖函数
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },
  
  // 节流函数
  throttle(func, limit) {
    let inThrottle
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }
}

// 常量定义
export const CONSTANTS = {
  THEMES: ['light', 'dark'],
  USER_ROLES: ['user', 'admin', 'guest'],
  EVENT_TYPES: {
    USER_UPDATE: 'user-update',
    THEME_CHANGE: 'theme-change',
    COUNT_CHANGE: 'count-change'
  }
}
