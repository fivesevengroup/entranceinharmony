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
    <header className={`w-full sticky top-0 z-50 transition-all duration-300 ${
      transparent && !isScrolled 
        ? 'bg-black/20 backdrop-blur-md' 
        : 'bg-black/30 backdrop-blur-md border-b border-white/10'
    }`}>
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-16' : 'h-28'
        }`}>
          <Link href="/" data-testid="link-home">
            <img 
              src={logoImage} 
              alt="Entrance in Harmony" 
              className={`w-auto transition-all duration-300 ${
                isScrolled ? 'h-12' : 'h-24'
              }`}
              style={{ 
                filter: transparent && !isScrolled
                  ? 'brightness(0) saturate(100%) invert(100%) drop-shadow(0 2px 8px rgba(0,0,0,0.3))'
                  : 'brightness(0) saturate(100%) invert(65%) sepia(46%) saturate(664%) hue-rotate(359deg) brightness(96%) contrast(89%) drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                opacity: 0.85
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
                  className={`text-sm font-normal transition-colors text-white drop-shadow-lg hover:text-white/80 ${location === link.href ? 'font-medium' : ''}`}
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
              className="md:hidden hover-elevate text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-sm border-t border-white/10">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:text-white/80"
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
