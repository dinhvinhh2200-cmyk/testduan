import { useForm } from "react-hook-form";
import { authApi } from "../api/authApi";

// Định nghĩa kiểu dữ liệu cho Form bằng TypeScript
interface LoginFormInputs {
  name: string;
  email: string;
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
      const res = await authApi.login(data)

      // Bạn có thể lấy tên User mà Backend trả về để chào họ:
      if (res.success) {
        alert(`Đăng nhập thành công! Chào mừng ${res.user.name}`);

        // Sau này bạn có thể lưu token vào localStorage tại đây:
        // localStorage.setItem('token', res.token);
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

         {/* validate cho trường name */}
        <div>
          <label>Name:</label>
          <input
            type="string"
            {...register("name", { required: "Name là bắt buộc" })}
          />
          {errors.name && (
            <p style={{ color: "red" }}>{errors.name.message}</p>
          )}
        </div>

        {/* // validate cho trường email */}
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

        {/* // validate cho trường password */}
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
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

// bổ sung errors message lỗi cho password 
