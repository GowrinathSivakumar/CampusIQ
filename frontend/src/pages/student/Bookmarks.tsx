import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bookmark, Building2, HelpCircle, BookOpen, Trash2, ExternalLink } from 'lucide-react'
import './Bookmarks.css'

interface BookmarkedCompany {
  id: number
  name: string
  type: 'company'
  bookmarkedAt: string
}

interface BookmarkedQuestion {
  id: number
  text: string
  company: string
  type: 'question'
  bookmarkedAt: string
}

interface BookmarkedGuide {
  id: number
  title: string
  type: 'guide'
  bookmarkedAt: string
}

type BookmarkItem = BookmarkedCompany | BookmarkedQuestion | BookmarkedGuide

const initialBookmarks: BookmarkItem[] = [
  { id: 1, name: 'Zoho Corporation', type: 'company', bookmarkedAt: '2 days ago' },
  { id: 2, name: 'Amazon', type: 'company', bookmarkedAt: '5 days ago' },
  { id: 5, name: 'TCS', type: 'company', bookmarkedAt: '1 week ago' },
  { id: 10, name: 'Microsoft', type: 'company', bookmarkedAt: '2 weeks ago' },
  { id: 101, text: 'Explain the difference between process and thread.', company: 'Zoho', type: 'question', bookmarkedAt: '3 days ago' },
  { id: 102, text: 'Given an array of integers, find the two numbers that sum to a target value.', company: 'Amazon', type: 'question', bookmarkedAt: '1 week ago' },
  { id: 201, title: 'Data Structures & Algorithms Guide', type: 'guide', bookmarkedAt: '4 days ago' },
  { id: 202, title: 'HR Interview Preparation Tips', type: 'guide', bookmarkedAt: '1 week ago' },
]

const tabs = [
  { id: 'all', label: 'All', icon: Bookmark },
  { id: 'company', label: 'Companies', icon: Building2 },
  { id: 'question', label: 'Questions', icon: HelpCircle },
  { id: 'guide', label: 'Guides', icon: BookOpen },
]

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(initialBookmarks)
  const [activeTab, setActiveTab] = useState('all')

  const removeBookmark = (id: number) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }

  const filtered = activeTab === 'all'
    ? bookmarks
    : bookmarks.filter((b) => b.type === activeTab)

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
                  : bookmarks.filter((b) => b.type === tab.id).length
                }
              </span>
            </button>
          )
        })}
      </div>

      <div className="bookmarks-page-list">
        {filtered.map((item) => {
          if (item.type === 'company') {
            const company = item as BookmarkedCompany
            return (
              <div key={company.id} className="bookmarks-page-item">
                <div className="bookmarks-page-item-icon company">
                  <Building2 size={18} />
                </div>
                <div className="bookmarks-page-item-content">
                  <Link to={`/student/company/${company.id}`} className="bookmarks-page-item-title">
                    {company.name}
                    <ExternalLink size={14} />
                  </Link>
                  <span className="bookmarks-page-item-meta">Bookmarked {company.bookmarkedAt}</span>
                </div>
                <button
                  className="bookmarks-page-item-remove"
                  onClick={() => removeBookmark(company.id)}
                  aria-label="Remove bookmark"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )
          }

          if (item.type === 'question') {
            const question = item as BookmarkedQuestion
            return (
              <div key={question.id} className="bookmarks-page-item">
                <div className="bookmarks-page-item-icon question">
                  <HelpCircle size={18} />
                </div>
                <div className="bookmarks-page-item-content">
                  <p className="bookmarks-page-item-title">{question.text}</p>
                  <span className="bookmarks-page-item-meta">
                    {question.company} • Bookmarked {question.bookmarkedAt}
                  </span>
                </div>
                <button
                  className="bookmarks-page-item-remove"
                  onClick={() => removeBookmark(question.id)}
                  aria-label="Remove bookmark"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )
          }

          const guide = item as BookmarkedGuide
          return (
            <div key={guide.id} className="bookmarks-page-item">
              <div className="bookmarks-page-item-icon guide">
                <BookOpen size={18} />
              </div>
              <div className="bookmarks-page-item-content">
                <Link to="/student/preparation" className="bookmarks-page-item-title">
                  {guide.title}
                  <ExternalLink size={14} />
                </Link>
                <span className="bookmarks-page-item-meta">Bookmarked {guide.bookmarkedAt}</span>
              </div>
              <button
                className="bookmarks-page-item-remove"
                onClick={() => removeBookmark(guide.id)}
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
