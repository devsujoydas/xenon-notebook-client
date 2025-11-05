/* eslint-disable no-unused-vars */

import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/users/profile");
      if (data) {
        setUser(data) 
        return data;
      }
    } catch (error) {
      console.log(error)
    }
  };

  const {
    data: profile,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    retry: false,
    refetchOnWindowFocus: false,
    onError: (err) => {
      if (err.response?.status === 401) {
        console.warn("User unauthorized, skipping profile fetch");
        setUser(null);
      }
    },
  });

  if(isError){
    console.log(error)
  }

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("accessToken");
      setUser(null);
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error("Logout failed");
    }
  };


  const value = {
    user,
    setUser,
    logout,
    loading: isLoading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
