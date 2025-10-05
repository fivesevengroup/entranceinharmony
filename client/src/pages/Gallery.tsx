import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";
import { SiInstagram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import beforeAfterImage from "@assets/generated_images/Before_after_skin_treatment_60b501b9.png";
import facialImage from "@assets/generated_images/Facial_treatment_close-up_d5c55f42.png";
import massageImage from "@assets/generated_images/Massage_therapy_session_569ccb02.png";

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

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">Galerie</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Entdecken Sie unsere Behandlungsergebnisse und lassen Sie sich inspirieren
            </p>
          </div>

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
