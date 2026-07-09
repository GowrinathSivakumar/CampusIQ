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

      {/* Left Panel - Welcome Section */}
      <div className="login-left-panel">
        {/* Premium Background Effects */}
        <div className="premium-orbs">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="orb orb-4" />
        </div>
        <div className="mesh-gradient" />
        <div className="animated-lines">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="line line-1" style={{
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 0.5}s`
            }} />
          ))}
        </div>
        <div className="grid-pattern" />
        
        <div className="login-left-content">
          {/* Premium Heading */}
          <div className="premium-heading">
            <p className="premium-subtitle">AI-Powered Placement Platform</p>
            <h1 className="login-welcome-title">
              Welcome to<br />
              {role === 'student' ? 'Student Portal' : 'Admin Portal'}
            </h1>
            <p className="login-welcome-subtitle">Login to access your account and unlock your career potential.</p>
          </div>

          {/* Statistics Cards - Student Only */}
          {role === 'student' && (
            <div className="stats-cards">
              <div className="stat-card stat-card-1">
                <div className="stat-value">1200+</div>
                <div className="stat-label">Students</div>
              </div>
              <div className="stat-card stat-card-2">
                <div className="stat-value">150+</div>
                <div className="stat-label">Companies</div>
              </div>
              <div className="stat-card stat-card-3">
                <div className="stat-value">95%</div>
                <div className="stat-label">Placement Rate</div>
              </div>
              <div className="stat-card stat-card-4">
                <div className="stat-value">24/7</div>
                <div className="stat-label">Career Support</div>
              </div>
            </div>
          )}

          {/* Feature Cards - Admin Only */}
          {role === 'admin' && (
            <div className="login-feature-cards">
              <div className="login-feature-card">
                <div className="feature-icon feature-icon-secure">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill="#34D399"/>
                  </svg>
                </div>
                <h3 className="feature-title">Secure Access</h3>
                <p className="feature-description">Advanced security protocols</p>
              </div>
              <div className="login-feature-card">
                <div className="feature-icon feature-icon-fast">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="#34D399"/>
                  </svg>
                </div>
                <h3 className="feature-title">Fast & Reliable</h3>
                <p className="feature-description">Lightning-fast performance</p>
              </div>
              <div className="login-feature-card">
                <div className="feature-icon feature-icon-dashboard">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="#34D399"/>
                  </svg>
                </div>
                <h3 className="feature-title">Smart Dashboard</h3>
                <p className="feature-description">Intuitive analytics</p>
              </div>
            </div>
          )}

          {/* Animated Illustration */}
          <div className="login-illustration">
            <div className="login-blob login-blob-1" />
            <div className="login-blob login-blob-2" />
            <div className="login-blob login-blob-3" />
            {role === 'admin' && (
              <>
                <div className="shield-particles">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="particle" style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }} />
                  ))}
                </div>
                <div className="shield-wave shield-wave-1" />
                <div className="shield-wave shield-wave-2" />
                <div className="shield-wave shield-wave-3" />
              </>
            )}
            {role === 'student' && (
              <>
                <div className="student-particles">
                  {[...Array(30)].map((_, i) => (
                    <div key={i} className="particle-blue" style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }} />
                  ))}
                </div>
                <div className="student-wave student-wave-1" />
                <div className="student-wave student-wave-2" />
                <div className="student-wave student-wave-3" />
              </>
            )}
            <AnimatePresence mode="wait">
              {role === 'student' ? (
                <motion.div
                  key="student-illustration"
                  className="login-illustration-svg student-illustration-position"
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

      {/* Right Panel - Login Form */}
      <div className="login-right-panel">
        {/* Animated Company Logos Background */}
        <div className="login-company-logos">
          <div className="company-logo company-logo-1">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
          <div className="company-logo company-logo-2">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1h22v22H1V1z" fill="#F25022"/>
              <path d="M12 1h11v11H12V1z" fill="#7FBA00"/>
              <path d="M1 12h11v11H1V12z" fill="#00A4EF"/>
              <path d="M12 12h11v11H12V12z" fill="#FFB900"/>
            </svg>
          </div>
          <div className="company-logo company-logo-3">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.042 14.548c-1.076 0-1.95-.874-1.95-1.95s.874-1.95 1.95-1.95 1.95.874 1.95 1.95-.874 1.95-1.95 1.95zm0-3.2c-.689 0-1.25.561-1.25 1.25s.561 1.25 1.25 1.25 1.25-.561 1.25-1.25-.561-1.25-1.25-1.25z" fill="#FF9900"/>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#FF9900"/>
              <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#FF9900"/>
            </svg>
          </div>
          <div className="company-logo company-logo-4">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm-7 0c0 .83-.67 1.5-1.5 1.5S5 9.33 5 8.5 5.67 7 6.5 7 8 7.67 8 8.5zm3.5 3.5c2.33 0 4.31 1.46 5.11 3.5H6.89c.8-2.04 2.78-3.5 5.11-3.5z" fill="#0668E1"/>
              <circle cx="12" cy="12" r="10" stroke="#0668E1" stroke-width="2" fill="none"/>
            </svg>
          </div>
          <div className="company-logo company-logo-5">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.08-3.11-1.05.05-2.31.71-3.06 1.61-.69.81-1.26 2.02-1.1 3.12 1.17.09 2.36-.6 3.08-1.62" fill="#000"/>
            </svg>
          </div>
          <div className="company-logo company-logo-6">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 24h5.4L13.887 0zM0 24h5.4l2.4-6.427L5.4 24z" fill="#E50914"/>
            </svg>
          </div>
          <div className="company-logo company-logo-7">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c01.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#1DA1F2"/>
            </svg>
          </div>
          <div className="company-logo company-logo-8">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="#E4405F"/>
            </svg>
          </div>
          <div className="company-logo company-logo-9">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" fill="#FF0000"/>
            </svg>
          </div>
          <div className="company-logo company-logo-10">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" fill="#181717"/>
            </svg>
          </div>
          <div className="company-logo company-logo-11">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0077B5"/>
            </svg>
          </div>
          <div className="company-logo company-logo-12">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.828.94z" fill="#0088CC"/>
            </svg>
          </div>
          <div className="company-logo company-logo-13">
            <svg viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="30" y="17" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="#1f70c1">IBM</text>
            </svg>
          </div>
          <div className="company-logo company-logo-14">
            <svg viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="40" y="17" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="#eb3c00">ORACLE</text>
            </svg>
          </div>
          <div className="company-logo company-logo-15">
            <svg viewBox="0 0 50 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="25" y="17" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="#00a9e0">SAP</text>
            </svg>
          </div>
          <div className="company-logo company-logo-16">
            <svg viewBox="0 0 70 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="35" y="17" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="#76b900">NVIDIA</text>
            </svg>
          </div>
          <div className="company-logo company-logo-17">
            <svg viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="30" y="17" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="15" fill="#ff0000">Adobe</text>
            </svg>
          </div>
          <div className="company-logo company-logo-18">
            <svg viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <text x="30" y="17" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="#00bceb">Cisco</text>
            </svg>
          </div>
        </div>

        <div className="login-right-content">
          {/* Form */}
          <div className="login-form-container">
            {/* Logo - Center */}
            <div className="login-logo-centered">
              <span className="login-logo-c">C</span>
              <span className="login-logo-text">ampus</span>
              <span className="login-logo-c">IQ</span>
              <span className={`login-badge ${role}`}>{role === 'admin' ? 'Admin' : 'Student'}</span>
            </div>

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
    </div>
  )
}
