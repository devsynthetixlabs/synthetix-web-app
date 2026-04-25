import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  
const BASE_URL = isLocal 
  ? "http://192.168.31.231:8000" 
  : process.env.NEXT_PUBLIC_BASE_API_URL; 

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- REQUEST INTERCEPTOR ---
// This runs every time you call apiClient.get/post/etc.
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 1. Grab the token from the cookie we set in AuthContext
    const token = Cookies.get('auth_token');

    // 2. If the token exists, inject it into the headers
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- RESPONSE INTERCEPTOR ---
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    // If the backend returns 401, it means the token is expired or invalid
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login...");
      // Optional: Clear cookies and redirect to login
      // Cookies.remove('auth_token');
      // window.location.href = '/login';
    }
    
    const message = (error.response?.data as any)?.detail || error.message;
    console.error('[Network Error]:', message);
    return Promise.reject(message);
  }
);

export default apiClient;