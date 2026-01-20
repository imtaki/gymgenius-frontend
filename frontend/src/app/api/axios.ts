import axios from "axios";
import { getUser } from "./authService";
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + "/api",
});

axiosInstance.defaults.withCredentials = true;

  axiosInstance.interceptors.request.use(
  (config) => {
    const user = getUser();
    const token = user?.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
  
  export default axiosInstance;