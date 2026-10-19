import { useEffect, useState } from 'react'
import AdmissionForm from './components/AdmissionForm.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import './App.css'

const KEY = 'school-admissions'

export default function App() {
  const [view, setView] = useState('apply')
  const [applications, setApplications] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || []
    } catch {
      return []
    }
  })
  const [confirmation, setConfirmation] = useState(null)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(applications))
  }, [applications])

  const addApplication = (data) => {
    const app = { ...data, id: crypto.randomUUID(), status: 'Pending', createdAt: new Date().toISOString() }
    setApplications((a) => [...a, app])
    setConfirmation(app)
  }
  const setStatus = (id, status) =>
    setApplications((a) => a.map((x) => (x.id === id ? { ...x, status } : x)))
  const remove = (id) => setApplications((a) => a.filter((x) => x.id !== id))

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎓 Greenfield School Admissions</h1>
        <nav>
          <button className={view === 'apply' ? 'active' : ''} onClick={() => setView('apply')}>Apply</button>
          <button className={view === 'admin' ? 'active' : ''} onClick={() => setView('admin')}>Admin</button>
        </nav>
      </header>
      <main>
        {view === 'apply' ? (
          confirmation ? (
            <section className="card confirm">
              <h2>Application submitted ✔</h2>
              <p>
                Thank you! Admission visit for <strong>{confirmation.studentName}</strong> (Grade {confirmation.grade}) is
                booked for <strong>{confirmation.slot}</strong>.
              </p>
              <p>Reference: <code>{confirmation.id.slice(0, 8)}</code></p>
              <button onClick={() => setConfirmation(null)}>Book another</button>
            </section>
          ) : (
            <AdmissionForm onSubmit={addApplication} applications={applications} />
          )
        ) : (
          <AdminPanel applications={applications} onStatusChange={setStatus} onDelete={remove} />
        )}
      </main>
    </div>
  )
}
