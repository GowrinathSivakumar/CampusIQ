import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import './CompanyCard.css'

interface CompanyCardProps {
  id: number
  name: string
  logo?: string
  salaryPackage?: string
  drives: number
  description?: string
}

const defaultLogos: Record<string, string> = {
  Zoho: '#1a73e8',
  TCS: '#312783',
  Amazon: '#ff9900',
  Google: '#4285f4',
  Microsoft: '#00a4ef',
  Infosys: '#007cc3',
  Wipro: '#341170',
  Cognizant: '#0a2885',
  Accenture: '#a100ff',
  'HCL Technologies': '#006bb7',
}

export default function CompanyCard({ id, name, logo, salaryPackage, drives, description }: CompanyCardProps) {
  const navigate = useNavigate()
  const bgColor = logo || defaultLogos[name] || '#6366f1'

  return (
    <div className="company-card">
      <div className="company-card-body">
        <div className="company-card-header">
          <div className="company-card-logo" style={{ background: bgColor }}>
            <span>{name.charAt(0)}</span>
          </div>
          <div className="company-card-info">
            <h3 className="company-card-name">{name}</h3>
            <div className="company-card-meta">
              {salaryPackage && <span className="company-card-package">{salaryPackage}</span>}
              <span className="company-card-drives">{drives} previous {drives === 1 ? 'drive' : 'drives'}</span>
            </div>
          </div>
        </div>
        {description && <p className="company-card-desc">{description}</p>}
        <button
          onClick={() => navigate(`/student/company/${id}`)}
          className="company-card-btn"
        >
          View Details
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
