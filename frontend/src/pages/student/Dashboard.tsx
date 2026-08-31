import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
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
    description: 'Explore all recruiting companies, view their details, open positions and eligibility criteria to shortlist your best matches.',
    icon: StuBrowseCompany,
    path: '/student/companies',
  },
  {
    title: 'Previous Drives',
    description: 'View past placement drives with complete details including selection process, rounds conducted and final placements.',
    icon: StuPreviousDrive,
    path: '/student/drives',
  },
  {
    title: 'Preparation Guide',
    description: 'Access comprehensive placement preparation resources covering aptitude, reasoning and technical fundamentals.',
    icon: StuPreparationGuide,
    path: '/student/preparation',
  },
  {
    title: 'Interview Questions',
    description: 'Practice common interview questions for technical and HR rounds asked by top recruiting companies.',
    icon: StuInterviewQuestions,
    path: '/student/questions',
  },
  {
    title: 'AI Placement Mentor',
    description: 'Get personalized guidance, resume feedback and mock interview support from your AI mentor anytime.',
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
          <div className="quick-access-card placement-percentage-card">
            <div className="placement-percentage-content">
              <h3 className="placement-percentage-title">Placement Percentage</h3>
              <div className="placement-percentage-value">94%</div>
              <p className="placement-percentage-desc">of eligible students placed in the latest campus recruitment drive</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
