import { useState } from 'react'
import { Link } from 'react-router-dom'
import { History, Calendar, Building2, Briefcase, GraduationCap, ChevronRight } from 'lucide-react'
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

export default function PreviousDrives() {
  const [company, setCompany] = useState('All Companies')
  const [year, setYear] = useState('All Years')
  const [role, setRole] = useState('All Roles')
  const [department, setDepartment] = useState('All Departments')

  const filtered = drives.filter((d) => {
    return (
      (company === 'All Companies' || d.company === company) &&
      (year === 'All Years' || d.year === Number(year)) &&
      (role === 'All Roles' || d.role === role) &&
      (department === 'All Departments' || d.department === department)
    )
  })

  return (
    <div className="previous-drives">
      <div className="previous-drives-header">
        <div>
          <h1 className="previous-drives-title">Previous Drives</h1>
          <p className="previous-drives-subtitle">Browse all past placement drives with complete details</p>
        </div>
        <div className="previous-drives-count">
          <History size={18} />
          <span>{drives.length} Drives</span>
        </div>
      </div>

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

      <div className="previous-drives-grid">
        {filtered.map((drive) => (
          <div key={drive.id} className="previous-drives-card">
            <div className="previous-drives-card-header">
              <div className="previous-drives-card-company-icon">
                {drive.company.charAt(0)}
              </div>
              <div className="previous-drives-card-company-info">
                <h3 className="previous-drives-card-company">{drive.company}</h3>
                <span className="previous-drives-card-role">{drive.role}</span>
              </div>
              <span className="previous-drives-card-year">{drive.year}</span>
            </div>
            <div className="previous-drives-card-body">
              <div className="previous-drives-card-detail">
                <span className="previous-drives-card-label">Package</span>
                <span className="previous-drives-card-value">{drive.package}</span>
              </div>
              <div className="previous-drives-card-detail">
                <span className="previous-drives-card-label">Rounds</span>
                <span className="previous-drives-card-value">{drive.rounds}</span>
              </div>
              <div className="previous-drives-card-detail">
                <span className="previous-drives-card-label">Department</span>
                <span className="previous-drives-card-value">{drive.department}</span>
              </div>
            </div>
            <Link
              to={`/student/company/${drive.id}`}
              className="previous-drives-card-btn"
            >
              View Details
              <ChevronRight size={16} />
            </Link>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="previous-drives-empty">
          <History size={48} />
          <h3>No drives found</h3>
          <p>Try adjusting your filter criteria</p>
        </div>
      )}
    </div>
  )
}
