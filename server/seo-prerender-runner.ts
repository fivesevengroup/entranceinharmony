import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ROUTES, injectSEO } from "./seo-prerender";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "public");
const templatePath = path.resolve(distPath, "index.html");

function run() {
  if (!fs.existsSync(templatePath)) {
    console.error(`Template not found: ${templatePath}`);
    console.error("Run 'vite build' first.");
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, "utf-8");
  const routes = Object.entries(ROUTES);
  let count = 0;

  console.log(`Pre-rendering ${routes.length} routes into dist/public/ ...`);

  for (const [routePath, config] of routes) {
    const html = injectSEO(template, config, routePath);

    if (routePath === "/") {
      fs.writeFileSync(templatePath, html, "utf-8");
      console.log(`  / -> dist/public/index.html (overwritten)`);
      count++;
      continue;
    }

    const slug = routePath.slice(1);
    const dir = path.resolve(distPath, slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.resolve(dir, "index.html"), html, "utf-8");
    console.log(`  ${routePath} -> dist/public/${slug}/index.html`);
    count++;
  }

  console.log(`\nPre-rendered ${count} HTML pages with SEO content.`);

  const samplePath = path.resolve(distPath, "gesichtsbehandlungen", "index.html");
  if (fs.existsSync(samplePath)) {
    const sample = fs.readFileSync(samplePath, "utf-8");
    const hasTitle = /<title>[^<]+<\/title>/i.test(sample);
    const hasH1 = /<h1[^>]*>[^<]+/i.test(sample);
    const hasJsonLd = sample.includes("application/ld+json");
    const hasCanonical = sample.includes('rel="canonical"');
    console.log("\nVerification (gesichtsbehandlungen):");
    console.log(`  Title tag: ${hasTitle ? "OK" : "FAIL"}`);
    console.log(`  H1 content: ${hasH1 ? "OK" : "FAIL"}`);
    console.log(`  JSON-LD: ${hasJsonLd ? "OK" : "FAIL"}`);
    console.log(`  Canonical: ${hasCanonical ? "OK" : "FAIL"}`);
  }
}

run();
