import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceTable from "@/components/PriceTable";
import facialImage from "@assets/generated_images/Facial_treatment_close-up_d5c55f42.png";

export default function Services() {
  const facialPrices = [
    { name: "Klassische Gesichtsbehandlung", price: "65€", duration: "60 Min." },
    { name: "Anti-Aging Behandlung", price: "85€", duration: "75 Min." },
    { name: "Hydra Facial", price: "95€", duration: "90 Min." },
    { name: "BB Glow Skin", price: "120€", duration: "90 Min." },
    { name: "Microneedling", price: "150€", duration: "90 Min." },
    { name: "Oxygen Prime", price: "110€", duration: "75 Min." },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">
              Gesichtsbehandlungen
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Von BB Glow Skin über Microneedling bis hin zu Oxygen Prime
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <img
              src={facialImage}
              alt="Gesichtsbehandlung"
              className="rounded-lg w-full"
            />
            <div>
              <h2 className="font-serif text-3xl font-light mb-6">
                Ihre Haut verdient das Beste
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Lassen Sie uns über Ihre Haut sprechen! Sie ist unser größtes Organ und begleitet uns ein Leben lang. Daher ist es wichtig, diese regelmäßig zu achten und zu pflegen.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Eine schöne Haut und ein strahlendes Auftreten machen das Leben einfach schöner! Jede Behandlung wird individuell auf Ihre Bedürfnisse abgestimmt.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <PriceTable category="Unsere Behandlungen" items={facialPrices} />
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Für eine persönliche Beratung kontaktieren Sie mich gerne
            </p>
            <a
              href="tel:+4917092877"
              className="text-lg text-foreground hover:text-primary transition-colors"
            >
              0170 9287722
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
