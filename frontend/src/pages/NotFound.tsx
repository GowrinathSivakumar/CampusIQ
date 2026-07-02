import { useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'
import './NotFound.css'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-code">404</h1>
        <p className="not-found-title">Page not found</p>
        <p className="not-found-desc">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button onClick={() => navigate('/')} className="not-found-btn">
          <Home size={16} />
          Back to Home
        </button>
      </div>
    </div>
  )
}
