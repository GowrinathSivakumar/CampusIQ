import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, Mail, Lock, Eye, EyeOff, GraduationCap, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import './Login.css'

function StudentIllustration() {
  return (
    <svg viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="140" r="60" stroke="rgba(255,255,255,0.5)" strokeWidth="3" fill="none" />
      <circle cx="200" cy="140" r="30" fill="rgba(255,255,255,0.8)" />
      <rect x="185" y="200" width="30" height="70" rx="4" fill="rgba(255,255,255,0.6)" />
      <rect x="175" y="200" width="10" height="50" rx="3" fill="rgba(255,255,255,0.4)" />
      <rect x="215" y="200" width="10" height="50" rx="3" fill="rgba(255,255,255,0.4)" />
      <path d="M130 270 L200 240 L270 270" stroke="rgba(255,255,255,0.5)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="160" y="255" width="80" height="12" rx="2" fill="rgba(255,255,255,0.5)" />
      <path d="M200 50 V20" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="185" y="10" width="30" height="8" rx="2" fill="rgba(255,255,255,0.5)" />
      <circle cx="100" cy="100" r="4" fill="rgba(255,255,255,0.4)" />
      <circle cx="310" cy="80" r="3" fill="rgba(255,255,255,0.3)" />
      <circle cx="330" cy="180" r="5" fill="rgba(255,255,255,0.35)" />
      <circle cx="70" cy="210" r="3" fill="rgba(255,255,255,0.3)" />
    </svg>
  )
}

function AdminIllustration() {
  return (
    <svg viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M200 50 L270 90 V170 C270 230 200 280 200 280 C200 280 130 230 130 170 V90 L200 50Z" stroke="rgba(255,255,255,0.5)" strokeWidth="3" fill="none" strokeLinejoin="round" />
      <path d="M175 170 L195 190 L225 155" stroke="rgba(255,255,255,0.85)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="200" cy="200" r="55" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
      <circle cx="200" cy="200" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" />
      <rect x="165" y="130" width="70" height="8" rx="3" fill="rgba(255,255,255,0.5)" />
      <line x1="120" y1="140" x2="140" y2="130" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="260" y1="130" x2="280" y2="140" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="115" y1="180" x2="135" y2="175" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="265" y1="175" x2="285" y2="180" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="140" y="55" width="120" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
      <circle cx="80" cy="90" r="3" fill="rgba(255,255,255,0.3)" />
      <circle cx="320" cy="110" r="4" fill="rgba(255,255,255,0.35)" />
      <circle cx="340" cy="240" r="3" fill="rgba(255,255,255,0.3)" />
      <circle cx="60" cy="260" r="5" fill="rgba(255,255,255,0.25)" />
    </svg>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
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

    login(email, role)

    if (role === 'student') {
      navigate('/student/dashboard')
    } else if (role === 'admin') {
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className={`login-page ${role === 'admin' ? 'admin-theme' : ''}`}>
      {/* Role Switcher - Top Right */}
      <div className="login-role-switcher">
        <button
          type="button"
          className={`login-role-pill ${role === 'student' ? 'active' : ''}`}
          onClick={() => { setRole('student'); setError('') }}
        >
          <GraduationCap size={16} />
          Student
        </button>
        <button
          type="button"
          className={`login-role-pill ${role === 'admin' ? 'active' : ''}`}
          onClick={() => { setRole('admin'); setError('') }}
        >
          <Shield size={16} />
          Admin
        </button>
      </div>

      {/* Left Panel - Login Form */}
      <div className="login-left-panel">
        <div className="login-left-content">
          {/* Logo - Top Left */}
          <div className="login-logo">
            <span className="login-logo-c">C</span>
            <span className="login-logo-text">ampus</span>
            <span className="login-logo-c">IQ</span>
            <span className={`login-badge ${role}`}>{role === 'admin' ? 'Admin' : 'Student'}</span>
          </div>

          {/* Form */}
          <div className="login-form-container">
            <h1 className="login-title">Login</h1>
            <p className="login-subtitle">Login to your CampusIQ Placement Portal</p>

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
                Login
              </button>

              <p className="login-hint">
                Enter any email and password to login
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Right Panel - Welcome Section */}
      <div className="login-right-panel">
        <div className="login-right-content">
          <h1 className="login-welcome-title">
            Welcome to<br />
            {role === 'student' ? 'Student Portal' : 'Admin Portal'}
          </h1>
          <p className="login-welcome-subtitle">Login to access your account.</p>

          {/* Animated Illustration */}
          <div className="login-illustration">
            <div className="login-blob login-blob-1" />
            <div className="login-blob login-blob-2" />
            <div className="login-blob login-blob-3" />
            <AnimatePresence mode="wait">
              {role === 'student' ? (
                <motion.div
                  key="student-illustration"
                  className="login-illustration-svg"
                  initial={{ x: -200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 200, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                >
                  <StudentIllustration />
                </motion.div>
              ) : (
                <motion.div
                  key="admin-illustration"
                  className="login-illustration-svg"
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -200, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                >
                  <AdminIllustration />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
