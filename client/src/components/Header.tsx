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
      {/* Golden Veil Ribbon - Geschichtete Satin-Bänder */}
      <div className="relative overflow-hidden">
        {/* Hintergrund-Bänder */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          isScrolled ? 'opacity-95' : 'opacity-30'
        }`}>
          <div className="absolute inset-0" style={{
            background: isScrolled 
              ? 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--background)) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(244,212,143,0.1) 50%, rgba(255,255,255,0.15) 100%)'
          }}></div>
        </div>

        {/* Animierte Gold-Shimmer-Linie */}
        <div className={`absolute inset-0 pointer-events-none ${!isScrolled ? 'block' : 'hidden'}`}>
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute h-full w-1/3 opacity-40"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(244,212,143,0.6) 50%, transparent 100%)',
                animation: 'shimmer 3s ease-in-out infinite',
                filter: 'blur(20px)'
              }}
            ></div>
          </div>
        </div>

        {/* Hauptinhalt */}
        <div className="relative backdrop-blur-md">
          <div className="container mx-auto px-4">
            <div className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? 'h-16' : 'h-20'
            }`}>
              {/* Logo zentral in goldenem Rahmen */}
              <Link href="/" data-testid="link-home" className="relative">
                <div className={`relative transition-all duration-300 ${
                  isScrolled ? 'p-1.5' : 'p-2'
                }`} style={{
                  background: 'linear-gradient(135deg, #f4d48f 0%, #d4af37 100%)',
                  borderRadius: '12px'
                }}>
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg p-2">
                    <img 
                      src={logoImage} 
                      alt="Entrance in Harmony" 
                      className={`w-auto transition-all duration-300 ${
                        isScrolled ? 'h-8' : 'h-12'
                      }`}
                    />
                  </div>
                </div>
              </Link>

              {/* Navigation als leuchtende Pillen */}
              <nav className="hidden md:flex items-center gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-testid={`link-${link.label.toLowerCase()}`}
                  >
                    <div className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                      location === link.href 
                        ? 'bg-gold/20 shadow-lg' 
                        : isScrolled 
                          ? 'bg-background/40 hover:bg-gold/10' 
                          : 'bg-white/10 hover:bg-white/20'
                    }`} style={{
                      backdropFilter: 'blur(8px)',
                      border: location === link.href ? '1px solid rgba(244,212,143,0.5)' : '1px solid rgba(255,255,255,0.1)'
                    }}>
                      {/* Licht-Spur Effekt */}
                      {location === link.href && (
                        <div className="absolute inset-0 rounded-full" style={{
                          background: 'linear-gradient(90deg, transparent, rgba(244,212,143,0.3), transparent)',
                          animation: 'trail 2s ease-in-out infinite'
                        }}></div>
                      )}
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

        {/* Untere Shimmer-Linie */}
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
