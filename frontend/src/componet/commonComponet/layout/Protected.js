import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import Header from '../header/Header';
import useApiUrl from '../useApiUrl';



const Protected = (props) => {
    const { Componet } = props;
    const baseurl = useApiUrl

    // const refreshAccessToken = async () => {
    //     try {
    //         const response = await fetch(`${baseurl}/api/v1/users/refresh-token`, {
    //             method: "POST",
    //             credentials: "include" // Important for sending cookies
    //         });

    //         if (!response.ok) {
    //             throw new Error("Failed to refresh token");
    //         }

    //         const data = await response.json();
    //         console.log("Token refreshed:", data);
    //     } catch (error) {
    //         console.error("Refresh Token Error:", error);
    //     }
    // };

    let userLogin = localStorage.getItem('userLogin');
    const naviget = useNavigate();
    useEffect(() => {
        let userLogin = localStorage.getItem('userLogin');
        if (!userLogin) {
            naviget('/Login')
        }
    }, [naviget])

    return (
        <>
            {
                userLogin ?
                    <>
                        <Header />
                        <Componet />
                    </>
                    : null
            }
        </>
    )
}

export default Protected;



