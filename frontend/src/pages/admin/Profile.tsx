import { UserCircle, Mail, Shield, Calendar } from 'lucide-react'
import './Profile.css'

export default function Profile() {
  return (
    <div className="profile-page">
      <div>
        <h1>Profile</h1>
        <p>Your admin account details</p>
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
    </div>
  )
}
