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
            <Link href="/" data-testid="link-home">
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
                        ? 'text-gold-gradient' 
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
          <div className="h-px w-full gold-shimmer opacity-60"></div>
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
                    location === link.href ? 'text-gold-gradient font-medium' : 'text-foreground'
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
