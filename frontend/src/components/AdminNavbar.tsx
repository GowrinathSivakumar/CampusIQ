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

        <div className="admin-navbar-right"></div>
      </div>
    </header>
  )
}
