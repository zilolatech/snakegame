import React from 'react'
import Grid from './components/Grid'
import Score from './components/Score'

const App = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <Score />
      <Grid />
    </div>
  )
}

export default App