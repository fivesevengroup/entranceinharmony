import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertVoucherSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Voucher routes
  app.post("/api/vouchers", async (req, res) => {
    try {
      const validatedData = insertVoucherSchema.parse(req.body);
      const orderNumber = `VO-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      const voucher = await storage.createVoucher({
        ...validatedData,
        orderNumber,
      });

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
    const { status, paypalOrderId } = req.body;
    const voucher = await storage.updateVoucherPaymentStatus(
      req.params.id,
      status,
      paypalOrderId
    );
    if (!voucher) {
      return res.status(404).json({ error: "Voucher not found" });
    }
    res.json(voucher);
  });

  const httpServer = createServer(app);

  return httpServer;
}
