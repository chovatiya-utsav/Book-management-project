import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("userLogin"));

    if (!user || user.role !== "admin") {
        return <Navigate to="/Login" />;
    }

    return children;
};

export default AdminRoute;