import { axiosInstance } from "../utils/utils"

export const ProgramAdd=async({studentId,programCode})=>{
    // console.log('program data in service section',data)
    try {
        const response=await axiosInstance.post('/programs/assign',{studentId,programCode})
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

export const DeleteProgram=async(programCode)=>{
    console.log(' program id in service',programCode)
    try {
        const response=await axiosInstance.delete(`/programs/${programCode}`)
        return response
        console.log('delete response in service', response)
    } catch (error) {
        console.log('delete error in service',error)
    }
}