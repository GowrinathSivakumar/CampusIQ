import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  History,
  HelpCircle,
  Lightbulb,
  BarChart3,
  UserCircle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from 'lucide-react'
import './AdminSidebar.css'

interface AdminSidebarProps {
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Building2, label: 'Companies', path: '/admin/companies' },
  { icon: PlusCircle, label: 'Add Company', path: '/admin/add-company' },
  { icon: History, label: 'Previous Drives', path: '/admin/drives' },
  { icon: HelpCircle, label: 'Interview Questions', path: '/admin/questions' },
  { icon: Lightbulb, label: 'Preparation Tips', path: '/admin/preparation' },
  { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
  { icon: UserCircle, label: 'Profile', path: '/admin/profile' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
]

export default function AdminSidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: AdminSidebarProps) {
  const location = useLocation()

  const sidebarContent = (
    <div className="sidebar-inner">
      <div className="sidebar-header">
        {!collapsed ? (
          <div className="sidebar-header-content">
            <span className="sidebar-header-c-wrapper">
              <GraduationCap className="sidebar-header-cap" />
              <span className="sidebar-header-c">C</span>
            </span>
            <span className="sidebar-header-text">ampus</span>
            <span className="sidebar-header-c">IQ</span>
            <span className="sidebar-header-badge">Admin</span>
          </div>
        ) : (
          <div className="sidebar-header-center">
            <span className="sidebar-header-c-wrapper">
              <GraduationCap className="sidebar-header-cap" />
              <span className="sidebar-header-c">C</span>
            </span>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onMobileClose}
              className={`sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="sidebar-link-icon" />
              {!collapsed && <span className="sidebar-link-label">{item.label}</span>}
              {isActive && !collapsed && <span className="sidebar-link-dot" />}
            </NavLink>
          )
        })}

        <NavLink
          to="/"
          onClick={onMobileClose}
          className={`sidebar-logout ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="sidebar-link-icon" />
          {!collapsed && <span className="sidebar-link-label">Logout</span>}
        </NavLink>
      </nav>

      <button
        onClick={onToggle}
        className="sidebar-toggle-btn"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </div>
  )

  return (
    <>
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={onMobileClose} />
      )}

      <aside className={`sidebar-mobile ${mobileOpen ? 'open' : ''}`}>
        {sidebarContent}
      </aside>

      <aside className={`sidebar-desktop ${collapsed ? 'collapsed' : 'expanded'}`}>
        {sidebarContent}
      </aside>
    </>
  )
}
