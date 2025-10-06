import { Link } from "wouter";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, hsl(280 35% 85%) 0%, hsl(280 30% 75%) 50%, hsl(280 35% 85%) 100%)'
    }}>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 20% 80%, hsl(280 40% 70% / 0.4) 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, hsl(280 40% 70% / 0.4) 0%, transparent 50%)`
      }}></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="pt-16 pb-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6" style={{ color: 'hsl(280 30% 25%)' }} />
              <h3 className="font-serif text-3xl font-light" style={{ color: 'hsl(280 30% 25%)' }}>
                Entrance in Harmony
              </h3>
              <Sparkles className="w-6 h-6" style={{ color: 'hsl(280 30% 25%)' }} />
            </div>
            <p className="text-sm font-medium" style={{ color: 'hsl(280 30% 35%)' }}>
              Ihre Beauty-Expertin in Burbach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-sm mb-4" style={{ color: 'hsl(280 30% 25%)' }}>Kontakt</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'hsl(280 30% 35%)' }}>
                <li>
                  <a href="tel:+491709287722" className="hover:opacity-80 transition-opacity">
                    0170 9287722
                  </a>
                </li>
                <li>
                  <a href="mailto:info@entranceinharmony.de" className="hover:opacity-80 transition-opacity">
                    info@entranceinharmony.de
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <h4 className="font-semibold text-sm mb-4" style={{ color: 'hsl(280 30% 25%)' }}>Navigation</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'hsl(280 30% 35%)' }}>
                <li>
                  <Link href="/" className="hover:opacity-80 transition-opacity" data-testid="footer-link-home">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/leistungen" className="hover:opacity-80 transition-opacity" data-testid="footer-link-gesicht">
                    Gesichtsbehandlungen
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="hover:opacity-80 transition-opacity" data-testid="footer-link-ueber">
                    Über mich
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-right">
              <h4 className="font-semibold text-sm mb-4" style={{ color: 'hsl(280 30% 25%)' }}>Social Media</h4>
              <div className="flex gap-4 justify-center md:justify-end">
                <a
                  href="https://wa.me/491709287722"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: 'hsl(280 30% 35%)' }}
                  data-testid="footer-button-whatsapp"
                >
                  <SiWhatsapp className="h-6 w-6" />
                </a>
                <a
                  href="https://instagram.com/entranceinharmony"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: 'hsl(280 30% 35%)' }}
                  data-testid="footer-button-instagram"
                >
                  <SiInstagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="h-px w-full mb-8" style={{
            background: 'linear-gradient(90deg, transparent, hsl(280 30% 25% / 0.3), transparent)'
          }}></div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm" style={{ color: 'hsl(280 30% 40%)' }}>
            <p>© 2025 Entrance in Harmony. Alle Rechte vorbehalten.</p>
            <div className="flex gap-6">
              <Link href="/impressum" className="hover:opacity-80 transition-opacity" data-testid="footer-link-impressum">
                Impressum
              </Link>
              <Link href="/datenschutz" className="hover:opacity-80 transition-opacity" data-testid="footer-link-datenschutz">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
