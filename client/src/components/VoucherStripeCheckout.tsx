import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CreditCard, Loader2 } from "lucide-react";

if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  voucherId: string;
  amount: number;
  onSuccess: () => void;
}

const CheckoutForm = ({ voucherId, amount, onSuccess }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/geschenkgutscheine`,
        },
        redirect: "if_required",
      });

      if (error) {
        toast({
          title: "Zahlung fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Update voucher payment status
        await apiRequest("PATCH", `/api/vouchers/${voucherId}/payment`, {
          status: "completed",
          paypalOrderId: paymentIntent.id,
        });
        
        toast({
          title: "Zahlung erfolgreich!",
          description: "Ihr Gutschein wurde erfolgreich bezahlt.",
        });
        onSuccess();
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Gesamtbetrag:</span>
          <span className="text-2xl font-serif font-light">{amount.toFixed(2)} €</span>
        </div>
      </div>

      <PaymentElement />
      
      <Button 
        type="submit" 
        className="w-full" 
        size="lg"
        disabled={!stripe || isProcessing}
        data-testid="button-stripe-submit"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Wird verarbeitet...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Jetzt bezahlen ({amount.toFixed(2)} €)
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Sichere Zahlung mit Stripe • Akzeptiert Kreditkarten, PayPal und weitere Zahlungsmethoden
      </p>
    </form>
  );
};

interface VoucherStripeCheckoutProps {
  voucherId: string;
  amount: number;
  onSuccess: () => void;
}

export default function VoucherStripeCheckout({ voucherId, amount, onSuccess }: VoucherStripeCheckoutProps) {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create PaymentIntent as soon as the component loads
    apiRequest("POST", "/api/create-payment-intent", { 
      voucherId 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setClientSecret(data.clientSecret);
        }
      })
      .catch((err) => {
        setError("Fehler beim Laden der Zahlungsinformationen");
      });
  }, [voucherId]);

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-destructive">
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!clientSecret) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Zahlung abschließen
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm voucherId={voucherId} amount={amount} onSuccess={onSuccess} />
        </Elements>
      </CardContent>
    </Card>
  );
}
