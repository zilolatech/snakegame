import React, { useEffect, useState } from 'react'
import Grid from './components/Grid'

const gridSize = 20

const App = () => {
  const [snake, setSnake] = useState([[1, 1]])
  const [food, setFood] = useState([5, 5])
  const [direction, setDirection] = useState('RIGHT')
  const [gameOver, setGameOver] = useState(false)
  const [touchStart, setTouchStart] = useState({x: 0, y: 0})
  const [currentScore, setCurrentScore] = useState(0)
  const [highestScore, setHighestScore] = useState(0)
  const [color, setColor] = useState('rgb(244 63 94)')
  const [snakeColor, setSnakeColor] = useState('rgb(16 185 129)')
  const colors = ['rgb(249 115 22)', 'rgb(132 204 22)', 'rgb(16 185 129)', 'rgb(6 182 212)', 'rgb(99 102 241)', 'rgb(244 63 94)', 'rgb(217 70 239)']

  useEffect(() => {
    const fetchHighestScore = async () => {
      try {
        const response = await fetch('http://localhost:8000/highest-score')
        const data = await response.json()
        setHighestScore(data.score)
      } catch (error) {
        console.error('Failed to fetch the highest score:', error)
      }
    }
    fetchHighestScore()
  }, [])

    useEffect(() => {
      if (gameOver) return
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

      const interval = setInterval(moveSnake, 200)
      return () => clearInterval(interval)
  }, [direction, food, gameOver])


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

  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    setTouchStart({x: touch.clientX, y: touch.clientY})
  }

  const handleTouchEnd = (e) => {
    if (gameOver) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStart.x
    const deltaY = touch.clientY - touchStart.y

    const minSwipe = 30

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipe) {
      if (deltaX > 0 && direction !== 'LEFT') {
        setDirection('RIGHT')
      } else if (deltaX < 0 && direction !== 'RIGHT') {
        setDirection('LEFT')
      }
    } else if (Math.abs(deltaY) > minSwipe) {
      if (deltaY > 0 && direction !== 'UP') {
        setDirection('DOWN')
      } else if (deltaY < 0 && direction !== 'DOWN') {
        setDirection('UP')
      }
    }
  }

  
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

    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    setColor(randomColor)

    setCurrentScore((score) => score + 5)
  }

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
    <div className='flex flex-col items-center justify-center h-screen' onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className='text-xl'>Highest Score: {highestScore}</div>
      <div className='my-2 text-xl text-teal-950'>Your Score: <p className='bg-teal-500 inline text-white px-1 rounded'>{currentScore}</p></div>
      <div style={{display: 'grid',	gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`}} className={`w-[300px] h-[300px] border-2 border-stone-300 ${gameOver ? 'opacity-75` blur-sm pointer-events-none' : ''}`}>
        {grid}
      </div>
      {gameOver && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-2xl'>Game Over!!! <button onClick={restartGame} className='underline'>Restart</button></div>
        </div>
      )}
      
    </div>
  )
}

export default App