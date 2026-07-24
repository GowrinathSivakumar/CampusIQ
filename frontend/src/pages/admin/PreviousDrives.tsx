import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { History, Search } from 'lucide-react'
import { getDrives, type Drive } from '../../services/driveService'
import './PreviousDrives.css'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}-${month}-${year}`
}

export default function PreviousDrives() {
  const navigate = useNavigate()
  const [drives, setDrives] = useState<Drive[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchDrives()
  }, [])

  async function fetchDrives() {
    try {
      setLoading(true)
      const data = await getDrives({ limit: 200 })
      setDrives(data.drives)
    } catch {
      setDrives([])
    } finally {
      setLoading(false)
    }
  }

  const filtered = drives.filter((d) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      d.companyName.toLowerCase().includes(q) ||
      d.role.toLowerCase().includes(q)
    )
  })

  return (
    <div className="drives-page">
      <div className="drives-header">
        <button className="drives-upload-btn" onClick={() => navigate('/admin/drives')}>
          <History size={16} />
          Upload Drive
        </button>
      </div>

      <div className="drives-search-wrapper">
        <Search size={16} className="drives-search-icon" />
        <input
          type="text"
          placeholder="Search drives..."
          className="drives-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="drives-grid">
          <div className="drive-card">
            <p style={{ textAlign: 'center', color: 'var(--color-gray-400)' }}>Loading drives...</p>
          </div>
        </div>
      ) : (
        <div className="drives-grid">
          {filtered.map((drive) => (
            <div key={drive._id} className="drive-card">
              <div className="drive-card-top">
                <div className="drive-card-icon"><History size={20} /></div>
                <span className="drive-card-date">{formatDate(drive.date)}</span>
              </div>
              <h3 className="drive-card-company">{drive.companyName}</h3>
              <p className="drive-card-role">{drive.role}</p>
              <div className="drive-card-footer">
                <span className="drive-card-students">{drive.studentsPlaced} students placed</span>
                <span className="drive-card-package">{drive.package}</span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="drive-card">
              <p style={{ textAlign: 'center', color: 'var(--color-gray-400)' }}>No drives found</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
