import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";
import { SiInstagram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import beforeAfterImage from "@assets/generated_images/Before_after_skin_treatment_60b501b9.png";
import facialImage from "@assets/generated_images/Facial_treatment_close-up_d5c55f42.png";
import massageImage from "@assets/generated_images/Massage_therapy_session_569ccb02.png";
import heroImage from "@assets/stock_images/beautiful_woman_radi_21787ffe.jpg";

export default function Gallery() {
  const galleryImages = [
    { src: beforeAfterImage, alt: "Vorher-Nachher Gesichtsbehandlung", category: "facial" },
    { src: facialImage, alt: "Professionelle Gesichtspflege", category: "facial" },
    { src: massageImage, alt: "Entspannende Massage", category: "body" },
    { src: beforeAfterImage, alt: "Behandlungsergebnis", category: "facial" },
    { src: facialImage, alt: "Anti-Aging Behandlung", category: "facial" },
    { src: massageImage, alt: "Hot Stone Massage", category: "body" },
    { src: beforeAfterImage, alt: "Hautpflege Ergebnis", category: "facial" },
    { src: facialImage, alt: "Hydra Facial", category: "facial" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Sculpted Wave Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-section-accent">
        {/* Layered Wave SVGs with parallax effect */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path d="M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z" fill="url(#waveGradient1)" />
          <path d="M0,450 Q300,350 600,450 T1200,450 L1200,800 L0,800 Z" fill="url(#waveGradient2)" />
          <path d="M0,400 Q300,300 600,400 T1200,400" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity="0.3" />
        </svg>

        <div className="relative z-10 container mx-auto px-4 text-center pt-44 pb-20">
          <div className="max-w-4xl mx-auto fade-up">
            <h1 className="font-serif text-5xl md:text-7xl font-light mb-6 text-gold-gradient">
              Galerie
            </h1>
            <div className="h-0.5 w-32 mx-auto mb-8 gold-shimmer rounded-full"></div>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Entdecken Sie unsere Behandlungsergebnisse und lassen Sie sich inspirieren
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">

          <div className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-light mb-8 text-center">
              Vorher-Nachher Galerie
            </h2>
            <GalleryGrid images={galleryImages} />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-accent/30">
        <div className="container mx-auto px-4 text-center">
          <SiInstagram className="h-12 w-12 mx-auto mb-6 text-primary" />
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            Folgen Sie uns auf Instagram
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Bleiben Sie auf dem Laufenden mit unseren neuesten Behandlungen, 
            Beauty-Tipps und exklusiven Angeboten
          </p>
          <Button asChild data-testid="button-instagram">
            <a
              href="https://instagram.com/entranceinharmony"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiInstagram className="mr-2 h-5 w-5" />
              @entranceinharmony
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
