import React from 'react'

const Navbar = () => {
  return (
   <nav className='bg-gray-400 text-gray-800 flex-col'>
    <div className="mycontainer flex  justify-between  items-center px-4 py-5 h-14 mycontainer">
    
    <div className="logo font-bold  text-2xl">
    <span className='text-blue-600'>&lt;</span>
    
        Pass
        <span className='text-blue-600'>MAN/ &gt;</span>
       
        </div>
    
    {/* <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="#">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
        </li>
    </ul> */}
    <button className='text-black bg-blue-400 my-5 rounded-full flex  justify-between items-center'>
        <img className='ivert p-1  w-10' src="/icons/github.png" alt="github logo" />
        <span className="font-bold p2-4 px-1"> Github</span>
    </button>
    </div>
   </nav>
  )
}

export default Navbar
