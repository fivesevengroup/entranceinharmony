import { type User, type InsertUser, type Voucher, type InsertVoucher } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createVoucher(voucher: InsertVoucher): Promise<Voucher>;
  getVoucher(id: string): Promise<Voucher | undefined>;
  getVoucherByOrderNumber(orderNumber: string): Promise<Voucher | undefined>;
  updateVoucherPaymentStatus(id: string, status: string, paypalOrderId?: string): Promise<Voucher | undefined>;
  getAllVouchers(): Promise<Voucher[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private vouchers: Map<string, Voucher>;

  constructor() {
    this.users = new Map();
    this.vouchers = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createVoucher(insertVoucher: InsertVoucher): Promise<Voucher> {
    const id = randomUUID();
    const voucher: Voucher = {
      ...insertVoucher,
      id,
      recipientEmail: insertVoucher.recipientEmail ?? null,
      recipientAddress: insertVoucher.recipientAddress ?? null,
      message: insertVoucher.message ?? null,
      paymentStatus: insertVoucher.paymentStatus ?? "pending",
      paypalOrderId: insertVoucher.paypalOrderId ?? null,
      createdAt: new Date(),
    };
    this.vouchers.set(id, voucher);
    return voucher;
  }

  async getVoucher(id: string): Promise<Voucher | undefined> {
    return this.vouchers.get(id);
  }

  async getVoucherByOrderNumber(orderNumber: string): Promise<Voucher | undefined> {
    return Array.from(this.vouchers.values()).find(
      (voucher) => voucher.orderNumber === orderNumber,
    );
  }

  async updateVoucherPaymentStatus(id: string, status: string, paypalOrderId?: string): Promise<Voucher | undefined> {
    const voucher = this.vouchers.get(id);
    if (!voucher) return undefined;

    const updatedVoucher: Voucher = {
      ...voucher,
      paymentStatus: status,
      paypalOrderId: paypalOrderId || voucher.paypalOrderId,
    };
    this.vouchers.set(id, updatedVoucher);
    return updatedVoucher;
  }

  async getAllVouchers(): Promise<Voucher[]> {
    return Array.from(this.vouchers.values());
  }
}

export const storage = new MemStorage();
