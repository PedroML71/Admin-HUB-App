import React from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { useAuth, AuthContext } from "./context";
import { store } from "./store/config";

const App = ({ children }) => {
  const { user, isLoading, setUser } = useAuth();

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ user, isLoading, setUser }}>
        {children}
      </AuthContext.Provider>
    </Provider>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
