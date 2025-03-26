
import { Loader } from "lucide-react";

export function LoadingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center animate-pulse">
          <div className="w-12 h-12 rounded-full bg-temple-orange/20"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center animate-spin">
          <Loader className="w-8 h-8 text-temple-orange" />
        </div>
      </div>
      <h2 className="mt-4 text-xl font-display font-medium animate-pulse">Loading</h2>
    </div>
  );
}
