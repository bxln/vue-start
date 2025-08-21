import React from 'react'

function Badge({ color = '#0ea5e9', children }){
  return <span style={{background:color,color:'#fff',padding:'4px 8px',borderRadius:6}}>{children}</span>
}

function UserCard({ user, onPromote }){
  return (
    <div className="card">
      <h4>{user.name} <Badge color={user.vip? '#f59e0b':'#9ca3af'}>{user.vip? 'VIP':'普通'}</Badge></h4>
      <p>邮箱：{user.email}</p>
      <button className="button" onClick={()=>onPromote?.(user)}>升级为 VIP</button>
    </div>
  )
}

export default function PropsExample(){
  const user = { name:'张三', email:'zhang@example.com', vip:false }
  const handlePromote = (u)=>{
    alert(`${u.name} 已升级！`)
  }
  return (
    <section>
      <h3 className="card">Props - 属性传递与组合</h3>
      <UserCard user={user} onPromote={handlePromote} />
    </section>
  )
}

