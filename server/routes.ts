import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVoucherSchema, updateVoucherPaymentSchema } from "@shared/schema";
import path from "path";
import Stripe from "stripe";
import { sendVoucherEmail, sendPurchaseConfirmationEmail } from "./email";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function registerRoutes(app: Express): Promise<Server> {
  // Download route for about page image
  app.get("/download/elena-portrait.jpg", (req, res) => {
    const filePath = path.join(process.cwd(), "attached_assets", "KI-Bewerbungsfoto-31117629-4_1759678066113.jpg");
    res.download(filePath, "elena-portrait.jpg");
  });
  // PayPal routes - only if credentials are available
  const hasPayPalCredentials = process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET;
  
  if (hasPayPalCredentials) {
    const { createPaypalOrder, capturePaypalOrder, loadPaypalDefault } = await import("./paypal");
    
    app.get("/setup", async (req, res) => {
      await loadPaypalDefault(req, res);
    });

    app.post("/order", async (req, res) => {
      await createPaypalOrder(req, res);
    });

    app.post("/order/:orderID/capture", async (req, res) => {
      await capturePaypalOrder(req, res);
    });
  } else {
    app.get("/setup", (req, res) => {
      res.status(503).json({ error: "PayPal not configured" });
    });

    app.post("/order", (req, res) => {
      res.status(503).json({ error: "PayPal not configured" });
    });

    app.post("/order/:orderID/capture", (req, res) => {
      res.status(503).json({ error: "PayPal not configured" });
    });
  }

  // Services routes
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  // Voucher routes
  app.post("/api/vouchers", async (req, res) => {
    try {
      console.log("Received voucher data:", JSON.stringify(req.body, null, 2));
      const validatedData = insertVoucherSchema.parse(req.body);
      console.log("Validated voucher data:", JSON.stringify(validatedData, null, 2));
      const orderNumber = `VO-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      let voucherData: any = {
        ...validatedData,
        orderNumber,
      };

      // If service-based voucher, fetch service and snapshot details
      if (validatedData.purchaseType === "service" && validatedData.serviceId) {
        const service = await storage.getService(validatedData.serviceId);
        if (!service) {
          return res.status(404).json({ error: "Service not found" });
        }
        
        // Snapshot service details and override amount
        voucherData.serviceSnapshotName = service.name;
        voucherData.serviceSnapshotPrice = service.price;
        voucherData.amount = service.price;
      }
      
      const voucher = await storage.createVoucher(voucherData);
      res.json(voucher);
    } catch (error) {
      console.error("Voucher creation error:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      }
      res.status(400).json({ error: "Invalid voucher data" });
    }
  });

  app.get("/api/vouchers/:id", async (req, res) => {
    const voucher = await storage.getVoucher(req.params.id);
    if (!voucher) {
      return res.status(404).json({ error: "Voucher not found" });
    }
    res.json(voucher);
  });

  app.patch("/api/vouchers/:id/payment", async (req, res) => {
    try {
      const validatedData = updateVoucherPaymentSchema.parse(req.body);
      const voucher = await storage.updateVoucherPaymentStatus(
        req.params.id,
        validatedData.status,
        validatedData.paypalOrderId
      );
      if (!voucher) {
        return res.status(404).json({ error: "Voucher not found" });
      }

      // Send emails automatically when payment is marked as paid
      if (validatedData.status === "paid" && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
          console.log(`Payment marked as paid for voucher ${voucher.id}, sending emails...`);

          // Send voucher email to recipient (only for digital vouchers)
          if (voucher.deliveryMethod === "digital" && voucher.recipientEmail) {
            await sendVoucherEmail({
              recipientEmail: voucher.recipientEmail,
              recipientName: voucher.recipientName,
              buyerName: voucher.buyerName,
              amount: voucher.amount,
              orderNumber: voucher.orderNumber,
              message: voucher.message || undefined,
              deliveryMethod: voucher.deliveryMethod as "digital" | "postal",
              purchaseType: voucher.purchaseType as "custom" | "service",
              serviceSnapshotName: voucher.serviceSnapshotName || undefined,
            });
            console.log(`Voucher email sent to ${voucher.recipientEmail}`);
          }

          // Send confirmation email to buyer
          await sendPurchaseConfirmationEmail({
            buyerEmail: voucher.buyerEmail,
            buyerName: voucher.buyerName,
            recipientEmail: voucher.recipientEmail || "",
            recipientName: voucher.recipientName,
            amount: voucher.amount,
            orderNumber: voucher.orderNumber,
            message: voucher.message || undefined,
            deliveryMethod: voucher.deliveryMethod as "digital" | "postal",
            purchaseType: voucher.purchaseType as "custom" | "service",
            serviceSnapshotName: voucher.serviceSnapshotName || undefined,
          });
          console.log(`Confirmation email sent to ${voucher.buyerEmail}`);
        } catch (emailError) {
          console.error("Error sending emails:", emailError);
          // Don't fail the payment update if email fails
        }
      }

      res.json(voucher);
    } catch (error) {
      res.status(400).json({ error: "Invalid payment update data" });
    }
  });

  // Verify Stripe Checkout Session and update voucher status
  app.post("/api/verify-checkout-session", async (req, res) => {
    try {
      const { sessionId } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({ error: "Missing sessionId" });
      }

      // Retrieve session from Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      
      if (!session.metadata?.voucherId) {
        return res.status(400).json({ error: "No voucherId in session" });
      }

      // Check if payment was successful
      if (session.payment_status === "paid") {
        const voucher = await storage.updateVoucherPaymentStatus(
          session.metadata.voucherId,
          "paid"
        );

        if (!voucher) {
          return res.status(404).json({ error: "Voucher not found" });
        }

        // Send emails if configured
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
          try {
            // Send voucher email to recipient (only for digital vouchers)
            if (voucher.deliveryMethod === "digital" && voucher.recipientEmail) {
              await sendVoucherEmail({
                recipientEmail: voucher.recipientEmail,
                recipientName: voucher.recipientName,
                buyerName: voucher.buyerName,
                amount: voucher.amount,
                orderNumber: voucher.orderNumber,
                message: voucher.message || undefined,
                deliveryMethod: voucher.deliveryMethod as "digital" | "postal",
                purchaseType: voucher.purchaseType as "custom" | "service",
                serviceSnapshotName: voucher.serviceSnapshotName || undefined,
              });
            }

            // Send confirmation email to buyer
            await sendPurchaseConfirmationEmail({
              buyerEmail: voucher.buyerEmail,
              buyerName: voucher.buyerName,
              recipientEmail: voucher.recipientEmail || "",
              recipientName: voucher.recipientName,
              amount: voucher.amount,
              orderNumber: voucher.orderNumber,
              message: voucher.message || undefined,
              deliveryMethod: voucher.deliveryMethod as "digital" | "postal",
              purchaseType: voucher.purchaseType as "custom" | "service",
              serviceSnapshotName: voucher.serviceSnapshotName || undefined,
            });
          } catch (emailError) {
            console.error("Error sending emails:", emailError);
          }
        }

        res.json({ success: true, voucher });
      } else {
        res.json({ success: false, message: "Payment not completed" });
      }
    } catch (error: any) {
      console.error("Error verifying checkout session:", error);
      res.status(500).json({ 
        error: "Error verifying checkout session: " + error.message 
      });
    }
  });

  // Stripe Payment Intent endpoint for embedded checkout
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { voucherId } = req.body;
      
      if (!voucherId) {
        return res.status(400).json({ error: "Missing voucherId" });
      }

      // Fetch the voucher to get the actual amount and type
      const voucher = await storage.getVoucher(voucherId);
      if (!voucher) {
        return res.status(404).json({ error: "Voucher not found" });
      }

      let amount = voucher.amount;
      if (amount <= 0) {
        return res.status(400).json({ error: "Invalid voucher amount" });
      }

      // Add shipping cost if delivery method is postal
      if (voucher.deliveryMethod === "postal") {
        amount += 2.90; // Add €2.90 shipping
      }

      // Create description based on voucher type
      let description = "";
      if (voucher.purchaseType === "service") {
        description = `Gutschein - ${voucher.serviceSnapshotName}`;
      } else {
        description = `Gutschein - Freier Betrag (€${voucher.amount})`;
      }

      if (voucher.deliveryMethod === "postal") {
        description += " (inkl. Versand)";
      }

      // Create Stripe Payment Intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Amount in cents
        currency: "eur",
        automatic_payment_methods: {
          enabled: true, // Enables all available payment methods
        },
        metadata: {
          voucherId: voucherId,
          orderNumber: voucher.orderNumber,
        },
        description: description,
      });

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        amount: amount
      });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ 
        error: "Error creating payment intent: " + error.message 
      });
    }
  });

  // Stripe Checkout Session endpoint for vouchers (kept for backwards compatibility)
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { voucherId } = req.body;
      
      if (!voucherId) {
        return res.status(400).json({ error: "Missing voucherId" });
      }

      // Fetch the voucher to get the actual amount and type
      const voucher = await storage.getVoucher(voucherId);
      if (!voucher) {
        return res.status(404).json({ error: "Voucher not found" });
      }

      const amount = voucher.amount;
      if (amount <= 0) {
        return res.status(400).json({ error: "Invalid voucher amount" });
      }

      // Determine which Stripe product to use
      let priceData;
      
      if (voucher.purchaseType === "service" && voucher.serviceId) {
        // For service vouchers, use the service's Stripe product
        const service = await storage.getService(voucher.serviceId);
        
        if (service && service.stripeProductId) {
          // Use the existing product and create a price
          priceData = {
            currency: "eur",
            product: service.stripeProductId,
            unit_amount: Math.round(amount * 100),
          };
        } else {
          // Fallback: create price data on the fly
          priceData = {
            currency: "eur",
            product_data: {
              name: `Gutschein - ${voucher.serviceSnapshotName || "Behandlung"}`,
              description: `Behandlungsgutschein für ${voucher.serviceSnapshotName}`,
            },
            unit_amount: Math.round(amount * 100),
          };
        }
      } else {
        // For custom amount vouchers
        priceData = {
          currency: "eur",
          product_data: {
            name: "Gutschein - Freier Betrag",
            description: `Wertgutschein über €${amount}`,
          },
          unit_amount: Math.round(amount * 100),
        };
      }

      // Build line items array
      const lineItems: any[] = [
        {
          price_data: priceData,
          quantity: 1,
        },
      ];

      // Add shipping cost if delivery method is postal
      if (voucher.deliveryMethod === "postal") {
        lineItems.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: "Versand",
              description: "Postalischer Versand des Gutscheins",
            },
            unit_amount: 290, // €2.90 in cents
          },
          quantity: 1,
        });
      }

      // Create Stripe Checkout Session
      // Note: Additional payment methods can be enabled in the Stripe Dashboard
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: lineItems,
        metadata: {
          voucherId: voucherId,
        },
        success_url: `${req.headers.origin}/gutscheine?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/gutscheine?canceled=true`,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ 
        error: "Error creating checkout session: " + error.message 
      });
    }
  });

  // Stripe webhook for payment confirmation and automatic email sending
  app.post("/api/stripe-webhook", async (req, res) => {
    try {
      const event = req.body;

      // Handle Stripe Checkout Session completion
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const voucherId = session.metadata?.voucherId;

        if (!voucherId) {
          console.error("No voucherId in checkout session metadata");
          return res.json({ received: true });
        }

        // Update voucher payment status
        const voucher = await storage.updateVoucherPaymentStatus(voucherId, "paid");
        
        if (!voucher) {
          console.error(`Voucher ${voucherId} not found`);
          return res.json({ received: true });
        }

        console.log(`Payment successful for voucher ${voucherId} via Checkout Session, sending emails...`);

        // Send emails only if EMAIL credentials are configured
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
          try {
            // Send voucher email to recipient (only for digital vouchers)
            if (voucher.deliveryMethod === "digital" && voucher.recipientEmail) {
              await sendVoucherEmail({
                recipientEmail: voucher.recipientEmail,
                recipientName: voucher.recipientName,
                buyerName: voucher.buyerName,
                amount: voucher.amount,
                orderNumber: voucher.orderNumber,
                message: voucher.message || undefined,
                deliveryMethod: voucher.deliveryMethod as "digital" | "postal",
                purchaseType: voucher.purchaseType as "custom" | "service",
                serviceSnapshotName: voucher.serviceSnapshotName || undefined,
              });
              console.log(`Voucher email sent to ${voucher.recipientEmail}`);
            }

            // Send confirmation email to buyer
            await sendPurchaseConfirmationEmail({
              buyerEmail: voucher.buyerEmail,
              buyerName: voucher.buyerName,
              recipientEmail: voucher.recipientEmail || "",
              recipientName: voucher.recipientName,
              amount: voucher.amount,
              orderNumber: voucher.orderNumber,
              message: voucher.message || undefined,
              deliveryMethod: voucher.deliveryMethod as "digital" | "postal",
              purchaseType: voucher.purchaseType as "custom" | "service",
              serviceSnapshotName: voucher.serviceSnapshotName || undefined,
            });
            console.log(`Confirmation email sent to ${voucher.buyerEmail}`);
          } catch (emailError) {
            console.error("Error sending emails:", emailError);
            // Don't fail the webhook if email fails
          }
        } else {
          console.log("Email credentials not configured, skipping email sending");
        }
      }

      res.json({ received: true });
    } catch (error: any) {
      console.error("Webhook error:", error);
      res.status(400).json({ error: "Webhook error: " + error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
