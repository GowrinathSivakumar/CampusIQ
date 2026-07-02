import { useState } from 'react'
import { HelpCircle, Search, Filter, ChevronDown, Code2, Brain, Users, MessageCircle } from 'lucide-react'
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
  // Aptitude
  { id: 1, question: 'If a train 100 m long passes a pole in 10 seconds, what is its speed?', company: 'TCS', topic: 'Aptitude', difficulty: 'Easy', round: 'Aptitude' },
  { id: 2, question: 'Find the next number in the series: 2, 6, 12, 20, 30, ?', company: 'Infosys', topic: 'Aptitude', difficulty: 'Medium', round: 'Aptitude' },
  { id: 3, question: 'A bag contains 3 red, 4 green, and 5 blue balls. What is the probability of drawing a green ball?', company: 'Wipro', topic: 'Aptitude', difficulty: 'Easy', round: 'Aptitude' },
  { id: 4, question: 'If log2 = 0.3010, what is log5?', company: 'TCS', topic: 'Aptitude', difficulty: 'Hard', round: 'Aptitude' },
  // Coding
  { id: 5, question: 'Given an array of integers, find the two numbers that sum to a target value.', company: 'Amazon', topic: 'Coding', difficulty: 'Medium', round: 'Coding' },
  { id: 6, question: 'Implement a function to check if a string is a valid palindrome considering only alphanumeric characters.', company: 'Google', topic: 'Coding', difficulty: 'Easy', round: 'Coding' },
  { id: 7, question: 'Find the longest substring without repeating characters in a given string.', company: 'Zoho', topic: 'Coding', difficulty: 'Medium', round: 'Coding' },
  { id: 8, question: 'Given a binary tree, find the maximum path sum from any node to any node.', company: 'Microsoft', topic: 'Coding', difficulty: 'Hard', round: 'Coding' },
  // Technical
  { id: 9, question: 'Explain the difference between process and thread. How do they communicate?', company: 'Zoho', topic: 'Technical', difficulty: 'Medium', round: 'Technical' },
  { id: 10, question: 'What is normalization in DBMS? Explain 1NF, 2NF, 3NF with examples.', company: 'TCS', topic: 'Technical', difficulty: 'Medium', round: 'Technical' },
  { id: 11, question: 'Explain polymorphism in OOP with real-world examples.', company: 'Amazon', topic: 'Technical', difficulty: 'Easy', round: 'Technical' },
  { id: 12, question: 'What is the difference between TCP and UDP? When would you use each?', company: 'Infosys', topic: 'Technical', difficulty: 'Medium', round: 'Technical' },
  { id: 13, question: 'Explain deadlock in operating systems and its prevention techniques.', company: 'Google', topic: 'Technical', difficulty: 'Hard', round: 'Technical' },
  { id: 14, question: 'What is the significance of the Java Virtual Machine (JVM)?', company: 'TCS', topic: 'Technical', difficulty: 'Easy', round: 'Technical' },
  // HR
  { id: 15, question: 'Tell me about yourself and your career aspirations.', company: 'Amazon', topic: 'HR', difficulty: 'Easy', round: 'HR' },
  { id: 16, question: 'Describe a time you faced a challenge and how you overcame it.', company: 'Google', topic: 'HR', difficulty: 'Medium', round: 'HR' },
  { id: 17, question: 'Where do you see yourself in 5 years?', company: 'TCS', topic: 'HR', difficulty: 'Easy', round: 'HR' },
  { id: 18, question: 'Why do you want to work at our company?', company: 'Zoho', topic: 'HR', difficulty: 'Easy', round: 'HR' },
]

const companies = ['All Companies', ...new Set(questions.map((q) => q.company))]
const topics = ['All Topics', ...new Set(questions.map((q) => q.topic))]
const difficulties = ['All Difficulties', 'Easy', 'Medium', 'Hard']
const rounds = ['All Rounds', ...new Set(questions.map((q) => q.round))]

const roundIcons: Record<string, typeof HelpCircle> = {
  Aptitude: Brain,
  Coding: Code2,
  Technical: Users,
  HR: MessageCircle,
}

interface QuestionCardProps {
  question: Question
}

function QuestionCard({ question }: QuestionCardProps) {
  const difficultyClass = question.difficulty.toLowerCase()

  return (
    <div className="questions-card">
      <div className="questions-card-top">
        <span className={`questions-card-difficulty ${difficultyClass}`}>
          {question.difficulty}
        </span>
        <span className="questions-card-company">{question.company}</span>
      </div>
      <p className="questions-card-text">{question.question}</p>
      <div className="questions-card-bottom">
        <span className="questions-card-topic">{question.topic}</span>
        <span className="questions-card-round">{question.round}</span>
      </div>
    </div>
  )
}

export default function InterviewQuestions() {
  const [searchTerm, setSearchTerm] = useState('')
  const [company, setCompany] = useState('All Companies')
  const [topic, setTopic] = useState('All Topics')
  const [difficulty, setDifficulty] = useState('All Difficulties')
  const [round, setRound] = useState('All Rounds')

  const filtered = questions.filter((q) => {
    const matchSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCompany = company === 'All Companies' || q.company === company
    const matchTopic = topic === 'All Topics' || q.topic === topic
    const matchDifficulty = difficulty === 'All Difficulties' || q.difficulty === difficulty
    const matchRound = round === 'All Rounds' || q.round === round
    return matchSearch && matchCompany && matchTopic && matchDifficulty && matchRound
  })

  const grouped = filtered.reduce<Record<string, Question[]>>((acc, q) => {
    if (!acc[q.round]) acc[q.round] = []
    acc[q.round].push(q)
    return acc
  }, {})

  const roundOrder = ['Aptitude', 'Coding', 'Technical', 'HR']

  return (
    <div className="questions-page">
      <div className="questions-page-header">
        <div>
          <h1 className="questions-page-title">Interview Questions</h1>
          <p className="questions-page-subtitle">Browse and practice interview questions from previous drives</p>
        </div>
        <div className="questions-page-count">
          <HelpCircle size={18} />
          <span>{questions.length} Questions</span>
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
            <select value={company} onChange={(e) => setCompany(e.target.value)}>
              {companies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={14} />
          </div>
          <div className="questions-page-select">
            <Filter size={14} />
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
              {topics.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <ChevronDown size={14} />
          </div>
          <div className="questions-page-select">
            <Filter size={14} />
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              {difficulties.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <ChevronDown size={14} />
          </div>
          <div className="questions-page-select">
            <Filter size={14} />
            <select value={round} onChange={(e) => setRound(e.target.value)}>
              {rounds.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      <div className="questions-page-content">
        {roundOrder.map((roundName) => {
          const roundQuestions = grouped[roundName]
          if (!roundQuestions) return null
          const Icon = roundIcons[roundName] || HelpCircle

          return (
            <div key={roundName} className="questions-round-section">
              <div className="questions-round-header">
                <div className="questions-round-title-icon">
                  <Icon size={20} />
                </div>
                <div>
                  <h2 className="questions-round-title">{roundName} Questions</h2>
                  <span className="questions-round-count">{roundQuestions.length} questions</span>
                </div>
              </div>
              <div className="questions-round-grid">
                {roundQuestions.map((q) => (
                  <QuestionCard key={q.id} question={q} />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="questions-page-empty">
          <HelpCircle size={48} />
          <h3>No questions found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
