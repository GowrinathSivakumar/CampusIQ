import { Lightbulb, Plus, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './Preparation.css'

const dummyTips = [
  { title: 'Master Data Structures & Algorithms', category: 'Technical', author: 'Admin', date: '10-07-2026' },
  { title: 'How to Ace HR Interviews', category: 'Soft Skills', author: 'Admin', date: '08-07-2026' },
  { title: 'Top 50 System Design Questions', category: 'Technical', author: 'Admin', date: '05-07-2026' },
  { title: 'Resume Building Guide for Freshers', category: 'Career', author: 'Admin', date: '01-07-2026' },
  { title: 'Common Java Interview Questions', category: 'Technical', author: 'Admin', date: '28-06-2026' },
  { title: 'Group Discussion Tips & Tricks', category: 'Soft Skills', author: 'Admin', date: '25-06-2026' },
]

export default function Preparation() {
  const navigate = useNavigate()

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
        <input type="text" placeholder="Search tips..." className="preparation-search" />
      </div>

      <div className="preparation-grid">
        {dummyTips.map((tip) => (
          <div key={tip.title} className="tip-card">
            <div className="tip-card-top">
              <div className="tip-card-icon"><Lightbulb size={18} /></div>
              <div>
                <h3 className="tip-card-title">{tip.title}</h3>
                <p className="tip-card-author">by {tip.author}</p>
              </div>
            </div>
            <div className="tip-card-footer">
              <span className="tip-card-category">{tip.category}</span>
              <span className="tip-card-date">{tip.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
