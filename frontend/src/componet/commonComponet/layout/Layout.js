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
// import AdminDashboard from "../../../admin/Pages/AdminDashboard.jsx"
// import ManageUsers from '../../../admin/Pages/ManageUsers.jsx';
// import ManageBooks from '../../../admin/Pages/ManageBooks.jsx';
// import ManageOrders from '../../../admin/Pages/ManageOrder.jsx';
// import Profile from '../../../admin/Pages/Profile.jsx';




const Layout = () => {
    return (
        <div className='body'>
            <BrowserRouter>
                <Routes>
                    <Route path='/*' element={<Protected Componet={Home} />} />
                    <Route path='/' element={<Protected Componet={Home} />} />
                    <Route path='/Book-Management' element={<Protected Componet={Home} />} />
                    <Route path='/library' element={<Protected Componet={Library} />} />
                    <Route path='/Login' element={<UserAuthentication Componet={Login} />} />
                    <Route path='/Registration' element={<UserAuthentication Componet={Registration} />} />
                    <Route path='/BookDisplay' element={<Protected Componet={BookDisplay} />} ></Route>
                    {/* <Route path='/admin-dashboard' element={<AdminDashboard />} />
                    <Route path="/manageuser" element={<ManageUsers />} />
                    <Route path="/managebook" element={<ManageBooks />} />
                    <Route path="/manageorder" element={<ManageOrders />} />
                    <Route path="/profile" element={<Profile />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Layout;
