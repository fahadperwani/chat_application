import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";

function PrivateRoutesLayout() {
  const location = useLocation();
  console.log(auth.currentUser);
  return auth.currentUser ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}

export default PrivateRoutesLayout;
