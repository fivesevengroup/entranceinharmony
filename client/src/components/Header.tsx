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
    <header className="w-full absolute top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Aurora Crown Canopy - Geschwungener Bogen */}
      <div className={`absolute left-0 right-0 pointer-events-none transition-all duration-300 ${
        isScrolled ? 'top-0' : '-top-4'
      }`} style={{ height: isScrolled ? '60px' : '80px' }}>
        <svg 
          viewBox="0 0 1200 80" 
          preserveAspectRatio="none" 
          className="absolute inset-0 w-full h-full"
          style={{ 
            fill: isScrolled ? 'hsl(var(--background) / 0.95)' : 'rgba(255,255,255,0.1)',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
          }}
        >
          <path d="M0,80 Q600,0 1200,80 L1200,80 L0,80 Z"></path>
        </svg>
        
        {/* Logo Medaillon zentral im Bogen */}
        <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-auto ${
          isScrolled ? 'top-2' : 'top-0'
        }`}>
          {/* Radialer Gold-Glow um Logo */}
          <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isScrolled ? 'opacity-60' : 'opacity-100'
          }`} style={{
            background: 'radial-gradient(circle, rgba(244,212,143,0.4) 0%, rgba(244,212,143,0.2) 40%, transparent 70%)',
            width: isScrolled ? '100px' : '140px',
            height: isScrolled ? '100px' : '140px',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
            filter: 'blur(12px)',
            pointerEvents: 'none'
          }}></div>
          
          <Link href="/" data-testid="link-home" className="relative block">
            <div className={`bg-background/80 backdrop-blur-md rounded-full transition-all duration-300 ${
              isScrolled ? 'p-2 shadow-md' : 'p-3 shadow-xl'
            } border-2 border-gold/40`}>
              <img 
                src={logoImage} 
                alt="Entrance in Harmony" 
                className={`w-auto transition-all duration-300 ${
                  isScrolled ? 'h-10' : 'h-16'
                }`}
                style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }}
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Glasige Navigation */}
      <div className={`w-full transition-all duration-300 ${
        isScrolled ? 'mt-14' : 'mt-20'
      }`}>
        <div className={`backdrop-blur-md transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/60 border-b border-primary/20' 
            : 'bg-white/10'
        }`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center h-14">
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-testid={`link-${link.label.toLowerCase()}`}
                  >
                    <span
                      className={`text-sm font-medium transition-all duration-200 tracking-wider uppercase ${
                        location === link.href 
                          ? 'text-gold-gradient font-semibold' 
                          : isScrolled 
                            ? 'text-foreground hover:text-primary' 
                            : 'text-white drop-shadow-lg hover:text-primary'
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-2 md:hidden ml-auto">
                <Button
                  size="icon"
                  variant="ghost"
                  className={isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-primary'}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  data-testid="button-mobile-menu"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
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
