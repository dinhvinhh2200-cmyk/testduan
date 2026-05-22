import axiosClient from "./axiosClient";

// 1 định nghĩa kiểu dữ liệu mà fe gửi đi cho be
export interface loginPayLoad {
  name: string;
  email: string;
  password: string;
}

// 2 định nghĩa kiểu dữ liệu mà be trả về cho fe
export interface loginResponse {
  success: boolean;
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

// 3 định nghĩa object chứa các hàm gọi api
export const authApi = {
  login: (data: loginPayLoad): Promise<loginResponse> => {
    return axiosClient.post("/api/auth/login", data);
  },
};
