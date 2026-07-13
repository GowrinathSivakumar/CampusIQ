import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  History,
  HelpCircle,
  Lightbulb,
  BarChart3,
  LogOut,
  GraduationCap,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './AdminSidebar.css'

interface AdminSidebarProps {}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Building2, label: 'Companies', path: '/admin/companies' },
  { icon: History, label: 'Previous Drives', path: '/admin/drives' },
  { icon: HelpCircle, label: 'Interview Questions', path: '/admin/questions' },
  { icon: Lightbulb, label: 'Preparation Tips', path: '/admin/preparation' },
  { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
]

export default function AdminSidebar({}: AdminSidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="sidebar-desktop expanded">
      <div className="sidebar-inner">
        <div className="sidebar-header">
          <div className="sidebar-header-content">
            <GraduationCap className="sidebar-header-icon" size={20} />
            <span className="sidebar-header-brand">CampusIQ</span>
            <span className="sidebar-header-badge">Admin</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = item.path === '/admin/drives'
              ? (location.pathname === item.path || location.pathname === '/admin/companies/add')
              : location.pathname === item.path
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                <Icon className="sidebar-link-icon" />
                <span className="sidebar-link-label">{item.label}</span>
                {isActive && <span className="sidebar-link-dot" />}
              </NavLink>
            )
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="sidebar-logout"
        >
          <LogOut className="sidebar-link-icon" />
          <span className="sidebar-link-label">Logout</span>
        </button>
      </div>
    </aside>
  )
}
