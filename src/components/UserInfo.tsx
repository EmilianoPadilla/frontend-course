import React from 'react'
import Badge from './Badge.tsx'

interface UserInfoProps {
  role: string
}

function UserInfo({ role }: UserInfoProps): React.ReactNode {
  return (
    <div>
      <p>User details</p>
      <Badge label={role} />
    </div>
  )
}

export default UserInfo