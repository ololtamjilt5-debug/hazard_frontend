// src/components/auth/AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Хэрэв токен байхгүй эсвэл эрх нь 3-аас бага бол нүүр хуудас руу буцаана
  if (!token || !user || user.level < 3) {
    return <Navigate to="/UserDashboard" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
