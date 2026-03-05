import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;

  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (email: string, password: string, firstName: string, lastName: string, phone?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          const data = await response.json();
          if (data.success) {
            localStorage.setItem('waterpark-token', data.token);
            set({ user: data.user, isAuthenticated: true });
            return { success: true };
          } else {
            return { success: false, message: data.message };
          }
        } catch (error) {
          return { success: false, message: 'Server connection failed' };
        }
      },

      signup: async (email: string, password: string, firstName: string, lastName: string, phone?: string) => {
        try {
          const response = await fetch('http://localhost:5000/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, firstName, lastName, phone }),
          });
          const data = await response.json();
          if (data.success) {
            localStorage.setItem('waterpark-token', data.token);
            set({ user: data.user, isAuthenticated: true });
            return { success: true };
          } else {
            return { success: false, message: data.message };
          }
        } catch (error) {
          return { success: false, message: 'Server connection failed' };
        }
      },

      logout: () => {
        localStorage.removeItem('waterpark-token');
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'waterpark-auth',
    }
  )
);
