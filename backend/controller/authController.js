import User from '../model/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const setAuthCookie = (res, user) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
}

export const googleAuth = async (req, res) => {
    try {
        const { name, email, image } = req.body
        if (!email) {
            return res.status(400).json({ message: 'Email is required' })
        }

        let user = await User.findOne({ email })
        if (!user) {
            const randomPassword = Math.random().toString(36).slice(-8) // ✅ random string
            const hashedPassword = await bcrypt.hash(randomPassword, 10) // ✅ two arguments
            user = await User.create({ name, email, image, password: hashedPassword })
        }

        setAuthCookie(res, user)
        return res.status(200).json({ success: true, user, message: 'Google login successful' })
    } catch (error) {
        console.error('Error in googleAuth', error)
        return res.status(500).json({ success: false, message: `Google Auth error ${error}` })
    }
}

export const signup = async (req, res) => {

    try {
        console.log("req.body received", req.body);
        const { name, email, password} = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists, please login' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email,  password: hashedPassword })
        setAuthCookie(res, user)
        const success = true
        res.status(201).json({ success: true, user, message: 'Signup successful' })
        console.log("Signup successfull", success, user)
    } catch (error) {
        console.error('Error in signup', error)
        return res.status(500).json({ success: false, message: `Signup error ${error}` })
    }
}

export const login = async (req, res) => {
    try {
        console.log("Login request body", req.body)
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'User not found, please sign up' })
        }

        if (!user.password) {
            return res.status(400).json({ message: 'User registered with Google, please login with Google' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        setAuthCookie(res, user)
        return res.status(200).json({ success: true, user, message: 'Login successful' })
    } catch (error) {
        console.error('Error in login', error)
        return res.status(500).json({ success: false, message: `Login error ${error}` })
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        })
        return res.status(200).json({ message: 'Logout successful' })
    } catch (error) {
        console.error('Error in logout', error)
        return res.status(500).json({ message: `Logout error ${error}` })
    }
}

export const currentUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                user: null,
                message: "Unauthorized - No user"
            })
        }

        return res.status(200).json({
            user: req.user,
            message: "Current user fetched successfully"
        })

    } catch (error) {
        console.error("Error in currentUser:", error)
        return res.status(500).json({
            message: `Current user error: ${error.message}`
        })
    }
}