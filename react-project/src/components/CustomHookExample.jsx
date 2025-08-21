import React from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export default function CustomHookExample(){
  const [value,setValue] = useLocalStorage('my-text','Hello React')
  return (
    <section className="card">
      <h3>自定义 Hook - useLocalStorage</h3>
      <input className="input" value={value} onChange={e=>setValue(e.target.value)} />
      <p style={{marginTop:8}}>刷新页面仍能保持：<strong>{String(value)}</strong></p>
    </section>
  )
}

