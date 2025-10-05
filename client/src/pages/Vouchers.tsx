import { useState } from "react";
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
import PayPalButton from "@/components/PayPalButton";
import { Gift, Mail, Truck } from "lucide-react";

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
});

type VoucherFormData = z.infer<typeof voucherFormSchema>;

export default function Vouchers() {
  const [step, setStep] = useState<"form" | "payment">("form");
  const [voucherId, setVoucherId] = useState<string | null>(null);
  const { toast } = useToast();

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
      return apiRequest<any>("/api/vouchers", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
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

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">
              Geschenkgutscheine
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Schenken Sie Entspannung und Schönheit
            </p>
          </div>

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
          ) : (
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

                    <div className="text-center text-sm text-muted-foreground mb-4">
                      Bezahlen Sie sicher mit PayPal, Klarna oder Kreditkarte
                    </div>

                    <div className="flex justify-center">
                      <PayPalButton
                        amount={form.getValues("amount")}
                        currency="EUR"
                        intent="CAPTURE"
                      />
                    </div>

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
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
