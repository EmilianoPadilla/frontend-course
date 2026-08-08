import React from 'react'
import UserInfo from './UserInfo.tsx'

interface UserCardProps {
  name: string
  email: string
  role: string
}

function UserCard({ name, email, role }: UserCardProps): React.ReactNode {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
      <UserInfo role={role} />
    </div>
  )
}

export default UserCard