import { History, Search } from 'lucide-react'
import './PreviousDrives.css'

const dummyDrives = [
  { company: 'Microsoft', role: 'Software Engineer', date: '15-06-2026', students: 12, package: '₹45 LPA' },
  { company: 'Google', role: 'SDE Intern', date: '10-06-2026', students: 8, package: '₹42 LPA' },
  { company: 'Amazon', role: 'Frontend Developer', date: '05-06-2026', students: 15, package: '₹38 LPA' },
  { company: 'TCS', role: 'System Engineer', date: '28-05-2026', students: 45, package: '₹12 LPA' },
  { company: 'Infosys', role: 'Associate Developer', date: '20-05-2026', students: 38, package: '₹14 LPA' },
  { company: 'Zoho', role: 'Full Stack Developer', date: '15-05-2026', students: 10, package: '₹18 LPA' },
]

export default function PreviousDrives() {
  return (
    <div className="drives-page">
      <div className="drives-header">
        <div>
          <h1>Previous Drives</h1>
          <p>View and manage past placement drives</p>
        </div>
        <button className="drives-upload-btn">
          <History size={16} />
          Upload Drive
        </button>
      </div>

      <div className="drives-search-wrapper">
        <Search size={16} className="drives-search-icon" />
        <input type="text" placeholder="Search drives..." className="drives-search" />
      </div>

      <div className="drives-grid">
        {dummyDrives.map((drive) => (
          <div key={`${drive.company}-${drive.date}`} className="drive-card">
            <div className="drive-card-top">
              <div className="drive-card-icon"><History size={20} /></div>
              <span className="drive-card-date">{drive.date}</span>
            </div>
            <h3 className="drive-card-company">{drive.company}</h3>
            <p className="drive-card-role">{drive.role}</p>
            <div className="drive-card-footer">
              <span className="drive-card-students">{drive.students} students placed</span>
              <span className="drive-card-package">{drive.package}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
