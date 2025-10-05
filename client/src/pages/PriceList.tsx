import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceTable from "@/components/PriceTable";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

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

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">Preisliste</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
              Transparente Preise für alle unsere Behandlungen
            </p>
            <Button onClick={handleDownloadPDF} data-testid="button-download-pdf">
              <Download className="mr-2 h-4 w-4" />
              Preisliste als PDF
            </Button>
          </div>

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
