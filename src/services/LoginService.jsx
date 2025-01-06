import { axiosInstance } from "../utils/utils";

export const LoginService=async(token)=>{
    console.log('data enter the service section',token)
    try {
        const response=await axiosInstance.post('/auth/login',{token})
        console.log('response in the service section',response)
        return response.data
    } catch (error) {
        console.log('error in the login service section',error)
    }
}