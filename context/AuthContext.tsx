'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  token: string | null;
  user: any | null;
  login: (token: string, userData: any) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in on page load
    const savedToken = Cookies.get('auth_token');
    const savedUser = localStorage.getItem('user_data');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (newToken: string, userData: any) => {
    Cookies.set('auth_token', newToken, { expires: 1, secure: true }); // 1 day
    localStorage.setItem('user_data', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    router.push('/dashboard'); // Redirect to chat after login
  }

  const logout = () => {
    Cookies.remove('auth_token');
    localStorage.removeItem('user_data');
    setToken(null);
    setUser(null);
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};