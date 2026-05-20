import dotenv from 'dotenv'
import express from 'express'
import authRouter from './routes/auth.js'
import connectToDB from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import websiteRouter from './routes/websiteRoute.js'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// For ES modules __dirname fix
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none')
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none')
  next()
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', "https://ai-website-yddy.onrender.com"],
  credentials: true,
}))

app.use('/api', authRouter)
app.use('/api/website', websiteRouter)


// 👇 Serve frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')))

// 👇 Catch-all route for React
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'))
})

app.listen(PORT, () => {
  connectToDB()
  console.log(`Server is running on PORT : ${PORT}`)
})