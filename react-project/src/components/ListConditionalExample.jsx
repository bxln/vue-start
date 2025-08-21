import React, { useMemo, useState } from 'react'

const initial = [
  { id:1, name:'iPhone', price:5999, stock:3 },
  { id:2, name:'iPad', price:3999, stock:0 },
  { id:3, name:'MacBook', price:9999, stock:5 },
]

export default function ListConditionalExample(){
  const [products,setProducts] = useState(initial)
  const [q,setQ] = useState('')
  const filtered = useMemo(()=> products.filter(p=> p.name.toLowerCase().includes(q.toLowerCase())), [products,q])

  const add = ()=> setProducts(ps=> [...ps, { id: Date.now(), name:'新品', price:1999, stock:1 }])
  const toggle = (id)=> setProducts(ps=> ps.map(p=> p.id===id? {...p, stock: p.stock?0:1}:p))
  const remove = (id)=> setProducts(ps=> ps.filter(p=> p.id!==id))

  return (
    <section className="card">
      <h3>列表与条件渲染</h3>
      <div className="row">
        <input className="input" placeholder="搜索产品" value={q} onChange={e=>setQ(e.target.value)} />
        <button className="button" onClick={add}>添加</button>
      </div>

      {filtered.length === 0 ? (
        <p>没有匹配的产品</p>
      ) : (
        <ul style={{marginTop:10}}>
          {filtered.map(p => (
            <li key={p.id} style={{display:'flex',gap:8,alignItems:'center',marginBottom:6}}>
              <strong>{p.name}</strong>
              <span>¥{p.price}</span>
              {p.stock > 0 ? <span style={{color:'#16a34a'}}>有货({p.stock})</span> : <span style={{color:'#ef4444'}}>缺货</span>}
              <button className="button" onClick={()=>toggle(p.id)}>切换库存</button>
              <button className="button" onClick={()=>remove(p.id)}>删除</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

