import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import logoImage from "@assets/Logo-PSD_1759668524506.png";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/leistungen", label: "Behandlungen" },
    { href: "/geschenkgutscheine", label: "Geschenkgutscheine" },
    { href: "/kontakt", label: "Über mich" },
  ];

  return (
    <header className="w-full absolute top-0 left-0 right-0 z-50">
      {/* Celestial Gem Bar - Facettierter Edelstein mit Sternchen */}
      <div className="relative overflow-hidden">
        {/* Facettierter Edelstein-Hintergrund */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          isScrolled ? 'opacity-100' : 'opacity-40'
        }`}>
          <div className="absolute inset-0" style={{
            background: isScrolled
              ? 'linear-gradient(160deg, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 100%)'
              : 'linear-gradient(160deg, rgba(255,255,255,0.2) 0%, rgba(244,212,143,0.15) 30%, rgba(212,175,55,0.2) 60%, rgba(255,255,255,0.1) 100%)',
            backdropFilter: 'blur(12px)'
          }}></div>
          
          {/* Facetten-Effekt (Diamant-Schnitt) */}
          {!isScrolled && (
            <>
              <div className="absolute inset-0 opacity-30" style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(244,212,143,0.3) 50%, transparent 70%)',
                backgroundSize: '200% 200%',
                animation: 'shimmer 4s ease-in-out infinite'
              }}></div>
              <div className="absolute inset-0 opacity-20" style={{
                background: 'linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
                backgroundSize: '200% 200%',
                animation: 'shimmer 5s ease-in-out infinite reverse'
              }}></div>
            </>
          )}
        </div>

        {/* Gold-Sternchen-Partikel */}
        {!isScrolled && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 3 + 1 + 'px',
                  height: Math.random() * 3 + 1 + 'px',
                  background: 'radial-gradient(circle, #f4d48f, transparent)',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 2}s`,
                  opacity: 0.6
                }}
              ></div>
            ))}
          </div>
        )}

        {/* Hauptinhalt */}
        <div className="relative">
          <div className="container mx-auto px-4">
            <div className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? 'h-16' : 'h-20'
            }`}>
              {/* Logo */}
              <Link href="/" data-testid="link-home" className="relative">
                <div className="relative group">
                  <img 
                    src={logoImage} 
                    alt="Entrance in Harmony" 
                    className={`w-auto transition-all duration-300 ${
                      isScrolled ? 'h-10' : 'h-14'
                    }`}
                    style={{
                      filter: isScrolled 
                        ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                        : 'drop-shadow(0 4px 12px rgba(244,212,143,0.4)) drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                    }}
                  />
                </div>
              </Link>

              {/* Navigation als schwebende 3D-Kapseln */}
              <nav className="hidden md:flex items-center gap-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-testid={`link-${link.label.toLowerCase()}`}
                  >
                    <div 
                      className={`relative px-5 py-2 rounded-full transition-all duration-300 ${
                        location === link.href 
                          ? 'shadow-xl' 
                          : 'shadow-md hover:shadow-lg'
                      }`}
                      style={{
                        background: location === link.href
                          ? 'linear-gradient(135deg, rgba(244,212,143,0.3) 0%, rgba(212,175,55,0.25) 100%)'
                          : isScrolled
                            ? 'rgba(255,255,255,0.5)'
                            : 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        border: location === link.href 
                          ? '1px solid rgba(244,212,143,0.6)' 
                          : '1px solid rgba(255,255,255,0.2)',
                        transform: `translateY(${location === link.href ? '-2px' : '0'}) translateZ(${location === link.href ? '10px' : '0'})`,
                        boxShadow: location === link.href
                          ? '0 8px 24px rgba(244,212,143,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                          : '0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
                      }}
                    >
                      {/* Inneres Highlight (3D-Effekt) */}
                      <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-full" style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
                        pointerEvents: 'none'
                      }}></div>
                      
                      <span className={`relative text-xs font-medium tracking-wider uppercase ${
                        location === link.href 
                          ? 'text-gold-gradient font-semibold' 
                          : isScrolled 
                            ? 'text-foreground' 
                            : 'text-white'
                      }`}>
                        {link.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button
                  size="icon"
                  variant="ghost"
                  className={isScrolled ? 'text-foreground' : 'text-white'}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  data-testid="button-mobile-menu"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Untere Funkelnde Linie */}
        {!isScrolled && (
          <div className="h-px w-full" style={{
            background: 'linear-gradient(90deg, transparent, rgba(244,212,143,0.8), transparent)',
            boxShadow: '0 0 8px rgba(244,212,143,0.5)'
          }}></div>
        )}
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-primary/20">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className={`w-full justify-start hover:text-primary transition-colors ${
                    location === link.href ? 'text-primary font-semibold' : 'text-foreground'
                  }`}
                  data-testid={`mobile-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
