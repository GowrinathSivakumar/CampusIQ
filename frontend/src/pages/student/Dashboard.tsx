import { Link } from 'react-router-dom'
import {
  Building2,
  History,
  HelpCircle,
  Bookmark,
  Briefcase,
  Code2,
  Users,
  Bot,
  BookOpen,
  ChevronRight,
} from 'lucide-react'
import StudentCard from '../../components/StudentCard'
import QuickAccessCard from '../../components/QuickAccessCard'
import CompanyCard from '../../components/CompanyCard'
import './Dashboard.css'

interface RecentCompany {
  id: number
  name: string
  lastViewed: string
}

const stats = [
  {
    title: 'Companies Available',
    value: 10,
    icon: Building2,
    description: 'Active recruiting partners',
    accentColor: 'var(--student-500)',
  },
  {
    title: 'Completed Drives',
    value: 6,
    icon: History,
    description: 'Past placement drives',
    accentColor: 'var(--color-emerald-600)',
  },
  {
    title: 'Interview Questions',
    value: 48,
    icon: HelpCircle,
    description: 'Across all categories',
    accentColor: 'var(--color-amber-600)',
  },
  {
    title: 'Bookmarked Companies',
    value: 4,
    icon: Bookmark,
    description: 'Saved for later',
    accentColor: 'var(--color-purple-600)',
  },
]

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
    title: 'Technical Questions',
    description: 'Practice technical interview questions',
    icon: Code2,
    path: '/student/questions',
  },
  {
    title: 'Coding Questions',
    description: 'Solve coding problems from previous drives',
    icon: Briefcase,
    path: '/student/questions',
  },
  {
    title: 'HR Questions',
    description: 'Prepare for HR interview rounds',
    icon: Users,
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

const recentCompanies: RecentCompany[] = [
  { id: 1, name: 'Zoho Corporation', lastViewed: '2 hours ago' },
  { id: 2, name: 'TCS Digital', lastViewed: 'Yesterday' },
  { id: 3, name: 'Amazon', lastViewed: '2 days ago' },
  { id: 4, name: 'Google', lastViewed: '5 days ago' },
  { id: 5, name: 'Microsoft', lastViewed: '1 week ago' },
]

const featuredCompanies = [
  { id: 1, name: 'Zoho Corporation', drives: 4 },
  { id: 2, name: 'TCS', drives: 6 },
  { id: 3, name: 'Amazon', drives: 3 },
  { id: 4, name: 'Google', drives: 2 },
  { id: 5, name: 'Microsoft', drives: 3 },
  { id: 6, name: 'Infosys', drives: 5 },
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

      <div className="student-dashboard-stats">
        {stats.map((stat) => (
          <StudentCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            description={stat.description}
            accentColor={stat.accentColor}
          />
        ))}
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

      <div className="student-dashboard-grid">
        <div className="student-dashboard-section">
          <div className="student-dashboard-section-header">
            <h2 className="student-dashboard-section-title">Recently Viewed</h2>
            <Link to="/student/companies" className="student-dashboard-view-all">
              View All
              <ChevronRight size={16} />
            </Link>
          </div>
          <div className="student-dashboard-recent">
            {recentCompanies.map((company) => (
              <Link
                key={company.id}
                to={`/student/company/${company.id}`}
                className="student-dashboard-recent-card"
              >
                <div className="student-dashboard-recent-card-header">
                  <div className="student-dashboard-recent-avatar">
                    {company.name.charAt(0)}
                  </div>
                  <div className="student-dashboard-recent-info">
                    <span className="student-dashboard-recent-name">{company.name}</span>
                    <span className="student-dashboard-recent-time">{company.lastViewed}</span>
                  </div>
                </div>
                <span className="student-dashboard-recent-cta">
                  View Details
                  <ChevronRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="student-dashboard-section">
          <div className="student-dashboard-section-header">
            <h2 className="student-dashboard-section-title">Featured Companies</h2>
            <Link to="/student/companies" className="student-dashboard-view-all">
              View All
              <ChevronRight size={16} />
            </Link>
          </div>
          <div className="student-dashboard-featured">
            {featuredCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                id={company.id}
                name={company.name}
                drives={company.drives}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
