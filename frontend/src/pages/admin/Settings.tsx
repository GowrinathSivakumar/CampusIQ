import { useState, useEffect } from 'react'
import { Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import {
  getPreferences,
  updatePreferences,
  getProfile,
  updateProfile,
  type Preferences,
} from '../../services/settingsService'
import './Settings.css'

interface SaveState {
  status: 'idle' | 'success' | 'error'
  message: string
}

export default function Settings() {
  const [prefs, setPrefs] = useState<Preferences | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveState, setSaveState] = useState<SaveState>({ status: 'idle', message: '' })

  useEffect(() => {
    let mounted = true

    async function fetchData() {
      try {
        setLoading(true)
        const [p, prof] = await Promise.all([getPreferences(), getProfile()])
        if (!mounted) return
        setPrefs(p)
        setName(prof.name)
        setEmail(prof.email)
      } catch {
        if (mounted) {
          setPrefs(null)
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchData()
    return () => {
      mounted = false
    }
  }, [])

  const setPref = (key: keyof Preferences, value: boolean) => {
    setPrefs((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  const handleSavePreferences = async () => {
    if (!prefs) return
    try {
      setSaving(true)
      await updatePreferences({
        emailNotifications: prefs.emailNotifications,
        autoPublish: prefs.autoPublish,
        analyticsTracking: prefs.analyticsTracking,
      })
      setSaveState({ status: 'success', message: 'Preferences saved successfully' })
    } catch {
      setSaveState({ status: 'error', message: 'Failed to save preferences' })
    } finally {
      setSaving(false)
      setTimeout(() => setSaveState({ status: 'idle', message: '' }), 3000)
    }
  }

  const handleSaveProfile = async () => {
    try {
      setSaving(true)
      await updateProfile({ name: name.trim(), email: email.trim() })
      setSaveState({ status: 'success', message: 'Profile updated successfully' })
    } catch {
      setSaveState({ status: 'error', message: 'Failed to update profile' })
    } finally {
      setSaving(false)
      setTimeout(() => setSaveState({ status: 'idle', message: '' }), 3000)
    }
  }

  if (loading) {
    return (
      <div className="settings-page">
        <div className="settings-card">
          <p style={{ textAlign: 'center', color: 'var(--color-gray-400)' }}>Loading settings...</p>
        </div>
      </div>
    )
  }

  const preferences = prefs ?? {
    emailNotifications: true,
    autoPublish: false,
    analyticsTracking: true,
    theme: 'light' as const,
    notificationPrefs: true,
    privacy: true,
  }

  const toggleRows = [
    {
      label: 'Email Notifications',
      desc: 'Receive email notifications for new drives',
      key: 'emailNotifications' as const,
    },
    {
      label: 'Auto-publish Content',
      desc: 'Automatically publish uploaded content',
      key: 'autoPublish' as const,
    },
    {
      label: 'Analytics Tracking',
      desc: 'Enable placement analytics tracking',
      key: 'analyticsTracking' as const,
    },
  ]

  return (
    <div className="settings-page">
      <div className="settings-card">
        <section className="settings-section">
          <h2>Profile Information</h2>
          <div className="settings-grid">
            <div className="settings-field">
              <label htmlFor="settings-name">Full Name</label>
              <input
                id="settings-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="settings-field">
              <label htmlFor="settings-email">Email Address</label>
              <input
                id="settings-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <button className="settings-save-btn" onClick={handleSaveProfile} disabled={saving}>
              {saving ? <Loader2 size={16} className="settings-spinner" /> : <Save size={16} />}
              Save Profile
            </button>
          </div>
        </section>

        <section className="settings-section">
          <h2>System Preferences</h2>
          <div className="settings-preferences-list">
            {toggleRows.map((row) => (
              <div key={row.key} className="settings-preference">
                <div className="settings-preference-info">
                  <p>{row.label}</p>
                  <p>{row.desc}</p>
                </div>
                <label className="settings-toggle">
                  <input
                    type="checkbox"
                    checked={preferences[row.key]}
                    onChange={(e) => setPref(row.key, e.target.checked)}
                  />
                  <div className="settings-toggle-track">
                    <div className="settings-toggle-thumb" />
                  </div>
                </label>
              </div>
            ))}
          </div>
        </section>

        <div>
          <button className="settings-save-btn" onClick={handleSavePreferences} disabled={saving}>
            {saving ? <Loader2 size={16} className="settings-spinner" /> : <Save size={16} />}
            Save Changes
          </button>
          {saveState.status !== 'idle' && (
            <span
              className={`settings-save-message ${saveState.status === 'success' ? 'settings-save-message--success' : 'settings-save-message--error'}`}
            >
              {saveState.status === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              {saveState.message}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
