import { useState } from 'react'
import FetchRequest from './Components/FetchRequest'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FetchRequest />
    </>
  )
}

export default App
