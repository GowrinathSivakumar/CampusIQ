import { useState, useEffect } from 'react'
import { HelpCircle, Search, Filter } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getQuestions, type Question } from '../../services/questionService'
import './Questions.css'

export default function Questions() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    let mounted = true

    async function fetchQuestions() {
      try {
        setLoading(true)
        const data = await getQuestions({ limit: 200 })
        if (mounted) setQuestions(data.questions)
      } catch {
        if (mounted) setQuestions([])
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchQuestions()
    return () => {
      mounted = false
    }
  }, [])

  const filtered = questions.filter((q) => {
    if (!search) return true
    const ql = search.toLowerCase()
    return (
      q.question.toLowerCase().includes(ql) ||
      (q.company || '').toLowerCase().includes(ql) ||
      (q.category || '').toLowerCase().includes(ql)
    )
  })

  return (
    <div className="questions-page">
      <div className="questions-header">
        <button className="questions-add-btn" onClick={() => navigate('/admin/questions/add')}>
          <HelpCircle size={16} />
          Add Question
        </button>
      </div>

      <div className="questions-toolbar">
        <div className="questions-search-wrapper">
          <Search size={16} className="questions-search-icon" />
          <input
            type="text"
            placeholder="Search questions..."
            className="questions-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="questions-filter-btn">
          <Filter size={14} />
          Filters
        </button>
      </div>

      <div className="questions-table-wrapper">
        <table className="questions-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Company</th>
              <th>Type</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '24px', color: 'var(--color-gray-400)' }}>
                  Loading questions...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '24px', color: 'var(--color-gray-400)' }}>
                  No questions found
                </td>
              </tr>
            ) : (
              filtered.map((q) => (
                <tr key={q._id}>
                  <td><span className="question-text">{q.question}</span></td>
                  <td><span className="question-company">{q.company || 'General'}</span></td>
                  <td><span className="question-type-badge">{q.category}</span></td>
                  <td>
                    <span className={`question-difficulty-badge ${(q.difficulty || 'Medium').toLowerCase()}`}>
                      {q.difficulty || 'Medium'}
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
