import { Search, Bell, Menu, LogOut } from 'lucide-react'
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
            <span className="admin-navbar-brand-text">ampus</span>
            <span className="admin-navbar-brand-c">IQ</span>
          </div>
          <span className="admin-navbar-divider" />
          <span className="admin-navbar-title">Admin Dashboard</span>
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

          <button className="admin-navbar-logout">
            <LogOut size={18} />
            <span className="admin-navbar-logout-label">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}
