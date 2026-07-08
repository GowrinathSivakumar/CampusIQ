import { Link } from 'react-router-dom'
import './StudentNavbar.css'

interface StudentNavbarProps {}

export default function StudentNavbar({}: StudentNavbarProps) {
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
          <div className="student-navbar-profile">
            <div className="student-navbar-avatar">
              <img
                src="https://ui-avatars.com/api/?name=Kiruthika&background=2563eb&color=fff&size=32"
                alt="Kiruthika"
                className="student-navbar-avatar-img"
              />
            </div>
            <div className="student-navbar-profile-info">
              <p className="student-navbar-profile-name">Kiruthika</p>
              <p className="student-navbar-profile-role">Student</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
