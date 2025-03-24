import AdminHeader from "../../componet/commonComponet/header/AdminHeader";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* <AdminHeader /> */}
      <h1>Welcome to the Admin Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h2>Total Users</h2>
          <p>120</p>
        </div>
        <div className="card">
          <h2>Books Uploaded</h2>
          <p>450</p>
        </div>
        <div className="card">
          <h2>Pending Approvals</h2>
          <p>5</p>
        </div>
      </div>

      <div className="dashboard-stats">
        <h2>Recent Activities</h2>
        <ul>
          <li>New user registered: John Doe</li>
          <li>Book "React Mastery" uploaded by Alice</li>
          <li>User "Michael" purchased a book</li>
          <li>Admin approved a new book upload</li>
        </ul>
      </div>
    </div>

  );
};

export default AdminDashboard;