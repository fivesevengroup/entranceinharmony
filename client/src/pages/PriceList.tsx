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

      {/* Hero Section with Background */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>

        <div className="relative z-10 container mx-auto px-4 text-center pt-44 pb-20">
          <div className="max-w-4xl mx-auto fade-up">
            <h1 className="font-serif text-5xl md:text-7xl font-light mb-6 text-white drop-shadow-2xl">
              Preisliste
            </h1>
            <div className="h-0.5 w-32 mx-auto mb-8 gold-shimmer rounded-full"></div>
            <p className="text-xl md:text-2xl text-white/95 drop-shadow-lg leading-relaxed mb-8">
              Transparente Preise für alle unsere Behandlungen
            </p>
            <Button 
              onClick={handleDownloadPDF} 
              data-testid="button-download-pdf" 
              size="lg"
              className="text-base px-10 py-6 glassmorphism hover:bg-white/20 text-white border-2 border-white/80 font-medium"
            >
              <Download className="mr-2 h-5 w-5" />
              Preisliste als PDF
            </Button>
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
