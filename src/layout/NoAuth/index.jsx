import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "../../context";

const NoAuth = ({ children }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  return !auth?.user && auth?.isLoading === false ? (
    children
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};

NoAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NoAuth;
