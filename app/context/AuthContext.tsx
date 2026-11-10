"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextProps {
  isAuthenticated: boolean;
  authChecked: boolean;
  user: User | null;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const router = useRouter();

  const isAuthenticated = !!user;

  // Verify the existing HttpOnly JWT cookie with the backend.
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          setUserState(null);
          return;
        }

        const data = await response.json();
        setUserState(data.data.user);
      } catch (error) {
        console.error("Auth check failed:", error);
        setUserState(null);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  // Update frontend authentication state after successful login.
  const setUser = (user: User) => {
    setUserState(user);
  };

  const logout = async () => {
    try {
      // This endpoint must clear the accessToken cookie on the backend.
      const response = await fetch("/api/auth/logoutAPI", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setUserState(null);
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Unable to log out.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authChecked,
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
