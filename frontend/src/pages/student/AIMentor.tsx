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

function getCurrentTime(): string {
  const now = new Date()
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
