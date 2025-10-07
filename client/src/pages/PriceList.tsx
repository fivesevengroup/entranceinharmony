import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceTable from "@/components/PriceTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, CheckCircle, Shield } from "lucide-react";
import WaveDivider from "@/components/WaveDivider";
import facialImage from "@assets/generated_images/Facial_treatment_close-up_d5c55f42.png";
import heroImage from "@assets/stock_images/luxury_spa_products__6c63556f.jpg";

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
      <section className="relative min-h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>

        <div className="relative z-10 container mx-auto px-4 text-center pt-44 pb-20">
          <div className="fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glassmorphism mb-8 border-2 border-white/30 gold-glow">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="text-white font-medium text-sm tracking-wide uppercase">Transparente Preisgestaltung</span>
            </div>
          </div>

          <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl font-light mb-6 text-white drop-shadow-2xl fade-up tracking-wide" style={{ animationDelay: "0.4s", opacity: 0 }}>
            Preisliste
          </h1>
          
          <div className="h-0.5 w-32 mx-auto mb-8 gold-shimmer rounded-full fade-up" style={{ animationDelay: "0.6s", opacity: 0 }}></div>

          <p className="text-xl md:text-3xl mb-6 text-white/95 drop-shadow-lg font-light max-w-2xl mx-auto fade-up" style={{ animationDelay: "0.8s", opacity: 0 }}>
            Faire Preise für Premium-Qualität
          </p>
          <p className="text-lg md:text-xl mb-12 text-white/90 drop-shadow-lg font-light max-w-3xl mx-auto fade-up leading-relaxed" style={{ animationDelay: "1s", opacity: 0 }}>
            Transparente Preise für alle unsere Behandlungen – keine versteckten Kosten, nur erstklassige Ergebnisse
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16 fade-up" style={{ animationDelay: "1.2s", opacity: 0 }}>
            <Button
              size="lg"
              variant="ghost"
              className="text-sm px-12 py-6 bg-white/5 backdrop-blur text-white/90 border border-white/20 hover:bg-white/10 hover:border-white/30 font-serif uppercase tracking-widest transition-all duration-300"
              asChild
            >
              <a href="https://wa.me/491709287722" target="_blank" rel="noopener noreferrer">
                Jetzt Termin buchen
              </a>
            </Button>
            <Button 
              onClick={handleDownloadPDF} 
              data-testid="button-download-pdf" 
              size="lg"
              variant="ghost"
              className="text-sm px-12 py-6 text-white/80 border border-white/15 hover:bg-white/5 hover:border-white/25 font-serif uppercase tracking-widest transition-all duration-300"
            >
              <Download className="mr-2 h-4 w-4" />
              Preisliste als PDF
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 fade-up" style={{ animationDelay: "1.4s", opacity: 0 }}>
            <Badge variant="secondary" className="glassmorphism border-2 border-white/20 text-white px-5 py-3 text-sm font-medium">
              <Shield className="w-4 h-4 mr-2 text-primary" />
              Faire & Transparente Preise
            </Badge>
            <Badge variant="secondary" className="glassmorphism border-2 border-white/20 text-white px-5 py-3 text-sm font-medium">
              <CheckCircle className="w-4 h-4 mr-2 text-primary" />
              Keine versteckten Kosten
            </Badge>
          </div>
        </div>

        <WaveDivider position="bottom" color="hsl(var(--background))" />
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
