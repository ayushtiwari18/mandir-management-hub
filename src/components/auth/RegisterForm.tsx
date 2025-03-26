
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, Eye, EyeOff, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const { register } = useAuth();
  const navigate = useNavigate();

  const passwordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!name || !email) {
        toast.error("Please fill in all fields");
        return;
      }
      setStep(2);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (passwordStrength() < 3) {
      toast.error("Please create a stronger password");
      return;
    }

    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setIsLoading(true);
    try {
      await register(name, email, password);
      toast.success("Registration successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      // Error toast is shown by the AuthContext on failure
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in flex justify-center items-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-temple-orange flex items-center justify-center">
              <span className="text-white text-2xl font-bold">DM</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-display text-center">
            {step === 1 ? "Create an Account" : "Set Your Password"}
          </CardTitle>
          <CardDescription className="text-center">
            {step === 1
              ? "Enter your information to create an account"
              : "Create a secure password for your account"}
          </CardDescription>
          <div className="flex justify-between items-center px-8 pt-2">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full ${
                  step >= 1 ? "bg-primary" : "bg-muted"
                } flex items-center justify-center text-white mb-2`}
              >
                {step > 1 ? <Check className="h-4 w-4" /> : "1"}
              </div>
              <span className="text-xs">Details</span>
            </div>
            <div className="flex-1 h-1 bg-muted mx-2">
              <div
                className={`h-full bg-primary transition-all duration-300 ${
                  step > 1 ? "w-full" : "w-0"
                }`}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full ${
                  step >= 2 ? "bg-primary" : "bg-muted"
                } flex items-center justify-center ${
                  step >= 2 ? "text-white" : "text-muted-foreground"
                } mb-2`}
              >
                2
              </div>
              <span className="text-xs">Password</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoFocus
                    className="transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="transition-all"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoFocus
                      className="pr-10 transition-all"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">Password strength:</span>
                      <span className="text-xs">
                        {["Weak", "Fair", "Good", "Strong"][passwordStrength() - 1] || ""}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength() === 0
                            ? "w-0"
                            : passwordStrength() === 1
                            ? "w-1/4 bg-temple-red"
                            : passwordStrength() === 2
                            ? "w-2/4 bg-temple-amber"
                            : passwordStrength() === 3
                            ? "w-3/4 bg-temple-green"
                            : "w-full bg-temple-green"
                        }`}
                      ></div>
                    </div>
                    <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                      <li className={password.length >= 8 ? "text-temple-green" : ""}>
                        At least 8 characters
                      </li>
                      <li className={/[A-Z]/.test(password) ? "text-temple-green" : ""}>
                        At least one uppercase letter
                      </li>
                      <li className={/[0-9]/.test(password) ? "text-temple-green" : ""}>
                        At least one number
                      </li>
                      <li className={/[^A-Za-z0-9]/.test(password) ? "text-temple-green" : ""}>
                        At least one special character
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="pr-10 transition-all"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-xs text-temple-red mt-1">Passwords do not match</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => 
                      setAcceptTerms(checked === true)
                    }
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-normal cursor-pointer"
                  >
                    I accept the{" "}
                    <Link
                      to="/terms"
                      className="text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      terms of service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      privacy policy
                    </Link>
                  </Label>
                </div>
              </>
            )}
            <div className="flex space-x-2">
              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Processing...</span>
                  </span>
                ) : step === 1 ? (
                  "Continue"
                ) : (
                  <span className="flex items-center justify-center">
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Sign up</span>
                  </span>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center">
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
