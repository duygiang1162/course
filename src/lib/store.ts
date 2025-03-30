import { create } from 'zustand';
import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: string | null;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  clearSuccess: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  success: null,
  signUp: async (email, password, username) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }
        }
      });
      if (error) throw error;
      set({ 
        success: 'Account created successfully! Please log in.',
        loading: false 
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
  signIn: async (email, password, rememberMe) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      set({ user: data.user, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
  signOut: async () => {
    set({ loading: true });
    await supabase.auth.signOut();
    set({ user: null, loading: false });
  },
  checkAuth: async () => {
    set({ loading: true });
    const { data } = await supabase.auth.getUser();
    set({ user: data.user, loading: false });
  },
  clearError: () => set({ error: null }),
  clearSuccess: () => set({ success: null })
}));
