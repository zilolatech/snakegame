import React, { useState } from 'react'

const Grid = () => {
    const gridSize = 12
    const createGrid = () => {
        return Array(gridSize).fill(0).map(() => Array(gridSize).fill(0))
    }

    const [grid, setGrid] = useState(createGrid())

  return (
    <div className='grid grid-cols-12 mx-auto mt-10 w-[300px] h-[300px] border'>    
        {grid.flat().map((_, idx) => (
            <div key={idx} className='border' />
        ))}
    </div>
  )
}

export default Grid