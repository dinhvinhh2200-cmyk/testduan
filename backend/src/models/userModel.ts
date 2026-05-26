import pool from "../config/database";

export interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  created_at?: string;
}

// model xu li tim kiem User bang email để đăng nhập
export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows]: any = await (pool as any).execute(
    "SELECT * FROM users WHERE email = ?",
    [email],
  );

  if (rows.length > 0) {
    return rows[0] as User;
  }
  return null;
};

// model xử lí đăng kí để thêm user vào db
export const createUser = async (user: User): Promise<number> => {
  const [result]: any = await (pool as any).execute(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [user.name, user.email, user.password],
  );

  const insertId = (result as any).insertId
  return insertId
};
