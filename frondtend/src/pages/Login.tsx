import { useForm } from 'react-hook-form';
import axiosClient from '../api/axiosClient';

// Định nghĩa kiểu dữ liệu cho Form bằng TypeScript
interface LoginFormInputs {
  email: string;
  idCard?: string; // Ví dụ thêm nếu cần
}

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      console.log('Dữ liệu gửi đi:', data);
      // Gọi thử API lên Backend (tạm thời sẽ báo lỗi vì chưa có BE)
      const response = await axiosClient.post('auth/login', data);
      alert('Đăng nhập thành công!');
    } catch (error) {
      console.error('Lỗi kết nối Backend:', error);
      alert('Kết nối Backend thất bại (Do chưa bật Backend thôi, yên tâm nhé!)');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Đăng Nhập Hệ Thống</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            {...register('email', { required: 'Email là bắt buộc' })} 
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>
        
        <button type="submit" style={{ marginTop: '10px' }}>Đăng nhập</button>
      </form>
    </div>
  );
}