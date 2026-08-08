import React, { useState } from 'react'

function TextInput(): React.ReactNode {
  const [textinput, setInput] = useState<string>("")

  return (
    <div>
      <input onChange={(e) => setInput(e.target.value)} />
      <p>Input: {textinput}</p>
    </div>
  )
}

export default TextInput