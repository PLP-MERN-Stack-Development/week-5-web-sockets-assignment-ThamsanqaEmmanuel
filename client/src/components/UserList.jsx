import PropTypes from 'prop-types'
import '../styles/UserList.css'

const UserList = ({ users, currentUser, onUserSelect }) => {
  return (
    <div className="user-list">
      <div className="user-list-header">
        <h3>Online Users ({users.length})</h3>
      </div>
      <ul className="user-list-items">
        {users.map((user) => (
          <li
            key={user.id}
            className={`user-item ${user.id === currentUser.id ? 'current-user' : ''}`}
            onClick={() => onUserSelect(user)}
          >
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              {user.id === currentUser.id && <span className="user-you">(You)</span>}
              {user.isTyping && <span className="user-typing">typing...</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  onUserSelect: PropTypes.func.isRequired,
}

export default UserList