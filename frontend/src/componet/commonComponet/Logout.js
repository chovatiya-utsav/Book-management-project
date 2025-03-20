//     naviget("/Login")
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import useApiUrl from './useApiUrl';

const Logout = () => {

    const baseurl = useApiUrl()

    const naviget = useNavigate();
    const userLogout = async () => {

        const loginUser = JSON.parse(localStorage.getItem("userLogin")) || null;

        // const userLogin = {
        //     _id: loginUser?._id
        // }

        const response = await fetch(`${baseurl}/api/v1/users/logout`, {
            method: 'POST',
            // body: JSON.stringify(userLogin),
            credentials: 'include'
        })
        const responseData = response.json()

        if (responseData.statuscode === 200) {
            localStorage.clear()
            naviget("/Login")
        }
    }

    useEffect(() => {
        userLogout()
    }, [])

    return (
        <>
            {
                userLogout()
            }
        </>
    )
}

export default Logout
