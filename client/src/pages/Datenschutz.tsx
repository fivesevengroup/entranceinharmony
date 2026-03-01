import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";
import WaveDivider from "@/components/WaveDivider";
import heroImage from "@assets/optimized/stock_images/impressum-datenschutz-agb-rechtliches.webp";

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

      <section className="relative overflow-hidden" style={{ minHeight: 'calc(100svh + 80px)' }}>
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>

        <div className="relative z-10 container mx-auto px-4 text-center pt-44 pb-32">
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
              Stand: 01.03.2026
            </Badge>
          </div>
        </div>

        <WaveDivider position="bottom" color="hsl(var(--background))" />
      </section>

      <section className="py-16 md:py-20 bg-background flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            
            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">1. Allgemeine Hinweise</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und Zweck der Verarbeitung personenbezogener Daten beim Besuch unserer Website <strong>www.entranceinharmony.de</strong>. Personenbezogene Daten sind alle Informationen, mit denen Sie persönlich identifiziert werden können.
                  </p>
                  <p>
                    Verantwortlich für die Datenverarbeitung auf dieser Website ist die unter Abschnitt 2 genannte Stelle. Die Nutzung unserer Website ist grundsätzlich ohne Angabe personenbezogener Daten möglich.
                  </p>
                </div>
              </CardContent>
            </Card>
            </ScrollReveal>

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

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">3. Hosting und Infrastruktur</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Unsere Website wird über die Plattform <strong>Replit, Inc.</strong> (350 Bush Street, Suite 800, San Francisco, CA 94104, USA) gehostet und bereitgestellt. Beim Aufruf unserer Website werden automatisch Informationen (sogenannte Server-Logfiles) erhoben, die Ihr Browser automatisch übermittelt. Dazu gehören:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>IP-Adresse des anfragenden Rechners</li>
                    <li>Datum und Uhrzeit des Zugriffs</li>
                    <li>Name und URL der abgerufenen Datei</li>
                    <li>Referrer URL (Seite, von der aus der Zugriff erfolgte)</li>
                    <li>Verwendeter Browser und Betriebssystem</li>
                  </ul>
                  <p>
                    Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der sicheren und effizienten Bereitstellung der Website).
                  </p>
                  <p>
                    <strong>Auftragsverarbeitung (DPA):</strong> Mit Replit besteht ein Auftragsverarbeitungsvertrag (Data Processing Agreement) gemäß Art. 28 DSGVO. Dieser stellt sicher, dass Replit personenbezogene Daten nur nach unserer Weisung und unter Einhaltung der DSGVO verarbeitet.
                  </p>
                  <p>
                    Da Replit seinen Sitz in den USA hat, kann eine Datenübermittlung in die USA stattfinden. Die Übermittlung erfolgt auf Grundlage von Standardvertragsklauseln (SCC) gemäß Art. 46 Abs. 2 lit. c DSGVO sowie unter Berücksichtigung des EU-US Data Privacy Frameworks. Zusätzlich sind technische Schutzmaßnahmen wie SSL/TLS-Verschlüsselung implementiert.
                  </p>
                  <p>
                    Weitere Informationen zum Datenschutz bei Replit:{" "}
                    <a 
                      href="https://replit.com/site/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      data-testid="link-replit-privacy"
                    >
                      https://replit.com/site/privacy
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">4. Google Fonts</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Diese Website nutzt zur einheitlichen Darstellung von Schriftarten sogenannte Google Fonts, bereitgestellt von der Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Irland. Beim Aufruf unserer Website lädt Ihr Browser die benötigten Schriftarten direkt von Google-Servern. Dabei wird Ihre IP-Adresse an Google übermittelt.
                  </p>
                  <p>
                    Es werden die Schriftarten <em>Cormorant Garamond</em>, <em>Inter</em> und <em>Alex Brush</em> verwendet.
                  </p>
                  <p>
                    Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer einheitlichen und ansprechenden Darstellung unserer Website). Google kann Daten in die USA übermitteln. Die Übermittlung erfolgt auf Grundlage des EU-US Data Privacy Frameworks sowie Standardvertragsklauseln (SCC).
                  </p>
                  <p>
                    Weitere Informationen:{" "}
                    <a 
                      href="https://policies.google.com/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      data-testid="link-google-privacy"
                    >
                      https://policies.google.com/privacy
                    </a>
                    {" "}und{" "}
                    <a 
                      href="https://developers.google.com/fonts/faq/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      data-testid="link-google-fonts-faq"
                    >
                      https://developers.google.com/fonts/faq/privacy
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">5. Kontaktaufnahme (E-Mail und WhatsApp)</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Wenn Sie uns per E-Mail oder WhatsApp kontaktieren, speichern und verarbeiten wir Ihre Angaben (z. B. Name, Telefonnummer, E-Mail-Adresse, Nachrichteninhalt) zur Bearbeitung Ihrer Anfrage.
                  </p>
                  <p>
                    Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung Ihrer Anfrage).
                  </p>
                  <p>
                    Ihre Daten werden gelöscht, sobald der Zweck der Speicherung entfällt, es sei denn, gesetzliche Aufbewahrungspflichten bestehen.
                  </p>
                </div>
              </CardContent>
            </Card>
            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">6. Bestellungen und Buchungen</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Für Gutscheinbestellungen, Produktkäufe oder Behandlungsbuchungen verarbeiten wir Name, Kontaktdaten, Zahlungsdaten und ggf. gesundheitsbezogene Angaben (z. B. Allergien, Hautbild).
                  </p>
                  <p>
                    Rechtsgrundlagen: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung), Art. 9 Abs. 2 lit. h DSGVO (Verarbeitung von Gesundheitsdaten im Rahmen der Gesundheitsversorgung).
                  </p>
                  <p>
                    Buchungs- und Bestelldaten werden gemäß handels- und steuerrechtlichen Aufbewahrungspflichten für bis zu 10 Jahre gespeichert (§ 147 AO, § 257 HGB).
                  </p>
                </div>
              </CardContent>
            </Card>
            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">7. Zahlungsdienstleister</h2>
                <div className="text-muted-foreground space-y-3">
                  <p className="font-medium text-foreground">a) Stripe</p>
                  <p>
                    Für Kartenzahlungen und weitere elektronische Zahlungsmethoden nutzen wir Stripe Payments Europe Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin 2, Irland. Bei der Zahlung werden personenbezogene Daten (z. B. Name, Kartennummer, Transaktionsbetrag) direkt an Stripe übermittelt und dort verarbeitet.
                  </p>
                  <p>
                    Stripe kann Daten in die USA übermitteln. Grundlage ist die Teilnahme am EU-US Data Privacy Framework sowie Standardvertragsklauseln (SCC) gemäß Art. 46 Abs. 2 lit. c DSGVO. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
                  </p>
                  <p>
                    Weitere Informationen:{" "}
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
                  <p className="font-medium text-foreground mt-4">b) PayPal</p>
                  <p>
                    Alternativ bieten wir die Zahlung über PayPal (Europe) S.à r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449 Luxembourg an. Bei der Nutzung von PayPal werden Ihre Zahlungsdaten (z. B. Name, E-Mail-Adresse, Zahlungsbetrag) an PayPal übermittelt.
                  </p>
                  <p>
                    PayPal kann Daten in die USA übermitteln. Grundlage ist die Teilnahme am EU-US Data Privacy Framework sowie Standardvertragsklauseln (SCC). Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
                  </p>
                  <p>
                    Weitere Informationen:{" "}
                    <a 
                      href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      data-testid="link-paypal-privacy"
                    >
                      https://www.paypal.com/de/webapps/mpp/ua/privacy-full
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">8. Cookies</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden und bestimmte Informationen enthalten.
                  </p>
                  <p className="font-medium text-foreground">Technisch notwendige Cookies</p>
                  <p>
                    Wir verwenden technisch notwendige Cookies, die für den Betrieb der Website unerlässlich sind (z. B. Speicherung Ihrer Cookie-Einstellungen, Warenkorb-Funktionalität). Diese Cookies werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gesetzt. Eine Einwilligung ist hierfür nicht erforderlich.
                  </p>
                  <p className="font-medium text-foreground">Optionale Cookies</p>
                  <p>
                    Darüber hinaus können optionale Cookies für Analyse- oder Marketingzwecke eingesetzt werden. Diese werden nur mit Ihrer ausdrücklichen Einwilligung gesetzt (Art. 6 Abs. 1 lit. a DSGVO). Sie können Ihre Einwilligung jederzeit über unseren Cookie-Banner widerrufen oder anpassen.
                  </p>
                  <p>
                    Derzeit setzen wir <strong>keine</strong> Analyse- oder Tracking-Cookies ein. Es findet kein Tracking durch Dritte statt.
                  </p>
                </div>
              </CardContent>
            </Card>
            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">9. Externe Links (WhatsApp und Instagram)</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Unsere Website enthält Links zu WhatsApp und Instagram. Beim Anklicken dieser Links werden Sie zu den Plattformen von Meta Platforms Ireland Ltd., Merrion Road, Dublin 4, D04 X2K5, Irland weitergeleitet. Ab diesem Zeitpunkt gilt die Datenschutzerklärung des jeweiligen Anbieters.
                  </p>
                  <p>
                    Dabei können personenbezogene Daten (z. B. Ihre Telefonnummer bei WhatsApp, IP-Adresse, Geräte-Informationen) an Meta übermittelt werden. Meta kann diese Daten in die USA übermitteln (Grundlage: EU-US Data Privacy Framework, SCC).
                  </p>
                  <p>
                    Wir binden keine Social-Media-Plugins oder iframes ein. Es erfolgt keine Datenübertragung an Meta, solange Sie nicht aktiv auf einen Link klicken.
                  </p>
                </div>
              </CardContent>
            </Card>
            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">10. Speicherdauer</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Personenbezogene Daten werden nur solange gespeichert, wie es für den jeweiligen Verarbeitungszweck erforderlich ist:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Kontaktanfragen: Löschung nach Abschluss der Bearbeitung, sofern keine gesetzlichen Aufbewahrungspflichten bestehen</li>
                    <li>Bestelldaten und Rechnungen: 10 Jahre (steuer- und handelsrechtliche Aufbewahrungspflicht)</li>
                    <li>Server-Logfiles: Maximal 30 Tage</li>
                    <li>Cookie-Einstellungen: Bis zum Widerruf oder Löschung durch den Nutzer</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">11. Ihre Rechte nach der DSGVO</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Auskunftsrecht</strong> (Art. 15 DSGVO) – Sie können Auskunft über Ihre bei uns gespeicherten Daten verlangen.</li>
                    <li><strong>Berichtigungsrecht</strong> (Art. 16 DSGVO) – Sie können die Korrektur unrichtiger Daten verlangen.</li>
                    <li><strong>Löschungsrecht</strong> (Art. 17 DSGVO) – Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzliche Aufbewahrungspflicht besteht.</li>
                    <li><strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO) – Sie können eine Einschränkung der Datenverarbeitung verlangen.</li>
                    <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO) – Sie können Ihre Daten in einem maschinenlesbaren Format erhalten.</li>
                    <li><strong>Widerspruchsrecht</strong> (Art. 21 DSGVO) – Sie können der Verarbeitung Ihrer Daten widersprechen.</li>
                    <li><strong>Widerruf der Einwilligung</strong> (Art. 7 Abs. 3 DSGVO) – Eine erteilte Einwilligung können Sie jederzeit für die Zukunft widerrufen.</li>
                  </ul>
                  <p>
                    Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
                    <a href="mailto:info@entranceinharmony.de" className="text-primary hover:underline" data-testid="link-email-rights">info@entranceinharmony.de</a>
                  </p>
                  <p>
                    Darüber hinaus haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Die für uns zuständige Aufsichtsbehörde ist:
                  </p>
                  <div className="pl-4 border-l-2 border-muted">
                    <p>Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen</p>
                    <p>Postfach 20 04 44, 40102 Düsseldorf</p>
                    <p>
                      <a 
                        href="https://www.ldi.nrw.de" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                        data-testid="link-ldi-nrw"
                      >
                        www.ldi.nrw.de
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">12. Datensicherheit</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung zur sicheren Übertragung Ihrer Daten. Eine verschlüsselte Verbindung erkennen Sie an der Adresszeile des Browsers („https://") und dem Schloss-Symbol.
                  </p>
                  <p>
                    Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
                  </p>
                </div>
              </CardContent>
            </Card>
            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-4">
                <h2 className="font-medium text-lg mb-3">13. Änderungen dieser Datenschutzerklärung</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Wir behalten uns vor, diese Datenschutzerklärung bei Änderungen unserer Leistungen, technischen Gegebenheiten oder rechtlichen Vorgaben anzupassen. Es gilt jeweils die zum Zeitpunkt Ihres Besuchs auf dieser Seite abrufbare Version.
                  </p>
                  <p>
                    Letzte Aktualisierung: 01. März 2026
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
