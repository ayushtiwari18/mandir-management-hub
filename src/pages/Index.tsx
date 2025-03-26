
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const Index = () => {
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
          <span className="font-semibold text-lg">Dutt Mandir</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate("/login")}>
            Log in
          </Button>
          <Button onClick={() => navigate("/register")}>Register</Button>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <section className="py-16 md:py-24 px-4 flex flex-col items-center justify-center text-center">
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Dutt Mandir Management System
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              An elegant and intuitive platform for temple management, accommodation booking, and donation tracking
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/login")}>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/register")}>
                Create Account
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-secondary/50 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="overflow-hidden border-0 shadow-sm transition-all hover:shadow-md">
                <div className="h-2 bg-temple-orange" />
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-temple-orange/10 flex items-center justify-center text-temple-orange mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Donation Management</h3>
                  <p className="text-muted-foreground">
                    Efficiently track and manage donations, generate receipts, and maintain donor records with complete transparency.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-sm transition-all hover:shadow-md">
                <div className="h-2 bg-temple-blue" />
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-temple-blue/10 flex items-center justify-center text-temple-blue mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 22v-8l4-1 1-3h2l1 3 4 1v8" />
                      <path d="M7 8v2" />
                      <path d="M17 8v2" />
                      <path d="m22 2-5 5" />
                      <path d="m17 2 5 5" />
                      <path d="M14 13v3" />
                      <path d="M3.5 14h9" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Accommodation Booking</h3>
                  <p className="text-muted-foreground">
                    Streamlined room booking system with real-time availability, online reservations, and convenient management tools.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-sm transition-all hover:shadow-md">
                <div className="h-2 bg-temple-purple" />
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-temple-purple/10 flex items-center justify-center text-temple-purple mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M3 9h18" />
                      <path d="M9 21V9" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Event Management</h3>
                  <p className="text-muted-foreground">
                    Plan and organize temple events, schedule pujas, and coordinate volunteers through an intuitive calendar interface.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">Why Choose Dutt Mandir System</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Built with modern technology and designed with user experience in mind
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-temple-gold/10 flex items-center justify-center text-temple-gold mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure & Reliable</h3>
                <p className="text-muted-foreground">
                  Built with best security practices to keep your data safe and available
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-temple-green/10 flex items-center justify-center text-temple-green mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 16v-4a4 4 0 1 0-8 0v4" />
                    <path d="M12 6a4 4 0 0 0-4 4v1h8v-1a4 4 0 0 0-4-4Z" />
                    <path d="M4 16v-1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1a6.97 6.97 0 0 1-2.667 5.47A.998.998 0 0 1 17 21.5l-10 .5a1 1 0 0 1-.5-.1A6.979 6.979 0 0 1 4 16Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Intuitive Experience</h3>
                <p className="text-muted-foreground">
                  User-friendly interface designed for ease of use by temple staff
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-temple-teal/10 flex items-center justify-center text-temple-teal mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" />
                    <path d="M7 21a9 9 0 0 1-3.5-5" />
                    <path d="M3 8a9 9 0 0 1 3-4" />
                    <path d="M12 3a9 9 0 0 1 6 2.5" />
                    <path d="M21 8a9 9 0 0 0-1.5-3" />
                    <path d="M12 3a5 5 0 0 0-5 5" />
                    <path d="M17 8a5 5 0 0 0-5-5" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Comprehensive Reports</h3>
                <p className="text-muted-foreground">
                  Detailed analytics and exportable reports for better decision making
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-temple-red/10 flex items-center justify-center text-temple-red mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 18.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Z" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">24/7 Availability</h3>
                <p className="text-muted-foreground">
                  Access the system anytime, anywhere, from any device with internet
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary/5 py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Streamline Your Temple Management?</h2>
            <Button size="lg" onClick={() => navigate("/register")}>
              Get Started Today
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-temple-orange flex items-center justify-center">
                <span className="text-white font-bold">DM</span>
              </div>
              <span className="font-semibold">Dutt Mandir</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2023 Dutt Mandir Management System. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
