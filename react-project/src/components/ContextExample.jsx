import React, { createContext, useContext, useMemo, useState } from 'react'

const ThemeContext = createContext('light')

function ThemeSwitcher(){
  const { theme, toggle } = useContext(ThemeContext)
  return (
    <div className="row">
      <span>当前主题：{theme}</span>
      <button className="button" onClick={toggle}>切换主题</button>
    </div>
  )
}

function ThemedCard(){
  const { theme } = useContext(ThemeContext)
  const style = useMemo(()=> ({
    background: theme==='dark'? '#0f172a':'#fff',
    color: theme==='dark'? '#e5e7eb':'#111',
    border:'1px solid #e5e7eb', borderRadius:10, padding:12,
  }),[theme])
  return <div style={style}>这是一个跟随主题变化的卡片</div>
}

export default function ContextExample(){
  const [theme,setTheme] = useState('light')
  const value = useMemo(()=> ({ theme, toggle: ()=> setTheme(t=> t==='light'?'dark':'light') }), [theme])

  return (
    <section className="card">
      <h3>Context - 上下文</h3>
      <ThemeContext.Provider value={value}>
        <ThemeSwitcher />
        <ThemedCard />
      </ThemeContext.Provider>
    </section>
  )
}

