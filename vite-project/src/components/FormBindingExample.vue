<template>
  <div class="form-binding-example">
    <h2>表单绑定示例</h2>
    <p class="description">演示Vue 3中各种表单元素的双向数据绑定 (v-model)</p>

    <div class="examples-grid">
      <!-- 文本输入 -->
      <div class="example-card">
        <h3>文本输入</h3>
        <div class="form-group">
          <label>普通文本:</label>
          <input v-model="form.text" type="text" placeholder="请输入文本">
          <p class="result">输入值: {{ form.text }}</p>
        </div>
        
        <div class="form-group">
          <label>密码:</label>
          <input v-model="form.password" type="password" placeholder="请输入密码">
          <p class="result">密码长度: {{ form.password.length }}</p>
        </div>

        <div class="form-group">
          <label>邮箱:</label>
          <input v-model="form.email" type="email" placeholder="请输入邮箱">
          <p class="result">邮箱: {{ form.email }}</p>
        </div>
      </div>

      <!-- 文本域 -->
      <div class="example-card">
        <h3>文本域</h3>
        <div class="form-group">
          <label>多行文本:</label>
          <textarea 
            v-model="form.textarea" 
            placeholder="请输入多行文本"
            rows="4"
          ></textarea>
          <p class="result">字符数: {{ form.textarea.length }}</p>
        </div>
      </div>

      <!-- 复选框 -->
      <div class="example-card">
        <h3>复选框</h3>
        <div class="form-group">
          <label>
            <input v-model="form.checkbox" type="checkbox">
            同意用户协议
          </label>
          <p class="result">状态: {{ form.checkbox ? '已同意' : '未同意' }}</p>
        </div>

        <div class="form-group">
          <label>兴趣爱好:</label>
          <div class="checkbox-group">
            <label v-for="hobby in hobbies" :key="hobby">
              <input v-model="form.selectedHobbies" :value="hobby" type="checkbox">
              {{ hobby }}
            </label>
          </div>
          <p class="result">已选择: {{ form.selectedHobbies.join(', ') || '无' }}</p>
        </div>
      </div>

      <!-- 单选框 -->
      <div class="example-card">
        <h3>单选框</h3>
        <div class="form-group">
          <label>性别:</label>
          <div class="radio-group">
            <label>
              <input v-model="form.gender" value="male" type="radio">
              男
            </label>
            <label>
              <input v-model="form.gender" value="female" type="radio">
              女
            </label>
            <label>
              <input v-model="form.gender" value="other" type="radio">
              其他
            </label>
          </div>
          <p class="result">选择: {{ form.gender || '未选择' }}</p>
        </div>
      </div>

      <!-- 选择框 -->
      <div class="example-card">
        <h3>选择框</h3>
        <div class="form-group">
          <label>城市:</label>
          <select v-model="form.city">
            <option value="">请选择城市</option>
            <option v-for="city in cities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>
          <p class="result">选择的城市: {{ form.city || '未选择' }}</p>
        </div>

        <div class="form-group">
          <label>技能 (多选):</label>
          <select v-model="form.skills" multiple>
            <option v-for="skill in skillOptions" :key="skill" :value="skill">
              {{ skill }}
            </option>
          </select>
          <p class="result">选择的技能: {{ form.skills.join(', ') || '无' }}</p>
        </div>
      </div>

      <!-- 数字输入 -->
      <div class="example-card">
        <h3>数字输入</h3>
        <div class="form-group">
          <label>年龄:</label>
          <input v-model.number="form.age" type="number" min="0" max="120">
          <p class="result">年龄: {{ form.age }} (类型: {{ typeof form.age }})</p>
        </div>

        <div class="form-group">
          <label>滑块:</label>
          <input v-model="form.range" type="range" min="0" max="100">
          <p class="result">值: {{ form.range }}</p>
        </div>
      </div>

      <!-- 修饰符示例 -->
      <div class="example-card">
        <h3>修饰符示例</h3>
        <div class="form-group">
          <label>.lazy (失去焦点时更新):</label>
          <input v-model.lazy="form.lazyText" type="text" placeholder="失去焦点时更新">
          <p class="result">值: {{ form.lazyText }}</p>
        </div>

        <div class="form-group">
          <label>.trim (自动去除首尾空格):</label>
          <input v-model.trim="form.trimText" type="text" placeholder="自动去除空格">
          <p class="result">值: "{{ form.trimText }}"</p>
        </div>
      </div>

      <!-- 日期时间 -->
      <div class="example-card">
        <h3>日期时间</h3>
        <div class="form-group">
          <label>日期:</label>
          <input v-model="form.date" type="date">
          <p class="result">选择的日期: {{ form.date }}</p>
        </div>

        <div class="form-group">
          <label>时间:</label>
          <input v-model="form.time" type="time">
          <p class="result">选择的时间: {{ form.time }}</p>
        </div>

        <div class="form-group">
          <label>日期时间:</label>
          <input v-model="form.datetime" type="datetime-local">
          <p class="result">选择的日期时间: {{ form.datetime }}</p>
        </div>
      </div>
    </div>

    <!-- 表单数据预览 -->
    <div class="form-preview">
      <h3>表单数据预览</h3>
      <pre>{{ JSON.stringify(form, null, 2) }}</pre>
      
      <div class="actions">
        <button @click="resetForm" class="btn btn-secondary">重置表单</button>
        <button @click="submitForm" class="btn btn-primary">提交表单</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 响应式表单数据
const form = reactive({
  text: '',
  password: '',
  email: '',
  textarea: '',
  checkbox: false,
  selectedHobbies: [],
  gender: '',
  city: '',
  skills: [],
  age: 0,
  range: 50,
  lazyText: '',
  trimText: '',
  date: '',
  time: '',
  datetime: ''
})

// 选项数据
const hobbies = ['读书', '运动', '音乐', '旅行', '摄影', '编程']
const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都']
const skillOptions = ['JavaScript', 'Vue.js', 'React', 'Node.js', 'Python', 'Java']

// 重置表单
const resetForm = () => {
  Object.keys(form).forEach(key => {
    if (Array.isArray(form[key])) {
      form[key] = []
    } else if (typeof form[key] === 'boolean') {
      form[key] = false
    } else if (typeof form[key] === 'number') {
      form[key] = key === 'range' ? 50 : 0
    } else {
      form[key] = ''
    }
  })
}

// 提交表单
const submitForm = () => {
  console.log('提交的表单数据:', form)
  alert('表单已提交，请查看控制台输出')
}
</script>

<style scoped>
.form-binding-example {
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
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

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #42b883;
}

.checkbox-group,
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-group label,
.radio-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: normal;
  cursor: pointer;
}

.checkbox-group input,
.radio-group input {
  width: auto;
  margin: 0;
}

.result {
  margin-top: 8px;
  padding: 8px;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  border-left: 3px solid #42b883;
}

.form-preview {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-preview h3 {
  color: #42b883;
  margin-bottom: 15px;
}

.form-preview pre {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.4;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
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

@media (max-width: 768px) {
  .examples-grid {
    grid-template-columns: 1fr;
  }
  
  .actions {
    flex-direction: column;
  }
}
</style>
