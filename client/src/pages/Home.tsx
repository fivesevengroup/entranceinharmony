import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import { Button } from "@/components/ui/button";
import { useRef, useCallback, useState, useEffect } from "react";
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
  "Hautverjüngung & Anti-Aging (Faltenreduktion)",
  "Sichtbare Ergebnisse bereits nach der ersten Sitzung",
  "Sanft und angenehm \u2013 keine Ausfallzeit",
  "Natürliche Kollagenstimulation von innen heraus",
  "Für Gesicht, Hals, Dekolleté und Hände",
  "...und vieles mehr",
];

export default function Home() {
  const marqueeSlides = [...slides, ...slides, ...slides];
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const positionRef = useRef(0);
  const speedRef = useRef(0.7);
  const rafRef = useRef<number>(0);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const dragStartRef = useRef({ x: 0, pos: 0 });

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;

      if (!draggingRef.current && !pausedRef.current) {
        const oneSetWidth = el.scrollWidth / 3;
        positionRef.current -= speedRef.current * (dt / 16.667);
        if (positionRef.current <= -oneSetWidth * 2) {
          positionRef.current += oneSetWidth;
        }
        if (positionRef.current > 0) {
          positionRef.current -= oneSetWidth;
        }
        el.style.transform = `translateX(${positionRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseEnter = useCallback(() => {
    pausedRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    pausedRef.current = false;
    draggingRef.current = false;
    setIsDragging(false);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    draggingRef.current = true;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, pos: positionRef.current };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggingRef.current || !marqueeRef.current) return;
    e.preventDefault();
    const dx = e.clientX - dragStartRef.current.x;
    const newPos = dragStartRef.current.pos + dx;
    positionRef.current = newPos;
    marqueeRef.current.style.transform = `translateX(${newPos}px)`;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    pausedRef.current = false;
  }, []);

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

          <div className="relative min-h-[50vh]">

            <div className="relative z-10 px-4 py-10 md:px-16 lg:px-20 lg:py-16 flex items-center justify-center lg:justify-start min-h-[50vh] pointer-events-none">
              <div className="max-w-xl bg-gray-200/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 pointer-events-auto text-center lg:text-left">

                <p className="text-black text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto lg:mx-0">
                  Wo m&uuml;de, erschlaffte Haut war, entsteht ein frischer, ebenm&auml;&szlig;iger Teint. Durch sanfte Aktivierung Ihrer nat&uuml;rlichen Kollagenbildung gewinnt Ihre Haut sp&uuml;rbar an Festigkeit &ndash; ganz ohne Ausfallzeit.
                </p>

                <ul className="space-y-4 mb-10 text-left max-w-sm mx-auto lg:mx-0 lg:max-w-none">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <span className="mt-1 shrink-0 w-5 h-5 rounded-full border border-primary/40 flex items-center justify-center bg-primary/10">
                        <Check className="w-3 h-3 text-primary" />
                      </span>
                      <span className="text-black text-sm md:text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-center lg:justify-start">
                  <Button variant="ghost" asChild data-testid="button-redtouch-more" className="group rounded-none text-xs uppercase tracking-widest px-5 py-2.5 bg-black/70 text-white border border-white/20 hover:bg-black/80 hover:border-white/30">
                    <a href="/laserbehandlungen" className="flex items-center justify-center gap-2">
                      <span>Mehr erfahren</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
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
              <div className="h-full w-full overflow-hidden">
                <div
                  ref={marqueeRef}
                  className="flex h-full"
                  style={{ willChange: "transform" }}
                >
                  {marqueeSlides.map((slide, index) => (
                    <div
                      key={index}
                      className="h-[90%] shrink-0 self-center"
                      style={{ width: "50vw", marginRight: "2rem" }}
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
