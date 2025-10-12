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
      const validatedData = insertVoucherSchema.parse(req.body);
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

  // Stripe payment intent endpoint for vouchers
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { voucherId } = req.body;
      
      if (!voucherId) {
        return res.status(400).json({ error: "Missing voucherId" });
      }

      // Fetch the voucher to get the actual amount
      const voucher = await storage.getVoucher(voucherId);
      if (!voucher) {
        return res.status(404).json({ error: "Voucher not found" });
      }

      const amount = voucher.amount;
      if (amount <= 0) {
        return res.status(400).json({ error: "Invalid voucher amount" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert EUR to cents
        currency: "eur",
        metadata: {
          voucherId: voucherId,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ 
        error: "Error creating payment intent: " + error.message 
      });
    }
  });

  // Stripe webhook for payment confirmation and automatic email sending
  app.post("/api/stripe-webhook", async (req, res) => {
    try {
      const event = req.body;

      // Handle payment success
      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const voucherId = paymentIntent.metadata.voucherId;

        if (!voucherId) {
          console.error("No voucherId in payment intent metadata");
          return res.json({ received: true });
        }

        // Update voucher payment status
        const voucher = await storage.updateVoucherPaymentStatus(voucherId, "paid");
        
        if (!voucher) {
          console.error(`Voucher ${voucherId} not found`);
          return res.json({ received: true });
        }

        console.log(`Payment successful for voucher ${voucherId}, sending emails...`);

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
