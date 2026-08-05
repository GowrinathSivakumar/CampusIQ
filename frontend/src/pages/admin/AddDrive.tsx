import { useState, useMemo, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  History,
  Building2,
  Briefcase,
  CalendarDays,
  Users,
  IndianRupee,
  Hash,
  Layers,
  FileText,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { createDrive } from '../../services/driveService'
import './AddDrive.css'

interface DriveForm {
  companyName: string
  role: string
  date: string
  studentsPlaced: string
  package: string
  rounds: string
  department: string
  description: string
}

interface FormErrors {
  companyName?: string
  role?: string
  date?: string
  studentsPlaced?: string
  rounds?: string
  description?: string
}

const DEPARTMENT_OPTIONS = [
  'All',
  'CSE',
  'IT',
  'CSE, IT',
  'ECE',
  'EEE',
  'Mechanical',
  'Civil',
]

export default function AddDrive() {
  const navigate = useNavigate()

  const [form, setForm] = useState<DriveForm>({
    companyName: '',
    role: '',
    date: '',
    studentsPlaced: '',
    package: '',
    rounds: '3',
    department: 'All',
    description: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const completionPct = useMemo(() => {
    let filled = 0
    const total = 5
    if (form.companyName.trim()) filled++
    if (form.role.trim()) filled++
    if (form.date) filled++
    if (form.studentsPlaced) filled++
    if (form.package.trim()) filled++
    return Math.round((filled / total) * 100)
  }, [form.companyName, form.role, form.date, form.studentsPlaced, form.package])

  const setField = (field: keyof DriveForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const validate = (): boolean => {
    const errs: FormErrors = {}

    if (!form.companyName.trim()) {
      errs.companyName = 'Company name is required'
    } else if (form.companyName.trim().length < 2) {
      errs.companyName = 'Company name must be at least 2 characters'
    }

    if (!form.role.trim()) {
      errs.role = 'Role is required'
    } else if (form.role.trim().length < 2) {
      errs.role = 'Role must be at least 2 characters'
    }

    if (!form.date) {
      errs.date = 'Drive date is required'
    } else {
      const selected = new Date(form.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selected.getTime() > today.getTime()) {
        errs.date = 'Drive date cannot be in the future'
      }
    }

    if (form.studentsPlaced && (isNaN(Number(form.studentsPlaced)) || Number(form.studentsPlaced) < 0)) {
      errs.studentsPlaced = 'Enter a valid number of students placed'
    }

    if (form.rounds && (isNaN(Number(form.rounds)) || Number(form.rounds) < 1)) {
      errs.rounds = 'Rounds must be at least 1'
    }

    if (form.description.length > 1000) {
      errs.description = 'Description must be under 1000 characters'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')

    const allTouched: Record<string, boolean> = {}
    Object.keys(form).forEach((k) => (allTouched[k] = true))
    setTouched(allTouched)

    if (!validate()) return

    setSubmitting(true)

    try {
      await createDrive({
        companyName: form.companyName.trim(),
        role: form.role.trim(),
        date: new Date(form.date).toISOString(),
        studentsPlaced: form.studentsPlaced ? Number(form.studentsPlaced) : 0,
        package: form.package.trim(),
        rounds: form.rounds ? Number(form.rounds) : 3,
        department: form.department,
        description: form.description.trim(),
      })
      setSubmitStatus('success')
      setTimeout(() => navigate('/admin/drives'), 1000)
    } catch {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setForm({
      companyName: '',
      role: '',
      date: '',
      studentsPlaced: '',
      package: '',
      rounds: '3',
      department: 'All',
      description: '',
    })
    setErrors({})
    setTouched({})
    setSubmitStatus('idle')
  }

  return (
    <div className="add-drive-page">
      <div className="add-drive-header">
        <button
          className="add-drive-back"
          onClick={() => navigate('/admin/drives')}
          type="button"
        >
          <ArrowLeft size={16} />
          Back to Previous Drives
        </button>
        <div className="add-drive-title-row">
          <div className="add-drive-title-icon">
            <History size={20} />
          </div>
          <div>
            <h1 className="add-drive-title">Upload Previous Drive</h1>
            <p className="add-drive-subtitle">Add a past placement drive to the college records</p>
          </div>
        </div>
        <div className="add-drive-progress">
          <div className="add-drive-progress-track">
            <div className="add-drive-progress-fill" style={{ width: `${completionPct}%` }} />
          </div>
          <span className="add-drive-progress-label">{completionPct}% complete</span>
        </div>
      </div>

      <form className="add-drive-form" onSubmit={handleSubmit} noValidate>
        <div className="add-drive-card">
          <div className="add-drive-card-header">
            <Briefcase size={16} className="add-drive-card-icon" />
            <h2>Drive Information</h2>
          </div>

          <div className="add-drive-grid">
            <div className="add-drive-field add-drive-field--full">
              <label className="add-drive-label">
                Company Name
                <span className="add-drive-required">*</span>
              </label>
              <div className="add-drive-input-wrapper">
                <Building2 size={15} className="add-drive-input-icon" />
                <input
                  type="text"
                  className={`add-drive-input ${errors.companyName && touched.companyName ? 'add-drive-input--error' : ''}`}
                  placeholder="e.g., TCS, Infosys, Google"
                  value={form.companyName}
                  onChange={(e) => setField('companyName', e.target.value)}
                  onBlur={() => markTouched('companyName')}
                />
              </div>
              {errors.companyName && touched.companyName && (
                <span className="add-drive-error">
                  <AlertCircle size={12} />
                  {errors.companyName}
                </span>
              )}
            </div>

            <div className="add-drive-field">
              <label className="add-drive-label">
                Role
                <span className="add-drive-required">*</span>
              </label>
              <div className="add-drive-input-wrapper">
                <Briefcase size={15} className="add-drive-input-icon" />
                <input
                  type="text"
                  className={`add-drive-input ${errors.role && touched.role ? 'add-drive-input--error' : ''}`}
                  placeholder="e.g., Software Engineer, System Analyst"
                  value={form.role}
                  onChange={(e) => setField('role', e.target.value)}
                  onBlur={() => markTouched('role')}
                />
              </div>
              {errors.role && touched.role && (
                <span className="add-drive-error">
                  <AlertCircle size={12} />
                  {errors.role}
                </span>
              )}
            </div>

            <div className="add-drive-field">
              <label className="add-drive-label">
                Drive Date
                <span className="add-drive-required">*</span>
              </label>
              <div className="add-drive-input-wrapper">
                <CalendarDays size={15} className="add-drive-input-icon" />
                <input
                  type="date"
                  className={`add-drive-input ${errors.date && touched.date ? 'add-drive-input--error' : ''}`}
                  value={form.date}
                  onChange={(e) => setField('date', e.target.value)}
                  onBlur={() => markTouched('date')}
                />
              </div>
              {errors.date && touched.date && (
                <span className="add-drive-error">
                  <AlertCircle size={12} />
                  {errors.date}
                </span>
              )}
            </div>

            <div className="add-drive-field">
              <label className="add-drive-label">Students Placed</label>
              <div className="add-drive-input-wrapper">
                <Users size={15} className="add-drive-input-icon" />
                <input
                  type="text"
                  inputMode="numeric"
                  className={`add-drive-input ${errors.studentsPlaced && touched.studentsPlaced ? 'add-drive-input--error' : ''}`}
                  placeholder="e.g., 45"
                  value={form.studentsPlaced}
                  onChange={(e) => setField('studentsPlaced', e.target.value.replace(/[^0-9]/g, ''))}
                  onBlur={() => markTouched('studentsPlaced')}
                />
              </div>
              {errors.studentsPlaced && touched.studentsPlaced && (
                <span className="add-drive-error">
                  <AlertCircle size={12} />
                  {errors.studentsPlaced}
                </span>
              )}
            </div>

            <div className="add-drive-field">
              <label className="add-drive-label">Package (LPA)</label>
              <div className="add-drive-input-wrapper">
                <IndianRupee size={15} className="add-drive-input-icon" />
                <input
                  type="text"
                  className="add-drive-input"
                  placeholder="e.g., 12 LPA"
                  value={form.package}
                  onChange={(e) => setField('package', e.target.value)}
                />
              </div>
            </div>

            <div className="add-drive-field">
              <label className="add-drive-label">Number of Rounds</label>
              <div className="add-drive-input-wrapper">
                <Hash size={15} className="add-drive-input-icon" />
                <input
                  type="text"
                  inputMode="numeric"
                  className={`add-drive-input ${errors.rounds && touched.rounds ? 'add-drive-input--error' : ''}`}
                  placeholder="e.g., 3"
                  value={form.rounds}
                  onChange={(e) => setField('rounds', e.target.value.replace(/[^0-9]/g, ''))}
                  onBlur={() => markTouched('rounds')}
                />
              </div>
              {errors.rounds && touched.rounds && (
                <span className="add-drive-error">
                  <AlertCircle size={12} />
                  {errors.rounds}
                </span>
              )}
            </div>

            <div className="add-drive-field">
              <label className="add-drive-label">Eligible Departments</label>
              <div className="add-drive-input-wrapper">
                <Layers size={15} className="add-drive-input-icon" />
                <select
                  className="add-drive-input add-drive-select"
                  value={form.department}
                  onChange={(e) => setField('department', e.target.value)}
                >
                  {DEPARTMENT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="add-drive-field add-drive-field--full">
              <label className="add-drive-label">Description</label>
              <div className="add-drive-input-wrapper add-drive-input-wrapper--textarea">
                <FileText size={15} className="add-drive-input-icon add-drive-input-icon--top" />
                <textarea
                  className={`add-drive-input add-drive-textarea ${errors.description && touched.description ? 'add-drive-input--error' : ''}`}
                  placeholder="Eligibility criteria, selection process, or any notes about the drive..."
                  rows={4}
                  maxLength={1000}
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                  onBlur={() => markTouched('description')}
                />
              </div>
              <div className="add-drive-textarea-footer">
                {errors.description && touched.description && (
                  <span className="add-drive-error">
                    <AlertCircle size={12} />
                    {errors.description}
                  </span>
                )}
                <span className="add-drive-char-count">{form.description.length}/1000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="add-drive-actions">
          <button
            type="button"
            className="add-drive-btn add-drive-btn--cancel"
            onClick={() => navigate('/admin/drives')}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="add-drive-btn add-drive-btn--reset"
            onClick={handleReset}
            disabled={submitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className={`add-drive-btn add-drive-btn--submit ${submitStatus === 'success' ? 'add-drive-btn--success' : ''} ${submitStatus === 'error' ? 'add-drive-btn--error' : ''}`}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 size={15} className="add-drive-spinner" />
                Uploading Drive...
              </>
            ) : submitStatus === 'success' ? (
              <>
                <CheckCircle2 size={15} />
                Drive Uploaded
              </>
            ) : submitStatus === 'error' ? (
              <>
                <AlertCircle size={15} />
                Failed, Try Again
              </>
            ) : (
              <>
                <Upload size={15} />
                Upload Drive
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
