import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import { supabase } from '../lib/supabase';
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
  login: (email: string, password: string) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserRole = async (userId: string, userEmail?: string): Promise<UserRole> => {
    // const { data, error } = await supabase
    //   .from('profiles')
    //   .select('role')
    //   .eq('id', userId)
    //   .maybeSingle();
    // if (error || !data?.role) {
    //   return inferRoleFromEmail(userEmail) as UserRole;
    // }
    // return normalizeRole(data.role) as UserRole;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {

        /*
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
        */
      } catch (err) {
        console.error('Auth init error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();

    // El listener de cambios de autenticación sigue activo (por si el usuario
    // inicia sesión en otra pestaña o manualmente).
    // const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
    //   const sessionUser = session?.user;
    //   if (!sessionUser) {
    //     setUser(null);
    //     return;
    //   }
    //   const role = await fetchUserRole(sessionUser.id, sessionUser.email);
    //   setUser({
    //     id: sessionUser.id,
    //     email: sessionUser.email!,
    //     role,
    //   });
    // });
    return () => {};
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      // // if (error) throw error;
      // // const sessionUser = data.user;
      // // let role: UserRole = 'employee';
      // // const { data: profileData, error: profileError } = await supabase
      // //   .from('profiles')
      // //   .select('role')
      // //   .eq('id', sessionUser.id)
      // //   .maybeSingle();
      // // if (!profileError && profileData?.role) {
      // //   role = normalizeRole(profileData.role) as UserRole;
      // // } else {
      // //   role = inferRoleFromEmail(sessionUser.email) as UserRole;
      // // }
      // // setUser({
      // //   id: sessionUser.id,
      // //   email: sessionUser.email!,
      // //   role,
      // });
      // return { success: true, role };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    // await supabase.auth.signOut();
    // setUser(null);
  };

  const value = { user, isAuthenticated: !!user, isLoading, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };