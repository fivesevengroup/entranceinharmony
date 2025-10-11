import { Link } from "wouter";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { Phone } from "lucide-react";
import logoImage from "@assets/Design ohne Titel_1759860744691.png";

export default function Footer() {
  return (
    <footer className="relative bg-section-accent mt-32 md:mt-40">
      {/* Halbrund-Portal - Kompakter Halbkreis-Bogen */}
      <div className="absolute top-0 left-0 right-0 w-full pointer-events-none" style={{ height: '100px', transform: 'translateY(-100%)' }}>
        <svg 
          viewBox="0 0 1200 100" 
          preserveAspectRatio="none" 
          className="absolute bottom-0 w-full h-full"
          style={{ fill: 'hsl(var(--section-accent))' }}
        >
          {/* Kompakter Portal-Bogen */}
          <path d="M0,50 Q600,0 1200,50 L1200,100 L0,100 Z"></path>
        </svg>
        
        {/* Portal-Rahmen für 3D-Effekt */}
        <svg 
          viewBox="0 0 1200 100" 
          preserveAspectRatio="none" 
          className="absolute bottom-0 w-full h-full"
          style={{ fill: 'none', stroke: 'hsl(var(--border))', strokeWidth: '2' }}
        >
          <path d="M0,50 Q600,0 1200,50"></path>
        </svg>
        
        {/* Logo rund - Weißer Kreis mit subtilem Gold-Akzent */}
        <div className="absolute left-1/2 -top-6 -translate-x-1/2 z-10 pointer-events-auto">
          <div className="relative">
            {/* Weißer Kreis mit feinem Gold-Border */}
            <div className="relative bg-white rounded-full p-4 shadow-xl border-2 border-primary/40">
              <img 
                src={logoImage} 
                alt="Entrance in Harmony" 
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
                style={{ filter: 'brightness(0)' }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="pt-6 md:pt-5 pb-10">
          <div className="text-center mb-14">
            <div className="relative inline-block">
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-1 tracking-wide">
                <span className="block text-foreground/90">ENTRANCE IN</span>
                <span className="block text-gold-gradient text-4xl md:text-5xl lg:text-6xl">HARMONY</span>
              </h3>
              <p className="text-xl md:text-2xl font-light text-muted-foreground/60 -mt-1 text-right pr-2" style={{ fontFamily: "'Alex Brush', cursive" }}>
                by Elena Hartstein
              </p>
            </div>
            <div className="h-px w-32 mx-auto mt-3 mb-4 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            <p className="text-sm font-light text-muted-foreground tracking-wide">
              Ihre Beauty-Expertin in Burbach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 max-w-4xl mx-auto">
            <div className="text-center md:text-left">
              <h4 className="font-medium text-sm uppercase tracking-widest mb-6 text-foreground pb-2 border-b border-primary/20 inline-block">Kontakt</h4>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <span className="text-muted-foreground">0170 9287722</span>
                  <div className="flex gap-2">
                    <a 
                      href="tel:+491709287722" 
                      className="p-1.5 rounded-md border border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-200"
                      aria-label="Anrufen"
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href="https://wa.me/491709287722"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md border border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-200"
                      aria-label="WhatsApp"
                    >
                      <SiWhatsapp className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </li>
                <li>
                  <a href="mailto:info@entranceinharmony.de" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    info@entranceinharmony.de
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <h4 className="font-medium text-sm uppercase tracking-widest mb-6 text-foreground pb-2 border-b border-primary/20 inline-block">Navigation</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="footer-link-home">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/leistungen" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="footer-link-leistungen">
                    Behandlungen
                  </Link>
                </li>
                <li>
                  <Link href="/geschenkgutscheine" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="footer-link-gutscheine">
                    Geschenkgutscheine
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="footer-link-kontakt">
                    Kontakt
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-right">
              <h4 className="font-medium text-sm uppercase tracking-widest mb-6 text-foreground pb-2 border-b border-primary/20 inline-block">Folgen Sie uns</h4>
              <div className="flex gap-3 justify-center md:justify-end">
                <a
                  href="https://wa.me/491709287722"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-md border border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-200"
                  data-testid="footer-button-whatsapp"
                >
                  <SiWhatsapp className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com/entranceinharmony"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-md border border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-200"
                  data-testid="footer-button-instagram"
                >
                  <SiInstagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="relative mb-10">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border/50 to-transparent"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p className="font-light">
              © 2025 Entrance in Harmony · Alle Rechte vorbehalten
            </p>
            <div className="flex gap-6 font-light">
              <Link href="/impressum" className="hover:text-foreground transition-colors duration-200" data-testid="footer-link-impressum">
                Impressum
              </Link>
              <Link href="/datenschutz" className="hover:text-foreground transition-colors duration-200" data-testid="footer-link-datenschutz">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
