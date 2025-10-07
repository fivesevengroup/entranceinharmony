import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Gift, Mail, Truck, CheckCircle2, AlertCircle, Star } from "lucide-react";
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

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light mb-6 text-white drop-shadow-2xl fade-up tracking-wide" style={{ animationDelay: "0.4s", opacity: 0 }}>
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

      <section className="py-16 md:py-20 bg-background">
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
                              <div className="grid grid-cols-4 gap-3">
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

      <Footer />
    </div>
  );
}
