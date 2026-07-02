import type { LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './QuickActionCard.css'

interface QuickActionCardProps {
  title: string
  description: string
  icon: LucideIcon
  path: string
  gradientBg?: string
}

export default function QuickActionCard({
  title,
  description,
  icon: Icon,
  path,
}: QuickActionCardProps) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(path)}
      className="quick-action-card"
    >
      <div
        className="quick-action-gradient"
        style={{ background: 'linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100))' }}
      />
      <div className="quick-action-content">
        <div className="quick-action-icon">
          <Icon size={20} />
        </div>
        <h3 className="quick-action-title">{title}</h3>
        <p className="quick-action-desc">{description}</p>
      </div>
    </button>
  )
}
