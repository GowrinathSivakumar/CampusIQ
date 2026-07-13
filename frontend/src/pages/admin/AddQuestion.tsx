import { useState, useMemo, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  HelpCircle,
  Tag,
  Building2,
  BarChart3,
  MessageSquare,
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Layers,
} from 'lucide-react'
import './AddQuestion.css'

interface QuestionForm {
  question: string
  category: string
  company: string
  difficulty: string
  answer: string
  tags: string[]
}

interface FormErrors {
  question?: string
  category?: string
}

const CATEGORY_OPTIONS = [
  'Technical',
  'Coding',
  'System Design',
  'Aptitude',
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

export default function AddQuestion() {
  const navigate = useNavigate()

  const [form, setForm] = useState<QuestionForm>({
    question: '',
    category: '',
    company: '',
    difficulty: 'Medium',
    answer: '',
    tags: [],
  })

  const [tagInput, setTagInput] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const completionPct = useMemo(() => {
    let filled = 0
    let total = 4
    if (form.question.trim()) filled++
    if (form.category) filled++
    if (form.company) filled++
    if (form.answer.trim()) filled++
    return Math.round((filled / total) * 100)
  }, [form.question, form.category, form.company, form.answer])

  const setField = (field: keyof QuestionForm, value: string) => {
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

    if (!form.question.trim()) {
      errs.question = 'Question is required'
    } else if (form.question.trim().length < 10) {
      errs.question = 'Question must be at least 10 characters'
    }

    if (!form.category) {
      errs.category = 'Please select a category'
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
      setTimeout(() => navigate('/admin/questions'), 1000)
    } catch {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setForm({
      question: '',
      category: '',
      company: '',
      difficulty: 'Medium',
      answer: '',
      tags: [],
    })
    setTagInput('')
    setErrors({})
    setTouched({})
    setSubmitStatus('idle')
  }

  return (
    <div className="add-question-page">
      <div className="add-question-header">
        <button
          className="add-question-back"
          onClick={() => navigate('/admin/questions')}
          type="button"
        >
          <ArrowLeft size={16} />
          Back to Questions
        </button>
        <div className="add-question-title-row">
          <div className="add-question-title-icon">
            <HelpCircle size={20} />
          </div>
          <div>
            <h1 className="add-question-title">Add Interview Question</h1>
            <p className="add-question-subtitle">Create a new question for the interview prep bank</p>
          </div>
        </div>
        <div className="add-question-progress">
          <div className="add-question-progress-track">
            <div className="add-question-progress-fill" style={{ width: `${completionPct}%` }} />
          </div>
          <span className="add-question-progress-label">{completionPct}% complete</span>
        </div>
      </div>

      <form className="add-question-form" onSubmit={handleSubmit} noValidate>
        <div className="add-question-card">
          <div className="add-question-card-header">
            <Layers size={16} className="add-question-card-icon" />
            <h2>Question Details</h2>
          </div>

          <div className="add-question-grid">
            <div className="add-question-field add-question-field--full">
              <label className="add-question-label">
                Question
                <span className="add-question-required">*</span>
              </label>
              <div className="add-question-input-wrapper add-question-input-wrapper--textarea">
                <FileText size={15} className="add-question-input-icon add-question-input-icon--top" />
                <textarea
                  className={`add-question-input add-question-textarea ${errors.question && touched.question ? 'add-question-input--error' : ''}`}
                  placeholder="e.g., Explain the difference between SQL and NoSQL databases..."
                  rows={4}
                  value={form.question}
                  onChange={(e) => setField('question', e.target.value)}
                  onBlur={() => markTouched('question')}
                />
              </div>
              {errors.question && touched.question && (
                <span className="add-question-error">
                  <AlertCircle size={12} />
                  {errors.question}
                </span>
              )}
            </div>

            <div className="add-question-field">
              <label className="add-question-label">
                Category
                <span className="add-question-required">*</span>
              </label>
              <div className="add-question-input-wrapper">
                <BarChart3 size={15} className="add-question-input-icon" />
                <select
                  className={`add-question-input add-question-select ${errors.category && touched.category ? 'add-question-input--error' : ''}`}
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
                <span className="add-question-error">
                  <AlertCircle size={12} />
                  {errors.category}
                </span>
              )}
            </div>

            <div className="add-question-field">
              <label className="add-question-label">Company</label>
              <div className="add-question-input-wrapper">
                <Building2 size={15} className="add-question-input-icon" />
                <select
                  className="add-question-input add-question-select"
                  value={form.company}
                  onChange={(e) => setField('company', e.target.value)}
                >
                  <option value="">Select company</option>
                  {COMPANY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="add-question-card">
          <div className="add-question-card-header">
            <BarChart3 size={16} className="add-question-card-icon" />
            <h2>Difficulty & Tags</h2>
          </div>

          <div className="add-question-grid">
            <div className="add-question-field">
              <label className="add-question-label">Difficulty</label>
              <div className="add-question-radio-group">
                <label className={`add-question-radio ${form.difficulty === 'Easy' ? 'add-question-radio--active add-question-radio--easy' : ''}`}>
                  <input
                    type="radio"
                    name="difficulty"
                    value="Easy"
                    checked={form.difficulty === 'Easy'}
                    onChange={(e) => setField('difficulty', e.target.value)}
                  />
                  Easy
                </label>
                <label className={`add-question-radio ${form.difficulty === 'Medium' ? 'add-question-radio--active add-question-radio--medium' : ''}`}>
                  <input
                    type="radio"
                    name="difficulty"
                    value="Medium"
                    checked={form.difficulty === 'Medium'}
                    onChange={(e) => setField('difficulty', e.target.value)}
                  />
                  Medium
                </label>
                <label className={`add-question-radio ${form.difficulty === 'Hard' ? 'add-question-radio--active add-question-radio--hard' : ''}`}>
                  <input
                    type="radio"
                    name="difficulty"
                    value="Hard"
                    checked={form.difficulty === 'Hard'}
                    onChange={(e) => setField('difficulty', e.target.value)}
                  />
                  Hard
                </label>
              </div>
            </div>

            <div className="add-question-field add-question-field--full">
              <label className="add-question-label">Tags</label>
              <div className="add-question-tags-wrapper">
                {form.tags.map((tag) => (
                  <span key={tag} className="add-question-tag">
                    <Tag size={11} />
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} aria-label={`Remove ${tag}`}>
                      <AlertCircle size={11} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  className="add-question-tag-input"
                  placeholder={form.tags.length === 0 ? 'Type and press Enter to add tags...' : ''}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  disabled={form.tags.length >= 5}
                />
              </div>
              <span className="add-question-tag-hint">Press Enter or comma to add. Up to 5 tags.</span>
            </div>
          </div>
        </div>

        <div className="add-question-card">
          <div className="add-question-card-header">
            <MessageSquare size={16} className="add-question-card-icon" />
            <h2>Answer</h2>
          </div>

          <div className="add-question-grid">
            <div className="add-question-field add-question-field--full">
              <label className="add-question-label">Model Answer</label>
              <div className="add-question-input-wrapper add-question-input-wrapper--textarea">
                <MessageSquare size={15} className="add-question-input-icon add-question-input-icon--top" />
                <textarea
                  className="add-question-input add-question-textarea"
                  placeholder="Provide a clear, concise model answer for this question..."
                  rows={5}
                  value={form.answer}
                  onChange={(e) => setField('answer', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="add-question-actions">
          <button
            type="button"
            className="add-question-btn add-question-btn--cancel"
            onClick={() => navigate('/admin/questions')}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="add-question-btn add-question-btn--reset"
            onClick={handleReset}
            disabled={submitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className={`add-question-btn add-question-btn--submit ${submitStatus === 'success' ? 'add-question-btn--success' : ''} ${submitStatus === 'error' ? 'add-question-btn--error' : ''}`}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 size={15} className="add-question-spinner" />
                Adding Question...
              </>
            ) : submitStatus === 'success' ? (
              <>
                <CheckCircle2 size={15} />
                Question Added
              </>
            ) : submitStatus === 'error' ? (
              <>
                <AlertCircle size={15} />
                Failed, Try Again
              </>
            ) : (
              <>
                <CheckCircle2 size={15} />
                Add Question
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
