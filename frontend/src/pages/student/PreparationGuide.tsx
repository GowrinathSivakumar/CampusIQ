import { useState } from 'react'
import { ListChecks, HelpCircle, Target, ExternalLink, Lightbulb, ChevronRight, ArrowLeft } from 'lucide-react'
import './PreparationGuide.css'

const topics = [
  { title: 'Data Structures & Algorithms', items: ['Arrays & Strings', 'Linked Lists', 'Trees & Graphs', 'Dynamic Programming', 'Sorting & Searching'], icon: ListChecks },
  { title: 'Object-Oriented Programming', items: ['Classes & Objects', 'Inheritance & Polymorphism', 'Encapsulation & Abstraction', 'Interfaces & Abstract Classes'], icon: ListChecks },
  { title: 'Database Management Systems', items: ['Normalization', 'SQL Queries', 'Indexing & Transactions', 'Joins & Subqueries'], icon: ListChecks },
  { title: 'Operating Systems', items: ['Process Management', 'Memory Management', 'File Systems', 'Deadlocks & Scheduling'], icon: ListChecks },
  { title: 'Computer Networks', items: ['OSI & TCP/IP Models', 'HTTP & DNS', 'Routing Protocols', 'Network Security'], icon: ListChecks },
  { title: 'Programming Languages', items: ['Java / Python / C++', 'Core Concepts', 'Exception Handling', 'Collections Framework'], icon: ListChecks },
]

const faqs = [
  { question: 'How should I start preparing for placements?', answer: 'Begin with understanding the company\'s hiring process, then focus on strengthening your fundamentals in programming, data structures, and algorithms. Practice regularly on competitive programming platforms.' },
  { question: 'Which programming language is best for placements?', answer: 'Java and Python are widely accepted. Java is preferred for its strong OOP concepts, while Python is excellent for coding interviews due to its simplicity.' },
  { question: 'How important is the aptitude round?', answer: 'Aptitude rounds test your logical thinking and problem-solving speed. Many companies use them as an initial filter, so consistent practice is essential.' },
  { question: 'What should I prepare for HR interviews?', answer: 'Focus on communication skills, understanding of the company, your career goals, and behavioral questions. Be honest and confident in your responses.' },
]

const strategy = [
  { step: '1', title: 'Assess Your Skills', description: 'Identify your strengths and areas for improvement across technical, aptitude, and soft skills.' },
  { step: '2', title: 'Build Fundamentals', description: 'Strengthen core concepts in programming, DSA, DBMS, OS, and networking.' },
  { step: '3', title: 'Practice Regularly', description: 'Solve coding problems daily, take mock tests, and practice aptitude questions.' },
  { step: '4', title: 'Apply & Interview', description: 'Apply to companies, attend drives, and continuously learn from each interview experience.' },
]

const resources = [
  { title: 'LeetCode', description: 'Practice coding problems with company-specific question sets', url: 'https://leetcode.com' },
  { title: 'GeeksforGeeks', description: 'Comprehensive tutorials on DSA, DBMS, OS, and interview experiences', url: 'https://geeksforgeeks.org' },
  { title: 'HackerRank', description: 'Coding challenges and skill assessments for placements', url: 'https://hackerrank.com' },
  { title: 'CodeChef', description: 'Competitive programming platform with regular contests', url: 'https://codechef.com' },
]

const tips = [
  'Create a consistent study schedule and stick to it daily.',
  'Focus on understanding concepts rather than memorizing answers.',
  'Participate in mock interviews to build confidence.',
  'Keep your resume updated and tailored for each company.',
  'Network with seniors and learn from their placement experiences.',
  'Stay updated with industry trends and company-specific requirements.',
  'Practice writing code on paper to prepare for offline interviews.',
  'Maintain a healthy work-life balance during preparation.',
]

const subjectColors: Record<string, string> = {
  'Data Structures & Algorithms': '#7c3aed',
  'Object-Oriented Programming': '#2563eb',
  'Database Management Systems': '#059669',
  'Operating Systems': '#d97706',
  'Computer Networks': '#dc2626',
  'Programming Languages': '#0891b2',
}

export default function PreparationGuide() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  const currentTopic = selectedSubject
    ? topics.find((t) => t.title === selectedSubject)
    : null

  return (
    <div className="preparation-guide">
      <div className="preparation-guide-top-row">
        <section className="preparation-guide-section">
          <div className="preparation-guide-section-header">
            <ListChecks size={20} />
            <h2 className="preparation-guide-section-title">Important Topics</h2>
          </div>

          {selectedSubject === null ? (
            <div className="preparation-guide-topics">
              {topics.map((topic) => (
                <button
                  key={topic.title}
                  className="preparation-guide-topic-card"
                  onClick={() => setSelectedSubject(topic.title)}
                >
                  <div
                    className="preparation-guide-topic-icon"
                    style={{ background: subjectColors[topic.title] }}
                  >
                    <topic.icon size={22} />
                  </div>
                  <h3 className="preparation-guide-topic-title">{topic.title}</h3>
                  <span className="preparation-guide-topic-count">
                    {topic.items.length} topics
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="preparation-guide-subject-detail">
              <button
                className="preparation-guide-back-btn"
                onClick={() => setSelectedSubject(null)}
              >
                <ArrowLeft size={16} />
                <span>All Subjects</span>
              </button>

              {currentTopic && (
                <div className="preparation-guide-subject-card">
                  <div className="preparation-guide-subject-header">
                    <div
                      className="preparation-guide-subject-icon"
                      style={{ background: subjectColors[currentTopic.title] }}
                    >
                      <currentTopic.icon size={24} />
                    </div>
                    <h3 className="preparation-guide-subject-title">{currentTopic.title}</h3>
                  </div>
                  <ul className="preparation-guide-subject-list">
                    {currentTopic.items.map((item) => (
                      <li key={item}>
                        <span className="preparation-guide-subject-bullet" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>

        <section className="preparation-guide-section">
          <div className="preparation-guide-section-header">
            <HelpCircle size={20} />
            <h2 className="preparation-guide-section-title">Frequently Asked Questions</h2>
          </div>
          <div className="preparation-guide-faqs">
            {faqs.map((faq) => (
              <details key={faq.question} className="preparation-guide-faq">
                <summary className="preparation-guide-faq-question">
                  <span>{faq.question}</span>
                  <ChevronRight size={16} />
                </summary>
                <p className="preparation-guide-faq-answer">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <section className="preparation-guide-section">
        <div className="preparation-guide-section-header">
          <Target size={20} />
          <h2 className="preparation-guide-section-title">Preparation Strategy</h2>
        </div>
        <div className="preparation-guide-strategy">
          {strategy.map((s) => (
            <div key={s.step} className="preparation-guide-strategy-card">
              <span className="preparation-guide-strategy-step">{s.step}</span>
              <div className="preparation-guide-strategy-content">
                <h3 className="preparation-guide-strategy-title">{s.title}</h3>
                <p className="preparation-guide-strategy-desc">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="preparation-guide-section">
        <div className="preparation-guide-section-header">
          <ExternalLink size={20} />
          <h2 className="preparation-guide-section-title">Recommended Resources</h2>
        </div>
        <div className="preparation-guide-resources">
          {resources.map((resource) => (
            <a key={resource.title} href={resource.url} target="_blank" rel="noopener noreferrer" className="preparation-guide-resource-card">
              <h3 className="preparation-guide-resource-title">{resource.title}</h3>
              <p className="preparation-guide-resource-desc">{resource.description}</p>
              <span className="preparation-guide-resource-link">
                Visit Website
                <ExternalLink size={14} />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="preparation-guide-section">
        <div className="preparation-guide-section-header">
          <Lightbulb size={20} />
          <h2 className="preparation-guide-section-title">Interview Tips</h2>
        </div>
        <div className="preparation-guide-tips">
          {tips.map((tip, i) => (
            <div key={i} className="preparation-guide-tip-card">
              <span className="preparation-guide-tip-number">{String(i + 1).padStart(2, '0')}</span>
              <p className="preparation-guide-tip-text">{tip}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
