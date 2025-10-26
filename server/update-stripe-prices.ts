import { stripe } from "./stripe-init.js";

/**
 * Script zum Aktualisieren von Stripe-Preisen
 * 
 * Stripe-Preise sind unveränderlich. Um einen Preis zu ändern:
 * 1. Neuen Price erstellen mit aktualisiertem Betrag
 * 2. Product's default_price aktualisieren
 * 3. Alten Price als inaktiv markieren
 */

const SERVICES_TO_UPDATE = [
  { name: "Red Touch Pro Laser - Gesicht", newPrice: 250 },
  { name: "Red Touch Pro Laser - Gesicht + Hals", newPrice: 300 },
  { name: "Red Touch Pro Laser - Gesicht + Hals + Dekolleté", newPrice: 350 },
  { name: "Red Touch Pro Laser - Hände (Handrücken)", newPrice: 90 },
  { name: "Microneedling", newPrice: 90 },
  { name: "BB Glow Skin", newPrice: 85 },
  { name: "B-Tox-Peel", newPrice: 85 },
];

async function updateStripePrices() {
  console.log("🔄 Stripe-Preise aktualisieren...\n");

  try {
    // Alle Produkte von Stripe abrufen
    const allProducts = await stripe.products.list({ limit: 100 });

    for (const serviceUpdate of SERVICES_TO_UPDATE) {
      console.log(`\n📦 Suche Produkt: ${serviceUpdate.name}`);

      // Produkt in Stripe finden
      const product = allProducts.data.find(p => p.name === serviceUpdate.name && p.active);
      
      if (!product) {
        console.log(`   ⚠️  Produkt "${serviceUpdate.name}" nicht in Stripe gefunden - übersprungen`);
        continue;
      }

      console.log(`   ✅ Produkt gefunden: ${product.id}`);
      console.log(`   Neuer Preis: €${serviceUpdate.newPrice}`);

      // Alle Preise für dieses Produkt abrufen
      const prices = await stripe.prices.list({
        product: product.id,
        limit: 100,
      });

      // Aktiven Preis finden
      const activePrices = prices.data.filter(p => p.active);
      
      if (activePrices.length === 0) {
        console.log(`   ⚠️  Kein aktiver Preis gefunden`);
      } else {
        const currentPrice = activePrices[0].unit_amount! / 100;
        console.log(`   Aktueller Preis: €${currentPrice}`);
        
        // Wenn Preis bereits korrekt ist, überspringen
        if (currentPrice === serviceUpdate.newPrice) {
          console.log(`   ✅ Preis ist bereits korrekt - übersprungen`);
          continue;
        }
      }

      // Neuen Preis erstellen
      const newPrice = await stripe.prices.create({
        product: product.id,
        currency: "eur",
        unit_amount: serviceUpdate.newPrice * 100, // EUR zu Cents
      });

      console.log(`   ✅ Neuer Preis erstellt: ${newPrice.id} (€${serviceUpdate.newPrice})`);

      // Produkt aktualisieren, um auf neuen Preis zu verweisen
      await stripe.products.update(product.id, {
        default_price: newPrice.id,
      });

      console.log(`   ✅ Produkt default_price aktualisiert`);

      // Alte Preise als inaktiv markieren
      for (const oldPrice of activePrices) {
        if (oldPrice.unit_amount !== serviceUpdate.newPrice * 100) {
          await stripe.prices.update(oldPrice.id, {
            active: false,
          });
          console.log(`   ✅ Alter Preis deaktiviert: ${oldPrice.id} (€${oldPrice.unit_amount! / 100})`);
        }
      }
    }

    console.log("\n\n✅ Alle Stripe-Preise erfolgreich aktualisiert!");
    console.log("\n📋 Zusammenfassung:");
    console.log(`   - ${SERVICES_TO_UPDATE.length} Services verarbeitet`);
    console.log(`   - Neue Preise sind jetzt aktiv`);
    console.log(`   - Alte Preise wurden deaktiviert\n`);

  } catch (error) {
    console.error("\n❌ Fehler beim Aktualisieren der Stripe-Preise:", error);
    throw error;
  }
}

// Script ausführen, wenn direkt aufgerufen
if (import.meta.url === `file://${process.argv[1]}`) {
  updateStripePrices()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { updateStripePrices };
