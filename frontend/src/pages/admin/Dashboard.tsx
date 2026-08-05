import { useEffect, useState } from 'react'
import { Building2, CheckCircle2, BookOpen } from 'lucide-react'
import DashboardCard from '../../components/DashboardCard'
import HighestPlacementCard from '../../components/HighestPlacementCard'
import QuickActionCard from '../../components/QuickActionCard'
import KSRCELogo from '../../assets/KSRCE logo.jpg'
import { getDashboard, type DashboardResponse } from '../../services/dashboardService'

import './Dashboard.css'

const quickActions = [
  { title: 'View Companies', description: 'Browse and manage registered companies', icon: Building2, path: '/admin/companies' },
  { title: 'Upload Previous Drive', description: 'Add previous placement drive data', icon: Building2, path: '/admin/drives' },
  { title: 'Upload Questions', description: 'Add interview questions to database', icon: BookOpen, path: '/admin/questions' },
  { title: 'Add Preparation Tips', description: 'Share preparation tips and resources', icon: BookOpen, path: '/admin/preparation' },
]

function formatCount(count: number, singular: string, plural: string): string {
  return `${count.toLocaleString('en-US')} ${count === 1 ? singular : plural}`
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let mounted = true

    async function fetchDashboard() {
      try {
        setLoading(true)
        setError(false)
        const response = await getDashboard()
        if (mounted) setData(response)
      } catch {
        if (mounted) setError(true)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchDashboard()
    return () => {
      mounted = false
    }
  }, [])

  const stats = data?.stats

  const statCards = [
    {
      title: 'Total Companies',
      value: loading
        ? 'Loading...'
        : error
          ? 'Unavailable'
          : formatCount(stats?.totalCompanies ?? 0, 'Company', 'Companies'),
      icon: Building2,
    },
    {
      title: 'Completed Drives',
      value: loading
        ? 'Loading...'
        : error
          ? 'Unavailable'
          : formatCount(stats?.totalDrives ?? 0, 'Drive', 'Drives'),
      icon: CheckCircle2,
    },
    {
      title: 'Interview Questions',
      value: loading
        ? 'Loading...'
        : error
          ? 'Unavailable'
          : formatCount(stats?.totalQuestions ?? 0, 'Question', 'Questions'),
      icon: BookOpen,
    },
  ]

  const highest = data?.highestPlacement
  const highestPlacement = {
    company: error
      ? 'Unavailable'
      : loading
        ? 'Loading...'
        : highest?.company?.name || highest?.companyName || 'No drives recorded yet',
    role: error || loading ? '—' : highest?.role || '—',
    package: error || loading ? '—' : highest?.package || '—',
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-college-header">
        <img src={KSRCELogo} alt="KSRCE Logo" className="dashboard-college-logo" />
        <span className="dashboard-college-name">
          K S R COLLEGE OF ENGINEERING <span className="dashboard-college-autonomous">(Autonomous)</span> – 637215
        </span>
      </div>
      <div className="dashboard-stats">
        {statCards.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
        <HighestPlacementCard {...highestPlacement} />
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
