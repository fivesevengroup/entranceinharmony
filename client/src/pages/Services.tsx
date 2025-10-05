import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Droplet, Eye, Hand, Zap } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import facialImage from "@assets/generated_images/Facial_treatment_close-up_d5c55f42.png";

export default function Services() {
  const facialServices = [
    {
      icon: Sparkles,
      title: "Klassische Gesichtsbehandlung",
      description: "Tiefenreinigung, Peeling und pflegende Maske für strahlende Haut",
      price: "65€",
    },
    {
      icon: Eye,
      title: "Anti-Aging Behandlung",
      description: "Intensive Pflege zur Reduzierung von Falten und feinen Linien",
      price: "85€",
    },
    {
      icon: Droplet,
      title: "Hydra Facial",
      description: "Intensive Feuchtigkeitspflege für frische und pralle Haut",
      price: "95€",
    },
  ];

  const bodyServices = [
    {
      icon: Heart,
      title: "Entspannungsmassage",
      description: "Ganzkörpermassage zur Lösung von Verspannungen und Stress",
      price: "75€",
    },
    {
      icon: Hand,
      title: "Hot Stone Massage",
      description: "Wärmetherapie mit heißen Steinen für tiefe Entspannung",
      price: "90€",
    },
    {
      icon: Zap,
      title: "Lymphdrainage",
      description: "Sanfte Massage zur Anregung des Lymphsystems",
      price: "80€",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">
              Unsere Leistungen
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Professionelle Beauty-Behandlungen für Gesicht und Körper
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <img
              src={facialImage}
              alt="Gesichtsbehandlung"
              className="rounded-lg shadow-lg w-full"
            />
            <div>
              <h2 className="font-serif text-3xl font-light mb-4">
                Individuelle Beauty-Erlebnisse
              </h2>
              <div className="w-16 h-1 bg-primary mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-4">
                Jede Behandlung wird individuell auf Ihre Bedürfnisse abgestimmt. 
                Mit hochwertigen Produkten und professionellen Techniken sorgen wir 
                für optimale Ergebnisse.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Genießen Sie einen Moment der Ruhe und lassen Sie sich von unserer 
                Expertise verwöhnen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-accent/30">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-12 text-center">
            Gesichtsbehandlungen
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facialServices.map((service) => (
              <ServiceCard key={service.title} {...service} link="/kontakt" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-12 text-center">
            Körperbehandlungen
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bodyServices.map((service) => (
              <ServiceCard key={service.title} {...service} link="/kontakt" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
            Termin anfragen per WhatsApp
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Kontaktieren Sie uns direkt über WhatsApp für eine persönliche Beratung
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 bg-transparent hover:bg-primary-foreground/10 text-primary-foreground"
            asChild
            data-testid="button-whatsapp-termin"
          >
            <a href="https://wa.me/4917092877" target="_blank" rel="noopener noreferrer">
              <SiWhatsapp className="mr-2 h-5 w-5" />
              WhatsApp Termin anfragen
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
