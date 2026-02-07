import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import aboutImage from "@assets/Design ohne Titel(4)_1760188585511.jpg";
import massageImage from "@assets/Design-ohne-Titel-7_1760197347929.png";
import laserImage from "@assets/generated_images/Red_Touch_laser_with_goggles_86dab14d.png";

export default function Home() {
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
                Entfliehen Sie dem Alltag und gönnen Sie sich einen Moment nur für sich. Stress, Hektik und Umwelteinflüsse hinterlassen Spuren, doch mit individuell abgestimmten Behandlungen bringe ich Ihre natürliche Schönheit wieder zum Strahlen.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                In einem eleganten Ambiente genießen Sie hochwertige Pflege, sanfte Berührungen und modernste Techniken für eine Haut, die aufatmet, und ein Wohlgefühl, das von innen kommt.
              </p>
              <p className="text-xl text-primary font-medium leading-relaxed">
                Lassen Sie sich verwöhnen, Sie haben es verdient.
              </p>
            </div>
          </div>
        </div>
        <WaveDivider position="bottom" color="hsl(var(--section-accent))" />
      </section>

      <section className="py-20 md:py-32 bg-section-accent relative">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 fade-up">
              <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
                Hautverjüngung auf höchstem Niveau
              </h2>
              <div className="h-0.5 w-32 mx-auto gold-shimmer rounded-full" />
            </div>
            
            <div className="bg-card/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-border fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2 relative">
                  <div className="elegant-glow h-full">
                    <div className="relative h-full overflow-hidden rounded-2xl">
                      <img
                        src={laserImage}
                        alt="Red Touch Pro Behandlung"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3 p-10 md:p-14 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-6 bg-primary/10 text-primary border-primary/20 text-xs uppercase tracking-widest">
                    Neu bei uns
                  </Badge>
                  <h3 className="text-3xl md:text-4xl font-serif font-light mb-3" data-testid="text-redtouch-headline">
                    Sichtbar straffere, glattere Haut
                  </h3>
                  <p className="text-primary font-medium mb-6 text-lg">
                    Red Touch Pro<sup className="text-xs">&reg;</sup>
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Wo müde, erschlaffte Haut war, entsteht ein frischer, ebenmäßiger Teint. Durch die sanfte Aktivierung Ihrer natürlichen Kollagenbildung gewinnt Ihre Haut spürbar an Festigkeit und Ausstrahlung &ndash; ganz ohne Ausfallzeit.
                  </p>

                  <ul className="space-y-3 mb-10">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Sichtbare Ergebnisse bereits nach der ersten Sitzung</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Sanft und angenehm &ndash; keine Ausfallzeit</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Natürliche Kollagenstimulation von innen heraus</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">Für Gesicht, Hals, Dekolleté und Hände</span>
                    </li>
                  </ul>

                  <div className="flex flex-wrap items-center gap-4">
                    <Button asChild data-testid="button-redtouch-cta" size="lg">
                      <a href="https://wa.me/491709287722?text=Hallo,%20ich%20interessiere%20mich%20für%20die%20Red%20Touch%20Pro%20Behandlung%20und%20hätte%20gerne%20eine%20Beratung." target="_blank" rel="noopener noreferrer">
                        Jetzt beraten lassen
                      </a>
                    </Button>
                    <Button variant="ghost" asChild data-testid="button-redtouch-more" size="lg" className="text-muted-foreground">
                      <a href="/leistungen" className="flex items-center gap-2">
                        <span>Ergebnisse entdecken</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <WaveDivider position="bottom" color="hsl(var(--background))" />
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
                In entspannter Atmosphäre und modernem Ambiente biete ich Ihnen professionelle Behandlungen für Gesicht und Körper. Überzeugen Sie sich selbst von meinem Studio und vereinbaren Sie jetzt Ihren persönlichen Wohlfühltermin.
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
