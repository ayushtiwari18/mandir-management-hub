
import { useEffect } from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-temple-orange flex items-center justify-center">
            <span className="text-white font-bold">DM</span>
          </div>
          <span className="font-semibold text-lg hidden sm:inline-block">Dutt Mandir</span>
        </div>
      </header>
      <RegisterForm />
    </div>
  );
}
