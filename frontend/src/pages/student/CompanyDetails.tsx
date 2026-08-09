import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  Building2,
  Globe,
  MapPin,
  ChevronRight,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Target,
  ClipboardList,
  Layers,
  Lightbulb,
  Link2,
  Loader2,
  IndianRupee,
} from 'lucide-react'
import { getCompanyById, type Company } from '../../services/companyService'
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
  type Bookmark as BookmarkType,
} from '../../services/bookmarkService'
import './CompanyDetails.css'

const defaultLogos: Record<string, string> = {
  'Zoho': '#1a73e8',
  'TCS': '#312783',
  'Amazon': '#ff9900',
  'Google': '#4285f4',
  'Microsoft': '#00a4ef',
  'Infosys': '#007cc3',
  'Wipro': '#341170',
  'Cognizant': '#0a2885',
  'Accenture': '#a100ff',
  'HCL': '#006bb7',
}

export default function CompanyDetails() {
  const { id } = useParams<{ id: string }>()
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const [bookmark, setBookmark] = useState<BookmarkType | null>(null)
  const [bookmarkBusy, setBookmarkBusy] = useState(false)

  useEffect(() => {
    let mounted = true

    async function fetchData() {
      if (!id) {
        if (mounted) setLoading(false)
        return
      }

      try {
        setLoading(true)
        const [c, bookmarks] = await Promise.all([
          getCompanyById(id),
          getBookmarks({ type: 'company', limit: 200 }).catch(() => null),
        ])
        if (!mounted) return
        setCompany(c)
        const found = bookmarks?.bookmarks.find((b) => b.companyId?._id === c._id) || null
        setBookmark(found)
      } catch {
        if (mounted) setCompany(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchData()
    return () => {
      mounted = false
    }
  }, [id])

  const toggleBookmark = async () => {
    if (!company || bookmarkBusy) return
    setBookmarkBusy(true)

    try {
      if (bookmark) {
        await removeBookmark(bookmark._id)
        setBookmark(null)
      } else {
        const created = await addBookmark({ itemType: 'company', companyId: company._id })
        setBookmark(created)
      }
    } catch {
      // silently fail
    } finally {
      setBookmarkBusy(false)
    }
  }

  if (loading) {
    return (
      <div className="company-details">
        <div className="company-details-loading">
          <Loader2 size={32} className="company-details-spinner" />
          <p>Loading company details...</p>
        </div>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="company-details">
        <div className="company-details-breadcrumb">
          <Link to="/student/companies" className="company-details-breadcrumb-link">
            <ArrowLeft size={16} />
            <span>Back to Companies</span>
          </Link>
        </div>
        <div className="company-details-loading">
          <Building2 size={48} />
          <h3>Company not found</h3>
          <p>The company you are looking for does not exist.</p>
        </div>
      </div>
    )
  }

  const logoColor = defaultLogos[company.name.split(' ')[0]] || '#6366f1'
  const website = company.website || ''
  const overview = company.description || 'Company details are being updated. Please check back later.'
  const eligibility = company.eligibility?.length ? company.eligibility : ['Details coming soon']
  const process = company.process?.length ? company.process : ['Details coming soon']
  const rounds = company.rounds?.length
    ? company.rounds
    : [
        { name: 'Aptitude', description: 'Details coming soon.', duration: 'TBD' },
        { name: 'Coding', description: 'Details coming soon.', duration: 'TBD' },
        { name: 'Technical', description: 'Details coming soon.', duration: 'TBD' },
        { name: 'HR', description: 'Details coming soon.', duration: 'TBD' },
      ]
  const tips = company.tips?.length ? company.tips : ['Details coming soon.']
  const resources = company.resources || []

  return (
    <div className="company-details">
      <div className="company-details-breadcrumb">
        <Link to="/student/companies" className="company-details-breadcrumb-link">
          <ArrowLeft size={16} />
          <span>Back to Companies</span>
        </Link>
        <div className="company-details-breadcrumb-path">
          <Link to="/student/dashboard">Dashboard</Link>
          <ChevronRight size={14} />
          <Link to="/student/companies">Companies</Link>
          <ChevronRight size={14} />
          <span>{company.name}</span>
        </div>
      </div>

      <div className="company-details-hero">
        <div className="company-details-hero-info">
          <div className="company-details-hero-logo" style={{ background: `linear-gradient(135deg, ${logoColor}, ${logoColor}cc)` }}>
            {company.logo ? (
              <img src={company.logo} alt={`${company.name} logo`} className="company-details-hero-logo-img" />
            ) : (
              <span>{company.name.charAt(0)}</span>
            )}
          </div>
          <div className="company-details-hero-text">
            <h1 className="company-details-name">{company.name}</h1>
            <div className="company-details-meta">
              {company.location && (
                <span className="company-details-meta-item">
                  <MapPin size={14} />
                  {company.location}
                </span>
              )}
              {website && (
                <span className="company-details-meta-item">
                  <Globe size={14} />
                  <a href={website} target="_blank" rel="noopener noreferrer">{website.replace('https://', '').replace('http://', '')}</a>
                  <ExternalLink size={12} />
                </span>
              )}
              {company.package != null && company.package !== '' && (
                <span className="company-details-meta-item">
                  <IndianRupee size={14} />
                  Up to {company.package} LPA
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          className={`company-details-bookmark ${bookmark ? 'bookmarked' : ''}`}
          onClick={toggleBookmark}
          disabled={bookmarkBusy}
        >
          {bookmarkBusy ? <Loader2 size={20} className="company-details-spinner" /> : bookmark ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          <span>{bookmark ? 'Bookmarked' : 'Bookmark'}</span>
        </button>
      </div>

      <div className="company-details-grid">
        <div className="company-details-main">
          <section className="company-details-section">
            <h2 className="company-details-section-title">
              <Building2 size={20} />
              Company Overview
            </h2>
            <p className="company-details-text">{overview}</p>
          </section>

          <section className="company-details-section">
            <h2 className="company-details-section-title">
              <Target size={20} />
              Eligibility Criteria
            </h2>
            <ul className="company-details-list">
              {eligibility.map((item, i) => (
                <li key={i} className="company-details-list-item">{item}</li>
              ))}
            </ul>
          </section>

          <section className="company-details-section">
            <h2 className="company-details-section-title">
              <ClipboardList size={20} />
              Hiring Process
            </h2>
            <div className="company-details-process">
              {process.map((step, i) => (
                <div key={i} className="company-details-process-step">
                  <span className="company-details-process-number">0{i + 1}</span>
                  <span className="company-details-process-label">{step}</span>
                  {i < process.length - 1 && <span className="company-details-process-line" />}
                </div>
              ))}
            </div>
          </section>

          <section className="company-details-section">
            <h2 className="company-details-section-title">
              <Layers size={20} />
              Previous Drive Details
            </h2>
            <div className="company-details-rounds">
              {rounds.map((round, i) => (
                <div key={i} className="company-details-round-card">
                  <div className="company-details-round-header">
                    <div className="company-details-round-title">
                      <span className="company-details-round-badge">Round {i + 1}</span>
                      <h3 className="company-details-round-name">{round.name}</h3>
                    </div>
                    <span className="company-details-round-duration">{round.duration}</span>
                  </div>
                  <p className="company-details-round-desc">{round.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="company-details-section">
            <h2 className="company-details-section-title">
              <Lightbulb size={20} />
              Preparation Tips
            </h2>
            <ul className="company-details-list">
              {tips.map((tip, i) => (
                <li key={i} className="company-details-list-item">{tip}</li>
              ))}
            </ul>
          </section>

          {resources.length > 0 && (
            <section className="company-details-section">
              <h2 className="company-details-section-title">
                <Link2 size={20} />
                Useful Resources
              </h2>
              <div className="company-details-resources">
                {resources.map((resource, i) => (
                  <a key={i} href={resource.url} target="_blank" rel="noopener noreferrer" className="company-details-resource-link">
                    <span>{resource.title}</span>
                    <ExternalLink size={14} />
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
