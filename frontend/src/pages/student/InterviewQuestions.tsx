import { useState } from 'react'
import {
  HelpCircle, Search, Filter, ChevronDown,
  ArrowLeft, Brain, Code2, Users, MessageCircle,
} from 'lucide-react'
import './InterviewQuestions.css'

interface Question {
  id: number
  question: string
  company: string
  topic: string
  difficulty: string
  round: string
}

const questions: Question[] = [
  { id: 1, question: 'If a train 100 m long passes a pole in 10 seconds, what is its speed?', company: 'TCS', topic: 'Aptitude', difficulty: 'Easy', round: 'Aptitude' },
  { id: 2, question: 'Find the next number in the series: 2, 6, 12, 20, 30, ?', company: 'Infosys', topic: 'Aptitude', difficulty: 'Medium', round: 'Aptitude' },
  { id: 3, question: 'A bag contains 3 red, 4 green, and 5 blue balls. What is the probability of drawing a green ball?', company: 'Wipro', topic: 'Aptitude', difficulty: 'Easy', round: 'Aptitude' },
  { id: 4, question: 'If log2 = 0.3010, what is log5?', company: 'TCS', topic: 'Aptitude', difficulty: 'Hard', round: 'Aptitude' },
  { id: 5, question: 'Given an array of integers, find the two numbers that sum to a target value.', company: 'Amazon', topic: 'Coding', difficulty: 'Medium', round: 'Coding' },
  { id: 6, question: 'Implement a function to check if a string is a valid palindrome considering only alphanumeric characters.', company: 'Google', topic: 'Coding', difficulty: 'Easy', round: 'Coding' },
  { id: 7, question: 'Find the longest substring without repeating characters in a given string.', company: 'Zoho', topic: 'Coding', difficulty: 'Medium', round: 'Coding' },
  { id: 8, question: 'Given a binary tree, find the maximum path sum from any node to any node.', company: 'Microsoft', topic: 'Coding', difficulty: 'Hard', round: 'Coding' },
  { id: 9, question: 'Explain the difference between process and thread. How do they communicate?', company: 'Zoho', topic: 'Technical', difficulty: 'Medium', round: 'Technical' },
  { id: 10, question: 'What is normalization in DBMS? Explain 1NF, 2NF, 3NF with examples.', company: 'TCS', topic: 'Technical', difficulty: 'Medium', round: 'Technical' },
  { id: 11, question: 'Explain polymorphism in OOP with real-world examples.', company: 'Amazon', topic: 'Technical', difficulty: 'Easy', round: 'Technical' },
  { id: 12, question: 'What is the difference between TCP and UDP? When would you use each?', company: 'Infosys', topic: 'Technical', difficulty: 'Medium', round: 'Technical' },
  { id: 13, question: 'Explain deadlock in operating systems and its prevention techniques.', company: 'Google', topic: 'Technical', difficulty: 'Hard', round: 'Technical' },
  { id: 14, question: 'What is the significance of the Java Virtual Machine (JVM)?', company: 'TCS', topic: 'Technical', difficulty: 'Easy', round: 'Technical' },
  { id: 15, question: 'Tell me about yourself and your career aspirations.', company: 'Amazon', topic: 'HR', difficulty: 'Easy', round: 'HR' },
  { id: 16, question: 'Describe a time you faced a challenge and how you overcame it.', company: 'Google', topic: 'HR', difficulty: 'Medium', round: 'HR' },
  { id: 17, question: 'Where do you see yourself in 5 years?', company: 'TCS', topic: 'HR', difficulty: 'Easy', round: 'HR' },
  { id: 18, question: 'Why do you want to work at our company?', company: 'Zoho', topic: 'HR', difficulty: 'Easy', round: 'HR' },
]

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

export default function InterviewQuestions() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [difficulty, setDifficulty] = useState('All Difficulties')

  const filtered = questions.filter((q) => {
    const matchSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = selectedCategory === null || q.topic === selectedCategory
    const matchDifficulty = difficulty === 'All Difficulties' || q.difficulty === difficulty
    return matchSearch && matchCategory && matchDifficulty
  })

  const category = categories.find((c) => c.key === selectedCategory)

  function goBack() {
    setSelectedCategory(null)
    setDifficulty('All Difficulties')
    setSearchTerm('')
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
            <button className="questions-back-btn" onClick={goBack}>
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
              <span>{category?.label}</span>
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
