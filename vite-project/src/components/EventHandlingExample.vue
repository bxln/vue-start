<template>
  <div class="event-handling-example">
    <h2>事件处理示例</h2>
    <p class="description">演示Vue 3中各种事件处理方法和修饰符的使用</p>

    <div class="examples-grid">
      <!-- 基础事件处理 -->
      <div class="example-card">
        <h3>基础事件处理</h3>
        <div class="demo-area">
          <button @click="handleClick" class="btn btn-primary">
            点击我 ({{ clickCount }})
          </button>
          
          <button @click="handleClickWithParam('参数')" class="btn btn-secondary">
            带参数点击
          </button>
          
          <button @click="handleClickWithEvent($event)" class="btn btn-info">
            获取事件对象
          </button>
          
          <button @click="handleClickBoth($event, '混合参数')" class="btn btn-warning">
            事件对象 + 参数
          </button>
        </div>
        
        <div class="event-log">
          <h4>事件日志:</h4>
          <div class="log-container">
            <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
              {{ log }}
            </div>
          </div>
          <button @click="clearLogs" class="btn btn-secondary">清空日志</button>
        </div>
      </div>

      <!-- 键盘事件 -->
      <div class="example-card">
        <h3>键盘事件</h3>
        <div class="form-group">
          <label>普通键盘事件:</label>
          <input 
            v-model="keyboardInput"
            @keydown="handleKeydown"
            @keyup="handleKeyup"
            placeholder="输入内容观察键盘事件"
            class="input-field"
          >
        </div>

        <div class="form-group">
          <label>特殊按键:</label>
          <input 
            @keyup.enter="handleEnter"
            @keyup.esc="handleEscape"
            @keyup.space="handleSpace"
            @keyup.tab="handleTab"
            placeholder="尝试按 Enter、Esc、Space、Tab"
            class="input-field"
          >
        </div>

        <div class="form-group">
          <label>组合键:</label>
          <input 
            @keyup.ctrl.enter="handleCtrlEnter"
            @keyup.shift.delete="handleShiftDelete"
            @keyup.alt.s="handleAltS"
            placeholder="尝试 Ctrl+Enter、Shift+Delete、Alt+S"
            class="input-field"
          >
        </div>

        <div class="keyboard-info">
          <p><strong>最后按键:</strong> {{ lastKey }}</p>
          <p><strong>输入内容:</strong> {{ keyboardInput }}</p>
        </div>
      </div>

      <!-- 鼠标事件 -->
      <div class="example-card">
        <h3>鼠标事件</h3>
        <div 
          class="mouse-area"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          @mousemove="handleMouseMove"
          @click="handleMouseClick"
          @dblclick="handleDoubleClick"
          @contextmenu.prevent="handleRightClick"
        >
          <p>鼠标交互区域</p>
          <p>尝试移动、点击、双击、右键</p>
          <div class="mouse-info">
            <p>鼠标位置: ({{ mouseX }}, {{ mouseY }})</p>
            <p>鼠标状态: {{ mouseStatus }}</p>
            <p>点击次数: {{ mouseClickCount }}</p>
          </div>
        </div>
      </div>

      <!-- 表单事件 -->
      <div class="example-card">
        <h3>表单事件</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>用户名:</label>
            <input 
              v-model="formData.username"
              @focus="handleFocus"
              @blur="handleBlur"
              @input="handleInput"
              placeholder="用户名"
              class="input-field"
            >
          </div>

          <div class="form-group">
            <label>邮箱:</label>
            <input 
              v-model="formData.email"
              type="email"
              @change="handleChange"
              placeholder="邮箱"
              class="input-field"
            >
          </div>

          <div class="form-group">
            <label>选择城市:</label>
            <select v-model="formData.city" @change="handleSelectChange">
              <option value="">请选择</option>
              <option value="beijing">北京</option>
              <option value="shanghai">上海</option>
              <option value="guangzhou">广州</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary">提交表单</button>
          <button type="reset" @click="resetForm" class="btn btn-secondary">重置</button>
        </form>

        <div class="form-status">
          <p><strong>表单状态:</strong> {{ formStatus }}</p>
          <p><strong>当前焦点:</strong> {{ currentFocus }}</p>
        </div>
      </div>

      <!-- 事件修饰符 -->
      <div class="example-card">
        <h3>事件修饰符</h3>
        
        <div class="modifier-demo">
          <h4>.stop 修饰符 (阻止冒泡)</h4>
          <div class="outer-box" @click="handleOuterClick">
            外层容器 (会冒泡)
            <div class="inner-box" @click.stop="handleInnerClick">
              内层容器 (.stop)
            </div>
          </div>
        </div>

        <div class="modifier-demo">
          <h4>.prevent 修饰符 (阻止默认行为)</h4>
          <a href="https://vuejs.org" @click.prevent="handleLinkClick">
            点击链接 (阻止跳转)
          </a>
        </div>

        <div class="modifier-demo">
          <h4>.once 修饰符 (只触发一次)</h4>
          <button @click.once="handleOnceClick" class="btn btn-info">
            只能点击一次 ({{ onceClickCount }})
          </button>
        </div>

        <div class="modifier-demo">
          <h4>.self 修饰符 (只在自身触发)</h4>
          <div class="self-box" @click.self="handleSelfClick">
            只有点击这个区域才会触发
            <button class="btn btn-small">点击我不会触发父元素事件</button>
          </div>
        </div>
      </div>

      <!-- 自定义事件 -->
      <div class="example-card">
        <h3>自定义事件处理</h3>
        
        <div class="custom-events">
          <div class="drag-area" 
               @dragstart="handleDragStart"
               @dragend="handleDragEnd"
               @drop.prevent="handleDrop"
               @dragover.prevent="handleDragOver">
            <div 
              class="draggable-item"
              draggable="true"
              @dragstart="handleItemDragStart"
            >
              拖拽我
            </div>
            <div class="drop-zone">
              拖拽到这里
            </div>
          </div>
        </div>

        <div class="touch-area"
             @touchstart="handleTouchStart"
             @touchmove="handleTouchMove"
             @touchend="handleTouchEnd">
          <p>触摸事件区域 (移动端)</p>
          <p>触摸状态: {{ touchStatus }}</p>
        </div>
      </div>

      <!-- 动态事件绑定 -->
      <div class="example-card">
        <h3>动态事件绑定</h3>
        
        <div class="event-selector">
          <label>选择事件类型:</label>
          <select v-model="selectedEvent">
            <option value="click">点击事件</option>
            <option value="mouseenter">鼠标进入</option>
            <option value="mouseleave">鼠标离开</option>
            <option value="dblclick">双击事件</option>
          </select>
        </div>

        <div 
          class="dynamic-event-area"
          @[selectedEvent]="handleDynamicEvent"
        >
          当前绑定: {{ selectedEvent }} 事件
          <br>
          触发次数: {{ dynamicEventCount }}
        </div>

        <div class="event-list">
          <h4>事件处理器列表:</h4>
          <div v-for="(handler, event) in eventHandlers" :key="event" class="handler-item">
            <span>{{ event }}:</span>
            <button @click="handler" class="btn btn-small">触发 {{ event }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 基础事件处理
const clickCount = ref(0)
const eventLogs = ref([])

const handleClick = () => {
  clickCount.value++
  addLog('普通点击事件触发')
}

const handleClickWithParam = (param) => {
  addLog(`带参数点击: ${param}`)
}

const handleClickWithEvent = (event) => {
  addLog(`事件对象: ${event.type} at (${event.clientX}, ${event.clientY})`)
}

const handleClickBoth = (event, param) => {
  addLog(`混合参数: ${param}, 坐标: (${event.clientX}, ${event.clientY})`)
}

const addLog = (message) => {
  const timestamp = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${timestamp}] ${message}`)
  if (eventLogs.value.length > 10) {
    eventLogs.value.pop()
  }
}

const clearLogs = () => {
  eventLogs.value = []
}

// 键盘事件
const keyboardInput = ref('')
const lastKey = ref('')

const handleKeydown = (event) => {
  lastKey.value = `${event.key} (keydown)`
  addLog(`按下: ${event.key}`)
}

const handleKeyup = (event) => {
  lastKey.value = `${event.key} (keyup)`
  addLog(`释放: ${event.key}`)
}

const handleEnter = () => {
  addLog('按下了 Enter 键')
}

const handleEscape = () => {
  addLog('按下了 Escape 键')
}

const handleSpace = () => {
  addLog('按下了 Space 键')
}

const handleTab = () => {
  addLog('按下了 Tab 键')
}

const handleCtrlEnter = () => {
  addLog('按下了 Ctrl + Enter')
}

const handleShiftDelete = () => {
  addLog('按下了 Shift + Delete')
}

const handleAltS = () => {
  addLog('按下了 Alt + S')
}

// 鼠标事件
const mouseX = ref(0)
const mouseY = ref(0)
const mouseStatus = ref('未进入')
const mouseClickCount = ref(0)

const handleMouseEnter = () => {
  mouseStatus.value = '鼠标进入'
  addLog('鼠标进入区域')
}

const handleMouseLeave = () => {
  mouseStatus.value = '鼠标离开'
  addLog('鼠标离开区域')
}

const handleMouseMove = (event) => {
  mouseX.value = event.offsetX
  mouseY.value = event.offsetY
  mouseStatus.value = '鼠标移动'
}

const handleMouseClick = () => {
  mouseClickCount.value++
  addLog('鼠标左键点击')
}

const handleDoubleClick = () => {
  addLog('鼠标双击')
}

const handleRightClick = () => {
  addLog('鼠标右键点击')
}

// 表单事件
const formData = reactive({
  username: '',
  email: '',
  city: ''
})

const formStatus = ref('未提交')
const currentFocus = ref('无')

const handleFocus = (event) => {
  currentFocus.value = event.target.placeholder || '未知字段'
  addLog(`焦点进入: ${currentFocus.value}`)
}

const handleBlur = (event) => {
  currentFocus.value = '无'
  addLog(`焦点离开: ${event.target.placeholder || '未知字段'}`)
}

const handleInput = (event) => {
  addLog(`输入内容: ${event.target.value}`)
}

const handleChange = (event) => {
  addLog(`值改变: ${event.target.value}`)
}

const handleSelectChange = (event) => {
  addLog(`选择改变: ${event.target.value}`)
}

const handleSubmit = () => {
  formStatus.value = '已提交'
  addLog('表单提交')
  console.log('表单数据:', formData)
}

const resetForm = () => {
  Object.keys(formData).forEach(key => {
    formData[key] = ''
  })
  formStatus.value = '已重置'
  addLog('表单重置')
}

// 事件修饰符
const onceClickCount = ref(0)

const handleOuterClick = () => {
  addLog('外层容器点击 (冒泡)')
}

const handleInnerClick = () => {
  addLog('内层容器点击 (.stop 阻止冒泡)')
}

const handleLinkClick = () => {
  addLog('链接点击 (.prevent 阻止默认行为)')
}

const handleOnceClick = () => {
  onceClickCount.value++
  addLog('一次性点击事件 (.once)')
}

const handleSelfClick = () => {
  addLog('自身点击事件 (.self)')
}

// 自定义事件
const touchStatus = ref('未触摸')

const handleDragStart = () => {
  addLog('开始拖拽')
}

const handleDragEnd = () => {
  addLog('拖拽结束')
}

const handleDrop = () => {
  addLog('拖拽放置')
}

const handleDragOver = () => {
  // 静默处理，避免日志过多
}

const handleItemDragStart = (event) => {
  event.dataTransfer.setData('text/plain', '拖拽数据')
  addLog('拖拽项开始移动')
}

const handleTouchStart = () => {
  touchStatus.value = '触摸开始'
  addLog('触摸开始')
}

const handleTouchMove = () => {
  touchStatus.value = '触摸移动'
}

const handleTouchEnd = () => {
  touchStatus.value = '触摸结束'
  addLog('触摸结束')
}

// 动态事件绑定
const selectedEvent = ref('click')
const dynamicEventCount = ref(0)

const handleDynamicEvent = () => {
  dynamicEventCount.value++
  addLog(`动态事件触发: ${selectedEvent.value}`)
}

// 事件处理器映射
const eventHandlers = {
  click: () => addLog('程序化触发点击'),
  focus: () => addLog('程序化触发焦点'),
  submit: () => addLog('程序化触发提交'),
  reset: () => addLog('程序化触发重置')
}
</script>

<style scoped>
.event-handling-example {
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

.demo-area {
  margin-bottom: 20px;
}

.demo-area button {
  margin: 5px;
}

.event-log {
  margin-top: 20px;
}

.log-container {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 10px;
  background-color: #f8f9fa;
  margin-bottom: 10px;
}

.log-item {
  font-size: 12px;
  margin-bottom: 5px;
  font-family: monospace;
  color: #666;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.input-field {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.input-field:focus {
  outline: none;
  border-color: #42b883;
}

.keyboard-info,
.form-status {
  margin-top: 15px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.mouse-area {
  border: 2px dashed #42b883;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
  min-height: 150px;
}

.mouse-area:hover {
  background-color: #f0f8f0;
}

.mouse-info {
  margin-top: 15px;
  font-size: 14px;
  color: #666;
}

.modifier-demo {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.modifier-demo h4 {
  margin-bottom: 10px;
  color: #333;
}

.outer-box {
  background-color: #e8f5e8;
  padding: 20px;
  border-radius: 4px;
  cursor: pointer;
}

.inner-box {
  background-color: #42b883;
  color: white;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
}

.self-box {
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.drag-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
}

.draggable-item {
  background-color: #42b883;
  color: white;
  padding: 10px;
  border-radius: 4px;
  cursor: move;
  display: inline-block;
  margin-bottom: 10px;
}

.drop-zone {
  background-color: #f8f9fa;
  border: 2px dashed #ddd;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
}

.touch-area {
  background-color: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  touch-action: none;
}

.event-selector {
  margin-bottom: 15px;
}

.event-selector select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 10px;
}

.dynamic-event-area {
  background-color: #e8f5e8;
  border: 1px solid #42b883;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 15px;
}

.event-list {
  margin-top: 15px;
}

.handler-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.btn {
  padding: 8px 16px;
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

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
}

.btn-warning {
  background-color: #ffc107;
  color: #212529;
}

.btn-warning:hover {
  background-color: #e0a800;
}

.btn-small {
  padding: 4px 8px;
  font-size: 12px;
}

@media (max-width: 768px) {
  .examples-grid {
    grid-template-columns: 1fr;
  }
  
  .demo-area {
    text-align: center;
  }
  
  .demo-area button {
    display: block;
    width: 100%;
    margin: 5px 0;
  }
  
  .handler-item {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
