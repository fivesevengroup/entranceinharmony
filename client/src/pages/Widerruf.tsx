import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, AlertCircle } from "lucide-react";
import WaveDivider from "@/components/WaveDivider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import heroImage from "@assets/optimized/stock_images/impressum-datenschutz-agb-rechtliches.webp";

export default function Widerruf() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Widerrufsbelehrung | Entrance in Harmony"
        description="Widerrufsbelehrung für Gutscheinkäufe und Fernabsatzverträge von Entrance in Harmony, Burbach."
        path="/widerruf"
        noindex={true}
        structuredData={breadcrumbSchema([
          { name: "Startseite", url: "/" },
          { name: "Widerruf", url: "/widerruf" }
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
              <RotateCcw className="w-4 h-4 text-primary" />
              <span className="text-white font-medium text-xs tracking-wide uppercase">Verbraucherrechte</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light mb-4 text-white drop-shadow-2xl fade-up tracking-wide" style={{ animationDelay: "0.4s", opacity: 0 }} data-testid="heading-widerruf">
            Widerrufsbelehrung
          </h1>
          
          <div className="h-0.5 w-24 mx-auto mb-4 gold-shimmer rounded-full fade-up" style={{ animationDelay: "0.6s", opacity: 0 }}></div>

          <p className="text-base md:text-lg text-white/90 drop-shadow-lg font-light max-w-xl mx-auto fade-up" style={{ animationDelay: "0.8s", opacity: 0 }}>
            Ihr Widerrufsrecht bei Online-Käufen
          </p>
        </div>

        <WaveDivider position="bottom" color="hsl(var(--background))" />
      </section>

      <section className="py-16 md:py-20 bg-background flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Verbraucher haben bei Fernabsatzgeschäften (Online-Käufen von Gutscheinen und Produkten) ein gesetzliches 
                Widerrufsrecht von 14 Tagen. Bei Dienstleistungen (Behandlungen) erlischt das Widerrufsrecht bei vollständiger 
                Erbringung mit Ihrer Zustimmung.
              </AlertDescription>
            </Alert>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">Widerrufsrecht</h2>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
                    </p>
                    
                    <h3 className="font-medium text-base mb-2 mt-4 text-foreground">Gutscheine und Produkte (Warenlieferungen)</h3>
                    <p>
                      Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, 
                      der nicht der Beförderer ist, die Ware (Gutschein oder Produkt) in Besitz genommen haben bzw. hat.
                    </p>
                    
                    <h3 className="font-medium text-base mb-2 mt-4 text-foreground">Behandlungen (Dienstleistungen)</h3>
                    <p>
                      Bei Dienstleistungen beträgt die Widerrufsfrist vierzehn Tage ab dem Tag des Vertragsabschlusses. 
                      Das Widerrufsrecht erlischt jedoch vorzeitig, wenn die Dienstleistung vor Ablauf der Widerrufsfrist 
                      vollständig erbracht wurde und Sie ausdrücklich zugestimmt haben, dass wir mit der Ausführung beginnen.
                    </p>
                    <p className="mt-2">
                      Um Ihr Widerrufsrecht auszuüben, müssen Sie uns:
                    </p>
                    <div className="mt-2 pl-4 border-l-2 border-primary/30 space-y-1">
                      <p className="font-medium text-foreground">Entrance in Harmony</p>
                      <p>Elena Hartstein</p>
                      <p>Höhfeld 5</p>
                      <p>57299 Burbach</p>
                      <p className="mt-2">
                        E-Mail: <a href="mailto:info@entranceinharmony.de" className="text-primary hover:underline">info@entranceinharmony.de</a>
                      </p>
                      <p>
                        Telefon: <a href="tel:+491709287722" className="hover:text-foreground">0170 9287722</a>
                      </p>
                    </div>
                    <p className="mt-3">
                      mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder E-Mail) über 
                      Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
                    </p>
                    <p className="mt-2">
                      Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
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
                  <h2 className="font-medium text-lg mb-3">Widerrufsfrist</h2>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des 
                      Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
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
                  <h2 className="font-medium text-lg mb-3">Folgen des Widerrufs</h2>
                  
                  <h3 className="font-medium text-base mb-2 mt-4">Rückzahlung</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, 
                      einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass 
                      Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), 
                      unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über 
                      Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
                    </p>
                    <p className="mt-2">
                      Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion 
                      eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall 
                      werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">Rücksendung bei Gutscheinen</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      <span className="font-medium text-foreground">Wichtig:</span> Bitte senden Sie den Gutschein zurück, 
                      sobald Sie den Widerruf erklärt haben. Der Gutschein muss unbenutzt und unbeschädigt sein.
                    </p>
                    <p className="mt-2">
                      Wir können die Rückzahlung verweigern, bis wir den Gutschein zurückerhalten haben oder bis Sie den 
                      Nachweis erbracht haben, dass Sie den Gutschein zurückgesandt haben, je nachdem, welches der frühere 
                      Zeitpunkt ist.
                    </p>
                    <p className="mt-2">
                      Sie haben den Gutschein unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, 
                      an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu übergeben. 
                      Die Frist ist gewahrt, wenn Sie den Gutschein vor Ablauf der Frist von vierzehn Tagen absenden.
                    </p>
                    <p className="mt-2">
                      Sie tragen die unmittelbaren Kosten der Rücksendung des Gutscheins.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">Rücksendung bei Produkten</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Sie haben die Ware unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, 
                      an dem Sie uns über den Widerruf informieren, an uns zurückzusenden oder zu übergeben. 
                      Die Frist ist gewahrt, wenn Sie die Ware vor Ablauf der Frist von vierzehn Tagen absenden.
                    </p>
                    <p className="mt-2">
                      Sie tragen die unmittelbaren Kosten der Rücksendung. Sie müssen für einen etwaigen Wertverlust der 
                      Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften 
                      und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">Besonderheit bei Dienstleistungen</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Haben Sie verlangt, dass die Dienstleistung (Behandlung) während der Widerrufsfrist beginnen soll, 
                      so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu 
                      dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits 
                      erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen 
                      entspricht.
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
                  <h2 className="font-medium text-lg mb-3">Besondere Hinweise</h2>
                  
                  <h3 className="font-medium text-base mb-2 mt-4">Vorzeitiges Erlöschen des Widerrufsrechts</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p className="font-medium text-foreground">Bei Gutscheinen:</p>
                    <p>
                      Das Widerrufsrecht erlischt vorzeitig, wenn der Gutschein bereits vollständig oder teilweise eingelöst wurde.
                    </p>
                    
                    <p className="font-medium text-foreground mt-3">Bei Dienstleistungen (Behandlungen):</p>
                    <p>
                      Das Widerrufsrecht erlischt, wenn die Dienstleistung vor Ablauf der Widerrufsfrist vollständig erbracht 
                      wurde und Sie ausdrücklich zugestimmt haben, dass wir mit der Ausführung vor Ende der Widerrufsfrist beginnen.
                    </p>

                    <p className="font-medium text-foreground mt-3">Bei versiegelten Waren (Kosmetikprodukte):</p>
                    <p>
                      Das Widerrufsrecht erlischt bei versiegelten Waren, die aus Gründen des Gesundheitsschutzes oder der 
                      Hygiene nicht zur Rückgabe geeignet sind, wenn ihre Versiegelung nach der Lieferung entfernt wurde.
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
                  <h2 className="font-medium text-lg mb-3">Muster-Widerrufsformular</h2>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Wenn Sie den Vertrag widerrufen wollen, können Sie dieses Formular verwenden:
                    </p>
                    
                    <div className="mt-4 p-4 bg-muted/30 rounded-md border border-border space-y-3">
                      <p className="text-sm">
                        An<br />
                        Entrance in Harmony<br />
                        Elena Hartstein<br />
                        Höhfeld 5<br />
                        57299 Burbach<br />
                        E-Mail: info@entranceinharmony.de
                      </p>
                      
                      <p className="text-sm">
                        Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den 
                        Kauf der folgenden Waren (Gutschein/Produkt) (*)/die Erbringung der folgenden Dienstleistung (Behandlung) (*)
                      </p>
                      
                      <p className="text-sm">
                        Bestellt am (*)/erhalten am (*):<br />
                        _______________________________
                      </p>
                      
                      <p className="text-sm">
                        Name des/der Verbraucher(s):<br />
                        _______________________________
                      </p>
                      
                      <p className="text-sm">
                        Anschrift des/der Verbraucher(s):<br />
                        _______________________________<br />
                        _______________________________
                      </p>
                      
                      <p className="text-sm">
                        Datum:<br />
                        _______________________________
                      </p>
                      
                      <p className="text-sm">
                        Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):<br />
                        _______________________________
                      </p>
                      
                      <p className="text-xs italic mt-3">
                        (*) Unzutreffendes streichen.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            </ScrollReveal>

            <ScrollReveal>
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">Kontakt bei Fragen</h2>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Bei Fragen zum Widerrufsrecht oder zur Rücksendung können Sie uns jederzeit kontaktieren:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>
                        E-Mail: <a href="mailto:info@entranceinharmony.de" className="text-primary hover:underline">info@entranceinharmony.de</a>
                      </li>
                      <li>
                        Telefon: <a href="tel:+491709287722" className="hover:text-foreground">0170 9287722</a>
                      </li>
                    </ul>
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
