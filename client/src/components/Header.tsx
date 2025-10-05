import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logoImage from "@assets/Logo-PSD_1759668524506.png";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/leistungen", label: "Gesichtsbehandlungen" },
    { href: "/kontakt", label: "Über mich" },
  ];

  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-28 items-center justify-between">
          <Link href="/" data-testid="link-home">
            <div className="gold-logo-3d">
              <img 
                src={logoImage} 
                alt="Entrance in Harmony" 
                className="h-24 w-auto relative z-10" 
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                <span
                  className={`text-sm font-normal transition-colors hover:text-muted-foreground ${
                    location === link.href
                      ? "text-foreground"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button
              className="hidden md:flex bg-[#25D366] hover:bg-[#20BA5A] text-white border-[#20BA5A]"
              asChild
              data-testid="button-termin-header"
            >
              <a href="https://wa.me/491709287722" target="_blank" rel="noopener noreferrer">
                <SiWhatsapp className="mr-2 h-4 w-4" />
                Termin vereinbaren
              </a>
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="md:hidden hover-elevate"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start"
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
