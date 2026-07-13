import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/admin/Dashboard'
import Companies from '../pages/admin/Companies'
import AddCompany from '../pages/admin/AddCompany'
import PreviousDrives from '../pages/admin/PreviousDrives'
import Questions from '../pages/admin/Questions'
import AddQuestion from '../pages/admin/AddQuestion'
import Preparation from '../pages/admin/Preparation'
import AddTip from '../pages/admin/AddTip'
import Reports from '../pages/admin/Reports'
import Settings from '../pages/admin/Settings'
import NotFound from '../pages/NotFound'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="companies" element={<Companies />} />
          <Route path="companies/add" element={<AddCompany />} />
          <Route path="drives" element={<PreviousDrives />} />
          <Route path="questions" element={<Questions />} />
          <Route path="questions/add" element={<AddQuestion />} />
          <Route path="preparation" element={<Preparation />} />
          <Route path="preparation/add" element={<AddTip />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  )
}
