import { Award, Building2 } from 'lucide-react'
import './HighestPlacementCard.css'

interface HighestPlacementCardProps {
  company: string
  role: string
  package: string
}

export default function HighestPlacementCard({ company, role, package: pkg }: HighestPlacementCardProps) {
  return (
    <div className="highest-placement-card">
      <div className="highest-placement-bg-1" />
      <div className="highest-placement-bg-2" />

      <div className="highest-placement-content">
        <div className="highest-placement-header">
          <Award size={16} className="highest-placement-header-icon" />
          <span className="highest-placement-header-label">Highest Placement</span>
        </div>

        <div className="highest-placement-company">
          <div className="highest-placement-logo">
            <Building2 size={20} className="highest-placement-logo-icon" />
          </div>
          <div>
            <p className="highest-placement-name">{company}</p>
            <p className="highest-placement-role">{role}</p>
          </div>
        </div>

        <div className="highest-placement-package">
          <span className="highest-placement-package-value">{pkg}</span>
        </div>
      </div>
    </div>
  )
}
