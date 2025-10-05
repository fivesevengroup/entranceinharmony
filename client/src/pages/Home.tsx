import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Star, Zap } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import aboutImage from "@assets/generated_images/Professional_aesthetician_portrait_19dd57d4.png";

export default function Home() {
  const services = [
    {
      icon: Sparkles,
      title: "Gesichtsbehandlungen",
      description: "Professionelle Gesichtspflege für strahlende und gesunde Haut",
      price: "ab 65€",
    },
    {
      icon: Heart,
      title: "Körperbehandlungen",
      description: "Entspannende Massagen und pflegende Körperbehandlungen",
      price: "ab 75€",
    },
    {
      icon: Star,
      title: "Spezialbehandlungen",
      description: "Individuelle Beauty-Treatments für besondere Ansprüche",
      price: "ab 85€",
    },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "Eine wunderbare Erfahrung! Die Behandlung war entspannend und das Ergebnis übertrifft meine Erwartungen. Elena nimmt sich Zeit und geht auf alle Wünsche ein.",
      rating: 5,
    },
    {
      name: "Julia K.",
      text: "Ich bin begeistert! Meine Haut fühlt sich nach der Behandlung so weich und gepflegt an. Die Atmosphäre ist sehr angenehm und professionell.",
      rating: 5,
    },
    {
      name: "Lisa P.",
      text: "Absolut empfehlenswert! Hier wird man mit viel Fachwissen und Herzlichkeit behandelt. Ich komme definitiv wieder!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src={aboutImage}
                alt="Elena Hartstein"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
                Willkommen in der Welt der Harmonie
              </h2>
              <div className="w-16 h-1 bg-primary mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Bei Entrance in Harmony vereinen wir professionelle Beauty-Behandlungen 
                mit einer einzigartigen Wohlfühlatmosphäre. Jede Behandlung ist auf Ihre 
                individuellen Bedürfnisse abgestimmt.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Mit Leidenschaft und Expertise schaffen wir für Sie einen Ort der 
                Entspannung, an dem Schönheit und Wohlbefinden Hand in Hand gehen.
              </p>
              <Button asChild data-testid="button-mehr-uber-uns">
                <a href="/kontakt">Mehr über uns</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
              Unsere Leistungen
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Entdecken Sie unser vielfältiges Angebot an professionellen Beauty-Behandlungen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild data-testid="button-alle-leistungen">
              <a href="/leistungen">Alle Leistungen ansehen</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
              Was Kundinnen über uns sagen
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Authentische Erfahrungen unserer zufriedenen Kundinnen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" asChild data-testid="button-mehr-bewertungen">
              <a href="/bewertungen">Mehr Bewertungen ansehen</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Zap className="h-12 w-12 mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            Bereit für Ihre Beauty-Behandlung?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Vereinbaren Sie jetzt Ihren Termin und erleben Sie Schönheit in perfekter Harmonie
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 bg-transparent hover:bg-primary-foreground/10 text-primary-foreground"
            asChild
            data-testid="button-termin-cta"
          >
            <a href="https://wa.me/4917092877" target="_blank" rel="noopener noreferrer">
              <SiWhatsapp className="mr-2 h-5 w-5" />
              Jetzt Termin vereinbaren
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
