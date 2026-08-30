import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Sparkles } from 'lucide-react'
import QuickAccessCard from '../../components/QuickAccessCard'
import KSRCELogo from '../../assets/KSRCE logo.jpg'
import StuBrowseCompany from '../../assets/stu_browse_company.svg'
import StuPreviousDrive from '../../assets/stu_previous_drive.svg'
import StuInterviewQuestions from '../../assets/stu_interview_questions.svg'
import StuPreparationGuide from '../../assets/stu_preparation_guide.svg'
import StuAiIcon from '../../assets/stu_Ai_icon.svg'

import './Dashboard.css'

const quickAccessItems = [
  {
    title: 'Browse Companies',
    description: 'Explore all recruiting companies and their details',
    icon: StuBrowseCompany,
    path: '/student/companies',
  },
  {
    title: 'Previous Drives',
    description: 'View past placement drives with complete details',
    icon: StuPreviousDrive,
    path: '/student/drives',
  },
  {
    title: 'Preparation Guide',
    description: 'Comprehensive placement preparation resources',
    icon: StuPreparationGuide,
    path: '/student/preparation',
  },
  {
    title: 'Interview Questions',
    description: 'Practice common interview questions for technical and HR rounds',
    icon: StuInterviewQuestions,
    path: '/student/questions',
  },
  {
    title: 'AI Placement Mentor',
    description: 'Get personalized guidance from AI mentor',
    icon: StuAiIcon,
    path: '/student/ai',
  },
]

export default function Dashboard() {
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const shown = sessionStorage.getItem('welcomeToastShown')
    if (!shown) {
      setShowWelcome(true)
      sessionStorage.setItem('welcomeToastShown', 'true')
      const timer = setTimeout(() => setShowWelcome(false), 7000)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div className="student-dashboard">
      {showWelcome && (
        <div className="welcome-toast">
          <div className="welcome-toast-icon"><Sparkles size={20} /></div>
          <div className="welcome-toast-content">
            <p className="welcome-toast-title">Welcome to CampusIQ!</p>
            <p className="welcome-toast-message">Explore the dashboard to continue your placement preparation.</p>
          </div>
        </div>
      )}

      <div className="student-dashboard-college-header">
        <img src={KSRCELogo} alt="KSRCE Logo" className="student-dashboard-college-logo" />
        <span className="student-dashboard-college-name">
          K S R COLLEGE OF ENGINEERING <span className="student-dashboard-college-autonomous">(Autonomous)</span> – 637215
        </span>
      </div>

      <div className="student-dashboard-section">
        <div className="student-dashboard-section-header">
          <h2 className="student-dashboard-section-title">Quick Access</h2>
          <Link to="/student/companies" className="student-dashboard-view-all">
            View All
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="student-dashboard-quick-access-top">
          {quickAccessItems.slice(0, 3).map((item) => (
            <QuickAccessCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
              path={item.path}
            />
          ))}
        </div>
        <div className="student-dashboard-quick-access-bottom">
          {quickAccessItems.slice(3).map((item) => (
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
