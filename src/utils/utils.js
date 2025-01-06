import axios from "axios";

export const axiosInstance=axios.create({
    baseURL:'https://resgister-theta.vercel.app/api',
    headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,

})