import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Award, Heart, Sparkles } from "lucide-react";
import aboutImage from "@assets/KI-Bewerbungsfoto-31117629-4_1759678066113.jpg";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="py-20 md:py-32 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 fade-up">
              <h1 className="font-serif text-5xl md:text-6xl font-light mb-6">
                Elena Hartstein
              </h1>
              <div className="h-0.5 w-32 mx-auto mb-4 bg-border rounded-full"></div>
              <p className="text-xl text-muted-foreground font-light">Ihre Beauty-Expertin in Burbach</p>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-border fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-[450px] md:h-auto overflow-hidden elegant-glow">
                  <img
                    src={aboutImage}
                    alt="Elena Hartstein"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-10 md:p-14 flex flex-col justify-center bg-gradient-to-br from-card to-card/50">
                  <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
                    Ihre Schönheitsexpertin in Burbach
                  </h2>
                  <p className="text-xl text-primary font-medium mb-8 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Wo Schönheit auf Expertise trifft
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    Bei mir steht nicht nur Ihre Schönheit im Mittelpunkt, sondern Ihr gesamtes Wohlbefinden. Mit fundierter Ausbildung, kontinuierlicher Weiterbildung und einer Passion für ästhetische Perfektion begleite ich Sie auf Ihrem Weg zu strahlender Haut.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Jede Behandlung beginnt mit einer ausführlichen Hautanalyse – denn nur wer Ihre Haut wirklich versteht, kann sie optimal pflegen. In meinem modernen Studio vereinen sich Fachwissen, hochwertige Produkte und eine entspannte Wohlfühlatmosphäre.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-br from-muted/20 via-background to-muted/20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 fade-up">
              <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
                So erreichen Sie mich
              </h2>
              <div className="h-0.5 w-32 mx-auto bg-border rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="border border-border hover:border-primary/40 transition-all hover:shadow-2xl backdrop-blur-sm bg-card/90">
                <CardContent className="pt-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Telefon & WhatsApp</h3>
                      <a
                        href="tel:+491709287722"
                        className="text-lg text-primary hover:underline"
                      >
                        0170 9287722
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">E-Mail</h3>
                      <a
                        href="mailto:info@entranceinharmony.de"
                        className="text-primary hover:underline break-all"
                      >
                        info@entranceinharmony.de
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Standort</h3>
                      <p className="text-muted-foreground">
                        Elena Hartstein<br />
                        Beauty & Aesthetics<br />
                        Burbach und Umgebung
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border hover:border-primary/40 transition-all hover:shadow-2xl backdrop-blur-sm bg-card/90">
                <CardContent className="pt-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-4">Öffnungszeiten</h3>
                      <div className="p-6 glassmorphism rounded-lg text-center border border-primary/20">
                        <p className="text-lg font-medium text-primary">
                          Termin nach Vereinbarung
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div id="kontakt" className="max-w-3xl mx-auto fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
              <Card className="border border-border backdrop-blur-sm bg-card/90 shadow-2xl">
                <CardContent className="pt-8">
                  <div className="text-center mb-8">
                    <h2 className="font-serif text-2xl md:text-3xl font-light mb-3">
                      Schreiben Sie mir
                    </h2>
                    <p className="text-muted-foreground">
                      Ich freue mich auf Ihre Nachricht und melde mich schnellstmöglich bei Ihnen
                    </p>
                  </div>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
