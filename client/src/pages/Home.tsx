import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import aboutImage from "@assets/Design ohne Titel_1759678752531.png";
import massageImage from "@assets/generated_images/Massage_therapy_session_569ccb02.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header transparent={true} />
      <Hero />
      
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-8">
              Willkommen in Ihrer exklusiven Auszeit – wo Schönheit zur Entspannung wird
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Entfliehen Sie dem Alltag und gönnen Sie sich einen Moment nur für sich. Stress, Hektik und Umwelteinflüsse hinterlassen Spuren, doch mit individuell abgestimmten Behandlungen bringe ich Ihre natürliche Schönheit wieder zum Strahlen.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In einem eleganten Ambiente genießen Sie hochwertige Pflege, sanfte Berührungen und modernste Techniken für eine Haut, die aufatmet, und ein Wohlgefühl, das von innen kommt.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Lassen Sie sich verwöhnen, Sie haben es verdient.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">
                Ihre Expertin für natürliche Schönheit
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto" />
            </div>
            
            <div className="bg-card rounded-2xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                  <img
                    src={aboutImage}
                    alt="Elena Hartstein"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-serif font-light mb-2">
                    Elena Hartstein
                  </h3>
                  <p className="text-primary font-medium mb-6">
                    Zertifizierte Kosmetikerin · Burbach & Umgebung
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Mit über Jahren Erfahrung in der professionellen Kosmetik bringe ich Ihre natürliche Schönheit zum Strahlen. Meine Passion liegt darin, für jeden Hauttyp die perfekte Behandlung zu finden.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    In meinem Studio erwartet Sie eine Atmosphäre zum Wohlfühlen – modern, hygienisch und mit Liebe zum Detail gestaltet. Jede Behandlung ist individuell auf Ihre Bedürfnisse abgestimmt und kombiniert bewährte Techniken mit den neuesten Beauty-Innovationen.
                  </p>
                  <div className="flex gap-3">
                    <Button asChild data-testid="button-ueber-mich" size="lg">
                      <a href="/kontakt">Jetzt kennenlernen</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
                Das Studio
              </h2>
              <h3 className="text-lg font-light mb-4 text-muted-foreground">
                Lernen Sie mein Studio und mich näher kennen!
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                In entspannter Atmosphäre biete ich Ihnen professionelle Behandlungen für Gesicht und Körper. Lassen Sie sich verwöhnen und genießen Sie einen Moment nur für sich.
              </p>
              <Button asChild data-testid="button-studio">
                <a href="/kontakt">zum Studio</a>
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={massageImage}
                alt="Das Studio"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
