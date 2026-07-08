import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  History,
  HelpCircle,
  BookOpen,
  Bot,
  Bookmark,
  UserCircle,
  LogOut,
  GraduationCap,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './StudentSidebar.css'

interface StudentSidebarProps {}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/student/dashboard' },
  { icon: History, label: 'Previous Drives', path: '/student/drives' },
  { icon: HelpCircle, label: 'Interview Questions', path: '/student/questions' },
  { icon: BookOpen, label: 'Preparation Guide', path: '/student/preparation' },
  { icon: Bot, label: 'AI Mentor', path: '/student/ai' },
  { icon: Bookmark, label: 'Bookmarks', path: '/student/bookmarks' },
  { icon: UserCircle, label: 'Profile', path: '/student/profile' },
]

export default function StudentSidebar({}: StudentSidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="student-sidebar-desktop expanded">
      <div className="student-sidebar-inner">
        <div className="student-sidebar-header">
          <div className="student-sidebar-header-content">
            <span className="student-sidebar-header-c-wrapper">
              <GraduationCap className="student-sidebar-header-cap" />
              <span className="student-sidebar-header-c">C</span>
            </span>
            <span className="student-sidebar-header-text">ampus</span>
            <span className="student-sidebar-header-c">IQ</span>
            <span className="student-sidebar-header-badge">Student</span>
          </div>
        </div>

        <nav className="student-sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`student-sidebar-link ${isActive ? 'active' : ''}`}
              >
                <Icon className="student-sidebar-link-icon" />
                <span className="student-sidebar-link-label">{item.label}</span>
                {isActive && <span className="student-sidebar-link-dot" />}
              </NavLink>
            )
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="student-sidebar-logout"
        >
          <LogOut className="student-sidebar-link-icon" />
          <span className="student-sidebar-link-label">Logout</span>
        </button>
      </div>
    </aside>
  )
}
