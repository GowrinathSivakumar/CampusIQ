import { UserCircle, Mail, Shield, Calendar, Settings, Save, ChevronRight, Bell, Upload, BarChart3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Profile.css'

const accountInfo = [
  { icon: UserCircle, label: 'Full Name', value: 'Admin User' },
  { icon: Mail, label: 'Email', value: 'admin@campusiq.com' },
  { icon: Shield, label: 'Role', value: 'Super Admin' },
  { icon: Calendar, label: 'Member Since', value: 'January 2026' },
]

const preferences = [
  { icon: Bell, label: 'Email Notifications', desc: 'Receive email notifications for new drives' },
  { icon: Upload, label: 'Auto-publish Content', desc: 'Automatically publish uploaded content' },
  { icon: BarChart3, label: 'Analytics Tracking', desc: 'Enable placement analytics tracking' },
]

export default function Profile() {
  return (
    <div className="admin-profile-page">
      <div className="admin-profile-header">
        <div>
          <h1 className="admin-profile-title">Profile</h1>
          <p className="admin-profile-subtitle">Your admin account details</p>
        </div>
        <Link to="/admin/settings" className="admin-profile-settings-btn">
          <Settings size={20} />
        </Link>
      </div>

      <div className="admin-profile-card">
        <div className="admin-profile-avatar-section">
          <div className="admin-profile-avatar">A</div>
          <div className="admin-profile-avatar-info">
            <h2 className="admin-profile-name">Admin User</h2>
            <p className="admin-profile-role">Super Admin</p>
            <div className="admin-profile-status">Active Account</div>
          </div>
        </div>

        <div className="admin-profile-divider" />

        <h3 className="admin-profile-card-title">Account Information</h3>
        <div className="admin-profile-info-list">
          {accountInfo.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="admin-profile-info-item">
                <div className="admin-profile-info-icon"><Icon size={16} /></div>
                <div className="admin-profile-info-content">
                  <span className="admin-profile-info-label">{item.label}</span>
                  <span className="admin-profile-info-value">{item.value}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="admin-profile-divider" />

        <h3 className="admin-profile-card-title">Profile Information</h3>
        <div className="admin-profile-fields">
          <div className="admin-profile-field">
            <label>Full Name</label>
            <input type="text" defaultValue="Admin User" />
          </div>
          <div className="admin-profile-field">
            <label>Email</label>
            <input type="email" defaultValue="admin@campusiq.com" />
          </div>
        </div>

        <div className="admin-profile-divider" />

        <h3 className="admin-profile-card-title">System Preferences</h3>
        <div className="admin-profile-prefs-list">
          {preferences.map((pref) => {
            const Icon = pref.icon
            return (
              <div key={pref.label} className="admin-profile-pref-item">
                <div className="admin-profile-pref-icon">
                  <Icon size={18} />
                </div>
                <div className="admin-profile-pref-content">
                  <span className="admin-profile-pref-title">{pref.label}</span>
                  <span className="admin-profile-pref-desc">{pref.desc}</span>
                </div>
                <label className="admin-profile-toggle">
                  <input type="checkbox" defaultChecked />
                  <div className="admin-profile-toggle-track">
                    <div className="admin-profile-toggle-thumb" />
                  </div>
                </label>
              </div>
            )
          })}
        </div>

        <button className="admin-profile-save-btn">
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </div>
  )
}
