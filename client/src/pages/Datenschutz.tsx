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

            {/* Section 2: Hosting - CORRECTED TO STRATO AG */}
            <Card className="mb-6">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h2 className="font-medium text-lg mb-3">2. Hosting</h2>
                  
                  <div className="text-muted-foreground space-y-2">
                    <p>
                      Diese Website wird über die Plattform <strong className="text-foreground">Strato AG</strong>, Pascalstraße 10, 10587 Berlin, Deutschland gehostet.
                    </p>
                    <p className="mt-2">
                      Beim Aufruf der Website werden personenbezogene Daten wie Ihre IP-Adresse verarbeitet. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherem Websitebetrieb).
                    </p>
                    <p className="mt-2">
                      Da Strato ein deutscher Anbieter ist, erfolgt die Datenverarbeitung innerhalb der Europäischen Union und unterliegt den strengen Anforderungen der DSGVO. Strato verpflichtet sich zur Einhaltung technischer und organisatorischer Maßnahmen (z. B. Verschlüsselung, Zugriffsschutz), um die Datenverarbeitung DSGVO-konform zu gestalten.
                    </p>
                    <p className="mt-2">
                      Weitere Details entnehmen Sie der Datenschutzerklärung von Strato:{" "}
                      <a 
                        href="https://www.strato.de/datenschutz/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                        data-testid="link-strato-privacy"
                      >
                        https://www.strato.de/datenschutz/
                      </a>
                    </p>
                  </div>
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
