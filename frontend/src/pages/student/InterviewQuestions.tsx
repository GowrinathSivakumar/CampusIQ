import { useState, useEffect } from 'react'
import {
  HelpCircle, Search, Filter, ChevronDown,
  ArrowLeft, Brain, Code2, Users, MessageCircle,
} from 'lucide-react'
import { getQuestions, type Question } from '../../services/questionService'
import './InterviewQuestions.css'

interface DisplayQuestion {
  id: string
  question: string
  company: string
  topic: string
  difficulty: string
  round: string
}

const difficulties = ['All Difficulties', 'Easy', 'Medium', 'Hard']

const categories = [
  { key: 'Aptitude', label: 'Aptitude Questions', icon: Brain, color: '#7c3aed', desc: 'Quantitative aptitude, logical reasoning, and verbal ability questions from previous drives.' },
  { key: 'Technical', label: 'Technical Questions', icon: Users, color: '#2563eb', desc: 'Core technical questions covering programming concepts, DBMS, OS, networks, and more.' },
  { key: 'Coding', label: 'Coding Questions', icon: Code2, color: '#059669', desc: 'Hands-on coding problems focusing on algorithms, data structures, and problem-solving.' },
  { key: 'HR', label: 'HR Questions', icon: MessageCircle, color: '#d97706', desc: 'Common HR interview questions including behavioral, situational, and career-related topics.' },
]

const categoryIcons: Record<string, typeof Brain> = {
  Aptitude: Brain,
  Coding: Code2,
  Technical: Users,
  HR: MessageCircle,
}

function mapQuestion(q: Question): DisplayQuestion {
  return {
    id: q._id,
    question: q.question,
    company: q.company || 'General',
    topic: q.category,
    difficulty: q.difficulty,
    round: q.category,
  }
}

export default function InterviewQuestions() {
  const [questions, setQuestions] = useState<DisplayQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [difficulty, setDifficulty] = useState('All Difficulties')

  useEffect(() => {
    fetchQuestions()
  }, [])

  async function fetchQuestions() {
    try {
      setLoading(true)
      const data = await getQuestions({ limit: 200 })
      setQuestions(data.questions.map(mapQuestion))
    } catch {
      setQuestions([])
    } finally {
      setLoading(false)
    }
  }

  const filtered = questions.filter((q) => {
    const matchSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = selectedCategory === null || q.topic === selectedCategory
    const matchDifficulty = difficulty === 'All Difficulties' || q.difficulty === difficulty
    return matchSearch && matchCategory && matchDifficulty
  })

  if (loading) {
    return (
      <div className="questions-page">
        <div className="questions-page-empty">
          <HelpCircle size={48} />
          <h3>Loading questions...</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="questions-page">
      {selectedCategory === null ? (
        <>
          <div className="questions-page-filters">
            <div className="questions-page-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="questions-category-grid">
            {categories.map((cat) => {
              const count = questions.filter((q) => q.topic === cat.key).length
              return (
                <button
                  key={cat.key}
                  className="questions-category-card"
                  onClick={() => setSelectedCategory(cat.key)}
                >
                  <div className="questions-category-icon" style={{ background: cat.color }}>
                    <cat.icon size={28} />
                  </div>
                  <h3 className="questions-category-title">{cat.label}</h3>
                  <p className="questions-category-desc">{cat.desc}</p>
                  <span className="questions-category-count">{count} questions</span>
                </button>
              )
            })}
          </div>

          {searchTerm && filtered.length === 0 && (
            <div className="questions-page-empty">
              <HelpCircle size={48} />
              <h3>No questions found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="questions-nav-bar">
            <button className="questions-back-btn" onClick={() => { setSelectedCategory(null); setDifficulty('All Difficulties'); setSearchTerm('') }}>
              <ArrowLeft size={16} />
              <span>Back to Categories</span>
            </button>
            <div className="questions-nav-title">
              <div className="questions-nav-icon">
                {(() => {
                  const Icon = categoryIcons[selectedCategory] || HelpCircle
                  return <Icon size={18} />
                })()}
              </div>
              <span>{categories.find((c) => c.key === selectedCategory)?.label}</span>
            </div>
          </div>

          <div className="questions-page-filters">
            <div className="questions-page-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="questions-page-filter-row">
              <div className="questions-page-select">
                <Filter size={14} />
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                  {difficulties.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          <div className="questions-table-wrapper">
            <table className="questions-table">
              <thead>
                <tr>
                  <th className="q-col-sno">#</th>
                  <th className="q-col-question">Question</th>
                  <th className="q-col-company">Company</th>
                  <th className="q-col-difficulty">Difficulty</th>
                  <th className="q-col-round">Round</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="q-empty-cell">
                      <div className="questions-page-empty">
                        <HelpCircle size={48} />
                        <h3>No questions found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((q, idx) => (
                    <tr key={q.id}>
                      <td className="q-col-sno">{idx + 1}</td>
                      <td className="q-col-question">{q.question}</td>
                      <td className="q-col-company">{q.company}</td>
                      <td className="q-col-difficulty">
                        <span className={`questions-card-difficulty ${q.difficulty.toLowerCase()}`}>
                          {q.difficulty}
                        </span>
                      </td>
                      <td className="q-col-round">{q.round}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
