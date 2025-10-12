import { useState, useEffect } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Loader2, CheckCircle2, Mail, AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface VoucherStripeCheckoutProps {
  voucherId: string;
  amount: number;
  onSuccess: () => void;
}

function CheckoutForm({ voucherId, totalAmount, onSuccess }: { voucherId: string; totalAmount: number; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/gutscheine?success=true`,
        },
        redirect: 'if_required',
      });

      if (error) {
        toast({
          title: "Zahlung fehlgeschlagen",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Update voucher payment status
        await apiRequest("PATCH", `/api/vouchers/${voucherId}/payment`, {
          status: "paid",
        });

        setPaymentSuccess(true);
        
        toast({
          title: "Zahlung erfolgreich!",
          description: "Ihr Gutschein wird per E-Mail zugestellt.",
        });

        // Call onSuccess after a short delay to show success message
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (err) {
      toast({
        title: "Fehler",
        description: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-5 h-5" />
            Zahlung erfolgreich
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-green-200 bg-green-50">
            <Mail className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Ihre Zahlung wurde erfolgreich verarbeitet. Der Gutschein wird in Kürze per E-Mail zugestellt.
            </AlertDescription>
          </Alert>
          <p className="text-sm text-muted-foreground text-center">
            Vielen Dank für Ihren Einkauf!
          </p>
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
      <CardContent className="space-y-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Gesamtbetrag:</span>
            <span className="text-2xl font-serif font-light">{totalAmount.toFixed(2)} €</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="min-h-[200px]">
            <PaymentElement />
          </div>

          <Button 
            type="submit"
            className="w-full" 
            size="lg"
            disabled={!stripe || isLoading}
            data-testid="button-pay-now"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Zahlung wird verarbeitet...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Jetzt bezahlen ({totalAmount.toFixed(2)} €)
              </>
            )}
          </Button>
        </form>

        <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
          <div className="h-10 flex items-center">
            <img 
              src="https://raw.githubusercontent.com/slaterjohn/payment-logos/master/Rounded%20Corners/PNG/medium/visa@2x.png" 
              alt="Visa" 
              className="h-6 opacity-70"
            />
          </div>
          <div className="h-10 flex items-center">
            <img 
              src="https://raw.githubusercontent.com/slaterjohn/payment-logos/master/Rounded%20Corners/PNG/medium/mastercard@2x.png" 
              alt="Mastercard" 
              className="h-6 opacity-70"
            />
          </div>
          <div className="h-10 flex items-center">
            <img 
              src="https://raw.githubusercontent.com/slaterjohn/payment-logos/master/Rounded%20Corners/PNG/medium/paypal@2x.png" 
              alt="PayPal" 
              className="h-6 opacity-70"
            />
          </div>
          <div className="h-10 flex items-center">
            <img 
              src="https://raw.githubusercontent.com/slaterjohn/payment-logos/master/Rounded%20Corners/PNG/medium/klarna-1@2x.png" 
              alt="Klarna" 
              className="h-6 opacity-70"
            />
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Sichere Verschlüsselung • Powered by Stripe
        </p>
      </CardContent>
    </Card>
  );
}

export default function VoucherStripeCheckout({ voucherId, amount, onSuccess }: VoucherStripeCheckoutProps) {
  const { toast } = useToast();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState(amount);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createPaymentIntent = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", { 
        voucherId 
      });
      
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        toast({
          title: "Fehler",
          description: data.error,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      setClientSecret(data.clientSecret);
      setTotalAmount(data.amount);
      setIsLoading(false);
    } catch (err) {
      const errorMessage = "Zahlungsformular konnte nicht geladen werden.";
      setError(errorMessage);
      toast({
        title: "Fehler",
        description: errorMessage,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    createPaymentIntent();
  }, [voucherId]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error && !clientSecret) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="w-5 h-5" />
            Fehler beim Laden
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
          <Button 
            onClick={createPaymentIntent}
            className="w-full"
            variant="outline"
            data-testid="button-retry-payment"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Erneut versuchen
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!clientSecret) {
    return (
      <Card>
        <CardContent className="py-12 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm voucherId={voucherId} totalAmount={totalAmount} onSuccess={onSuccess} />
    </Elements>
  );
}
