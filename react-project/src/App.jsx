import React, { useState } from 'react'
import StateExample from './components/StateExample.jsx'
import PropsExample from './components/PropsExample.jsx'
import EffectExample from './components/EffectExample.jsx'
import FormExample from './components/FormExample.jsx'
import ListConditionalExample from './components/ListConditionalExample.jsx'
import ContextExample from './components/ContextExample.jsx'
import CustomHookExample from './components/CustomHookExample.jsx'
import PerformanceExample from './components/PerformanceExample.jsx'

const tabs = [
  { id: 'state', name: '状态 (useState)', component: StateExample },
  { id: 'props', name: '属性 (Props)', component: PropsExample },
  { id: 'effect', name: '副作用 (useEffect)', component: EffectExample },
  { id: 'form', name: '表单', component: FormExample },
  { id: 'list', name: '列表与条件', component: ListConditionalExample },
  { id: 'context', name: '上下文 (Context)', component: ContextExample },
  { id: 'hook', name: '自定义 Hook', component: CustomHookExample },
  { id: 'perf', name: '性能优化', component: PerformanceExample },
]

export default function App() {
  const [active, setActive] = useState('state')
  const ActiveComponent = tabs.find(t => t.id === active)?.component || (() => null)

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>React 学习示例</h1>
          <p className="subtitle">React 18 + Vite · 常用 API 与最佳实践</p>
        </div>
      </header>

      <nav className="tabs">
        <div className="tab-container">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={"tab" + (active === tab.id ? ' active' : '')}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </nav>

      <main className="main">
        <div className="content">
          <ActiveComponent />
        </div>
      </main>

      <footer className="footer">© 2025 React 示例项目</footer>
    </div>
  )
}

