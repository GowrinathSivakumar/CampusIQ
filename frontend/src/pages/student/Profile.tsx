import { UserCircle, Mail, GraduationCap, Calendar, Target, Bookmark, History, Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Profile.css'

const recentCompanies = [
  { id: 1, name: 'Zoho Corporation' },
  { id: 2, name: 'Amazon' },
  { id: 3, name: 'TCS' },
]

export default function Profile() {
  return (
    <div className="profile-page">
      <div className="profile-page-header">
        <h1 className="profile-page-title">My Profile</h1>
        <p className="profile-page-subtitle">Manage your student profile and preferences</p>
      </div>

      <div className="profile-page-grid">
        <div className="profile-page-main">
          <div className="profile-page-card profile-page-avatar-card">
            <div className="profile-page-avatar">
              <img
                src="https://ui-avatars.com/api/?name=Kiruthika&background=2563eb&color=fff&size=80"
                alt="Profile"
              />
            </div>
            <div className="profile-page-avatar-info">
              <h2 className="profile-page-name">Kiruthika</h2>
              <p className="profile-page-email">kiruthika@student.edu</p>
              <div className="profile-page-badge">Student</div>
            </div>
          </div>

          <div className="profile-page-card">
            <h3 className="profile-page-card-title">Personal Information</h3>
            <div className="profile-page-info-grid">
              <div className="profile-page-info-item">
                <Mail size={16} />
                <div className="profile-page-info-content">
                  <span className="profile-page-info-label">Email Address</span>
                  <span className="profile-page-info-value">kiruthika@student.edu</span>
                </div>
              </div>
              <div className="profile-page-info-item">
                <GraduationCap size={16} />
                <div className="profile-page-info-content">
                  <span className="profile-page-info-label">Department</span>
                  <span className="profile-page-info-value">Computer Science & Engineering</span>
                </div>
              </div>
              <div className="profile-page-info-item">
                <Calendar size={16} />
                <div className="profile-page-info-content">
                  <span className="profile-page-info-label">Academic Year</span>
                  <span className="profile-page-info-value">2024 - 2025</span>
                </div>
              </div>
              <div className="profile-page-info-item">
                <Target size={16} />
                <div className="profile-page-info-content">
                  <span className="profile-page-info-label">Target Company</span>
                  <span className="profile-page-info-value">Zoho Corporation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-page-card">
            <h3 className="profile-page-card-title">Recently Viewed Companies</h3>
            <div className="profile-page-recent">
              {recentCompanies.map((company) => (
                <Link
                  key={company.id}
                  to={`/student/company/${company.id}`}
                  className="profile-page-recent-item"
                >
                  <div className="profile-page-recent-icon">
                    <Building2 size={16} />
                  </div>
                  <span>{company.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="profile-page-sidebar">
          <div className="profile-page-card">
            <h3 className="profile-page-card-title">Stats</h3>
            <div className="profile-page-stats">
              <div className="profile-page-stat">
                <div className="profile-page-stat-icon bookmark">
                  <Bookmark size={18} />
                </div>
                <div className="profile-page-stat-info">
                  <span className="profile-page-stat-value">8</span>
                  <span className="profile-page-stat-label">Saved Bookmarks</span>
                </div>
              </div>
              <div className="profile-page-stat">
                <div className="profile-page-stat-icon history">
                  <History size={18} />
                </div>
                <div className="profile-page-stat-info">
                  <span className="profile-page-stat-value">12</span>
                  <span className="profile-page-stat-label">Companies Viewed</span>
                </div>
              </div>
              <div className="profile-page-stat">
                <div className="profile-page-stat-icon questions">
                  <Target size={18} />
                </div>
                <div className="profile-page-stat-info">
                  <span className="profile-page-stat-value">5</span>
                  <span className="profile-page-stat-label">Target Companies</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-page-card">
            <h3 className="profile-page-card-title">Quick Links</h3>
            <div className="profile-page-links">
              <Link to="/student/bookmarks" className="profile-page-link">
                <Bookmark size={16} />
                View Bookmarks
              </Link>
              <Link to="/student/settings" className="profile-page-link">
                <UserCircle size={16} />
                Account Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
