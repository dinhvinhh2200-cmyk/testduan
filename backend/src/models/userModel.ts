import pool from "../config/database";

export interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  created_at?: string;
}

// model xu li tim kiem User bang email
export const findUserByEmail = async (email:string):Promise<User | null> => {
  const [rows]: any = await pool.execute('SELECT * FROM users WHERE email = ?', [email])
  
  if (rows.length > 0) {
    return rows[0] as User
  }
  return null 
}