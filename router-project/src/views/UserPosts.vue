<template>
  <div class="user-posts">
    <h2>用户文章</h2>
    <p>用户 {{ userId }} 的所有文章</p>

    <div class="posts-filter">
      <select v-model="selectedCategory" @change="filterPosts">
        <option value="">所有分类</option>
        <option value="技术">技术</option>
        <option value="生活">生活</option>
        <option value="教程">教程</option>
      </select>
      
      <input 
        v-model="searchKeyword" 
        @input="filterPosts"
        placeholder="搜索文章..."
        class="search-input"
      >
    </div>

    <div v-if="loading" class="loading">
      加载中...
    </div>

    <div v-else-if="filteredPosts.length === 0" class="no-posts">
      暂无文章
    </div>

    <div v-else class="posts-list">
      <article 
        v-for="post in filteredPosts" 
        :key="post.id" 
        class="post-card"
        @click="viewPost(post.id)"
      >
        <div class="post-header">
          <h3>{{ post.title }}</h3>
          <span class="post-category">{{ post.category }}</span>
        </div>
        
        <p class="post-excerpt">{{ post.excerpt }}</p>
        
        <div class="post-meta">
          <span class="post-date">{{ formatDate(post.date) }}</span>
          <span class="post-stats">
            👀 {{ post.views }} | 👍 {{ post.likes }} | 💬 {{ post.comments }}
          </span>
        </div>
        
        <div class="post-tags">
          <span 
            v-for="tag in post.tags" 
            :key="tag" 
            class="tag"
          >
            #{{ tag }}
          </span>
        </div>
      </article>
    </div>

    <div class="pagination">
      <button 
        @click="loadMore" 
        :disabled="!hasMore"
        class="load-more-btn"
      >
        {{ hasMore ? '加载更多' : '没有更多了' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const userId = computed(() => route.params.id)

// 响应式数据
const posts = ref([])
const loading = ref(true)
const selectedCategory = ref('')
const searchKeyword = ref('')
const hasMore = ref(true)

// 模拟文章数据
const generatePosts = () => {
  const categories = ['技术', '生活', '教程']
  const tags = ['Vue', 'JavaScript', 'CSS', '前端', '后端', '数据库', '算法']
  
  return Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: `文章标题 ${index + 1} - 关于Vue Router的深入探讨`,
    excerpt: `这是文章 ${index + 1} 的摘要。本文将深入探讨Vue Router的各种特性和使用方法，包括路由配置、导航守卫、动态路由等内容...`,
    category: categories[index % categories.length],
    date: new Date(Date.now() - Math.random() * 10000000000),
    views: Math.floor(Math.random() * 1000) + 100,
    likes: Math.floor(Math.random() * 100) + 10,
    comments: Math.floor(Math.random() * 50) + 5,
    tags: tags.slice(0, Math.floor(Math.random() * 3) + 2)
  }))
}

// 过滤后的文章
const filteredPosts = computed(() => {
  let result = posts.value

  // 按分类过滤
  if (selectedCategory.value) {
    result = result.filter(post => post.category === selectedCategory.value)
  }

  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(post => 
      post.title.toLowerCase().includes(keyword) ||
      post.excerpt.toLowerCase().includes(keyword) ||
      post.tags.some(tag => tag.toLowerCase().includes(keyword))
    )
  }

  return result
})

// 方法
const fetchPosts = () => {
  loading.value = true
  // 模拟API调用
  setTimeout(() => {
    posts.value = generatePosts()
    loading.value = false
  }, 1000)
}

const filterPosts = () => {
  // 过滤逻辑已在computed中处理
  console.log('过滤文章:', selectedCategory.value, searchKeyword.value)
}

const viewPost = (postId) => {
  // 这里可以跳转到文章详情页
  alert(`查看文章 ${postId}`)
  // router.push(`/post/${postId}`)
}

const loadMore = () => {
  // 模拟加载更多
  alert('加载更多文章')
  hasMore.value = false
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

onMounted(() => {
  fetchPosts()
})
</script>

<style scoped>
.user-posts {
  max-width: 900px;
  margin: 0 auto;
}

.posts-filter {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.posts-filter select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

.search-input {
  flex: 1;
  min-width: 200px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-input:focus {
  outline: none;
  border-color: #42b883;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.no-posts {
  text-align: center;
  padding: 40px;
  color: #999;
}

.posts-list {
  display: grid;
  gap: 20px;
}

.post-card {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

.post-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.post-header h3 {
  margin: 0;
  color: #333;
  font-size: 18px;
  flex: 1;
}

.post-category {
  background-color: #42b883;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-left: 10px;
}

.post-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
  color: #888;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: #f0f0f0;
  color: #666;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.pagination {
  text-align: center;
  margin-top: 30px;
}

.load-more-btn {
  background-color: #42b883;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.load-more-btn:hover:not(:disabled) {
  background-color: #369870;
}

.load-more-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .posts-filter {
    flex-direction: column;
  }
  
  .search-input {
    min-width: auto;
  }
  
  .post-header {
    flex-direction: column;
    gap: 10px;
  }
  
  .post-category {
    align-self: flex-start;
    margin-left: 0;
  }
  
  .post-meta {
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
  }
}
</style>
