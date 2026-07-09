import { BarChart3, Download, TrendingUp, Users, Briefcase, DollarSign } from 'lucide-react'
import './Reports.css'

const reportCards = [
  { title: 'Total Placements', value: '486', change: '+12%', icon: Briefcase, color: 'primary' },
  { title: 'Active Students', value: '2,340', change: '+8%', icon: Users, color: 'emerald' },
  { title: 'Avg Package', value: '₹18.5 LPA', change: '+15%', icon: DollarSign, color: 'amber' },
  { title: 'Placement Rate', value: '92%', change: '+5%', icon: TrendingUp, color: 'purple' },
]

export default function Reports() {
  return (
    <div className="reports-page">
      <div className="reports-header">
        <button className="reports-export-btn">
          <Download size={16} />
          Export Report
        </button>
      </div>

      <div className="reports-grid">
        {reportCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.title} className="report-card">
              <div className="report-card-top">
                <span className="report-card-title">{card.title}</span>
                <div className={`report-card-icon ${card.color}`}>
                  <Icon size={16} />
                </div>
              </div>
              <p className="report-card-value">{card.value}</p>
              <p className="report-card-change">{card.change} from last year</p>
            </div>
          )
        })}
      </div>

      <div className="reports-chart">
        <div className="reports-chart-placeholder">
          <div className="reports-chart-content">
            <BarChart3 size={48} />
            <p>Analytics charts coming soon</p>
            <span>Placement trends and statistics will be displayed here</span>
          </div>
        </div>
      </div>
    </div>
  )
}
