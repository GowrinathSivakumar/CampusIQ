import {
  User,
  Mail,
  Hash,
  Shield,
  Building2,
  BookOpen,
  CalendarDays,
  Send,
  Target,
  Bookmark,
  Lock,
  Bell,
  Clock,
  type LucideIcon,
} from 'lucide-react'
import './ProfilePage.css'

/* ── Types ── */
interface ProfileField {
  icon: LucideIcon
  label: string
  value: string
}

interface Stat {
  icon: LucideIcon
  number: string
  label: string
}

interface ProfilePageProps {
  role: 'admin' | 'student'
}

/* ── Left-column field data ── */
const studentFields: ProfileField[] = [
  { icon: User, label: 'Full Name', value: 'Kiruthika' },
  { icon: Hash, label: 'Register Number', value: '2024CS0142' },
  { icon: Mail, label: 'Email', value: 'kiruthika@student.edu' },
  { icon: Building2, label: 'Department', value: 'Computer Science & Engineering' },
  { icon: BookOpen, label: 'Degree / Program', value: 'B.Tech Computer Science' },
  { icon: CalendarDays, label: 'Year of Study', value: '3rd Year' },
]

const adminFields: ProfileField[] = [
  { icon: User, label: 'Full Name', value: 'Admin User' },
  { icon: Hash, label: 'Admin ID', value: 'ADM-2026-001' },
  { icon: Mail, label: 'Email', value: 'admin@campusiq.com' },
  { icon: Shield, label: 'Role', value: 'Super Admin' },
]

/* ── Right-column stat data (student only) ── */
const studentStats: Stat[] = [
  { icon: Send, number: '14', label: 'Applications Sent' },
  { icon: CalendarDays, number: '3', label: 'Interviews Scheduled' },
  { icon: Target, number: '8', label: 'Tests Completed' },
  { icon: Bookmark, number: '22', label: 'Bookmarks Saved' },
]

/* ── Config per role ── */
const roleConfig = {
  student: {
    name: 'Kiruthika',
    initials: 'K',
    roleLabel: 'Student',
    fields: studentFields,
    stats: studentStats,
  },
  admin: {
    name: 'Admin User',
    initials: 'A',
    roleLabel: 'Administrator',
    fields: adminFields,
  },
}

/* ═══════════════════════════════════════════
   Component
   ═══════════════════════════════════════════ */
export default function ProfilePage({ role }: ProfilePageProps) {
  const c = roleConfig[role]
  const accentClass = `pf-accent`

  return (
    <div className={`pf pf--${role}`}>

      {/* ─────── LEFT COLUMN ─────── */}
      <div className="pf-col-left">
        <div className="pf-card">
          <div className={accentClass} />

          <div className="pf-header">
            <div className="pf-avatar">
              <span>{c.initials}</span>
            </div>
            <div className="pf-identity">
              <h1 className="pf-name">{c.name}</h1>
              <p className="pf-role">{c.roleLabel}</p>
            </div>
          </div>

          <div className="pf-divider" />

          <div className="pf-fields">
            {c.fields.map((f) => {
              const Icon = f.icon
              return (
                <div className="pf-row" key={f.label}>
                  <div className="pf-row-left">
                    <div className="pf-row-icon">
                      <Icon size={18} />
                    </div>
                    <span className="pf-row-label">{f.label}</span>
                  </div>
                  <span className="pf-row-value">{f.value}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ─────── RIGHT COLUMN ─────── */}
      <div className="pf-col-right">

        {/* ── Stats card (student only) ── */}
        {role === 'student' && (
          <div className="pf-card pf-side-card">
            <div className={accentClass} />
            <h3 className="pf-side-title">Progress Overview</h3>
            <div className="pf-stat-grid">
              {c.stats.map((s) => {
                const Icon = s.icon
                return (
                  <div className="pf-stat-tile" key={s.label}>
                    <div className="pf-stat-icon">
                      <Icon size={18} />
                    </div>
                    <span className="pf-stat-number">{s.number}</span>
                    <span className="pf-stat-label">{s.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Security / Settings card ── */}
        <div className="pf-card pf-side-card">
          <div className={accentClass} />
          <h3 className="pf-side-title">
            {role === 'admin' ? 'Account Security' : 'Account Settings'}
          </h3>

          <div className="pf-setting-rows">
            {/* Last login (admin only) */}
            {role === 'admin' && (
              <div className="pf-setting-row">
                <div className="pf-setting-left">
                  <Clock size={16} />
                  <span>Last login</span>
                </div>
                <span className="pf-setting-meta">Today, 9:14 AM</span>
              </div>
            )}

            {/* Change password */}
            <div className="pf-setting-row">
              <div className="pf-setting-left">
                <Lock size={16} />
                <span>Change Password</span>
              </div>
              <button className="pf-btn pf-btn-outline">Update</button>
            </div>

            {/* Toggle row */}
            <div className="pf-setting-row">
              <div className="pf-setting-left">
                {role === 'admin' ? <Shield size={16} /> : <Bell size={16} />}
                <span>
                  {role === 'admin' ? 'Two-Factor Auth' : 'Notifications'}
                </span>
              </div>
              <label className="pf-toggle">
                <input type="checkbox" defaultChecked={role === 'student'} />
                <span className="pf-toggle-track">
                  <span className="pf-toggle-thumb" />
                </span>
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
