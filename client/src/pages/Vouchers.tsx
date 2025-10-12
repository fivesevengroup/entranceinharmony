import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import VoucherStripeCheckout from "@/components/VoucherStripeCheckout";
import { Gift, Mail, Truck, CheckCircle2, AlertCircle, Star, Heart, Calendar, Sparkles, CreditCard, Send, Package, X, Store } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import WaveDivider from "@/components/WaveDivider";
import voucherImage from "@assets/generated_images/Elegant_gift_voucher_card_151c453a.png";
import heroImage from "@assets/voucher_hero_image.png";

const voucherFormSchema = z.object({
  purchaseType: z.enum(["custom", "service"]),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Betrag muss größer als 0 sein",
  }),
  serviceId: z.string().optional(),
  deliveryMethod: z.enum(["postal", "pickup"]),
  recipientName: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  recipientEmail: z.string().email("Ungültige E-Mail-Adresse").optional().or(z.literal("")),
  recipientAddress: z.string().optional(),
  buyerName: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  buyerEmail: z.string().email("Ungültige E-Mail-Adresse"),
  message: z.string().optional(),
  agbAccepted: z.boolean().refine((val) => val === true, {
    message: "Bitte akzeptieren Sie die AGB und Widerrufsbelehrung",
  }),
}).refine(
  (data) => {
    if (data.deliveryMethod === "postal") {
      return !!data.recipientAddress && data.recipientAddress.length > 0;
    }
    return true;
  },
  {
    message: "Adresse ist erforderlich für postalische Gutscheine",
    path: ["recipientAddress"],
  }
).refine(
  (data) => {
    if (data.purchaseType === "service") {
      return !!data.serviceId;
    }
    return true;
  },
  {
    message: "Bitte wählen Sie eine Behandlung aus",
    path: ["serviceId"],
  }
);

type VoucherFormData = z.infer<typeof voucherFormSchema>;

interface Service {
  id: string;
  name: string;
  shortDescription: string | null;
  durationMinutes: number | null;
  price: number;
  stripeProductId: string | null;
}

export default function Vouchers() {
  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [voucherId, setVoucherId] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const { toast } = useToast();

  // Check for Stripe Checkout return and verify session
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const canceled = urlParams.get('canceled');
    const sessionId = urlParams.get('session_id');

    if (success === 'true' && sessionId) {
      // Verify the checkout session with backend
      apiRequest("POST", "/api/verify-checkout-session", { sessionId })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setStep('success');
            toast({
              title: "Zahlung erfolgreich!",
              description: "Sie erhalten in Kürze eine Bestätigung per E-Mail.",
            });
          } else {
            toast({
              title: "Zahlung ausstehend",
              description: "Die Zahlung wird noch verarbeitet.",
              variant: "destructive",
            });
          }
        })
        .catch(() => {
          toast({
            title: "Fehler",
            description: "Fehler bei der Zahlungsbestätigung",
            variant: "destructive",
          });
        })
        .finally(() => {
          // Clean up URL
          window.history.replaceState({}, '', '/gutscheine');
        });
    } else if (canceled === 'true') {
      toast({
        title: "Zahlung abgebrochen",
        description: "Die Zahlung wurde abgebrochen. Versuchen Sie es erneut.",
        variant: "destructive",
      });
      // Clean up URL
      window.history.replaceState({}, '', '/gutscheine');
    }
  }, [toast]);

  // Fetch services from backend
  const { data: services = [], isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const form = useForm<VoucherFormData>({
    resolver: zodResolver(voucherFormSchema),
    defaultValues: {
      purchaseType: "custom",
      amount: "50",
      serviceId: "",
      deliveryMethod: "postal",
      recipientName: "",
      recipientEmail: "",
      recipientAddress: "",
      buyerName: "",
      buyerEmail: "",
      message: "",
      agbAccepted: false,
    },
  });

  const deliveryMethod = form.watch("deliveryMethod");
  const purchaseType = form.watch("purchaseType");
  const selectedServiceId = form.watch("serviceId");

  // Find selected service to display price
  const selectedService = services.find((s) => s.id === selectedServiceId);

  const createVoucherMutation = useMutation({
    mutationFn: async (data: VoucherFormData) => {
      // Convert amount string to integer for backend
      const voucherData: any = {
        ...data,
        amount: parseInt(data.amount, 10),
      };
      
      // Only include serviceId if service-based voucher
      if (data.purchaseType !== "service") {
        delete voucherData.serviceId;
      }
      
      const res = await apiRequest("POST", "/api/vouchers", voucherData);
      return res.json();
    },
    onSuccess: (data: any) => {
      setVoucherId(data.id);
      setStep("payment");
      queryClient.invalidateQueries({ queryKey: ["/api/vouchers"] });
    },
    onError: () => {
      toast({
        title: "Fehler",
        description: "Gutschein konnte nicht erstellt werden",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: VoucherFormData) => {
    createVoucherMutation.mutate(data);
  };

  const predefinedAmounts = [25, 50, 75, 100];

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
              <Gift className="w-5 h-5 text-primary" />
              <span className="text-white font-medium text-sm tracking-wide uppercase">Geschenkgutscheine</span>
            </div>
          </div>

          <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl font-light mb-6 text-white drop-shadow-2xl fade-up tracking-wide" style={{ animationDelay: "0.4s", opacity: 0 }}>
            Gutschein kaufen
          </h1>
          
          <div className="h-0.5 w-32 mx-auto mb-8 gold-shimmer rounded-full fade-up" style={{ animationDelay: "0.6s", opacity: 0 }}></div>

          <p className="text-xl md:text-3xl mb-6 text-white/95 drop-shadow-lg font-light max-w-2xl mx-auto fade-up" style={{ animationDelay: "0.8s", opacity: 0 }}>
            Schenken Sie Entspannung und Schönheit
          </p>
          <p className="text-lg md:text-xl mb-12 text-white/90 drop-shadow-lg font-light max-w-3xl mx-auto fade-up leading-relaxed" style={{ animationDelay: "1s", opacity: 0 }}>
            Wählen Sie Ihren Wunschbetrag und Versandart – digital per E-Mail oder elegant verpackt per Post
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16 fade-up" style={{ animationDelay: "1.2s", opacity: 0 }}>
            <Button
              size="lg"
              variant="ghost"
              className="text-sm px-12 py-6 bg-white/5 backdrop-blur text-white/90 border border-white/20 hover:bg-white/10 hover:border-white/30 font-serif uppercase tracking-widest transition-all duration-300"
              asChild
            >
              <a href="https://wa.me/491709287722" target="_blank" rel="noopener noreferrer">
                Beratung anfragen
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-sm px-12 py-6 text-white/80 border border-white/15 hover:bg-white/5 hover:border-white/25 font-serif uppercase tracking-widest transition-all duration-300"
              onClick={() => document.getElementById('voucher-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Gutschein erstellen
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 fade-up" style={{ animationDelay: "1.4s", opacity: 0 }}>
            <Badge variant="secondary" className="glassmorphism border-2 border-white/20 text-white px-5 py-3 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
              Sichere Zahlung mit Stripe
            </Badge>
            <Badge variant="secondary" className="glassmorphism border-2 border-white/20 text-white px-5 py-3 text-sm font-medium">
              <Star className="w-4 h-4 mr-2 text-primary" />
              Freier Wunschbetrag
            </Badge>
            <Badge variant="secondary" className="glassmorphism border-2 border-white/20 text-white px-5 py-3 text-sm font-medium">
              <Heart className="w-4 h-4 mr-2 text-primary" />
              Perfektes Geschenk
            </Badge>
          </div>
        </div>

        <WaveDivider position="bottom" color="hsl(var(--background))" />
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
                So einfach geht's
              </h2>
              <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full"></div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Gift className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      1
                    </div>
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-2">Betrag wählen</h3>
                <p className="text-sm text-muted-foreground">
                  Wunschbetrag und Versandart auswählen
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Send className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      2
                    </div>
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-2">Daten eingeben</h3>
                <p className="text-sm text-muted-foreground">
                  Empfänger-Infos und persönliche Nachricht
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <CreditCard className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      3
                    </div>
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-2">Bezahlen</h3>
                <p className="text-sm text-muted-foreground">
                  Sicher mit PayPal bezahlen
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Package className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                      4
                    </div>
                  </div>
                </div>
                <h3 className="font-medium text-lg mb-2">Erhalten</h3>
                <p className="text-sm text-muted-foreground">
                  Digital sofort oder per Post in 2-3 Tagen
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warum Entrance in Harmony Gutscheine - Bento Grid */}
      <section className="py-16 md:py-24 bg-section-accent relative">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-5xl font-light mb-4">
                Warum unsere Geschenkgutscheine?
              </h2>
              <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-4"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Schenken Sie nicht nur eine Behandlung, sondern ein unvergessliches Wohlfühl-Erlebnis
              </p>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
              {/* Feature Card - Spans 2 columns on desktop */}
              <Card className="md:col-span-2 md:row-span-2 border border-primary/30 hover-elevate bg-gradient-to-br from-primary/5 to-background overflow-hidden">
                <CardContent className="p-8 h-full flex flex-col justify-center items-center text-center">
                  <div className="w-full aspect-video mb-6 rounded-lg overflow-hidden">
                    <img 
                      src={voucherImage} 
                      alt="Elegant Geschenkgutschein" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary border-primary/30">
                    Premium Geschenkgutschein
                  </Badge>
                  <h3 className="font-serif text-2xl font-light mb-3">
                    Individuell & Persönlich
                  </h3>
                  <p className="text-muted-foreground">
                    Wählen Sie den Betrag, wir kümmern uns um die elegante Präsentation – digital oder per Post
                  </p>
                </CardContent>
              </Card>

              {/* Benefit Cards */}
              <Card className="border border-border hover-elevate">
                <CardContent className="p-6 h-full flex flex-col justify-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Star className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-medium text-lg mb-2 text-center">Premium Qualität</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Professionelle Behandlungen mit hochwertigen Produkten
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-border hover-elevate">
                <CardContent className="p-6 h-full flex flex-col justify-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Heart className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-medium text-lg mb-2 text-center">Flexibel einlösbar</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Freie Wahl der Behandlung und Terminvereinbarung
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-border hover-elevate">
                <CardContent className="p-6 h-full flex flex-col justify-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-medium text-lg mb-2 text-center">1 Jahr gültig</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Genug Zeit für den perfekten Termin
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-border hover-elevate">
                <CardContent className="p-6 h-full flex flex-col justify-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Gift className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-medium text-lg mb-2 text-center">Zwei Versandarten</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    Digital sofort oder elegant per Post
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <WaveDivider position="bottom" color="hsl(var(--background))" />
      </section>

      {/* Perfekt für diese Anlässe - Horizontal Scroll Carousel */}
      <section className="py-16 md:py-24 bg-background overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-5xl font-light mb-4">
                Perfekt für jeden Anlass
              </h2>
              <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-4"></div>
              <p className="text-muted-foreground">
                Scrollen Sie für weitere Anlässe →
              </p>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="relative">
              {/* Gradient Fade Left */}
              <div className="hidden md:block absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
              
              {/* Gradient Fade Right */}
              <div className="hidden md:block absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

              {/* Scrollable Cards */}
              <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 px-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <Card className="min-w-[280px] md:min-w-[320px] snap-center border border-primary/20 hover-elevate flex-shrink-0">
                  <CardContent className="p-8 h-full flex flex-col items-center text-center">
                    <div className="mb-6 relative">
                      <div className="p-5 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full">
                        <Calendar className="w-10 h-10 text-primary" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                    </div>
                    <h3 className="font-serif text-2xl font-light mb-3">Geburtstag</h3>
                    <p className="text-muted-foreground">
                      Ein besonderes Geschenk zum Ehrentag – für unvergessliche Momente
                    </p>
                  </CardContent>
                </Card>

                <Card className="min-w-[280px] md:min-w-[320px] snap-center border border-primary/20 hover-elevate flex-shrink-0">
                  <CardContent className="p-8 h-full flex flex-col items-center text-center">
                    <div className="mb-6 relative">
                      <div className="p-5 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full">
                        <Heart className="w-10 h-10 text-primary" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                    </div>
                    <h3 className="font-serif text-2xl font-light mb-3">Muttertag</h3>
                    <p className="text-muted-foreground">
                      Sagen Sie Danke mit Entspannung – das perfekte Geschenk für Mama
                    </p>
                  </CardContent>
                </Card>

                <Card className="min-w-[280px] md:min-w-[320px] snap-center border border-primary/20 hover-elevate flex-shrink-0">
                  <CardContent className="p-8 h-full flex flex-col items-center text-center">
                    <div className="mb-6 relative">
                      <div className="p-5 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full">
                        <Sparkles className="w-10 h-10 text-primary" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                    </div>
                    <h3 className="font-serif text-2xl font-light mb-3">Hochzeit</h3>
                    <p className="text-muted-foreground">
                      Perfekt als Geschenk für Braut, Bräutigam oder Gäste
                    </p>
                  </CardContent>
                </Card>

                <Card className="min-w-[280px] md:min-w-[320px] snap-center border border-primary/20 hover-elevate flex-shrink-0">
                  <CardContent className="p-8 h-full flex flex-col items-center text-center">
                    <div className="mb-6 relative">
                      <div className="p-5 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full">
                        <Gift className="w-10 h-10 text-primary" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                    </div>
                    <h3 className="font-serif text-2xl font-light mb-3">Einfach so</h3>
                    <p className="text-muted-foreground">
                      Eine Freude zwischendurch – ohne besonderen Anlass schenken
                    </p>
                  </CardContent>
                </Card>

                <Card className="min-w-[280px] md:min-w-[320px] snap-center border border-primary/20 hover-elevate flex-shrink-0">
                  <CardContent className="p-8 h-full flex flex-col items-center text-center">
                    <div className="mb-6 relative">
                      <div className="p-5 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full">
                        <Star className="w-10 h-10 text-primary" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                    </div>
                    <h3 className="font-serif text-2xl font-light mb-3">Weihnachten</h3>
                    <p className="text-muted-foreground">
                      Das ideale Geschenk für besinnliche Festtage und Zeit für sich
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <WaveDivider position="bottom" color="hsl(var(--section-accent))" />
      </section>

      {/* Gutschein kaufen Formular */}
      <section id="voucher-form" className="py-16 md:py-20 bg-background relative">
        <div className="container mx-auto px-4">
          {step === "form" ? (
            <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {/* Formular Spalte */}
              <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif font-light">Gutschein konfigurieren</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Purchase Type Selection */}
                      <FormField
                        control={form.control}
                        name="purchaseType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Gutschein-Art</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-2"
                              >
                                <div className="flex items-center space-x-3 p-4 rounded-lg border hover-elevate">
                                  <RadioGroupItem value="custom" id="purchase-custom" data-testid="radio-purchase-custom" />
                                  <Label htmlFor="purchase-custom" className="flex items-center gap-2 cursor-pointer flex-1">
                                    <CreditCard className="h-5 w-5 text-primary" />
                                    <div>
                                      <div className="font-medium">Freier Betrag</div>
                                      <div className="text-sm text-muted-foreground">Wählen Sie Ihren Wunschbetrag</div>
                                    </div>
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-3 p-4 rounded-lg border hover-elevate">
                                  <RadioGroupItem value="service" id="purchase-service" data-testid="radio-purchase-service" />
                                  <Label htmlFor="purchase-service" className="flex items-center gap-2 cursor-pointer flex-1">
                                    <Sparkles className="h-5 w-5 text-primary" />
                                    <div>
                                      <div className="font-medium">Für eine Behandlung</div>
                                      <div className="text-sm text-muted-foreground">Gutschein für spezifische Behandlung</div>
                                    </div>
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Custom Amount Selection - Only show if purchaseType is "custom" */}
                      {purchaseType === "custom" && (
                        <FormField
                          control={form.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gutschein-Wert (€)</FormLabel>
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                  {predefinedAmounts.map((amount) => (
                                    <Button
                                      key={amount}
                                      type="button"
                                      variant={field.value === String(amount) ? "default" : "outline"}
                                      onClick={() => field.onChange(String(amount))}
                                      data-testid={`button-amount-${amount}`}
                                    >
                                      {amount}€
                                    </Button>
                                  ))}
                                </div>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="Oder eigenen Betrag eingeben"
                                    {...field}
                                    data-testid="input-custom-amount"
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {/* Service Selection - Only show if purchaseType is "service" */}
                      {purchaseType === "service" && (
                        <FormField
                          control={form.control}
                          name="serviceId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Behandlung auswählen</FormLabel>
                              <div className="space-y-3">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setServiceDialogOpen(true)}
                                  className="w-full justify-start text-left h-auto py-4"
                                  data-testid="button-select-service"
                                >
                                  {selectedService ? (
                                    <div className="flex justify-between items-center w-full">
                                      <div>
                                        <div className="font-medium">{selectedService.name}</div>
                                        {selectedService.durationMinutes && (
                                          <div className="text-xs text-muted-foreground mt-1">
                                            {selectedService.durationMinutes} Minuten
                                          </div>
                                        )}
                                      </div>
                                      <div className="font-semibold text-primary">
                                        {selectedService.price}€
                                      </div>
                                    </div>
                                  ) : (
                                    <span className="text-muted-foreground">Behandlung wählen...</span>
                                  )}
                                </Button>
                                <FormMessage />
                              </div>

                              {/* Service Selection Dialog */}
                              <Dialog open={serviceDialogOpen} onOpenChange={setServiceDialogOpen}>
                                <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden">
                                  <DialogHeader>
                                    <DialogTitle className="text-2xl">Behandlung auswählen</DialogTitle>
                                  </DialogHeader>
                                  <div className="overflow-y-auto max-h-[60vh] -mx-6 px-6">
                                  <div className="space-y-3 mt-4">
                                    {servicesLoading ? (
                                      <div className="text-muted-foreground py-8 text-center">Lade Behandlungen...</div>
                                    ) : (
                                      <RadioGroup
                                        onValueChange={(value) => {
                                          field.onChange(value);
                                          setServiceDialogOpen(false);
                                        }}
                                        value={field.value}
                                        className="space-y-3"
                                      >
                                        {services.map((service) => (
                                          <div
                                            key={service.id}
                                            className="flex items-start space-x-3 p-4 rounded-lg border hover-elevate cursor-pointer"
                                            onClick={() => {
                                              field.onChange(service.id);
                                              setServiceDialogOpen(false);
                                            }}
                                          >
                                            <RadioGroupItem
                                              value={service.id}
                                              id={`dialog-service-${service.id}`}
                                              data-testid={`radio-service-${service.id}`}
                                            />
                                            <Label
                                              htmlFor={`dialog-service-${service.id}`}
                                              className="cursor-pointer flex-1"
                                            >
                                              <div className="flex justify-between items-start gap-3">
                                                <div className="flex-1">
                                                  <div className="font-medium">{service.name}</div>
                                                  {service.shortDescription && (
                                                    <div className="text-sm text-muted-foreground mt-1">
                                                      {service.shortDescription}
                                                    </div>
                                                  )}
                                                  {service.durationMinutes && (
                                                    <div className="text-xs text-muted-foreground mt-1">
                                                      {service.durationMinutes} Minuten
                                                    </div>
                                                  )}
                                                </div>
                                                <div className="font-semibold text-primary whitespace-nowrap">
                                                  {service.price}€
                                                </div>
                                              </div>
                                            </Label>
                                          </div>
                                        ))}
                                      </RadioGroup>
                                    )}
                                  </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name="deliveryMethod"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Versandart</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-2"
                              >
                                <div className="flex items-center space-x-3 p-4 rounded-lg border hover-elevate">
                                  <RadioGroupItem value="postal" id="postal" data-testid="radio-postal" />
                                  <Label htmlFor="postal" className="flex items-center gap-2 cursor-pointer flex-1">
                                    <Truck className="h-5 w-5 text-primary" />
                                    <div>
                                      <div className="font-medium">Per Post</div>
                                      <div className="text-sm text-muted-foreground">zzgl. 2,90€ Versand</div>
                                    </div>
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-3 p-4 rounded-lg border hover-elevate">
                                  <RadioGroupItem value="pickup" id="pickup" data-testid="radio-pickup" />
                                  <Label htmlFor="pickup" className="flex items-center gap-2 cursor-pointer flex-1">
                                    <Store className="h-5 w-5 text-primary" />
                                    <div>
                                      <div className="font-medium">Abholung</div>
                                      <div className="text-sm text-muted-foreground">Persönlich im Studio abholen</div>
                                    </div>
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="border-t pt-6">
                        <h3 className="font-medium mb-4">Empfänger-Informationen</h3>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="recipientName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name des Empfängers</FormLabel>
                                <FormControl>
                                  <Input {...field} data-testid="input-recipient-name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {deliveryMethod === "postal" && (
                            <FormField
                              control={form.control}
                              name="recipientAddress"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Adresse des Empfängers</FormLabel>
                                  <FormControl>
                                    <Textarea {...field} data-testid="textarea-recipient-address" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="font-medium mb-4">Ihre Informationen</h3>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="buyerName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Ihr Name</FormLabel>
                                <FormControl>
                                  <Input {...field} data-testid="input-buyer-name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="buyerEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Ihre E-Mail</FormLabel>
                                <FormControl>
                                  <Input type="email" {...field} data-testid="input-buyer-email" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="agbAccepted"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    data-testid="checkbox-agb-accepted"
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm font-normal">
                                    Ich habe die{" "}
                                    <a href="/agb" target="_blank" className="text-primary hover:underline">
                                      AGB
                                    </a>
                                    {" "}und die{" "}
                                    <a href="/widerruf" target="_blank" className="text-primary hover:underline">
                                      Widerrufsbelehrung
                                    </a>
                                    {" "}gelesen und akzeptiere diese.
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={createVoucherMutation.isPending}
                        data-testid="button-continue-payment"
                      >
                        <Gift className="mr-2 h-5 w-5" />
                        {createVoucherMutation.isPending ? "Wird erstellt..." : "Weiter zur Zahlung"}
                      </Button>

                      <div className="mt-6 pt-6 border-t">
                        <p className="text-sm text-muted-foreground text-center mb-4">
                          Sichere Zahlung mit
                        </p>
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                          <div className="h-8 px-3 flex items-center bg-white dark:bg-white/95 rounded border">
                            <svg className="h-5" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#fff"/>
                              <path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#1434CB"/>
                              <path d="M8.971 16.221l1.142-6.951h1.828l-1.143 6.951H8.971zm7.398-6.784c-.362-.135-.93-.282-1.638-.282-1.804 0-3.073.903-3.083 2.197-.013 .958.908 1.492 1.601 1.812.711.326.95.535.95.827-.005.445-.569.65-1.095.65-.733 0-1.122-.1-1.723-.35l-.236-.106-.257 1.494c.428.187 1.22.349 2.042.357 1.918 0 3.164-.892 3.177-2.273.007-.759-.481-1.337-1.537-1.812-.639-.308-.03-.507-.03-.732 0-.2.239-.414.754-.414.43-.007.74.087 .983.185l.118.054.235-1.37M22.691 9.27h-1.42c-.439 0-.769.12-.963.555l-2.73 6.133h1.917l.382-1.003.467 0c.422 0 2.411 0 2.411 0l.228 1.003h1.693l-1.48-6.688-.505 0zm-2.31 4.34c.15-.38.731-1.867.731-1.867-.01.018.15-.389.243-.643l.124.576.423 1.934h-1.52.001zM15.475 9.27l-1.787 4.704-.191-.923c-.33-1.06-1.361-2.207-2.515-2.781l1.637 6.175h1.932l2.875-7.175h-1.951z" fill="#fff"/>
                              <path d="M6.282 9.27H3.087l-.022.13c2.29.55 3.806 1.883 4.434 3.483l-.639-3.06c-.11-.424-.43-.54-.86-.553H6.282z" fill="#F7981D"/>
                            </svg>
                          </div>
                          <div className="h-8 px-3 flex items-center bg-white dark:bg-white/95 rounded border">
                            <svg className="h-5" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="48" height="32" rx="4" fill="white"/>
                              <circle cx="18" cy="16" r="9" fill="#EB001B"/>
                              <circle cx="30" cy="16" r="9" fill="#F79E1B"/>
                              <path fillRule="evenodd" clipRule="evenodd" d="M24 9.804a8.973 8.973 0 00-3 6.696c0 2.558 1.068 4.867 2.782 6.5H24c1.714-1.633 2.782-3.942 2.782-6.5A8.973 8.973 0 0024 9.804z" fill="#FF5F00"/>
                            </svg>
                          </div>
                          <div className="h-8 px-3 flex items-center bg-white dark:bg-white/95 rounded border">
                            <svg className="h-5" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 4.917v22.166h6.84V4.917H12zm31.726 14.12l4.358-11.787h5.946l-9.252 22.166h-5.532l-3.714-14.09c-1.674-.822-3.522-1.452-5.37-1.876l.084-.387h8.88c1.128 0 2.142.72 2.394 1.953l2.206 10.21zm22.482-11.787h-5.316c-1.17 0-2.058.546-2.478 1.407L49.2 27.203h8.166l1.632-4.376h9.966l.924 4.376h7.2L70.208 7.25zm-10.388 14.203c.672-1.743 3.228-8.42 3.228-8.42l1.842 8.42h-5.07zm-21.168-8.913c0-2.588 4.19-2.714 8.004-1.008l1.422-6.454C41.748 4.623 39.27 4.2 36.624 4.2c-7.536 0-12.84 3.864-12.882 9.4-.042 4.082 3.774 6.37 6.65 7.728 2.94 1.386 3.942 2.294 3.942 3.528 0 1.89-2.352 2.756-4.536 2.756-3.774 0-5.784-.966-8.88-2.24l-1.548 7.14c2.016.9 5.742 1.68 9.594 1.722 8.004 0 13.224-3.822 13.266-9.736.042-3.234-2.016-5.712-6.426-7.742z" fill="#003087"/>
                              <path d="M79.274 4.917v22.166h6.84V4.917h-6.84zm20.496 0l-9.252 22.166h8.166l1.632-4.376h9.966l.924 4.376h7.2L99.77 4.917h-5.316c-1.17 0-2.058.546-2.478 1.407l-.206.546zm1.338 14.203c.672-1.743 3.228-8.42 3.228-8.42l1.842 8.42h-5.07z" fill="#0070BA"/>
                            </svg>
                          </div>
                          <div className="h-8 px-3 flex items-center bg-white dark:bg-white/95 rounded border">
                            <svg className="h-5" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.5 8.5h55v15h-55z" fill="#fff"/>
                              <path d="M12.5 8.5h55M12.5 13.5h55M12.5 18.5h55M12.5 23.5h55" stroke="#00387B" strokeWidth="1"/>
                              <rect x="10" y="6" width="60" height="20" rx="2" stroke="#00387B" strokeWidth="2" fill="none"/>
                            </svg>
                          </div>
                          <div className="h-8 px-3 flex items-center bg-white dark:bg-white/95 rounded border">
                            <svg className="h-5" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="80" height="32" rx="4" fill="#FFB3C7"/>
                              <path d="M16 16L22 10M16 16L22 22" stroke="#0A0B09" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M28 12h24M28 16h20M28 20h16" stroke="#0A0B09" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </div>
                          <div className="h-8 px-3 flex items-center bg-white dark:bg-white/95 rounded border">
                            <svg className="h-5" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="100" height="32" rx="4" fill="#fff"/>
                              <path d="M24.176 21.47c-.096-.574-.58-.97-1.257-.97-.676 0-1.256.396-1.256 1.068 0 .477.387.773.967.87l.676.097c1.063.145 1.934.676 1.934 1.934 0 1.45-1.257 2.223-2.61 2.223-1.45 0-2.513-.773-2.61-2.03h1.257c.097.58.58 1.015 1.402 1.015.773 0 1.353-.387 1.353-1.063 0-.532-.435-.87-1.063-.967l-.725-.097c-.967-.145-1.885-.58-1.885-1.837 0-1.353 1.208-2.174 2.513-2.174 1.305 0 2.416.773 2.513 2.03h-1.208zm6.87 3.484c-1.74 0-2.997-1.353-2.997-3.145 0-1.74 1.257-3.145 2.997-3.145s2.997 1.353 2.997 3.145c0 1.74-1.257 3.145-2.997 3.145zm0-1.063c1.063 0 1.74-.87 1.74-2.078 0-1.208-.677-2.078-1.74-2.078s-1.74.87-1.74 2.078c0 1.208.677 2.078 1.74 2.078zm9.095-2.804h-2.03v4.256h-1.257V20.087h-2.03v-1.063h5.317v1.063zm7.773 4.256h-1.353l-.773-1.45h-2.755l-.773 1.45h-1.305l3.049-5.657h1.208l3.049 5.657zm-2.561-2.513l-.967-1.837-.967 1.837h1.934zm5.56-3.144h1.257v1.063h.048c.387-.725 1.063-1.208 1.934-1.208.193 0 .387.048.58.097v1.208c-.193-.048-.435-.097-.677-.097-.967 0-1.64.677-1.64 1.74v3.097h-1.257V19.024zm7.29 0h1.257v1.063h.048c.387-.725 1.063-1.208 1.934-1.208.193 0 .387.048.58.097v1.208c-.193-.048-.435-.097-.677-.097-.967 0-1.64.677-1.64 1.74v3.097h-1.257V19.024zm7.29 5.946c-1.74 0-2.997-1.353-2.997-3.145 0-1.74 1.257-3.145 2.997-3.145 1.063 0 1.885.58 2.223 1.45h-1.353c-.242-.435-.677-.677-1.208-.677-1.063 0-1.74.87-1.74 2.078 0 1.208.677 2.078 1.74 2.078.58 0 1.063-.29 1.208-.677h1.353c-.387.87-1.16 1.45-2.223 1.45zm6.918-5.946h1.257v5.657h-1.257v-.773h-.048c-.387.58-1.063.967-1.837.967-1.305 0-2.416-1.063-2.416-2.997s1.063-2.997 2.416-2.997c.773 0 1.45.387 1.837.967h.048v-1.063zm-2.223 4.74c.967 0 1.64-.677 1.64-1.934s-.677-1.934-1.64-1.934-1.64.677-1.64 1.934.677 1.934 1.64 1.934z" fill="#D90051"/>
                            </svg>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center mt-4">
                          Powered by Stripe - Ihre Daten sind sicher verschlüsselt
                        </p>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              </div>

              {/* FAQ Spalte */}
              <div>
                <div className="sticky top-24">
                  <div className="mb-8">
                    <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
                      Häufige Fragen
                    </h2>
                    <div className="h-0.5 w-24 gold-shimmer rounded-full mb-4"></div>
                    <p className="text-muted-foreground">
                      Alles, was Sie über unsere Geschenkgutscheine wissen müssen
                    </p>
                  </div>

                  <Accordion type="single" collapsible className="space-y-4">
                    <AccordionItem value="item-1" className="border border-border rounded-lg px-6 bg-card/50">
                      <AccordionTrigger className="hover:no-underline">
                        Wie lange ist der Gutschein gültig?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Unsere Geschenkgutscheine sind ab Kaufdatum 1 Jahr gültig. So hat der Beschenkte genügend Zeit, den perfekten Termin zu finden.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border border-border rounded-lg px-6 bg-card/50">
                      <AccordionTrigger className="hover:no-underline">
                        Kann ich den Gutschein für jede Behandlung verwenden?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Ja, der Gutschein kann für alle Behandlungen bei Entrance in Harmony eingelöst werden. Der Beschenkte kann selbst wählen, welche Behandlung am besten passt.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border border-border rounded-lg px-6 bg-card/50">
                      <AccordionTrigger className="hover:no-underline">
                        Wie schnell erhalte ich den Gutschein?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Digitale Gutscheine werden sofort nach Zahlungseingang per E-Mail versendet. Gutscheine per Post werden innerhalb von 2-3 Werktagen in einer eleganten Verpackung zugestellt.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4" className="border border-border rounded-lg px-6 bg-card/50">
                      <AccordionTrigger className="hover:no-underline">
                        Kann ich eine persönliche Nachricht hinzufügen?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Ja, beim Kauf können Sie eine persönliche Nachricht hinzufügen, die auf dem Gutschein erscheint. So wird das Geschenk noch individueller.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5" className="border border-border rounded-lg px-6 bg-card/50">
                      <AccordionTrigger className="hover:no-underline">
                        Was passiert, wenn der Gutscheinwert nicht ausreicht?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Sollte die gewünschte Behandlung teurer sein als der Gutscheinwert, kann die Differenz einfach vor Ort beglichen werden. Ist die Behandlung günstiger, bleibt das restliche Guthaben auf dem Gutschein erhalten bis der Betrag aufgebraucht ist.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6" className="border border-border rounded-lg px-6 bg-card/50">
                      <AccordionTrigger className="hover:no-underline">
                        Wie vereinbare ich einen Termin mit dem Gutschein?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Mit dem Gutschein können Sie ganz einfach per WhatsApp, Telefon oder E-Mail einen Wunschtermin vereinbaren. Die Kontaktdaten finden Sie auf dem Gutschein.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-border">
                    <p className="text-muted-foreground mb-4 text-center">
                      Sie haben weitere Fragen? Wir helfen Ihnen gerne weiter!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://wa.me/491709287722" target="_blank" rel="noopener noreferrer" data-testid="button-faq-whatsapp">
                          WhatsApp
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href="tel:+491709287722" data-testid="button-faq-phone">
                          Telefon
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href="mailto:info@entranceinharmony.de" data-testid="button-faq-email">
                          E-Mail
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : step === "payment" ? (
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif font-light">Zahlung</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Gutschein-Wert:</span>
                        <span className="text-2xl font-semibold">{form.getValues("amount")}€</span>
                      </div>
                    </div>

                    {paymentError && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Fehler</AlertTitle>
                        <AlertDescription>{paymentError}</AlertDescription>
                      </Alert>
                    )}

                    {voucherId && (
                      <VoucherStripeCheckout
                        voucherId={voucherId}
                        amount={parseFloat(form.getValues("amount"))}
                        onSuccess={() => {
                          setStep("success");
                          toast({
                            title: "Zahlung erfolgreich!",
                            description: "Ihr Gutschein wurde erfolgreich gekauft.",
                          });
                        }}
                      />
                    )}

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setStep("form")}
                      data-testid="button-back-to-form"
                    >
                      Zurück zum Formular
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="pt-12 pb-12">
                  <div className="text-center space-y-6">
                    <div className="flex justify-center">
                      <CheckCircle2 className="h-16 w-16 text-green-500" />
                    </div>
                    <div>
                      <h2 className="font-serif text-3xl font-light mb-4">
                        Vielen Dank für Ihren Kauf!
                      </h2>
                      <p className="text-muted-foreground">
                        Ihr Gutschein wurde erfolgreich erstellt und {form.getValues("deliveryMethod") === "postal" ? "wird in Kürze per Post zugestellt" : "steht zur Abholung bereit"}.
                      </p>
                    </div>
                    <Button
                      size="lg"
                      onClick={() => {
                        setStep("form");
                        setVoucherId(null);
                        setPaymentError(null);
                        form.reset();
                      }}
                      data-testid="button-new-voucher"
                    >
                      Weiteren Gutschein kaufen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
        <WaveDivider position="bottom" color="hsl(var(--background))" />
      </section>

      <Footer />
    </div>
  );
}
