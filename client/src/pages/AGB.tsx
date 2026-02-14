import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ShieldCheck } from "lucide-react";
import WaveDivider from "@/components/WaveDivider";
import heroImage from "@assets/optimized/stock_images/impressum-datenschutz-agb-rechtliches.webp";

export default function AGB() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="AGB – Allgemeine Geschäftsbedingungen | Entrance in Harmony"
        description="Allgemeine Geschäftsbedingungen für Behandlungen, Gutscheine und Produkte von Entrance in Harmony in Burbach."
        path="/agb"
        noindex={true}
        structuredData={breadcrumbSchema([
          { name: "Startseite", url: "/" },
          { name: "AGB", url: "/agb" }
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
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-white font-medium text-xs tracking-wide uppercase">Geschäftsbedingungen</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light mb-4 text-white drop-shadow-2xl fade-up tracking-wide" style={{ animationDelay: "0.4s", opacity: 0 }} data-testid="heading-agb">
            Allgemeine Geschäftsbedingungen
          </h1>
          
          <div className="h-0.5 w-24 mx-auto mb-4 gold-shimmer rounded-full fade-up" style={{ animationDelay: "0.6s", opacity: 0 }}></div>

          <p className="text-base md:text-lg text-white/90 drop-shadow-lg font-light max-w-xl mx-auto fade-up" style={{ animationDelay: "0.8s", opacity: 0 }}>
            Gültig für alle Leistungen und Produkte
          </p>
        </div>

        <WaveDivider position="bottom" color="hsl(var(--background))" />
      </section>

      <section className="py-16 md:py-20 bg-background flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">1. Geltungsbereich</h2>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über kosmetische Behandlungen, 
                      den Verkauf von Pflegeprodukten (Cremes, Seren etc.) sowie Gutscheinen, die zwischen Elena Hartstein, 
                      Entrance in Harmony, Höhfeld 5, 57299 Burbach (nachfolgend „Anbieter") und dem Kunden (nachfolgend „Kunde") 
                      über die Website www.entranceinharmony.de oder vor Ort geschlossen werden.
                    </p>
                    <p className="mt-2">
                      Der Anbieter ist Kleinunternehmer im Sinne von § 19 UStG und weist auf Rechnungen keine Umsatzsteuer aus.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">2. Vertragsschluss</h2>
                  
                  <h3 className="font-medium text-base mb-2 mt-4">2.1 Behandlungstermine</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Die Terminvereinbarung erfolgt telefonisch, per E-Mail, WhatsApp oder über die Website. Der Vertrag kommt 
                      mit der Bestätigung des Termins durch den Anbieter zustande.
                    </p>
                    <p className="mt-2">
                      Der Kunde verpflichtet sich, bei Verhinderung den Termin mindestens 24 Stunden vorher abzusagen. Bei 
                      kurzfristiger Absage (weniger als 24 Stunden) oder Nichterscheinen können 50% des Behandlungspreises 
                      als Ausfallgebühr berechnet werden.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">2.2 Produktbestellungen und Gutscheine</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Die Darstellung der Produkte und Gutscheine auf der Website stellt kein rechtlich bindendes Angebot dar, 
                      sondern eine unverbindliche Aufforderung zur Bestellung.
                    </p>
                    <p className="mt-2">
                      Mit der Bestellung gibt der Kunde ein verbindliches Angebot ab. Der Vertrag kommt zustande, wenn der 
                      Anbieter die Bestellung durch eine Auftragsbestätigung per E-Mail annimmt oder die Ware versendet bzw. 
                      zur Abholung bereitstellt.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">3. Behandlungsumfang und Pflichten</h2>
                  
                  <h3 className="font-medium text-base mb-2 mt-4">3.1 Behandlungsablauf</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Vor jeder Behandlung findet eine kostenlose Hautanalyse und Beratung statt. Der Kunde ist verpflichtet, 
                      alle für die Behandlung relevanten gesundheitlichen Informationen (Allergien, Hauterkrankungen, 
                      Medikamenteneinnahme etc.) anzugeben.
                    </p>
                    <p className="mt-2">
                      Der Anbieter behält sich vor, Behandlungen bei medizinischen Kontraindikationen abzulehnen oder 
                      abzubrechen. In diesem Fall wird bereits gezahltes Entgelt zurückerstattet.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">3.2 Produktverkauf</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Der Anbieter verkauft hochwertige Pflegeprodukte (Cremes, Seren, Reinigungsprodukte etc.). Alle 
                      angebotenen Produkte sind originalverpackt und von namhaften Herstellern.
                    </p>
                    <p className="mt-2">
                      Die Produktbeschreibungen und Inhaltsstoffangaben entsprechen den Herstellerangaben. Der Kunde wird 
                      vor dem Kauf über mögliche Allergene und Anwendungshinweise informiert.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">3.3 Gutscheinarten</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>Der Anbieter bietet zwei Arten von Gutscheinen an:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>
                        <span className="font-medium text-foreground">Wertgutscheine:</span> Gutscheine mit frei wählbarem 
                        Betrag, der für alle Behandlungen und Produkte eingelöst werden kann.
                      </li>
                      <li>
                        <span className="font-medium text-foreground">Behandlungsgutscheine:</span> Gutscheine für eine 
                        bestimmte Behandlung mit festem Wert entsprechend dem aktuellen Preis der Behandlung.
                      </li>
                    </ul>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">3.4 Lieferung</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p className="font-medium text-foreground">Gutscheine:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Versand per Post (Versandgebühr: 2,90 €) oder</li>
                      <li>Kostenlose Abholung im Studio nach Terminvereinbarung</li>
                    </ul>
                    <p className="mt-3 font-medium text-foreground">Produkte:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Versand per Post (Versandkosten nach Gewicht, mindestens 4,90 €) oder</li>
                      <li>Kostenlose Abholung im Studio</li>
                    </ul>
                    <p className="mt-3">
                      Die Lieferung erfolgt innerhalb von 3-5 Werktagen nach Zahlungseingang.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">4. Preise und Zahlung</h2>
                  
                  <h3 className="font-medium text-base mb-2 mt-4">4.1 Preise</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Alle angegebenen Preise sind Endpreise. Gemäß § 19 UStG wird keine Umsatzsteuer berechnet und ausgewiesen.
                    </p>
                    <p className="mt-2">
                      Bei Versand fallen zusätzliche Versandkosten an (Gutscheine: 2,90 €, Produkte: ab 4,90 € je nach Gewicht).
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">4.2 Zahlungsmethoden</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p className="font-medium text-foreground">Online-Bestellungen (Gutscheine und Produkte):</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Kreditkarte (Visa, Mastercard, American Express) über Stripe</li>
                      <li>Weitere Zahlungsmethoden je nach Aktivierung (SEPA, giropay etc.)</li>
                    </ul>
                    
                    <p className="font-medium text-foreground mt-3">Behandlungen vor Ort:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Barzahlung</li>
                      <li>EC-Karte</li>
                      <li>Vorauszahlung per Überweisung (bei Terminvereinbarung)</li>
                    </ul>

                    <p className="mt-3">
                      Online bestellte Gutscheine und Produkte werden erst nach vollständigem Zahlungseingang versendet 
                      bzw. zur Abholung bereitgestellt.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">5. Gewährleistung und Reklamationen</h2>
                  
                  <h3 className="font-medium text-base mb-2 mt-4">5.1 Behandlungen</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Der Anbieter führt alle Behandlungen mit größter Sorgfalt und nach aktuellem Stand der Kosmetik durch. 
                      Bei Unzufriedenheit mit dem Behandlungsergebnis wird um sofortige Mitteilung gebeten, um eine Lösung 
                      zu finden.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">5.2 Produkte</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Für Produkte gelten die gesetzlichen Gewährleistungsrechte. Bei Mängeln kann der Kunde zunächst 
                      Nacherfüllung (Nachbesserung oder Ersatzlieferung) verlangen.
                    </p>
                    <p className="mt-2">
                      Beanstandungen sind unverzüglich nach Erhalt der Ware, spätestens innerhalb von 14 Tagen, mitzuteilen. 
                      Bei berechtigten Reklamationen werden Produkte kostenfrei ersetzt oder der Kaufpreis erstattet.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">6. Einlösung von Gutscheinen</h2>
                  
                  <h3 className="font-medium text-base mb-2 mt-4">6.1 Gültigkeit</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Gutscheine sind ab Ausstellungsdatum 3 Jahre gültig. Eine Verlängerung der Gültigkeit ist ausgeschlossen.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">6.2 Einlösung</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Gutscheine können für alle Behandlungen und Produkte des Anbieters eingelöst werden. Die Einlösung 
                      für Behandlungen erfolgt nach vorheriger Terminvereinbarung.
                    </p>
                    <p className="mt-2">
                      Bei Behandlungsgutscheinen gilt: Sollte sich der Preis der Behandlung nach Ausstellung des Gutscheins 
                      ändern, behält der Gutschein seinen ursprünglichen Wert. Eine Nachzahlung bei Preiserhöhung entfällt.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">6.3 Teileinlösung und Restguthaben</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Gutscheine können teilweise eingelöst werden. Ein verbleibendes Restguthaben bleibt bis zum Ablauf 
                      der Gültigkeit bestehen.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">6.4 Keine Barauszahlung</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Eine Barauszahlung von Gutscheinen oder Restguthaben ist ausgeschlossen.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">7. Widerrufsrecht für Verbraucher</h2>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Verbraucher haben bei Fernabsatzgeschäften (Online-Käufen) ein 14-tägiges Widerrufsrecht. 
                      Detaillierte Informationen zum Widerrufsrecht finden Sie in unserer{" "}
                      <a href="/widerruf" className="text-primary hover:underline">
                        Widerrufsbelehrung
                      </a>
                      .
                    </p>
                    <p className="mt-2">
                      <span className="font-medium text-foreground">Wichtig:</span> Das Widerrufsrecht erlischt bei 
                      Dienstleistungen (Behandlungen), wenn diese mit ausdrücklicher Zustimmung des Kunden vor Ablauf 
                      der Widerrufsfrist vollständig erbracht wurden.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">8. Haftung</h2>
                  
                  <h3 className="font-medium text-base mb-2 mt-4">8.1 Haftungsbeschränkung</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Der Verkäufer haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der 
                      Gesundheit, die auf einer vorsätzlichen oder fahrlässigen Pflichtverletzung beruhen, sowie für Schäden, 
                      die von der Haftung nach dem Produkthaftungsgesetz umfasst werden.
                    </p>
                    <p className="mt-2">
                      Für sonstige Schäden haftet der Verkäufer nur bei Verletzung wesentlicher Vertragspflichten, deren 
                      Erfüllung die ordnungsgemäße Durchführung des Vertrages überhaupt erst ermöglicht und auf deren 
                      Einhaltung der Käufer regelmäßig vertrauen darf. Die Haftung ist in diesem Fall auf den vertragstypischen, 
                      vorhersehbaren Schaden begrenzt.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">7.2 Verlust des Gutscheins</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Der Verkäufer übernimmt keine Haftung für verlorene, gestohlene oder beschädigte Gutscheine. Ein 
                      Ersatz wird nur nach Kulanz und gegen eine Bearbeitungsgebühr ausgestellt.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">9. Online-Streitbeilegung</h2>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                      <a 
                        href="https://ec.europa.eu/consumers/odr/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        https://ec.europa.eu/consumers/odr/
                      </a>
                      .
                    </p>
                    <p className="mt-2">
                      Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                      Verbraucherschlichtungsstelle teilzunehmen.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">10. Datenschutz</h2>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer{" "}
                      <a href="/datenschutz" className="text-primary hover:underline">
                        Datenschutzerklärung
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">11. Schlussbestimmungen</h2>
                  
                  <h3 className="font-medium text-base mb-2 mt-4">11.1 Anwendbares Recht</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">11.2 Salvatorische Klausel</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der 
                      übrigen Bestimmungen hiervon unberührt.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            </ScrollReveal>

            <p className="text-sm text-muted-foreground mt-6 text-center">
              Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
