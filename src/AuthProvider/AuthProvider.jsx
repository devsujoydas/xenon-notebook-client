import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/users/profile");
      if (data && data._id) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        console.warn("User not logged in or unauthorized");
      } else {
        console.error("Error fetching profile:", error.message);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };


  const login = async (email, password) => {
    try {
      const { data } = await api.post(
        "/auth/signin", { email, password },
      );
      toast.success("Logged in successfully");
      localStorage.setItem("accessToken", data.accessToken)
      setUser(data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const signup = async (name, email, password) => {
    try {
      const { data } = await api.post("/auth/signup", { name, email, password });
      toast.success("Account created successfully");
      setUser(data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout")
      toast.success("Logged out successfully");
      localStorage.clear()
      setUser(null);
    } catch {
      toast.error("Logout failed");
    }
  };


  useEffect(() => {
    fetchProfile();
  }, []);

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
