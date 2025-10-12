import { type User, type InsertUser, type Voucher, type InsertVoucher, type Service, type InsertService } from "@shared/schema";
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
  getServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateServiceStripeProductId(id: string, stripeProductId: string): Promise<Service | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private vouchers: Map<string, Voucher>;
  private services: Map<string, Service>;

  constructor() {
    this.users = new Map();
    this.vouchers = new Map();
    this.services = new Map();
    
    // Pre-load services/treatments
    this.seedServices();
  }
  
  private seedServices() {
    const defaultServices: Array<Omit<Service, "id" | "createdAt">> = [
      {
        name: "Tiefenreinigung",
        shortDescription: "Reinigung, Peeling, Tiefreinigungsmaske, Ausreinigung, beruhigende Maske und abschließende Pflege",
        durationMinutes: 60,
        price: 85,
        stripeProductId: null,
      },
      {
        name: "Carboxy Therapie",
        shortDescription: "3-Phasen-Reinigung, Carboxy-Maske, Abschlusspflege",
        durationMinutes: 60,
        price: 80,
        stripeProductId: null,
      },
      {
        name: "BB Glow Skin",
        shortDescription: "Reinigung, Needling mit BB Glow Skin Ampulle, Abschlusspflege",
        durationMinutes: 75,
        price: 95,
        stripeProductId: null,
      },
      {
        name: "Microneedling",
        shortDescription: "Reinigung, Peeling, Needling mit Wirkstoffkonzentrat, Maske & LED-Lichttherapie, Abschlusspflege",
        durationMinutes: 90,
        price: 100,
        stripeProductId: null,
      },
      {
        name: "B-Tox-Peel",
        shortDescription: "Reinigung, Peeling, Maske, Wirkstoffampulle",
        durationMinutes: 60,
        price: 90,
        stripeProductId: null,
      },
      {
        name: "Vitalisierende Peelings",
        shortDescription: "Reinigung, Peeling, Abschlusspflege",
        durationMinutes: 45,
        price: 80,
        stripeProductId: null,
      },
      {
        name: "Red Touch Pro Laser - Gesicht",
        shortDescription: "Hautverjüngung, Beseitigung von Hauterschlaffung, Wiederherstellung der Hautelastizität",
        durationMinutes: 60,
        price: 300,
        stripeProductId: null,
      },
      {
        name: "Red Touch Pro Laser - Gesicht + Hals",
        shortDescription: "Hautverjüngung, Beseitigung von Hauterschlaffung, Wiederherstellung der Hautelastizität",
        durationMinutes: 75,
        price: 350,
        stripeProductId: null,
      },
      {
        name: "Red Touch Pro Laser - Gesicht + Hals + Dekolleté",
        shortDescription: "Hautverjüngung, Beseitigung von Hauterschlaffung, Wiederherstellung der Hautelastizität",
        durationMinutes: 90,
        price: 400,
        stripeProductId: null,
      },
      {
        name: "Red Touch Pro Laser - Hände (Handrücken)",
        shortDescription: "Hautverjüngung, Beseitigung von Hauterschlaffung, Wiederherstellung der Hautelastizität",
        durationMinutes: 45,
        price: 100,
        stripeProductId: null,
      },
      {
        name: "Red Touch Pro Laser - Hände + Arme bis zum Ellbogen",
        shortDescription: "Hautverjüngung, Beseitigung von Hauterschlaffung, Wiederherstellung der Hautelastizität",
        durationMinutes: 60,
        price: 350,
        stripeProductId: null,
      },
      {
        name: "Red Touch Pro Laser - Oberarme (vom Ellbogen bis zur Schulter)",
        shortDescription: "Hautverjüngung, Beseitigung von Hauterschlaffung, Wiederherstellung der Hautelastizität",
        durationMinutes: 60,
        price: 350,
        stripeProductId: null,
      },
    ];
    
    defaultServices.forEach((service) => {
      const id = randomUUID();
      this.services.set(id, {
        ...service,
        id,
        createdAt: new Date(),
      });
    });
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
      purchaseType: insertVoucher.purchaseType ?? "custom",
      serviceId: insertVoucher.serviceId ?? null,
      serviceSnapshotName: null,
      serviceSnapshotPrice: null,
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

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = {
      ...insertService,
      id,
      shortDescription: insertService.shortDescription ?? null,
      durationMinutes: insertService.durationMinutes ?? null,
      stripeProductId: insertService.stripeProductId ?? null,
      createdAt: new Date(),
    };
    this.services.set(id, service);
    return service;
  }

  async updateServiceStripeProductId(id: string, stripeProductId: string): Promise<Service | undefined> {
    const service = this.services.get(id);
    if (!service) return undefined;
    
    const updatedService: Service = {
      ...service,
      stripeProductId,
    };
    this.services.set(id, updatedService);
    return updatedService;
  }
}

export const storage = new MemStorage();
