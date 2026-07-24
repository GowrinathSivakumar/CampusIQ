import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { History, Calendar, Building2, Briefcase, GraduationCap, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { getDrives, type Drive } from '../../services/driveService'
import './PreviousDrives.css'

function formatDate(dateStr: string): string {
  return new Date(dateStr).getFullYear().toString()
}

function parsePackage(pkg: string): number {
  const num = parseFloat(pkg.replace(/[^0-9.]/g, ''))
  return isNaN(num) ? 0 : num
}

type SortKey = 'company' | 'role' | 'year' | 'package' | 'rounds' | 'department'

export default function PreviousDrives() {
  const [drives, setDrives] = useState<Drive[]>([])
  const [loading, setLoading] = useState(true)
  const [company, setCompany] = useState('All Companies')
  const [year, setYear] = useState('All Years')
  const [role, setRole] = useState('All Roles')
  const [department, setDepartment] = useState('All Departments')
  const [sortKey, setSortKey] = useState<SortKey>('year')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

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

  const companies = ['All Companies', ...new Set(drives.map((d) => d.companyName))]
  const years = ['All Years', ...new Set(drives.map((d) => formatDate(d.date)))]
  const roles = ['All Roles', ...new Set(drives.map((d) => d.role))]
  const departments = ['All Departments', ...new Set(drives.map((d) => d.department))]

  const filtered = drives.filter((d) => {
    return (
      (company === 'All Companies' || d.companyName === company) &&
      (year === 'All Years' || formatDate(d.date) === year) &&
      (role === 'All Roles' || d.role === role) &&
      (department === 'All Departments' || d.department === department)
    )
  })

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0
    switch (sortKey) {
      case 'company':
        cmp = a.companyName.localeCompare(b.companyName)
        break
      case 'role':
        cmp = a.role.localeCompare(b.role)
        break
      case 'year':
        cmp = new Date(a.date).getTime() - new Date(b.date).getTime()
        break
      case 'package':
        cmp = parsePackage(a.package) - parsePackage(b.package)
        break
      case 'rounds':
        cmp = (a.rounds || 0) - (b.rounds || 0)
        break
      case 'department':
        cmp = (a.department || '').localeCompare(b.department || '')
        break
    }
    return sortDir === 'asc' ? cmp : -cmp
  })

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  function SortIcon({ column }: { column: SortKey }) {
    if (sortKey !== column) return <ArrowUpDown size={14} />
    return sortDir === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
  }

  if (loading) {
    return (
      <div className="previous-drives">
        <div className="previous-drives-empty">
          <History size={48} />
          <h3>Loading drives...</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="previous-drives">
      <Link to="/student/companies" className="previous-drives-nav-card">
        <div className="previous-drives-nav-card-content">
          <div className="previous-drives-nav-card-icon">
            <Building2 size={24} />
          </div>
          <div className="previous-drives-nav-card-text">
            <h3 className="previous-drives-nav-card-title">Companies</h3>
            <p className="previous-drives-nav-card-desc">Browse all companies and their details</p>
          </div>
          <ChevronRight className="previous-drives-nav-card-arrow" size={20} />
        </div>
      </Link>

      <div className="previous-drives-filters">
        <div className="previous-drives-filter-group">
          <Building2 size={16} />
          <select value={company} onChange={(e) => setCompany(e.target.value)}>
            {companies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="previous-drives-filter-group">
          <Calendar size={16} />
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div className="previous-drives-filter-group">
          <Briefcase size={16} />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {roles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="previous-drives-filter-group">
          <GraduationCap size={16} />
          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="previous-drives-table-wrapper">
        <table className="previous-drives-table">
          <thead>
            <tr>
              <th className="col-sno">#</th>
              <th className="col-sortable" onClick={() => toggleSort('company')}>
                <span>Company</span>
                <SortIcon column="company" />
              </th>
              <th className="col-sortable" onClick={() => toggleSort('role')}>
                <span>Role</span>
                <SortIcon column="role" />
              </th>
              <th className="col-sortable" onClick={() => toggleSort('year')}>
                <span>Year</span>
                <SortIcon column="year" />
              </th>
              <th className="col-sortable" onClick={() => toggleSort('package')}>
                <span>Package</span>
                <SortIcon column="package" />
              </th>
              <th className="col-sortable" onClick={() => toggleSort('rounds')}>
                <span>Rounds</span>
                <SortIcon column="rounds" />
              </th>
              <th className="col-sortable" onClick={() => toggleSort('department')}>
                <span>Department</span>
                <SortIcon column="department" />
              </th>
              <th className="col-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={8} className="previous-drives-empty-cell">
                  <div className="previous-drives-empty">
                    <History size={48} />
                    <h3>No drives found</h3>
                    <p>Try adjusting your filter criteria</p>
                  </div>
                </td>
              </tr>
            ) : (
              sorted.map((drive, idx) => (
                <tr key={drive._id}>
                  <td className="col-sno">{idx + 1}</td>
                  <td className="col-company">{drive.companyName}</td>
                  <td className="col-role">{drive.role}</td>
                  <td className="col-year">{formatDate(drive.date)}</td>
                  <td className="col-package">{drive.package}</td>
                  <td className="col-rounds">{drive.rounds || '-'}</td>
                  <td className="col-dept">{drive.department || 'All'}</td>
                  <td className="col-action">
                    <Link
                      to={`/student/company/${drive.company?._id || drive._id}`}
                      className="previous-drives-table-btn"
                    >
                      View Details
                      <ChevronRight size={14} />
                    </Link>
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
