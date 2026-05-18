import mysql  from 'mysql2';
import dotenv from 'dotenv'

dotenv.config()

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'test_db',
  port: Number(process.env.DB_PORT) || 3306
}

const pool = mysql.createPool(dbConfig)
export default pool.promise()
