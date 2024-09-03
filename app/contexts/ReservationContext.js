'use client'

import * as React from 'react'

const Context = React.createContext()

const initialRange = {
  from: undefined,
  to: undefined,
}

export const ReservationProvider = ({children}) => {
  const [range, setRange] = React.useState(initialRange)
  const resetRange = () => setRange({from: undefined, to: undefined})

  return (
    <Context.Provider
      value={React.useMemo(
        () => ({range, setRange, resetRange}),
        [range],
      )}
    >
      {children}
    </Context.Provider>
  )
}

export const useRange = () => {
  const context = React.use(Context)
  if (!context)
    throw new Error(
      'useRange must be used within a ReservationProvider',
    )
  return context
}
