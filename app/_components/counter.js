'use client'

import * as React from 'react'

export default function Counter({users}) {
  const [count, setCount] = React.useState(1)

  return (
    <>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>there are {users.length} users</p>
      <p>
        {count} – {users[count - 1]?.name ?? 'undefined'}
      </p>
    </>
  )
}
