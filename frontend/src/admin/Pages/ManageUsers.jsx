import React from "react";
import "../styles/manageuser.css"
import AdminHeader from "../../componet/commonComponet/header/AdminHeader";

const ManageUsers = () => {
  return (
    <div className="manage-users">
      {/* <AdminHeader/> */}
      <h1>Manage Users</h1>

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>101</td>
            <td>Alice Johnson</td>
            <td>alice@gmail.com</td>
            <td>User</td>
            <td>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;