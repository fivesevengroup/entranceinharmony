import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import deepCleansingImage from "@assets/generated_images/Deep_cleansing_facial_treatment_8a24d580.png";
import basicTreatmentImage from "@assets/generated_images/Basic_facial_treatment_630e122c.png";
import carboxyImage from "@assets/generated_images/Carboxy_therapy_facial_979c25d2.png";
import bbGlowImage from "@assets/generated_images/BB_Glow_treatment_1852d70a.png";
import microneedlingImage from "@assets/generated_images/Microneedling_facial_treatment_0da7c603.png";
import btoxImage from "@assets/generated_images/B-Tox_peel_treatment_ba217e96.png";
import peelingImage from "@assets/generated_images/Revitalizing_peel_treatment_2f08d057.png";
import laserImage from "@assets/generated_images/Red_laser_therapy_bf6d9b43.png";

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

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-4" data-testid="heading-services">
              Unsere Behandlungen
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Ob individuelle Gesichtsbehandlungen, Microneedling, BB Glow oder Laserbehandlung – 
              wir bieten Ihnen die optimale Leistung rund um eine gesunde und schöne Haut.
            </p>
          </div>

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
                      variant="outline"
                      size="sm"
                      onClick={() => handleLearnMore(treatment)}
                      data-testid={`button-learn-more-${treatment.id}`}
                    >
                      Mehr erfahren
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
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
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
