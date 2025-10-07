import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceTable from "@/components/PriceTable";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import facialImage from "@assets/generated_images/Facial_treatment_close-up_d5c55f42.png";
import heroImage from "@assets/stock_images/elegant_spa_interior_11ef2121.jpg";

export default function PriceList() {
  const facialPrices = [
    { name: "Klassische Gesichtsbehandlung", price: "65€", duration: "60 Min." },
    { name: "Anti-Aging Behandlung", price: "85€", duration: "75 Min." },
    { name: "Hydra Facial", price: "95€", duration: "90 Min." },
    { name: "Tiefenreinigung", price: "70€", duration: "60 Min." },
    { name: "Augenbehandlung", price: "45€", duration: "30 Min." },
  ];

  const bodyPrices = [
    { name: "Entspannungsmassage", price: "75€", duration: "60 Min." },
    { name: "Hot Stone Massage", price: "90€", duration: "75 Min." },
    { name: "Aromatherapie Massage", price: "80€", duration: "60 Min." },
    { name: "Lymphdrainage", price: "80€", duration: "60 Min." },
    { name: "Rücken-Nacken Massage", price: "55€", duration: "45 Min." },
  ];

  const specialPrices = [
    { name: "Braut Make-up", price: "120€", duration: "90 Min." },
    { name: "Wimpernverlängerung", price: "95€", duration: "120 Min." },
    { name: "Microblading", price: "280€", duration: "150 Min." },
    { name: "Permanent Make-up", price: "350€", duration: "180 Min." },
  ];

  const handleDownloadPDF = () => {
    console.log("PDF download triggered");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Typographic Spotlight Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-background">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="relative z-10 container mx-auto px-4 pt-44 pb-20">
          <div className="max-w-5xl mx-auto">
            {/* Large Split Typography */}
            <div className="text-center mb-12 fade-up">
              <div className="mb-6">
                <span className="font-serif text-4xl md:text-6xl font-light text-foreground/60 block mb-2">Unsere</span>
                <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light text-gold-gradient relative inline-block">
                  Preisliste
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent gold-shimmer"></div>
                </h1>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground text-center leading-relaxed mb-12 fade-up max-w-3xl mx-auto" style={{ animationDelay: "0.2s", opacity: 0 }}>
              Transparente Preise für alle unsere Behandlungen
            </p>

            <div className="text-center fade-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
              <Button 
                onClick={handleDownloadPDF} 
                data-testid="button-download-pdf" 
                size="lg"
                className="text-base px-10 py-6 bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary shadow-xl font-medium"
              >
                <Download className="mr-2 h-5 w-5" />
                Preisliste als PDF
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">

          <div className="max-w-4xl mx-auto space-y-8">
            <PriceTable category="Gesichtsbehandlungen" items={facialPrices} />
            <PriceTable category="Körperbehandlungen" items={bodyPrices} />
            <PriceTable category="Spezialbehandlungen" items={specialPrices} />
          </div>

          <div className="mt-12 p-6 bg-accent/30 rounded-lg max-w-4xl mx-auto">
            <h3 className="font-serif text-xl mb-3">Wichtige Hinweise</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Alle Preise verstehen sich inklusive Mehrwertsteuer</li>
              <li>• Terminabsagen bitte mindestens 24 Stunden im Voraus</li>
              <li>• Für Paket-Angebote sprechen Sie uns gerne an</li>
              <li>• Gutscheine in beliebiger Höhe erhältlich</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
