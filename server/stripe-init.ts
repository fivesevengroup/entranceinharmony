import Stripe from "stripe";
import { storage } from "./storage.js";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is required");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-09-30.clover",
});

export async function initializeStripeProducts() {
  console.log("Initializing Stripe products...");
  
  try {
    // 1. Create or get "Custom Amount Voucher" product
    const customVoucherProduct = await createOrGetStripeProduct({
      name: "Gutschein - Freier Betrag",
      description: "Wertgutschein für Entrance in Harmony - Beliebiger Betrag",
      metadata: {
        type: "custom_voucher",
      },
    });
    
    console.log(`✅ Custom voucher product: ${customVoucherProduct.id}`);
    
    // 2. Create products for all services
    const services = await storage.getServices();
    
    for (const service of services) {
      // Skip if product already created
      if (service.stripeProductId) {
        console.log(`⏭️  Service "${service.name}" already has product ${service.stripeProductId}`);
        continue;
      }
      
      // Create Stripe product for this service
      const product = await createOrGetStripeProduct({
        name: `Gutschein - ${service.name}`,
        description: service.shortDescription || `Behandlungsgutschein für ${service.name}`,
        metadata: {
          type: "service_voucher",
          serviceId: service.id,
          serviceName: service.name,
        },
      });
      
      // Create a price for this product
      const price = await stripe.prices.create({
        product: product.id,
        currency: "eur",
        unit_amount: service.price * 100, // Convert EUR to cents
      });
      
      // Update service with Stripe product ID
      await storage.updateServiceStripeProductId(service.id, product.id);
      
      console.log(`✅ Created product for "${service.name}": ${product.id} (Price: €${service.price})`);
    }
    
    console.log("✅ Stripe products initialization complete!");
    
    return {
      customVoucherProductId: customVoucherProduct.id,
    };
  } catch (error) {
    console.error("❌ Error initializing Stripe products:", error);
    throw error;
  }
}

async function createOrGetStripeProduct(params: {
  name: string;
  description: string;
  metadata: Record<string, string>;
}): Promise<Stripe.Product> {
  // Check if product already exists by metadata
  const existingProducts = await stripe.products.list({
    limit: 100,
  });
  
  const existing = existingProducts.data.find(
    (p) => p.metadata.type === params.metadata.type && 
           (params.metadata.serviceId ? p.metadata.serviceId === params.metadata.serviceId : true)
  );
  
  if (existing) {
    console.log(`Product already exists: ${existing.name}`);
    return existing;
  }
  
  // Create new product
  const product = await stripe.products.create({
    name: params.name,
    description: params.description,
    metadata: params.metadata,
  });
  
  return product;
}

export { stripe };
