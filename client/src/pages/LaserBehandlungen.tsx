import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Check, MessageCircle, ChevronDown, Star, ArrowRight, Sparkles, Shield, Clock, Zap } from "lucide-react";
import heroImg from "@assets/stock_images/laser_hero.jpg";
import resultImg from "@assets/laser_result_woman.png";
import treatmentImg from "@assets/grafik_1770659141702.png";
import smoothImg from "@assets/stock_images/laser_smooth_skin.jpg";
import laserFaceImg from "@assets/laser_face_treatment.png";
import laserDecolletteImg from "@assets/laser_decollete_treatment.png";
import laserBodyImg from "@assets/laser_body_treatment.png";
import beautyProfileImg from "@assets/stock_images/beauty_profile_golden.jpg";
import dekaLogo from "@assets/deka-logo.svg";
import redtouchLogo from "@assets/grafik_1770659116331.png";

const laserTreatments = [
  { id: "gesicht", title: "Gesicht", price: "250\u20AC" },
  { id: "gesicht-hals", title: "Gesicht + Hals", price: "300\u20AC" },
  { id: "gesicht-hals-dekollete", title: "Gesicht + Hals + Dekollet\u00E9", price: "350\u20AC", highlight: true },
  { id: "haende", title: "H\u00E4nde (Handr\u00FCcken)", price: "90\u20AC" },
  { id: "haende-arme", title: "H\u00E4nde + Arme bis zum Ellbogen", price: "350\u20AC" },
  { id: "oberarme", title: "Oberarme (Ellbogen bis Schulter)", price: "350\u20AC" },
];

const technologyBenefits = [
  { title: "675-nm-Wellenl\u00E4nge", text: "Gezielte Kollagenstimulation in den tieferen Hautschichten" },
  { title: "Sanft & angenehm", text: "Angenehmes W\u00E4rmegef\u00FChl, meist ohne Bet\u00E4ubung n\u00F6tig" },
  { title: "Nicht-invasiv", text: "Keine Verletzung der Hautoberfl\u00E4che, keine Nadeln" },
  { title: "Ca. 40 Min.", text: "Kompakte Behandlungsdauer f\u00FCr das Gesicht" },
  { title: "Sofort alltagstauglich", text: "Minimale Ausfallzeit, leichte R\u00F6tung klingt schnell ab" },
  { title: "Medizinisch fundiert", text: "Wissenschaftlich basierte DEKA-Lasertechnologie" },
];

const treatmentAreas = [
  {
    id: "face",
    title: "Gesicht & Hals",
    subtitle: "Anti-Aging & Glow",
    image: laserFaceImg,
    benefits: [
      "Gl\u00E4ttung feiner Linien",
      "Porenverfeinerung",
      "Gleichm\u00E4\u00DFigerer Teint",
      "Nat\u00FCrlicher Glow",
      "Milderung von Pickelmalen",
    ],
  },
  {
    id: "decollete",
    title: "Dekollet\u00E9",
    subtitle: "Straffung & Erneuerung",
    image: laserDecolletteImg,
    benefits: [
      "Lichtbedingte Hautver\u00E4nderungen",
      "Straffung & Gl\u00E4ttung",
    ],
  },
  {
    id: "body",
    title: "K\u00F6rper",
    subtitle: "Hauterneuerung & Straffung",
    image: laserBodyImg,
    benefits: [
      "Dehnungsstreifen (Striae)",
      "Oberfl\u00E4chliche Narben",
      "Leichte Hauterschlaffung",
    ],
  },
];

const targetGroups = [
  "Hautverjüngung & Anti-Aging (Faltenreduktion)",
  "Hautstraffung (Lifting-Effekt)",
  "Verbesserung des Hautbildes (feinere Poren)",
  "Reduzierung von Pigmentflecken/Altersflecken",
  "Behandlung von Rötungen/Rosacea",
  "Reduzierung von Narben",
];

const processSteps = [
  { step: 1, title: "Beratung & Hautanalyse", description: "Analyse des Hautzustands, Definition der Behandlungsziele und individuelle Einstellung des Lasers." },
  { step: 2, title: "Die Behandlung", description: "Behandlungsdauer ca. 40 Minuten im Gesicht. Angenehmes W\u00E4rmegef\u00FChl, meist ohne Bet\u00E4ubung." },
  { step: 3, title: "Nachsorge", description: "Leichte R\u00F6tung m\u00F6glich, meist innerhalb von 24\u201348 Stunden r\u00FCckl\u00E4ufig. In der Regel sofort gesellschaftsf\u00E4hig." },
];

const reviews = [
  { name: "Sabine M.", location: "Siegen", rating: 5, text: "Nach nur zwei Sitzungen sehe ich einen deutlichen Unterschied. Meine Haut f\u00FChlt sich straffer an und der Teint ist viel gleichm\u00E4\u00DFiger. Kann ich nur weiterempfehlen!", date: "November 2025" },
  { name: "Claudia R.", location: "Burbach", rating: 5, text: "Ich hatte etwas Bedenken vor der Laserbehandlung, aber es war wirklich angenehm. Das W\u00E4rmegef\u00FChl war sogar entspannend. Die Ergebnisse nach drei Sitzungen sind beeindruckend.", date: "Dezember 2025" },
  { name: "Petra K.", location: "Neunkirchen", rating: 5, text: "Endlich eine Behandlung, die wirklich h\u00E4lt was sie verspricht. Meine Nasolabialfalten sind sichtbar glatter und meine Poren feiner. Elena ber\u00E4t zudem sehr ehrlich und kompetent.", date: "Januar 2026" },
  { name: "Monika L.", location: "Wilnsdorf", rating: 5, text: "Die Behandlung meiner Dehnungsstreifen hat mich positiv \u00FCberrascht. Nach dem dritten Termin sind sie deutlich blasser und die Hautstruktur hat sich sp\u00FCrbar verbessert.", date: "Oktober 2025" },
];

const faqs = [
  { q: "Ist die Red Touch Pro Behandlung schmerzhaft?", a: "Nein, die Behandlung ist sanft und angenehm. Die meisten Kundinnen beschreiben ein warmes, leicht prickelndes Gef\u00FChl auf der Haut. Eine Bet\u00E4ubung ist in der Regel nicht notwendig." },
  { q: "Wie viele Sitzungen sind notwendig?", a: "F\u00FCr optimale Ergebnisse empfehlen wir 3\u20134 Behandlungen im Abstand von mehreren Wochen. Erste Verbesserungen sind h\u00E4ufig bereits nach der ersten Sitzung sichtbar. Der Kollagenaufbau entwickelt sich nat\u00FCrlich \u00FCber die Zeit." },
  { q: "Gibt es Ausfallzeit nach der Behandlung?", a: "Die Ausfallzeit ist minimal. Eine leichte R\u00F6tung oder Br\u00E4unung der behandelten Stellen ist m\u00F6glich und klingt meist innerhalb von 24\u201348 Stunden ab. Sie sind in der Regel sofort wieder gesellschaftsf\u00E4hig." },
  { q: "F\u00FCr welche Hauttypen ist die Behandlung geeignet?", a: "Red Touch Pro eignet sich f\u00FCr verschiedene Hauttypen. In einem pers\u00F6nlichen Beratungsgespr\u00E4ch analysieren wir Ihren individuellen Hautzustand und besprechen, ob die Behandlung f\u00FCr Sie geeignet ist." },
  { q: "Kann die Laserbehandlung mit anderen Behandlungen kombiniert werden?", a: "Ja, Red Touch Pro l\u00E4sst sich hervorragend mit Medical Peelings, Skinboostern oder Microneedling kombinieren. Wir erstellen Ihnen gerne einen individuellen Behandlungsplan." },
  { q: "Ab welchem Alter ist die Behandlung sinnvoll?", a: "Die Behandlung eignet sich generell ab dem 30. Lebensjahr, wenn erste Zeichen der Hautalterung sichtbar werden. Grunds\u00E4tzlich gibt es keine strikte Altersgrenze \u2013 entscheidend ist der individuelle Hautzustand." },
  { q: "Was kostet eine Red Touch Pro Behandlung?", a: "Die Preise variieren je nach Behandlungsareal. Eine Gesichtsbehandlung kostet 250\u20AC, Gesicht + Hals 300\u20AC und Gesicht + Hals + Dekollet\u00E9 350\u20AC. Handr\u00FCcken sind ab 90\u20AC m\u00F6glich. In einem Beratungsgespr\u00E4ch erstellen wir Ihnen gerne ein individuelles Angebot." },
  { q: "Welche Technologie steckt hinter Red Touch Pro?", a: "Red Touch Pro nutzt eine 675-nm-Wellenl\u00E4nge zur gezielten Stimulation der Kollagenproduktion in den tieferen Hautschichten. Die Technologie stammt von DEKA, einem der weltweit f\u00FChrenden Hersteller medizinischer Lasersysteme." },
];

const trustPoints = [
  "Moderne, wissenschaftlich fundierte Lasertechnologie",
  "Nat\u00FCrliche Ergebnisse ohne k\u00FCnstlichen Effekt",
  "Ganzheitlicher Ansatz f\u00FCr Hautgesundheit",
  "Transparente Beratung und realistische Erwartungen",
  "Zertifizierte DEKA-Technologie aus Italien",
  "Individuelle Behandlungspl\u00E4ne f\u00FCr Ihre Hautbed\u00FCrfnisse",
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
        metaD.setAttribute("content", "Entrance in Harmony - Beauty & Aesthetics in Harmonie mit Elena Hartstein. Professionelle Gesichts- und K\u00F6rperbehandlungen f\u00FCr Ihre Sch\u00F6nheit und Wohlbefinden.");
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

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen overflow-hidden" data-testid="section-laser-hero">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 text-center pt-44 pb-20">
          <div className="fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
            <p className="text-primary font-medium text-sm tracking-[0.3em] uppercase mb-8" data-testid="text-hero-tag">
              DEKA Lasertechnologie
            </p>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 leading-[1.1] fade-up" style={{ opacity: 0, animationDelay: "0.4s" }} data-testid="text-hero-h1">
            Sichtbar straffere,{" "}
            <span className="text-primary">glattere Haut.</span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl font-light tracking-wide mb-3 fade-up" style={{ opacity: 0, animationDelay: "0.6s" }}>
            Red Touch Pro<sup className="text-xs">&reg;</sup>
          </p>

          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed fade-up" style={{ opacity: 0, animationDelay: "0.7s" }}>
            Nicht-invasive Kollagenstimulation f&uuml;r ein jugendliches, strahlendes Hautbild &ndash; sanft, effektiv und ohne Ausfallzeit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap fade-up" style={{ opacity: 0, animationDelay: "0.9s" }}>
            <Button asChild size="lg" className="rounded-none text-sm uppercase tracking-widest" data-testid="button-laser-hero-cta">
              <a href="https://wa.me/491709287722?text=Hallo,%20ich%20interessiere%20mich%20für%20eine%20Laserbehandlung%20mit%20Red%20Touch%20Pro%20und%20hätte%20gerne%20eine%20individuelle%20Beratung." target="_blank" rel="noopener noreferrer">
                Jetzt Beratung vereinbaren
              </a>
            </Button>
            <Button variant="outline" asChild size="lg" className="rounded-none text-sm uppercase tracking-widest text-white border-white/30 backdrop-blur-sm" data-testid="button-laser-hero-more">
              <a href="#technologie">
                Mehr erfahren
              </a>
            </Button>
          </div>
        </div>
        <WaveDivider position="bottom" color="hsl(var(--background))" />
      </section>

      {/* ===== SECTION 1: INTRO / PROBLEM ===== */}
      <section className="py-20 md:py-28 bg-background" data-testid="section-problem">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center fade-up">
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-10 leading-relaxed" data-testid="text-problem-h2">
              Wenn Pflege allein nicht mehr ausreicht
            </h2>
            <div className="h-0.5 w-32 mx-auto mb-12 gold-shimmer rounded-full"></div>
          </div>
          <div className="max-w-3xl mx-auto fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 text-center">
              Mit zunehmendem Alter verliert die Haut an Kollagen. Spannkraft nimmt ab, feine Linien entstehen und der Teint wirkt unruhig. Klassische Pflegeprodukte k&ouml;nnen diese Prozesse nur begrenzt beeinflussen.
            </p>
            <p className="text-xl text-primary font-medium leading-relaxed text-center">
              Die Red Touch Pro Laserbehandlung setzt gezielt dort an, wo Hautstruktur und Elastizit&auml;t entstehen &ndash; im Kollagen.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: TECHNOLOGY + PARTNERS ===== */}
      <section id="technologie" className="py-20 md:py-28 bg-section-accent" data-testid="section-technology">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="fade-up">
                <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4">Technologie</p>
                <h2 className="font-serif text-4xl md:text-5xl font-light mb-6 leading-tight" data-testid="text-tech-h2">
                  Was macht den Red Touch Pro besonders?
                </h2>
                <div className="h-0.5 w-24 mb-8 gold-shimmer rounded-full"></div>
                <p className="text-muted-foreground leading-relaxed mb-10">
                  Red Touch Pro nutzt eine pr&auml;zise 675-nm-Wellenl&auml;nge zur gezielten Stimulation der Kollagenproduktion. Die Technologie stammt von DEKA &ndash; einem der weltweit f&uuml;hrenden Hersteller medizinischer Lasersysteme aus Italien.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {technologyBenefits.map((item, i) => (
                    <div key={i} data-testid={`card-tech-${i}`}>
                      <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
                <div className="elegant-glow">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img src={treatmentImg} alt="Professionelle Laserbehandlung mit Red Touch Pro" className="w-full aspect-[4/5] object-cover" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 pt-16 border-t border-border/20">
              <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
                <p className="text-muted-foreground text-sm tracking-[0.15em] uppercase">Technologiepartner</p>
                <div data-testid="partner-deka">
                  <img src={dekaLogo} alt="DEKA Lasertechnologie" className="h-10 md:h-12 w-auto object-contain opacity-70" />
                </div>
                <div data-testid="partner-redtouch">
                  <img src={redtouchLogo} alt="Red Touch Pro" className="h-10 md:h-12 w-auto object-contain opacity-70" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: CINEMATIC TARGET GROUP ===== */}
      <section className="relative overflow-hidden" data-testid="section-target">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${beautyProfileImg})` }}
        >
          <div className="absolute inset-0 cinematic-overlay" />
        </div>
        <div className="relative z-10 py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                <div className="fade-up">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm mb-6">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span className="text-white/80 text-xs tracking-[0.2em] uppercase">F&uuml;r Sie</span>
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight" data-testid="text-target-h2">
                    F&uuml;r wen ist die Behandlung <span className="text-gold-gradient">geeignet?</span>
                  </h2>
                  <div className="h-0.5 w-24 mb-10 gold-shimmer rounded-full"></div>
                  <div className="space-y-4">
                    {targetGroups.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 fade-up" style={{ animationDelay: `${0.15 + i * 0.08}s`, opacity: 0 }}>
                        <span className="mt-1 shrink-0 w-6 h-6 rounded-full border border-primary/50 flex items-center justify-center" style={{ background: 'rgba(202, 169, 80, 0.15)' }}>
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </span>
                        <span className="text-white/80 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10">
                    <Button size="lg" className="rounded-none text-sm uppercase tracking-widest" asChild data-testid="button-target-cta">
                      <a href="https://wa.me/491709287722?text=Hallo,%20ich%20möchte%20gerne%20wissen,%20ob%20die%20Red%20Touch%20Pro%20Behandlung%20für%20mich%20geeignet%20ist." target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Bin ich geeignet?
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center fade-up" style={{ animationDelay: "0.3s", opacity: 0 }}>
                  <div className="relative">
                    <div className="absolute -inset-8 rounded-full halo-glow"></div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Sparkles, label: "Nat\u00FCrlicher Glow", value: "Sofort sichtbar" },
                        { icon: Shield, label: "Nicht-invasiv", value: "Keine Nadeln" },
                        { icon: Clock, label: "Behandlung", value: "Ca. 40 Min." },
                        { icon: Zap, label: "Ergebnis", value: "Ab 1. Sitzung" },
                      ].map((stat, i) => (
                        <div key={i} className="p-5 rounded-md backdrop-blur-md border border-white/10 text-center float-animation" style={{ animationDelay: `${i * 0.5}s`, background: 'rgba(255,255,255,0.05)' }} data-testid={`stat-card-${i}`}>
                          <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                          <p className="text-white text-sm font-medium mb-0.5">{stat.label}</p>
                          <p className="text-white/50 text-xs">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: TREATMENT AREAS - VISUAL SHOWCASE ===== */}
      <section className="py-20 md:py-28 bg-background" data-testid="section-areas">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 fade-up">
              <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4">Behandlungsareale</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light mb-6" data-testid="text-areas-h2">
                Einsatzm&ouml;glichkeiten
              </h2>
              <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-6"></div>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Red Touch Pro entfaltet seine Wirkung in verschiedenen Bereichen &ndash; f&uuml;r sichtbare Hauterneuerung genau dort, wo Sie es sich w&uuml;nschen.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {treatmentAreas.map((area, i) => (
                <div key={area.id} className="group relative rounded-md overflow-hidden fade-up" style={{ animationDelay: `${i * 0.15}s`, opacity: 0 }} data-testid={`card-area-${area.id}`}>
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(15,10,8,0.85) 70%, rgba(15,10,8,0.95) 100%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-primary text-xs tracking-[0.2em] uppercase mb-1">{area.subtitle}</p>
                    <h3 className="font-serif text-2xl md:text-3xl font-light text-white mb-4">{area.title}</h3>
                    <div className="h-px w-12 mb-4 gold-shimmer rounded-full"></div>
                    <ul className="space-y-2">
                      {area.benefits.map((b, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="text-white/70 text-sm">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: PROCESS - PREMIUM TIMELINE ===== */}
      <section className="py-20 md:py-28 bg-section-accent" data-testid="section-process">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-up">
            <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4">Ablauf</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-6" data-testid="text-process-h2">
              Ihre Behandlung in drei Schritten
            </h2>
            <div className="h-0.5 w-32 mx-auto gold-shimmer rounded-full"></div>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-border/50 -translate-y-1/2"></div>
              <div className="grid md:grid-cols-3 gap-8">
                {processSteps.map((step) => (
                  <div key={step.step} className="relative fade-up" style={{ animationDelay: `${step.step * 0.15}s`, opacity: 0 }} data-testid={`step-${step.step}`}>
                    <Card className="overflow-visible">
                      <CardContent className="p-8 text-center relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center z-10" style={{ background: 'hsl(var(--card))' }}>
                          <span className="font-serif text-lg text-primary">{step.step}</span>
                        </div>
                        <div className="pt-4">
                          <h3 className="font-serif text-xl font-light mb-3">{step.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: RESULTS + PRICING - PREMIUM ===== */}
      <section className="py-20 md:py-28 bg-background" data-testid="section-results">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 fade-up">
              <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4">Ergebnisse</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light mb-6" data-testid="text-results-h2">
                Ergebnisse &amp; Behandlungsplan
              </h2>
              <div className="h-0.5 w-32 mx-auto gold-shimmer rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="fade-up">
                <div className="relative rounded-md overflow-hidden">
                  <img src={resultImg} alt="Strahlende Haut nach Red Touch Pro" className="w-full aspect-[4/5] object-cover" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(15,10,8,0.8) 100%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {[
                        { value: "1.", label: "Sitzung", sub: "Erste Verbesserung" },
                        { value: "3\u20134", label: "Sitzungen", sub: "Optimales Ergebnis" },
                        { value: "40", label: "Minuten", sub: "Pro Behandlung" },
                      ].map((item, i) => (
                        <div key={i} className="result-counter" style={{ animationDelay: `${i * 0.3}s` }} data-testid={`result-stat-${i}`}>
                          <p className="font-serif text-2xl md:text-3xl text-primary font-light">{item.value}</p>
                          <p className="text-white text-xs font-medium">{item.label}</p>
                          <p className="text-white/50 text-[10px]">{item.sub}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="fade-up" style={{ animationDelay: "0.15s", opacity: 0 }}>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Erste Hautverbesserungen sind h&auml;ufig bereits nach der ersten Sitzung sichtbar. F&uuml;r optimale Ergebnisse werden meist 3&ndash;4 Behandlungen im Abstand von mehreren Wochen empfohlen.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  F&uuml;r ein noch umfassenderes Ergebnis kann die Behandlung kombiniert werden mit:
                </p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {["Medical Peelings", "Skinbooster", "Infusionen", "RF-Microneedling"].map((item) => (
                    <Badge key={item} variant="secondary" className="text-sm">{item}</Badge>
                  ))}
                </div>

                <div data-testid="section-pricing">
                  <h3 className="font-serif text-2xl font-light mb-6" data-testid="text-pricing-h2">Preis&uuml;bersicht</h3>
                  <div className="space-y-0">
                    {laserTreatments.map((treatment, i) => (
                      <div
                        key={treatment.id}
                        className={`flex items-center justify-between gap-4 flex-wrap py-4 ${i < laserTreatments.length - 1 ? 'border-b border-border/30' : ''}`}
                        data-testid={`row-laser-${treatment.id}`}
                      >
                        <div className="flex items-center gap-3 flex-wrap">
                          <h4 className="text-sm font-medium" data-testid={`text-laser-title-${treatment.id}`}>{treatment.title}</h4>
                          {treatment.highlight && (
                            <Badge variant="secondary" className="text-[10px]" data-testid={`badge-highlight-${treatment.id}`}>Beliebt</Badge>
                          )}
                        </div>
                        <span className="font-serif text-lg text-primary font-medium" data-testid={`text-laser-price-${treatment.id}`}>{treatment.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3 flex-wrap">
                    <Button className="rounded-none text-xs uppercase tracking-widest" asChild data-testid="button-pricing-book">
                      <a href="https://wa.me/491709287722?text=Hallo,%20ich%20möchte%20gerne%20einen%20Termin%20für%20eine%20Laserbehandlung%20buchen." target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Termin buchen
                      </a>
                    </Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-4">
                    Alle Preise inkl. individueller Beratung. Kleinunternehmer gem. &sect;19 UStG &ndash; keine MwSt. ausgewiesen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: REVIEWS + TRUST ===== */}
      <section className="py-20 md:py-28 bg-section-accent" data-testid="section-reviews">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 fade-up">
              <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4">Erfahrungen</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light mb-6" data-testid="text-reviews-h2">
                Das sagen unsere Kundinnen
              </h2>
              <div className="h-0.5 w-32 mx-auto gold-shimmer rounded-full"></div>
            </div>
            <div className="flex items-center justify-center gap-2 flex-wrap mb-12 fade-up">
              <div className="flex items-center gap-1 flex-wrap">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="font-serif text-2xl font-medium ml-2" data-testid="text-reviews-avg">5.0</span>
              <span className="text-muted-foreground text-sm ml-1">({reviews.length} Bewertungen)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
              {reviews.map((review, i) => (
                <Card key={i} className="fade-up" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }} data-testid={`card-review-${i}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 flex-wrap mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <span className="font-medium text-sm text-primary">{review.name.split(" ").map(n => n[0]).join("")}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm leading-tight" data-testid={`text-review-name-${i}`}>{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap mb-1">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{review.date}</p>
                    <p className="text-sm text-foreground/80 leading-relaxed" data-testid={`text-review-text-${i}`}>
                      &bdquo;{review.text}&ldquo;
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="fade-up" data-testid="section-trust">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <div className="text-center">
                  <p className="font-serif text-3xl md:text-4xl font-light text-primary mb-1" data-testid="text-rating">5.0</p>
                  <p className="text-xs text-muted-foreground">Kundenbewertung</p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl md:text-4xl font-light text-primary mb-1" data-testid="text-satisfaction">100%</p>
                  <p className="text-xs text-muted-foreground">Zufriedenheit</p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl md:text-4xl font-light text-primary mb-1" data-testid="text-sessions">3&ndash;4</p>
                  <p className="text-xs text-muted-foreground">Sitzungen empfohlen</p>
                </div>
                <div className="text-center">
                  <p className="font-serif text-3xl md:text-4xl font-light text-primary mb-1">DEKA</p>
                  <p className="text-xs text-muted-foreground">Zertifiziert</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: WHY US + FAQ ===== */}
      <section className="py-20 md:py-28 bg-background" data-testid="section-faq">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start mb-24">
              <div className="fade-up">
                <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4">Vertrauen</p>
                <h2 className="font-serif text-4xl md:text-5xl font-light mb-6 leading-tight" data-testid="text-trust-h2">
                  Warum diese Behandlung?
                </h2>
                <div className="h-0.5 w-24 mb-8 gold-shimmer rounded-full"></div>
                <ul className="space-y-5">
                  {trustPoints.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 shrink-0 w-5 h-5 rounded-full border border-primary/40 flex items-center justify-center bg-primary/10">
                        <Check className="w-3 h-3 text-primary" />
                      </span>
                      <span className="text-foreground/80 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="fade-up" style={{ animationDelay: "0.15s", opacity: 0 }}>
                <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4">FAQ</p>
                <h2 className="font-serif text-4xl md:text-5xl font-light mb-6 leading-tight" data-testid="text-faq-h2">
                  H&auml;ufig gestellte Fragen
                </h2>
                <div className="h-0.5 w-24 mb-6 gold-shimmer rounded-full"></div>
                <div className="space-y-0">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border-b border-border/40" data-testid={`faq-item-${i}`}>
                      <button
                        className="w-full flex items-center justify-between gap-4 py-5 text-left hover-elevate transition-all"
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        data-testid={`button-faq-${i}`}
                      >
                        <span className="font-medium text-sm pr-4">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{ maxHeight: openFaq === i ? "500px" : "0", opacity: openFaq === i ? 1 : 0 }}
                      >
                        <div className="pb-5">
                          <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-faq-answer-${i}`}>{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 9: FINAL CTA ===== */}
      <section className="relative py-24 md:py-32 overflow-hidden" data-testid="section-cta-final">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-6 leading-tight" data-testid="text-cta-h2">
              Bereit f&uuml;r ein frischeres Hautbild?
            </h2>
            <div className="h-0.5 w-24 mx-auto gold-shimmer rounded-full mb-8"></div>
            <p className="text-white/70 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Vereinbaren Sie jetzt Ihren pers&ouml;nlichen Beratungstermin und erfahren Sie, wie Red Touch Pro Ihre Haut sichtbar verj&uuml;ngen kann.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-[#25D366] text-white border-[#25D366] rounded-none text-sm uppercase tracking-widest" asChild data-testid="button-laser-cta-bottom">
                <a href="https://wa.me/491709287722?text=Hallo,%20ich%20interessiere%20mich%20für%20eine%20Laserbehandlung%20mit%20Red%20Touch%20Pro%20und%20hätte%20gerne%20eine%20individuelle%20Beratung." target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Beratung vereinbaren
                </a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-none text-sm uppercase tracking-widest text-white border-white/30 backdrop-blur-sm" asChild data-testid="button-laser-cta-services">
                <a href="/gesichtsbehandlungen" className="flex items-center gap-2">
                  <span>Alle Behandlungen</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DISCLAIMER ===== */}
      <section className="py-8 bg-background border-t border-border/30" data-testid="section-disclaimer">
        <div className="container mx-auto px-4">
          <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed" data-testid="text-disclaimer">
            Diese Behandlung dient der kosmetischen Verbesserung des Hautbildes und ersetzt keine medizinische Beratung. Es handelt sich um kein Heilversprechen. Ergebnisse k&ouml;nnen individuell variieren.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
