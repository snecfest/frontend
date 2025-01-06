import { axiosInstance } from "../utils/utils"

export const ProgramAdd=async(data)=>{
    console.log('program data in service section',data)
    try {
        const response=await axiosInstance.post('/programs/assign',{data})
        console.log('response of the program addition',response)
    } catch (error) {
        console.log('error in the program addition service',error)
    }
}
