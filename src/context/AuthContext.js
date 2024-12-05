import { Auth } from "aws-amplify";
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  const login = (user) => {
    setAuthState({ isAuthenticated: true, user });
  };

  const logout = async () => {
    try {
      await Auth.signOut(); // Sign out from Amplify
      setAuthState({ isAuthenticated: false, user: null });
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
