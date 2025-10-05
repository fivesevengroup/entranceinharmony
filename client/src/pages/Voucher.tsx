import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VoucherCard from "@/components/VoucherCard";
import VoucherModal from "@/components/VoucherModal";
import { Mail, Gift } from "lucide-react";
import voucherImage from "@assets/generated_images/Elegant_gift_voucher_card_151c453a.png";

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

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">
              Schenke Harmonie
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Ob Geburtstag, Muttertag oder einfach als liebe Geste – mit einem 
              Gutschein von Entrance in Harmony schenkst du Entspannung, Schönheit 
              und Wohlbefinden.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <img
              src={voucherImage}
              alt="Beauty Gutschein"
              className="w-full rounded-lg shadow-lg"
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
