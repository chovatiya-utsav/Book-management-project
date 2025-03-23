import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router";
import Home from '../../pages/Home.jsx';
import Login from '../../pages/Login.jsx'
import "../../../styles/Layout.css";
import Library from '../../pages/Library.jsx';
import Registration from '../../pages/Registration.jsx';
import Protected from './Protected.js';
import Logout from '../Logout.js';
import BookDisplay from '../../pages/BookDisplay.jsx';
import UserAuthentication from './UserAuthentication.js';

const Layout = () => {
    return (
        <div className='body'>
            <BrowserRouter>
                <Routes>
                    <Route path='/*' element={<Protected Componet={Home} />} />
                    <Route path='/' element={<Protected Componet={Home} />} />
                    <Route path='/Book-Management' element={<Protected Componet={Home} />} />
                    <Route path='/library' element={<Protected Componet={Library} />} />
                    <Route path='/BookDisplay' element={<Protected Componet={BookDisplay} />} />
                    <Route path='/Login' element={<UserAuthentication Componet={Login} />} />
                    <Route path='/Registration' element={<UserAuthentication Componet={Registration} />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Layout;
