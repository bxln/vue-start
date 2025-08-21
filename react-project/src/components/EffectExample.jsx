import React, { useEffect, useState } from 'react'

export default function EffectExample(){
  const [tick,setTick] = useState(0)
  const [width,setWidth] = useState(window.innerWidth)

  // 计时器示例
  useEffect(()=>{
    const id = setInterval(()=> setTick(t=>t+1), 1000)
    return ()=> clearInterval(id)
  },[])

  // 事件监听与清理
  useEffect(()=>{
    const onResize = ()=> setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return ()=> window.removeEventListener('resize', onResize)
  },[])

  return (
    <section className="card">
      <h3>useEffect - 副作用与清理</h3>
      <p>计时：{tick}s</p>
      <p>窗口宽度：{width}px（试试调整窗口）</p>
    </section>
  )
}

