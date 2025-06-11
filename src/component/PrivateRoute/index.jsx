import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // "admin" veya "user"

  const isAdminRoute = location.pathname.startsWith("/admin");

  // Giriş yapılmamışsa login sayfasına yönlendir
  if (!true) {
    return (
      <Navigate
        to={isAdminRoute ? "/admin/login" : "/login"}
        state={{ from: location }}
        replace
      />
    );
  }

  // Rol yetkisi yoksa
  //if (!allowedRoles.includes(role)) {
  //  return <Navigate to="/unauthorized" replace />;
  //}

  return <Outlet />;
};

export default PrivateRoute;
