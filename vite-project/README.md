# Vue 3 常用示例项目

这是一个全面的 Vue 3 学习示例项目，展示了 Vue 3 Composition API 和各种常用功能的实际应用。通过这个项目，您可以学习到 Vue 3 的核心概念和最佳实践。

## 🚀 项目概述

本项目包含了 Vue 3 开发中最常用的功能示例，采用 Composition API 编写，涵盖了从基础到高级的各种用法：

- **表单绑定** - 各种表单元素的双向数据绑定
- **计算属性和监听器** - computed 和 watch 的实际应用
- **条件渲染和列表渲染** - v-if、v-show、v-for 的使用
- **事件处理** - 各种事件处理方法和修饰符
- **组件通信** - 父子组件、兄弟组件通信方式
- **生命周期** - 组件生命周期钩子的使用
- **响应式数据** - ref、reactive 等响应式 API
- **插槽** - 默认插槽、具名插槽、作用域插槽

## 🛠️ 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Composition API** - Vue 3 的组合式 API
- **JavaScript ES6+** - 现代 JavaScript 语法

## 📦 安装和运行

### 环境要求

- Node.js 16.0 或更高版本
- npm 或 yarn 包管理器

```bash
PS D:\ide\codeing\js\vue-start> npm create vite
```

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📁 项目结构

```
vite-project/
├── public/                    # 静态资源
├── src/
│   ├── assets/               # 资源文件
│   ├── components/           # 组件目录
│   │   ├── communication/    # 组件通信示例
│   │   ├── lifecycle/        # 生命周期示例
│   │   └── slots/           # 插槽示例
│   ├── utils/               # 工具函数
│   │   └── shared.js        # 共享工具和状态
│   ├── App.vue              # 根组件
│   ├── main.js              # 应用入口
│   └── style.css            # 全局样式
├── index.html               # HTML 模板
├── package.json             # 项目配置
├── vite.config.js           # Vite 配置
└── README.md                # 项目说明
```

## 📚 示例详解

### 1. 表单绑定示例 (FormBindingExample.vue)

**位置**: `src/components/FormBindingExample.vue`
**功能**: 演示 Vue 3 中各种表单元素的双向数据绑定

#### 主要特性

- **文本输入**: 普通文本、密码、邮箱输入框
- **文本域**: 多行文本输入
- **复选框**: 单个复选框和复选框组
- **单选框**: 单选按钮组
- **选择框**: 单选和多选下拉框
- **数字输入**: 数字输入框和滑块
- **日期时间**: 日期、时间、日期时间选择器
- **修饰符**: `.lazy`、`.trim`、`.number` 修饰符

#### 核心代码示例

```vue
<template>
  <!-- 基础双向绑定 -->
  <input v-model="text" type="text" placeholder="请输入文本">

  <!-- 复选框组 -->
  <input v-model="selectedHobbies" :value="hobby" type="checkbox">

  <!-- 修饰符使用 -->
  <input v-model.number="age" type="number">
  <input v-model.trim="trimText" type="text">
</template>

<script setup>
import { ref, reactive } from 'vue'

const text = ref('')
const selectedHobbies = ref([])
const age = ref(0)
const trimText = ref('')
</script>
```

#### 学习要点

1. **v-model 原理**: 理解双向数据绑定的实现机制
2. **表单验证**: 结合计算属性进行表单验证
3. **修饰符应用**: 掌握各种修饰符的使用场景
4. **数据类型**: 了解不同表单元素的数据类型处理

### 2. 计算属性和监听器示例 (ComputedWatchExample.vue)

**位置**: `src/components/ComputedWatchExample.vue`
**功能**: 演示 computed 计算属性和 watch 监听器的使用

#### 主要特性

- **基础计算属性**: 姓名拼接、字符串处理
- **复杂计算**: 购物车总价、平均价格计算
- **搜索过滤**: 列表搜索和排序
- **watch 监听**: 简单值监听、深度监听、多值监听
- **异步处理**: 异步数据获取和处理
- **表单验证**: 实时表单验证

#### 核心代码示例

```vue
<script setup>
import { ref, reactive, computed, watch } from 'vue'

// 计算属性
const firstName = ref('张')
const lastName = ref('三')
const fullName = computed(() => `${lastName.value}${firstName.value}`)

// 购物车计算
const cartItems = reactive([
  { name: 'iPhone', price: 5999, quantity: 1 }
])

const totalPrice = computed(() => {
  return cartItems.reduce((total, item) =>
    total + (item.price * item.quantity), 0
  )
})

// 监听器
const watchedValue = ref('')
watch(watchedValue, (newVal, oldVal) => {
  console.log(`值变化: ${oldVal} → ${newVal}`)
})

// 深度监听
const deepObj = reactive({ user: { name: '' } })
watch(deepObj, (newVal) => {
  console.log('对象变化:', newVal)
}, { deep: true })
</script>
```

#### 学习要点

1. **计算属性缓存**: 理解计算属性的缓存机制
2. **监听器类型**: 掌握不同类型监听器的使用
3. **性能优化**: 合理使用计算属性和监听器
4. **异步处理**: 在监听器中处理异步操作

### 3. 条件渲染和列表渲染示例 (ConditionalListExample.vue)

**位置**: `src/components/ConditionalListExample.vue`
**功能**: 演示 v-if、v-show、v-for 等指令的使用

#### 主要特性

- **条件渲染**: v-if vs v-show 的区别和使用场景
- **多条件渲染**: v-if、v-else-if、v-else 链式条件
- **列表渲染**: 数组和对象的遍历
- **嵌套循环**: 多层数据结构的渲染
- **条件列表**: 结合条件和循环的复杂渲染
- **动态列表**: 列表的增删改操作
- **key 的使用**: 理解 key 在列表渲染中的重要性

#### 核心代码示例

```vue
<template>
  <!-- 条件渲染 -->
  <div v-if="showContent" class="content">v-if 内容</div>
  <div v-show="showContent" class="content">v-show 内容</div>

  <!-- 多条件渲染 -->
  <div v-if="userStatus === 'admin'">管理员界面</div>
  <div v-else-if="userStatus === 'user'">用户界面</div>
  <div v-else>游客界面</div>

  <!-- 列表渲染 -->
  <div v-for="(item, index) in items" :key="item.id">
    {{ index + 1 }}. {{ item.name }}
  </div>

  <!-- 对象遍历 -->
  <div v-for="(value, key, index) in userInfo" :key="key">
    {{ index }}. {{ key }}: {{ value }}
  </div>

  <!-- 条件列表 -->
  <template v-for="product in products" :key="product.id">
    <div v-if="product.stock > 0" class="product">
      {{ product.name }} - 库存: {{ product.stock }}
    </div>
  </template>
</template>

<script setup>
import { ref, reactive } from 'vue'

const showContent = ref(true)
const userStatus = ref('user')
const items = reactive([
  { id: 1, name: '项目1' },
  { id: 2, name: '项目2' }
])
</script>
```

#### 学习要点

1. **v-if vs v-show**: 理解两者的性能差异和使用场景
2. **列表 key**: 掌握 key 的作用和最佳实践
3. **性能优化**: 避免不必要的重新渲染
4. **复杂条件**: 处理复杂的条件渲染逻辑

### 4. 事件处理示例 (EventHandlingExample.vue)

**位置**: `src/components/EventHandlingExample.vue`
**功能**: 演示各种事件处理方法和修饰符的使用

#### 主要特性

- **基础事件**: 点击、键盘、鼠标事件
- **事件修饰符**: .stop、.prevent、.once、.self 等
- **键盘修饰符**: .enter、.esc、.ctrl、.shift 等
- **鼠标事件**: 移动、进入、离开、右键等
- **表单事件**: focus、blur、input、change、submit
- **自定义事件**: 拖拽、触摸等自定义事件处理
- **动态事件**: 动态绑定事件类型

#### 核心代码示例

```vue
<template>
  <!-- 基础事件处理 -->
  <button @click="handleClick">点击事件</button>
  <button @click="handleClickWithParam('参数')">带参数事件</button>
  <button @click="handleClickBoth($event, '参数')">事件对象+参数</button>

  <!-- 键盘事件 -->
  <input @keyup.enter="handleEnter" placeholder="按Enter">
  <input @keyup.ctrl.enter="handleCtrlEnter" placeholder="Ctrl+Enter">

  <!-- 事件修饰符 -->
  <div @click="handleOuter">
    外层
    <div @click.stop="handleInner">内层(.stop阻止冒泡)</div>
  </div>

  <a href="#" @click.prevent="handleLink">阻止默认行为</a>
  <button @click.once="handleOnce">只触发一次</button>

  <!-- 动态事件 -->
  <div @[eventType]="handleDynamic">动态事件</div>
</template>

<script setup>
import { ref } from 'vue'

const eventType = ref('click')

const handleClick = () => {
  console.log('点击事件')
}

const handleClickWithParam = (param) => {
  console.log('参数:', param)
}

const handleClickBoth = (event, param) => {
  console.log('事件:', event, '参数:', param)
}
</script>
```

#### 学习要点

1. **事件对象**: 理解事件对象的属性和方法
2. **事件修饰符**: 掌握各种修饰符的作用
3. **键盘事件**: 处理复杂的键盘交互
4. **事件委托**: 理解事件冒泡和委托机制

### 5. 组件通信示例 (ComponentCommunication.vue)

**位置**: `src/components/ComponentCommunication.vue`
**功能**: 演示各种组件间通信方式

#### 主要特性

- **Props & Emits**: 父子组件通信的标准方式
- **v-model**: 双向绑定组件
- **Provide/Inject**: 跨层级组件通信
- **事件总线**: 兄弟组件通信
- **Ref 引用**: 直接访问子组件实例
- **全局状态**: 简单的状态管理

#### 核心代码示例

```vue
<!-- 父组件 -->
<template>
  <!-- Props & Emits -->
  <ChildComponent
    :message="parentMessage"
    @update-message="handleChildMessage"
  />

  <!-- v-model 双向绑定 -->
  <CustomInput v-model="inputValue" />

  <!-- Ref 引用 -->
  <RefChild ref="childRef" />
  <button @click="callChildMethod">调用子组件方法</button>
</template>

<script setup>
import { ref, provide } from 'vue'

// Props & Emits
const parentMessage = ref('来自父组件')
const handleChildMessage = (msg) => {
  console.log('子组件消息:', msg)
}

// Provide/Inject
const sharedData = ref('共享数据')
provide('sharedData', sharedData)

// Ref 引用
const childRef = ref(null)
const callChildMethod = () => {
  childRef.value.childMethod()
}
</script>
```

```vue
<!-- 子组件 -->
<script setup>
import { inject } from 'vue'

// Props & Emits
const props = defineProps({
  message: String
})

const emit = defineEmits(['update-message'])

// Provide/Inject
const sharedData = inject('sharedData')

// 暴露方法给父组件
const childMethod = () => {
  console.log('子组件方法被调用')
}

defineExpose({
  childMethod
})
</script>
```

#### 学习要点

1. **通信方式选择**: 根据场景选择合适的通信方式
2. **数据流向**: 理解单向数据流的重要性
3. **解耦设计**: 保持组件间的松耦合
4. **状态管理**: 何时需要引入状态管理库

### 6. 生命周期示例 (LifecycleExample.vue)

**位置**: `src/components/LifecycleExample.vue`
**功能**: 演示 Vue 3 Composition API 中的生命周期钩子

#### 主要特性

- **基础生命周期**: onMounted、onUpdated、onUnmounted 等
- **数据获取**: 在生命周期中获取数据
- **资源管理**: 定时器、事件监听器的清理
- **异步组件**: 异步组件的加载和生命周期
- **错误处理**: onErrorCaptured 错误边界

#### 核心代码示例

```vue
<script setup>
import {
  ref,
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount
} from 'vue'

const data = ref(null)
const timer = ref(null)

// 组件挂载前
onBeforeMount(() => {
  console.log('组件挂载前')
})

// 组件挂载后
onMounted(async () => {
  console.log('组件已挂载')

  // 获取数据
  data.value = await fetchData()

  // 启动定时器
  timer.value = setInterval(() => {
    console.log('定时器执行')
  }, 1000)

  // 添加事件监听
  window.addEventListener('resize', handleResize)
})

// 组件更新后
onUpdated(() => {
  console.log('组件已更新')
})

// 组件卸载前
onBeforeUnmount(() => {
  console.log('组件卸载前')

  // 清理定时器
  if (timer.value) {
    clearInterval(timer.value)
  }

  // 移除事件监听
  window.removeEventListener('resize', handleResize)
})

// 组件卸载后
onUnmounted(() => {
  console.log('组件已卸载')
})

const fetchData = async () => {
  // 模拟API调用
  return new Promise(resolve => {
    setTimeout(() => resolve('数据'), 1000)
  })
}

const handleResize = () => {
  console.log('窗口大小改变')
}
</script>
```

#### 学习要点

1. **生命周期时机**: 理解各个生命周期的执行时机
2. **资源清理**: 避免内存泄漏的最佳实践
3. **异步处理**: 在生命周期中处理异步操作
4. **错误处理**: 使用错误边界处理组件错误

### 7. 响应式数据示例 (ReactivityExample.vue)

**位置**: `src/components/ReactivityExample.vue`
**功能**: 演示 Vue 3 响应式系统的各种 API

#### 主要特性

- **ref**: 基本类型的响应式引用
- **reactive**: 对象的响应式代理
- **computed**: 计算属性的高级用法
- **watch**: 监听器的各种形式
- **toRefs/toRef**: 响应式对象的解构
- **响应式工具**: isRef、isReactive、toRaw 等工具函数

#### 核心代码示例

```vue
<script setup>
import {
  ref,
  reactive,
  computed,
  watch,
  toRefs,
  toRef,
  isRef,
  isReactive,
  toRaw,
  readonly
} from 'vue'

// ref 示例
const count = ref(0)
const message = ref('Hello')
const items = ref(['a', 'b', 'c'])

// reactive 示例
const user = reactive({
  name: '张三',
  age: 25,
  address: {
    city: '北京',
    street: '朝阳区'
  },
  hobbies: ['编程', '阅读']
})

// computed 示例
const userInfo = computed(() => {
  return `${user.name} (${user.age}岁) - ${user.address.city}`
})

const expensiveValue = computed(() => {
  // 复杂计算，会被缓存
  console.log('计算执行')
  return items.value.map(item => item.toUpperCase()).join(', ')
})

// watch 示例
watch(count, (newVal, oldVal) => {
  console.log(`count: ${oldVal} → ${newVal}`)
})

// 深度监听
watch(user, (newVal) => {
  console.log('user changed:', newVal)
}, { deep: true })

// 监听多个值
watch([count, message], ([newCount, newMessage], [oldCount, oldMessage]) => {
  console.log('多个值变化')
})

// toRefs 解构
const { name, age } = toRefs(user)
const city = toRef(user.address, 'city')

// 响应式工具
console.log('isRef(count):', isRef(count))
console.log('isReactive(user):', isReactive(user))
console.log('toRaw(user):', toRaw(user))

// 只读对象
const readonlyUser = readonly(user)
</script>
```

#### 学习要点

1. **响应式原理**: 理解 Vue 3 响应式系统的实现
2. **性能优化**: 合理使用 ref 和 reactive
3. **解构赋值**: 保持响应式的解构方法
4. **工具函数**: 掌握各种响应式工具函数的用法

### 8. 插槽示例 (SlotExample.vue)

**位置**: `src/components/SlotExample.vue`
**功能**: 演示各种插槽的使用方法

#### 主要特性

- **默认插槽**: 基础插槽使用
- **具名插槽**: 多个插槽的命名和使用
- **作用域插槽**: 子组件向插槽传递数据
- **动态插槽**: 动态插槽名称
- **条件插槽**: 条件性显示插槽
- **插槽传递**: 插槽在组件间的传递

#### 核心代码示例

```vue
<!-- 使用插槽的组件 -->
<template>
  <!-- 默认插槽 -->
  <BasicCard>
    <h4>插槽内容</h4>
    <p>这些内容会被插入到组件中</p>
  </BasicCard>

  <!-- 具名插槽 -->
  <NamedSlotCard>
    <template #header>
      <h4>标题内容</h4>
    </template>

    <template #default>
      <p>主要内容</p>
    </template>

    <template #footer>
      <button>确定</button>
    </template>
  </NamedSlotCard>

  <!-- 作用域插槽 -->
  <UserList>
    <template #user="{ user, index }">
      <div class="user-card">
        <h5>{{ user.name }}</h5>
        <p>{{ user.email }}</p>
        <span>用户 #{{ index + 1 }}</span>
      </div>
    </template>
  </UserList>

  <!-- 动态插槽 -->
  <DynamicCard>
    <template #[slotName]>
      <div>动态插槽内容</div>
    </template>
  </DynamicCard>
</template>

<script setup>
import { ref } from 'vue'

const slotName = ref('header')
</script>
```

```vue
<!-- 定义插槽的组件 -->
<template>
  <div class="card">
    <!-- 默认插槽 -->
    <slot>
      <div>默认内容</div>
    </slot>

    <!-- 具名插槽 -->
    <header v-if="$slots.header">
      <slot name="header"></slot>
    </header>

    <main>
      <slot name="default"></slot>
    </main>

    <footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>

    <!-- 作用域插槽 -->
    <div v-for="(user, index) in users" :key="user.id">
      <slot name="user" :user="user" :index="index">
        <!-- 默认用户显示 -->
        <div>{{ user.name }}</div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const users = reactive([
  { id: 1, name: '张三', email: 'zhang@example.com' },
  { id: 2, name: '李四', email: 'li@example.com' }
])
</script>
```

#### 学习要点

1. **插槽类型**: 理解不同类型插槽的使用场景
2. **数据传递**: 掌握作用域插槽的数据传递机制
3. **组件设计**: 使用插槽设计灵活的组件
4. **插槽检测**: 使用 $slots 检测插槽是否存在

## 🔧 工具文件说明

### shared.js - 共享工具和状态

**位置**: `src/utils/shared.js`
**功能**: 提供全局共享的工具函数和状态管理

#### 主要内容

1. **事件总线 (EventBus)**
   ```javascript
   // 简单的事件总线实现
   class EventBus {
     on(event, callback) { /* 监听事件 */ }
     off(event, callback) { /* 移除监听 */ }
     emit(event, data) { /* 触发事件 */ }
   }

   export const eventBus = new EventBus()
   ```

2. **全局状态管理**
   ```javascript
   // 简单的全局状态
   export const globalState = reactive({
     user: { name: '张三', role: 'user' },
     count: 0,
     theme: 'light'
   })
   ```

3. **工具函数**
   ```javascript
   export const utils = {
     formatTime(timestamp) { /* 时间格式化 */ },
     generateId() { /* 生成随机ID */ },
     debounce(func, wait) { /* 防抖函数 */ },
     throttle(func, limit) { /* 节流函数 */ }
   }
   ```

## 🎯 学习路径建议

### 初学者路径

1. **表单绑定** → 理解 Vue 的数据绑定机制
2. **条件渲染和列表渲染** → 掌握基础的模板语法
3. **事件处理** → 学习用户交互处理
4. **计算属性和监听器** → 理解响应式数据处理

### 进阶路径

5. **响应式数据** → 深入理解 Vue 3 响应式系统
6. **组件通信** → 掌握组件间数据传递
7. **生命周期** → 理解组件的生命周期管理
8. **插槽** → 学习组件的高级组合模式

## 🌟 最佳实践

### 1. 代码组织

- **单一职责**: 每个组件只负责一个功能
- **组合式API**: 优先使用 Composition API
- **逻辑复用**: 使用 composables 抽取可复用逻辑

### 2. 性能优化

- **合理使用 ref 和 reactive**: 基本类型用 ref，对象用 reactive
- **避免不必要的响应式**: 使用 markRaw 或 shallowRef
- **计算属性缓存**: 利用计算属性的缓存特性
- **事件处理优化**: 使用事件修饰符避免不必要的处理

### 3. 组件设计

- **Props 验证**: 定义清晰的 props 类型和默认值
- **事件命名**: 使用 kebab-case 命名自定义事件
- **插槽设计**: 提供合理的默认内容和作用域数据
- **组件文档**: 为组件编写清晰的使用文档

### 4. 状态管理

- **本地状态**: 优先使用组件本地状态
- **状态提升**: 需要共享时才提升到父组件
- **全局状态**: 复杂应用考虑使用 Pinia 或 Vuex

## 📖 扩展学习

### 推荐资源

- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Vue 3 Composition API RFC](https://composition-api.vuejs.org/)
- [Vue 3 迁移指南](https://v3-migration.vuejs.org/)
- [Vite 官方文档](https://cn.vitejs.dev/)

### 相关生态

- **状态管理**: Pinia, Vuex
- **路由**: Vue Router
- **UI 框架**: Element Plus, Ant Design Vue, Vuetify
- **工具库**: VueUse, Vue Demi
- **测试**: Vue Test Utils, Vitest

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个示例项目！

### 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT License

---

**Happy Coding! 🚀**

通过这个项目，您将全面掌握 Vue 3 的核心概念和实际应用。每个示例都经过精心设计，既展示了功能特性，又体现了最佳实践。建议您按照学习路径逐步学习，并尝试修改和扩展示例代码，以加深理解。
