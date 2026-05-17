import express from 'express'
import cors from 'cors'
import mysql from 'mysql2'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import authRouter from './routers/authRoutes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())

app.use('/api/auth', authRouter)

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy mượt mà tại port: ${PORT}`)
})
