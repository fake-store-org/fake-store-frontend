import { createContext, useContext, useState, useEffect } from "react";
import type { LoginRequest, RegisterUserRequest, User } from "../types/Auth";
import { login, logout, register } from "../services/api";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  registerUser: (data: RegisterUserRequest) => Promise<void>;
  loginUser: (data: LoginRequest) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const loginUser = async (data: LoginRequest) => {
    const response = await login(data);

    setUser({
      userId: response.userId,
      email: response.email,
      role: response.role,
    });
    setIsLoggedIn(true);
  };

  const registerUser = async (data: RegisterUserRequest) => {
    const response = await register(data);

    setUser({
      userId: response.userId,
      email: response.email,
      role: response.role,
    });
    setIsLoggedIn(true);
  };

  /* handles manual logout */
  const logoutUser = () => {
    logout();

    setUser(null);
    setIsLoggedIn(false);
  };

  /* handles failed refresh */
  useEffect(() => {
    const handleLogout = () => {
      setUser(null);
      setIsLoggedIn(false);
    };

    window.addEventListener("auth:logout", handleLogout);

    return () => window.removeEventListener("auth:logout", handleLogout);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
