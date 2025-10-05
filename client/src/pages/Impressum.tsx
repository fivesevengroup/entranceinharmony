import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function Impressum() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="py-16 md:py-24 bg-background flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-8" data-testid="heading-impressum">
              Impressum
            </h1>

            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">Angaben gemäß § 5 TMG</h2>
                  <div className="space-y-1 text-muted-foreground">
                    <p className="font-medium text-foreground">Entrance in Harmony</p>
                    <p>Elena Hartstein</p>
                    <p>[STRASSE UND HAUSNUMMER]</p>
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
                  <h2 className="font-medium text-lg mb-3">Umsatzsteuer-ID</h2>
                  <div className="text-muted-foreground">
                    <p>
                      Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
                    </p>
                    <p className="mt-1">[FALLS VORHANDEN: DE123456789]</p>
                    <p className="text-sm mt-2 italic">
                      Falls nicht vorhanden (Kleinunternehmerregelung § 19 UStG): "Als Kleinunternehmer im Sinne von § 19 Abs. 1 UStG wird keine Umsatzsteuer berechnet."
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-medium text-lg mb-3">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
                  <div className="space-y-1 text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">Berufsbezeichnung:</span> Kosmetikerin
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Zuständige Kammer:</span> [FALLS MITGLIED EINER KAMMER]
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Verliehen in:</span> Deutschland
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-medium text-lg mb-3">Redaktionell verantwortlich</h2>
                  <div className="text-muted-foreground">
                    <p>Elena Hartstein</p>
                    <p>[STRASSE UND HAUSNUMMER]</p>
                    <p>57299 Burbach</p>
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
                      .
                    </p>
                    <p className="mt-2">
                      Unsere E-Mail-Adresse finden Sie oben im Impressum.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-medium text-lg mb-3">Verbraucher­streit­beilegung/Universal­schlichtungs­stelle</h2>
                  <div className="text-muted-foreground">
                    <p>
                      Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                      Verbraucherschlichtungsstelle teilzunehmen.
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
