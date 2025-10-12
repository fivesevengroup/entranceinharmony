import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  shortDescription: text("short_description"),
  durationMinutes: integer("duration_minutes"),
  price: integer("price").notNull(),
  stripeProductId: text("stripe_product_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
});

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export const vouchers = pgTable("vouchers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderNumber: text("order_number").notNull().unique(),
  purchaseType: text("purchase_type").notNull().default("custom"),
  amount: integer("amount").notNull(),
  serviceId: varchar("service_id"),
  serviceSnapshotName: text("service_snapshot_name"),
  serviceSnapshotPrice: integer("service_snapshot_price"),
  deliveryMethod: text("delivery_method").notNull(),
  recipientName: text("recipient_name").notNull(),
  recipientEmail: text("recipient_email"),
  recipientAddress: text("recipient_address"),
  buyerName: text("buyer_name").notNull(),
  buyerEmail: text("buyer_email").notNull(),
  message: text("message"),
  paymentStatus: text("payment_status").notNull().default("pending"),
  paypalOrderId: text("paypal_order_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVoucherSchema = createInsertSchema(vouchers)
  .omit({
    id: true,
    createdAt: true,
    serviceSnapshotName: true,
    serviceSnapshotPrice: true,
  })
  .refine(
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
  )
  .refine(
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
  )
  .refine(
    (data) => {
      if (data.purchaseType === "service") {
        return !!data.serviceId;
      }
      return true;
    },
    {
      message: "Service-ID ist erforderlich für Behandlungs-Gutscheine",
      path: ["serviceId"],
    }
  );

export type InsertVoucher = z.infer<typeof insertVoucherSchema>;
export type Voucher = typeof vouchers.$inferSelect;

export const updateVoucherPaymentSchema = z.object({
  status: z.enum(["pending", "paid", "completed", "cancelled"]),
  paypalOrderId: z.string().optional(),
});
