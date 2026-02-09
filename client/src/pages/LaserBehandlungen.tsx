import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, MessageCircle, Zap, Shield, Sparkles } from "lucide-react";
import laserImage1 from "@assets/generated_images/Red_Touch_laser_with_goggles_86dab14d.png";
import laserImage2 from "@assets/generated_images/Red_Touch_laser_treatment_4f8328f9.png";
import laserImage3 from "@assets/generated_images/Red_laser_therapy_bf6d9b43.png";
import skinResultImage from "@assets/generated_images/Before_after_skin_treatment_60b501b9.png";

const laserTreatments = [
  {
    id: "gesicht",
    title: "Gesicht",
    description: "Hautverjüngung, Straffung und Kollagenstimulation für ein jugendliches, strahlendes Hautbild.",
    price: "250€",
    image: laserImage1,
  },
  {
    id: "gesicht-hals",
    title: "Gesicht + Hals",
    description: "Erweiterte Behandlung für Gesicht und Hals – für eine nahtlose, gleichmäßige Hautverjüngung.",
    price: "300€",
    image: laserImage2,
  },
  {
    id: "gesicht-hals-dekollete",
    title: "Gesicht + Hals + Dekolleté",
    description: "Die umfassende Premium-Behandlung für Gesicht, Hals und Dekolleté – maximale Ergebnisse.",
    price: "350€",
    image: laserImage3,
  },
  {
    id: "haende",
    title: "Hände (Handrücken)",
    description: "Gezielte Laserbehandlung der Handrücken für glatte, verjüngte Haut.",
    price: "90€",
    image: skinResultImage,
  },
  {
    id: "haende-arme",
    title: "Hände + Arme bis zum Ellbogen",
    description: "Umfassende Behandlung von den Händen bis zum Ellbogen für ein ebenmäßiges Hautbild.",
    price: "350€",
    image: laserImage2,
  },
  {
    id: "oberarme",
    title: "Oberarme (Ellbogen bis Schulter)",
    description: "Straffung und Hautverjüngung der Oberarme vom Ellbogen bis zur Schulter.",
    price: "350€",
    image: laserImage3,
  },
];

const benefits = [
  "Sichtbare Ergebnisse bereits nach der ersten Sitzung",
  "Sanft und angenehm – keine Ausfallzeit",
  "Natürliche Kollagenstimulation von innen heraus",
  "Für Gesicht, Hals, Dekolleté und Hände",
  "Verbesserung von Narben und Dehnungsstreifen",
  "Porenverfeinerung und Hauterneuerung",
];

const indications = [
  { title: "Hautverjüngung", desc: "Straffung erschlaffter, müder Haut" },
  { title: "Narbenverbesserung", desc: "Aknenarben, OP-Narben, Verletzungsnarben" },
  { title: "Kollagenstimulation", desc: "Natürlicher Aufbau von Kollagen und Elastin" },
  { title: "Dehnungsstreifen", desc: "Sichtbare Verbesserung von Schwangerschaftsstreifen" },
  { title: "Porenverfeinerung", desc: "Verkleinerte Poren für ein feines Hautbild" },
  { title: "Hautelastizität", desc: "Wiederherstellung der natürlichen Spannkraft" },
];

export default function LaserBehandlungen() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-laser">
      <Header transparent />

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={laserImage1}
            alt="Red Touch Pro Laserbehandlung"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 bg-primary/20 text-white border-primary/40 px-5 py-2 text-sm">
            <Zap className="w-4 h-4 mr-2" />
            Red Touch Pro&reg; Technologie
          </Badge>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 drop-shadow-lg fade-up" style={{ opacity: 0, animationDelay: "0.3s" }}>
            Laserbehandlungen
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 drop-shadow-md fade-up" style={{ opacity: 0, animationDelay: "0.6s" }}>
            Professionelle Hautverjüngung mit modernster Lasertechnologie – für sichtbar straffere, glattere Haut ohne Ausfallzeit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-up" style={{ opacity: 0, animationDelay: "0.9s" }}>
            <Button
              size="lg"
              className="text-sm px-10 py-6 bg-primary hover:bg-primary/90 text-primary-foreground border-primary font-serif uppercase tracking-widest"
              asChild
              data-testid="button-laser-hero-cta"
            >
              <a href="https://wa.me/491709287722?text=Hallo,%20ich%20interessiere%20mich%20für%20eine%20Laserbehandlung%20mit%20Red%20Touch%20Pro." target="_blank" rel="noopener noreferrer">
                Jetzt Termin vereinbaren
              </a>
            </Button>
          </div>
        </div>

        <WaveDivider position="bottom" color="hsl(var(--background))" />
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
                Was ist Red Touch Pro<sup className="text-xs">&reg;</sup>?
              </h2>
              <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-6"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Red Touch Pro&reg; ist eine innovative Lasertechnologie, die gezielt die natürliche Kollagenproduktion Ihrer Haut anregt. Durch präzise Lichtimpulse werden tiefere Hautschichten stimuliert, wodurch sich Ihre Haut von innen heraus erneuert und sichtbar strafft.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Die Behandlung ist sanft, schmerzarm und erfordert keine Ausfallzeit. Sie können direkt im Anschluss Ihren Alltag fortführen – mit einem frischen, strahlenden Teint.
                </p>
                <ul className="space-y-3">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 shrink-0 w-5 h-5 rounded-full border border-primary/40 flex items-center justify-center bg-primary/10">
                        <Check className="w-3 h-3 text-primary" />
                      </span>
                      <span className="text-sm text-foreground/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <img
                  src={laserImage2}
                  alt="Red Touch Pro Behandlung"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-section-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
              Anwendungsgebiete
            </h2>
            <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Red Touch Pro&reg; eignet sich für vielfältige Hautprobleme und Körperbereiche
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {indications.map((item, i) => (
              <Card key={i} className="text-center" data-testid={`card-indication-${i}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
              Preisübersicht
            </h2>
            <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Wählen Sie die passende Behandlung für Ihren Wunschbereich
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {laserTreatments.map((treatment) => (
              <Card
                key={treatment.id}
                className="overflow-hidden hover-elevate transition-all"
                data-testid={`card-laser-${treatment.id}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-light mb-2" data-testid={`text-laser-title-${treatment.id}`}>
                    {treatment.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {treatment.description}
                  </p>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <span className="text-2xl font-medium text-primary" data-testid={`text-laser-price-${treatment.id}`}>
                      {treatment.price}
                    </span>
                    <Button
                      size="sm"
                      className="text-xs uppercase tracking-wider font-serif"
                      asChild
                      data-testid={`button-laser-book-${treatment.id}`}
                    >
                      <a href={`https://wa.me/491709287722?text=Hallo,%20ich%20möchte%20gerne%20einen%20Termin%20für%20eine%20Laserbehandlung%20(${encodeURIComponent(treatment.title)})%20buchen.`} target="_blank" rel="noopener noreferrer">
                        Termin buchen
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-section-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
                Ablauf Ihrer Behandlung
              </h2>
              <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-6"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-medium mb-2">1. Beratung</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Persönliche Hautanalyse und Besprechung Ihrer Wünsche und Ziele.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-medium mb-2">2. Behandlung</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sanfte Laserimpulse stimulieren Ihre natürliche Kollagenproduktion.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-medium mb-2">3. Ergebnis</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sichtbar straffere Haut – ohne Ausfallzeit, direkt zurück in den Alltag.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center bg-muted/50 py-12 px-6 rounded-lg max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl font-light mb-4">
              Bereit für Ihre Laserbehandlung?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              Vereinbaren Sie jetzt Ihren persönlichen Beratungstermin und erfahren Sie, wie Red Touch Pro&reg; Ihre Haut sichtbar verjüngen kann.
            </p>
            <Button
              size="lg"
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white border-[#25BA5A]"
              asChild
              data-testid="button-laser-cta-bottom"
            >
              <a href="https://wa.me/491709287722?text=Hallo,%20ich%20interessiere%20mich%20für%20eine%20Laserbehandlung%20mit%20Red%20Touch%20Pro." target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Jetzt Termin vereinbaren
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
