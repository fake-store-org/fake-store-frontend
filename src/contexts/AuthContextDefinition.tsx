import { createContext } from "react";
import type { LoginRequest, RegisterUserRequest, User } from "../types/Auth";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  registerUser: (data: RegisterUserRequest) => Promise<void>;
  loginUser: (data: LoginRequest) => Promise<void>;
  logoutUser: () => void;
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
