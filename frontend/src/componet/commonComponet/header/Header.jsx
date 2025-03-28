import React from 'react'
import { NavLink, useNavigate } from 'react-router'
import "../../../styles/Header.css"
import useApiUrl from '../useApiUrl';


const Header = () => {

    const baseurl = useApiUrl();
    const navigate = useNavigate();

    let userAdminLogin = localStorage?.getItem('userAdminLogin') || "";

    const userLogout = async () => {
        try {
            const response = await fetch(`${baseurl}/api/v1/users/logout`, {
                method: 'POST',
                credentials: 'include',
                mode: 'cors', // Ensure CORS mode
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response.json();

            if (responseData.statuscode === 200) {
                localStorage.clear();
                navigate('/Login'); // Redirect to Login
            } else {
                alert('Logout failed, please try again.');
            }
        } catch (error) {
            console.error('Logout Error:', error);
        }
    };

    return (
        <div className='header'>
            <div className='navebar'>
                <div className='logo'>
                    <ul >
                        <NavLink to={"/Book-Management"} >
                            <img src="./images/logo.png" alt="logo" className='logo' />
                        </NavLink>
                    </ul>
                </div>
                <div className='nav-link'>
                    <ul>
                        <li><NavLink to={"/Home"} >Home</NavLink></li>
                        <li><NavLink to={"/library"} >library</NavLink></li>
                        <li><button onClick={userLogout} className="logout-btn">Logout</button></li>
                        <li><NavLink to={"/BookDisplay"} >Books</NavLink></li>
                        <li><NavLink to={"/AddBook"} >AddBook</NavLink></li>
                        {userAdminLogin ?
                            <li><NavLink to={"/admin-dashboard"} >Admin</NavLink></li> : null
                        }
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Header
