  import { users } from './data'
  import { useParams, Link, useNavigate } from 'react-router-dom'

  function UserDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const user = users.find((u) => u.id === Number(id))

    if (!user) {
      return <p>User not found!</p>
    }

    return (
      <div>
        <Link to="/users">← Back to users</Link>
        <button onClick={() => navigate('/users')}>Go back with navigate</button>
        <h1>{user.name}</h1>
        <p>Email: {user.email}</p>
        <p>ID: {user.id}</p>
      </div>
    )
  }

export default UserDetail