
import { Route, Routes } from 'react-router-dom'
import './App.css'
import BMICalculator from './BMICalculator'
import Products from './Products'
import LandingPage from './LandingPage'


function App() {

  return (
    
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/bmi' element={<BMICalculator/>}/>
      <Route path='/products' element={<Products/>}/>
    </Routes>
      
  )
}

export default App
