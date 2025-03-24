import React from "react";
import "../styles/manageorder.css";
import AdminHeader from "../../componet/commonComponet/header/AdminHeader";

const ManageOrders = () => {
  return (
    <div className="manage-orders">
      {/* <AdminHeader/> */}
      <h1>Manage Orders</h1>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Book Title</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>5001</td>
            <td>Michael Scott</td>
            <td>JavaScript Essentials</td>
            <td>$15.99</td>
            <td>
              <select>
                <option>Pending</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </td>
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

export default ManageOrders;