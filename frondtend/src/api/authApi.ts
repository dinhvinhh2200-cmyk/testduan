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

// 3 định nghĩa kiểu dữ liệu mà fe gửi lên be cho register
export interface registerPayLoad {
  name: string
  email: string
  password: string
}

// 4 định nghĩa object chứa các hàm gọi api
export const authApi = {
  // api xử lí đăng nhập
  login: (data: loginPayLoad): Promise<loginResponse> => {
    return axiosClient.post("/api/auth/login", data);
  },

  // api xử lí đăng kí thêm user mới
  register: (data: registerPayLoad): Promise<loginResponse> => {
    return axiosClient.post('/api/auth/register', data)
  }
};
