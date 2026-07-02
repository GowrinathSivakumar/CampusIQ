import { useState } from 'react'
import { Search, Building2, Briefcase, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './Companies.css'

interface Company {
  id: number
  name: string
  salaryPackage: string
  category: string
  drives: number
  description: string
}

const categories = ['All', 'IT Services', 'Product', 'E-Commerce', 'Consulting']

const packages = [
  'All Packages',
  'Below 5 LPA',
  '5 - 10 LPA',
  '10 - 20 LPA',
  '20+ LPA',
]

const defaultLogos: Record<string, string> = {
  Zoho: '#1a73e8',
  TCS: '#312783',
  Amazon: '#ff9900',
  Google: '#4285f4',
  Microsoft: '#00a4ef',
  Infosys: '#007cc3',
  Wipro: '#341170',
  Cognizant: '#0a2885',
  Accenture: '#a100ff',
  'HCL Technologies': '#006bb7',
}

const companies: Company[] = [
  { id: 1, name: 'Zoho Corporation', salaryPackage: '8.5 LPA', category: 'Product', drives: 4, description: 'Leading SaaS company with a wide range of business applications.' },
  { id: 2, name: 'TCS', salaryPackage: '7 LPA', category: 'IT Services', drives: 6, description: 'India\'s largest IT services company providing technology solutions.' },
  { id: 3, name: 'Amazon', salaryPackage: '18 LPA', category: 'E-Commerce', drives: 3, description: 'Global e-commerce and cloud computing giant.' },
  { id: 4, name: 'Google', salaryPackage: '24 LPA', category: 'Product', drives: 2, description: 'Technology leader in search, cloud, and AI solutions.' },
  { id: 5, name: 'Microsoft', salaryPackage: '20 LPA', category: 'Product', drives: 3, description: 'World\'s largest software company empowering digital transformation.' },
  { id: 6, name: 'Infosys', salaryPackage: '6.5 LPA', category: 'IT Services', drives: 5, description: 'Global leader in next-generation digital services and consulting.' },
  { id: 7, name: 'Wipro', salaryPackage: '5.5 LPA', category: 'IT Services', drives: 4, description: 'Leading technology services and consulting company.' },
  { id: 8, name: 'Cognizant', salaryPackage: '6 LPA', category: 'IT Services', drives: 4, description: 'Multinational technology services and consulting company.' },
  { id: 9, name: 'Accenture', salaryPackage: '7.5 LPA', category: 'Consulting', drives: 3, description: 'Global professional services company with expertise in digital and cloud.' },
  { id: 10, name: 'HCL Technologies', salaryPackage: '5 LPA', category: 'IT Services', drives: 3, description: 'Global technology company helping enterprises reimagine their businesses.' },
]

function parsePackage(value: string): number {
  const num = parseFloat(value)
  return isNaN(num) ? 0 : num
}

function matchPackageRange(pkg: string, range: string): boolean {
  if (range === 'All Packages') return true
  const val = parsePackage(pkg)
  switch (range) {
    case 'Below 5 LPA': return val < 5
    case '5 - 10 LPA': return val >= 5 && val <= 10
    case '10 - 20 LPA': return val > 10 && val <= 20
    case '20+ LPA': return val > 20
    default: return true
  }
}

export default function Companies() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPackage, setSelectedPackage] = useState('All Packages')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filtered = companies.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchPackage = matchPackageRange(c.salaryPackage, selectedPackage)
    const matchCategory = selectedCategory === 'All' || c.category === selectedCategory
    return matchSearch && matchPackage && matchCategory
  })

  return (
    <div className="companies-page">
      <div className="companies-page-header">
        <div>
          <h1 className="companies-page-title">Companies</h1>
          <p className="companies-page-subtitle">Browse all recruiting companies and their placement details</p>
        </div>
        <div className="companies-page-count">
          <Building2 size={18} />
          <span>{companies.length} Companies</span>
        </div>
      </div>

      <div className="companies-page-filters">
        <div className="companies-page-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="companies-page-filter-group">
          <div className="companies-page-filter-select">
            <Briefcase size={14} />
            <select value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)}>
              {packages.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="companies-page-filter-select">
            <Building2 size={14} />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="companies-page-grid">
        {filtered.map((company) => {
          const bgColor = defaultLogos[company.name.split(' ')[0]] || '#6366f1'
          return (
            <div key={company.id} className="companies-page-card">
              <div className="companies-page-card-body">
                <div className="companies-page-card-header">
                  <div className="companies-page-card-logo" style={{ background: bgColor }}>
                    <span>{company.name.charAt(0)}</span>
                  </div>
                  <div className="companies-page-card-info">
                    <h3 className="companies-page-card-name">{company.name}</h3>
                    <div className="companies-page-card-meta">
                      <span className="companies-page-card-package">{company.salaryPackage}</span>
                      <span className="companies-page-card-drives">{company.drives} {company.drives === 1 ? 'drive' : 'drives'}</span>
                    </div>
                  </div>
                </div>
                <p className="companies-page-card-desc">{company.description}</p>
              </div>
              <button
                onClick={() => navigate(`/student/company/${company.id}`)}
                className="companies-page-card-btn"
              >
                View Details
                <ChevronRight size={16} />
              </button>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="companies-page-empty">
          <Building2 size={48} />
          <h3>No companies found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
