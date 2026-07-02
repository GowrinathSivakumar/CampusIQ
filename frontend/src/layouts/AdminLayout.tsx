import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar'
import AdminSidebar from '../components/AdminSidebar'
import './AdminLayout.css'

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="admin-layout">
      <AdminNavbar onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)} />

      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <main className={`admin-main ${sidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        <div className="admin-main-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
