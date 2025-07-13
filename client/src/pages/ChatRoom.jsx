import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'
import TypingIndicator from '../components/TypingIndicator'
import UserList from '../components/UserList'
import Pagination from '../components/Pagination'
import '../styles/ChatRoom.css'

const ChatRoom = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [usersTyping, setUsersTyping] = useState([])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
      return
    }

    // Simulate fetching current user from localStorage
    const user = JSON.parse(localStorage.getItem('currentUser'))
    setCurrentUser(user)

    // Simulate initial messages
    setMessages([
      {
        id: '1',
        content: 'Welcome to the chat room!',
        senderId: 'system',
        senderName: 'System',
        timestamp: new Date().toISOString(),
      },
    ])

    // Simulate initial users
    setUsers([
      { id: user.id, name: user.name, isTyping: false },
      { id: '2', name: 'Alice', isTyping: false },
      { id: '3', name: 'Bob', isTyping: false },
    ])
  }, [isAuthenticated, navigate])

  const handleSendMessage = useCallback((message) => {
    if (!message.trim() || !currentUser) return

    const newMessage = {
      id: Date.now().toString(),
      content: message,
      senderId: currentUser.id,
      senderName: currentUser.name,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newMessage])
  }, [currentUser])

  const handleUserSelect = (user) => {
    navigate(`/private/${user.id}`)
  }

  const handleLogout = () => {
    localStorage.removeItem('chatToken')
    localStorage.removeItem('currentUser')
    setIsAuthenticated(false)
    navigate('/')
  }

  if (!currentUser) return <div>Loading...</div>

  return (
    <div className="chat-room-container">
      <div className="chat-header">
        <h2>Chat Room</h2>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="chat-content">
        <UserList 
          users={users} 
          currentUser={currentUser} 
          onUserSelect={handleUserSelect} 
        />
        <div className="chat-messages">
          <TypingIndicator usersTyping={usersTyping} />
          <MessageList messages={messages} currentUserId={currentUser.id} />
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  )


  
}

export default ChatRoom