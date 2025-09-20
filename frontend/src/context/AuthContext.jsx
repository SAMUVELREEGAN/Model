import React, { createContext, useState } from "react";
import api from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);


 const login = async (username, password) => {
  setLoading(true);
  try {
    const res = await api.post("/login", { username, password });

    if (!res.data.accessToken) {
      throw new Error(res.data.message || "Login failed");
    }

    localStorage.setItem("accessToken", res.data.accessToken);
    setUser({ username })
  } 
  catch (err) {
    throw new Error(err.response?.data?.message || err.message || "Login failed");
  } 
  finally {
    setLoading(false);
  }
};


  const register = async (username, password ,email) => {
    try {
      const res = await api.post("/register", { username, password,email});
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
      localStorage.removeItem("accessToken");
      setAccessToken(null);
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, register, loading, accessToken,user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
