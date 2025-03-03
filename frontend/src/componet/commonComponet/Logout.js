import React from 'react'
import { useNavigate } from 'react-router'

const Logout = () => {

    const naviget = useNavigate();
    const userLogout = () => {
        localStorage.removeItem("userLogin");
        naviget("/Login")
    }
    return (
        <>
            {
                userLogout()
            }
        </>
    )
}

export default Logout
