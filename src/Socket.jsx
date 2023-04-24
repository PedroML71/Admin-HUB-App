import React from "react";
import PropTypes from "prop-types";
import { SocketContext, useSocket } from "./context";

const Socket = ({ children }) => {
  const { socket } = useSocket();

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

Socket.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Socket;
