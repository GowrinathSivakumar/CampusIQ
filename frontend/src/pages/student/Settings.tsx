import { useState, useEffect } from 'react'
import {
  Settings as SettingsIcon,
  Lock,
  Palette,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  UserCircle,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  getPreferences,
  updatePreferences,
  changePassword,
  type Preferences,
} from '../../services/settingsService'
import './Settings.css'

const DEFAULT_PREFS: Preferences = {
  emailNotifications: true,
  autoPublish: false,
  analyticsTracking: true,
  theme: 'light',
  notificationPrefs: true,
  privacy: true,
}

export default function Settings() {
  const [prefs, setPrefs] = useState<Preferences>(DEFAULT_PREFS)
  const [loading, setLoading] = useState(true)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordBusy, setPasswordBusy] = useState(false)
  const [passwordState, setPasswordState] = useState<'idle' | 'success' | 'error'>('idle')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    let mounted = true

    async function fetchPrefs() {
      try {
        setLoading(true)
        const data = await getPreferences()
        if (mounted) setPrefs(data)
      } catch {
        if (mounted) setPrefs(DEFAULT_PREFS)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchPrefs()
    return () => {
      mounted = false
    }
  }, [])

  const savePref = async (patch: Partial<Preferences>) => {
    const next = { ...prefs, ...patch }
    setPrefs(next)
    try {
      await updatePreferences(patch)
    } catch {
      // keep local state, silently fail
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')

    if (!currentPassword || !newPassword) {
      setPasswordError('Please fill in both password fields.')
      return
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.')
      return
    }

    setPasswordBusy(true)
    try {
      await changePassword({ currentPassword, newPassword })
      setPasswordState('success')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err: unknown) {
      setPasswordState('error')
      setPasswordError(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          'Failed to change password. Please check your current password.'
      )
    } finally {
      setPasswordBusy(false)
      setTimeout(() => setPasswordState('idle'), 3000)
    }
  }

  const settingsSections = [
    {
      title: 'Change Password',
      description: 'Update your account password to keep your account secure',
      icon: Lock,
      color: 'var(--student-500)',
      content: (
        <form className="settings-page-form" onSubmit={handleChangePassword}>
          <div className="settings-page-field">
            <label htmlFor="sp-current">Current Password</label>
            <input
              id="sp-current"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="settings-page-field">
            <label htmlFor="sp-new">New Password</label>
            <input
              id="sp-new"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="settings-page-field">
            <label htmlFor="sp-confirm">Confirm New Password</label>
            <input
              id="sp-confirm"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {passwordError && (
            <p className="settings-page-form-message settings-page-form-message--error">
              <AlertCircle size={14} />
              {passwordError}
            </p>
          )}
          {passwordState === 'success' && (
            <p className="settings-page-form-message settings-page-form-message--success">
              <CheckCircle2 size={14} />
              Password changed successfully
            </p>
          )}
          <button type="submit" className="settings-page-form-btn" disabled={passwordBusy}>
            {passwordBusy ? <Loader2 size={16} className="settings-page-spinner" /> : <Lock size={16} />}
            Update Password
          </button>
        </form>
      ),
    },
    {
      title: 'Theme Settings',
      description: 'Customize the appearance of your dashboard',
      icon: Palette,
      color: 'var(--color-purple-600)',
      content: (
        <div className="settings-page-preference">
          <select
            className="settings-page-select"
            value={prefs.theme}
            onChange={(e) => savePref({ theme: e.target.value as Preferences['theme'] })}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
          <ChevronRight size={16} className="settings-page-preference-icon" />
        </div>
      ),
    },
    {
      title: 'Notification Preferences',
      description: 'Manage email and push notification preferences',
      icon: Bell,
      color: 'var(--color-amber-600)',
      content: (
        <label className="settings-page-switch">
          <input
            type="checkbox"
            checked={prefs.notificationPrefs}
            onChange={(e) => savePref({ notificationPrefs: e.target.checked })}
          />
          <span className="settings-page-switch-track">
            <span className="settings-page-switch-thumb" />
          </span>
          <span className="settings-page-switch-label">
            {prefs.notificationPrefs ? 'Enabled' : 'Disabled'}
          </span>
        </label>
      ),
    },
    {
      title: 'Privacy Settings',
      description: 'Control your privacy and data sharing preferences',
      icon: Shield,
      color: 'var(--color-emerald-600)',
      content: (
        <label className="settings-page-switch">
          <input
            type="checkbox"
            checked={prefs.privacy}
            onChange={(e) => savePref({ privacy: e.target.checked })}
          />
          <span className="settings-page-switch-track">
            <span className="settings-page-switch-thumb" />
          </span>
          <span className="settings-page-switch-label">
            {prefs.privacy ? 'Protected' : 'Public'}
          </span>
        </label>
      ),
    },
  ]

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
          {loading ? (
            <div className="settings-page-card">
              <p style={{ textAlign: 'center', color: 'var(--color-gray-400)', width: '100%' }}>
                Loading settings...
              </p>
            </div>
          ) : (
            settingsSections.map((section) => {
              const Icon = section.icon
              return (
                <div key={section.title} className="settings-page-card">
                  <div className="settings-page-card-header">
                    <div className="settings-page-card-icon" style={{ background: `${section.color}15`, color: section.color }}>
                      <Icon size={22} />
                    </div>
                    <div className="settings-page-card-content">
                      <h3 className="settings-page-card-title">{section.title}</h3>
                      <p className="settings-page-card-desc">{section.description}</p>
                    </div>
                  </div>
                  <div className="settings-page-card-body">{section.content}</div>
                </div>
              )
            })
          )}
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
