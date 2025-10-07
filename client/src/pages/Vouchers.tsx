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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import VoucherPayPalButton from "@/components/VoucherPayPalButton";
import { Gift, Mail, Truck, CheckCircle2, AlertCircle, Star, Heart, Calendar, Sparkles, CreditCard, Send, Package } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import WaveDivider from "@/components/WaveDivider";
import voucherImage from "@assets/generated_images/Elegant_gift_voucher_card_151c453a.png";
import heroImage from "@assets/stock_images/spa_voucher_gift_cer_15fda10a.jpg";

const voucherFormSchema = z.object({
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Betrag muss größer als 0 sein",
  }),
  deliveryMethod: z.enum(["digital", "postal"]),
  recipientName: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  recipientEmail: z.string().email("Ungültige E-Mail-Adresse").optional().or(z.literal("")),
  recipientAddress: z.string().optional(),
  buyerName: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  buyerEmail: z.string().email("Ungültige E-Mail-Adresse"),
  message: z.string().optional(),
}).refine(
  (data) => {
    if (data.deliveryMethod === "digital") {
      return !!data.recipientEmail && data.recipientEmail.length > 0;
    }
    return true;
  },
  {
    message: "E-Mail-Adresse ist erforderlich für digitale Gutscheine",
    path: ["recipientEmail"],
  }
).refine(
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
);

type VoucherFormData = z.infer<typeof voucherFormSchema>;

export default function Vouchers() {
  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [voucherId, setVoucherId] = useState<string | null>(null);
  const [paypalAvailable, setPaypalAvailable] = useState<boolean | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkPayPal = async () => {
      try {
        const response = await fetch("/setup");
        const data = await response.json();
        setPaypalAvailable(!data.error);
      } catch {
        setPaypalAvailable(false);
      }
    };
    checkPayPal();
  }, []);

  const form = useForm<VoucherFormData>({
    resolver: zodResolver(voucherFormSchema),
    defaultValues: {
      amount: "50",
      deliveryMethod: "digital",
      recipientName: "",
      recipientEmail: "",
      recipientAddress: "",
      buyerName: "",
      buyerEmail: "",
      message: "",
    },
  });

  const deliveryMethod = form.watch("deliveryMethod");

  const createVoucherMutation = useMutation({
    mutationFn: async (data: VoucherFormData) => {
      const res = await apiRequest("POST", "/api/vouchers", data);
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
          <p className="text-lg md:text-xl mb-16 text-white/90 drop-shadow-lg font-light max-w-3xl mx-auto fade-up leading-relaxed" style={{ animationDelay: "1s", opacity: 0 }}>
            Wählen Sie Ihren Wunschbetrag und Versandart – digital per E-Mail oder elegant verpackt per Post
          </p>

          <div className="flex flex-wrap justify-center gap-6 fade-up" style={{ animationDelay: "1.2s", opacity: 0 }}>
            <Badge variant="secondary" className="glassmorphism border-2 border-white/20 text-white px-5 py-3 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
              Sichere Zahlung mit PayPal
            </Badge>
            <Badge variant="secondary" className="glassmorphism border-2 border-white/20 text-white px-5 py-3 text-sm font-medium">
              <Star className="w-4 h-4 mr-2 text-primary" />
              Freier Wunschbetrag
            </Badge>
          </div>
        </div>

        <WaveDivider position="bottom" color="hsl(var(--background))" />
      </section>

      {/* Warum Entrance in Harmony Gutscheine - Bento Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-5xl font-light mb-4">
                Warum unsere Geschenkgutscheine?
              </h2>
              <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-4"></div>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
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
                  <h3 className="font-medium text-lg mb-2 text-center">3 Jahre gültig</h3>
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
      </section>

      {/* Perfekt für diese Anlässe - Horizontal Scroll Carousel */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-muted/20 via-background to-muted/20 overflow-hidden">
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
      </section>

      {/* So einfach geht's - Horizontale Timeline */}
      <section className="py-16 md:py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-5xl font-light mb-4">
                So einfach geht's
              </h2>
              <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full"></div>
            </div>

            {/* Desktop: Horizontal Timeline */}
            <div className="hidden md:block relative">
              {/* Verbindungslinie */}
              <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 z-0"></div>
              
              <div className="grid grid-cols-4 gap-8 relative z-10">
                <div className="text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      1
                    </div>
                  </div>
                  <div className="mb-4">
                    <CreditCard className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-medium text-lg mb-2">Betrag wählen</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Wunschbetrag und Versandart auswählen
                  </p>
                </div>

                <div className="text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      2
                    </div>
                  </div>
                  <div className="mb-4">
                    <Send className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-medium text-lg mb-2">Daten eingeben</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Empfänger-Infos und persönliche Nachricht
                  </p>
                </div>

                <div className="text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      3
                    </div>
                  </div>
                  <div className="mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-medium text-lg mb-2">Bezahlen</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Sicher mit PayPal bezahlen
                  </p>
                </div>

                <div className="text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      4
                    </div>
                  </div>
                  <div className="mb-4">
                    <Package className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-medium text-lg mb-2">Erhalten</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Digital sofort oder per Post in 2-3 Tagen
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile: Vertical Timeline */}
            <div className="md:hidden space-y-6">
              <div className="flex gap-4 items-start">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Betrag & Versandart wählen
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Wählen Sie Ihren Wunschbetrag und die Versandart
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                    <Send className="w-5 h-5 text-primary" />
                    Daten eingeben
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Empfänger-Informationen und persönliche Nachricht
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Sicher bezahlen
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Bezahlen Sie einfach und sicher mit PayPal
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg mb-2 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    Gutschein erhalten
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Digital sofort oder per Post in 2-3 Werktagen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gutschein kaufen Formular */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-muted/20 via-background to-muted/20">
        <div className="container mx-auto px-4">

          {step === "form" ? (
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif font-light">Gutschein konfigurieren</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                  <RadioGroupItem value="digital" id="digital" data-testid="radio-digital" />
                                  <Label htmlFor="digital" className="flex items-center gap-2 cursor-pointer flex-1">
                                    <Mail className="h-5 w-5 text-primary" />
                                    <div>
                                      <div className="font-medium">Digital per E-Mail</div>
                                      <div className="text-sm text-muted-foreground">Sofortiger Versand</div>
                                    </div>
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-3 p-4 rounded-lg border hover-elevate">
                                  <RadioGroupItem value="postal" id="postal" data-testid="radio-postal" />
                                  <Label htmlFor="postal" className="flex items-center gap-2 cursor-pointer flex-1">
                                    <Truck className="h-5 w-5 text-primary" />
                                    <div>
                                      <div className="font-medium">Per Post</div>
                                      <div className="text-sm text-muted-foreground">Gedruckter Gutschein</div>
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

                          {deliveryMethod === "digital" && (
                            <FormField
                              control={form.control}
                              name="recipientEmail"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>E-Mail des Empfängers</FormLabel>
                                  <FormControl>
                                    <Input type="email" {...field} data-testid="input-recipient-email" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}

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
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Persönliche Nachricht (optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Ihre persönliche Grußbotschaft"
                                {...field}
                                data-testid="textarea-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

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
                    </form>
                  </Form>
                </CardContent>
              </Card>
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

                    {paypalAvailable === false && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Zahlung derzeit nicht verfügbar</AlertTitle>
                        <AlertDescription>
                          Die Online-Zahlung ist momentan nicht verfügbar. Bitte kontaktieren Sie uns direkt über WhatsApp, um Ihren Gutschein zu bestellen.
                        </AlertDescription>
                      </Alert>
                    )}

                    {paypalAvailable === true && voucherId && (
                      <>
                        <div className="text-center text-sm text-muted-foreground mb-4">
                          Bezahlen Sie sicher mit PayPal, Klarna oder Kreditkarte
                        </div>

                        <div className="flex justify-center">
                          <VoucherPayPalButton
                            amount={form.getValues("amount")}
                            currency="EUR"
                            intent="CAPTURE"
                            voucherId={voucherId}
                            onSuccess={() => {
                              setStep("success");
                              toast({
                                title: "Zahlung erfolgreich!",
                                description: "Ihr Gutschein wurde erfolgreich gekauft.",
                              });
                            }}
                            onError={(error) => {
                              setPaymentError(error);
                            }}
                          />
                        </div>
                      </>
                    )}

                    {paypalAvailable === null && (
                      <div className="text-center text-muted-foreground">
                        Zahlungsoptionen werden geladen...
                      </div>
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
                        Ihr Gutschein wurde erfolgreich erstellt und wird in Kürze {form.getValues("deliveryMethod") === "digital" ? "per E-Mail versandt" : "per Post zugestellt"}.
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
      </section>

      {/* Häufige Fragen */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
                Häufige Fragen
              </h2>
              <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-4"></div>
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
                  Unsere Geschenkgutscheine sind ab Kaufdatum 3 Jahre gültig. So hat der Beschenkte genügend Zeit, den perfekten Termin zu finden.
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
                  Sollte die gewünschte Behandlung teurer sein als der Gutscheinwert, kann die Differenz einfach vor Ort beglichen werden. Ist die Behandlung günstiger, bleibt das Guthaben erhalten.
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

            <div className="mt-12 text-center p-6 bg-muted/30 rounded-lg border border-border">
              <p className="text-muted-foreground mb-4">
                Sie haben weitere Fragen? Wir helfen Ihnen gerne weiter!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" asChild>
                  <a href="https://wa.me/491709287722" target="_blank" rel="noopener noreferrer" data-testid="button-faq-whatsapp">
                    WhatsApp
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="tel:+491709287722" data-testid="button-faq-phone">
                    0170 9287722
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:info@entranceinharmony.de" data-testid="button-faq-email">
                    E-Mail
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
