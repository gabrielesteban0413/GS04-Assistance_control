import React, { createContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'rrhh' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string) => {
    if (!password || password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    let role: UserRole = 'employee';
    if (email.includes('admin')) role = 'admin';
    else if (email.includes('rrhh')) role = 'rrhh';

    const newUser: User = {
      id: crypto.randomUUID?.() || Date.now().toString(),
      name: role === 'admin' ? 'Administrador' : role === 'rrhh' ? 'RRHH' : 'Empleado',
      email,
      role,
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };