import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import aboutImage from "@assets/KI-Bewerbungsfoto-31117629-4_1759678066113.jpg";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">
              Über mich
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Lernen Sie mein Studio und mich näher kennen
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16 max-w-5xl mx-auto">
            <img
              src={aboutImage}
              alt="Elena Hartstein"
              className="rounded-lg w-full"
            />
            <div>
              <h2 className="font-serif text-3xl font-light mb-6">
                Elena Hartstein
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Willkommen bei Entrance in Harmony! Mein Name ist Elena Hartstein und ich bin Ihre Kosmetikerin in Burbach und Umgebung.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Mit Leidenschaft und Expertise biete ich Ihnen professionelle Gesichtsbehandlungen in entspannter Atmosphäre. Jede Behandlung ist individuell auf Ihre Bedürfnisse abgestimmt.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Nehmen Sie sich Ihre Auszeit und lassen Sie sich verwöhnen!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">Kontakt</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div>
                    <p className="font-medium text-foreground mb-1">Telefon</p>
                    <a
                      href="tel:+491709287722"
                      className="hover:text-foreground transition-colors"
                    >
                      0170 9287722
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">E-Mail</p>
                    <a
                      href="mailto:info@entranceinharmony.de"
                      className="hover:text-foreground transition-colors"
                    >
                      info@entranceinharmony.de
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Adresse</p>
                    <p>Elena Hartstein<br />Beauty & Aesthetics</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">Öffnungszeiten</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mo - Fr</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Samstag</span>
                    <span>10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sonntag</span>
                    <span>Geschlossen</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Termine nach Vereinbarung
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl font-light mb-6 text-center">
              Kontaktieren Sie mich
            </h2>
            <Card>
              <CardContent className="pt-6">
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
