<template>
  <div class="photo-wall-container">
    <div 
      v-for="(person, index) in people" 
      :key="index" 
      class="photo-card"
    >
      <!-- 头像 -->
      <img 
        :src="getRandomImage()" 
        :alt="person.name" 
        class="photo"
      />
      
      <!-- 信息容器 -->
      <div class="info">
        <!-- 姓名 -->
        <div class="info-block">
          <div class="name truncate">{{ person.name }}</div>
          <div class="tooltip">
            <div>姓名：{{ person.name }}</div>
            <div>机构：{{ person.organization }}</div>
            <div>职位：{{ person.position }}</div>
          </div>
        </div>

        <!-- 组织机构 -->
        <div class="info-block">
          <div class="org truncate">{{ person.organization }}</div>
        </div>

        <!-- 职位 -->
        <div class="info-block">
          <div class="pos truncate">{{ person.position }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

// 扩展为 24 条示例数据（3 行 x 8 个）
const people = reactive([
  { name: '张伟', organization: '组织部', position: '副部长' },
  { name: '王芳', organization: '宣传部', position: '副部长' },
  { name: '李强', organization: '人事处', position: '部长' },
  { name: '赵敏', organization: '财务科', position: '科长' },
  { name: '刘洋', organization: '办公室', position: '主任' },
  { name: '陈静', organization: '纪检组', position: '组长' },
  { name: '杨勇', organization: '工会', position: '主席' },
  { name: '黄娟', organization: '团委', position: '书记' },
  { name: '周杰', organization: '发改委', position: '副主任' },
  { name: '吴敏', organization: '人社局', position: '科员' },
  { name: '徐刚', organization: '住建局', position: '局长' },
  { name: '孙丽', organization: '教育局', position: '副局长' },
  { name: '胡军', organization: '卫健委', position: '处长' },
  { name: '郭婷', organization: '财政局', position: '科长' },
  { name: '何强', organization: '交通局', position: '主任' },
  { name: '高磊', organization: '审计局', position: '科员' },
  { name: '林雪', organization: '环保局', position: '副处长' },
  { name: '马超', organization: '农业农村局', position: '处长' },
  { name: '秦月', organization: '文旅局', position: '科长' },
  { name: '程浩', organization: '应急管理局', position: '主任' },
  { name: '许娜', organization: '统计局', position: '科员' },
  { name: '邓阳', organization: '税务局', position: '副局长' }
]);

// 随机图片生成
function getRandomImage() {
  const width = 200;
  const height = 300;
  return `https://picsum.photos/seed/${Math.random()}/${width}/${height}`;
}
</script>

<style scoped>
.photo-wall-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px; /* 统一间距控制 */
}

.photo-card {
  width: 96%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border: 1px solid #eee;
  padding: 10px;
  text-align: center;
  position: relative; /* 为tooltip定位提供基准 */
  transition: transform 0.2s ease;
}

.photo {
  width: 96%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 8px;
}

.info {
  font-size: 12px;
  line-height: 1.2;
  width: 100%;
}

/* 通用信息区块 */
.info-block {
  position: relative;
  padding: 2px 0;
}

/* 文本截断样式 */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #666;
  display: block;
  cursor: help;
}

.name {
  font-weight: bold;
  color: #333;
}

/* 悬浮提示层 */
.tooltip {
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease;
  position: absolute;
  z-index: 9999;
  bottom: 110%; /* 卡片上方 */
  left: 50%;    /* 水平居中 */
  transform: translateX(-50%) translateY(-4px); /* 精确居中 */
  background: #927f7f;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  white-space: pre-line;
  font-size: 11px;
  min-width: 180px;
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  word-wrap: break-word;
  text-align: center; /* 内容居中 */
}

/* 卡片悬停效果 */
/* .photo-card:hover {
  transform: translateY(-4px);
} */

/* 显示tooltip */
.photo-card:hover .tooltip {
  visibility: visible;
  opacity: 1;
  transition-delay: 0.3s;
}
</style>