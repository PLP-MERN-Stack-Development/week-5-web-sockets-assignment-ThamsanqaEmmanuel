import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import '../styles/MessageList.css'

const MessageList = ({ messages, currentUserId }) => {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.senderId === currentUserId ? 'sent' : 'received'}`}
        >
          {message.senderId !== currentUserId && (
            <div className="sender-name">{message.senderName}</div>
          )}
          <div className="message-content">
            {message.content}
            <div className="message-time">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  currentUserId: PropTypes.string.isRequired,
}

export default MessageList