import { Link } from 'react-router-dom'
import { users } from './data'
import './UserList.css'

function UserList() {
  return (
    <div className="user-list">
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <Link to={`/users/${user.id}`}>
            <h2 className="user-name">{user.name}</h2>
            <p className="user-email">{user.email}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default UserList