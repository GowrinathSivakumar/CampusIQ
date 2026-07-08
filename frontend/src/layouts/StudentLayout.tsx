import { Outlet } from 'react-router-dom'
import StudentNavbar from '../components/StudentNavbar'
import StudentSidebar from '../components/StudentSidebar'
import './StudentLayout.css'

export default function StudentLayout() {
  return (
    <div className="student-layout">
      <StudentNavbar />
      <StudentSidebar />

      <main className="student-main expanded">
        <div className="student-main-content">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
