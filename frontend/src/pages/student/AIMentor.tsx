import { useState, useRef, useEffect } from 'react'
import { Bot, Send, Sparkles, Zap, MessageSquare } from 'lucide-react'
import ChatMessage from '../../components/ChatMessage'
import './AIMentor.css'
import { askAI } from "../../services/chatService";

interface Message {
  text: string
  sender: 'user' | 'ai'
  timestamp: string
}

const suggestions = [
  'How should I prepare for Zoho?',
  'Explain DBMS Normalization.',
  'Java Interview Questions',
  'Amazon Coding Questions',
]

const aiResponses: Record<string, string> = {
  'how should i prepare for zoho?': `To prepare for Zoho Corporation:

1. **Master Core Java/C++** — Zoho values strong programming fundamentals
2. **Data Structures & Algorithms** — Focus on strings, arrays, linked lists, trees, and dynamic programming
3. **Database Concepts** — SQL queries, joins, normalization (very important for Zoho)
4. **OOP Principles** — Inheritance, polymorphism, encapsulation, abstraction
5. **Practice Aptitude** — Quantitative and logical reasoning
6. **Build a Project** — Zoho values practical development experience

Zoho typically has 4 rounds: Aptitude → Coding → Technical Interview → HR. The coding round is particularly challenging, so practice on LeetCode and HackerRank regularly.`,
  'java interview questions': `Here are commonly asked Java interview questions across companies:


1. **Core Java Basics** — Data types, operators, control statements
2. **OOP Concepts** — Classes, objects, inheritance, polymorphism, abstraction, encapsulation
3. **Exception Handling** — Try-catch, throws, custom exceptions
4. **Collections Framework** — List, Set, Map, Queue implementations
5. **Multithreading** — Thread creation, synchronization, executors
6. **String Handling** — String, StringBuilder, StringBuffer
7. **File I/O** — Reading/writing files, streams

Focus on understanding OOP principles deeply and practicing output prediction questions. Common interview topics include collections, exception handling, and multithreading.`,
  'explain dbms normalization.': `**DBMS Normalization** is the process of organizing data to minimize redundancy.

**1NF (First Normal Form):** Each column has atomic values, no repeating groups.

**2NF (Second Normal Form):** In 1NF + no partial dependencies (non-key attributes depend on the full primary key).

**3NF (Third Normal Form):** In 2NF + no transitive dependencies (non-key attributes don't depend on other non-key attributes).

**BCNF (Boyce-Codd Normal Form):** Tougher version of 3NF where every determinant is a candidate key.

**Example:** A student table with {StudentID, CourseID, CourseName, Instructor} — CourseName depends on CourseID, not on StudentID, so it violates 2NF. Split into Student_Course and Course tables.

Normalization typically goes up to 3NF in practice, which balances data integrity with performance.`,
  'amazon coding questions': `Common Amazon coding questions from previous drives:

1. **Two Sum** — Find two numbers that add up to a target
2. **Longest Substring Without Repeating Characters** — Sliding window
3. **Maximum Subarray Sum** — Kadane's algorithm
4. **Merge Intervals** — Sorting and merging
5. **Binary Tree Level Order Traversal** — BFS approach
6. **Product of Array Except Self** — Prefix/suffix products
7. **LRU Cache** — Design problem using HashMap + Doubly Linked List

Amazon focuses heavily on:
- **Problem-solving approach** (explain your thought process)
- **Optimization** (start with brute force, then optimize)
- **Edge cases** (test your solution thoroughly)

Practice on LeetCode's Amazon question set for the most relevant preparation.`,
}

function getCurrentTime(): string {
  const now = new Date()
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function getAIResponse(userMessage: string): string {
  const key = userMessage.toLowerCase().trim().replace(/[?.,!]/g, '')
  for (const [pattern, response] of Object.entries(aiResponses)) {
    if (key.includes(pattern) || pattern.includes(key)) {
      return response
    }
  }
  return `That's a great question! Let me provide you with some guidance.

**Preparation Tips:**
1. Start with understanding the company's hiring process and requirements
2. Strengthen your fundamentals in programming and data structures
3. Practice regularly on platforms like LeetCode and HackerRank
4. Review previous interview questions from the company
5. Work on your communication and soft skills

Would you like me to elaborate on any specific topic or company?`
}

export default function AIMentor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your AI Placement Mentor. I can help you with interview preparation, company insights, coding questions, and more. How can I assist you today? 🎯",
      sender: 'ai',
      timestamp: getCurrentTime(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isTyping])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
      window.scrollTo(0, 0)
    }
  }, [])

const handleSend = async (text?: string) => {
  const messageText = text || inputValue;

  if (!messageText.trim()) return;

  const userMessage: Message = {
    text: messageText.trim(),
    sender: "user",
    timestamp: getCurrentTime(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setInputValue("");
  setIsTyping(true);

  try {
    const reply = await askAI(messageText.trim());

    const aiMessage: Message = {
      text: reply,
      sender: "ai",
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, aiMessage]);
  } catch (error) {
    const aiMessage: Message = {
      text: "Sorry! I couldn't connect to the AI server. Please try again.",
      sender: "ai",
      timestamp: getCurrentTime(),
    };

    setMessages((prev) => [...prev, aiMessage]);
  } finally {
    setIsTyping(false);
  }
};
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="ai-mentor">
      <div className="ai-mentor-header">
        <div className="ai-mentor-header-left">
          <div className="ai-mentor-avatar">
            <Bot size={24} />
          </div>
          <div className="ai-mentor-header-info">
            <h1 className="ai-mentor-title">AI Placement Mentor</h1>
            <p className="ai-mentor-status">
              <span className="ai-mentor-status-dot" />
              Online • Ready to help
            </p>
          </div>
        </div>
        <div className="ai-mentor-header-badge">
          <Sparkles size={16} />
          <span>Powered by AI</span>
        </div>
      </div>

      <div className="ai-mentor-chat" ref={chatContainerRef}>
        <div className="ai-mentor-messages">
          {messages.map((msg, i) => (
            <ChatMessage
              key={i}
              message={msg.text}
              sender={msg.sender}
              timestamp={msg.timestamp}
            />
          ))}
          {isTyping && (
            <div className="ai-mentor-typing">
              <div className="ai-mentor-typing-dots">
                <span className="ai-mentor-typing-dot" />
                <span className="ai-mentor-typing-dot" />
                <span className="ai-mentor-typing-dot" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="ai-mentor-suggestions">
        <div className="ai-mentor-suggestions-header">
          <Zap size={14} />
          <span>Suggested Prompts</span>
        </div>
        <div className="ai-mentor-suggestions-list">
          {suggestions.map((suggestion, i) => (
            <button
              key={i}
              className="ai-mentor-suggestion-btn"
              onClick={() => handleSend(suggestion)}
            >
              <MessageSquare size={14} />
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="ai-mentor-input">
        <div className="ai-mentor-input-wrapper">
          <input
            type="text"
            placeholder="Ask your placement question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="ai-mentor-input-field"
          />
          <button
            onClick={() => handleSend()}
            className="ai-mentor-send-btn"
            disabled={!inputValue.trim() || isTyping}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
