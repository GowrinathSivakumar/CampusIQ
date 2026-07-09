import { Building2, Search, Filter } from 'lucide-react'
import './Companies.css'

const dummyCompanies = [
  { name: 'Microsoft', drives: 12, questions: 245, placement: '₹45 LPA', status: 'Active' },
  { name: 'Google', drives: 8, questions: 312, placement: '₹42 LPA', status: 'Active' },
  { name: 'Amazon', drives: 15, questions: 189, placement: '₹38 LPA', status: 'Active' },
  { name: 'TCS', drives: 25, questions: 156, placement: '₹12 LPA', status: 'Active' },
  { name: 'Infosys', drives: 20, questions: 134, placement: '₹14 LPA', status: 'Active' },
  { name: 'Zoho', drives: 10, questions: 98, placement: '₹18 LPA', status: 'Active' },
  { name: 'Accenture', drives: 18, questions: 167, placement: '₹16 LPA', status: 'Active' },
  { name: 'Wipro', drives: 22, questions: 112, placement: '₹11 LPA', status: 'Inactive' },
]

export default function Companies() {
  return (
    <div className="companies-page">
      <div className="companies-header">
        <div className="companies-header-top">
          <button className="companies-add-btn">
            <Building2 size={16} />
            Add Company
          </button>
        </div>

        <div className="companies-toolbar">
          <div className="companies-search-wrapper">
            <Search size={16} className="companies-search-icon" />
            <input type="text" placeholder="Search companies..." className="companies-search" />
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
            {dummyCompanies.map((company) => (
              <tr key={company.name}>
                <td>
                  <div className="company-name-cell">
                    <div className="company-icon"><Building2 size={16} /></div>
                    <span className="company-name">{company.name}</span>
                  </div>
                </td>
                <td><span className="company-stat">{company.drives}</span></td>
                <td><span className="company-stat">{company.questions}</span></td>
                <td><span className="company-package">{company.placement}</span></td>
                <td>
                  <span className={`company-badge ${company.status.toLowerCase()}`}>
                    {company.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
