import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import aboutImage from "@assets/Design ohne Titel(4)_1760188585511.jpg";
import massageImage from "@assets/Design-ohne-Titel-7_1760197347929.png";
import laserImage1 from "@assets/generated_images/Red_Touch_laser_with_goggles_86dab14d.png";
import laserImage2 from "@assets/generated_images/Red_Touch_laser_treatment_4f8328f9.png";
import laserImage3 from "@assets/generated_images/Red_laser_therapy_bf6d9b43.png";
import skinResultImage from "@assets/generated_images/Before_after_skin_treatment_60b501b9.png";

const slides = [
  { src: laserImage1, alt: "Red Touch Pro Behandlung" },
  { src: laserImage2, alt: "Red Touch Pro Laser-Therapie" },
  { src: laserImage3, alt: "Professionelle Laserbehandlung" },
  { src: skinResultImage, alt: "Sichtbare Hautergebnisse" },
];

const benefits = [
  "Sichtbare Ergebnisse bereits nach der ersten Sitzung",
  "Sanft und angenehm \u2013 keine Ausfallzeit",
  "Nat\u00fcrliche Kollagenstimulation von innen heraus",
  "F\u00fcr Gesicht, Hals, Dekollet\u00e9 und H\u00e4nde",
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header transparent={true} />
      <Hero />
      
      <section className="py-20 md:py-28 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="fade-up">
              <h2 className="font-serif text-4xl md:text-5xl font-light mb-10 leading-relaxed">
                Willkommen in Ihrer exklusiven Auszeit
              </h2>
              <div className="h-0.5 w-32 mx-auto mb-12 gold-shimmer rounded-full"></div>
            </div>
            <div className="fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Entfliehen Sie dem Alltag und g&ouml;nnen Sie sich einen Moment nur f&uuml;r sich. Stress, Hektik und Umwelteinfl&uuml;sse hinterlassen Spuren, doch mit individuell abgestimmten Behandlungen bringe ich Ihre nat&uuml;rliche Sch&ouml;nheit wieder zum Strahlen.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                In einem eleganten Ambiente genie&szlig;en Sie hochwertige Pflege, sanfte Ber&uuml;hrungen und modernste Techniken f&uuml;r eine Haut, die aufatmet, und ein Wohlgef&uuml;hl, das von innen kommt.
              </p>
              <p className="text-xl text-primary font-medium leading-relaxed">
                Lassen Sie sich verw&ouml;hnen, Sie haben es verdient.
              </p>
            </div>
          </div>
        </div>
        <WaveDivider position="bottom" color="hsl(var(--section-accent))" />
      </section>

      <section className="relative bg-section-accent overflow-hidden" data-testid="section-redtouch">
        <div className="relative max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 min-h-[85vh] items-center">

            <div className="relative order-2 lg:order-1 px-8 py-16 md:px-16 lg:px-20 lg:py-0">
              <div className="max-w-xl">
                <a
                  href="/leistungen"
                  className="inline-flex items-center gap-3 px-6 py-3 mb-10 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-[0.2em] transition-all shadow-md"
                  data-testid="badge-redtouch-new"
                >
                  <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
                  Neu bei uns
                  <ArrowRight className="w-4 h-4" />
                </a>

                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1] mb-4" data-testid="text-redtouch-headline">
                  Sichtbar straffere,
                  <br />
                  <span className="text-primary">glattere Haut.</span>
                </h2>

                <p className="text-muted-foreground/60 text-lg md:text-xl font-light tracking-wide mb-10">
                  Red Touch Pro<sup className="text-xs">&reg;</sup>
                </p>

                <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-12 max-w-md">
                  Wo m&uuml;de, erschlaffte Haut war, entsteht ein frischer, ebenm&auml;&szlig;iger Teint. Durch sanfte Aktivierung Ihrer nat&uuml;rlichen Kollagenbildung gewinnt Ihre Haut sp&uuml;rbar an Festigkeit &ndash; ganz ohne Ausfallzeit.
                </p>

                <ul className="space-y-4 mb-14">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <span className="mt-1 shrink-0 w-5 h-5 rounded-full border border-primary/40 flex items-center justify-center bg-primary/10">
                        <Check className="w-3 h-3 text-primary" />
                      </span>
                      <span className="text-muted-foreground text-sm md:text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-4">
                  <Button asChild data-testid="button-redtouch-cta" size="lg" className="rounded-none text-sm uppercase tracking-widest px-8">
                    <a href="/kontakt">
                      Jetzt Termin vereinbaren
                    </a>
                  </Button>
                  <Button variant="outline" asChild data-testid="button-redtouch-more" size="lg" className="rounded-none text-sm uppercase tracking-widest px-8">
                    <a href="/leistungen" className="flex items-center gap-2">
                      <span>Weitere Informationen</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 h-[50vh] lg:h-[85vh] p-4 lg:p-6">
              <div className="absolute inset-4 lg:inset-6 overflow-hidden border-2 border-white shadow-lg">
                {slides.map((slide, index) => {
                  let translateY = "100%";
                  if (currentSlide === index) translateY = "0%";
                  else if (
                    index < currentSlide ||
                    (currentSlide === 0 && index === slides.length - 1)
                  ) translateY = "-100%";

                  return (
                    <div
                      key={index}
                      className="absolute inset-0"
                      style={{
                        transform: `translateY(${translateY})`,
                        transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="absolute bottom-12 right-12 flex items-center gap-3 z-10">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full border border-foreground/15 bg-background/60 backdrop-blur-sm flex items-center justify-center transition-all hover:border-foreground/30 hover:bg-background/80"
                  data-testid="button-slide-prev"
                  aria-label="Vorheriges Bild"
                >
                  <ChevronLeft className="w-4 h-4 text-foreground/60" />
                </button>
                <div className="flex items-center gap-2 px-3">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className="group p-1"
                      data-testid={`button-slide-dot-${index}`}
                      aria-label={`Bild ${index + 1}`}
                    >
                      <span
                        className={`block rounded-full transition-all duration-500 ${
                          currentSlide === index
                            ? "w-6 h-1.5 bg-primary"
                            : "w-1.5 h-1.5 bg-foreground/20 group-hover:bg-foreground/40"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full border border-foreground/15 bg-background/60 backdrop-blur-sm flex items-center justify-center transition-all hover:border-foreground/30 hover:bg-background/80"
                  data-testid="button-slide-next"
                  aria-label="N&auml;chstes Bild"
                >
                  <ChevronRight className="w-4 h-4 text-foreground/60" />
                </button>
              </div>

              <div className="absolute top-8 right-8 z-10 hidden lg:block">
                <span className="text-foreground/25 text-xs tracking-[0.3em] uppercase font-light">
                  {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-background relative">
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="order-2 md:order-1 fade-up">
              <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
                Besuchen Sie mein Studio
              </h2>
              <div className="h-0.5 w-24 mb-8 gold-shimmer rounded-full"></div>
              <h3 className="text-xl font-light mb-6 text-primary">
                Ihr Wohlfühlort in Burbach
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                In entspannter Atmosph&auml;re und modernem Ambiente biete ich Ihnen professionelle Behandlungen f&uuml;r Gesicht und K&ouml;rper. &Uuml;berzeugen Sie sich selbst von meinem Studio und vereinbaren Sie jetzt Ihren pers&ouml;nlichen Wohlf&uuml;hltermin.
              </p>
              <Button asChild data-testid="button-studio" size="lg">
                <a href="/kontakt">Termin vereinbaren</a>
              </Button>
            </div>
            <div className="order-1 md:order-2 fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
              <div className="elegant-glow">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={massageImage}
                    alt="Das Studio"
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
