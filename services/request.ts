import axios, { AxiosResponse, AxiosError } from 'axios';

// Replace with your Mac's current local IP
const BASE_URL = 'http://192.168.1.15:8000'; 

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Automatically unwrapping the 'answer' key from FastAPI
    return response.data;
  },
  (error: AxiosError) => {
    const message = error.response?.data ?? error.message;
    console.error('[Network Error]:', message);
    return Promise.reject(message);
  }
);

export default apiClient;