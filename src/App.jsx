import React, { useContext, useEffect } from 'react'
import Grid from './components/Grid'
import Score from './components/Score'
import { GameContext } from './components/Context'
import Controller from './components/Controller'

const App = () => {
  const {setCurrentScore, setSnakeColor, setSnake, food, setFood, direction, gameOver, setGameOver, color, setColor, gridSize} = useContext(GameContext)
  const colors = ['rgb(249 115 22)', 'rgb(132 204 22)', 'rgb(16 185 129)', 'rgb(6 182 212)', 'rgb(99 102 241)', 'rgb(244 63 94)', 'rgb(217 70 239)']

  useEffect(() => {
          if (gameOver) return         
    
          const interval = setInterval(moveSnake, 200)
          return () => clearInterval(interval)
      }, [direction, food, gameOver])

      const moveSnake = () => {
        setSnake((prevSnake) => {
          const head = prevSnake[prevSnake.length - 1]
          let newHead
          if (direction === 'RIGHT') {
            newHead = [head[0], head[1] + 1]
          } if (direction === 'LEFT') {
            newHead = [head[0], head[1] - 1]
          } if (direction === 'UP') {
            newHead = [head[0] - 1, head[1]]
          } if (direction === 'DOWN') {
            newHead = [head[0] + 1, head[1]]
          } 
        
          const newSnake = [...prevSnake, newHead]
          if (newHead[0] === food[0] && newHead[1] === food[1]) {
            generateFood(newSnake)
          } else {
            newSnake.shift()
          }

          if (isCollision(newHead, newSnake)) {
            setGameOver(true)
            return prevSnake
          }

          return newSnake     
    })}

      const isCollision = (head, snake) => {
        const [x, y] = head
        return (
          x < 0 || x >= gridSize || y < 0 || y >= gridSize || snake.slice(0, -1).some((segment) => segment[0] === x && segment[1] === y)
        )
      }
    
      const generateFood = (snake) => {
        setSnakeColor(color)
        let newFood
        do {
          newFood = [Math.floor(Math.random() * gridSize), Math.floor(Math.random() * gridSize)]
        } while (snake.some(([x, y]) => x === newFood[0] && y === newFood[1]))
        setFood(newFood)
    
        let randomColor
        do {
          randomColor = colors[Math.floor(Math.random() * colors.length)]
        } while (randomColor === color)
        setColor(randomColor)
    
        setCurrentScore((score) => score + 5)
      }

  return (
    <div className='flex flex-col items-center justify-center h-screen fixed inset-0'>
      <Score />
      <Grid />
      <Controller />
    </div>
  )
}

export default App