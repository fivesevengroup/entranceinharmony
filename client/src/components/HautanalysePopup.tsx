import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "react-icons/si";

export default function HautanalysePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-hautanalyse">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl md:text-3xl font-light text-center">
            Kostenlose Hautanalyse
          </DialogTitle>
          <DialogDescription className="sr-only">
            Informationen über unsere kostenlose Hautanalyse beim ersten Besuch
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed text-center">
            Wir schenken Ihnen beim ersten Besuch eine kostenlose Hautanalyse.
          </p>
          <p className="text-muted-foreground leading-relaxed text-center">
            Dabei nehmen wir uns Zeit, Ihre Haut genau kennenzulernen und herauszufinden, was sie wirklich braucht.
          </p>
          <p className="text-muted-foreground leading-relaxed text-center">
            Durch eine sorgfältige Analyse erstellen wir Ihr persönliches Pflegekonzept mit exklusiven Produkten, die Ihrer Haut neue Frische, Glätte und Ausstrahlung schenken.
          </p>
          <div className="flex justify-center pt-4">
            <Button 
              size="lg"
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white border-[#20BA5A]"
              asChild
              data-testid="button-termin-popup"
            >
              <a href="https://wa.me/491709287722" target="_blank" rel="noopener noreferrer">
                <SiWhatsapp className="mr-2 h-5 w-5" />
                Jetzt Termin vereinbaren
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
