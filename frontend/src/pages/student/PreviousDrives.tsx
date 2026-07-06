import { useState } from 'react'
import { Link } from 'react-router-dom'
import { History, Calendar, Building2, Briefcase, GraduationCap, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import './PreviousDrives.css'

interface Drive {
  id: number
  company: string
  role: string
  year: number
  rounds: number
  package: string
  department: string
}

const drives: Drive[] = [
  { id: 1, company: 'Zoho Corporation', role: 'Software Developer', year: 2025, rounds: 4, package: '8.5 LPA', department: 'CSE' },
  { id: 2, company: 'TCS', role: 'Systems Engineer', year: 2025, rounds: 3, package: '3.8 LPA', department: 'All' },
  { id: 3, company: 'Amazon', role: 'SDE Intern', year: 2024, rounds: 4, package: '5.0 LPA', department: 'CSE' },
  { id: 4, company: 'Google', role: 'Software Engineer', year: 2024, rounds: 5, package: '12 LPA', department: 'CSE' },
  { id: 5, company: 'Microsoft', role: 'Software Engineer', year: 2024, rounds: 4, package: '10 LPA', department: 'CSE, IT' },
  { id: 6, company: 'Infosys', role: 'Systems Engineer', year: 2025, rounds: 3, package: '3.6 LPA', department: 'All' },
  { id: 7, company: 'Zoho Corporation', role: 'Technical Support Engineer', year: 2024, rounds: 3, package: '4.5 LPA', department: 'ECE' },
  { id: 8, company: 'Wipro', role: 'Project Engineer', year: 2023, rounds: 3, package: '3.5 LPA', department: 'All' },
  { id: 9, company: 'Cognizant', role: 'Programmer Analyst', year: 2023, rounds: 3, package: '4.0 LPA', department: 'All' },
  { id: 10, company: 'Amazon', role: 'SDE 1', year: 2023, rounds: 4, package: '7.0 LPA', department: 'CSE' },
  { id: 11, company: 'TCS', role: 'Digital', year: 2024, rounds: 4, package: '7.0 LPA', department: 'CSE, IT' },
  { id: 12, company: 'Accenture', role: 'Associate Software Engineer', year: 2025, rounds: 3, package: '4.5 LPA', department: 'All' },
]

const companies = ['All Companies', ...new Set(drives.map((d) => d.company))]
const years = ['All Years', ...new Set(drives.map((d) => d.year))]
const roles = ['All Roles', ...new Set(drives.map((d) => d.role))]
const departments = ['All Departments', ...new Set(drives.map((d) => d.department))]

function parsePackage(pkg: string): number {
  const num = parseFloat(pkg)
  return isNaN(num) ? 0 : num
}

type SortKey = 'company' | 'role' | 'year' | 'package' | 'rounds' | 'department'

export default function PreviousDrives() {
  const [company, setCompany] = useState('All Companies')
  const [year, setYear] = useState('All Years')
  const [role, setRole] = useState('All Roles')
  const [department, setDepartment] = useState('All Departments')
  const [sortKey, setSortKey] = useState<SortKey>('year')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const filtered = drives.filter((d) => {
    return (
      (company === 'All Companies' || d.company === company) &&
      (year === 'All Years' || d.year === Number(year)) &&
      (role === 'All Roles' || d.role === role) &&
      (department === 'All Departments' || d.department === department)
    )
  })

  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0
    switch (sortKey) {
      case 'company':
        cmp = a.company.localeCompare(b.company)
        break
      case 'role':
        cmp = a.role.localeCompare(b.role)
        break
      case 'year':
        cmp = a.year - b.year
        break
      case 'package':
        cmp = parsePackage(a.package) - parsePackage(b.package)
        break
      case 'rounds':
        cmp = a.rounds - b.rounds
        break
      case 'department':
        cmp = a.department.localeCompare(b.department)
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

  return (
    <div className="previous-drives">
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
                <tr key={drive.id}>
                  <td className="col-sno">{idx + 1}</td>
                  <td className="col-company">{drive.company}</td>
                  <td className="col-role">{drive.role}</td>
                  <td className="col-year">{drive.year}</td>
                  <td className="col-package">{drive.package}</td>
                  <td className="col-rounds">{drive.rounds}</td>
                  <td className="col-dept">{drive.department}</td>
                  <td className="col-action">
                    <Link
                      to={`/student/company/${drive.id}`}
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
