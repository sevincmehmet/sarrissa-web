// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const pathname = useLocation().pathname;
  //const token = localStorage.getItem("token");
  //const role = localStorage.getItem("role");
  //
  //if (!token) {
  //    return <Navigate to="/login" />;
  //}
  //
  //if (!allowedRoles.includes(role)) {
  //    return <Navigate to="/unauthorized" />;
  //}

  if (pathname === "/admin") console.log({ location });

  return <Outlet />;
};

export default PrivateRoute;
