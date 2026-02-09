import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CookieBanner from "@/components/CookieBanner";
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
import NotFound from "@/pages/not-found";

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
        <FloatingWhatsApp />
        <CookieBanner />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
