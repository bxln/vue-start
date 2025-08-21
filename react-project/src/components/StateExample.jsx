import React, { useState } from 'react'

export default function StateExample(){
  const [count,setCount] = useState(0)
  const [text,setText] = useState('')

  return (
    <section className="card">
      <h3>useState - 状态管理</h3>
      <div className="row">
        <button className="button" onClick={()=>setCount(c=>c+1)}>+1</button>
        <button className="button" onClick={()=>setCount(0)}>重置</button>
        <span>计数：{count}</span>
      </div>

      <div className="row">
        <input className="input" value={text} onChange={e=>setText(e.target.value)} placeholder="输入一些文字" />
        <span>你输入了：{text || '（空）'}</span>
      </div>
    </section>
  )
}

