import React, { useContext, useState } from 'react'
import { GameContext } from './Context'

const Controller = () => {
  const {direction, setDirection} = useContext(GameContext)
  const [position, setPosition] = useState({x: 0, y: 0})
  const radius = 60
  const innerRadius = 20

  const handleTouchMove = (e) => {
    e.preventDefault()
    const rect = e.target.parentElement.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = e.touches[0].clientX - centerX
    const deltaY = e.touches[0].clientY - centerY

    const distance = Math.sqrt(deltaX**2 + deltaY**2)
    if (distance <= radius - innerRadius) {
      setPosition({x: deltaX, y: deltaY})
    } else {
      const angle = Math.atan2(deltaY, deltaX)
      const boundedX = (radius - innerRadius) * Math.cos(angle)
      const boundedY = (radius - innerRadius) * Math.sin(angle)
      setPosition({x: boundedX, y: boundedY})
    }

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0 && direction !== 'LEFT') {
        setDirection('RIGHT')
      } else if (deltaX < 0 && direction !== 'RIGHT') {
        setDirection('LEFT')
      }
      } else {
        if (deltaY > 0 && direction !== 'UP') {
          setDirection('DOWN')
        } else if (deltaY < 0 && direction !== 'DOWN') {
          setDirection('UP')
        }
      }
  }

  const resetPosition = () => {
    setPosition({x: 0, y: 0})
  }
    
  return (
    <div className='border-2 h-32 w-32 mt-20 rounded-full relative md:hidden block bg-stone-200 opacity-50' onTouchEnd={resetPosition} onTouchMove={handleTouchMove}>
      <div className='border-2 h-20 w-20 rounded-full absolute bg-stone-300 opacity-50' style={{left: `calc(50% + ${position.x}px - 40px)`, top:`calc(50% + ${position.y}px - 40px)`, transition:'0.1s'}}></div>
    </div>
  )
}

export default Controller