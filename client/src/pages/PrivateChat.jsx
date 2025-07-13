import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'
import TypingIndicator from '../components/TypingIndicator'
import '../styles/PrivateChat.css'

const PrivateChat = () => {
  const { userId } = useParams()
  const { isAuthenticated, setIsAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [recipient, setRecipient] = useState(null)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
      return
    }

    // Simulate fetching current user from localStorage
    const user = JSON.parse(localStorage.getItem('currentUser'))
    setCurrentUser(user)

    // Simulate fetching recipient
    const dummyRecipients = [
      { id: '2', name: 'Alice' },
      { id: '3', name: 'Bob' },
    ]
    const foundRecipient = dummyRecipients.find(u => u.id === userId)
    setRecipient(foundRecipient || { id: userId, name: 'Unknown User' })

    // Simulate initial messages
    setMessages([
      {
        id: '1',
        content: `This is the beginning of your private chat with ${foundRecipient?.name || 'this user'}`,
        senderId: 'system',
        senderName: 'System',
        timestamp: new Date().toISOString(),
      },
    ])
  }, [isAuthenticated, navigate, userId])

  const handleSendMessage = useCallback((message) => {
    if (!message.trim() || !currentUser || !recipient) return

    const newMessage = {
      id: Date.now().toString(),
      content: message,
      senderId: currentUser.id,
      senderName: currentUser.name,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newMessage])
  }, [currentUser, recipient])

  const handleBackToChat = () => {
    navigate('/chat')
  }

  if (!currentUser || !recipient) return <div>Loading...</div>

  return (
    <div className="private-chat-container">
      <div className="private-chat-header">
        <button onClick={handleBackToChat} className="back-button">
          &larr; Back
        </button>
        <h2>Private Chat with {recipient.name}</h2>
      </div>
      <div className="private-chat-messages">
        <TypingIndicator usersTyping={isTyping ? [recipient.name] : []} />
        <MessageList messages={messages} currentUserId={currentUser.id} />
        <MessageInput 
          onSendMessage={handleSendMessage} 
          onTypingChange={setIsTyping}
        />
      </div>
    </div>
  )
}

export default PrivateChat