import { useState } from 'react'
import PropTypes from 'prop-types'
import '../styles/MessageInput.css'

const MessageInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="message-input-container">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        disabled={disabled}
        className="message-input"
      />
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className="send-button"
      >
        Send
      </button>
    </form>
  )
}

MessageInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

MessageInput.defaultProps = {
  disabled: false,
}

export default MessageInput