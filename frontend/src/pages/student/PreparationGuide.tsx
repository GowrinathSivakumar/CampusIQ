import { BookOpen, ListChecks, HelpCircle, Target, ExternalLink, Lightbulb, ChevronRight } from 'lucide-react'
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

export default function PreparationGuide() {
  return (
    <div className="preparation-guide">
      <div className="preparation-guide-header">
        <div>
          <h1 className="preparation-guide-title">Preparation Guide</h1>
          <p className="preparation-guide-subtitle">Comprehensive resources to help you ace your placement interviews</p>
        </div>
        <div className="preparation-guide-count">
          <BookOpen size={18} />
          <span>Guide & Resources</span>
        </div>
      </div>

      <section className="preparation-guide-section">
        <div className="preparation-guide-section-header">
          <ListChecks size={20} />
          <h2 className="preparation-guide-section-title">Important Topics</h2>
        </div>
        <div className="preparation-guide-topics">
          {topics.map((topic) => (
            <div key={topic.title} className="preparation-guide-topic-card">
              <h3 className="preparation-guide-topic-title">{topic.title}</h3>
              <ul className="preparation-guide-topic-list">
                {topic.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
