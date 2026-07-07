import { Search, Bell, Menu } from 'lucide-react'
import './AdminNavbar.css'

interface AdminNavbarProps {
  onToggleSidebar: () => void
}

export default function AdminNavbar({ onToggleSidebar }: AdminNavbarProps) {
  return (
    <header className="admin-navbar">
      <div className="admin-navbar-inner">
        <div className="admin-navbar-left">
          <button
            onClick={onToggleSidebar}
            className="admin-navbar-hamburger"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

          <div className="admin-navbar-brand">
            <span className="admin-navbar-brand-c">C</span>
            <span className="admin-navbar-brand-text">ampusIQ</span>
            <span className="admin-navbar-brand-badge">Admin</span>
          </div>
        </div>

        <div className="admin-navbar-search-wrapper">
          <Search className="admin-navbar-search-icon" size={16} />
          <input
            type="text"
            placeholder="Search companies, questions..."
            className="admin-navbar-search"
          />
        </div>

        <div className="admin-navbar-right">
          <button className="admin-navbar-notification" aria-label="Notifications">
            <Bell size={20} />
            <span className="admin-navbar-notification-dot" />
          </button>

          <div className="admin-navbar-profile">
            <div className="admin-navbar-avatar">A</div>
            <div className="admin-navbar-profile-info">
              <p className="admin-navbar-profile-name">Admin</p>
              <p className="admin-navbar-profile-email">admin@campusiq.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
