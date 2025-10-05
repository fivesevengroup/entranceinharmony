import { Link } from "wouter";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-serif text-xl mb-4 text-primary">Über uns</h3>
            <p className="text-background/80 leading-relaxed">
              Entrance in Harmony vereint Schönheit, Ästhetik und Wohlbefinden. 
              Erleben Sie professionelle Behandlungen in entspannter Atmosphäre.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-4 text-primary">Leistungen</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/leistungen" className="text-background/80 hover:text-primary transition-colors" data-testid="footer-link-gesicht">
                  Gesichtsbehandlungen
                </Link>
              </li>
              <li>
                <Link href="/leistungen" className="text-background/80 hover:text-primary transition-colors" data-testid="footer-link-koerper">
                  Körperbehandlungen
                </Link>
              </li>
              <li>
                <Link href="/gutschein" className="text-background/80 hover:text-primary transition-colors" data-testid="footer-link-gutschein">
                  Gutscheine
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-4 text-primary">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/80">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+4917092877" className="hover:text-primary transition-colors">
                  0170 9287722
                </a>
              </li>
              <li className="flex items-center gap-2 text-background/80">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@entranceinharmony.de" className="hover:text-primary transition-colors">
                  info@entranceinharmony.de
                </a>
              </li>
              <li className="flex items-start gap-2 text-background/80">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span>Elena Hartstein<br />Beauty & Aesthetics</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-xl mb-4 text-primary">Social Media</h3>
            <div className="flex gap-3 mb-4">
              <Button
                size="icon"
                variant="outline"
                className="border-primary/30 hover:border-primary hover:bg-primary/10"
                asChild
                data-testid="footer-button-whatsapp"
              >
                <a href="https://wa.me/4917092877" target="_blank" rel="noopener noreferrer">
                  <SiWhatsapp className="h-5 w-5 text-primary" />
                </a>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="border-primary/30 hover:border-primary hover:bg-primary/10"
                asChild
                data-testid="footer-button-instagram"
              >
                <a href="https://instagram.com/entranceinharmony" target="_blank" rel="noopener noreferrer">
                  <SiInstagram className="h-5 w-5 text-primary" />
                </a>
              </Button>
            </div>
            <p className="text-sm text-background/70">
              Folgen Sie uns für Beauty-Tipps und Angebote
            </p>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/70">
          <p>© 2025 Entrance in Harmony - Beauty & Aesthetics. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-primary transition-colors" data-testid="footer-link-impressum">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-primary transition-colors" data-testid="footer-link-datenschutz">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
