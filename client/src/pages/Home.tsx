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

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={aboutImage}
                alt="Elena Hartstein"
                className="w-full rounded-lg"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
                Über mich
              </h2>
              <h3 className="text-lg font-light mb-4 text-muted-foreground">
                Elena Hartstein
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Willkommen bei Entrance in Harmony! Mein Name ist Elena Hartstein und ich bin Ihre Kosmetikerin in Burbach und Umgebung.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Mit Leidenschaft und Expertise biete ich Ihnen professionelle Gesichtsbehandlungen in entspannter Atmosphäre. Jede Behandlung ist individuell auf Ihre Bedürfnisse abgestimmt.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nehmen Sie sich Ihre Auszeit und lassen Sie sich verwöhnen!
              </p>
              <Button asChild data-testid="button-ueber-mich">
                <a href="/kontakt">Mehr über mich</a>
              </Button>
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
