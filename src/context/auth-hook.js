import { useState, useEffect } from "react";
import { authObserver } from "../firebase/services/firebaseAuth";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initiateObserver = () => {
      authObserver(setUser, setIsLoading);
    };

    initiateObserver();
  }, []);

  return { user, isLoading, setUser };
};

export default useAuth;
