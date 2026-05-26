import { useState, useEffect } from "react";
import type { LoginRequest, RegisterUserRequest, User } from "../types/Auth";
import { login, logout, register } from "../services/api";
import { AuthContext } from "./AuthContextDefinition";

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
