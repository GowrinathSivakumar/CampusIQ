import type { LucideIcon } from 'lucide-react'
import './StudentCard.css'

interface StudentCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  accentColor?: string
}

export default function StudentCard({
  title,
  value,
  icon: Icon,
  description,
  accentColor = 'var(--student-500)',
}: StudentCardProps) {
  return (
    <div className="student-stat-card">
      <div className="student-stat-card-body">
        <div className="student-stat-card-content">
          <p className="student-stat-card-title">{title}</p>
          <p className="student-stat-card-value">{value}</p>
          {description && <p className="student-stat-card-desc">{description}</p>}
        </div>
        <div className="student-stat-card-icon" style={{ background: `${accentColor}15`, color: accentColor }}>
          <Icon size={22} />
        </div>
      </div>
      <div className="student-stat-card-bar" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)` }} />
    </div>
  )
}
