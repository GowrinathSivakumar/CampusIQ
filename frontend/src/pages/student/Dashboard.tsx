import { Link } from 'react-router-dom'
import {
  Building2,
  History,
  HelpCircle,
  Briefcase,
  Bot,
  BookOpen,
  ChevronRight,
} from 'lucide-react'
import QuickAccessCard from '../../components/QuickAccessCard'

import './Dashboard.css'

const quickAccessItems = [
  {
    title: 'Browse Companies',
    description: 'Explore all recruiting companies and their details',
    icon: Building2,
    path: '/student/companies',
  },
  {
    title: 'Previous Drives',
    description: 'View past placement drives with complete details',
    icon: History,
    path: '/student/drives',
  },
  {
    title: 'Interview Questions',
    description: 'Practice common interview questions for technical and HR rounds',
    icon: HelpCircle,
    path: '/student/questions',
  },
  {
    title: 'Preparation Guide',
    description: 'Comprehensive placement preparation resources',
    icon: BookOpen,
    path: '/student/preparation',
  },
  {
    title: 'AI Placement Mentor',
    description: 'Get personalized guidance from AI mentor',
    icon: Bot,
    path: '/student/ai',
  },
]

export default function Dashboard() {
  return (
    <div className="student-dashboard">
      <div className="student-dashboard-welcome">
        <div className="student-dashboard-welcome-text">
          <h1 className="student-dashboard-greeting">
            Welcome Back, Kiruthika <span className="student-dashboard-wave">👋</span>
          </h1>
          <p className="student-dashboard-subtitle">
            Continue your placement preparation journey. Stay consistent and achieve your dream career.
          </p>
        </div>
        <div className="student-dashboard-welcome-illustration">
          <div className="student-dashboard-illustration-icon">
            <Briefcase size={32} />
          </div>
        </div>
      </div>

      <div className="student-dashboard-section">
        <div className="student-dashboard-section-header">
          <h2 className="student-dashboard-section-title">Quick Access</h2>
          <Link to="/student/companies" className="student-dashboard-view-all">
            View All
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="student-dashboard-quick-access">
          {quickAccessItems.map((item) => (
            <QuickAccessCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
              path={item.path}
            />
          ))}
        </div>
      </div>

    </div>
  )
}
