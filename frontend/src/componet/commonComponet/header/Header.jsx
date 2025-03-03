import React from 'react'
import { NavLink } from 'react-router'
import "../../../styles/Header.css"

const Header = () => {
    return (
        <div className='header'>
            <div className='navebar'>
                <div className='logo'>
                    <ul >
                        <h3>  <NavLink to={"/Book-Management"} >logo</NavLink></h3>
                    </ul>
                </div>
                <div className='nav-link'>
                    <ul>
                        <li><NavLink to={"/Home"} >Home</NavLink></li>
                        <li><NavLink to={"/library"} >library</NavLink></li>
                        <li><NavLink to={"/Logout"} >Logout</NavLink></li>
                        <li><NavLink to={"/BookDisplay"} >Books</NavLink></li>
                        {/* <li><NavLink to={"/Login"} >Login</NavLink></li>
                        <li><NavLink to={"/registration"} >registration</NavLink></li> */}
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Header
