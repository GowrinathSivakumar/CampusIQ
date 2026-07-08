import { Outlet } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar'
import AdminSidebar from '../components/AdminSidebar'
import './AdminLayout.css'

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <AdminSidebar />

      <main className="admin-main expanded">
        <div className="admin-main-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
