import PropTypes from 'prop-types'
import '../styles/TypingIndicator.css'

const TypingIndicator = ({ usersTyping }) => {
  if (!usersTyping || usersTyping.length === 0) return null

  return (
    <div className="typing-indicator">
      <div className="typing-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <span className="typing-text">
        {usersTyping.length === 1
          ? `${usersTyping[0]} is typing...`
          : `${usersTyping.join(' and ')} are typing...`}
      </span>
    </div>
  )
}

TypingIndicator.propTypes = {
  usersTyping: PropTypes.arrayOf(PropTypes.string),
}

export default TypingIndicator