import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  History,
  HelpCircle,
  BookOpen,
  Bot,
  Bookmark,
  UserCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './StudentSidebar.css'

interface StudentSidebarProps {
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/student/dashboard' },
  { icon: History, label: 'Previous Drives', path: '/student/drives' },
  { icon: HelpCircle, label: 'Interview Questions', path: '/student/questions' },
  { icon: BookOpen, label: 'Preparation Guide', path: '/student/preparation' },
  { icon: Bot, label: 'AI Mentor', path: '/student/ai' },
  { icon: Bookmark, label: 'Bookmarks', path: '/student/bookmarks' },
  { icon: UserCircle, label: 'Profile', path: '/student/profile' },
]

export default function StudentSidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: StudentSidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const sidebarContent = (
    <div className="student-sidebar-inner">
      <nav className="student-sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onMobileClose}
              className={`student-sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="student-sidebar-link-icon" size={20} />
              {!collapsed && <span className="student-sidebar-link-label">{item.label}</span>}
              {isActive && !collapsed && <span className="student-sidebar-link-indicator" />}
            </NavLink>
          )
        })}
      </nav>

      <div className="student-sidebar-footer">
        <button
          onClick={() => { handleLogout(); onMobileClose() }}
          className={`student-sidebar-logout logout-btn ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={20} />
          {!collapsed && <span className="student-sidebar-link-label">Logout</span>}
        </button>

        <button
          onClick={onToggle}
          className="student-sidebar-toggle"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {mobileOpen && (
        <div className="student-sidebar-overlay" onClick={onMobileClose} />
      )}

      <aside className={`student-sidebar-mobile ${mobileOpen ? 'open' : ''}`}>
        {sidebarContent}
      </aside>

      <aside className={`student-sidebar-desktop ${collapsed ? 'collapsed' : 'expanded'}`}>
        {sidebarContent}
      </aside>
    </>
  )
}
