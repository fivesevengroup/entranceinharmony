import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logoImage from "@assets/1_1759667673002.png";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Startseite" },
    { href: "/leistungen", label: "Leistungen" },
    { href: "/preisliste", label: "Preisliste" },
    { href: "/galerie", label: "Galerie" },
    { href: "/bewertungen", label: "Bewertungen" },
    { href: "/gutschein", label: "Gutschein" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" data-testid="link-home">
            <img src={logoImage} alt="Entrance in Harmony" className="h-12 md:h-16 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-${link.label.toLowerCase()}`}
              >
                <span
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === link.href
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              asChild
              data-testid="button-whatsapp"
              className="hover-elevate"
            >
              <a
                href="https://wa.me/4917092877"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <SiWhatsapp className="h-5 w-5 text-primary" />
              </a>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              asChild
              data-testid="button-instagram"
              className="hover-elevate"
            >
              <a
                href="https://instagram.com/entranceinharmony"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <SiInstagram className="h-5 w-5 text-primary" />
              </a>
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden hover-elevate"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant={location === link.href ? "default" : "ghost"}
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
