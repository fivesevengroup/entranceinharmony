import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";
import WaveDivider from "@/components/WaveDivider";
import heroImage from "@assets/stock_images/impressum-datenschutz-agb-rechtliches.jpg";

export default function Datenschutz() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Datenschutzerklärung | Entrance in Harmony – DSGVO-konform"
        description="Datenschutzerklärung von Entrance in Harmony. Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO."
        path="/datenschutz"
        noindex={true}
        structuredData={breadcrumbSchema([
          { name: "Startseite", url: "/" },
          { name: "Datenschutz", url: "/datenschutz" }
        ])}
      />
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
            
            {/* Section 1: Allgemeine Hinweise */}
            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">1. Allgemeine Hinweise</h2>
                <div className="text-muted-foreground">
                  <p>
                    Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und Zweck der Verarbeitung personenbezogener Daten beim Besuch unserer Website. Personenbezogene Daten sind alle Informationen, mit denen Sie persönlich identifiziert werden können.
                  </p>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            {/* Section 2: Verantwortliche Stelle */}
            <ScrollReveal>
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

            </ScrollReveal>

            {/* Section 3: Hosting über Render (EU - Frankfurt) */}
            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">3. Hosting über Render (EU - Frankfurt)</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Unsere Website wird bei Render Services Inc. (Render.com) auf Servern in der Europäischen Union (Frankfurt, Deutschland) gehostet. Dabei werden IP-Adressen und technische Informationen verarbeitet.
                  </p>
                  <p>
                    Die Datenverarbeitung erfolgt ausschließlich in der EU. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). Mit Render besteht ein Auftragsverarbeitungsvertrag (Data Processing Agreement) gemäß Art. 28 DSGVO. Zusätzliche Schutzmaßnahmen wie SSL/TLS-Verschlüsselung und Zugriffsbeschränkungen sind implementiert.
                  </p>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            {/* Section 4: Kontaktformular und E-Mail */}
            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">4. Kontaktformular und E-Mail</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Wenn Sie uns per Kontaktformular oder E-Mail kontaktieren, speichern und verarbeiten wir Ihre Angaben (z. B. Name, E-Mail, Nachricht) zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
                  </p>
                  <p>
                    Ihre Daten werden gelöscht, sobald der Zweck der Speicherung entfällt, es sei denn, gesetzliche Aufbewahrungspflichten bestehen.
                  </p>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            {/* Section 5: Bestellungen und Buchungen */}
            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">5. Bestellungen und Buchungen</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Für Gutscheinbestellungen, Produktkäufe oder Behandlungen verarbeiten wir Name, Kontakt-, Zahlungs- und ggf. Gesundheitsdaten (z. B. Allergien).
                  </p>
                  <p>
                    Rechtsgrundlagen: Art. 6 Abs. 1 lit. b DSGVO (Vertrag), Art. 9 Abs. 2 lit. h DSGVO (Gesundheitsdaten).
                  </p>
                  <p>
                    Daten werden für 10 Jahre gemäß handels- und steuerrechtlicher Vorgaben gespeichert.
                  </p>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            {/* Section 6: Zahlungsdienstleister Stripe */}
            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">6. Zahlungsdienstleister Stripe</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Zahlungen werden über Stripe Payments Europe Ltd., Dublin, Irland abgewickelt. Dabei werden personenbezogene Zahlungsdaten (z. B. Name, Kartendaten, Transaktionsnummer) verarbeitet.
                  </p>
                  <p>
                    Stripe kann Daten in die USA übermitteln. Grundlage ist die Teilnahme am EU-US Data Privacy Framework sowie SCC gemäß Art. 46 DSGVO.
                  </p>
                  <p>
                    Weitere Infos:{" "}
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

            </ScrollReveal>

            {/* Section 7: Cookies */}
            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">7. Cookies</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Diese Website verwendet nur technisch notwendige Cookies zur Gewährleistung der Funktionalität.
                  </p>
                  <p>
                    Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
                  </p>
                  <p>
                    Es findet kein Tracking oder Analyse statt. Eine Einwilligung ist daher nicht erforderlich.
                  </p>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            {/* Section 8: WhatsApp und Instagram */}
            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">8. WhatsApp und Instagram</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Bei Klick auf Links zu WhatsApp oder Instagram werden Sie zu diesen externen Diensten weitergeleitet. Dabei können personenbezogene Daten (z. B. Ihre Telefonnummer, IP-Adresse) verarbeitet werden.
                  </p>
                  <p>
                    Verantwortlich: Meta Platforms Ireland Ltd., Dublin, Irland. Meta kann Daten in die USA übermitteln (DPF/SCC).
                  </p>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            {/* Section 9: Speicherdauer */}
            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">9. Speicherdauer</h2>
                <div className="text-muted-foreground">
                  <p>
                    Personenbezogene Daten werden nur solange gespeichert, wie es für die jeweiligen Verarbeitungszwecke erforderlich ist. Im Falle gesetzlicher Aufbewahrungspflichten erfolgt die Löschung nach deren Ablauf.
                  </p>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            {/* Section 10: Ihre Rechte */}
            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">10. Ihre Rechte</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>Sie haben folgende Rechte:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Auskunft (Art. 15 DSGVO)</li>
                    <li>Berichtigung (Art. 16 DSGVO)</li>
                    <li>Löschung (Art. 17 DSGVO)</li>
                    <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                    <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                    <li>Widerspruch (Art. 21 DSGVO)</li>
                    <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            {/* Section 11: Datensicherheit */}
            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">11. Datensicherheit</h2>
                <div className="text-muted-foreground">
                  <p>
                    Diese Website nutzt SSL- bzw. TLS-Verschlüsselung zur sicheren Übertragung Ihrer Daten. Eine verschlüsselte Verbindung erkennen Sie an der Adresszeile des Browsers („https://" und Schloss-Symbol).
                  </p>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            {/* Section 12: Änderungen dieser Erklärung */}
            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">12. Änderungen dieser Erklärung</h2>
                <div className="text-muted-foreground">
                  <p>
                    Wir behalten uns vor, diese Datenschutzerklärung bei Änderungen unserer Leistungen oder rechtlichen Vorgaben anzupassen. Es gilt jeweils die zum Zeitpunkt Ihres Besuchs abrufbare Version.
                  </p>
                </div>
              </CardContent>
            </Card>
            </ScrollReveal>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
