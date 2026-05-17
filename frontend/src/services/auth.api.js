import axios from 'axios'

const VITE_API_URL = 'https://ai-website-yddy.onrender.com'

const base_URL = VITE_API_URL + '/api'

export const signup = async ({ name, email, password }) => {
    try {
        const response = await axios.post(`${base_URL}/signup`, {
            name, email, password
        }, { withCredentials: true })
        return response.data
    } catch (error) {
        console.error('signup error', error)
        return { 
            success: false, 
            status: error.response?.status,          // ✅ pass status back
            message: error.response?.data?.message   // ✅ use backend message
            || "Signup failed" 
        }
    }
}



export const googleLogin = async ({ name, email }) => {  // ✅ accept user data as param
    try {
        const response = await axios.post(`${base_URL}/google`, {
            name, email
        }, { withCredentials: true })
        return response.data
    } catch (error) {
        console.error('google login error', error.code, error.message)
        return { success: false, message: "Google login failed" }
    }
}
export const login = async ({ email, password }) => {
    try {
        const response = await axios.post(`${base_URL}/login`, {
            email, password
        },
            {
                withCredentials: true
            })
        return response.data
    } catch (error) {
        console.error('login error', error)
        return { success: false, message: "Login failed" }
    }
}

export const logout = async () => {
    try {
        const response = await axios.get(`${base_URL}/logout`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        console.error('logout error', error)
    }
}

export const currentUser = async () => {
    try {
        const response = await axios.get(`${base_URL}/currentUser`, {
            withCredentials: true
        })
        return response.data
    } catch (error) {
        if (error.response?.status === 401) {
            return { success: false, user: null } 
        }
        console.error("error in current User", error)
        return { success: false, message: "Failed to fetch user information" }
    }
}