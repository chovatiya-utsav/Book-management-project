//import React, { useEffect, useState } from 'react';
import Layout from './componet/commonComponet/layout/Layout';
//import Layoutone from './componet/commonComponet/layout/Layout2';

function App() {

  // const [userRole, setUserRole] = useState(null);

  // useEffect(() => {
  //   // Store data in localStorage if not already stored
  //   const storedUser = JSON.parse(localStorage.getItem("userLogin"));
  //   if (storedUser?.role) {
  //     setUserRole(storedUser.role);
  //   }
  // }, []);

  // // Show "Loading..." while checking the user role
  // if (userRole === null) {
  //   return <>Loading...</>;
  // }

  // return (
  //   <div className="App">
  //     {userRole === "admin" ? <Layoutone /> : <Layout />}
  //   </div>
  // );

  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
