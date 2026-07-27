import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bookmark, Building2, HelpCircle, BookOpen, Trash2, ExternalLink } from 'lucide-react'
import { getBookmarks, removeBookmark as removeBookmarkApi, type Bookmark as BookmarkType } from '../../services/bookmarkService'
import './Bookmarks.css'

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  const weeks = Math.floor(days / 7)
  return `${weeks}w ago`
}

const tabs = [
  { id: 'all', label: 'All', icon: Bookmark },
  { id: 'company', label: 'Companies', icon: Building2 },
  { id: 'question', label: 'Questions', icon: HelpCircle },
  { id: 'guide', label: 'Guides', icon: BookOpen },
]

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    fetchBookmarks()
  }, [])

  async function fetchBookmarks() {
    try {
      setLoading(true)
      const data = await getBookmarks({ limit: 200 })
      setBookmarks(data.bookmarks)
    } catch {
      setBookmarks([])
    } finally {
      setLoading(false)
    }
  }

  async function handleRemoveBookmark(id: string) {
    try {
      await removeBookmarkApi(id)
      setBookmarks((prev) => prev.filter((b) => b._id !== id))
    } catch {
      // silently fail
    }
  }

  const filtered = activeTab === 'all'
    ? bookmarks
    : bookmarks.filter((b) => b.itemType === activeTab)

  if (loading) {
    return (
      <div className="bookmarks-page">
        <div className="bookmarks-page-header">
          <div>
            <h1 className="bookmarks-page-title">Bookmarks</h1>
            <p className="bookmarks-page-subtitle">Access your saved companies, questions, and guides</p>
          </div>
        </div>
        <div className="bookmarks-page-empty">
          <Bookmark size={48} />
          <h3>Loading bookmarks...</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="bookmarks-page">
      <div className="bookmarks-page-header">
        <div>
          <h1 className="bookmarks-page-title">Bookmarks</h1>
          <p className="bookmarks-page-subtitle">Access your saved companies, questions, and guides</p>
        </div>
        <div className="bookmarks-page-count">
          <Bookmark size={18} />
          <span>{bookmarks.length} Saved</span>
        </div>
      </div>

      <div className="bookmarks-page-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              className={`bookmarks-page-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              <span className="bookmarks-page-tab-count">
                {tab.id === 'all'
                  ? bookmarks.length
                  : bookmarks.filter((b) => b.itemType === tab.id).length
                }
              </span>
            </button>
          )
        })}
      </div>

      <div className="bookmarks-page-list">
        {filtered.map((item) => {
          if (item.itemType === 'company') {
            const company = item.companyId
            return (
              <div key={item._id} className="bookmarks-page-item">
                <div className="bookmarks-page-item-icon company">
                  <Building2 size={18} />
                </div>
                <div className="bookmarks-page-item-content">
                  <Link to={`/student/company/${company?._id || ''}`} className="bookmarks-page-item-title">
                    {company?.name || 'Unknown Company'}
                    <ExternalLink size={14} />
                  </Link>
                  <span className="bookmarks-page-item-meta">Bookmarked {timeAgo(item.createdAt)}</span>
                </div>
                <button
                  className="bookmarks-page-item-remove"
                  onClick={() => handleRemoveBookmark(item._id)}
                  aria-label="Remove bookmark"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )
          }

          if (item.itemType === 'question') {
            const question = item.questionId
            return (
              <div key={item._id} className="bookmarks-page-item">
                <div className="bookmarks-page-item-icon question">
                  <HelpCircle size={18} />
                </div>
                <div className="bookmarks-page-item-content">
                  <p className="bookmarks-page-item-title">{question?.question || 'Unknown Question'}</p>
                  <span className="bookmarks-page-item-meta">
                    {question?.company || ''} • Bookmarked {timeAgo(item.createdAt)}
                  </span>
                </div>
                <button
                  className="bookmarks-page-item-remove"
                  onClick={() => handleRemoveBookmark(item._id)}
                  aria-label="Remove bookmark"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )
          }

          return (
            <div key={item._id} className="bookmarks-page-item">
              <div className="bookmarks-page-item-icon guide">
                <BookOpen size={18} />
              </div>
              <div className="bookmarks-page-item-content">
                <Link to="/student/preparation" className="bookmarks-page-item-title">
                  {item.guideTitle || 'Unknown Guide'}
                  <ExternalLink size={14} />
                </Link>
                <span className="bookmarks-page-item-meta">Bookmarked {timeAgo(item.createdAt)}</span>
              </div>
              <button
                className="bookmarks-page-item-remove"
                onClick={() => handleRemoveBookmark(item._id)}
                aria-label="Remove bookmark"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bookmarks-page-empty">
          <Bookmark size={48} />
          <h3>No bookmarks yet</h3>
          <p>Start bookmarking companies, questions, and guides to access them quickly</p>
        </div>
      )}
    </div>
  )
}
