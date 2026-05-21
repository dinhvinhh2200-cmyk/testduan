import { useForm } from "react-hook-form";
import axiosClient from "../api/axiosClient";

// Định nghĩa kiểu dữ liệu cho Form bằng TypeScript
interface LoginFormInputs {
  email: string;
  idCard?: string; // Ví dụ thêm nếu cần
  password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      console.log("Dữ liệu gửi đi:", data);

      // Gọi API lên Backend
      const response = await axiosClient.post("/api/auth/login", data);

      // Sử dụng dữ liệu trả về từ Backend (thường nằm trong mục response.data)
      const serverData = response.data;
      console.log("Dữ liệu Backend trả về:", serverData);

      // Bạn có thể lấy tên User mà Backend trả về để chào họ:
      if (serverData.success) {
        alert(`Đăng nhập thành công! Chào mừng ${serverData.user.name}`);

        // Sau này bạn có thể lưu token vào localStorage tại đây:
        // localStorage.setItem('token', serverData.token);
      }
    } catch (error) {
      console.error("Lỗi kết nối Backend:", error);
      alert("Sai tài khoản hoặc kết nối Backend thất bại!");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Đăng Nhập Hệ Thống</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register("email", { required: "Email là bắt buộc" })}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            {...register("password", {
              required: 'Mật khẩu là bắt buộc',
              minLength: { value: 6, message: 'Mật khẩu phải từ 6 ký tự trở lên' }
            })}
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
