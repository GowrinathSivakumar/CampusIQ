import { Building2, CheckCircle2, BookOpen } from 'lucide-react'
import DashboardCard from '../../components/DashboardCard'
import HighestPlacementCard from '../../components/HighestPlacementCard'
import QuickActionCard from '../../components/QuickActionCard'

import './Dashboard.css'

const stats = [
  { title: 'Total Companies', value: '128 Companies', icon: Building2, trend: { value: '12% increase', positive: true } },
  { title: 'Completed Drives', value: '95 Drives', icon: CheckCircle2, trend: { value: '8% increase', positive: true } },
  { title: 'Interview Questions', value: '1,542 Questions', icon: BookOpen, trend: { value: '24% increase', positive: true } },
]

const quickActions = [
  { title: 'View Companies', description: 'Browse and manage registered companies', icon: Building2, path: '/admin/companies' },
  { title: 'Upload Previous Drive', description: 'Add previous placement drive data', icon: Building2, path: '/admin/drives' },
  { title: 'Upload Questions', description: 'Add interview questions to database', icon: BookOpen, path: '/admin/questions' },
  { title: 'Add Preparation Tips', description: 'Share preparation tips and resources', icon: BookOpen, path: '/admin/preparation' },
]

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Overview of your placement hub</p>
      </div>

      <div className="dashboard-stats">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
        <HighestPlacementCard company="Microsoft" role="Software Engineer" package="₹45 LPA" />
      </div>

      <div>
        <h2 className="dashboard-section-title">Quick Actions</h2>
        <div className="dashboard-quick-actions">
          {quickActions.map((action) => (
            <QuickActionCard key={action.title} {...action} />
          ))}
        </div>
      </div>

    </div>
  )
}
