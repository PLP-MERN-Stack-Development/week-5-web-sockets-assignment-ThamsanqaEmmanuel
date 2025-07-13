import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Login.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setIsAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    const cleanUsername = username.trim()
    
    if (!cleanUsername) {
      setError('Please enter a username')
      return
    }

    setLoading(true)
    
    try {
      // Simulate API call
      setTimeout(() => {
        localStorage.setItem('chatToken', 'dummy-token')
        localStorage.setItem('currentUser', JSON.stringify({ 
          id: Date.now().toString(), 
          name: cleanUsername 
        }))
        setIsAuthenticated(true)
        navigate('/chat')
      }, 500)
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome to ChatApp</h1>
        <p>Enter your username to join the chat</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              setError('')
            }}
            placeholder="Username"
            className="login-input"
            aria-label="Username"
            aria-invalid={!!error}
            aria-describedby="error-message"
            disabled={loading}
          />
          {error && (
            <div id="error-message" className="error-message">
              {error}
            </div>
          )}
          <button 
            type="submit" 
            className="login-button"
            disabled={loading || !username.trim()}
          >
            {loading ? 'Loading...' : 'Join Chat'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login