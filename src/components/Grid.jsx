import React from 'react'

const gridSize = 20

const Grid = () => {
  const [snake, setSnake] = useState([[1, 1]])
  const [food, setFood] = useState([5, 5])
  const [direction, setDirection] = useState('RIGHT')
  const [gameOver, setGameOver] = useState(false)
  const [touchStart, setTouchStart] = useState({x: 0, y: 0})


  return (
    <div>
      <div style={{display: 'grid',	gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`}} className={`w-[300px] h-[300px] border-2 border-stone-300 ${gameOver ? 'opacity-75` blur-sm pointer-events-none' : ''}`}>
        {grid}
      </div>
      {gameOver && (
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-2xl'>Game Over!!! <button onClick={restartGame} className='underline'>Restart</button></div>
        </div>)}
    </div>
  )
}

export default Grid