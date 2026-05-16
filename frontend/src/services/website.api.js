
import axios from 'axios'

const base_url = "http://localhost:5000/api/website"

export const generateWebsite = async ({ prompt }) => {
    try {
        const response = await axios.post(`${base_url}/generate`, {
            prompt
        },
            {
                withCredentials: true,
            })
        return response.data
    } catch (error) {
        console.error("Error in website generate", error);
        return {
            success: false,
            status: error.response?.status,          // ✅ pass status back
            message: error.response?.data?.message   // ✅ use backend message
                || "Website generate failed"
        }
    }
}

export const getWebsite = async ({ id }) => {
    try {
        const response = await axios.get(`${base_url}/id/${id}`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.error("Error in fetching website", error);
        return { success: false, message: "fetching website failed", error }
    }
}

export const updateWebsite = async ({ id, prompt }) => {
    try {
        const response = await axios.put(`${base_url}/update/${id}`, {
            prompt,
        },
            { withCredentials: true })
        return response.data
    } catch (error) {
        console.error("Error in updating website", error);
        return { success: false, message: "updating website failed", error };
    }
}

export const getAllWebsites = async () => {
    try {
        const response = await axios.get(`${base_url}/all`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.error("Error in fetching all websites", error);
        return { success: false, message: "fetching all websites failed", error };
    }
}

export const deployWeb = async ({ id }) => {  
    try {
        const response = await axios.get(`${base_url}/deploy/${id}`, {
            withCredentials: true,
        })
        return response.data
    } catch (error) {
        console.error("Error in deploying websites", error);
        return { success: false, message: "error in deploying website", error };
    }
}

export const slugWeb = async ({ slug }) => {
    try {
        const response = await axios.get(`${base_url}/slug/${slug}`, {
            withCredentials: true
        })
        return response.data
    }
    catch (error) {
        console.error("Error in fetching slug website", error);
        return { success: false, message: "error in fetching slug website", error };
    }
}