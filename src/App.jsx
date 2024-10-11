import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {

  return (
    <>  
    <Navbar/> 
    <div className='min-h-[87vh] bg-gray-50 hover:bg-gray-200 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] '>
    <Manager/>
    </div>
    <Footer/>
      </>
  )
}

export default App
