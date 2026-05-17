import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { inferRoleFromEmail, normalizeRole, resolveUserRole } from '../utils/roles';

export type UserRole = 'admin' | 'rrhh' | 'employee';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserRole = async (userId: string, userEmail?: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .maybeSingle();

    let role: UserRole;
    if (error || !data?.role) {
      role = inferRoleFromEmail(userEmail) as UserRole;
    } else {
      role = resolveUserRole(data.role, userEmail) as UserRole;
    }
    return normalizeRole(role) as UserRole;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user;

      if (sessionUser) {
        const role = await fetchUserRole(sessionUser.id, sessionUser.email);
        setUser({
          id: sessionUser.id,
          email: sessionUser.email!,
          role,
        });
      }
      setIsLoading(false);
    };

    initializeAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const sessionUser = session?.user;
      if (!sessionUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      const role = await fetchUserRole(sessionUser.id, sessionUser.email);
      setUser({
        id: sessionUser.id,
        email: sessionUser.email!,
        role,
      });
      setIsLoading(false);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    // El efecto se encargará de actualizar el usuario
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };