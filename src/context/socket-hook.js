import { useState, useEffect } from "react";
import io from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState(false);

  useEffect(() => {
    const connection = io("http://localhost:8000");

    setSocket(connection);
  }, []);

  return { socket };
};

export default useSocket;
