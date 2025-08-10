import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // This effect runs whenever the token state changes
  useEffect(() => {
    if (token) {
      // If there's a token, set it in localStorage
      localStorage.setItem('token', token);
    } else {
      // If the token is null/undefined, remove it from localStorage
      localStorage.removeItem('token');
    }
  }, [token]);

  // The login function updates the token state
  const login = (newToken) => {
    setToken(newToken);
  };

  // The logout function clears the token state
  const logout = () => {
    setToken(null);
  };

  // The value provided to consuming components
  const value = {
    token,
    isLoggedIn: !!token, // A handy boolean flag
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create a custom hook for easy consumption of the context
export const useAuth = () => {
  return useContext(AuthContext);
};