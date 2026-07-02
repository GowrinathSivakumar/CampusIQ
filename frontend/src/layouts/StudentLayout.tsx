import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import StudentNavbar from '../components/StudentNavbar'
import StudentSidebar from '../components/StudentSidebar'
import './StudentLayout.css'

export default function StudentLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="student-layout">
      <StudentNavbar onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)} />

      <StudentSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <main className={`student-main ${sidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        <div className="student-main-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
