import { useState, useEffect } from 'react'
import { Building2, Search, Filter } from 'lucide-react'
import { getCompanies, type Company } from '../../services/companyService'
import { getDrives } from '../../services/driveService'
import { getQuestions } from '../../services/questionService'
import './Companies.css'

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [driveCounts, setDriveCounts] = useState<Record<string, number>>({})
  const [questionCounts, setQuestionCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    let mounted = true

    async function fetchAll() {
      try {
        setLoading(true)
        const [c, d, q] = await Promise.all([
          getCompanies({ limit: 200 }),
          getDrives({ limit: 500 }).catch(() => null),
          getQuestions({ limit: 500 }).catch(() => null),
        ])
        if (!mounted) return
        setCompanies(c.companies)
        if (d) {
          const counts: Record<string, number> = {}
          d.drives.forEach((dr) => {
            counts[dr.companyName] = (counts[dr.companyName] || 0) + 1
          })
          setDriveCounts(counts)
        }
        if (q) {
          const counts: Record<string, number> = {}
          q.questions.forEach((qu) => {
            if (qu.company) counts[qu.company] = (counts[qu.company] || 0) + 1
          })
          setQuestionCounts(counts)
        }
      } catch {
        if (mounted) setCompanies([])
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchAll()
    return () => {
      mounted = false
    }
  }, [])

  const filtered = companies.filter((c) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      c.name.toLowerCase().includes(q) ||
      (c.industry || '').toLowerCase().includes(q) ||
      (c.location || '').toLowerCase().includes(q)
    )
  })

  return (
    <div className="companies-page">
      <div className="companies-header">
        <div className="companies-toolbar">
          <div className="companies-search-wrapper">
            <Search size={16} className="companies-search-icon" />
            <input
              type="text"
              placeholder="Search companies..."
              className="companies-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="companies-filter-btn">
            <Filter size={14} />
            Filters
          </button>
        </div>
      </div>

      <div className="companies-table-wrapper">
        <table className="companies-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Drives</th>
              <th>Questions</th>
              <th>Highest Package</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '24px', color: 'var(--color-gray-400)' }}>
                  Loading companies...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '24px', color: 'var(--color-gray-400)' }}>
                  No companies found
                </td>
              </tr>
            ) : (
              filtered.map((company) => (
                <tr key={company._id}>
                  <td>
                    <div className="company-name-cell">
                      <div className="company-icon"><Building2 size={16} /></div>
                      <span className="company-name">{company.name}</span>
                    </div>
                  </td>
                  <td><span className="company-stat">{driveCounts[company.name] || 0}</span></td>
                  <td><span className="company-stat">{questionCounts[company.name] || 0}</span></td>
                  <td>
                    <span className="company-package">
                      {company.package != null && company.package !== '' ? `₹${company.package} LPA` : '—'}
                    </span>
                  </td>
                  <td>
                    <span className={`company-badge ${(company.status || 'Active').toLowerCase()}`}>
                      {company.status || 'Active'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
