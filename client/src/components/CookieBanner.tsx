import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 flex justify-center" data-testid="cookie-banner">
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-2xl w-full p-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <p className="text-sm text-muted-foreground flex-1 text-center md:text-left">
            Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. Weitere Informationen finden Sie in unserer{" "}
            <Link href="/datenschutz" className="underline hover:text-foreground">
              Datenschutzerklärung
            </Link>
            .
          </p>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={declineCookies}
              data-testid="button-decline-cookies"
            >
              Ablehnen
            </Button>
            <Button
              size="sm"
              onClick={acceptCookies}
              data-testid="button-accept-cookies"
            >
              Akzeptieren
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
