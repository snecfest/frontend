import axios from "axios";
import Cookies from "js-cookie";
export const axiosInstance=axios.create({
    baseURL:'https://resgister-theta.vercel.app/api',
    headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,

})

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