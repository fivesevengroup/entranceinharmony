import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock } from "lucide-react";
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
        </div>

        <WaveDivider position="bottom" color="hsl(var(--background))" />
      </section>

      <section className="py-16 md:py-20 bg-background flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">1. Datenschutz auf einen Blick</h2>
                  
                  <h3 className="font-medium text-base mb-2 mt-4">Allgemeine Hinweise</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
                      passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
                      persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen 
                      Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">Datenerfassung auf dieser Website</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p className="font-medium text-foreground">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</p>
                    <p>
                      Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
                      können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
                    </p>

                    <p className="font-medium text-foreground mt-3">Wie erfassen wir Ihre Daten?</p>
                    <p>
                      Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. 
                      um Daten handeln, die Sie in ein Kontaktformular oder beim Kauf eines Gutscheins eingeben.
                    </p>
                    <p className="mt-2">
                      Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere 
                      IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder 
                      Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
                    </p>

                    <p className="font-medium text-foreground mt-3">Wofür nutzen wir Ihre Daten?</p>
                    <p>
                      Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. 
                      Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Beim Kauf von Gutscheinen 
                      werden Ihre Daten zur Abwicklung der Bestellung und Zahlung verwendet.
                    </p>

                    <p className="font-medium text-foreground mt-3">Welche Rechte haben Sie bezüglich Ihrer Daten?</p>
                    <p>
                      Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer 
                      gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung 
                      oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt 
                      haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das 
                      Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten 
                      zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                    </p>
                    <p className="mt-2">
                      Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">2. Hosting</h2>
                  
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
                    </p>
                    
                    <h3 className="font-medium text-foreground mt-4">Strato</h3>
                    <p>
                      Anbieter ist die Strato AG, Pascalstraße 10, 10587 Berlin, Deutschland (nachfolgend „Strato").
                    </p>
                    <p className="mt-2">
                      Wenn Sie unsere Website besuchen, erfasst Strato verschiedene Logfiles inklusive Ihrer IP-Adressen. 
                      Details entnehmen Sie der Datenschutzerklärung von Strato:{" "}
                      <a 
                        href="https://www.strato.de/datenschutz/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        https://www.strato.de/datenschutz/
                      </a>
                      .
                    </p>
                    <p className="mt-2">
                      Die Verwendung von Strato erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein 
                      berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine 
                      entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage 
                      von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG, soweit die Einwilligung die Speicherung von 
                      Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) 
                      im Sinne des TTDSG umfasst.
                    </p>
                    <p className="mt-2">
                      Da Strato ein deutscher Anbieter ist, erfolgt die Datenverarbeitung innerhalb der Europäischen Union 
                      und unterliegt den strengen Anforderungen der DSGVO.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">3. Allgemeine Hinweise und Pflicht­informationen</h2>
                  
                  <h3 className="font-medium text-base mb-2 mt-4">Datenschutz</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln 
                      Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften 
                      sowie dieser Datenschutzerklärung.
                    </p>
                    <p className="mt-2">
                      Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene 
                      Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung 
                      erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
                    </p>
                    <p className="mt-2">
                      Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) 
                      Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">Hinweis zur verantwortlichen Stelle</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                    <div className="mt-2 space-y-1">
                      <p className="font-medium text-foreground">Entrance in Harmony</p>
                      <p>Elena Hartstein</p>
                      <p>Höhfeld 5</p>
                      <p>57299 Burbach</p>
                      <p>Deutschland</p>
                      <p className="mt-2">
                        Telefon:{" "}
                        <a href="tel:+491709287722" className="hover:text-foreground">0170 9287722</a>
                      </p>
                      <p>
                        E-Mail:{" "}
                        <a href="mailto:info@entranceinharmony.de" className="hover:text-foreground">info@entranceinharmony.de</a>
                      </p>
                    </div>
                    <p className="mt-2">
                      Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen 
                      über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">Speicherdauer</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben 
                      Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein 
                      berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, 
                      werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung 
                      Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im 
                      letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können 
                      eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf 
                      erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer 
                      Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes 
                      oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger 
                      verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
                    </p>
                    <p className="mt-2">
                      Für Nordrhein-Westfalen ist die zuständige Aufsichtsbehörde:
                    </p>
                    <div className="mt-2 space-y-1">
                      <p className="font-medium text-foreground">Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen</p>
                      <p>Kavalleriestraße 2-4</p>
                      <p>40213 Düsseldorf</p>
                      <p className="mt-1">
                        Telefon: 0211/38424-0
                      </p>
                      <p>
                        E-Mail: poststelle@ldi.nrw.de
                      </p>
                      <p>
                        Website:{" "}
                        <a 
                          href="https://www.ldi.nrw.de/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          https://www.ldi.nrw.de/
                        </a>
                      </p>
                    </div>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">Recht auf Datenübertragbarkeit</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags 
                      automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format 
                      aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen 
                      verlangen, erfolgt dies nur, soweit es technisch machbar ist.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">Auskunft, Löschung und Berichtigung</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche 
                      Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck 
                      der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu 
                      weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">Recht auf Einschränkung der Verarbeitung</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. 
                      Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht 
                      in folgenden Fällen:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>
                        Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen 
                        wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die 
                        Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                      </li>
                      <li>
                        Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie 
                        statt der Löschung die Einschränkung der Datenverarbeitung verlangen.
                      </li>
                      <li>
                        Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung 
                        oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die 
                        Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                      </li>
                      <li>
                        Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen 
                        Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen 
                        überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten 
                        zu verlangen.
                      </li>
                    </ul>
                    <p className="mt-2">
                      Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von 
                      ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder 
                      Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen 
                      Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines 
                      Mitgliedstaats verarbeitet werden.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">SSL- bzw. TLS-Verschlüsselung</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum 
                      Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. 
                      TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers 
                      von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                    </p>
                    <p className="mt-2">
                      Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, 
                      nicht von Dritten mitgelesen werden.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">4. Datenerfassung auf dieser Website</h2>
                  
                  <h3 className="font-medium text-base mb-2 mt-4">Server-Log-Dateien</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, 
                      die Ihr Browser automatisch an uns übermittelt. Dies sind:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Browsertyp und Browserversion</li>
                      <li>verwendetes Betriebssystem</li>
                      <li>Referrer URL</li>
                      <li>Hostname des zugreifenden Rechners</li>
                      <li>Uhrzeit der Serveranfrage</li>
                      <li>IP-Adresse</li>
                    </ul>
                    <p className="mt-2">
                      Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
                    </p>
                    <p className="mt-2">
                      Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber 
                      hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner 
                      Website – hierzu müssen die Server-Log-Files erfasst werden.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">Kontaktformular und E-Mail-Kontakt</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben aus dem 
                      Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage 
                      und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre 
                      Einwilligung weiter.
                    </p>
                    <p className="mt-2">
                      Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage 
                      mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen 
                      erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse 
                      an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf 
                      Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
                    </p>
                    <p className="mt-2">
                      Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung 
                      auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt 
                      (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere 
                      Aufbewahrungsfristen – bleiben unberührt.
                    </p>
                  </div>

                  <h3 className="font-medium text-base mb-2 mt-4">Bestellungen und Buchungen</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p className="font-medium text-foreground">Gutschein-Bestellung</p>
                    <p>
                      Wenn Sie einen Gutschein auf unserer Website bestellen, erheben wir folgende personenbezogene Daten:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Name und E-Mail-Adresse des Käufers</li>
                      <li>Name und E-Mail-Adresse/Postadresse des Empfängers</li>
                      <li>Gutscheinbetrag und Liefermethode (digital oder postalisch)</li>
                      <li>Zahlungsinformationen (werden durch Stripe verarbeitet)</li>
                    </ul>

                    <p className="font-medium text-foreground mt-4">Behandlungsbuchungen</p>
                    <p>
                      Wenn Sie eine Behandlung bei uns buchen, erheben wir:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Name, Telefonnummer und E-Mail-Adresse</li>
                      <li>Terminwünsche und gebuchte Behandlungen</li>
                      <li>Gesundheitsbezogene Informationen (z. B. Allergien, Hauttyp) soweit für die Behandlung erforderlich</li>
                      <li>Zahlungsinformationen bei Vorauszahlung</li>
                    </ul>

                    <p className="font-medium text-foreground mt-4">Produktbestellungen</p>
                    <p>
                      Wenn Sie Pflegeprodukte (Cremes, Seren etc.) bei uns bestellen, erheben wir:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Name und Lieferadresse</li>
                      <li>E-Mail-Adresse und Telefonnummer</li>
                      <li>Bestelldetails (Produkte, Mengen, Preise)</li>
                      <li>Zahlungsinformationen (werden durch Stripe verarbeitet)</li>
                    </ul>

                    <p className="mt-4">
                      <span className="font-medium text-foreground">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. b DSGVO 
                      (Vertragserfüllung) sowie Art. 9 Abs. 2 lit. h DSGVO für gesundheitsbezogene Daten bei Behandlungen.
                    </p>
                    <p className="mt-2">
                      <span className="font-medium text-foreground">Speicherdauer:</span> Bestelldaten werden für die Dauer 
                      der gesetzlichen Aufbewahrungspflichten (in der Regel 10 Jahre nach Handels- und Steuerrecht) gespeichert. 
                      Gesundheitsdaten werden nach Abschluss der Behandlung gemäß gesetzlicher Vorgaben aufbewahrt.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">5. Zahlungsanbieter</h2>
                  
                  <h3 className="font-medium text-base mb-2 mt-4">Stripe</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Auf dieser Website bieten wir die Bezahlung via Stripe an. Anbieter dieses Zahlungsdienstes ist für 
                      Kunden in der EU die Stripe Payments Europe Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, 
                      Irland (im Folgenden „Stripe").
                    </p>
                    <p className="mt-2 font-medium text-foreground">
                      Zweck und Rechtsgrundlage
                    </p>
                    <p>
                      Die Verwendung von Stripe dient der sicheren und effizienten Zahlungsabwicklung und entspricht unserem 
                      berechtigten Interesse an einer optimalen Kaufabwicklung (Art. 6 Abs. 1 lit. f DSGVO). Die Weitergabe 
                      Ihrer Daten an Stripe ist zudem für die Vertragserfüllung erforderlich (Art. 6 Abs. 1 lit. b DSGVO).
                    </p>
                    <p className="mt-2 font-medium text-foreground">
                      Übermittelte Daten
                    </p>
                    <p>
                      Bei der Zahlungsabwicklung über Stripe werden folgende Daten an Stripe übermittelt:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Name des Karteninhabers</li>
                      <li>E-Mail-Adresse</li>
                      <li>Gutscheinnummer/Bestellnummer</li>
                      <li>Kreditkarten-/Bankverbindungsdaten</li>
                      <li>Gültigkeit der Kreditkarte</li>
                      <li>Prüfnummer (CVC)</li>
                      <li>Datum, Uhrzeit und Transaktionssumme</li>
                      <li>Anbietername und Standort</li>
                    </ul>
                    <p className="mt-2 font-medium text-foreground">
                      Datenverarbeitung außerhalb der EU
                    </p>
                    <p>
                      Stripe verarbeitet Daten auch in den USA. Stripe ist aktiver Teilnehmer des EU-US Data Privacy Framework 
                      und setzt Standardvertragsklauseln der EU-Kommission ein (Art. 46 DSGVO). Dies gewährleistet einen 
                      angemessenen Schutz Ihrer Daten beim Transfer in die USA.
                    </p>
                    <p className="mt-2">
                      Weitere Informationen zur Zertifizierung finden Sie hier:{" "}
                      <a 
                        href="https://www.dataprivacyframework.gov/s/participant-search/participant-detail?contact=true&id=a2zt0000000TO6hAAG" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Data Privacy Framework
                      </a>
                      .
                    </p>
                    <p className="mt-2 font-medium text-foreground">
                      Speicherdauer
                    </p>
                    <p>
                      Stripe speichert Ihre Daten für die Dauer der Diensterbringung und zur Erfüllung rechtlicher und 
                      behördlicher Verpflichtungen (z. B. Geldwäscheprävention, Betrugsbekämpfung).
                    </p>
                    <p className="mt-2 font-medium text-foreground">
                      Cookies
                    </p>
                    <p>
                      Stripe kann technisch notwendige Cookies setzen, um die Zahlungsabwicklung zu ermöglichen. Diese dienen 
                      ausschließlich der Transaktionssicherheit.
                    </p>
                    <p className="mt-2 font-medium text-foreground">
                      Weitere Informationen
                    </p>
                    <p>
                      Details zur Datenverarbeitung durch Stripe entnehmen Sie der Datenschutzerklärung von Stripe:{" "}
                      <a 
                        href="https://stripe.com/de/privacy" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        https://stripe.com/de/privacy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">6. Cookies und Tracking-Technologien</h2>
                  
                  <h3 className="font-medium text-base mb-2 mt-4">Einsatz von Cookies</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Diese Website verwendet nur technisch notwendige Cookies, die für den Betrieb der Seite und die 
                      Zahlungsabwicklung erforderlich sind. Diese Cookies dienen ausschließlich der Funktionsfähigkeit und 
                      Sicherheit der Website.
                    </p>
                    <p className="mt-2">
                      <span className="font-medium text-foreground">Was sind Cookies?</span> Cookies sind kleine Textdateien, 
                      die auf Ihrem Endgerät gespeichert werden und bestimmte Informationen über Ihre Nutzung der Website enthalten.
                    </p>
                    <p className="mt-2">
                      <span className="font-medium text-foreground">Rechtsgrundlage:</span> Die Verwendung technisch notwendiger 
                      Cookies erfolgt auf Basis von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an funktionsfähiger Website).
                    </p>
                    <p className="mt-2">
                      <span className="font-medium text-foreground">Keine Analyse-Tools:</span> Wir setzen derzeit keine 
                      Analyse-Tools wie Google Analytics, Facebook Pixel oder ähnliche Tracking-Dienste ein.
                    </p>
                    <p className="mt-2">
                      Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und 
                      Cookies nur im Einzelfall erlauben oder die Annahme von Cookies grundsätzlich deaktivieren. Bitte beachten 
                      Sie, dass bei Deaktivierung von Cookies die Funktionalität dieser Website eingeschränkt sein kann.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">7. E-Mail-Kommunikation</h2>
                  
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Wenn Sie uns per E-Mail kontaktieren oder einen Gutschein erwerben, verarbeiten wir Ihre E-Mail-Adresse 
                      und weitere von Ihnen mitgeteilte Daten zur Bearbeitung Ihrer Anfrage bzw. zur Zusendung des Gutscheins.
                    </p>
                    <p className="mt-2">
                      <span className="font-medium text-foreground">E-Mail-Provider:</span> Der Versand von E-Mails erfolgt über 
                      unseren E-Mail-Hosting-Provider. Die E-Mail-Kommunikation ist SSL/TLS-verschlüsselt.
                    </p>
                    <p className="mt-2">
                      <span className="font-medium text-foreground">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. b DSGVO 
                      (Vertragserfüllung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Kundenkommunikation).
                    </p>
                    <p className="mt-2">
                      <span className="font-medium text-foreground">Speicherdauer:</span> E-Mails werden bis zur vollständigen 
                      Bearbeitung Ihrer Anfrage bzw. bis zum Ablauf gesetzlicher Aufbewahrungsfristen gespeichert.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">8. Externe Verlinkungen</h2>
                  
                  <div className="text-muted-foreground space-y-2">
                    <h3 className="font-medium text-foreground mb-2">WhatsApp</h3>
                    <p>
                      Diese Website bietet Links zur Kontaktaufnahme über WhatsApp. Wenn Sie auf einen solchen Link klicken, 
                      werden Sie zu WhatsApp weitergeleitet. WhatsApp ist ein Dienst der Meta Platforms Ireland Limited, 
                      4 Grand Canal Square, Dublin 2, Irland.
                    </p>
                    <p className="mt-2">
                      Bitte beachten Sie, dass beim Klick auf einen WhatsApp-Link Ihre Telefonnummer und weitere Daten an 
                      WhatsApp übermittelt werden können. Wir haben keinen Einfluss auf den Umfang der von WhatsApp erhobenen 
                      Daten. Weitere Informationen finden Sie in der Datenschutzerklärung von WhatsApp:{" "}
                      <a 
                        href="https://www.whatsapp.com/legal/privacy-policy" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        https://www.whatsapp.com/legal/privacy-policy
                      </a>
                      .
                    </p>

                    <h3 className="font-medium text-foreground mb-2 mt-4">Instagram</h3>
                    <p>
                      Auf dieser Website sind Links zu unserem Instagram-Profil eingebunden. Instagram ist ein Dienst der 
                      Meta Platforms Ireland Limited, 4 Grand Canal Square, Dublin 2, Irland.
                    </p>
                    <p className="mt-2">
                      Wenn Sie auf den Instagram-Link klicken, werden Sie zu unserem Instagram-Profil weitergeleitet. Dabei 
                      können Daten an Instagram übermittelt werden. Weitere Informationen zur Datenverarbeitung durch Instagram 
                      finden Sie in der Datenschutzerklärung von Instagram:{" "}
                      <a 
                        href="https://help.instagram.com/519522125107875" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        https://help.instagram.com/519522125107875
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">9. Änderungen dieser Datenschutzerklärung</h2>
                  
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen 
                      Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, 
                      z. B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

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
