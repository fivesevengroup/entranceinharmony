import { Link } from "wouter";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import logoImage from "@assets/Logo-PSD_1759668524506.png";

export default function Footer() {
  return (
    <footer className="relative bg-section-accent mt-32 md:mt-40">
      {/* Golden Arc Halo - Goldener Leuchtbogen über dem Logo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: '400px', height: '200px', transform: 'translate(-50%, -100%)' }}>
        {/* Goldener Halo-Bogen mit Glow */}
        <svg 
          viewBox="0 0 400 200" 
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'drop-shadow(0 0 20px rgba(244, 212, 143, 0.6))' }}
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#d4af37', stopOpacity: 0.4 }} />
              <stop offset="50%" style={{ stopColor: '#f4d48f', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#d4af37', stopOpacity: 0.4 }} />
            </linearGradient>
          </defs>
          {/* Halo Arc - dicker goldener Bogen */}
          <path 
            d="M50,180 Q200,20 350,180" 
            fill="none" 
            stroke="url(#goldGradient)" 
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Zusätzlicher innerer Glow */}
        <svg 
          viewBox="0 0 400 200" 
          className="absolute inset-0 w-full h-full opacity-60"
        >
          <path 
            d="M50,180 Q200,20 350,180" 
            fill="none" 
            stroke="#f4d48f" 
            strokeWidth="4"
            strokeLinecap="round"
            style={{ filter: 'blur(8px)' }}
          />
        </svg>
      </div>

      {/* Logo unter dem Halo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-auto" style={{ transform: 'translate(-50%, -70%)' }}>
        <div className="bg-section-accent rounded-full p-4 md:p-5 shadow-xl border-2 border-gold/30">
          <img 
            src={logoImage} 
            alt="Entrance in Harmony" 
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain drop-shadow-lg"
          />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="pt-20 md:pt-16 pb-12">
          <div className="text-center mb-14">
            <h3 className="font-serif text-3xl md:text-4xl font-light text-gold-gradient mb-4">
              Entrance in Harmony
            </h3>
            <div className="h-px w-32 mx-auto mb-4 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            <p className="text-sm font-light text-muted-foreground tracking-wide">
              Ihre Beauty-Expertin in Burbach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 max-w-4xl mx-auto">
            <div className="text-center md:text-left">
              <h4 className="font-medium text-xs uppercase tracking-widest mb-5 text-foreground/60">Kontakt</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="tel:+491709287722" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    0170 9287722
                  </a>
                </li>
                <li>
                  <a href="mailto:info@entranceinharmony.de" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                    info@entranceinharmony.de
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <h4 className="font-medium text-xs uppercase tracking-widest mb-5 text-foreground/60">Navigation</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="footer-link-home">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/leistungen" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="footer-link-gesicht">
                    Gesichtsbehandlungen
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="footer-link-ueber">
                    Über mich
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-right">
              <h4 className="font-medium text-xs uppercase tracking-widest mb-5 text-foreground/60">Folgen Sie uns</h4>
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
