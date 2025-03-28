import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/profile.css";
//import useApiUrl from "../components/useApiUrl";
import useApiUrl from "../../componet/commonComponet/useApiUrl.js";


const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Name cannot contain numbers")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Invalid email format")
    .required("Email is required"),
  contactNo: Yup.string()
    .matches(/^\d+$/, "Contact must contain only numbers")
    .min(10, "Contact must be exactly 10 digits")
    .max(10, "Contact must be exactly 10 digits")
    .required("Contact is required"),
});

const Profile = () => {
  const baseUrl = useApiUrl();
  const [admin, setAdmin] = useState({
    _id:"",
    name: "",
    email: "",
    contactNo: "",
    role: "",
  });
  const [isEditing, setIsEditing] = useState(false); // State to show edit form

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${baseUrl}/api/v1/users/getAdminProfile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })
    .then((response) => {
      if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json()
    })
      .then((data) => {
        console.log("Api 1 Response",data);
        setAdmin(data.data[0] || []);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const handleUpdateProfile = async (values) => {
    console.log("Submitting form with values:", values); // Debugging

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${baseUrl}/api/v1/users/updateAdminProfile/${admin._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          _id: admin._id, 
          ...values,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      alert("Profile updated successfully!");
      setAdmin({ ...admin, ...values }); // Update profile details in state
      setIsEditing(false); // Close form
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-container">
      {/* <AdminHeader /> */}
      <h1>My Profile</h1>
      <div className="profile-card">
        <img src="/images/adminImage.jpg" alt="User Profile" className="profile-image" />

        {!isEditing ? (
          <div className="profile-info">
            <h2>{admin.name}</h2>
            <p><strong>Email:</strong> {admin.email}</p>
            <p><strong>Contact No:</strong> {admin.contactNo}</p>
            <p><strong>Role:</strong> {admin.role}</p>
            <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <Formik
            initialValues={{
              name: admin.name,
              email: admin.email,
              contactNo: admin.contactNo,
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={handleUpdateProfile}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="profile-edit-form">
                <label htmlFor="name">Name:</label>
                <Field type="text" name="name" id="name" />
                <ErrorMessage name="name" component="span" className="error" />

                <label htmlFor="email">Email:</label>
                <Field type="email" name="email" id="email" />
                <ErrorMessage name="email" component="span" className="error" />

                <label htmlFor="contactNo">Contact No:</label>
                <Field type="text" name="contactNo" id="contactNo" />
                <ErrorMessage name="contactNo" component="span" className="error" />

                <div className="form-buttons">
                  <button type="submit" disabled={isSubmitting} className="save-btn">
                    Save Changes
                  </button>
                  <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default Profile;

// import React from "react";
// import "../styles/profile.css";
// import AdminHeader from "../../componet/commonComponet/header/AdminHeader";

// const Profile = () => {
//   return (
//     <div className="profile-container">
//       {/* <AdminHeader/> */}
//       <h1>My Profile</h1>
//       <div className="profile-card">
//         <img
//           src="../../../public/images/2.jpg"
//           alt="User Profile"
//           className="profile-image"
//         />
//         <div className="profile-info">
//           <h2>John Doe</h2>
//           <p>Email: johndoe@example.com</p>
//           <p>Role: Admin</p>
//           <button className="edit-profile-btn">Edit Profile</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;