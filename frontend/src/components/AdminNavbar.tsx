import './AdminNavbar.css'

interface AdminNavbarProps {}

export default function AdminNavbar({}: AdminNavbarProps) {
  return (
    <header className="admin-navbar">
      <div className="admin-navbar-inner">
        <div className="admin-navbar-left">
          <div className="admin-navbar-brand">
            <span className="admin-navbar-brand-c">C</span>
            <span className="admin-navbar-brand-text">ampusIQ</span>
            <span className="admin-navbar-brand-badge">Admin</span>
          </div>
        </div>

        <div className="admin-navbar-right">
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
