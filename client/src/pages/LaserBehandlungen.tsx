import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Check, MessageCircle, Zap, Shield, Sparkles, ChevronDown, Star, Clock, Eye, Heart, Users, Award, ArrowRight } from "lucide-react";
import laserImage1 from "@assets/generated_images/Red_Touch_laser_with_goggles_86dab14d.png";
import laserImage2 from "@assets/generated_images/Red_Touch_laser_treatment_4f8328f9.png";
import laserImage3 from "@assets/generated_images/Red_laser_therapy_bf6d9b43.png";
import skinResultImage from "@assets/generated_images/Before_after_skin_treatment_60b501b9.png";
import dekaLogo from "@assets/deka-logo.png";
import redtouchLogo from "@assets/redtouchpro-logo.png";

const laserTreatments = [
  { id: "gesicht", title: "Gesicht", description: "Hautverjüngung, Straffung und Kollagenstimulation für ein jugendliches, strahlendes Hautbild.", price: "250\u20AC", image: laserImage1 },
  { id: "gesicht-hals", title: "Gesicht + Hals", description: "Erweiterte Behandlung für Gesicht und Hals \u2013 für eine nahtlose, gleichmäßige Hautverjüngung.", price: "300\u20AC", image: laserImage2 },
  { id: "gesicht-hals-dekollete", title: "Gesicht + Hals + Dekollet\u00E9", description: "Die umfassende Premium-Behandlung für Gesicht, Hals und Dekollet\u00E9 \u2013 maximale Ergebnisse.", price: "350\u20AC", image: laserImage3 },
  { id: "haende", title: "Hände (Handrücken)", description: "Gezielte Laserbehandlung der Handrücken für glatte, verjüngte Haut.", price: "90\u20AC", image: skinResultImage },
  { id: "haende-arme", title: "Hände + Arme bis zum Ellbogen", description: "Umfassende Behandlung von den Händen bis zum Ellbogen für ein ebenmäßiges Hautbild.", price: "350\u20AC", image: laserImage2 },
  { id: "oberarme", title: "Oberarme (Ellbogen bis Schulter)", description: "Straffung und Hautverjüngung der Oberarme vom Ellbogen bis zur Schulter.", price: "350\u20AC", image: laserImage3 },
];

const technologyBenefits = [
  { icon: Zap, title: "675-nm-Wellenlänge", text: "Gezielte Kollagenstimulation in den tieferen Hautschichten" },
  { icon: Heart, title: "Sanft & angenehm", text: "Angenehmes Wärmegefühl, meist ohne Betäubung nötig" },
  { icon: Shield, title: "Nicht-invasiv", text: "Keine Verletzung der Hautoberfläche, keine Nadeln" },
  { icon: Clock, title: "Kurze Behandlung", text: "Ca. 40 Minuten Behandlungsdauer im Gesicht" },
  { icon: Eye, title: "Sofort alltagstauglich", text: "Minimale Ausfallzeit, leichte Rötung klingt schnell ab" },
  { icon: Award, title: "Medizinisch fundiert", text: "Moderne, wissenschaftlich basierte Lasertechnologie" },
];

const faceNeckBenefits = [
  "Glättung feiner Linien und Knitterfältchen",
  "Verbesserung der Hautstruktur und Porenverfeinerung",
  "Ausgleich eines unruhigen Teints",
  "Milderung von Pickelmalen und Unebenheiten",
  "Mehr Frische und natürlicher Glow",
];

const decolleteBenefits = [
  "Verbesserung lichtbedingter Hautveränderungen",
  "Straffung und Glättung der Hautstruktur",
];

const bodyBenefits = [
  "Verfeinerung von Dehnungsstreifen (Striae)",
  "Kosmetische Verbesserung oberflächlicher Narben",
  "Straffung bei leichter Hauterschlaffung",
];

const targetGroups = [
  "Bei feinen Linien und beginnender Hautalterung",
  "Bei Spannkraftverlust und unruhiger Hautstruktur",
  "Bei vergrößerten Poren oder fahlem Teint",
  "Für alle, die eine Alternative zu invasiven Eingriffen suchen",
  "Für anspruchsvolle Kundinnen mit Fokus auf natürliche Ergebnisse",
];

const processSteps = [
  { step: 1, title: "Individuelle Beratung & Hautanalyse", description: "Analyse des Hautzustands, Definition der Behandlungsziele und individuelle Einstellung des Lasers.", icon: MessageCircle },
  { step: 2, title: "Die Behandlung", description: "Behandlungsdauer ca. 40 Minuten im Gesicht. Angenehmes Wärmegefühl, meist ohne Betäubung.", icon: Zap },
  { step: 3, title: "Nach der Behandlung", description: "Leichte Rötung oder Bräunung möglich, meist innerhalb von 24\u201348 Stunden rückläufig. In der Regel sofort gesellschaftsfähig.", icon: Shield },
];

const reviews = [
  { name: "Sabine M.", location: "Siegen", rating: 5, text: "Nach nur zwei Sitzungen sehe ich einen deutlichen Unterschied. Meine Haut fühlt sich straffer an und der Teint ist viel gleichmäßiger. Kann ich nur weiterempfehlen!", date: "November 2025" },
  { name: "Claudia R.", location: "Burbach", rating: 5, text: "Ich hatte etwas Bedenken vor der Laserbehandlung, aber es war wirklich angenehm. Das Wärmegefühl war sogar entspannend. Die Ergebnisse nach drei Sitzungen sind beeindruckend.", date: "Dezember 2025" },
  { name: "Petra K.", location: "Neunkirchen", rating: 5, text: "Endlich eine Behandlung, die wirklich hält was sie verspricht. Meine Nasolabialfalten sind sichtbar glatter und meine Poren feiner. Elena berät zudem sehr ehrlich und kompetent.", date: "Januar 2026" },
  { name: "Monika L.", location: "Wilnsdorf", rating: 5, text: "Die Behandlung meiner Dehnungsstreifen hat mich positiv überrascht. Nach dem dritten Termin sind sie deutlich blasser und die Hautstruktur hat sich spürbar verbessert.", date: "Oktober 2025" },
];

const faqs = [
  { q: "Ist die Red Touch Pro Behandlung schmerzhaft?", a: "Nein, die Behandlung ist sanft und angenehm. Die meisten Kundinnen beschreiben ein warmes, leicht prickelndes Gefühl auf der Haut. Eine Betäubung ist in der Regel nicht notwendig." },
  { q: "Wie viele Sitzungen sind notwendig?", a: "Für optimale Ergebnisse empfehlen wir 3\u20134 Behandlungen im Abstand von mehreren Wochen. Erste Verbesserungen sind häufig bereits nach der ersten Sitzung sichtbar. Der Kollagenaufbau entwickelt sich natürlich über die Zeit." },
  { q: "Gibt es Ausfallzeit nach der Behandlung?", a: "Die Ausfallzeit ist minimal. Eine leichte Rötung oder Bräunung der behandelten Stellen ist möglich und klingt meist innerhalb von 24\u201348 Stunden ab. Sie sind in der Regel sofort wieder gesellschaftsfähig." },
  { q: "Für welche Hauttypen ist die Behandlung geeignet?", a: "Red Touch Pro eignet sich für verschiedene Hauttypen. In einem persönlichen Beratungsgespräch analysieren wir Ihren individuellen Hautzustand und besprechen, ob die Behandlung für Sie geeignet ist." },
  { q: "Kann die Laserbehandlung mit anderen Behandlungen kombiniert werden?", a: "Ja, Red Touch Pro lässt sich hervorragend mit Medical Peelings, Skinboostern oder Microneedling kombinieren. Wir erstellen Ihnen gerne einen individuellen Behandlungsplan." },
  { q: "Ab welchem Alter ist die Behandlung sinnvoll?", a: "Die Behandlung eignet sich generell ab dem 30. Lebensjahr, wenn erste Zeichen der Hautalterung sichtbar werden. Grundsätzlich gibt es keine strikte Altersgrenze \u2013 entscheidend ist der individuelle Hautzustand." },
  { q: "Was kostet eine Red Touch Pro Behandlung?", a: "Die Preise variieren je nach Behandlungsareal. Eine Gesichtsbehandlung kostet 250\u20AC, Gesicht + Hals 300\u20AC und Gesicht + Hals + Dekollet\u00E9 350\u20AC. Handrücken sind ab 90\u20AC möglich. In einem Beratungsgespräch erstellen wir Ihnen gerne ein individuelles Angebot." },
  { q: "Welche Technologie steckt hinter Red Touch Pro?", a: "Red Touch Pro nutzt eine 675-nm-Wellenlänge zur gezielten Stimulation der Kollagenproduktion in den tieferen Hautschichten. Die Technologie stammt von DEKA, einem der weltweit führenden Hersteller medizinischer Lasersysteme." },
];

const trustPoints = [
  "Moderne, wissenschaftlich fundierte Lasertechnologie",
  "Natürliche Ergebnisse ohne künstlichen Effekt",
  "Ganzheitlicher Ansatz für Hautgesundheit",
  "Transparente Beratung und realistische Erwartungen",
  "Zertifizierte DEKA-Technologie aus Italien",
  "Individuelle Behandlungspläne für Ihre Hautbedürfnisse",
];

export default function LaserBehandlungen() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Red Touch Pro Laser \u2013 Moderne Hautverjüngung ohne OP | Entrance in Harmony";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Sanfte Laser-Hautverjüngung mit Red Touch Pro in Burbach. Sichtbare Straffung, verfeinerte Hautstruktur und mehr Glow \u2013 ohne OP und mit minimaler Ausfallzeit. Jetzt Beratung vereinbaren.");
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:title");
      meta.setAttribute("content", "Red Touch Pro Laser \u2013 Moderne Hautverjüngung ohne OP");
      document.head.appendChild(meta);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:description");
      meta.setAttribute("content", "Sanfte Laser-Hautverjüngung mit Red Touch Pro. Sichtbare Straffung, verfeinerte Hautstruktur und mehr Glow.");
      document.head.appendChild(meta);
    }
    return () => {
      document.title = "Entrance in Harmony - Beauty & Aesthetics";
      const metaD = document.querySelector('meta[name="description"]');
      if (metaD) {
        metaD.setAttribute("content", "Entrance in Harmony - Beauty & Aesthetics in Harmonie mit Elena Hartstein. Professionelle Gesichts- und Körperbehandlungen für Ihre Schönheit und Wohlbefinden.");
      }
      const ogT = document.querySelector('meta[property="og:title"]');
      if (ogT) ogT.remove();
      const ogD = document.querySelector('meta[property="og:description"]');
      if (ogD) ogD.remove();
    };
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-laser">
      <Header transparent />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden" data-testid="section-laser-hero">
        <div className="absolute inset-0">
          <img src={laserImage1} alt="Red Touch Pro Laserbehandlung für Hautverjüngung in Burbach" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center py-20">
          <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 px-5 py-2 text-sm backdrop-blur-sm">
            <Zap className="w-4 h-4 mr-2 text-primary" />
            DEKA Lasertechnologie
          </Badge>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-white mb-6 drop-shadow-lg fade-up leading-tight" style={{ opacity: 0, animationDelay: "0.3s" }}>
            Red Touch Pro Laser &ndash;<br className="hidden md:block" /> Moderne Hautverjüngung für<br className="hidden md:block" /> straffe, glatte Haut
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-10 drop-shadow-md fade-up leading-relaxed" style={{ opacity: 0, animationDelay: "0.6s" }}>
            Nicht-invasive Laserbehandlung zur gezielten Kollagenstimulation &ndash; sanft, effektiv und alltagstauglich.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-up" style={{ opacity: 0, animationDelay: "0.9s" }}>
            <Button size="lg" className="text-sm px-10 bg-primary text-primary-foreground border-primary font-serif uppercase tracking-widest" asChild data-testid="button-laser-hero-cta">
              <a href="https://wa.me/491709287722?text=Hallo,%20ich%20interessiere%20mich%20für%20eine%20Laserbehandlung%20mit%20Red%20Touch%20Pro%20und%20hätte%20gerne%20eine%20individuelle%20Beratung." target="_blank" rel="noopener noreferrer">
                Jetzt Beratung vereinbaren
              </a>
            </Button>
            <Button variant="outline" size="lg" className="text-sm px-10 text-white border-white/30 font-serif uppercase tracking-widest backdrop-blur-sm" asChild data-testid="button-laser-hero-more">
              <a href="#technologie">
                Mehr erfahren
              </a>
            </Button>
          </div>
        </div>
        <WaveDivider position="bottom" color="hsl(var(--background))" />
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-16 md:py-24 bg-background" data-testid="section-problem">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
                  Wenn Pflege allein nicht mehr ausreicht
                </h2>
                <div className="h-0.5 w-16 gold-shimmer rounded-full mb-6"></div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Mit zunehmendem Alter verliert die Haut an Kollagen. Spannkraft nimmt ab, feine Linien entstehen und der Teint wirkt unruhig. Klassische Pflegeprodukte können diese Prozesse nur begrenzt beeinflussen.
                </p>
                <p className="text-foreground/80 leading-relaxed font-medium">
                  Die Red Touch Pro Laserbehandlung setzt gezielt dort an, wo Hautstruktur und Elastizität entstehen &ndash; im Kollagen.
                </p>
              </div>
              <div className="relative">
                <img src={skinResultImage} alt="Sichtbare Hautverjüngung durch Red Touch Pro Laser - Vorher Nachher" className="w-full h-auto object-cover rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY SECTION */}
      <section id="technologie" className="py-16 md:py-24 bg-section-accent" data-testid="section-technology">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
              Was macht den Red Touch Pro Laser besonders?
            </h2>
            <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Modernste 675-nm-Lasertechnologie von DEKA für gezielte, nachhaltige Kollagenstimulation
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {technologyBenefits.map((item, i) => (
              <Card key={i} data-testid={`card-tech-${i}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TARGET GROUP */}
      <section className="py-16 md:py-24 bg-background" data-testid="section-target">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <img src={laserImage3} alt="Red Touch Pro Laserbehandlung geeignet für verschiedene Hautprobleme" className="w-full h-auto object-cover rounded-lg shadow-lg" />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
                  Für wen ist die Behandlung geeignet?
                </h2>
                <div className="h-0.5 w-16 gold-shimmer rounded-full mb-6"></div>
                <ul className="space-y-4">
                  {targetGroups.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 shrink-0 w-5 h-5 rounded-full border border-primary/40 flex items-center justify-center bg-primary/10">
                        <Check className="w-3 h-3 text-primary" />
                      </span>
                      <span className="text-foreground/80 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TREATMENT AREAS */}
      <section className="py-16 md:py-24 bg-section-accent" data-testid="section-areas">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
              Behandlungsareale & Einsatzmöglichkeiten
            </h2>
            <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-6"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card data-testid="card-area-face">
              <CardContent className="p-6">
                <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-medium mb-4">Gesicht & Hals</h3>
                <ul className="space-y-2">
                  {faceNeckBenefits.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card data-testid="card-area-decollete">
              <CardContent className="p-6">
                <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-medium mb-4">Dekollet&eacute;</h3>
                <ul className="space-y-2">
                  {decolleteBenefits.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card data-testid="card-area-body">
              <CardContent className="p-6">
                <div className="w-12 h-12 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-medium mb-4">Körper</h3>
                <ul className="space-y-2">
                  {bodyBenefits.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 md:py-24 bg-background" data-testid="section-process">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
              So läuft die Red Touch Pro Behandlung ab
            </h2>
            <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-6"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {processSteps.map((step) => (
                <div key={step.step} className="text-center" data-testid={`step-${step.step}`}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center relative">
                    <step.icon className="w-7 h-7 text-primary" />
                    <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-medium mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS & COMBINATIONS */}
      <section className="py-16 md:py-24 bg-section-accent" data-testid="section-results">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
                  Ergebnisse & Behandlungsplan
                </h2>
                <div className="h-0.5 w-16 gold-shimmer rounded-full mb-6"></div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Erste Hautverbesserungen sind häufig bereits nach der ersten Sitzung sichtbar. Für optimale Ergebnisse werden meist 3&ndash;4 Behandlungen im Abstand von mehreren Wochen empfohlen.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Die Hautstraffung entwickelt sich natürlich über die Zeit durch Neubildung von Kollagen. Für ein noch umfassenderes Ergebnis kann die Behandlung kombiniert werden mit:
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Medical Peelings", "Skinbooster", "Infusionen", "RF-Microneedling"].map((item) => (
                    <Badge key={item} variant="secondary" className="px-4 py-2 text-sm">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <img src={laserImage2} alt="Red Touch Pro Laser Behandlungsergebnis - straffere Haut" className="w-full h-auto object-cover rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 md:py-24 bg-background" data-testid="section-pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
              Preisübersicht
            </h2>
            <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Wählen Sie die passende Behandlung für Ihren Wunschbereich
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {laserTreatments.map((treatment) => (
              <Card key={treatment.id} className="overflow-hidden hover-elevate transition-all" data-testid={`card-laser-${treatment.id}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={treatment.image} alt={`Red Touch Pro Laserbehandlung ${treatment.title}`} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-light mb-2" data-testid={`text-laser-title-${treatment.id}`}>{treatment.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{treatment.description}</p>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <span className="text-2xl font-medium text-primary" data-testid={`text-laser-price-${treatment.id}`}>{treatment.price}</span>
                    <Button size="sm" className="text-xs uppercase tracking-wider font-serif" asChild data-testid={`button-laser-book-${treatment.id}`}>
                      <a href={`https://wa.me/491709287722?text=Hallo,%20ich%20möchte%20gerne%20einen%20Termin%20für%20eine%20Laserbehandlung%20(${encodeURIComponent(treatment.title)})%20buchen.`} target="_blank" rel="noopener noreferrer">
                        Termin buchen
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 md:py-24 bg-section-accent" data-testid="section-reviews">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
              Das sagen unsere Kundinnen
            </h2>
            <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Echte Erfahrungsberichte unserer zufriedenen Kundinnen
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {reviews.map((review, i) => (
              <Card key={i} data-testid={`card-review-${i}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-foreground/80 leading-relaxed mb-4 italic">
                    &bdquo;{review.text}&ldquo;
                  </p>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <p className="font-medium text-sm">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.location}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-background" data-testid="section-faq">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
              Häufig gestellte Fragen
            </h2>
            <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-6"></div>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border/50 rounded-lg overflow-hidden" data-testid={`faq-item-${i}`}>
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover-elevate transition-all"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  data-testid={`button-faq-${i}`}
                >
                  <span className="font-medium text-sm md:text-base pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className="overflow-hidden transition-all duration-200"
                  style={{ maxHeight: openFaq === i ? "500px" : "0", opacity: openFaq === i ? 1 : 0 }}
                >
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-faq-answer-${i}`}>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-16 md:py-20 bg-section-accent" data-testid="section-partners">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-4">
              Unsere Technologiepartner
            </h2>
            <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Wir arbeiten ausschließlich mit weltweit führenden Herstellern medizinischer Lasertechnologie
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 max-w-3xl mx-auto">
            <div className="text-center" data-testid="partner-deka">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-border/30 mb-3">
                <img src={dekaLogo} alt="DEKA Lasertechnologie - Partner von Entrance in Harmony" className="h-16 md:h-20 w-auto object-contain mx-auto" />
              </div>
              <p className="text-xs text-muted-foreground">Medizinische Lasersysteme</p>
            </div>
            <div className="text-center" data-testid="partner-redtouch">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-border/30 mb-3">
                <img src={redtouchLogo} alt="Red Touch Pro - Laser Hautverjüngung Partner" className="h-16 md:h-20 w-auto object-contain mx-auto" />
              </div>
              <p className="text-xs text-muted-foreground">Laser-Hautverjüngung</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-16 md:py-24 bg-background" data-testid="section-trust">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
                  Warum diese Behandlung?
                </h2>
                <div className="h-0.5 w-16 gold-shimmer rounded-full mb-6"></div>
                <ul className="space-y-4">
                  {trustPoints.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 shrink-0 w-5 h-5 rounded-full border border-primary/40 flex items-center justify-center bg-primary/10">
                        <Check className="w-3 h-3 text-primary" />
                      </span>
                      <span className="text-foreground/80 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-muted/30 rounded-lg p-8">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="font-serif text-4xl font-light text-primary mb-2">5.0</p>
                  <p className="text-sm text-muted-foreground mb-4">Durchschnittliche Kundenbewertung</p>
                  <div className="h-px w-16 mx-auto bg-border mb-4"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-serif text-2xl font-light text-primary">100%</p>
                      <p className="text-xs text-muted-foreground">Kundenzufriedenheit</p>
                    </div>
                    <div>
                      <p className="font-serif text-2xl font-light text-primary">3&ndash;4</p>
                      <p className="text-xs text-muted-foreground">Sitzungen empfohlen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 bg-section-accent" data-testid="section-cta-final">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
              Bereit für ein frischeres Hautbild?
            </h2>
            <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              Vereinbaren Sie jetzt Ihren persönlichen Beratungstermin und erfahren Sie, wie Red Touch Pro&reg; Ihre Haut sichtbar verjüngen kann.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#25D366] text-white border-[#25BA5A] px-8" asChild data-testid="button-laser-cta-bottom">
                <a href="https://wa.me/491709287722?text=Hallo,%20ich%20interessiere%20mich%20für%20eine%20Laserbehandlung%20mit%20Red%20Touch%20Pro%20und%20hätte%20gerne%20eine%20individuelle%20Beratung." target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Individuelle Beratung buchen
                </a>
              </Button>
              <Button variant="outline" size="lg" className="px-8" asChild data-testid="button-laser-cta-services">
                <a href="/leistungen" className="flex items-center gap-2">
                  <span>Alle Behandlungen ansehen</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-8 bg-background border-t border-border/30" data-testid="section-disclaimer">
        <div className="container mx-auto px-4">
          <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
            Diese Behandlung dient der kosmetischen Verbesserung des Hautbildes und ersetzt keine medizinische Beratung. Es handelt sich um kein Heilversprechen. Ergebnisse können individuell variieren.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
