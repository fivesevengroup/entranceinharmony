import { Button } from "@/components/ui/button";
import heroImage from "@assets/Screenshot 2025-10-05 225321_1759697624011.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center pt-28">
        <h1 className="font-serif text-5xl md:text-7xl font-light mb-6 text-white drop-shadow-2xl">
          ENTRANCE IN HARMONY
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/95 drop-shadow-lg font-light max-w-2xl mx-auto">
          Ihre Kosmetikerin in Burbach und Umgebung
        </p>
        <p className="text-lg md:text-xl mb-12 text-white/90 drop-shadow-lg font-light max-w-3xl mx-auto">
          Gönnen Sie sich eine Auszeit. Professionelle Gesichtsbehandlungen in entspannter Atmosphäre.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="text-base px-8 bg-white/90 backdrop-blur-sm hover:bg-white text-primary border-2 border-white"
            asChild
            data-testid="button-behandlungen-hero"
          >
            <a href="/leistungen">zu den Behandlungen</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-base px-8 bg-transparent backdrop-blur-sm hover:bg-white/10 text-white border-2 border-white"
            asChild
            data-testid="button-termin-hero"
          >
            <a href="https://wa.me/491709287722" target="_blank" rel="noopener noreferrer">
              Termin vereinbaren
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
