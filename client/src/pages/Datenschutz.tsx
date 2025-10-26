import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";
import WaveDivider from "@/components/WaveDivider";
import heroImage from "@assets/stock_images/professional_legal_d_a8468a57.jpg";

export default function Datenschutz() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>

        <div className="relative z-10 container mx-auto px-4 text-center pt-44 pb-20">
          <div className="fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glassmorphism mb-6 border border-white/30">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-white font-medium text-xs tracking-wide uppercase">Datenschutz & Sicherheit</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light mb-4 text-white drop-shadow-2xl fade-up tracking-wide" style={{ animationDelay: "0.4s", opacity: 0 }} data-testid="heading-datenschutz">
            Datenschutzerklärung
          </h1>
          
          <div className="h-0.5 w-24 mx-auto mb-4 gold-shimmer rounded-full fade-up" style={{ animationDelay: "0.6s", opacity: 0 }}></div>

          <p className="text-base md:text-lg text-white/90 drop-shadow-lg font-light max-w-xl mx-auto fade-up" style={{ animationDelay: "0.8s", opacity: 0 }}>
            Ihr Datenschutz ist uns wichtig
          </p>
          
          <div className="mt-6 fade-up" style={{ animationDelay: "1s", opacity: 0 }}>
            <Badge variant="outline" className="bg-white/10 text-white border-white/30 backdrop-blur-sm">
              Stand: 26.10.2025
            </Badge>
          </div>
        </div>

        <WaveDivider position="bottom" color="hsl(var(--background))" />
      </section>

      <section className="py-16 md:py-20 bg-background flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            
            {/* Section 1: Datenschutz auf einen Blick */}
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">1. Datenschutz auf einen Blick</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Die folgenden Hinweise geben einen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                  </p>
                  <p className="font-medium text-foreground">Datenerfassung auf dieser Website</p>
                  <p>
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten entnehmen Sie dem Abschnitt „Verantwortliche Stelle".
                  </p>
                  <p>
                    Ein Teil der Daten wird erhoben, weil Sie uns diese mitteilen (z. B. über das Kontaktformular). Andere Daten werden automatisch beim Besuch der Website erfasst (z. B. technische Daten, IP-Adresse).
                  </p>
                  <p>
                    Ein Teil der Daten dient der technischen Bereitstellung, andere ggf. zur Analyse Ihres Nutzerverhaltens oder zur Abwicklung von Bestellungen. Sie haben jederzeit Rechte wie Auskunft, Löschung, Einschränkung oder Widerspruch. Wenden Sie sich dazu an die im Impressum genannte Adresse.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Verantwortliche Stelle */}
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">2. Verantwortliche Stelle</h2>
                <div className="text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">Entrance in Harmony</p>
                  <p>Elena Hartstein</p>
                  <p>Höhfeld 5</p>
                  <p>57299 Burbach</p>
                  <p>Deutschland</p>
                  <p className="mt-2">
                    Telefon:{" "}
                    <a href="tel:+491709287722" className="hover:text-foreground" data-testid="link-phone">0170 9287722</a>
                  </p>
                  <p>
                    E-Mail:{" "}
                    <a href="mailto:info@entranceinharmony.de" className="hover:text-foreground" data-testid="link-email">info@entranceinharmony.de</a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Hosting über Replit (USA) */}
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">3. Hosting über Replit (USA)</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Diese Website wird bei Replit Inc., 767 Bryant St, Suite 210, San Francisco, CA 94107, USA gehostet. Beim Aufruf der Website werden personenbezogene Daten wie IP-Adressen verarbeitet.
                  </p>
                  <p>
                    Datenübermittlungen in die USA erfolgen auf Basis der EU-Standardvertragsklauseln gem. Art. 46 Abs. 2 lit. c DSGVO. Zusätzliche Schutzmaßnahmen wie Verschlüsselung werden eingesetzt.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 4: Kontaktformular und E-Mail */}
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">4. Kontaktformular und E-Mail</h2>
                <div className="text-muted-foreground">
                  <p>
                    Wenn Sie uns per Formular oder E-Mail kontaktieren, verarbeiten wir Ihre Angaben zur Beantwortung Ihrer Anfrage. Rechtsgrundlagen sind Art. 6 Abs. 1 lit. b und f DSGVO. Ihre Daten werden gelöscht, sobald der Zweck entfällt oder auf Wunsch.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 5: Bestellungen und Buchungen */}
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">5. Bestellungen und Buchungen</h2>
                <div className="text-muted-foreground">
                  <p>
                    Bei Gutscheinbestellungen, Produktkäufen oder Terminbuchungen verarbeiten wir Ihre personenbezogenen Daten zur Vertragsabwicklung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Gesundheitsbezogene Daten bei Behandlungen werden nach Art. 9 Abs. 2 lit. h DSGVO verarbeitet und sicher gespeichert.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 6: Zahlungsanbieter Stripe */}
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">6. Zahlungsanbieter Stripe</h2>
                <div className="text-muted-foreground">
                  <p>
                    Zahlungen erfolgen über Stripe Payments Europe Ltd., Dublin, Irland. Stripe kann Daten in die USA übertragen. Dies geschieht auf Basis der Standardvertragsklauseln sowie der Teilnahme am EU-US Data Privacy Framework. Weitere Infos:{" "}
                    <a 
                      href="https://stripe.com/de/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      data-testid="link-stripe-privacy"
                    >
                      https://stripe.com/de/privacy
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 7: Cookies */}
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">7. Cookies</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Diese Website verwendet ausschließlich technisch notwendige Cookies. Sie dienen der Funktionalität und Sicherheit der Website und werden nicht zur Analyse verwendet.
                  </p>
                  <p>
                    Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 8: Ihre Rechte */}
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">8. Ihre Rechte</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>Sie haben jederzeit das Recht auf:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Auskunft nach Art. 15 DSGVO</li>
                    <li>Berichtigung nach Art. 16 DSGVO</li>
                    <li>Löschung nach Art. 17 DSGVO</li>
                    <li>Einschränkung der Verarbeitung nach Art. 18 DSGVO</li>
                    <li>Datenübertragbarkeit nach Art. 20 DSGVO</li>
                    <li>Widerspruch nach Art. 21 DSGVO</li>
                  </ul>
                  <p>
                    Zudem besteht ein Beschwerderecht bei der zuständigen Aufsichtsbehörde.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 9: Externe Dienste */}
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">9. Externe Dienste</h2>
                <div className="text-muted-foreground">
                  <p>
                    Beim Klicken auf WhatsApp- oder Instagram-Links werden Sie zu den jeweiligen Diensten weitergeleitet. Es gelten deren Datenschutzbestimmungen. Verantwortlich ist Meta Platforms Ireland Ltd., Dublin, Irland.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 10: Sicherheit */}
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">10. Sicherheit</h2>
                <div className="text-muted-foreground">
                  <p>
                    Diese Website verwendet SSL- bzw. TLS-Verschlüsselung zur sicheren Übertragung Ihrer Daten. Bitte achten Sie auf die verschlüsselte Verbindung in der Adresszeile des Browsers (https und Schloss-Symbol).
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 11: Änderungen dieser Datenschutzerklärung */}
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">11. Änderungen dieser Datenschutzerklärung</h2>
                <div className="text-muted-foreground">
                  <p>
                    Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen umzusetzen.
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
