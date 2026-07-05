import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import StudentLayout from '../layouts/StudentLayout'
import Dashboard from '../pages/student/Dashboard'
import Companies from '../pages/student/Companies'
import CompanyDetails from '../pages/student/CompanyDetails'
import PreviousDrives from '../pages/student/PreviousDrives'
import InterviewQuestions from '../pages/student/InterviewQuestions'
import PreparationGuide from '../pages/student/PreparationGuide'
import AIMentor from '../pages/student/AIMentor'
import Bookmarks from '../pages/student/Bookmarks'
import Profile from '../pages/student/Profile'
import Settings from '../pages/student/Settings'
import NotFound from '../pages/NotFound'

export default function StudentRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<StudentLayout />}>
          <Route index element={<Navigate to="/student/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="companies" element={<Companies />} />
          <Route path="company/:id" element={<CompanyDetails />} />
          <Route path="drives" element={<PreviousDrives />} />
          <Route path="questions" element={<InterviewQuestions />} />
          <Route path="preparation" element={<PreparationGuide />} />
          <Route path="ai" element={<AIMentor />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  )
}
