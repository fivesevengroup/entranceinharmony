import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, Shield } from "lucide-react";
import WaveDivider from "@/components/WaveDivider";
import heroImage from "@assets/stock_images/professional_legal_d_a8468a57.jpg";

export default function Impressum() {
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
              <Scale className="w-4 h-4 text-primary" />
              <span className="text-white font-medium text-xs tracking-wide uppercase">Rechtliche Informationen</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light mb-4 text-white drop-shadow-2xl fade-up tracking-wide" style={{ animationDelay: "0.4s", opacity: 0 }} data-testid="heading-impressum">
            Impressum
          </h1>
          
          <div className="h-0.5 w-24 mx-auto mb-4 gold-shimmer rounded-full fade-up" style={{ animationDelay: "0.6s", opacity: 0 }}></div>

          <p className="text-base md:text-lg text-white/90 drop-shadow-lg font-light max-w-xl mx-auto fade-up" style={{ animationDelay: "0.8s", opacity: 0 }}>
            Angaben gemäß § 5 TMG
          </p>
        </div>

        <WaveDivider position="bottom" color="hsl(var(--background))" />
      </section>

      <section className="py-16 md:py-20 bg-background flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">Angaben gemäß § 5 TMG</h2>
                  <div className="space-y-1 text-muted-foreground">
                    <p className="font-medium text-foreground">Entrance in Harmony</p>
                    <p>Elena Hartstein</p>
                    <p>Höhfeld 5</p>
                    <p>57299 Burbach</p>
                    <p>Deutschland</p>
                  </div>
                </div>

                <div>
                  <h2 className="font-medium text-lg mb-3">Kontakt</h2>
                  <div className="space-y-1 text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">Telefon:</span>{" "}
                      <a href="tel:+491709287722" className="hover:text-foreground transition-colors">
                        0170 9287722
                      </a>
                    </p>
                    <p>
                      <span className="font-medium text-foreground">E-Mail:</span>{" "}
                      <a href="mailto:info@entranceinharmony.de" className="hover:text-foreground transition-colors">
                        info@entranceinharmony.de
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-medium text-lg mb-3">Umsatzsteuer-Identifikationsnummer</h2>
                  <div className="text-muted-foreground">
                    <p>
                      Gemäß § 19 UStG (Kleinunternehmerregelung) wird keine Umsatzsteuer ausgewiesen.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-medium text-lg mb-3">EU-Streitschlichtung</h2>
                  <div className="text-muted-foreground">
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
                      .<br />
                      Unsere E-Mail-Adresse finden Sie oben im Impressum.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-medium text-lg mb-3">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
                  <div className="text-muted-foreground">
                    <p>
                      Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="font-medium text-lg mb-3">Haftungsausschluss</h2>
                
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Haftung für Inhalte</h3>
                    <p>
                      Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
                      allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
                      verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen 
                      zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                    </p>
                    <p className="mt-2">
                      Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
                      Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt 
                      der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden 
                      Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-2">Haftung für Links</h3>
                    <p>
                      Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                      Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
                      verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die 
                      verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. 
                      Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                    </p>
                    <p className="mt-2">
                      Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte 
                      einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige 
                      Links umgehend entfernen.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-2">Urheberrecht</h3>
                    <p>
                      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
                      Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
                      Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. 
                      Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                    </p>
                    <p className="mt-2">
                      Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte 
                      Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem 
                      auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei 
                      Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground mt-6 text-center">
              Quelle: Erstellt mit Unterstützung von eRecht24
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
