import { useState, useRef, useMemo, type FormEvent, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Building2,
  Upload,
  X,
  Globe,
  MapPin,
  Tag,
  IndianRupee,
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Cpu,
} from 'lucide-react'
import './AddCompany.css'

interface CompanyForm {
  name: string
  logo: string | null
  logoFile: File | null
  type: string
  industry: string
  website: string
  location: string
  description: string
  package: string
  status: 'Active' | 'Inactive'
  tags: string[]
}

interface FormErrors {
  name?: string
  industry?: string
  website?: string
  package?: string
  description?: string
}

const INDUSTRY_OPTIONS = [
  'Information Technology',
  'Finance & Banking',
  'Healthcare',
  'E-Commerce',
  'Consulting',
  'Manufacturing',
  'Telecommunications',
  'Education',
  'Media & Entertainment',
  'Automobile',
  'Other',
]

export default function AddCompany() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<CompanyForm>({
    name: '',
    logo: null,
    logoFile: null,
    type: 'Software',
    industry: '',
    website: '',
    location: '',
    description: '',
    package: '',
    status: 'Active',
    tags: [],
  })

  const [tagInput, setTagInput] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const completionPct = useMemo(() => {
    let filled = 0
    let total = 7
    if (form.name.trim()) filled++
    if (form.industry) filled++
    if (form.website) filled++
    if (form.location) filled++
    if (form.package) filled++
    if (form.description.trim()) filled++
    if (form.tags.length > 0) filled++
    return Math.round((filled / total) * 100)
  }, [form.name, form.industry, form.website, form.location, form.package, form.description, form.tags])

  const setField = (field: keyof CompanyForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, name: prev.name }))
      return
    }

    const reader = new FileReader()
    reader.onload = (ev) => {
      setForm((prev) => ({
        ...prev,
        logo: ev.target?.result as string,
        logoFile: file,
      }))
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const removeLogo = () => {
    setForm((prev) => ({ ...prev, logo: null, logoFile: null }))
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const raw = tagInput.trim().replace(/,/g, '')
      if (raw && !form.tags.includes(raw) && form.tags.length < 8) {
        setForm((prev) => ({ ...prev, tags: [...prev.tags, raw] }))
        setTagInput('')
      }
    }
  }

  const removeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }))
  }

  const validate = (): boolean => {
    const errs: FormErrors = {}

    if (!form.name.trim()) {
      errs.name = 'Company name is required'
    } else if (form.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters'
    }

    if (!form.industry) {
      errs.industry = 'Please select an industry'
    }

    if (form.website && !/^https?:\/\/.+\..+/.test(form.website)) {
      errs.website = 'Enter a valid URL (e.g., https://example.com)'
    }

    if (form.package && (isNaN(Number(form.package)) || Number(form.package) < 0)) {
      errs.package = 'Enter a valid package amount'
    }

    if (form.description.length > 500) {
      errs.description = 'Description must be under 500 characters'
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
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setSubmitStatus('success')
      setTimeout(() => navigate('/admin/companies'), 1000)
    } catch {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setForm({
      name: '',
      logo: null,
      logoFile: null,
      type: 'Software',
      industry: '',
      website: '',
      location: '',
      description: '',
      package: '',
      status: 'Active',
      tags: [],
    })
    setTagInput('')
    setErrors({})
    setTouched({})
    setSubmitStatus('idle')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="add-company-page">
      <div className="add-company-header">
        <button
          className="add-company-back"
          onClick={() => navigate('/admin/companies')}
          type="button"
        >
          <ArrowLeft size={16} />
          Back to Companies
        </button>
        <div className="add-company-title-row">
          <div className="add-company-title-icon">
            <Building2 size={20} />
          </div>
          <div>
            <h1 className="add-company-title">Add New Company</h1>
            <p className="add-company-subtitle">Fill in the details to register a new company</p>
          </div>
        </div>
        <div className="add-company-progress">
          <div className="add-company-progress-track">
            <div className="add-company-progress-fill" style={{ width: `${completionPct}%` }} />
          </div>
          <span className="add-company-progress-label">{completionPct}% complete</span>
        </div>
      </div>

      <form className="add-company-form" onSubmit={handleSubmit} noValidate>
        <div className="add-company-card">
          <div className="add-company-card-header">
            <Briefcase size={16} className="add-company-card-icon" />
            <h2>Company Information</h2>
          </div>

          <div className="add-company-grid">
            <div className="add-company-field add-company-field--full">
              <label className="add-company-label">
                Company Name
                <span className="add-company-required">*</span>
              </label>
              <div className="add-company-input-wrapper">
                <Building2 size={15} className="add-company-input-icon" />
                <input
                  type="text"
                  className={`add-company-input ${errors.name && touched.name ? 'add-company-input--error' : ''}`}
                  placeholder="e.g., TCS, Infosys, Google"
                  value={form.name}
                  onChange={(e) => setField('name', e.target.value)}
                  onBlur={() => markTouched('name')}
                />
              </div>
              {errors.name && touched.name && (
                <span className="add-company-error">
                  <AlertCircle size={12} />
                  {errors.name}
                </span>
              )}
            </div>

            <div className="add-company-field">
              <label className="add-company-label">
                Company Type
                <span className="add-company-required">*</span>
              </label>
              <div className="add-company-radio-group">
                <label className={`add-company-radio ${form.type === 'Software' ? 'add-company-radio--active' : ''}`}>
                  <input
                    type="radio"
                    name="companyType"
                    value="Software"
                    checked={form.type === 'Software'}
                    onChange={(e) => setField('type', e.target.value)}
                  />
                  <Cpu size={14} />
                  Software
                </label>
                <label className={`add-company-radio ${form.type === 'Hardware' ? 'add-company-radio--active' : ''}`}>
                  <input
                    type="radio"
                    name="companyType"
                    value="Hardware"
                    checked={form.type === 'Hardware'}
                    onChange={(e) => setField('type', e.target.value)}
                  />
                  <Briefcase size={14} />
                  Hardware
                </label>
              </div>
            </div>

            <div className="add-company-field">
              <label className="add-company-label">
                Industry
                <span className="add-company-required">*</span>
              </label>
              <select
                className={`add-company-input add-company-select ${errors.industry && touched.industry ? 'add-company-input--error' : ''}`}
                value={form.industry}
                onChange={(e) => setField('industry', e.target.value)}
                onBlur={() => markTouched('industry')}
              >
                <option value="">Select industry</option>
                {INDUSTRY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors.industry && touched.industry && (
                <span className="add-company-error">
                  <AlertCircle size={12} />
                  {errors.industry}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="add-company-card">
          <div className="add-company-card-header">
            <Upload size={16} className="add-company-card-icon" />
            <h2>Company Logo</h2>
          </div>

          <div className="add-company-logo-section">
            {form.logo ? (
              <div className="add-company-logo-preview">
                <img src={form.logo} alt="Logo preview" />
                <button
                  type="button"
                  className="add-company-logo-remove"
                  onClick={removeLogo}
                  aria-label="Remove logo"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="add-company-logo-upload"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="add-company-logo-upload-icon">
                  <Upload size={20} />
                </div>
                <span className="add-company-logo-upload-text">Click to upload logo</span>
                <span className="add-company-logo-upload-hint">PNG, JPG or SVG up to 2MB</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml"
              onChange={handleLogoUpload}
              className="add-company-hidden-input"
            />
          </div>
        </div>

        <div className="add-company-card">
          <div className="add-company-card-header">
            <Globe size={16} className="add-company-card-icon" />
            <h2>Details & Contact</h2>
          </div>

          <div className="add-company-grid">
            <div className="add-company-field">
              <label className="add-company-label">Website</label>
              <div className="add-company-input-wrapper">
                <Globe size={15} className="add-company-input-icon" />
                <input
                  type="url"
                  className={`add-company-input ${errors.website && touched.website ? 'add-company-input--error' : ''}`}
                  placeholder="https://www.example.com"
                  value={form.website}
                  onChange={(e) => setField('website', e.target.value)}
                  onBlur={() => markTouched('website')}
                />
              </div>
              {errors.website && touched.website && (
                <span className="add-company-error">
                  <AlertCircle size={12} />
                  {errors.website}
                </span>
              )}
            </div>

            <div className="add-company-field">
              <label className="add-company-label">Location</label>
              <div className="add-company-input-wrapper">
                <MapPin size={15} className="add-company-input-icon" />
                <input
                  type="text"
                  className="add-company-input"
                  placeholder="e.g., Chennai, Bengaluru, Hyderabad"
                  value={form.location}
                  onChange={(e) => setField('location', e.target.value)}
                />
              </div>
            </div>

            <div className="add-company-field">
              <label className="add-company-label">Highest Package (LPA)</label>
              <div className="add-company-input-wrapper">
                <IndianRupee size={15} className="add-company-input-icon" />
                <input
                  type="text"
                  className={`add-company-input ${errors.package && touched.package ? 'add-company-input--error' : ''}`}
                  placeholder="e.g., 45"
                  value={form.package}
                  onChange={(e) => setField('package', e.target.value.replace(/[^0-9.]/g, ''))}
                  onBlur={() => markTouched('package')}
                />
              </div>
              {errors.package && touched.package && (
                <span className="add-company-error">
                  <AlertCircle size={12} />
                  {errors.package}
                </span>
              )}
            </div>

            <div className="add-company-field">
              <label className="add-company-label">Status</label>
              <div className="add-company-radio-group">
                <label className={`add-company-radio ${form.status === 'Active' ? 'add-company-radio--active add-company-radio--active-green' : ''}`}>
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={form.status === 'Active'}
                    onChange={(e) => setField('status', e.target.value as 'Active' | 'Inactive')}
                  />
                  Active
                </label>
                <label className={`add-company-radio ${form.status === 'Inactive' ? 'add-company-radio--active add-company-radio--inactive' : ''}`}>
                  <input
                    type="radio"
                    name="status"
                    value="Inactive"
                    checked={form.status === 'Inactive'}
                    onChange={(e) => setField('status', e.target.value as 'Active' | 'Inactive')}
                  />
                  Inactive
                </label>
              </div>
            </div>

            <div className="add-company-field add-company-field--full">
              <label className="add-company-label">Company Description</label>
              <div className="add-company-input-wrapper add-company-input-wrapper--textarea">
                <FileText size={15} className="add-company-input-icon add-company-input-icon--top" />
                <textarea
                  className={`add-company-input add-company-textarea ${errors.description && touched.description ? 'add-company-input--error' : ''}`}
                  placeholder="Brief description about the company, culture, and what they look for in candidates..."
                  rows={4}
                  maxLength={500}
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                  onBlur={() => markTouched('description')}
                />
              </div>
              <div className="add-company-textarea-footer">
                {errors.description && touched.description && (
                  <span className="add-company-error">
                    <AlertCircle size={12} />
                    {errors.description}
                  </span>
                )}
                <span className="add-company-char-count">{form.description.length}/500</span>
              </div>
            </div>

            <div className="add-company-field add-company-field--full">
              <label className="add-company-label">Tags / Skills</label>
              <div className="add-company-tags-wrapper">
                {form.tags.map((tag) => (
                  <span key={tag} className="add-company-tag">
                    <Tag size={11} />
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
                      <X size={11} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  className="add-company-tag-input"
                  placeholder={form.tags.length === 0 ? 'Type and press Enter to add tags...' : ''}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  disabled={form.tags.length >= 8}
                />
              </div>
              <span className="add-company-tag-hint">Press Enter or comma to add. Up to 8 tags.</span>
            </div>
          </div>
        </div>

        <div className="add-company-actions">
          <button
            type="button"
            className="add-company-btn add-company-btn--cancel"
            onClick={() => navigate('/admin/companies')}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="add-company-btn add-company-btn--reset"
            onClick={handleReset}
            disabled={submitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className={`add-company-btn add-company-btn--submit ${submitStatus === 'success' ? 'add-company-btn--success' : ''} ${submitStatus === 'error' ? 'add-company-btn--error' : ''}`}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 size={15} className="add-company-spinner" />
                Adding Company...
              </>
            ) : submitStatus === 'success' ? (
              <>
                <CheckCircle2 size={15} />
                Company Added
              </>
            ) : submitStatus === 'error' ? (
              <>
                <AlertCircle size={15} />
                Failed, Try Again
              </>
            ) : (
              <>
                <CheckCircle2 size={15} />
                Add Company
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
