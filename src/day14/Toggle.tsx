import React, { useState } from 'react'

function Toggle(): React.ReactNode {
  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <div>
      <h1>Toggle: {toggle ? 'On' : 'Off'}</h1>  {/* This line checks, is toggle true? If it is, it shows "on", if it isn't: "off" */}
      <button onClick={() => setToggle(!toggle)}>Change</button>
    </div>
  )
}

export default Toggle