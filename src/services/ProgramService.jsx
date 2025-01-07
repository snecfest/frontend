import { axiosInstance } from "../utils/utils"

export const ProgramAdd=async(data)=>{
    // console.log('program data in service section',data)
    try {
        const response=await axiosInstance.post('/programs/assign',data)
        console.log('response of the program addition',response)
        return response
    } catch (error) {
        console.log('error in the program addition service',error)
        
    }
}


export const ProgramGet=async()=>{
    try {
        const response=await axiosInstance.get('/programs')
        return response.data
    } catch (error) {
        console.log('error in the program get service section',error)
    }
}