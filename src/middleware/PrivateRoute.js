import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")) || {};

    console.log("User từ localStorage:", user);
    if (!token) {
        return <Navigate to="/loginAdmin" replace />;
    }
    if (!user.roles || user.roles.length === 0) {
        return <Navigate to="*" replace />;
    }

    if (user.roles && user.roles.includes("Khách hàng")) {
        return <Navigate to="*" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
