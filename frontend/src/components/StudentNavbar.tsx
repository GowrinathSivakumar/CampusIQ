import { Bell, Bookmark, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import './StudentNavbar.css'

interface StudentNavbarProps {
  onToggleSidebar: () => void
}

export default function StudentNavbar({ onToggleSidebar }: StudentNavbarProps) {
  return (
    <header className="student-navbar">
      <div className="student-navbar-inner">
        <div className="student-navbar-left">
          <button
            onClick={onToggleSidebar}
            className="student-navbar-hamburger"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          <Link to="/student/dashboard" className="student-navbar-brand">
            <span className="student-navbar-brand-icon">C</span>
            <span className="student-navbar-brand-text">ampus</span>
            <span className="student-navbar-brand-icon">IQ</span>
            <span className="student-navbar-brand-badge">Student</span>
          </Link>
        </div>

        <div className="student-navbar-right">
          <Link to="/student/bookmarks" className="student-navbar-icon-btn" aria-label="Bookmarks">
            <Bookmark size={20} />
          </Link>

          <button className="student-navbar-icon-btn" aria-label="Notifications">
            <Bell size={20} />
            <span className="student-navbar-notification-dot" />
          </button>

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
