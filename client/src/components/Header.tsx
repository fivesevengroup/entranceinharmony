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
      {/* Tailored Matte - Matter Mauve-Balken mit gedämpften Gold-Akzenten */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-background shadow-md' 
          : 'bg-[hsl(280,35%,85%)] shadow-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo links */}
            <Link href="/" data-testid="link-home">
              <img 
                src={logoImage} 
                alt="Entrance in Harmony" 
                className={`w-auto transition-all duration-300 ${
                  isScrolled ? 'h-10' : 'h-12'
                }`}
                style={{
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                }}
              />
            </Link>

            {/* Navigation zentriert - Uppercase mit Letter-Spacing */}
            <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`link-${link.label.toLowerCase()}`}
                >
                  <div className="relative py-2 group">
                    <span className={`text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-200 ${
                      location === link.href 
                        ? 'text-[#d4af37] font-semibold' 
                        : 'text-foreground/90 group-hover:text-[#d4af37]'
                    }`}>
                      {link.label}
                    </span>
                    
                    {/* Gedämpfte Gold-Linie bei Hover */}
                    <div 
                      className={`absolute bottom-0 left-0 right-0 h-px bg-[#d4af37] transition-all duration-300 ${
                        location === link.href 
                          ? 'opacity-100 scale-x-100' 
                          : 'opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100'
                      }`}
                    ></div>
                  </div>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                size="icon"
                variant="ghost"
                className="text-foreground"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Subtile untere Linie */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent"></div>
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
