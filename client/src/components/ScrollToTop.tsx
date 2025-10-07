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
    }, 800);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-700 ${
        isTransitioning ? "opacity-100" : "opacity-0"
      }`}
      style={{
        background: isTransitioning 
          ? "radial-gradient(circle at center, rgba(244, 212, 143, 0.15) 0%, rgba(244, 212, 143, 0.08) 30%, transparent 70%)"
          : "transparent"
      }}
    >
      <div 
        className={`absolute inset-0 transition-all duration-700 ${
          isTransitioning ? "opacity-100 scale-110" : "opacity-0 scale-100"
        }`}
        style={{
          background: "radial-gradient(circle at 50% 40%, rgba(244, 212, 143, 0.2) 0%, transparent 60%)",
          filter: "blur(60px)"
        }}
      />
    </div>
  );
}
