import { useNavigate } from 'react-router-dom'
import './QuickAccessCard.css'

interface QuickAccessCardProps {
  title: string
  description: string
  icon: string
  path: string
  gradient?: string
}

export default function QuickAccessCard({
  title,
  description,
  icon,
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
        <div className="quick-access-card-header">
          <div className="quick-access-card-icon">
            <img src={icon} alt={`${title} icon`} className="quick-access-card-icon-img" />
          </div>
          <h3 className="quick-access-card-title">{title}</h3>
        </div>
        <p className="quick-access-card-desc">{description}</p>
      </div>
    </button>
  )
}
