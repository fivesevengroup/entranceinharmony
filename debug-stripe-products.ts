import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is required");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-09-30.clover",
});

async function listAllStripeProducts() {
  console.log("\n🔍 Fetching all Stripe products...\n");
  
  const products = await stripe.products.list({
    limit: 100,
    active: true,
  });
  
  console.log(`Found ${products.data.length} active products:\n`);
  
  products.data.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name}`);
    console.log(`   ID: ${product.id}`);
    console.log(`   Description: ${product.description || 'N/A'}`);
    console.log(`   Metadata:`, product.metadata);
    console.log('');
  });
  
  // Also list prices for each product
  console.log("\n💰 Prices for each product:\n");
  
  for (const product of products.data) {
    const prices = await stripe.prices.list({
      product: product.id,
      active: true,
    });
    
    if (prices.data.length > 0) {
      console.log(`${product.name}:`);
      prices.data.forEach(price => {
        const amount = price.unit_amount ? `€${(price.unit_amount / 100).toFixed(2)}` : 'N/A';
        console.log(`  - ${amount} (${price.id})`);
      });
      console.log('');
    }
  }
}

listAllStripeProducts().catch(console.error);
