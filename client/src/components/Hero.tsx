import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "react-icons/si";
import heroImage from "@assets/generated_images/Luxury_spa_treatment_room_d6074e85.png";

export default function Hero() {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-foreground/40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight mb-6">
          Entrance in Harmony
        </h1>
        <p className="text-xl md:text-2xl mb-4 font-light">Beauty & Aesthetics</p>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 opacity-90">
          Erleben Sie Schönheit und Wohlbefinden in perfekter Harmonie
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="text-base px-8"
            asChild
            data-testid="button-termin-hero"
          >
            <a href="https://wa.me/4917092877" target="_blank" rel="noopener noreferrer">
              <SiWhatsapp className="mr-2 h-5 w-5" />
              Jetzt Termin vereinbaren
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-base px-8 bg-background/20 backdrop-blur-md border-white/30 text-white hover:bg-background/30"
            asChild
            data-testid="button-leistungen-hero"
          >
            <a href="/leistungen">Unsere Leistungen</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
