import React from "react";
import "../styles/managebooks.css";
import AdminHeader from "../../componet/commonComponet/header/AdminHeader";

const ManageBooks = () => {
  return (
    <div className="manage-books">
      {/* <AdminHeader/> */}
      <h1>Manage Books</h1>

      <table>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>React Mastery</td>
            <td>John Doe</td>
            <td>Programming</td>
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

export default ManageBooks;