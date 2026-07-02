import { Settings as SettingsIcon, Lock, Palette, Bell, Shield, LogOut, ChevronRight, UserCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Settings.css'

const settingsSections = [
  {
    title: 'Change Password',
    description: 'Update your account password to keep your account secure',
    icon: Lock,
    action: 'Update Password',
    color: 'var(--student-500)',
  },
  {
    title: 'Theme Settings',
    description: 'Customize the appearance of your dashboard',
    icon: Palette,
    action: 'Customize Theme',
    color: 'var(--color-purple-600)',
  },
  {
    title: 'Notification Preferences',
    description: 'Manage email and push notification preferences',
    icon: Bell,
    action: 'Manage Notifications',
    color: 'var(--color-amber-600)',
  },
  {
    title: 'Privacy Settings',
    description: 'Control your privacy and data sharing preferences',
    icon: Shield,
    action: 'Privacy Settings',
    color: 'var(--color-emerald-600)',
  },
]

export default function Settings() {
  return (
    <div className="settings-page">
      <div className="settings-page-header">
        <div>
          <h1 className="settings-page-title">Settings</h1>
          <p className="settings-page-subtitle">Manage your account preferences and settings</p>
        </div>
        <div className="settings-page-icon-header">
          <SettingsIcon size={20} />
        </div>
      </div>

      <div className="settings-page-grid">
        <div className="settings-page-main">
          {settingsSections.map((section) => {
            const Icon = section.icon
            return (
              <div key={section.title} className="settings-page-card">
                <div className="settings-page-card-icon" style={{ background: `${section.color}15`, color: section.color }}>
                  <Icon size={22} />
                </div>
                <div className="settings-page-card-content">
                  <h3 className="settings-page-card-title">{section.title}</h3>
                  <p className="settings-page-card-desc">{section.description}</p>
                </div>
                <button className="settings-page-card-btn">
                  <span>{section.action}</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )
          })}
        </div>

        <div className="settings-page-sidebar">
          <div className="settings-page-sidebar-card">
            <div className="settings-page-sidebar-header">
              <UserCircle size={20} />
              <h3 className="settings-page-sidebar-title">Account</h3>
            </div>
            <div className="settings-page-sidebar-info">
              <div className="settings-page-sidebar-row">
                <span className="settings-page-sidebar-label">Plan</span>
                <span className="settings-page-sidebar-value">Free Student</span>
              </div>
              <div className="settings-page-sidebar-row">
                <span className="settings-page-sidebar-label">Joined</span>
                <span className="settings-page-sidebar-value">August 2024</span>
              </div>
            </div>
          </div>

          <div className="settings-page-sidebar-card logout">
            <Link to="/" className="settings-page-logout-btn">
              <LogOut size={18} />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
