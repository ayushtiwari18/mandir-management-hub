
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user data
const MOCK_USERS = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@duttmandir.com",
    password: "admin123",
    role: "admin" as const,
    avatar: "/admin-avatar.png",
  },
  {
    id: 2,
    name: "Temple User",
    email: "user@duttmandir.com",
    password: "user123",
    role: "user" as const,
    avatar: "/user-avatar.png",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for saved user on component mount
    const savedUser = localStorage.getItem("duttMandir_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("duttMandir_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem(
        "duttMandir_user",
        JSON.stringify(userWithoutPassword)
      );
      toast.success(`Welcome back, ${userWithoutPassword.name}!`);
      return;
    }

    toast.error("Invalid email or password");
    throw new Error("Invalid credentials");
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const userExists = MOCK_USERS.some((u) => u.email === email);
    if (userExists) {
      toast.error("User with this email already exists");
      throw new Error("User already exists");
    }

    // In a real app, we would send this to a backend API
    const newUser = {
      id: MOCK_USERS.length + 1,
      name,
      email,
      role: "user" as const,
    };

    setUser(newUser);
    localStorage.setItem("duttMandir_user", JSON.stringify(newUser));
    toast.success("Registration successful!");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("duttMandir_user");
    toast.info("You have been logged out");
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
