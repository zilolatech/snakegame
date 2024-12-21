import React, { createContext, useState } from 'react'

export const GameContext = createContext()
export const GameProvider = ({children}) => {
    const [currentScore, setCurrentScore] = useState(0)
    const [highestScore, setHighestScore] = useState(0)

    return (
      <GameContext.Provider value={{currentScore, setCurrentScore, highestScore, setHighestScore}}>
          {children}
      </GameContext.Provider>
    )
}
