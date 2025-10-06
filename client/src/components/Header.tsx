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
      {/* Floating Axis - Schwebende Navigation mit zentralem Logo-Ankerpunkt */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-sm shadow-md' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className={`relative flex items-center justify-center transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-24'
          }`}>
            {/* Linke Navigation - Schwebend */}
            <nav className="hidden lg:flex items-center gap-1 absolute left-0">
              {navLinks.slice(0, 2).map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`link-${link.label.toLowerCase()}`}
                >
                  <div className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                    location === link.href ? 'bg-primary/10' : ''
                  }`}>
                    <span className={`text-xs font-medium tracking-wider uppercase transition-colors duration-200 ${
                      location === link.href 
                        ? 'text-primary font-semibold' 
                        : isScrolled 
                          ? 'text-foreground/70 hover:text-primary' 
                          : 'text-white/80 hover:text-white'
                    }`}>
                      {link.label}
                    </span>
                  </div>
                </Link>
              ))}
              
              {/* Subtile Gold-Verbindungslinie zum Logo */}
              {!isScrolled && (
                <div className="w-12 h-px bg-gradient-to-r from-primary/40 to-transparent ml-2"></div>
              )}
            </nav>

            {/* Logo als zentraler Ankerpunkt */}
            <Link href="/" data-testid="link-home" className="relative z-10">
              <div className={`relative transition-all duration-300 ${
                isScrolled ? '' : 'px-8'
              }`}>
                <img 
                  src={logoImage} 
                  alt="Entrance in Harmony" 
                  className={`w-auto transition-all duration-300 ${
                    isScrolled ? 'h-10' : 'h-16'
                  }`}
                  style={{
                    filter: isScrolled 
                      ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                      : 'drop-shadow(0 4px 16px rgba(244,212,143,0.4))'
                  }}
                />
                
                {/* Subtiler Gold-Glow um Logo */}
                {!isScrolled && (
                  <div className="absolute -inset-4 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-sm -z-10"></div>
                )}
              </div>
            </Link>

            {/* Rechte Navigation - Schwebend */}
            <nav className="hidden lg:flex items-center gap-1 absolute right-0">
              {/* Subtile Gold-Verbindungslinie zum Logo */}
              {!isScrolled && (
                <div className="w-12 h-px bg-gradient-to-l from-primary/40 to-transparent mr-2"></div>
              )}
              
              {navLinks.slice(2).map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`link-${link.label.toLowerCase()}`}
                >
                  <div className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                    location === link.href ? 'bg-primary/10' : ''
                  }`}>
                    <span className={`text-xs font-medium tracking-wider uppercase transition-colors duration-200 ${
                      location === link.href 
                        ? 'text-primary font-semibold' 
                        : isScrolled 
                          ? 'text-foreground/70 hover:text-primary' 
                          : 'text-white/80 hover:text-white'
                    }`}>
                      {link.label}
                    </span>
                  </div>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden absolute right-4">
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
