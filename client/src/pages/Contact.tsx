import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">Kontakt</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Wir freuen uns auf Ihre Nachricht
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">
                    Kontaktformular
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-xl">Kontaktdaten</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Telefon</p>
                      <a
                        href="tel:+4917092877"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        0170 9287722
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">E-Mail</p>
                      <a
                        href="mailto:info@entranceinharmony.de"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        info@entranceinharmony.de
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Adresse</p>
                      <p className="text-muted-foreground">
                        Elena Hartstein<br />
                        Beauty & Aesthetics
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-xl">
                    <Clock className="inline h-5 w-5 mr-2 text-primary" />
                    Öffnungszeiten
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Montag - Freitag</span>
                    <span className="font-medium">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Samstag</span>
                    <span className="font-medium">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sonntag</span>
                    <span className="font-medium">Geschlossen</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Termine nach Vereinbarung
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-xl">Social Media</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    asChild
                    data-testid="contact-whatsapp"
                  >
                    <a
                      href="https://wa.me/4917092877"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SiWhatsapp className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    asChild
                    data-testid="contact-instagram"
                  >
                    <a
                      href="https://instagram.com/entranceinharmony"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SiInstagram className="h-5 w-5" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.9!2d13.404954!3d52.520008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDMxJzEyLjAiTiAxM8KwMjQnMTcuOCJF!5e0!3m2!1sde!2sde!4v1234567890"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                  title="Standort Entrance in Harmony"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
