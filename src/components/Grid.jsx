import React, { useEffect, useState, useContext } from 'react'
import { GameContext } from './Context'


const Grid = () => {
  const {currentScore, setCurrentScore, highestScore, setHighestScore, snakeColor, setSnakeColor, snake, setSnake, food, setFood, direction, setDirection, gameOver, setGameOver, color, setColor, gridSize} = useContext(GameContext)

  // const [snake, setSnake] = useState([[1, 1]])
  // const [food, setFood] = useState([5, 5])
  // const [direction, setDirection] = useState('RIGHT')
  // const [gameOver, setGameOver] = useState(false)
  // const [touchStart, setTouchStart] = useState({x: 0, y: 0})
  // const [color, setColor] = useState('rgb(244 63 94)')
  // const [snakeColor, setSnakeColor] = useState('rgb(16 185 129)')
  // const colors = ['rgb(249 115 22)', 'rgb(132 204 22)', 'rgb(16 185 129)', 'rgb(6 182 212)', 'rgb(99 102 241)', 'rgb(244 63 94)', 'rgb(217 70 239)']
  

  

    useEffect(() => {
        const handleKeyDown = (e) => {
          if (gameOver) {
            if (e.key === 'Enter') {
              restartGame()
            }
            return
          } 
          if ((e.key === 'ArrowUp' || e.key === 'w') && direction !== 'DOWN') {
            setDirection('UP')
          } if ((e.key === 'ArrowDown' || e.key === 's') && direction !== 'UP') {
            setDirection('DOWN')
          } if ((e.key === 'ArrowLeft' || e.key === 'a') && direction !== 'RIGHT') {
            setDirection('LEFT')
          } if ((e.key === 'ArrowRight' || e.key === 'd') && direction !== 'LEFT') {
            setDirection('RIGHT')
          }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
      }, [direction, gameOver])
    
      // const handleTouchStart = (e) => {
      //   const touch = e.touches[0]
      //   setTouchStart({x: touch.clientX, y: touch.clientY})
      // }

      // const handleTouchEnd = (e) => {
      //   if (gameOver) return
    
      //   const touch = e.changedTouches[0]
      //   const deltaX = touch.clientX - touchStart.x
      //   const deltaY = touch.clientY - touchStart.y
    
      //   const minSwipe = 30
    
      //   if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipe) {
      //     if (deltaX > 0 && direction !== 'LEFT') {
      //       setDirection('RIGHT')
      //     } else if (deltaX < 0 && direction !== 'RIGHT') {
      //       setDirection('LEFT')
      //     }
      //   } else if (Math.abs(deltaY) > minSwipe) {
      //     if (deltaY > 0 && direction !== 'UP') {
      //       setDirection('DOWN')
      //     } else if (deltaY < 0 && direction !== 'DOWN') {
      //       setDirection('UP')
      //     }
      //   }
      // }

      

      const updateHighestScore = async (newScore) => {
        try {
          if (newScore > highestScore) {
            await fetch('http://localhost:8000/highest-score', {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({score: newScore})
            })
            setHighestScore(newScore)
          }
        } catch (error) {
          console.error('Failed to update the highest score:', error)
        }
      }

      const restartGame = () => {
        setGameOver(false)
        setSnake([[1, 1]])
        setFood([5, 5])
        setDirection('RIGHT')
        setCurrentScore(0)
        if (currentScore > highestScore) {
          updateHighestScore(currentScore)
        }
      }
    
      const grid = Array.from({length: gridSize * gridSize}, (_, idx) => {
        const x = Math.floor(idx / gridSize)
        const y = idx % gridSize
        const isSnake = snake.some(([sx, sy]) => sx === x && sy === y)
        const isFood = food[0] === x && food[1] === y
    
        return (
          <div key={idx} style={{backgroundColor: isSnake ? snakeColor : isFood ? color : 'white'}} className='w-full h-full'></div>
        )
      })

  return (
    <>
      <div style={{display: 'grid',	gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`}} className={`w-[300px] h-[300px] border-2 border-stone-300 ${gameOver ? 'opacity-75` blur-sm pointer-events-none' : ''}`}>
        {grid}
      </div>
      {gameOver && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-2xl'>Game Over!!! <button onClick={restartGame} className='underline'>Restart</button></div>
        </div>)}
    </>
  )
}

export default Grid