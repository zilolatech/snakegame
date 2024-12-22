import React, { createContext, useState } from 'react'

export const GameContext = createContext()

export const GameProvider = ({children}) => {
    const [currentScore, setCurrentScore] = useState(0)
    const [highestScore, setHighestScore] = useState(0)
    const [snakeColor, setSnakeColor] = useState('rgb(16 185 129)')

    const initData = {currentScore, setCurrentScore, highestScore, setHighestScore, snakeColor, setSnakeColor}

    return (
      <GameContext.Provider value={initData}>
          {children}
      </GameContext.Provider>
    )
}
