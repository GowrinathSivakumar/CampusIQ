import { Save } from 'lucide-react'
import './Settings.css'

export default function Settings() {
  return (
    <div className="settings-page">
      <div>
        <h1>Settings</h1>
        <p>Manage your admin preferences</p>
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
