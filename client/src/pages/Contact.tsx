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

      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Ihre Schönheitsexpertin in Burbach
              </div>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-light mb-6">
              Elena Hartstein
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Wo Schönheit auf Expertise trifft
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" data-testid="button-termin">
                <a href="https://wa.me/491709287722" target="_blank" rel="noopener noreferrer">
                  Jetzt Termin buchen
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" data-testid="button-kontakt">
                <a href="#kontakt">Kontakt aufnehmen</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-card rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-[400px] md:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent z-10" />
                  <img
                    src={aboutImage}
                    alt="Elena Hartstein"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
                    Ihre Beauty-Spezialistin mit Herz
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Bei mir steht nicht nur Ihre Schönheit im Mittelpunkt, sondern Ihr gesamtes Wohlbefinden. Mit fundierter Ausbildung, kontinuierlicher Weiterbildung und einer Passion für ästhetische Perfektion begleite ich Sie auf Ihrem Weg zu strahlender Haut.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Jede Behandlung beginnt mit einer ausführlichen Hautanalyse – denn nur wer Ihre Haut wirklich versteht, kann sie optimal pflegen. In meinem modernen Studio vereinen sich Fachwissen, hochwertige Produkte und eine entspannte Wohlfühlatmosphäre.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <Award className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">Zertifiziert</p>
                    </div>
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <Heart className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">Mit Herz</p>
                    </div>
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">Premium</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
                So erreichen Sie mich
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-2 hover:border-primary/50 transition-colors">
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

              <Card className="border-2 hover:border-primary/50 transition-colors">
                <CardContent className="pt-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-4">Öffnungszeiten</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Montag - Freitag</span>
                          <span className="font-medium">9:00 - 18:00</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Samstag</span>
                          <span className="font-medium">10:00 - 16:00</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Sonntag</span>
                          <span className="font-medium text-muted-foreground">Geschlossen</span>
                        </div>
                      </div>
                      <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                        <p className="text-sm text-center">
                          <strong>Termine nach Vereinbarung</strong><br />
                          <span className="text-muted-foreground">Auch außerhalb der Öffnungszeiten möglich</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div id="kontakt" className="max-w-3xl mx-auto">
              <Card className="border-2">
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
