import jwt from 'jsonwebtoken'
import User from '../model/User.js'   // ✅ FIXED

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies?.token

        if (!token) {
            return res.status(401).json({ message: "Token not found" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id).select("-password")

        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }

        req.user = user

        next()
    } catch (error) {
        console.error("ProtectRoute error:", error.message)

        return res.status(401).json({
            message: "Unauthorized",
            error: error.message
        })
    }
}

export default protectRoute