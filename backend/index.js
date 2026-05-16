import dotenv from 'dotenv'
import express from 'express'
import authRouter from './routes/auth.js'
import connectToDB from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import websiteRouter from './routes/websiteRoute.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:['http://localhost:5173', 'http://localhost:5174',   "https://ai-website-yddy.onrender.com"],

  credentials: true,
}))
app.use('/api', authRouter)
app.use('/api/website', websiteRouter)
app.listen(PORT, ()=>{
  connectToDB()
  console.log(`Server is running on PORT : ${PORT}`)
})