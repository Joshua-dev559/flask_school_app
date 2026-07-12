import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function Navbar() {
  const { token, username, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>School App</span>
      <div>
        {token ? (
          <>
            <Link to="/" style={styles.link}>Students</Link>
            <Link to="/courses" style={styles.link}>Courses</Link>
            <Link to="/clubs" style={styles.link}>Clubs</Link>
            <span style={styles.user}>Hi, {username}</span>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: { background: '#007BFF', padding: '12px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  brand: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  link: { color: 'white', textDecoration: 'none', marginLeft: 15, fontSize: 15 },
  user: { color: '#cce5ff', marginLeft: 15, fontSize: 14 },
  btn: { marginLeft: 15, background: 'transparent', border: '1px solid white', color: 'white', padding: '5px 12px', borderRadius: 5, cursor: 'pointer' }
}
