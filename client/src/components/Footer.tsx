import { Link } from "wouter";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-muted pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-medium text-sm mb-3">Kontakt</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="tel:+4917092877" className="hover:text-foreground transition-colors">
                  0170 9287722
                </a>
              </li>
              <li>
                <a href="mailto:info@entranceinharmony.de" className="hover:text-foreground transition-colors">
                  info@entranceinharmony.de
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors" data-testid="footer-link-home">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/leistungen" className="hover:text-foreground transition-colors" data-testid="footer-link-gesicht">
                  Gesichtsbehandlungen
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-foreground transition-colors" data-testid="footer-link-ueber">
                  Über mich
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3">Social Media</h3>
            <div className="flex gap-3">
              <a
                href="https://wa.me/4917092877"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-button-whatsapp"
              >
                <SiWhatsapp className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/entranceinharmony"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="footer-button-instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 Entrance in Harmony. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-foreground transition-colors" data-testid="footer-link-impressum">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-foreground transition-colors" data-testid="footer-link-datenschutz">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
