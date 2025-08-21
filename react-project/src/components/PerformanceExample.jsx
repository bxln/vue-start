import React, { memo, useMemo, useState, useTransition } from 'react'

const ExpensiveList = memo(function ExpensiveList({ size, filter }){
  // 模拟昂贵计算
  const items = useMemo(()=>{
    const arr = Array.from({length:size}, (_,i)=> ({ id:i, text:`项目 ${i+1}` }))
    // 额外计算
    for(let i=0;i<40000;i++){}
    return filter ? arr.filter(x=> x.text.includes(filter)) : arr
  },[size, filter])

  return (
    <ul style={{maxHeight:240,overflow:'auto',border:'1px solid #e5e7eb',borderRadius:8,padding:8}}>
      {items.map(i=> <li key={i.id}>{i.text}</li>)}
    </ul>
  )
})

export default function PerformanceExample(){
  const [size,setSize] = useState(1000)
  const [filter,setFilter] = useState('')
  const [isPending, startTransition] = useTransition()

  const onFilter = (v)=>{
    // 将高开销的筛选更新放入并发过渡
    startTransition(()=> setFilter(v))
  }

  return (
    <section className="card">
      <h3>性能优化 - memo/useMemo/useTransition</h3>
      <div className="row">
        <label>大小：</label>
        <input className="input" type="number" value={size} onChange={e=>setSize(Number(e.target.value)||0)} />
        <input className="input" placeholder="筛选" onChange={e=> onFilter(e.target.value)} />
        {isPending && <span>渲染中…</span>}
      </div>
      <ExpensiveList size={size} filter={filter} />
    </section>
  )
}

