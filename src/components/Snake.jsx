import React, { useEffect, useState } from 'react'

const Snake = () => {
    const [snake, setSnake] = useState([[10, 10]])
    const [direction, setDirection] = useState('RIGHT')

    useEffect(() => {
        const moveSnake = () => {
            const head = prevSnake[prevSnake - 1]
            const newHead = 
                direction === 'RIGHT' ? [head[0], head[1] + 1]
                : direction === 'LEFT' ? [head[0], head[1] - 1]
                : direction === 'UP' ? [head[0] - 1, head[1]]
                : [head[0] + 1, head[1]]

                return [...prevSnake.slice(1), newHead]
        }

        const interval = setInterval(moveSnake, 200)
        return () => clearInterval(interval)
    }, [direction])

  return (
    <div>Snake</div>
  )
}

export default Snake