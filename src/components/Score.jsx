import React, { useContext, useEffect } from 'react'
import { GameContext } from './Context'

const Score = () => {
    const {currentScore} = useContext(GameContext)
    const {highestScore, setHighestScore, snakeColor} = useContext(GameContext)

    useEffect(() => {
        fetchHighestScore()
      }, [])

      const fetchHighestScore = async () => {
        try {
          const response = await fetch('http://localhost:8000/highest-score')
          const data = await response.json()
          setHighestScore(data.score)
        } catch (error) {
          console.error('Failed to fetch the highest score:', error)
        }
      }

  return (
    <>
        <div className='text-xl'>Highest Score: {highestScore}</div>
        <div className='my-2 text-xl text-teal-950'>Your Score: <p className={`bg-teal-500 inline text-white px-1 rounded ${currentScore%100 == 0 && currentScore != 0 ? 'animated-score' : ''}`} style={{backgroundColor: currentScore > 0 ? snakeColor : ''}}>{currentScore}</p></div> 
    </>
  )
}

export default Score