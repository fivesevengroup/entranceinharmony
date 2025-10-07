import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sparkles, Star, Heart, LifeBuoy, MessageCircle } from "lucide-react";
import WaveDivider from "@/components/WaveDivider";
import deepCleansingImage from "@assets/generated_images/Deep_cleansing_facial_treatment_8a24d580.png";
import basicTreatmentImage from "@assets/generated_images/Basic_facial_treatment_630e122c.png";
import carboxyImage from "@assets/generated_images/Carboxy_therapy_facial_979c25d2.png";
import bbGlowImage from "@assets/generated_images/BB_Glow_treatment_1852d70a.png";
import microneedlingImage from "@assets/generated_images/Microneedling_facial_treatment_0da7c603.png";
import btoxImage from "@assets/generated_images/B-Tox_peel_treatment_ba217e96.png";
import peelingImage from "@assets/generated_images/Revitalizing_peel_treatment_2f08d057.png";
import laserImage from "@assets/generated_images/Red_Touch_laser_with_goggles_86dab14d.png";
import heroImage from "@assets/stock_images/professional_beauty__01deee28.jpg";

interface Treatment {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  details: string[];
  price: string;
  image: string;
}

const treatments: Treatment[] = [
  {
    id: "tiefenreinigung",
    title: "Tiefenreinigung",
    shortDescription: "Intensive Reinigung für porentief saubere Haut",
    description: "Reinigung, Peeling, Tiefreinigungsmaske, Ausreinigung (Entfernung von störenden Hautunreinheiten wie Milien und Komedonen), beruhigende Maske und abschließende Pflege",
    details: [
      "Gründliche Reinigung",
      "Enzymatisches Peeling",
      "Tiefreinigungsmaske",
      "Professionelle Ausreinigung",
      "Beruhigende Abschlussmaske",
      "Pflegende Abschlusspflege"
    ],
    price: "85€",
    image: deepCleansingImage
  },
  {
    id: "basisbehandlung",
    title: "Basisbehandlung",
    shortDescription: "Die perfekte Grundpflege für Ihre Haut",
    description: "Reinigung, Peeling, Maske, Abschlusspflege & Dekolleté",
    details: [
      "Sanfte Reinigung",
      "Peeling für glatte Haut",
      "Pflegende Gesichtsmaske",
      "Dekolleté-Behandlung inklusive",
      "Abschließende Pflege"
    ],
    price: "80€",
    image: basicTreatmentImage
  },
  {
    id: "carboxy",
    title: "Carboxy Therapie",
    shortDescription: "CO2-Therapie für strahlende Haut",
    description: "3-Phasen-Reinigung, Carboxy-Maske, Abschlusspflege",
    details: [
      "3-Phasen-Reinigungssystem",
      "Innovative Carboxy-Maske mit CO2",
      "Verbesserte Durchblutung",
      "Straffende Wirkung",
      "Intensive Abschlusspflege"
    ],
    price: "80€",
    image: carboxyImage
  },
  {
    id: "bbglow",
    title: "BB Glow Skin",
    shortDescription: "Makellose Haut mit natürlichem Glow-Effekt",
    description: "Reinigung, Needling mit BB Glow Skin Ampulle, Abschlusspflege",
    details: [
      "Professionelle Hautvorbereitung",
      "Micro-Needling Behandlung",
      "BB Glow Wirkstoffampulle",
      "Ebenmäßiger Teint",
      "Natürlicher Glow-Effekt",
      "Lang anhaltende Wirkung"
    ],
    price: "95€",
    image: bbGlowImage
  },
  {
    id: "microneedling",
    title: "Microneedling",
    shortDescription: "Hauterneuerung durch Kollagenstimulation",
    description: "Reinigung, Peeling, Needling mit Wirkstoffkonzentrat, Maske & LED-Lichttherapie, Abschlusspflege",
    details: [
      "Gründliche Reinigung und Peeling",
      "Professionelles Microneedling",
      "Hochkonzentrierte Wirkstoffe",
      "LED-Lichttherapie",
      "Beruhigende Maske",
      "Intensive Abschlusspflege"
    ],
    price: "100€",
    image: microneedlingImage
  },
  {
    id: "btox",
    title: "B-Tox-Peel",
    shortDescription: "Anti-Aging ohne Nadel",
    description: "Reinigung, Peeling, Maske, Wirkstoffampulle",
    details: [
      "Sanfte Reinigung",
      "Spezielles B-Tox Peeling",
      "Glättende Maske",
      "Hochdosierte Wirkstoffampulle",
      "Botox-ähnlicher Effekt",
      "Keine Nadeln erforderlich"
    ],
    price: "90€",
    image: btoxImage
  },
  {
    id: "peeling",
    title: "Vitalisierende Peelings",
    shortDescription: "Peach Peel oder Bio-RePeel",
    description: "Reinigung, Peeling, Abschlusspflege",
    details: [
      "Gründliche Reinigung",
      "Wahl zwischen Peach Peel und Bio-RePeel",
      "Hautbildverfeinernd",
      "Regenerierend",
      "Strahlender Teint",
      "Pflegende Abschlusspflege"
    ],
    price: "80€",
    image: peelingImage
  },
  {
    id: "laser",
    title: "Red Touch Pro Laser",
    shortDescription: "Professionelle Laser-Hautverjüngung",
    description: "Hautverjüngung, Beseitigung von Hauterschlaffung, Wiederherstellung der Hautelastizität, Narbenverbesserung, Kollagenstimulation, Verbesserung von Dehnungsstreifen, Glättung von Aknenarben, Porenverfeinerung",
    details: [
      "Hautverjüngung und Straffung",
      "Verbesserung der Hautelastizität",
      "Narbenbehandlung",
      "Kollagenstimulation",
      "Verbesserung von Dehnungsstreifen",
      "Aknenarben-Behandlung",
      "Porenverfeinerung"
    ],
    price: "ab 100€",
    image: laserImage
  }
];

export default function Services() {
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleLearnMore = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section with Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glassmorphism mb-8 border-2 border-white/30 gold-glow">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-white font-medium text-sm tracking-wide uppercase">Professionelle Treatments</span>
            </div>
          </div>

          <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl font-light mb-6 text-white drop-shadow-2xl fade-up tracking-wide" style={{ animationDelay: "0.4s", opacity: 0 }} data-testid="heading-services">
            Unsere Behandlungen
          </h1>
          
          <div className="h-0.5 w-32 mx-auto mb-8 gold-shimmer rounded-full fade-up" style={{ animationDelay: "0.6s", opacity: 0 }}></div>

          <p className="text-xl md:text-3xl mb-6 text-white/95 drop-shadow-lg font-light max-w-2xl mx-auto fade-up" style={{ animationDelay: "0.8s", opacity: 0 }}>
            Professionelle Beauty-Behandlungen
          </p>
          <p className="text-lg md:text-xl mb-12 text-white/90 drop-shadow-lg font-light max-w-3xl mx-auto fade-up leading-relaxed" style={{ animationDelay: "1s", opacity: 0 }}>
            Ob individuelle Gesichtsbehandlungen, Microneedling, BB Glow oder Laserbehandlung – wir bieten Ihnen die optimale Leistung rund um eine gesunde und schöne Haut.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center fade-up" style={{ animationDelay: "1.2s", opacity: 0 }}>
            <Button
              size="lg"
              variant="ghost"
              className="text-sm px-12 py-6 bg-white/5 backdrop-blur text-white/90 border border-white/20 hover:bg-white/10 hover:border-white/30 font-serif uppercase tracking-widest transition-all duration-300"
              asChild
              data-testid="button-termin-services"
            >
              <a href="https://wa.me/491709287722" target="_blank" rel="noopener noreferrer">
                Jetzt Termin buchen
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-sm px-12 py-6 text-white/80 border border-white/15 hover:bg-white/5 hover:border-white/25 font-serif uppercase tracking-widest transition-all duration-300"
              asChild
            >
              <a href="/preisliste">Preise ansehen</a>
            </Button>
          </div>
        </div>

        <WaveDivider position="bottom" color="hsl(var(--background))" />
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {treatments.map((treatment) => (
              <Card 
                key={treatment.id} 
                className="overflow-hidden hover-elevate transition-all"
                data-testid={`card-treatment-${treatment.id}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-2xl font-light mb-2" data-testid={`text-treatment-title-${treatment.id}`}>
                    {treatment.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {treatment.shortDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-primary" data-testid={`text-price-${treatment.id}`}>
                      {treatment.price}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs uppercase tracking-wider font-serif text-muted-foreground hover:text-primary border border-border/50 hover:border-primary/30"
                      onClick={() => handleLearnMore(treatment)}
                      data-testid={`button-learn-more-${treatment.id}`}
                    >
                      Mehr erfahren
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Spezielle Beratungs-Kachel */}
            <Card 
              className="overflow-hidden relative border-2 border-primary/30 hover-elevate transition-all"
              data-testid="card-consultation"
            >
              <div className="absolute top-6 right-6 z-10">
                <div className="p-2 bg-primary/20 rounded-full">
                  <LifeBuoy className="w-6 h-6 text-primary" />
                </div>
              </div>
              
              <CardContent className="p-6 flex flex-col justify-between h-full min-h-[320px] bg-gradient-to-br from-primary/5 via-background to-primary/10">
                <div className="flex-1 pr-12">
                  <div className="mb-3">
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 mb-4">
                      Individuelle Beratung
                    </Badge>
                  </div>
                  
                  <h3 className="font-serif text-2xl font-light mb-3" data-testid="text-consultation-title">
                    Unsicher, welche Behandlung passt?
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    Wir beraten Sie gerne persönlich und finden gemeinsam die perfekte Behandlung für Ihre individuellen Bedürfnisse.
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Persönliche Hautanalyse</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Heart className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Maßgeschneiderte Empfehlung</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    asChild
                  >
                    <a 
                      href="https://wa.me/491709287722?text=Hallo,%20ich%20bin%20unsicher%20welche%20Behandlung%20zu%20mir%20passt%20und%20hätte%20gerne%20eine%20individuelle%20Beratung." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                      data-testid="button-consultation-whatsapp"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Jetzt beraten lassen</span>
                    </a>
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    Kostenlose Beratung per WhatsApp oder Telefon
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center bg-muted/50 py-12 px-6 rounded-lg max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl font-light mb-4">
              Sie wünschen einen Termin?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Genießen Sie unsere vielfältigen Behandlungsmöglichkeiten und buchen Sie jetzt 
              Ihren persönlichen Termin für eine professionelle Behandlung.
            </p>
            <Button
              size="lg"
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white border-[#25BA5A]"
              asChild
              data-testid="button-termin-vereinbaren"
            >
              <a href="https://wa.me/491709287722" target="_blank" rel="noopener noreferrer">
                Jetzt Termin vereinbaren
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedTreatment && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-3xl font-light">
                  {selectedTreatment.title}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {selectedTreatment.shortDescription}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={selectedTreatment.image}
                    alt={selectedTreatment.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-3">Behandlungsablauf</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedTreatment.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-lg mb-3">Was Sie erwartet</h3>
                  <ul className="space-y-2">
                    {selectedTreatment.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedTreatment.id === "laser" ? (
                  <div className="pt-4 border-t space-y-4">
                    <div>
                      <h3 className="font-medium text-lg mb-4">Preisübersicht</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                          <span className="text-muted-foreground">Gesicht</span>
                          <span className="font-medium text-primary text-lg">300€</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                          <span className="text-muted-foreground">Gesicht + Hals</span>
                          <span className="font-medium text-primary text-lg">350€</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                          <span className="text-muted-foreground">Gesicht + Hals + Dekolleté</span>
                          <span className="font-medium text-primary text-lg">350€</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                          <span className="text-muted-foreground">Hände (Handrücken)</span>
                          <span className="font-medium text-primary text-lg">100€</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                          <span className="text-muted-foreground">Hände + Arme bis zum Ellbogen</span>
                          <span className="font-medium text-primary text-lg">350€</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                          <span className="text-muted-foreground">Oberarme (vom Ellbogen bis zur Schulter)</span>
                          <span className="font-medium text-primary text-lg">350€</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        size="lg"
                        className="bg-[#25D366] hover:bg-[#20BA5A] text-white border-[#20BA5A]"
                        asChild
                      >
                        <a href="https://wa.me/491709287722" target="_blank" rel="noopener noreferrer">
                          Termin buchen
                        </a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Preis</p>
                      <p className="text-2xl font-medium text-primary">
                        {selectedTreatment.price}
                      </p>
                    </div>
                    <Button
                      size="lg"
                      className="bg-[#25D366] hover:bg-[#20BA5A] text-white border-[#20BA5A]"
                      asChild
                    >
                      <a href="https://wa.me/491709287722" target="_blank" rel="noopener noreferrer">
                        Termin buchen
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
