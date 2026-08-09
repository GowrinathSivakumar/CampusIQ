import { useState, useEffect } from 'react'
import { Search, Building2, Briefcase, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getCompanies, type Company } from '../../services/companyService'
import './Companies.css'

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

function parsePackage(value: number | string | undefined): number {
  const num = parseFloat(String(value ?? ''))
  return isNaN(num) ? 0 : num
}

function matchPackageRange(pkg: number | string | undefined, range: string): boolean {
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

function categoryForCompany(c: Company): string {
  const industry = (c.industry || '').toLowerCase()
  if (industry.includes('e-commerce')) return 'E-Commerce'
  if (industry.includes('consulting')) return 'Consulting'
  if (industry.includes('information technology')) return 'IT Services'
  if (c.type === 'Software' || industry.includes('product')) return 'Product'
  return 'IT Services'
}

export default function Companies() {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPackage, setSelectedPackage] = useState('All Packages')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    let mounted = true

    async function fetchCompanies() {
      try {
        setLoading(true)
        const data = await getCompanies({ limit: 200 })
        if (mounted) setCompanies(data.companies)
      } catch {
        if (mounted) setCompanies([])
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchCompanies()
    return () => {
      mounted = false
    }
  }, [])

  const filtered = companies.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchPackage = matchPackageRange(c.package, selectedPackage)
    const matchCategory = selectedCategory === 'All' || categoryForCompany(c) === selectedCategory
    return matchSearch && matchPackage && matchCategory
  })

  return (
    <div className="companies-page">
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

      {loading ? (
        <div className="companies-page-grid">
          <div className="companies-page-card">
            <p style={{ textAlign: 'center', color: 'var(--color-gray-400)' }}>Loading companies...</p>
          </div>
        </div>
      ) : (
        <div className="companies-page-grid">
          {filtered.map((company) => {
            const bgColor = defaultLogos[company.name.split(' ')[0]] || '#6366f1'
            return (
              <div key={company._id} className="companies-page-card">
                <div className="companies-page-card-body">
                  <div className="companies-page-card-header">
                    <div className="companies-page-card-logo" style={{ background: bgColor }}>
                      {company.logo ? (
                        <img src={company.logo} alt={`${company.name} logo`} className="companies-page-card-logo-img" />
                      ) : (
                        <span>{company.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="companies-page-card-info">
                      <h3 className="companies-page-card-name">{company.name}</h3>
                      <div className="companies-page-card-meta">
                        <span className="companies-page-card-package">
                          {company.package != null && company.package !== '' ? `${company.package} LPA` : '—'}
                        </span>
                        <span className="companies-page-card-drives">{company.industry || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  <p className="companies-page-card-desc">{company.description || 'Details coming soon.'}</p>
                </div>
                <button
                  onClick={() => navigate(`/student/company/${company._id}`)}
                  className="companies-page-card-btn"
                >
                  View Details
                  <ChevronRight size={16} />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="companies-page-empty">
          <Building2 size={48} />
          <h3>No companies found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
