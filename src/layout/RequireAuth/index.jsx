import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../../context";

const RequireAuth = ({ children, allowedRoles }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  return allowedRoles.includes(auth?.user?.role) &&
    auth?.isLoading === false ? (
    children
  ) : auth?.user && auth?.isLoading === false ? (
    <Navigate to={"/"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RequireAuth;
