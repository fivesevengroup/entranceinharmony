import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Facial_treatment_close-up_d5c55f42.png";

export default function Hero() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-6 text-primary/80">
              ENTRANCE IN HARMONY
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground">
              Ihre Kosmetikerin in Siegen und Umgebung!
            </p>
            <Button
              size="lg"
              className="text-base px-8"
              asChild
              data-testid="button-termin-hero"
            >
              <a href="/leistungen">zu den Behandlungen</a>
            </Button>
          </div>
          <div>
            <img
              src={heroImage}
              alt="Gesichtsbehandlung"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
