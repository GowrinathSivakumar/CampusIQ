import { useState, useEffect } from 'react'
import { Lightbulb, Plus, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getTips, type Tip } from '../../services/tipService'
import './Preparation.css'

function formatDate(dateStr?: string): string {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  return `${day}-${month}-${d.getFullYear()}`
}

export default function Preparation() {
  const navigate = useNavigate()
  const [tips, setTips] = useState<Tip[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    let mounted = true

    async function fetchTips() {
      try {
        setLoading(true)
        const data = await getTips({ limit: 200 })
        if (mounted) setTips(data.tips)
      } catch {
        if (mounted) setTips([])
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchTips()
    return () => {
      mounted = false
    }
  }, [])

  const filtered = tips.filter((tip) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      tip.title.toLowerCase().includes(q) ||
      (tip.category || '').toLowerCase().includes(q) ||
      (tip.description || '').toLowerCase().includes(q)
    )
  })

  return (
    <div className="preparation-page">
      <div className="preparation-header">
        <button className="preparation-add-btn" onClick={() => navigate('/admin/preparation/add')}>
          <Plus size={16} />
          Add Tips
        </button>
      </div>

      <div className="preparation-search-wrapper">
        <Search size={16} className="preparation-search-icon" />
        <input
          type="text"
          placeholder="Search tips..."
          className="preparation-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="preparation-grid">
          <div className="tip-card">
            <p style={{ textAlign: 'center', color: 'var(--color-gray-400)' }}>Loading tips...</p>
          </div>
        </div>
      ) : (
        <div className="preparation-grid">
          {filtered.map((tip) => (
            <div key={tip._id} className="tip-card">
              <div className="tip-card-top">
                <div className="tip-card-icon"><Lightbulb size={18} /></div>
                <div>
                  <h3 className="tip-card-title">{tip.title}</h3>
                  <p className="tip-card-author">by {tip.createdBy?.name || 'Admin'}</p>
                </div>
              </div>
              <div className="tip-card-footer">
                <span className="tip-card-category">{tip.category}</span>
                <span className="tip-card-date">{formatDate(tip.createdAt)}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="tip-card">
              <p style={{ textAlign: 'center', color: 'var(--color-gray-400)' }}>No tips found</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
