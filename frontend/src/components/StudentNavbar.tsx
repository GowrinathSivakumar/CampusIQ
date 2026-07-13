import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './StudentNavbar.css'

interface StudentNavbarProps {}

export default function StudentNavbar({}: StudentNavbarProps) {
  const { user } = useAuth()
  const initial = user?.email?.charAt(0).toUpperCase() || 'S'

  return (
    <header className="student-navbar">
      <div className="student-navbar-inner">
        <div className="student-navbar-left">
          <Link to="/student/dashboard" className="student-navbar-brand">
            <span className="student-navbar-brand-icon">C</span>
            <span className="student-navbar-brand-text">ampusIQ</span>
            <span className="student-navbar-brand-badge">Student</span>
          </Link>
        </div>

        <div className="student-navbar-right">
          <div className="student-navbar-avatar">{initial}</div>
        </div>
      </div>
    </header>
  )
}
