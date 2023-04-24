import { createContext } from "react";

const AuthContext = createContext({
  user: null,
  isLoading: true,
  setUser: () => {},
});

export default AuthContext;
