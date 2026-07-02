import type { LucideIcon } from 'lucide-react'
import './DashboardCard.css'

interface DashboardCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: { value: string; positive: boolean }
}

export default function DashboardCard({ title, value, icon: Icon, description, trend }: DashboardCardProps) {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-inner">
        <div className="dashboard-card-content">
          <p className="dashboard-card-title">{title}</p>
          <p className="dashboard-card-value">{value}</p>
          {description && <p className="dashboard-card-description">{description}</p>}
          {trend && (
            <div className={`dashboard-card-trend ${trend.positive ? 'positive' : 'negative'}`}>
              <span>{trend.positive ? '↑' : '↓'}</span>
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        <div className="dashboard-card-icon">
          <Icon size={20} />
        </div>
      </div>
    </div>
  )
}
