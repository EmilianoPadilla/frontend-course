import React from 'react'

interface HeaderProps {
  title: string
}

function Header({ title }: HeaderProps): React.ReactNode {
  return <h1>{title}</h1>
}

export default Header