import React from 'react'

interface BadgeProps {
  label: string
}

function Badge({ label }: BadgeProps): React.ReactNode {
  return <span>{label}</span>
}

export default Badge