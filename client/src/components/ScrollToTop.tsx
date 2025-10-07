import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-50 bg-background transition-opacity duration-300 ${
        isTransitioning ? "opacity-20" : "opacity-0"
      }`}
    />
  );
}
