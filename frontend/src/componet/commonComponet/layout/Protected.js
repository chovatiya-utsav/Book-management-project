import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import Header from '../header/Header';

const Protected = (props) => {
    const { Componet } = props;

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
