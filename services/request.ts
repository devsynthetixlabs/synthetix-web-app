import axios, { AxiosResponse, AxiosError } from 'axios';

const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  
  const BASE_URL = isLocal 
    ? "http://192.168.31.231:8000" // Use local for development
    : process.env.NEXT_PUBLIC_SERVER_IP; // Use ngrok/cloud for Vercel; 

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