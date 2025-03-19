import React from 'react'
import { useNavigate } from 'react-router'

const Logout = () => {

    const naviget = useNavigate();
    const userLogout = async () => {
        // const response = await fetch("https://d877-103-181-126-16.ngrok-free.app/api/v1/users/logout", {
        //     method: 'POST',
        //     credentials: 'include'

        // })

        // const responseData = response.json()

        // if (responseData.statuscode === 200) {
        //     naviget("/Login")
        // }
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
