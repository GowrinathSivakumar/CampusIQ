import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, Mail, Lock, Eye, EyeOff, GraduationCap, Shield } from 'lucide-react'
import './Login.css'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<'student' | 'admin'>('student')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    if (role === 'student' && email.endsWith('@student.edu') && password === 'student123') {
      navigate('/student/dashboard')
    } else if (role === 'admin' && email === 'admin@campusiq.com' && password === 'admin123') {
      navigate('/admin/dashboard')
    } else {
      setError('Invalid email or password.')
    }
  }

  return (
    <div className="login-page">
      <div className="login-bg-shapes">
        <div className="login-shape login-shape-1" />
        <div className="login-shape login-shape-2" />
        <div className="login-shape login-shape-3" />
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <span className="login-logo-c">C</span>
              <span className="login-logo-text">ampus</span>
              <span className="login-logo-c">IQ</span>
              <span className={`login-badge ${role}`}>{role === 'admin' ? 'Admin' : 'Student'}</span>
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to your {role} dashboard</p>

            <div className="login-role-toggle">
              <button
                type="button"
                className={`login-role-btn ${role === 'student' ? 'active' : ''}`}
                onClick={() => { setRole('student'); setError('') }}
              >
                <GraduationCap size={16} />
                Student
              </button>
              <button
                type="button"
                className={`login-role-btn ${role === 'admin' ? 'active' : ''}`}
                onClick={() => { setRole('admin'); setError('') }}
              >
                <Shield size={16} />
                Admin
              </button>
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="login-error">
                <span>{error}</span>
              </div>
            )}

            <div className="login-field">
              <label className="login-label" htmlFor="email">Email</label>
              <div className="login-input-wrapper">
                <Mail className="login-input-icon" size={18} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  placeholder={role === 'student' ? 'you@student.edu' : 'admin@campusiq.com'}
                  className="login-input"
                />
              </div>
            </div>

            <div className="login-field">
              <label className="login-label" htmlFor="password">Password</label>
              <div className="login-input-wrapper">
                <Lock className="login-input-icon" size={18} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  placeholder="Enter your password"
                  className="login-input"
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="login-button">
              <LogIn size={18} />
              Sign In
            </button>

            <p className="login-hint">
              {role === 'student'
                ? 'Demo: any@student.edu / student123'
                : 'Demo: admin@campusiq.com / admin123'
              }
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
