import axios from "axios";
import Cookies from "js-cookie";
const baseURL = window.location.hostname === 'snec.vercel.app'
  ? 'https://resgister-theta.vercel.app/api'
  : 'https://she-backend.vercel.app/api';

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);