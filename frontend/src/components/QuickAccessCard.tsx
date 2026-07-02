import type { LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import './QuickAccessCard.css'

interface QuickAccessCardProps {
  title: string
  description: string
  icon: LucideIcon
  path: string
  gradient?: string
}

export default function QuickAccessCard({
  title,
  description,
  icon: Icon,
  path,
  gradient = 'linear-gradient(135deg, var(--student-500), var(--student-700))',
}: QuickAccessCardProps) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(path)}
      className="quick-access-card"
    >
      <div className="quick-access-card-bg" style={{ background: gradient }} />
      <div className="quick-access-card-content">
        <div className="quick-access-card-icon">
          <Icon size={22} />
        </div>
        <h3 className="quick-access-card-title">{title}</h3>
        <p className="quick-access-card-desc">{description}</p>
        <span className="quick-access-card-arrow">
          <ArrowRight size={16} />
        </span>
      </div>
    </button>
  )
}
