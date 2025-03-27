import React from 'react'
import MultiStepForm from './components/MultiStepForm'
import Navbar from './pages/Navbar'
import { Route, Routes } from 'react-router-dom'

const App:React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MultiStepForm />} />
      </Routes>
      
    </>
  )
}

export default App