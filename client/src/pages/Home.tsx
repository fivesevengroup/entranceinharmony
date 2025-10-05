import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import aboutImage from "@assets/generated_images/Professional_aesthetician_portrait_19dd57d4.png";
import massageImage from "@assets/generated_images/Massage_therapy_session_569ccb02.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />

      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
              Herzlich Willkommen
            </h2>
            <h3 className="text-xl md:text-2xl font-light mb-6 text-muted-foreground">
              Nehmen Sie sich Ihre Auszeit!
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Es ist wichtig, sich regelmäßig vom stressigen Alltag zu befreien und sich nur auf sich selbst und seine eigene Schönheit zu fokussieren. Sie haben bei mir die Möglichkeit, in einem schönen Ambiente die Seele baumeln und sich verwöhnen zu lassen. Gemeinsam finden wir Ihre individuell auf Sie abgestimmte Behandlung, um Ihnen und Ihrer Haut etwas Gutes zu tun.
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
                alt="Gesichtsbehandlung"
                className="w-full rounded-lg"
              />
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
                Gesichtsbehandlungen
              </h2>
              <h3 className="text-lg font-light mb-4 text-muted-foreground">
                Von BB Glow Skin über Microneedling bis hin zu Oxygen Prime
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Lassen Sie uns über Ihre Haut sprechen! Sie ist unser größtes Organ und begleitet uns ein Leben lang. Daher ist es wichtig, diese regelmäßig zu achten und zu pflegen. Eine schöne Haut und ein strahlendes Auftreten machen das Leben einfach schöner!
              </p>
              <Button asChild data-testid="button-gesichtsbehandlungen">
                <a href="/leistungen">zu den Gesichtsbehandlungen</a>
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
