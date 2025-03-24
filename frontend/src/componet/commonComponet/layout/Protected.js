import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import Header from '../header/Header';
import useApiUrl from '../useApiUrl';
import AdminHeader from '../header/AdminHeader';



const Protected = (props) => {
    const { Componet, AdminComponet } = props;
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
    
    let userLogin = localStorage?.getItem('userLogin') || "";
    let userAdminLogin = localStorage?.getItem('userAdminLogin') || "";
    const naviget = useNavigate();
    useEffect(() => {
        let userLogin = localStorage?.getItem('userLogin') || "";
        let userAdminLogin = localStorage?.getItem('userAdminLogin') || "";
        if (!userLogin && !userAdminLogin) {
            naviget('/Login')
        }
    }, [naviget])

    return (
        <>
            {
                (userLogin || userAdminLogin) && Componet && !AdminComponet ?
                    <>
                        <Header />
                        <Componet />
                    </>
                    : null
            }
            {
                userAdminLogin && AdminComponet && !Componet ?
                <>
                    
                        <AdminHeader />
                        <AdminComponet />
                    </>
                    : null
            }
        </>
    )
}

export default Protected;



