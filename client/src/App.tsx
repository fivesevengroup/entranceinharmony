import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { CookieConsentProvider } from "@/components/CookieBanner";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Vouchers from "@/pages/Vouchers";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import AGB from "@/pages/AGB";
import Widerruf from "@/pages/Widerruf";
import LaserBehandlungen from "@/pages/LaserBehandlungen";
import SkinProblemPage from "@/pages/SkinProblemPage";
import NotFound from "@/pages/not-found";

const skinProblemSlugs = [
  "akne-behandlung-siegen",
  "akne-narben-behandlung",
  "hautanalyse-burbach",
  "kollagen-aufbau-gesicht",
  "faltenbehandlung-siegerland",
  "pigmentflecken-entfernen",
  "rosazea-behandlung",
  "grossporige-haut-behandlung",
];

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/gesichtsbehandlungen" component={Services} />
      <Route path="/laserbehandlungen" component={LaserBehandlungen} />
      <Route path="/kontakt" component={Contact} />
      <Route path="/gutscheine" component={Vouchers} />
      <Route path="/impressum" component={Impressum} />
      <Route path="/datenschutz" component={Datenschutz} />
      <Route path="/agb" component={AGB} />
      <Route path="/widerruf" component={Widerruf} />
      {skinProblemSlugs.map(slug => (
        <Route key={slug} path={`/${slug}`}>
          {() => <SkinProblemPage slug={slug} />}
        </Route>
      ))}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <Toaster />
        <CookieConsentProvider>
          <FloatingWhatsApp />
          <Router />
        </CookieConsentProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
