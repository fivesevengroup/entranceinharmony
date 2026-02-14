import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Check, MessageCircle, ChevronDown, Star, ArrowRight, Sparkles, Shield, Clock, Zap, Waves, ScanLine, Thermometer, Monitor, Snowflake, Activity } from "lucide-react";
import heroImg from "@assets/laserbehandlung-hero-hautverjuengung-redtouch.png";
import resultImg from "@assets/laser-ergebnis-schoene-haut-anti-aging.png";
import treatmentImg from "@assets/laserbehandlung-behandlung-hautverjuengung.png";
import smoothImg from "@assets/stock_images/laserbehandlung-glatte-haut-hautstraffung.jpg";
import laserFaceImg from "@assets/laserbehandlung-gesicht-rosacea-pigmentflecken.png";
import laserDecolletteImg from "@assets/laserbehandlung-dekollete-hautstraffung.png";
import laserBodyImg from "@assets/laserbehandlung-koerper-narben-akne.png";
import beautyProfileImg from "@assets/stock_images/beauty-profil-hautverjuengung-golden.jpg";
import dekaLogo from "@assets/deka-logo.svg";
import redtouchLogo from "@assets/redtouch-pro-logo-laser-technologie.png";

const laserTreatments = [
  { id: "gesicht", title: "Gesicht", price: "250\u20AC" },
  { id: "gesicht-hals", title: "Gesicht + Hals", price: "300\u20AC" },
  { id: "gesicht-hals-dekollete", title: "Gesicht + Hals + Dekollet\u00E9", price: "350\u20AC", highlight: true },
  { id: "haende", title: "H\u00E4nde (Handr\u00FCcken)", price: "90\u20AC" },
  { id: "haende-arme", title: "H\u00E4nde + Arme bis zum Ellbogen", price: "350\u20AC" },
  { id: "oberarme", title: "Oberarme (Ellbogen bis Schulter)", price: "350\u20AC" },
];

const deviceFeatures = [
  { icon: ScanLine, title: "Scanner", text: "Optimierte Ergonomie für bestmögliche Ergebnisse. Mikrozonen thermischer Schädigung stimulieren die Neokollagenese.", side: "left" as const },
  { icon: Waves, title: "Flexible Faser", text: "Das Laserlicht wird über eine flexible Faser übertragen – für optimalen Komfort bei der Behandlung.", side: "left" as const },
  { icon: Monitor, title: "10,1\" LCD Touchscreen", text: "Ultrascharfes Display für präzise Steuerung aller Behandlungsparameter in Echtzeit.", side: "left" as const },
  { icon: Activity, title: "Integrierte Protokolle", text: "Spezielle Behandlungsprotokolle für Hautverjüngung, individuell anpassbar.", side: "right" as const },
  { icon: Snowflake, title: "Integrierte Hautkühlung", text: "Schützt die Epidermis – minimiert Nebenwirkungen und Ausfallzeiten.", side: "right" as const },
  { icon: Zap, title: "675-nm-Wellenlänge", text: "Innovatives Wellenlängen-System für gezielte Kollagenstimulation in der Tiefe.", side: "right" as const },
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
  { q: "Hilft Red Touch Pro wirklich gegen Falten und Hautalterung?", a: "Ja. Die 675-nm-Wellenl\u00E4nge stimuliert die nat\u00FCrliche Kollagen- und Elastinproduktion in den tieferen Hautschichten. Dadurch werden feine Linien und Falten sichtbar reduziert, die Haut wird von innen heraus gestraffter und elastischer \u2013 ganz ohne Nadeln oder Unterspritzungen. Viele Kundinnen berichten bereits nach der ersten Sitzung von einem nat\u00FCrlichen Lifting-Effekt." },
  { q: "Kann die Behandlung Pigmentflecken und Altersflecken entfernen?", a: "Red Touch Pro zeigt hervorragende Ergebnisse bei Pigmentst\u00F6rungen und Altersflecken. Der Laser bricht \u00FCberm\u00E4\u00DFige Melaninablagerungen schonend auf, sodass sich der Hautton nach und nach angleicht. Sonnenbedingter Hautalterung und ungleichm\u00E4\u00DFigem Teint wird effektiv entgegengewirkt \u2013 f\u00FCr einen ebenen, strahlenden Hautton." },
  { q: "Ist die Laserbehandlung bei Rosacea und R\u00F6tungen wirksam?", a: "Absolut. Red Touch Pro kann ger\u00F6tete Hautareale und Rosacea-bedingte Ver\u00E4nderungen sp\u00FCrbar verbessern. Der Laser wirkt gezielt auf erweiterte Gef\u00E4\u00DFe und reduziert die Entz\u00FCndungsneigung der Haut. Bei regelm\u00E4\u00DFiger Anwendung berichten Kundinnen von einem deutlich ruhigeren, gleichm\u00E4\u00DFigeren Hautbild." },
  { q: "Kann man mit Red Touch Pro Narben und Aknenarben behandeln?", a: "Ja, die Behandlung eignet sich besonders gut zur Verbesserung von Aknenarben, OP-Narben und oberfl\u00E4chlichen Verletzungsnarben. Der fraktionierte Laser erzeugt Mikrozonen thermischer Stimulation, die den nat\u00FCrlichen Heilungsprozess der Haut aktivieren. So wird das Narbengewebe schrittweise durch neues, gesundes Gewebe ersetzt und die Hautstruktur wird sp\u00FCrbar glatter." },
  { q: "Wie wirkt die Behandlung bei gro\u00DFen Poren und unebener Hautstruktur?", a: "Vergr\u00F6\u00DFerte Poren und eine ungleichm\u00E4\u00DFige Hauttextur z\u00E4hlen zu den h\u00E4ufigsten Hautanliegen. Red Touch Pro verfeinert die Porenstruktur, indem die Kollagenneubildung in der Lederhaut angeregt wird. Das Ergebnis ist ein sichtbar feineres, glatteres Hautbild mit mehr nat\u00FCrlichem Glow." },
  { q: "Eignet sich Red Touch Pro auch f\u00FCr Hals und Dekollet\u00E9?", a: "Auf jeden Fall. Gerade Hals und Dekollet\u00E9 zeigen fr\u00FCh Zeichen der Hautalterung, da die Haut dort besonders d\u00FCnn und empfindlich ist. Red Touch Pro strafft diese sensiblen Bereiche sanft und effektiv \u2013 f\u00FCr ein jugendlicheres Erscheinungsbild vom Gesicht bis zum Dekollet\u00E9. Die Behandlung wird h\u00E4ufig als Paket gebucht." },
  { q: "K\u00F6nnen Dehnungsstreifen mit dem Laser behandelt werden?", a: "Ja, Red Touch Pro bietet vielversprechende Ergebnisse bei Dehnungsstreifen (Striae). Durch die gezielte Stimulation der Kollagenproduktion in den betroffenen Hautschichten k\u00F6nnen Dehnungsstreifen verblassen und die Hautstruktur wird sp\u00FCrbar verbessert. Die Behandlung eignet sich sowohl f\u00FCr frische (r\u00F6tliche) als auch f\u00FCr \u00E4ltere (wei\u00DFliche) Streifen." },
  { q: "F\u00FCr welche Hauttypen ist die Behandlung geeignet?", a: "Red Touch Pro eignet sich f\u00FCr verschiedene Hauttypen. In einem pers\u00F6nlichen Beratungsgespr\u00E4ch analysieren wir Ihren individuellen Hautzustand und besprechen, ob die Behandlung f\u00FCr Sie geeignet ist." },
  { q: "Kann die Laserbehandlung mit anderen Behandlungen kombiniert werden?", a: "Ja, Red Touch Pro l\u00E4sst sich hervorragend mit Medical Peelings, Skinboostern, Infusionen oder RF-Microneedling kombinieren. Ein kombinierter Ansatz verst\u00E4rkt die Ergebnisse und sorgt f\u00FCr eine umfassende Hauterneuerung auf mehreren Ebenen. Wir erstellen Ihnen gerne einen individuellen Behandlungsplan." },
  { q: "Was kostet eine Red Touch Pro Behandlung?", a: "Die Preise variieren je nach Behandlungsareal. Eine Gesichtsbehandlung kostet 250\u20AC, Gesicht + Hals 300\u20AC und Gesicht + Hals + Dekollet\u00E9 350\u20AC. Handr\u00FCcken sind ab 90\u20AC m\u00F6glich. In einem Beratungsgespr\u00E4ch erstellen wir Ihnen gerne ein individuelles Angebot." },
  { q: "Welche Technologie steckt hinter Red Touch Pro?", a: "Red Touch Pro nutzt eine 675-nm-Wellenl\u00E4nge zur gezielten Stimulation der Kollagenproduktion in den tieferen Hautschichten. Die Technologie stammt von DEKA, einem der weltweit f\u00FChrenden Hersteller medizinischer Lasersysteme aus Italien \u2013 mit \u00FCber 40 Jahren Erfahrung in der Laserforschung." },
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
    const slideObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.slideDelay || '0';
            setTimeout(() => {
              el.classList.add('visible');
            }, parseFloat(delay) * 1000);
            slideObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.slide-in-left, .slide-in-right').forEach((el) => {
      slideObserver.observe(el);
    });

    return () => {
      slideObserver.disconnect();
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
      <SEOHead
        title="Red Touch Pro Laser – Moderne Hautverjüngung ohne OP | Entrance in Harmony"
        description="Sanfte Laser-Hautverjüngung mit Red Touch Pro in Burbach. Sichtbare Straffung, verfeinerte Hautstruktur und mehr Glow – ohne OP und mit minimaler Ausfallzeit. Jetzt Beratung vereinbaren."
        path="/laserbehandlungen"
        structuredData={breadcrumbSchema([
          { name: "Startseite", url: "/" },
          { name: "Laserbehandlungen", url: "/laserbehandlungen" }
        ])}
      />
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
      <section id="technologie" className="relative py-16 md:py-24 overflow-hidden bg-section-accent" data-testid="section-technology">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(202, 169, 80, 0.06) 0%, transparent 70%)' }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 20%, rgba(202, 169, 80, 0.15) 50%, transparent 80%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 20%, rgba(202, 169, 80, 0.15) 50%, transparent 80%)' }} />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16 fade-up">
            <p className="text-primary text-sm font-medium tracking-[0.3em] uppercase mb-4">Technologie</p>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light mb-4 leading-tight" data-testid="text-tech-h2">
              Red Touch Pro<sup className="text-lg align-super">&reg;</sup>
            </h2>
            <div className="h-0.5 w-32 mx-auto gold-shimmer rounded-full mb-6"></div>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              DEKA Lasertechnologie aus Italien &ndash; Pr&auml;zision auf h&ouml;chstem Niveau.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-6 items-center">

              <div className="space-y-8 lg:space-y-10">
                {deviceFeatures.filter(f => f.side === "left").map((feature, i) => (
                  <div key={i} className="flex flex-col lg:items-end lg:text-right slide-in-left" data-slide-delay={`${0.1 + i * 0.2}`} data-testid={`card-tech-${i}`}>
                    <div className="flex items-center gap-3 mb-2 lg:flex-row-reverse flex-wrap">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(202, 169, 80, 0.12)', border: '1px solid rgba(202, 169, 80, 0.25)' }}>
                        <feature.icon className="w-4.5 h-4.5 text-primary" />
                      </div>
                      <h3 className="font-serif text-lg font-light">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{feature.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center fade-up order-first lg:order-none" style={{ animationDelay: "0.1s", opacity: 0 }}>
                <div className="device-3d-wrapper relative">
                  <div className="device-3d-glow"></div>
                  <div className="relative">
                    <img
                      src={treatmentImg}
                      alt="Red Touch Pro Lasergerät Hautverjüngung Anti-Aging Hautstraffung"
                      className="w-auto object-contain relative z-10"
                      style={{ maxHeight: '450px', filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.5))' }}
                    />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8" style={{ background: 'radial-gradient(ellipse, rgba(202, 169, 80, 0.15) 0%, transparent 70%)', filter: 'blur(10px)' }} />
                  </div>
                </div>
              </div>

              <div className="space-y-8 lg:space-y-10">
                {deviceFeatures.filter(f => f.side === "right").map((feature, i) => (
                  <div key={i} className="flex flex-col lg:items-start lg:text-left slide-in-right" data-slide-delay={`${0.1 + i * 0.2}`} data-testid={`card-tech-${i + 3}`}>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(202, 169, 80, 0.12)', border: '1px solid rgba(202, 169, 80, 0.25)' }}>
                        <feature.icon className="w-4.5 h-4.5 text-primary" />
                      </div>
                      <h3 className="font-serif text-lg font-light">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{feature.text}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          <div className="mt-12 pt-8 fade-up" style={{ animationDelay: "0.5s", opacity: 0 }}>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
              <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase">Technologiepartner</p>
              <div data-testid="partner-deka" className="opacity-70 transition-opacity duration-300">
                <img src={dekaLogo} alt="DEKA Lasertechnologie Medizinische Lasergeräte Hautverjüngung" className="h-10 md:h-12 w-auto object-contain" />
              </div>
              <div data-testid="partner-redtouch" className="opacity-70 transition-opacity duration-300">
                <img src={redtouchLogo} alt="Red Touch Pro Laser Hautstraffung Faltenreduktion" className="h-10 md:h-12 w-auto object-contain" />
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
                    Wof&uuml;r ist die Red Touch Pro<sup className="text-lg">&reg;</sup> Laserbehandlung <span className="text-gold-gradient">geeignet?</span>
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
                      alt={`Laserbehandlung ${area.title} Hautverjüngung Hautstraffung Burbach`}
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
                  <img src={resultImg} alt="Strahlende Haut nach Red Touch Pro Laserbehandlung Hautverjüngung Ergebnis" className="w-full aspect-[4/5] object-cover" />
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
