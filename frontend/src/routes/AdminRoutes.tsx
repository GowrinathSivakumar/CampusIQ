import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/admin/Dashboard'
import Companies from '../pages/admin/Companies'
import PreviousDrives from '../pages/admin/PreviousDrives'
import Questions from '../pages/admin/Questions'
import Preparation from '../pages/admin/Preparation'
import Reports from '../pages/admin/Reports'
import Settings from '../pages/admin/Settings'
import Profile from '../pages/admin/Profile'
import NotFound from '../pages/NotFound'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="companies" element={<Companies />} />
        <Route path="drives" element={<PreviousDrives />} />
        <Route path="questions" element={<Questions />} />
        <Route path="preparation" element={<Preparation />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
