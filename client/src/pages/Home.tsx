import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import { Button } from "@/components/ui/button";
import aboutImage from "@assets/Design ohne Titel(4)_1760188585511.jpg";
import massageImage from "@assets/generated_images/Massage_therapy_session_569ccb02.png";

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
                Ihre Expertin für natürliche Schönheit
              </h2>
              <div className="h-0.5 w-32 mx-auto gold-shimmer rounded-full" />
            </div>
            
            <div className="bg-card/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-border fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2 relative">
                  <div className="elegant-glow h-full">
                    <div className="relative h-full overflow-hidden rounded-2xl">
                      <img
                        src={aboutImage}
                        alt="Elena Hartstein"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3 p-10 md:p-14 flex flex-col justify-center">
                  <h3 className="text-3xl md:text-4xl font-serif font-light mb-3">
                    Elena Hartstein
                  </h3>
                  <p className="text-primary font-semibold mb-8 text-lg">
                    Zertifizierte Kosmetikerin · Burbach & Umgebung
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    Mit langjähriger Erfahrung in der professionellen Kosmetik bringe ich Ihre natürliche Schönheit zum Strahlen. Meine Passion liegt darin, für jeden Hauttyp die perfekte Behandlung zu finden.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    In meinem Studio erwartet Sie eine Atmosphäre zum Wohlfühlen – modern, hygienisch und mit Liebe zum Detail gestaltet. Jede Behandlung ist individuell auf Ihre Bedürfnisse abgestimmt und kombiniert bewährte Techniken mit den neuesten Beauty-Innovationen.
                  </p>
                  <div className="flex gap-4">
                    <Button asChild data-testid="button-ueber-mich" size="lg">
                      <a href="/kontakt">Jetzt kennenlernen</a>
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
                Das Studio
              </h2>
              <div className="h-0.5 w-24 mb-8 gold-shimmer rounded-full"></div>
              <h3 className="text-xl font-light mb-6 text-primary">
                Lernen Sie mein Studio und mich näher kennen!
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                In entspannter Atmosphäre biete ich Ihnen professionelle Behandlungen für Gesicht und Körper. Lassen Sie sich verwöhnen und genießen Sie einen Moment nur für sich.
              </p>
              <Button asChild data-testid="button-studio" size="lg">
                <a href="/kontakt">zum Studio</a>
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
