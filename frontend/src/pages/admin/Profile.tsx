import { UserCircle, Mail, Shield, Calendar, Settings, Save } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Profile.css'
import './Settings.css'

export default function Profile() {
  return (
    <div className="profile-page">
      <div className="profile-header-row">
        <div>
          <h1>Profile</h1>
          <p>Your admin account details</p>
        </div>
        <Link to="/admin/settings" className="profile-settings-btn">
          <Settings size={20} />
        </Link>
      </div>

      <div className="profile-grid">
        <div className="profile-card profile-card-centered">
          <div className="profile-avatar">A</div>
          <h2 className="profile-name">Admin User</h2>
          <p className="profile-role">Super Admin</p>
          <div className="profile-status">
            <Shield size={12} />
            Active Account
          </div>
        </div>

        <div className="profile-card">
          <h3 className="profile-section-title">Account Information</h3>
          <div className="profile-info-list">
            {[
              { icon: UserCircle, label: 'Full Name', value: 'Admin User' },
              { icon: Mail, label: 'Email', value: 'admin@campusiq.com' },
              { icon: Shield, label: 'Role', value: 'Super Admin' },
              { icon: Calendar, label: 'Member Since', value: 'January 2026' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="profile-info-item">
                  <div className="profile-info-icon"><Icon size={16} /></div>
                  <div>
                    <p className="profile-info-label">{item.label}</p>
                    <p className="profile-info-value">{item.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="settings-card">
        <section className="settings-section">
          <h2>Profile Information</h2>
          <div className="settings-grid">
            <div className="settings-field">
              <label>Full Name</label>
              <input type="text" defaultValue="Admin User" />
            </div>
            <div className="settings-field">
              <label>Email</label>
              <input type="email" defaultValue="admin@campusiq.com" />
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h2>System Preferences</h2>
          <div className="settings-preferences-list">
            {[
              { label: 'Email Notifications', desc: 'Receive email notifications for new drives' },
              { label: 'Auto-publish Content', desc: 'Automatically publish uploaded content' },
              { label: 'Analytics Tracking', desc: 'Enable placement analytics tracking' },
            ].map((pref) => (
              <div key={pref.label} className="settings-preference">
                <div className="settings-preference-info">
                  <p>{pref.label}</p>
                  <p>{pref.desc}</p>
                </div>
                <label className="settings-toggle">
                  <input type="checkbox" defaultChecked />
                  <div className="settings-toggle-track">
                    <div className="settings-toggle-thumb" />
                  </div>
                </label>
              </div>
            ))}
          </div>
        </section>

        <div>
          <button className="settings-save-btn">
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
