import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../api'
import { useAuth } from '../AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await api.post('/auth/login', form)
    if (data.error) return setError(data.error)
    login(data.token, data.username)
    navigate('/')
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="email" placeholder="Email"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input style={styles.input} type="password" placeholder="Password"
            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <button style={styles.btn} type="submit">Login</button>
        </form>
        <p style={styles.footer}>No account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  )
}

const styles = {
  wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' },
  card: { background: 'white', padding: 35, borderRadius: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.2)', width: 360 },
  title: { textAlign: 'center', color: '#007BFF', marginBottom: 20 },
  input: { width: '100%', padding: 10, marginBottom: 14, border: '1px solid #ccc', borderRadius: 6, fontSize: 14, boxSizing: 'border-box' },
  btn: { width: '100%', padding: 12, background: '#007BFF', color: 'white', border: 'none', borderRadius: 6, fontSize: 16, cursor: 'pointer' },
  error: { color: '#721c24', background: '#f8d7da', padding: '8px 12px', borderRadius: 6, marginBottom: 12 },
  footer: { textAlign: 'center', marginTop: 14 }
}
