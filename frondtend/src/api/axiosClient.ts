import axios from 'axios';

const axiosClient = axios.create({
  // Khi chạy Docker, ta có thể đổi URL này thông qua biến môi trường
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;