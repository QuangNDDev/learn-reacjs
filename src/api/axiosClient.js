import axios from 'axios';

// Tạo một instance Axios với baseURL và headers cụ thể
const axiosClient = axios.create({
  baseURL: 'https://api.ezfrontend.com/', // Thay YOUR_API_BASE_URL bằng URL của API bạn muốn gọi
  headers: {
    'Content-Type': 'application/json',
    // Các headers khác nếu cần
  },
});

// Interceptor cho request
axiosClient.interceptors.request.use(
  (config) => {
    // Xử lý trước khi request được gửi đi (nếu cần)
    return config;
  },
  (error) => {
    // Xử lý lỗi request (nếu cần)
    return Promise.reject(error);
  },
);

// Interceptor cho response
axiosClient.interceptors.response.use(
  (response) => {
    // Xử lý response data (nếu cần)
    return response.data;
  },
  (error) => {
    // Xử lý lỗi response (nếu cần)
    return Promise.reject(error);
  },
);

export default axiosClient;
