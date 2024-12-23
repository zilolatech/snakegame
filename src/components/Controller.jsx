import React, { useContext, useState } from 'react'
import { GameContext } from './Context'

const Controller = () => {
  const {direction, setDirection} = useContext(GameContext)
  const [position, setPosition] = useState({x: 0, y: 0})
  const minSwipe = 10
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

  const resetPosition = () => {
    setPosition({x: 0, y: 0})
  }


    // const [touchStart, setTouchStart] = useState({x: 0, y: 0})

    // const handleTouchStart = (e) => {
    //       const touch = e.touches[0]
    //       setTouchStart({x: touch.clientX, y: touch.clientY})
    //     }
  
    //     const handleTouchEnd = (e) => {
    //       if (gameOver) return
      
    //       const touch = e.changedTouches[0]
    //       const deltaX = touch.clientX - touchStart.x
    //       const deltaY = touch.clientY - touchStart.y
      
    //       const minSwipe = 30
      
    //       if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipe) {
    //         if (deltaX > 0 && direction !== 'LEFT') {
    //           setDirection('RIGHT')
    //         } else if (deltaX < 0 && direction !== 'RIGHT') {
    //           setDirection('LEFT')
    //         }
    //       } else if (Math.abs(deltaY) > minSwipe) {
    //         if (deltaY > 0 && direction !== 'UP') {
    //           setDirection('DOWN')
    //         } else if (deltaY < 0 && direction !== 'DOWN') {
    //           setDirection('UP')
    //         }
    //       }
    //     }
    
  return (
    <div className='border-2 h-32 w-32 rounded-full relative' onTouchEnd={resetPosition} onTouchMove={handleTouchMove}>
      <div className='border-2 h-20 w-20 rounded-full absolute' style={{left: `calc(50% + ${position.x}px - 40px)`, top:`calc(50% + ${position.y}px - 40px)`, transition:'0.1s'}}></div>
    </div>
  )
}

export default Controller