import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";
import { SiInstagram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Eye, Award } from "lucide-react";
import WaveDivider from "@/components/WaveDivider";
import beforeAfterImage from "@assets/optimized/generated_images/vorher-nachher-hautverbesserung-ergebnis.webp";
import facialImage from "@assets/optimized/generated_images/gesichtsbehandlung-nahaufnahme-hautpflege-glow.webp";
import massageImage from "@assets/optimized/generated_images/massage-entspannung-gesichtspflege-wellness.webp";
import heroImage from "@assets/optimized/stock_images/kosmetikstudio-innenraum-beauty-salon-burbach.webp";

export default function Gallery() {
  const galleryImages = [
    { src: beforeAfterImage, alt: "Vorher Nachher Gesichtsbehandlung Hautverbesserung Ergebnis", category: "facial" },
    { src: facialImage, alt: "Professionelle Gesichtspflege Hautbild Akne Pickel Behandlung", category: "facial" },
    { src: massageImage, alt: "Entspannende Gesichtsmassage Wellness Hautpflege", category: "body" },
    { src: beforeAfterImage, alt: "Behandlungsergebnis Hautverjüngung Anti-Aging Kosmetik", category: "facial" },
    { src: facialImage, alt: "Anti-Aging Gesichtsbehandlung Faltenreduktion Hautstraffung", category: "facial" },
    { src: massageImage, alt: "Gesichtsbehandlung Massage Entspannung Kosmetikstudio Burbach", category: "body" },
    { src: beforeAfterImage, alt: "Hautpflege Ergebnis Pigmentflecken Rosacea Behandlung", category: "facial" },
    { src: facialImage, alt: "Hydra Facial Gesichtsbehandlung Glow Hautbild Verbesserung", category: "facial" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section with Background */}
      <section className="relative overflow-hidden" style={{ minHeight: 'calc(100svh + 80px)' }}>
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>

        <div className="relative z-10 container mx-auto px-4 text-center pt-44 pb-32">
          <div className="fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glassmorphism mb-8 border-2 border-white/30 gold-glow">
              <Camera className="w-5 h-5 text-primary" />
              <span className="text-white font-medium text-sm tracking-wide uppercase">Vorher-Nachher Galerie</span>
            </div>
          </div>

          <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl font-light mb-6 text-white drop-shadow-2xl fade-up tracking-wide" style={{ animationDelay: "0.4s", opacity: 0 }}>
            Galerie
          </h1>
          
          <div className="h-0.5 w-32 mx-auto mb-8 gold-shimmer rounded-full fade-up" style={{ animationDelay: "0.6s", opacity: 0 }}></div>

          <p className="text-xl md:text-3xl mb-6 text-white/95 drop-shadow-lg font-light max-w-2xl mx-auto fade-up" style={{ animationDelay: "0.8s", opacity: 0 }}>
            Sichtbare Ergebnisse
          </p>
          <p className="text-lg md:text-xl mb-16 text-white/90 drop-shadow-lg font-light max-w-3xl mx-auto fade-up leading-relaxed" style={{ animationDelay: "1s", opacity: 0 }}>
            Entdecken Sie unsere Behandlungsergebnisse und lassen Sie sich von echten Transformationen inspirieren
          </p>

          <div className="flex flex-wrap justify-center gap-6 fade-up" style={{ animationDelay: "1.2s", opacity: 0 }}>
            <Badge variant="secondary" className="glassmorphism border-2 border-white/20 text-white px-5 py-3 text-sm font-medium">
              <Eye className="w-4 h-4 mr-2 text-primary" />
              Authentische Ergebnisse
            </Badge>
            <Badge variant="secondary" className="glassmorphism border-2 border-white/20 text-white px-5 py-3 text-sm font-medium">
              <Award className="w-4 h-4 mr-2 text-primary" />
              Professionelle Dokumentation
            </Badge>
          </div>
        </div>

        <WaveDivider position="bottom" color="hsl(var(--section-accent))" />
      </section>

      <section className="py-16 md:py-20 bg-section-accent relative">
        <div className="container mx-auto px-4">

          <div className="mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-light mb-8 text-center">
              Vorher-Nachher Galerie
            </h2>
            <GalleryGrid images={galleryImages} />
          </div>
        </div>
        <WaveDivider position="bottom" color="hsl(var(--background))" />
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <SiInstagram className="h-12 w-12 mx-auto mb-6 text-primary" />
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            Folgen Sie uns auf Instagram
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
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
