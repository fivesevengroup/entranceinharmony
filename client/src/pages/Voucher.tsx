import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VoucherCard from "@/components/VoucherCard";
import VoucherModal from "@/components/VoucherModal";
import { Mail, Gift, Heart, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import WaveDivider from "@/components/WaveDivider";
import voucherImage from "@assets/optimized/generated_images/geschenkgutschein-kosmetik-beauty-gutschein.webp";
import heroImage from "@assets/optimized/stock_images/geschenkgutschein-gold-box-beauty.webp";

export default function Voucher() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<"digital" | "physical">("digital");

  const handleSelectVoucher = (type: "digital" | "physical") => {
    setSelectedType(type);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section with Background */}
      <section className="relative overflow-hidden" style={{ minHeight: 'calc(100svh + 80px)' }}>
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>

        <div className="relative z-10 container mx-auto px-4 text-center pt-44 pb-32">
          <div className="fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glassmorphism mb-8 border-2 border-white/30 gold-glow">
              <Gift className="w-5 h-5 text-primary" />
              <span className="text-white font-medium text-sm tracking-wide uppercase">Das perfekte Geschenk</span>
            </div>
          </div>

          <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl font-light mb-6 text-white drop-shadow-2xl fade-up tracking-wide" style={{ animationDelay: "0.4s", opacity: 0 }}>
            Schenke Harmonie
          </h1>
          
          <div className="h-0.5 w-32 mx-auto mb-8 gold-shimmer rounded-full fade-up" style={{ animationDelay: "0.6s", opacity: 0 }}></div>

          <p className="text-xl md:text-3xl mb-6 text-white/95 drop-shadow-lg font-light max-w-2xl mx-auto fade-up" style={{ animationDelay: "0.8s", opacity: 0 }}>
            Verschenke Entspannung & Schönheit
          </p>
          <p className="text-lg md:text-xl mb-16 text-white/90 drop-shadow-lg font-light max-w-3xl mx-auto fade-up leading-relaxed" style={{ animationDelay: "1s", opacity: 0 }}>
            Ob Geburtstag, Muttertag oder einfach als liebe Geste – mit einem Gutschein von Entrance in Harmony schenkst du Entspannung, Schönheit und Wohlbefinden
          </p>

          <div className="flex flex-wrap justify-center gap-6 fade-up" style={{ animationDelay: "1.2s", opacity: 0 }}>
            <Badge variant="secondary" className="glassmorphism border-2 border-white/20 text-white px-5 py-3 text-sm font-medium">
              <Heart className="w-4 h-4 mr-2 text-primary" />
              Digital & Per Post
            </Badge>
            <Badge variant="secondary" className="glassmorphism border-2 border-white/20 text-white px-5 py-3 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              Sofort verfügbar
            </Badge>
          </div>
        </div>

        <WaveDivider position="bottom" color="hsl(var(--background))" />
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">

          <div className="max-w-5xl mx-auto mb-16">
            <img
              src={voucherImage}
              alt="Beauty Gutschein Gesichtsbehandlung Kosmetik Geschenk Burbach"
              className="w-full rounded-lg shadow-lg"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <VoucherCard
              type="digital"
              icon={Mail}
              title="Digitaler Gutschein"
              description="Per E-Mail in wenigen Minuten"
              features={[
                "Wählbarer Betrag (25€, 50€, 100€, Wunschbetrag)",
                "Persönliche Nachricht möglich",
                "Sofortiger E-Mail-Versand als PDF",
                "Direkt ausdruckbar",
              ]}
              onSelect={() => handleSelectVoucher("digital")}
            />

            <VoucherCard
              type="physical"
              icon={Gift}
              title="Physischer Gutschein"
              description="Schön verpackt per Post"
              features={[
                "Wählbarer Betrag (25€, 50€, 100€, Wunschbetrag)",
                "Persönliche Nachricht möglich",
                "Elegante Gold-Kuvert Verpackung",
                "Versandzeit: 2-3 Werktage",
              ]}
              shippingCost="2,90€"
              onSelect={() => handleSelectVoucher("physical")}
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-accent/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-serif text-3xl font-light mb-8 text-center">
            So funktioniert's
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                1
              </div>
              <h3 className="font-medium mb-2">Gutschein wählen</h3>
              <p className="text-sm text-muted-foreground">
                Entscheiden Sie sich für digital oder physisch
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                2
              </div>
              <h3 className="font-medium mb-2">Betrag & Nachricht</h3>
              <p className="text-sm text-muted-foreground">
                Wählen Sie den Betrag und fügen Sie eine persönliche Nachricht hinzu
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                3
              </div>
              <h3 className="font-medium mb-2">Bezahlen & Versenden</h3>
              <p className="text-sm text-muted-foreground">
                Sicher mit PayPal bezahlen und Freude verschenken
              </p>
            </div>
          </div>
        </div>
      </section>

      <VoucherModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        voucherType={selectedType}
      />

      <Footer />
    </div>
  );
}
