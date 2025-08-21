import React, { useMemo, useState } from 'react'

export default function FormExample(){
  const [form,setForm] = useState({
    name:'', email:'', age:'', hobbies:[], gender:'male', agree:false
  })

  const isValid = useMemo(()=>{
    return form.name.trim() && /.+@.+\..+/.test(form.email) && Number(form.age) > 0 && form.agree
  },[form])

  const hobbies = ['编码','阅读','运动','音乐']

  const update = (patch)=> setForm(prev=> ({...prev, ...patch}))

  return (
    <section className="card">
      <h3>表单与受控组件</h3>
      <div className="row">
        <input className="input" placeholder="姓名" value={form.name} onChange={e=>update({name:e.target.value})} />
        <input className="input" placeholder="邮箱" value={form.email} onChange={e=>update({email:e.target.value})} />
        <input className="input" placeholder="年龄" type="number" value={form.age} onChange={e=>update({age:e.target.value})} />
      </div>

      <div className="row">
        <label>性别：</label>
        <label><input type="radio" checked={form.gender==='male'} onChange={()=>update({gender:'male'})}/> 男</label>
        <label><input type="radio" checked={form.gender==='female'} onChange={()=>update({gender:'female'})}/> 女</label>
      </div>

      <div className="row">
        <label>爱好：</label>
        {hobbies.map(h => (
          <label key={h}>
            <input type="checkbox" checked={form.hobbies.includes(h)} onChange={(e)=> {
              update({ hobbies: e.target.checked ? [...form.hobbies, h] : form.hobbies.filter(x=>x!==h) })
            }} /> {h}
          </label>
        ))}
      </div>

      <div className="row">
        <label>
          <input type="checkbox" checked={form.agree} onChange={e=>update({agree:e.target.checked})} />
          我已阅读并同意条款
        </label>
      </div>

      <button className="button" disabled={!isValid} onClick={()=> alert(JSON.stringify(form,null,2))}>提交</button>
    </section>
  )
}

