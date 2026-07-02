import { Bot, User } from 'lucide-react'
import './ChatMessage.css'

interface ChatMessageProps {
  message: string
  sender: 'user' | 'ai'
  timestamp?: string
}

export default function ChatMessage({ message, sender, timestamp }: ChatMessageProps) {
  return (
    <div className={`chat-message ${sender === 'ai' ? 'ai' : 'user'}`}>
      <div className={`chat-message-avatar ${sender === 'ai' ? 'ai' : 'user'}`}>
        {sender === 'ai' ? <Bot size={18} /> : <User size={18} />}
      </div>
      <div className="chat-message-content">
        <div className="chat-message-bubble">
          <p className="chat-message-text">{message}</p>
        </div>
        {timestamp && <span className="chat-message-time">{timestamp}</span>}
      </div>
    </div>
  )
}
