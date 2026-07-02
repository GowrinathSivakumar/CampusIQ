import { HelpCircle, Search, Filter } from 'lucide-react'
import './Questions.css'

const dummyQuestions = [
  { question: 'Explain the difference between var, let, and const', company: 'Microsoft', type: 'Technical', difficulty: 'Easy' },
  { question: 'Implement a function to reverse a linked list', company: 'Google', type: 'Coding', difficulty: 'Hard' },
  { question: 'What is the OSI model? Explain each layer', company: 'Amazon', type: 'Technical', difficulty: 'Medium' },
  { question: 'Design a parking lot system', company: 'TCS', type: 'System Design', difficulty: 'Hard' },
  { question: 'Explain RESTful API principles', company: 'Infosys', type: 'Technical', difficulty: 'Easy' },
  { question: 'Write SQL query to find second highest salary', company: 'Zoho', type: 'Coding', difficulty: 'Medium' },
  { question: 'What are React hooks? Explain useState and useEffect', company: 'Microsoft', type: 'Technical', difficulty: 'Easy' },
  { question: 'Implement a rate limiter', company: 'Google', type: 'System Design', difficulty: 'Hard' },
]

export default function Questions() {
  return (
    <div className="questions-page">
      <div className="questions-header">
        <div>
          <h1>Interview Questions</h1>
          <p>Browse and manage interview questions</p>
        </div>
        <button className="questions-add-btn">
          <HelpCircle size={16} />
          Add Question
        </button>
      </div>

      <div className="questions-toolbar">
        <div className="questions-search-wrapper">
          <Search size={16} className="questions-search-icon" />
          <input type="text" placeholder="Search questions..." className="questions-search" />
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
            {dummyQuestions.map((q, i) => (
              <tr key={i}>
                <td><span className="question-text">{q.question}</span></td>
                <td><span className="question-company">{q.company}</span></td>
                <td><span className="question-type-badge">{q.type}</span></td>
                <td>
                  <span className={`question-difficulty-badge ${q.difficulty.toLowerCase()}`}>
                    {q.difficulty}
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
