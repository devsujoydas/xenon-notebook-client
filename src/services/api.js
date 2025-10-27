import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});
 
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
 
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
 
    if (
      (err.response?.status === 403 || err.response?.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try { 
        // const { data } = await api.get("/auth/refresh");
 
        // localStorage.setItem("accessToken", data.accessToken);
        // api.defaults.headers.common[
        //   "Authorization"
        // ] = `Bearer ${data.accessToken}`;  
 
        // return api(originalRequest);
      } catch (refreshError) { 
        localStorage.removeItem("accessToken");
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
