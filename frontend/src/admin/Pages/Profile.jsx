import React from "react";
import "../styles/profile.css";
import AdminHeader from "../../componet/commonComponet/header/AdminHeader";

const Profile = () => {
  return (
    <div className="profile-container">
      {/* <AdminHeader/> */}
      <h1>My Profile</h1>
      <div className="profile-card">
        <img
          src="../../../public/images/2.jpg"
          alt="User Profile"
          className="profile-image"
        />
        <div className="profile-info">
          <h2>John Doe</h2>
          <p>Email: johndoe@example.com</p>
          <p>Role: Admin</p>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;