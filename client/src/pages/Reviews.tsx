import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import massageImage from "@assets/generated_images/Massage_therapy_session_569ccb02.png";
import heroImage from "@assets/stock_images/happy_woman_smiling__d4fdfc14.jpg";

export default function Reviews() {
  const allTestimonials = [
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
    {
      name: "Anna S.",
      text: "Die beste Gesichtsbehandlung, die ich je hatte! Elena arbeitet mit so viel Sorgfalt und verwendet hochwertige Produkte. Meine Haut strahlt!",
      rating: 5,
    },
    {
      name: "Maria T.",
      text: "Ein Ort der Entspannung und Schönheit. Die Massagen sind himmlisch und die Ergebnisse sprechen für sich. Vielen Dank für die wundervolle Erfahrung!",
      rating: 5,
    },
    {
      name: "Petra W.",
      text: "Professionell, freundlich und kompetent. Ich fühle mich hier sehr gut aufgehoben und freue mich schon auf meinen nächsten Termin.",
      rating: 5,
    },
    {
      name: "Nina R.",
      text: "Die Anti-Aging Behandlung hat meine Erwartungen übertroffen. Meine Haut wirkt frischer und straffer. Einfach großartig!",
      rating: 5,
    },
    {
      name: "Claudia H.",
      text: "Ein wunderbarer Ort zum Entspannen und Verwöhnen lassen. Die Behandlungen sind erstklassig und die Beratung sehr kompetent.",
      rating: 5,
    },
    {
      name: "Sophie B.",
      text: "Ich bin so glücklich, diesen Ort gefunden zu haben! Die Atmosphäre ist einladend und die Ergebnisse sind fantastisch. Absolute Empfehlung!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section with Background */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>

        <div className="relative z-10 container mx-auto px-4 text-center pt-44 pb-20">
          <div className="max-w-4xl mx-auto fade-up">
            <h1 className="font-serif text-5xl md:text-7xl font-light mb-6 text-white drop-shadow-2xl">
              Was Kundinnen über uns sagen
            </h1>
            <div className="h-0.5 w-32 mx-auto mb-8 gold-shimmer rounded-full"></div>
            <p className="text-xl md:text-2xl text-white/95 drop-shadow-lg leading-relaxed">
              Authentische Bewertungen unserer zufriedenen Kundinnen
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {allTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>

          <div className="text-center">
            <Button variant="outline" asChild data-testid="button-google-reviews">
              <a
                href="https://www.google.com/search?q=entrance+in+harmony"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mehr Bewertungen auf Google
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-accent/30">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-light mb-4">
            Ihre Meinung ist uns wichtig
          </h2>
          <p className="text-muted-foreground mb-8">
            Waren Sie bereits bei uns? Wir freuen uns über Ihr Feedback und Ihre Bewertung!
          </p>
          <Button asChild data-testid="button-leave-review">
            <a
              href="https://www.google.com/search?q=entrance+in+harmony"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bewertung schreiben
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
