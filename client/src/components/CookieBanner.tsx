import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Cookie, Settings, Shield, BarChart3, Megaphone, X, ChevronDown, ChevronUp } from "lucide-react";

interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_CONSENT: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
};

interface CookieContextType {
  consent: CookieConsent;
  openSettings: () => void;
}

const CookieContext = createContext<CookieContextType>({
  consent: DEFAULT_CONSENT,
  openSettings: () => {},
});

export function useCookieConsent() {
  return useContext(CookieContext);
}

function getStoredConsent(): CookieConsent | null {
  try {
    const stored = localStorage.getItem("cookie-consent-v2");
    if (stored) return JSON.parse(stored);
    const legacy = localStorage.getItem("cookie-consent");
    if (legacy === "accepted") return { essential: true, analytics: true, marketing: true };
    if (legacy === "declined") return { essential: true, analytics: false, marketing: false };
  } catch {}
  return null;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent>(DEFAULT_CONSENT);
  const [hasStoredConsent, setHasStoredConsent] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setConsent(stored);
      setHasStoredConsent(true);
    } else {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = useCallback((newConsent: CookieConsent) => {
    setConsent(newConsent);
    setHasStoredConsent(true);
    localStorage.setItem("cookie-consent-v2", JSON.stringify(newConsent));
    localStorage.removeItem("cookie-consent");
    setShowBanner(false);
    setShowSettings(false);
  }, []);

  const openSettings = useCallback(() => {
    setShowSettings(true);
    setShowBanner(false);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
    if (!hasStoredConsent) {
      setShowBanner(true);
    }
  }, [hasStoredConsent]);

  return (
    <CookieContext.Provider value={{ consent, openSettings }}>
      {children}
      {showBanner && (
        <CookieBannerUI
          onAcceptAll={() => saveConsent({ essential: true, analytics: true, marketing: true })}
          onDeclineAll={() => saveConsent({ essential: true, analytics: false, marketing: false })}
          onOpenSettings={openSettings}
        />
      )}
      {showSettings && (
        <CookieSettingsModal
          currentConsent={consent}
          onSave={saveConsent}
          onClose={closeSettings}
        />
      )}
    </CookieContext.Provider>
  );
}

function CookieBannerUI({
  onAcceptAll,
  onDeclineAll,
  onOpenSettings,
}: {
  onAcceptAll: () => void;
  onDeclineAll: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 flex justify-center animate-in slide-in-from-bottom-4 duration-500" data-testid="cookie-banner">
      <div className="bg-card/95 backdrop-blur-md border border-border/80 rounded-lg shadow-2xl max-w-xl w-full p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-md bg-primary/10 flex-shrink-0 mt-0.5">
            <Cookie className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-base font-medium mb-1.5">Cookie-Einstellungen</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Wir verwenden essenzielle Cookies für die Grundfunktionen der Website. 
              Optionale Cookies helfen uns, die Website zu verbessern. 
              Weitere Informationen finden Sie in unserer{" "}
              <Link href="/datenschutz" className="underline hover:text-foreground transition-colors">
                Datenschutzerklärung
              </Link>.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenSettings}
            className="text-xs order-3 sm:order-1"
            data-testid="button-cookie-settings"
          >
            <Settings className="h-3.5 w-3.5 mr-1.5" />
            Einstellungen
          </Button>
          <div className="flex gap-2 sm:ml-auto order-1 sm:order-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onDeclineAll}
              className="text-xs flex-1 sm:flex-initial"
              data-testid="button-decline-cookies"
            >
              Nur Essenzielle
            </Button>
            <Button
              size="sm"
              onClick={onAcceptAll}
              className="text-xs flex-1 sm:flex-initial"
              data-testid="button-accept-cookies"
            >
              Alle akzeptieren
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CookieSettingsModal({
  currentConsent,
  onSave,
  onClose,
}: {
  currentConsent: CookieConsent;
  onSave: (consent: CookieConsent) => void;
  onClose: () => void;
}) {
  const [settings, setSettings] = useState<CookieConsent>({ ...currentConsent });
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (cat: string) => {
    setExpandedCategory(expandedCategory === cat ? null : cat);
  };

  const categories = [
    {
      key: "essential" as const,
      label: "Essenzielle Cookies",
      icon: Shield,
      locked: true,
      description: "Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.",
      details: "Speicherung Ihrer Cookie-Einstellungen, Session-Verwaltung, Sicherheitsfunktionen.",
    },
    {
      key: "analytics" as const,
      label: "Analyse & Statistik",
      icon: BarChart3,
      locked: false,
      description: "Helfen uns zu verstehen, wie Besucher unsere Website nutzen, um das Angebot zu verbessern.",
      details: "Anonymisierte Besucherstatistiken, Seitenaufrufe, Verweildauer. Derzeit nicht aktiv.",
    },
    {
      key: "marketing" as const,
      label: "Marketing & Externe Medien",
      icon: Megaphone,
      locked: false,
      description: "Werden für personalisierte Inhalte und die Einbindung externer Dienste verwendet.",
      details: "Google Maps, Social-Media-Einbindungen, personalisierte Empfehlungen. Derzeit nicht aktiv.",
    },
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" data-testid="cookie-settings-modal">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-card border border-border rounded-lg shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-primary/10">
              <Cookie className="h-4 w-4 text-primary" />
            </div>
            <h2 className="font-serif text-lg font-medium">Cookie-Einstellungen</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} data-testid="button-close-cookie-settings">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-5">
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Hier können Sie Ihre Cookie-Präferenzen verwalten. Essenzielle Cookies sind für den Betrieb der Website notwendig 
            und können nicht deaktiviert werden. Weitere Details finden Sie in unserer{" "}
            <Link href="/datenschutz" className="underline hover:text-foreground transition-colors">
              Datenschutzerklärung
            </Link>.
          </p>

          <div className="space-y-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isExpanded = expandedCategory === cat.key;

              return (
                <div key={cat.key} className="border border-border rounded-md overflow-hidden">
                  <div
                    className="flex items-center gap-3 p-3.5 cursor-pointer select-none"
                    onClick={() => toggleCategory(cat.key)}
                    data-testid={`cookie-category-${cat.key}`}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium">{cat.label}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {cat.locked ? (
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium px-2 py-0.5 bg-muted rounded">
                          Immer aktiv
                        </span>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSettings((s) => ({ ...s, [cat.key]: !s[cat.key] }));
                          }}
                          className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                            settings[cat.key] ? "bg-primary" : "bg-muted-foreground/30"
                          }`}
                          data-testid={`toggle-${cat.key}`}
                          aria-label={`${cat.label} ${settings[cat.key] ? "deaktivieren" : "aktivieren"}`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                              settings[cat.key] ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      )}
                      {isExpanded ? (
                        <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-3.5 pb-3.5 pt-0 border-t border-border/50">
                      <p className="text-xs text-muted-foreground leading-relaxed mt-2.5 mb-1.5">{cat.description}</p>
                      <p className="text-[11px] text-muted-foreground/70">{cat.details}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="sticky bottom-0 bg-card/95 backdrop-blur-sm border-t border-border p-4 flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs sm:flex-1"
            onClick={() => onSave({ essential: true, analytics: false, marketing: false })}
            data-testid="button-save-essential-only"
          >
            Nur Essenzielle
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs sm:flex-1"
            onClick={() => onSave(settings)}
            data-testid="button-save-cookie-settings"
          >
            Auswahl speichern
          </Button>
          <Button
            size="sm"
            className="text-xs sm:flex-1"
            onClick={() => onSave({ essential: true, analytics: true, marketing: true })}
            data-testid="button-accept-all-settings"
          >
            Alle akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CookieBannerUI;
