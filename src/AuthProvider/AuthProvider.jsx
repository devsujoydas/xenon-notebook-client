/* eslint-disable no-unused-vars */

import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
 
  const fetchProfile = async () => {
    const { data } = await api.get("/users/profile");
    setUser(data)
    return data;
  };
 
  const {
    data: profile,
    isLoading,
    isError,
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





  const value = {
    user,
    setUser,
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
