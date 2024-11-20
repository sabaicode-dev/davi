import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  username: string | null;
  email: string | null;
  setUsername: (value: string | null) => void;
  setEmail: (value: string | null) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ username, email, setUsername, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
