import { useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "paypal-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

interface VoucherPayPalButtonProps {
  amount: string;
  currency: string;
  intent: string;
  voucherId: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function VoucherPayPalButton({
  amount,
  currency,
  intent,
  voucherId,
  onSuccess,
  onError,
}: VoucherPayPalButtonProps) {
  const createOrder = async () => {
    const orderPayload = {
      amount: amount,
      currency: currency,
      intent: intent,
    };
    const response = await fetch("/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });
    const output = await response.json();
    return { orderId: output.id };
  };

  const captureOrder = async (orderId: string) => {
    const response = await fetch(`/order/${orderId}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  };

  const onApprove = async (data: any) => {
    try {
      console.log("onApprove", data);
      const orderData = await captureOrder(data.orderId);
      console.log("Capture result", orderData);

      const updateResponse = await apiRequest("PATCH", `/api/vouchers/${voucherId}/payment`, {
        status: "completed",
        paypalOrderId: data.orderId,
      });

      await updateResponse.json();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Payment completion failed:", error);
      const errorMessage = error?.message || "Zahlung konnte nicht abgeschlossen werden";
      if (onError) {
        onError(errorMessage);
      }
    }
  };

  const onCancel = async (data: any) => {
    console.log("onCancel", data);
    if (onError) {
      onError("Zahlung wurde abgebrochen");
    }
  };

  const onErrorHandler = async (data: any) => {
    console.log("onError", data);
    if (onError) {
      onError("Ein Fehler ist aufgetreten");
    }
  };

  useEffect(() => {
    const loadPayPalSDK = async () => {
      try {
        if (!(window as any).paypal) {
          const script = document.createElement("script");
          script.src = import.meta.env.PROD
            ? "https://www.paypal.com/web-sdk/v6/core"
            : "https://www.sandbox.paypal.com/web-sdk/v6/core";
          script.async = true;
          script.onload = () => initPayPal();
          document.body.appendChild(script);
        } else {
          await initPayPal();
        }
      } catch (e) {
        console.error("Failed to load PayPal SDK", e);
        if (onError) {
          onError("PayPal konnte nicht geladen werden");
        }
      }
    };

    loadPayPalSDK();
  }, []);

  const initPayPal = async () => {
    try {
      const response = await fetch("/setup");
      const data = await response.json();
      
      if (data.error) {
        if (onError) {
          onError("PayPal ist derzeit nicht verfügbar");
        }
        return;
      }

      const clientToken: string = data.clientToken;
      const sdkInstance = await (window as any).paypal.createInstance({
        clientToken,
        components: ["paypal-payments"],
      });

      const paypalCheckout = sdkInstance.createPayPalOneTimePaymentSession({
        onApprove,
        onCancel,
        onError: onErrorHandler,
      });

      const onClick = async () => {
        try {
          const checkoutOptionsPromise = createOrder();
          await paypalCheckout.start(
            { paymentFlow: "auto" },
            checkoutOptionsPromise,
          );
        } catch (e) {
          console.error(e);
          if (onError) {
            onError("Checkout konnte nicht gestartet werden");
          }
        }
      };

      const paypalButton = document.getElementById("paypal-button");

      if (paypalButton) {
        paypalButton.addEventListener("click", onClick);
      }

      return () => {
        if (paypalButton) {
          paypalButton.removeEventListener("click", onClick);
        }
      };
    } catch (e) {
      console.error(e);
      if (onError) {
        onError("PayPal-Initialisierung fehlgeschlagen");
      }
    }
  };

  return <paypal-button id="paypal-button"></paypal-button>;
}
