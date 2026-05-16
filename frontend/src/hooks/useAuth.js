import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'
import { login, signup, logout, currentUser, googleLogin } from '../services/auth.api.js'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth';

export const useAuth = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const data = await currentUser()
                if (data.success) {
                    dispatch(setUserData(data.user))
                }
            } catch (error) {
                console.error("Error fetching current user:", error)
            }
        }
        getCurrentUser()
    }, [dispatch])

    const createLogin = async ({ email, password }) => {
        try {
            const data = await login({ email, password })
            if (data.success || data.user) {
                dispatch(setUserData(data.user))
            }
            return data
        } catch (error) {
            console.error("Error logging in:", error)
            throw error
        }
    }

    const createSignup = async ({ name, email, password }) => {
        try {
            const data = await signup({ name, email, password })
            if (data.success || data.user) {
                dispatch(setUserData(data.user))
            }
            return data
        } catch (error) {
            console.error("Error signing up:", error)
            throw error
        }
    }

    const createGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider)  // Firebase popup
            const data = await googleLogin({                       // Backend call
                name: result.user.displayName,
                email: result.user.email
            })
            if (data.success || data.user) {
                dispatch(setUserData(data.user))
            }
            return data
        } catch (error) {
            console.error("Error with Google login:", error)
            throw error
        }
    }

    const createLogout = async () => {
        try {
            await logout()
            dispatch(setUserData(null))
        } catch (error) {
            console.error("Error logging out:", error)
            throw error
        }
    }

    const getMe = async () => {
        try {
            const data = await currentUser()
            return data
        } catch (error) {
            console.error("Error fetching current user:", error)
            throw error
        }
    }

    return {
        createLogin,
        createSignup,
        createGoogleLogin,
        createLogout,
        getMe
    }

}

