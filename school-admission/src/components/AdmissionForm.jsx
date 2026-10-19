import { useState } from 'react'

const GRADES = ['Nursery', 'KG', ...Array.from({ length: 12 }, (_, i) => String(i + 1))]
const TIMES = ['09:00', '10:00', '11:00', '14:00', '15:00']
const empty = { studentName: '', parentName: '', email: '', phone: '', grade: '', dob: '', date: '', time: '' }

export default function AdmissionForm({ onSubmit, applications }) {
  const [f, setF] = useState(empty)
  const [errors, setErrors] = useState({})
  const today = new Date().toISOString().slice(0, 10)

  const set = (e) => setF({ ...f, [e.target.name]: e.target.value })
  const slot = f.date && f.time ? `${f.date} ${f.time}` : ''
  const taken = (t) => applications.filter((a) => a.slot === `${f.date} ${t}`).length >= 2

  const validate = () => {
    const e = {}
    if (!f.studentName.trim()) e.studentName = 'Student name is required'
    if (!f.parentName.trim()) e.parentName = 'Parent name is required'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Valid email required'
    if (!/^\+?[0-9 -]{7,15}$/.test(f.phone)) e.phone = 'Valid phone required'
    if (!f.grade) e.grade = 'Select a grade'
    if (!f.dob || f.dob >= today) e.dob = 'Valid date of birth required'
    if (!f.date || f.date < today) e.date = 'Choose a future date'
    if (!f.time) e.time = 'Choose a time slot'
    else if (taken(f.time)) e.time = 'That slot is full'
    return e
  }

  const submit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    const { date, time, ...rest } = f
    onSubmit({ ...rest, studentName: f.studentName.trim(), parentName: f.parentName.trim(), slot })
    setF(empty)
  }

  const field = (name, label, type = 'text') => (
    <label>
      {label}
      <input name={name} type={type} value={f[name]} onChange={set} aria-invalid={!!errors[name]}
        {...(name === 'dob' ? { max: today } : {})} {...(name === 'date' ? { min: today } : {})} />
      {errors[name] && <span className="err" role="alert">{errors[name]}</span>}
    </label>
  )

  return (
    <form className="card" onSubmit={submit} noValidate>
      <h2>Book an admission visit</h2>
      <div className="grid">
        {field('studentName', 'Student name')}
        {field('parentName', 'Parent / guardian name')}
        {field('email', 'Email', 'email')}
        {field('phone', 'Phone', 'tel')}
        <label>
          Grade applying for
          <select name="grade" value={f.grade} onChange={set}>
            <option value="">Select…</option>
            {GRADES.map((g) => <option key={g}>{g}</option>)}
          </select>
          {errors.grade && <span className="err" role="alert">{errors.grade}</span>}
        </label>
        {field('dob', 'Date of birth', 'date')}
        {field('date', 'Preferred visit date', 'date')}
        <label>
          Time slot
          <select name="time" value={f.time} onChange={set}>
            <option value="">Select…</option>
            {TIMES.map((t) => <option key={t} value={t} disabled={!!f.date && taken(t)}>{t}{f.date && taken(t) ? ' (full)' : ''}</option>)}
          </select>
          {errors.time && <span className="err" role="alert">{errors.time}</span>}
        </label>
      </div>
      <button type="submit">Submit application</button>
    </form>
  )
}
