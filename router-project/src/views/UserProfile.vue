<template>
  <div class="user-profile">
    <h2>个人资料</h2>
    
    <div class="profile-card">
      <div class="avatar">
        <img :src="userProfile.avatar" :alt="userProfile.name" />
      </div>
      
      <div class="profile-info">
        <h3>{{ userProfile.name }}</h3>
        <p class="title">{{ userProfile.title }}</p>
        <p class="bio">{{ userProfile.bio }}</p>
        
        <div class="stats">
          <div class="stat-item">
            <span class="stat-number">{{ userProfile.followers }}</span>
            <span class="stat-label">关注者</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ userProfile.following }}</span>
            <span class="stat-label">关注中</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ userProfile.posts }}</span>
            <span class="stat-label">文章</span>
          </div>
        </div>
        
        <div class="contact-info">
          <p><strong>邮箱:</strong> {{ userProfile.email }}</p>
          <p><strong>位置:</strong> {{ userProfile.location }}</p>
          <p><strong>网站:</strong> 
            <a :href="userProfile.website" target="_blank">{{ userProfile.website }}</a>
          </p>
          <p><strong>加入时间:</strong> {{ userProfile.joinDate }}</p>
        </div>
      </div>
    </div>

    <div class="skills">
      <h3>技能标签</h3>
      <div class="skill-tags">
        <span 
          v-for="skill in userProfile.skills" 
          :key="skill" 
          class="skill-tag"
        >
          {{ skill }}
        </span>
      </div>
    </div>

    <div class="actions">
      <button @click="editProfile" class="btn btn-primary">编辑资料</button>
      <button @click="sendMessage" class="btn btn-secondary">发送消息</button>
      <router-link :to="`/user/${userId}/posts`" class="btn btn-outline">
        查看文章
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userId = computed(() => route.params.id)

// 模拟用户资料数据
const userProfile = ref({
  name: '',
  title: '',
  bio: '',
  avatar: '',
  email: '',
  location: '',
  website: '',
  joinDate: '',
  followers: 0,
  following: 0,
  posts: 0,
  skills: []
})

// 模拟获取用户数据
const fetchUserProfile = () => {
  // 模拟API调用
  setTimeout(() => {
    userProfile.value = {
      name: `用户 ${userId.value}`,
      title: 'Vue.js 开发工程师',
      bio: '热爱前端开发，专注于Vue.js生态系统。喜欢分享技术知识，持续学习新技术。',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId.value}`,
      email: `user${userId.value}@example.com`,
      location: '北京, 中国',
      website: 'https://example.com',
      joinDate: '2023年1月',
      followers: Math.floor(Math.random() * 1000) + 100,
      following: Math.floor(Math.random() * 500) + 50,
      posts: Math.floor(Math.random() * 100) + 10,
      skills: ['Vue.js', 'JavaScript', 'TypeScript', 'Node.js', 'CSS3', 'HTML5']
    }
  }, 500)
}

const editProfile = () => {
  alert('编辑资料功能')
}

const sendMessage = () => {
  alert(`向用户 ${userId.value} 发送消息`)
}

onMounted(() => {
  fetchUserProfile()
})
</script>

<style scoped>
.user-profile {
  max-width: 800px;
  margin: 0 auto;
}

.profile-card {
  display: flex;
  gap: 30px;
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.avatar img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #42b883;
}

.profile-info {
  flex: 1;
}

.profile-info h3 {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 24px;
}

.title {
  color: #666;
  font-size: 16px;
  margin: 0 0 15px 0;
}

.bio {
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
}

.stats {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 20px;
  font-weight: bold;
  color: #42b883;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.contact-info p {
  margin: 8px 0;
  font-size: 14px;
}

.contact-info a {
  color: #42b883;
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

.skills {
  margin-bottom: 30px;
}

.skills h3 {
  margin-bottom: 15px;
  color: #333;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-tag {
  background-color: #42b883;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: all 0.3s;
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

.btn-outline {
  background-color: transparent;
  color: #42b883;
  border: 2px solid #42b883;
  display: inline-block;
}

.btn-outline:hover {
  background-color: #42b883;
  color: white;
}

@media (max-width: 768px) {
  .profile-card {
    flex-direction: column;
    text-align: center;
  }
  
  .stats {
    justify-content: center;
  }
}
</style>
