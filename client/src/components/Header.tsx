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
      {/* Portal Column - Architektonisches Logo-Portal mit vertikaler Navigation */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-sm' 
          : 'bg-gradient-to-b from-white/20 to-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className={`flex items-center gap-8 transition-all duration-300 ${
            isScrolled ? 'py-3' : 'py-6'
          }`}>
            {/* Vertikale Navigation links */}
            <nav className="hidden lg:flex flex-col gap-4 pr-6 border-r border-primary/30">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`link-${link.label.toLowerCase()}`}
                >
                  <div className="relative group">
                    <span className={`text-xs font-medium tracking-[0.1em] uppercase transition-colors duration-200 ${
                      location === link.href 
                        ? 'text-primary font-semibold' 
                        : isScrolled 
                          ? 'text-foreground/80 group-hover:text-primary' 
                          : 'text-white/90 group-hover:text-white'
                    }`}>
                      {link.label}
                    </span>
                    
                    {/* Gold-Marker links */}
                    {location === link.href && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 w-4 h-px bg-primary"></div>
                    )}
                  </div>
                </Link>
              ))}
            </nav>

            {/* Logo als zentrales Portal-Element */}
            <Link href="/" data-testid="link-home" className="flex-shrink-0">
              <div className={`relative transition-all duration-300 ${
                isScrolled ? '' : 'px-6'
              }`}>
                <img 
                  src={logoImage} 
                  alt="Entrance in Harmony" 
                  className={`w-auto transition-all duration-300 ${
                    isScrolled ? 'h-12' : 'h-20'
                  }`}
                  style={{
                    filter: isScrolled 
                      ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                      : 'drop-shadow(0 4px 12px rgba(244,212,143,0.3))'
                  }}
                />
                
                {/* Portal-Rahmen (nur wenn nicht gescrollt) */}
                {!isScrolled && (
                  <>
                    <div className="absolute -left-2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent"></div>
                    <div className="absolute -right-2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent"></div>
                  </>
                )}
              </div>
            </Link>

            {/* Rechte Navigation (vertikal) */}
            <nav className="hidden lg:flex flex-col gap-4 pl-6 border-l border-primary/30">
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`link-${link.label.toLowerCase()}`}
                >
                  <div className="relative group">
                    <span className={`text-xs font-medium tracking-[0.1em] uppercase transition-colors duration-200 ${
                      location === link.href 
                        ? 'text-primary font-semibold' 
                        : isScrolled 
                          ? 'text-foreground/80 group-hover:text-primary' 
                          : 'text-white/90 group-hover:text-white'
                    }`}>
                      {link.label}
                    </span>
                    
                    {/* Gold-Marker rechts */}
                    {location === link.href && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 w-4 h-px bg-primary"></div>
                    )}
                  </div>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden ml-auto">
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
