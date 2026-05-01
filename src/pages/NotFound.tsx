import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AmbientBackground } from "@/components/AmbientBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <AmbientBackground />
      <div className="text-center animate-fade-in">
        <h1 className="mb-4 text-7xl md:text-8xl font-bold text-gradient">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">This page drifted into the void.</p>
        <a href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-iridescent text-primary-foreground btn-shimmer shadow-glow font-medium">
          Return home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
