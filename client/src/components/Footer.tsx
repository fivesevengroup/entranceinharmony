import { Link } from "wouter";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { Sparkles } from "lucide-react";
import WaveDivider from "@/components/WaveDivider";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-section-accent">
      <WaveDivider position="top" color="hsl(var(--section-accent))" />
      
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/30 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="pt-16 pb-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6 group">
              <Sparkles className="w-6 h-6 text-primary transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <h3 className="font-serif text-4xl md:text-5xl font-light text-gold-gradient">
                Entrance in Harmony
              </h3>
              <Sparkles className="w-6 h-6 text-primary transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
            </div>
            <div className="h-1 w-24 mx-auto mb-6 gold-shimmer rounded-full"></div>
            <p className="text-base font-medium text-muted-foreground">
              Ihre Beauty-Expertin in Burbach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 max-w-5xl mx-auto">
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-6 text-primary">Kontakt</h4>
              <ul className="space-y-3 text-base">
                <li>
                  <a href="tel:+491709287722" className="text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center gap-2 hover-elevate">
                    0170 9287722
                  </a>
                </li>
                <li>
                  <a href="mailto:info@entranceinharmony.de" className="text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center gap-2 hover-elevate">
                    info@entranceinharmony.de
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-6 text-primary">Navigation</h4>
              <ul className="space-y-3 text-base">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-primary transition-colors duration-300 inline-block hover-elevate" data-testid="footer-link-home">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/leistungen" className="text-muted-foreground hover:text-primary transition-colors duration-300 inline-block hover-elevate" data-testid="footer-link-gesicht">
                    Gesichtsbehandlungen
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="text-muted-foreground hover:text-primary transition-colors duration-300 inline-block hover-elevate" data-testid="footer-link-ueber">
                    Über mich
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-right">
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-6 text-primary">Social Media</h4>
              <div className="flex gap-4 justify-center md:justify-end">
                <a
                  href="https://wa.me/491709287722"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover-elevate active-elevate-2"
                  data-testid="footer-button-whatsapp"
                >
                  <SiWhatsapp className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/entranceinharmony"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover-elevate active-elevate-2"
                  data-testid="footer-button-instagram"
                >
                  <SiInstagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="relative mb-8">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <span>© 2025</span>
              <span className="text-primary">Entrance in Harmony</span>
              <span>· Alle Rechte vorbehalten</span>
            </p>
            <div className="flex gap-8">
              <Link href="/impressum" className="hover:text-primary transition-colors duration-300 hover-elevate" data-testid="footer-link-impressum">
                Impressum
              </Link>
              <Link href="/datenschutz" className="hover:text-primary transition-colors duration-300 hover-elevate" data-testid="footer-link-datenschutz">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
