import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Video from './pages/Video/Video.jsx'

function App() {
  const [sidebar, setSidebar] = useState(true);
  return (
    <div>
      <Navbar setSidebar={setSidebar}/>
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar}/>} />
        <Route path='/video/:category/:videoId' element={<Video />} />
      </Routes>
    </div>
  )
}

export default App