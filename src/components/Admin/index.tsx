import React from "react";
import { useSelector } from "react-redux";
import AdminLogin from "./AdminAuth/AdminLogin";
import { Navigate } from "react-router-dom";
import * as routes from "../../routes/constants";

const Admin = () => {
  const { userData } = useSelector((state: any) => state.auth);
  if (userData?.role?.includes("admin")) {
    return <Navigate to={routes.R_UPLOAD_BANNER} />;
  } else return <AdminLogin />;
};

export default Admin;
