import { Link, useLocation } from "wouter";
import { Menu, Phone, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
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
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
      {/* Harmony Arc - Organischer Bogen passend zum Footer */}
      <div className="relative" style={{ position: 'relative' }}>
        {/* Hintergrund-Layer - Immer da, nur Opacity ändert sich */}
        <div 
          className="absolute inset-0 bg-background backdrop-blur-sm shadow-md transition-opacity duration-300 ease-out"
          style={{ opacity: isScrolled ? 0.95 : 0 }}
        />
        
        {/* Hintergrund für bessere Lesbarkeit (nur wenn nicht gescrollt) */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-transparent pointer-events-none transition-opacity duration-300 ease-out"
          style={{ opacity: isScrolled ? 0 : 1 }}
        />
        
        <div className="container mx-auto px-4 relative">
          <div className={`relative transition-all duration-400 ease-out ${
            isScrolled ? 'py-3' : 'pt-6 pb-8'
          }`}>
            {/* Bogen-Linie mit Glow (nur wenn nicht gescrollt) */}
            {!isScrolled && (
              <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 1200 80" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="50%" stopColor="#f4d48f" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <filter id="arcGlow">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
                    </filter>
                  </defs>
                  
                  {/* Subtiler Glow */}
                  <path
                    d="M 0 80 Q 600 0, 1200 80"
                    fill="none"
                    stroke="url(#arcGradient)"
                    strokeWidth="3"
                    opacity="0.5"
                    filter="url(#arcGlow)"
                  />
                  
                  {/* Haupt-Linie */}
                  <path
                    d="M 0 80 Q 600 0, 1200 80"
                    fill="none"
                    stroke="url(#arcGradient)"
                    strokeWidth="1.5"
                    opacity="0.7"
                  />
                </svg>
              </div>
            )}

            {/* Navigation auf dem Bogen angeordnet */}
            <div className="relative flex items-start justify-center">
              {/* Logo zentral */}
              <Link href="/" data-testid="link-home" className={`relative z-20 transition-all duration-500 ${
                isScrolled ? '' : 'mt-2'
              }`}>
                <img 
                  src={logoImage} 
                  alt="Entrance in Harmony" 
                  className={`w-auto transition-all duration-500 ${
                    isScrolled ? 'h-14' : 'h-24'
                  }`}
                  style={{
                    filter: isScrolled 
                      ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                      : 'brightness(0) invert(1) drop-shadow(0 4px 12px rgba(255,255,255,0.3))'
                  }}
                />
              </Link>

              {/* Navigation Items im Bogen */}
              <nav className="hidden lg:flex absolute inset-x-0 top-[35%] -translate-y-1/2 justify-center items-center">
                <div className="flex items-center gap-2 max-w-5xl w-full justify-between px-8">
                  {/* Linke Items */}
                  <div className="flex items-center gap-2">
                    {navLinks.slice(0, 2).map((link, index) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        data-testid={`link-${link.label.toLowerCase()}`}
                      >
                        <div className="relative px-3 py-1.5 transition-all duration-300">
                          <span className={`text-xs font-medium tracking-wide uppercase transition-colors duration-200 ${
                            location === link.href 
                              ? 'text-primary font-semibold' 
                              : isScrolled 
                                ? 'text-foreground/70 hover:text-primary' 
                                : 'text-white/90 hover:text-white'
                          }`}
                          style={{
                            textShadow: !isScrolled ? '0 2px 8px rgba(0,0,0,0.3)' : 'none'
                          }}>
                            {link.label}
                          </span>
                          
                          {/* Gold Dot bei aktivem Link */}
                          {location === link.href && (
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"></div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Platzhalter für Logo in der Mitte */}
                  <div className="w-32"></div>

                  {/* Rechte Items */}
                  <div className="flex items-center gap-2">
                    {navLinks.slice(2).map((link, index) => {
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          data-testid={`link-${link.label.toLowerCase()}`}
                        >
                          <div className="relative px-3 py-1.5 transition-all duration-300">
                            <span className={`text-xs font-medium tracking-wide uppercase transition-colors duration-200 ${
                              location === link.href 
                                ? 'text-primary font-semibold' 
                                : isScrolled 
                                  ? 'text-foreground/70 hover:text-primary' 
                                  : 'text-white/90 hover:text-white'
                            }`}
                            style={{
                              textShadow: !isScrolled ? '0 2px 8px rgba(0,0,0,0.3)' : 'none'
                            }}>
                              {link.label}
                            </span>
                            
                            {/* Gold Dot bei aktivem Link */}
                            {location === link.href && (
                              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"></div>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </nav>

              {/* Mobile Menu Button */}
              <div className="lg:hidden absolute right-4 top-0">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className={isScrolled ? 'text-foreground' : 'text-white'}
                      data-testid="button-mobile-menu"
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  
                  <SheetContent 
                    side="right" 
                    className="w-[320px] sm:w-[360px] border-l-2 border-primary/30 p-0"
                    style={{
                      background: 'linear-gradient(to bottom right, hsl(280, 35%, 92%), hsl(280, 30%, 88%), hsl(280, 35%, 90%))'
                    }}
                  >
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <SheetDescription className="sr-only">Main navigation menu for mobile devices</SheetDescription>
                    
                    <div className="flex flex-col h-full">
                      {/* Logo & Branding */}
                      <div className="px-6 pt-8 pb-6 border-b border-primary/10">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                          <img 
                            src={logoImage} 
                            alt="Entrance in Harmony" 
                            className="h-16 w-auto mx-auto mb-3"
                          />
                        </Link>
                        <p className="text-center font-serif text-sm text-muted-foreground">
                          Beauty & Aesthetics
                        </p>
                      </div>

                      {/* Navigation */}
                      <nav className="flex-1 py-6 px-6">
                        <div className="space-y-1">
                          {navLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div
                                className={`group px-4 py-3 rounded-lg transition-all duration-200 ${
                                  location === link.href
                                    ? 'bg-primary/10 border border-primary/20'
                                    : 'hover-elevate'
                                }`}
                                data-testid={`mobile-link-${link.label.toLowerCase()}`}
                              >
                                <span className={`font-serif text-lg ${
                                  location === link.href
                                    ? 'text-primary font-medium'
                                    : 'text-foreground group-hover:text-primary'
                                }`}>
                                  {link.label}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </nav>

                      {/* Quick Actions */}
                      <div className="p-6 border-t border-primary/10 space-y-3">
                        <a 
                          href="https://wa.me/4927369639191" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block"
                          data-testid="mobile-whatsapp-button"
                        >
                          <Button className="w-full" size="lg">
                            <Phone className="w-4 h-4 mr-2" />
                            Termin vereinbaren
                          </Button>
                        </a>

                        <Link 
                          href="/geschenkgutscheine" 
                          onClick={() => setMobileMenuOpen(false)}
                          className="block"
                        >
                          <Button 
                            variant="outline" 
                            className="w-full border-primary/30"
                            size="lg"
                            data-testid="mobile-voucher-button"
                          >
                            <Gift className="w-4 h-4 mr-2" />
                            Geschenkgutschein
                          </Button>
                        </Link>
                      </div>

                      {/* Gold accent bottom */}
                      <div className="h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>

    </header>
  );
}
