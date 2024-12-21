import React, { useContext, useEffect } from 'react'
import { GameContext } from './Context'

const Score = () => {
    const {currentScore} = useContext(GameContext)
    const {highestScore, setHighestScore} = useContext(GameContext)

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

  return (
    <>
        <div className='text-xl'>Highest Score: {highestScore}</div>
        <div className='my-2 text-xl text-teal-950'>Your Score: <p className='bg-teal-500 inline text-white px-1 rounded'>{currentScore}</p></div> 
    </>
  )
}

export default Score