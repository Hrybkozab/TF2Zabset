import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="tf-paper border-2 border-border shadow-card p-8 text-center max-w-md w-full">
          <h1 className="mb-4 font-display text-6xl tf-headline">404</h1>
          <p className="mb-5 font-slab text-muted-foreground">Page not found</p>
          <Link to="/" className="tf-stamp inline-block bg-primary text-primary-foreground px-5 py-2 text-sm">
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
