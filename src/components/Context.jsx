import React, { createContext, useState } from 'react'

export const GameContext = createContext()

export const GameProvider = ({children}) => {
    const gridSize = 20
    const [currentScore, setCurrentScore] = useState(0)
    const [highestScore, setHighestScore] = useState(0)
    const [snake, setSnake] = useState([[1, 1]])
    const [food, setFood] = useState([5, 5])
    const [direction, setDirection] = useState('RIGHT')
    const [gameOver, setGameOver] = useState(false)
    const [snakeColor, setSnakeColor] = useState('rgb(16 185 129)')
    const [color, setColor] = useState('rgb(244 63 94)')

    const initData = {currentScore, setCurrentScore, highestScore, setHighestScore, snakeColor, setSnakeColor,   snake, setSnake, food, setFood, direction, setDirection, gameOver, setGameOver, color, setColor, gridSize}

    return (
      <GameContext.Provider value={initData}>
          {children}
      </GameContext.Provider>
    )
}
