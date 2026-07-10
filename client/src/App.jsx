import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import PrivateRoute from './PrivateRoute'
import Navbar from './Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Students from './pages/Students'
import Courses from './pages/Courses'
import Clubs from './pages/Clubs'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #74ebd5, #ACB6E5)', fontFamily: 'Arial, sans-serif' }}>
          <Navbar />
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<PrivateRoute><Students /></PrivateRoute>} />
              <Route path="/courses" element={<PrivateRoute><Courses /></PrivateRoute>} />
              <Route path="/clubs" element={<PrivateRoute><Clubs /></PrivateRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
