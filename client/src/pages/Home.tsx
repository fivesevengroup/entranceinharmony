import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import { Button } from "@/components/ui/button";
import { useRef, useCallback, useState } from "react";
import { Check, ArrowRight } from "lucide-react";
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
  const marqueeSlides = [...slides, ...slides];
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
    setIsDragging(false);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    const el = marqueeRef.current;
    if (!el) return;
    const computedStyle = window.getComputedStyle(el);
    const matrix = new DOMMatrix(computedStyle.transform);
    dragStart.current = { x: e.clientX, scrollLeft: matrix.m41 };
    el.style.animationPlayState = "paused";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !marqueeRef.current) return;
    e.preventDefault();
    const dx = e.clientX - dragStart.current.x;
    const el = marqueeRef.current;
    el.style.animation = "none";
    el.style.transform = `translateX(${dragStart.current.scrollLeft + dx}px)`;
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging || !marqueeRef.current) return;
    setIsDragging(false);
    const el = marqueeRef.current;
    const currentX = new DOMMatrix(window.getComputedStyle(el).transform).m41;
    const totalWidth = el.scrollWidth / 2;
    const progress = Math.abs(currentX % totalWidth) / totalWidth;
    el.style.transform = "";
    el.style.animation = "";
    el.style.animationDelay = `-${progress * 60}s`;
  }, [isDragging]);

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
        <div className="relative">
          <div className="text-center pt-12 pb-6 px-8 relative z-10">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.1] mb-3" data-testid="text-redtouch-headline">
              Sichtbar straffere,{" "}
              <span className="text-primary">glattere Haut.</span>
            </h2>
            <p className="text-muted-foreground/60 text-lg md:text-xl font-light tracking-wide">
              Red Touch Pro<sup className="text-xs">&reg;</sup>
            </p>
          </div>

          <div className="relative min-h-[70vh]">

            <div className="relative z-10 px-8 py-12 md:px-16 lg:px-20 lg:py-16 flex items-center min-h-[70vh]">
              <div className="max-w-xl bg-gray-200/60 backdrop-blur-[3px] lg:rounded-2xl lg:p-8">

                <p className="text-black text-base md:text-lg leading-relaxed mb-12 max-w-md">
                  Wo m&uuml;de, erschlaffte Haut war, entsteht ein frischer, ebenm&auml;&szlig;iger Teint. Durch sanfte Aktivierung Ihrer nat&uuml;rlichen Kollagenbildung gewinnt Ihre Haut sp&uuml;rbar an Festigkeit &ndash; ganz ohne Ausfallzeit.
                </p>

                <ul className="space-y-4 mb-14">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <span className="mt-1 shrink-0 w-5 h-5 rounded-full border border-primary/40 flex items-center justify-center bg-primary/10">
                        <Check className="w-3 h-3 text-primary" />
                      </span>
                      <span className="text-black text-sm md:text-base">{benefit}</span>
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

            <div
              className="absolute inset-0 z-0"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              <div className="h-full w-full overflow-hidden flex items-center">
                <div
                  ref={marqueeRef}
                  className="flex h-[80%] animate-marquee-scroll"
                  style={{
                    width: `${marqueeSlides.length * 55}%`,
                    animationPlayState: isPaused && !isDragging ? "paused" : undefined,
                  }}
                >
                  {marqueeSlides.map((slide, index) => (
                    <div
                      key={index}
                      className="h-full shrink-0 px-3"
                      style={{ width: `${100 / marqueeSlides.length}%` }}
                    >
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full h-full object-cover pointer-events-none select-none"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
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
