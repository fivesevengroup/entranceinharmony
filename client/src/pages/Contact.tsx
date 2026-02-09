import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock, Award, Heart, Sparkles, User } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import WaveDivider from "@/components/WaveDivider";
import aboutImage from "@assets/kosmetikerin-elena-ueber-mich-portrait.png";
import heroImage from "@assets/kosmetikerin-elena-portrait-kontakt.jpg";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section with Background */}
      <section className="relative min-h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover scale-105"
          style={{ 
            backgroundImage: `url(${heroImage})`, 
            backgroundPosition: 'right 0%'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>

        <div className="relative z-10 container mx-auto px-4 text-center pt-44 pb-20">
          <div className="fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glassmorphism mb-8 border-2 border-white/30 gold-glow">
              <User className="w-5 h-5 text-primary" />
              <span className="text-white font-medium text-sm tracking-wide uppercase">Über mich & Kontakt</span>
            </div>
          </div>

          <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl font-light mb-6 text-white drop-shadow-2xl fade-up tracking-wide" style={{ animationDelay: "0.4s", opacity: 0 }}>
            Elena Hartstein
          </h1>
          
          <div className="h-0.5 w-32 mx-auto mb-8 gold-shimmer rounded-full fade-up" style={{ animationDelay: "0.6s", opacity: 0 }}></div>

          <p className="text-xl md:text-3xl mb-6 text-white/95 drop-shadow-lg font-light max-w-2xl mx-auto fade-up" style={{ animationDelay: "0.8s", opacity: 0 }}>
            Ihre Beauty-Expertin in Burbach und Umgebung
          </p>
          <p className="text-lg md:text-xl mb-12 text-white/90 drop-shadow-lg font-light max-w-3xl mx-auto fade-up leading-relaxed" style={{ animationDelay: "1s", opacity: 0 }}>
            Lernen Sie mich kennen und erfahren Sie mehr über meine Passion für ästhetische Perfektion
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16 fade-up" style={{ animationDelay: "1.2s", opacity: 0 }}>
            <Button
              size="lg"
              variant="ghost"
              className="text-sm px-12 py-6 bg-white/5 backdrop-blur text-white/90 border border-white/20 hover:bg-white/10 hover:border-white/30 font-serif uppercase tracking-widest transition-all duration-300"
              asChild
            >
              <a href="https://wa.me/491709287722" target="_blank" rel="noopener noreferrer">
                Jetzt Kontakt aufnehmen
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-sm px-12 py-6 text-white/80 border border-white/15 hover:bg-white/5 hover:border-white/25 font-serif uppercase tracking-widest transition-all duration-300"
              asChild
            >
              <a href="/gesichtsbehandlungen">Behandlungen ansehen</a>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 fade-up" style={{ animationDelay: "1.4s", opacity: 0 }}>
            <Badge variant="secondary" className="glassmorphism border-2 border-white/20 text-white px-5 py-3 text-sm font-medium">
              <Award className="w-4 h-4 mr-2 text-primary" />
              Zertifizierte Expertin
            </Badge>
            <Badge variant="secondary" className="glassmorphism border-2 border-white/20 text-white px-5 py-3 text-sm font-medium">
              <Heart className="w-4 h-4 mr-2 text-primary" />
              Persönliche Beratung
            </Badge>
            <Badge variant="secondary" className="glassmorphism border-2 border-white/20 text-white px-5 py-3 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              Individuelle Hautanalyse
            </Badge>
          </div>
        </div>

        <WaveDivider position="bottom" color="hsl(var(--background))" />
      </section>

      {/* White Transition Section */}
      <section className="py-12 md:py-16 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
              Persönlich & Professionell
            </h2>
            <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-4"></div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Lernen Sie Ihre Beauty-Expertin kennen und vereinbaren Sie einen Termin
            </p>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-20 md:py-32 bg-section-accent relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 fade-up">
              <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
                Über mich
              </h2>
              <div className="h-0.5 w-32 mx-auto gold-shimmer rounded-full"></div>
            </div>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-border fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-[450px] md:h-auto overflow-visible p-4 pb-0 flex items-end justify-center">
                  <img
                    src={aboutImage}
                    alt="Kosmetikerin Elena Hartstein Gesichtsbehandlung Laserbehandlung Burbach"
                    className="w-auto h-[110%] object-contain object-bottom"
                    style={{
                      filter: 'drop-shadow(0 20px 60px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 40px rgba(212, 175, 55, 0.15))'
                    }}
                  />
                  <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-card/80 pointer-events-none"></div>
                </div>
                <div className="p-10 md:p-14 flex flex-col justify-center bg-gradient-to-br from-card to-card/50 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-card/0 to-transparent pointer-events-none -ml-16"></div>
                  <h3 className="font-serif text-3xl md:text-4xl font-light mb-4">
                    Ihre Schönheitsexpertin in Burbach
                  </h3>
                  <p className="text-xl text-primary font-medium mb-8 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Wo Schönheit auf Expertise trifft
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-5">
                    Mit langjähriger Erfahrung und kontinuierlicher Weiterbildung in der professionellen Kosmetik begleite ich Sie auf Ihrem Weg zu strahlender Haut. Jede Behandlung beginnt mit einer ausführlichen Hautanalyse, denn nur wer Ihre Haut wirklich versteht, kann sie optimal pflegen.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    In meinem modernen Studio vereinen sich Fachwissen, hochwertige Produkte und eine entspannte Wohlfühlatmosphäre – individuell auf Ihre Bedürfnisse abgestimmt, mit Liebe zum Detail und bewährten Techniken kombiniert mit den neuesten Beauty-Innovationen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <WaveDivider position="bottom" color="hsl(var(--background))" />
      </section>

      <section className="py-20 md:py-28 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 fade-up">
              <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
                So erreichen Sie mich
              </h2>
              <div className="h-0.5 w-32 mx-auto gold-shimmer rounded-full" />
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Linke Spalte: Kontaktinformationen */}
              <div className="space-y-8">
                <Card className="border border-border backdrop-blur-sm bg-card/90">
                  <CardContent className="pt-8 pb-8">
                    <div className="space-y-6">
                      {/* Telefon & WhatsApp */}
                      <div className="flex items-start gap-4 pb-6 border-b border-border">
                        <div className="flex gap-2 shrink-0">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <Phone className="w-6 h-6 text-primary" />
                          </div>
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <SiWhatsapp className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-2">Telefon & WhatsApp</h3>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-foreground">0170 9287722</span>
                            <div className="flex gap-2">
                              <a
                                href="tel:+491709287722"
                                className="px-3 py-1 text-xs rounded-md border border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-200"
                                data-testid="link-phone"
                              >
                                Anrufen
                              </a>
                              <a
                                href="https://wa.me/491709287722"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 text-xs rounded-md border border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-200"
                                data-testid="link-whatsapp"
                              >
                                WhatsApp
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* E-Mail */}
                      <div className="flex items-start gap-4 pb-6 border-b border-border">
                        <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-2">E-Mail</h3>
                          <a
                            href="mailto:info@entranceinharmony.de"
                            className="text-foreground hover:text-primary transition-colors break-all"
                            data-testid="link-email"
                          >
                            info@entranceinharmony.de
                          </a>
                        </div>
                      </div>

                      {/* Standort */}
                      <div className="flex items-start gap-4 pb-6 border-b border-border">
                        <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                          <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-2">Standort</h3>
                          <p className="text-muted-foreground">
                            Entrance in Harmony by Elena Hartstein<br />
                            Höhfeld 5<br />
                            57299 Burbach
                          </p>
                        </div>
                      </div>

                      {/* Öffnungszeiten */}
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-2">Öffnungszeiten</h3>
                          <p className="text-foreground">
                            Termin nach Vereinbarung
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Rechte Spalte: Kontaktformular */}
              <div id="kontakt">
                <Card className="border border-border backdrop-blur-sm bg-card/90 h-full">
                  <CardContent className="pt-8">
                    <div className="mb-8">
                      <h3 className="font-serif text-2xl md:text-3xl font-light mb-3">
                        Schreiben Sie mir
                      </h3>
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
        </div>
      </section>

      <Footer />
    </div>
  );
}
