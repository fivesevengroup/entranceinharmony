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
      <div className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-primary/30 shadow-lg' 
          : 'navbar-glass-hero'
      }`}>
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-20' : 'h-24'
          }`}>
            <Link href="/" data-testid="link-home" className="relative">
              {/* Golden Arc Halo - Goldener Leuchtbogen über dem Logo */}
              <div className={`absolute left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300 ${
                isScrolled ? '-top-3 opacity-80' : '-top-5 opacity-100'
              }`} style={{ width: isScrolled ? '80px' : '120px', height: isScrolled ? '40px' : '60px' }}>
                <svg 
                  viewBox="0 0 120 60" 
                  className="absolute inset-0 w-full h-full"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(244, 212, 143, 0.5))' }}
                >
                  <defs>
                    <linearGradient id="haloGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#d4af37', stopOpacity: 0.3 }} />
                      <stop offset="50%" style={{ stopColor: '#f4d48f', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#d4af37', stopOpacity: 0.3 }} />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M15,50 Q60,5 105,50" 
                    fill="none" 
                    stroke="url(#haloGradient)" 
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
                {/* Innerer Glow */}
                <svg 
                  viewBox="0 0 120 60" 
                  className="absolute inset-0 w-full h-full opacity-50"
                >
                  <path 
                    d="M15,50 Q60,5 105,50" 
                    fill="none" 
                    stroke="#f4d48f" 
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ filter: 'blur(4px)' }}
                  />
                </svg>
              </div>
              
              <img 
                src={logoImage} 
                alt="Entrance in Harmony" 
                className={`w-auto transition-all duration-300 ${
                  isScrolled ? 'h-12' : 'h-20'
                }`}
                style={isScrolled ? { 
                  filter: 'none',
                  opacity: 1
                } : { 
                  filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.4)) brightness(1.05)',
                  opacity: 1
                }}
              />
            </Link>

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

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className={`md:hidden ${isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-primary'}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        {!isScrolled && (
          <div className="h-px w-full gold-shimmer"></div>
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
