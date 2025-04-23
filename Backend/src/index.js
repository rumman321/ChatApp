
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import {connectDB} from './lib/db.js'
import cookieparser from 'cookie-parser'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieparser())
app.use("/api/auth",authRoutes)
app.listen(PORT,()=>{
    console.log('server is running on port ',+PORT);
    connectDB()
})