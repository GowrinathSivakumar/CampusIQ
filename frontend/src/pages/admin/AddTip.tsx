import { useState, useMemo, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Lightbulb,
  Tag,
  Building2,
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Layers,
  PenLine,
} from 'lucide-react'
import './AddTip.css'

interface TipForm {
  title: string
  category: string
  description: string
  company: string
  tags: string[]
  status: 'Draft' | 'Published'
}

interface FormErrors {
  title?: string
  category?: string
  description?: string
}

const CATEGORY_OPTIONS = [
  'Technical',
  'Soft Skills',
  'Career',
  'Aptitude',
  'Coding',
  'System Design',
  'HR',
]

const COMPANY_OPTIONS = [
  'Google',
  'Microsoft',
  'Amazon',
  'TCS',
  'Infosys',
  'Zoho',
  'Wipro',
  'HCL',
  'Tech Mahindra',
  'Other',
]

export default function AddTip() {
  const navigate = useNavigate()

  const [form, setForm] = useState<TipForm>({
    title: '',
    category: '',
    description: '',
    company: '',
    tags: [],
    status: 'Draft',
  })

  const [tagInput, setTagInput] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const completionPct = useMemo(() => {
    let filled = 0
    let total = 3
    if (form.title.trim()) filled++
    if (form.category) filled++
    if (form.description.trim()) filled++
    return Math.round((filled / total) * 100)
  }, [form.title, form.category, form.description])

  const setField = (field: keyof TipForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const markTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const raw = tagInput.trim().replace(/,/g, '')
      if (raw && !form.tags.includes(raw) && form.tags.length < 5) {
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

    if (!form.title.trim()) {
      errs.title = 'Tip title is required'
    } else if (form.title.trim().length < 5) {
      errs.title = 'Title must be at least 5 characters'
    }

    if (!form.category) {
      errs.category = 'Please select a category'
    }

    if (!form.description.trim()) {
      errs.description = 'Description is required'
    } else if (form.description.trim().length < 10) {
      errs.description = 'Description must be at least 10 characters'
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
      setTimeout(() => navigate('/admin/preparation'), 1000)
    } catch {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setForm({
      title: '',
      category: '',
      description: '',
      company: '',
      tags: [],
      status: 'Draft',
    })
    setTagInput('')
    setErrors({})
    setTouched({})
    setSubmitStatus('idle')
  }

  return (
    <div className="add-tip-page">
      <div className="add-tip-header">
        <button
          className="add-tip-back"
          onClick={() => navigate('/admin/preparation')}
          type="button"
        >
          <ArrowLeft size={16} />
          Back to Tips
        </button>
        <div className="add-tip-title-row">
          <div className="add-tip-title-icon">
            <Lightbulb size={20} />
          </div>
          <div>
            <h1 className="add-tip-title">Add Preparation Tip</h1>
            <p className="add-tip-subtitle">Share a helpful tip to guide students in their preparation</p>
          </div>
        </div>
        <div className="add-tip-progress">
          <div className="add-tip-progress-track">
            <div className="add-tip-progress-fill" style={{ width: `${completionPct}%` }} />
          </div>
          <span className="add-tip-progress-label">{completionPct}% complete</span>
        </div>
      </div>

      <form className="add-tip-form" onSubmit={handleSubmit} noValidate>
        <div className="add-tip-card">
          <div className="add-tip-card-header">
            <Layers size={16} className="add-tip-card-icon" />
            <h2>Tip Information</h2>
          </div>

          <div className="add-tip-grid">
            <div className="add-tip-field add-tip-field--full">
              <label className="add-tip-label">
                Tip Title
                <span className="add-tip-required">*</span>
              </label>
              <div className="add-tip-input-wrapper">
                <PenLine size={15} className="add-tip-input-icon" />
                <input
                  type="text"
                  className={`add-tip-input ${errors.title && touched.title ? 'add-tip-input--error' : ''}`}
                  placeholder="e.g., Master Data Structures & Algorithms"
                  value={form.title}
                  onChange={(e) => setField('title', e.target.value)}
                  onBlur={() => markTouched('title')}
                />
              </div>
              {errors.title && touched.title && (
                <span className="add-tip-error">
                  <AlertCircle size={12} />
                  {errors.title}
                </span>
              )}
            </div>

            <div className="add-tip-field">
              <label className="add-tip-label">
                Category
                <span className="add-tip-required">*</span>
              </label>
              <div className="add-tip-input-wrapper">
                <Layers size={15} className="add-tip-input-icon" />
                <select
                  className={`add-tip-input add-tip-select ${errors.category && touched.category ? 'add-tip-input--error' : ''}`}
                  value={form.category}
                  onChange={(e) => setField('category', e.target.value)}
                  onBlur={() => markTouched('category')}
                >
                  <option value="">Select category</option>
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              {errors.category && touched.category && (
                <span className="add-tip-error">
                  <AlertCircle size={12} />
                  {errors.category}
                </span>
              )}
            </div>

            <div className="add-tip-field">
              <label className="add-tip-label">Related Company</label>
              <div className="add-tip-input-wrapper">
                <Building2 size={15} className="add-tip-input-icon" />
                <select
                  className="add-tip-input add-tip-select"
                  value={form.company}
                  onChange={(e) => setField('company', e.target.value)}
                >
                  <option value="">Select company (optional)</option>
                  {COMPANY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="add-tip-card">
          <div className="add-tip-card-header">
            <FileText size={16} className="add-tip-card-icon" />
            <h2>Content & Tags</h2>
          </div>

          <div className="add-tip-grid">
            <div className="add-tip-field add-tip-field--full">
              <label className="add-tip-label">
                Description
                <span className="add-tip-required">*</span>
              </label>
              <div className="add-tip-input-wrapper add-tip-input-wrapper--textarea">
                <FileText size={15} className="add-tip-input-icon add-tip-input-icon--top" />
                <textarea
                  className={`add-tip-input add-tip-textarea ${errors.description && touched.description ? 'add-tip-input--error' : ''}`}
                  placeholder="Write a clear, actionable tip that students can apply during their preparation..."
                  rows={5}
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                  onBlur={() => markTouched('description')}
                />
              </div>
              {errors.description && touched.description && (
                <span className="add-tip-error">
                  <AlertCircle size={12} />
                  {errors.description}
                </span>
              )}
            </div>

            <div className="add-tip-field add-tip-field--full">
              <label className="add-tip-label">Tags</label>
              <div className="add-tip-tags-wrapper">
                {form.tags.map((tag) => (
                  <span key={tag} className="add-tip-tag">
                    <Tag size={11} />
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
                      <AlertCircle size={11} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  className="add-tip-tag-input"
                  placeholder={form.tags.length === 0 ? 'Type and press Enter to add tags...' : ''}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  disabled={form.tags.length >= 5}
                />
              </div>
              <span className="add-tip-tag-hint">Press Enter or comma to add. Up to 5 tags.</span>
            </div>
          </div>
        </div>

        <div className="add-tip-card">
          <div className="add-tip-card-header">
            <Lightbulb size={16} className="add-tip-card-icon" />
            <h2>Publishing</h2>
          </div>

          <div className="add-tip-grid">
            <div className="add-tip-field">
              <label className="add-tip-label">Status</label>
              <div className="add-tip-radio-group">
                <label className={`add-tip-radio ${form.status === 'Draft' ? 'add-tip-radio--active add-tip-radio--draft' : ''}`}>
                  <input
                    type="radio"
                    name="status"
                    value="Draft"
                    checked={form.status === 'Draft'}
                    onChange={(e) => setField('status', e.target.value as 'Draft' | 'Published')}
                  />
                  Draft
                </label>
                <label className={`add-tip-radio ${form.status === 'Published' ? 'add-tip-radio--active add-tip-radio--published' : ''}`}>
                  <input
                    type="radio"
                    name="status"
                    value="Published"
                    checked={form.status === 'Published'}
                    onChange={(e) => setField('status', e.target.value as 'Draft' | 'Published')}
                  />
                  Published
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="add-tip-actions">
          <button
            type="button"
            className="add-tip-btn add-tip-btn--cancel"
            onClick={() => navigate('/admin/preparation')}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="add-tip-btn add-tip-btn--reset"
            onClick={handleReset}
            disabled={submitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className={`add-tip-btn add-tip-btn--submit ${submitStatus === 'success' ? 'add-tip-btn--success' : ''} ${submitStatus === 'error' ? 'add-tip-btn--error' : ''}`}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 size={15} className="add-tip-spinner" />
                Saving Tip...
              </>
            ) : submitStatus === 'success' ? (
              <>
                <CheckCircle2 size={15} />
                Tip Saved
              </>
            ) : submitStatus === 'error' ? (
              <>
                <AlertCircle size={15} />
                Failed, Try Again
              </>
            ) : (
              <>
                <CheckCircle2 size={15} />
                Save Tip
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
