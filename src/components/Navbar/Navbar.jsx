import React from 'react'
import './Navbar.css'
import menuIcon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import searchIcon from '../../assets/search.png'
import uploadIcon from '../../assets/upload.png'
import moreIcon from '../../assets/more.png'
import notifyIcon from '../../assets/notification.png'
import profileIcon from '../../assets/jack.png'
import { Link } from 'react-router-dom'
function Navbar({setSidebar}) {
  return (
    <nav className="flexDiv">
      <div className="navLeft flexDiv">
        <img className='menuIcon' src={menuIcon} onClick={() => setSidebar(prev => prev === false?true:false)} alt="" />
       <Link to={'/'} > <img className='logo' src={logo} alt="" /></Link>
      </div>
      <div className="navMiddle flexDiv">
        <div className="searchBox flexDiv">
          <input type="text" placeholder='Search..' />
          <img src={searchIcon} alt="" />
        </div>
      </div>
      <div className="navRight flexDiv">
        <img src={uploadIcon} alt="" />
        <img src={moreIcon} alt="" />
        <img src={notifyIcon} alt="" />
        <img src={profileIcon} className='userIcon' alt="" />
      </div>
    </nav>
  )
}

export default Navbar