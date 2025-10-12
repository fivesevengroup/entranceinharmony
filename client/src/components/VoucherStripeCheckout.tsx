import { useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Loader2 } from "lucide-react";

interface VoucherStripeCheckoutProps {
  voucherId: string;
  amount: number;
  onSuccess: () => void;
}

export default function VoucherStripeCheckout({ voucherId, amount, onSuccess }: VoucherStripeCheckoutProps) {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);

    try {
      const response = await apiRequest("POST", "/api/create-checkout-session", { 
        voucherId 
      });
      
      const data = await response.json();
      
      if (data.error) {
        toast({
          title: "Fehler",
          description: data.error,
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      toast({
        title: "Fehler",
        description: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Zahlung abschließen
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Gesamtbetrag:</span>
            <span className="text-2xl font-serif font-light">{amount.toFixed(2)} €</span>
          </div>
        </div>

        <Button 
          onClick={handleCheckout} 
          className="w-full" 
          size="lg"
          disabled={isProcessing}
          data-testid="button-stripe-checkout"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Wird verarbeitet...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Zur Zahlung ({amount.toFixed(2)} €)
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Sichere Zahlung mit Stripe • Akzeptiert Kreditkarten, PayPal und weitere Zahlungsmethoden
        </p>
      </CardContent>
    </Card>
  );
}
