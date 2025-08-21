# React 学习示例项目

这是一个从 0 学习 React 的示例项目，使用 Vite + React 18 构建，涵盖常用 API 与模式：
- useState（状态）
- Props（属性）
- useEffect（副作用）
- 表单与受控组件
- 列表与条件渲染
- Context（上下文）
- 自定义 Hook（useLocalStorage）
- 性能优化（memo/useMemo/useTransition）

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```
默认端口：http://localhost:5173

### 3. 构建与预览
```bash
npm run build
npm run preview
```

## 目录结构
```
react-project/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── components/
    │   ├── StateExample.jsx
    │   ├── PropsExample.jsx
    │   ├── EffectExample.jsx
    │   ├── FormExample.jsx
    │   ├── ListConditionalExample.jsx
    │   ├── ContextExample.jsx
    │   ├── CustomHookExample.jsx
    │   └── PerformanceExample.jsx
    └── hooks/
        └── useLocalStorage.js
```

## 学习建议
- 从 useState 和 Props 开始，理解数据自顶向下流动
- 练习 useEffect 的依赖管理与清理函数
- 用受控组件实现表单校验与提交
- 掌握列表 key 的意义与条件渲染
- 使用 Context 管理跨层数据，自定义 Hook 抽离通用逻辑
- 在大列表场景应用 memo/useMemo/useTransition 做性能优化

祝学习顺利！

