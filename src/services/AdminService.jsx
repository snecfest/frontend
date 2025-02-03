import { axiosInstance } from "../utils/utils";

export const fetchAdminData = async (token) => {
    console.log("Token from the service section:", token);

    try {
        const response = await axiosInstance.get(
            "/programs/programs/summary-detailed",
            {},  
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log('response in service section',response)
        return response.data; 
    } catch (error) {
        console.error("Error fetching admin data:", error);
        throw error; 
    }
};
