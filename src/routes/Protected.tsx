import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLoginDrawer } from "../store/slices/TogglerSlice";

interface Props {
  isAllowed: boolean;
  redirectPath?: string;
  children?: React.ReactElement;
}

const Protected = ({ isAllowed, redirectPath = "/", children }: Props) => {
  const dispatch = useDispatch();
  if (!isAllowed) {
    if (redirectPath === "/") {
      dispatch(toggleLoginDrawer({ open: true }));
      return <Navigate to={redirectPath} replace />;
    }
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export default Protected;
