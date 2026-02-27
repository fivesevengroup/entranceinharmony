import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { MessageCircle, ChevronDown, ArrowRight, CheckCircle2, ShieldCheck, Search, Sparkles } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import WaveDivider from "@/components/WaveDivider";

interface FAQ {
  question: string;
  answer: string;
}

interface RelatedTreatment {
  name: string;
  href: string;
  description: string;
}

interface SkinProblemPageData {
  slug: string;
  seo: {
    title: string;
    description: string;
    path: string;
  };
  breadcrumb: { name: string; url: string }[];
  heroTitle: string;
  heroSubtitle: string;
  introText: string;
  causesTitle: string;
  causes: string[];
  symptomsTitle: string;
  symptoms: string[];
  solutionsTitle: string;
  solutionsIntro: string;
  solutions: { name: string; description: string }[];
  whenProfessional: string;
  faqs: FAQ[];
  relatedTreatments: RelatedTreatment[];
  localText: string;
  ctaText: string;
}

const WHATSAPP_URL = "https://wa.me/491709287722?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Beratung.";

const pageData: Record<string, SkinProblemPageData> = {
  "akne-behandlung-siegen": {
    slug: "akne-behandlung-siegen",
    seo: {
      title: "Akne Behandlung Siegen & Burbach | Entrance in Harmony",
      description: "Professionelle Akne Behandlung in Burbach bei Siegen. Tiefenreinigung, Microneedling & individuelle Hautanalyse. Sichtbare Verbesserung. Jetzt beraten lassen!",
      path: "/akne-behandlung-siegen"
    },
    breadcrumb: [
      { name: "Startseite", url: "/" },
      { name: "Gesichtsbehandlungen", url: "/gesichtsbehandlungen" },
      { name: "Akne Behandlung", url: "/akne-behandlung-siegen" }
    ],
    heroTitle: "Akne Behandlung in Burbach bei Siegen",
    heroSubtitle: "Professionelle Hautpflege bei Unreinheiten, Pickeln und Akne",
    introText: "Akne betrifft nicht nur Jugendliche – auch Erwachsene leiden häufig unter unreiner Haut, Pickeln und entzündlichen Hautveränderungen. In unserem Kosmetikstudio in Burbach bieten wir individuelle Behandlungskonzepte, die auf Ihren Hauttyp abgestimmt sind. Keine Standardlösungen, sondern persönliche Betreuung mit professioneller Hautanalyse als Grundlage.",
    causesTitle: "Mögliche Ursachen von Akne",
    causes: [
      "Hormonelle Veränderungen (Pubertät, Zyklus, Wechseljahre)",
      "Überproduktion von Talg und verstopfte Poren",
      "Stress und psychische Belastung",
      "Ungeeignete Pflege- oder Kosmetikprodukte",
      "Ernährung und Lebensstil",
      "Genetische Veranlagung"
    ],
    symptomsTitle: "Typische Erscheinungsbilder",
    symptoms: [
      "Mitesser (offene und geschlossene Komedonen)",
      "Entzündliche Pickel und Pusteln",
      "Tiefe, schmerzhafte Knötchen unter der Haut",
      "Großflächige Rötungen",
      "Fettig glänzende Haut, insbesondere in der T-Zone",
      "Spätakne (Akne tarda) bei Erwachsenen"
    ],
    solutionsTitle: "Unsere Behandlungsansätze bei Akne",
    solutionsIntro: "Jede Haut ist anders. Deshalb beginnen wir immer mit einer gründlichen Hautanalyse, um den passenden Behandlungsplan zu erstellen.",
    solutions: [
      { name: "Professionelle Tiefenreinigung", description: "Gründliche Ausreinigung mit enzymatischem Peeling, Tiefreinigungsmaske und beruhigender Abschlusspflege – die Basis für ein klareres Hautbild." },
      { name: "Microneedling", description: "Stimuliert die Hauterneuerung und kann das Erscheinungsbild von Aknenarben und Pickelmalen sichtbar verbessern." },
      { name: "Carboxy Therapie", description: "Fördert die Durchblutung und unterstützt die Hautregeneration. Kann entzündliche Prozesse positiv beeinflussen." },
      { name: "Individuelle Pflegeempfehlung", description: "Beratung zu geeigneten Produkten für Ihre tägliche Routine – damit Ihre Haut auch zwischen den Behandlungen optimal versorgt ist." }
    ],
    whenProfessional: "Wenn herkömmliche Pflegeprodukte nicht ausreichen, wiederkehrende Unreinheiten das Wohlbefinden beeinträchtigen oder sich Narben bilden, kann eine professionelle kosmetische Behandlung sinnvoll ergänzen. Wir ersetzen keine dermatologische Behandlung, sondern verstehen uns als ergänzende Begleitung für Ihre Hautgesundheit.",
    faqs: [
      { question: "Was hilft wirklich gegen Akne?", answer: "Neben angepasster Heimpflege ist eine professionelle Tiefenreinigung oft der erste wichtige Schritt. Die Kombination aus gründlicher Ausreinigung, individueller Hautanalyse und abgestimmter Pflegeempfehlung kann sichtbare Verbesserungen bewirken. Bei schwerer Akne empfehlen wir ergänzend eine dermatologische Beratung." },
      { question: "Wie läuft eine Akne-Behandlung in Burbach ab?", answer: "Wir beginnen mit einer ausführlichen Hautanalyse und Bestandsaufnahme. Darauf aufbauend wählen wir die geeignete Behandlung – von Tiefenreinigung über Carboxy Therapie bis Microneedling. Jeder Behandlungsplan wird individuell auf Ihren Hauttyp abgestimmt." },
      { question: "Ist eine kosmetische Akne-Behandlung schmerzhaft?", answer: "Die meisten Behandlungen sind gut verträglich. Bei der Ausreinigung kann es an einzelnen Stellen leicht unangenehm sein, aber nie schmerzhaft. Beim Microneedling wird vorab eine betäubende Creme aufgetragen. Die Haut kann danach kurzzeitig gerötet sein." },
      { question: "Wie viele Sitzungen brauche ich bei Akne?", answer: "Das hängt von der Ausprägung ab. Erste Verbesserungen zeigen sich häufig schon nach der ersten Tiefenreinigung. Für nachhaltige Ergebnisse empfehlen wir je nach Hautbild eine Serie von drei bis sechs Behandlungen im Abstand von vier bis sechs Wochen." }
    ],
    relatedTreatments: [
      { name: "Gesichtsbehandlungen", href: "/gesichtsbehandlungen", description: "Alle Behandlungen im Überblick" },
      { name: "Akne-Narben Behandlung", href: "/akne-narben-behandlung", description: "Microneedling & Laser gegen Narben" },
      { name: "Hautanalyse", href: "/hautanalyse-burbach", description: "Individuelle Hauttyp-Bestimmung" }
    ],
    localText: "Unser Studio in Burbach (57299) liegt zentral im Siegerland und ist gut erreichbar aus Siegen (57072), Kreuztal (57223), Netphen (57250), Neunkirchen (57290), Haiger (35708) und Dillenburg (35683).",
    ctaText: "Vereinbaren Sie Ihren persönlichen Beratungstermin für eine individuelle Hautanalyse."
  },

  "akne-narben-behandlung": {
    slug: "akne-narben-behandlung",
    seo: {
      title: "Akne-Narben behandeln – Microneedling & Laser Burbach",
      description: "Akne-Narben und Pickelmale sichtbar verbessern. Microneedling, Laser & Carboxy Therapie in Burbach bei Siegen. Individuelle Beratung. Jetzt Termin vereinbaren!",
      path: "/akne-narben-behandlung"
    },
    breadcrumb: [
      { name: "Startseite", url: "/" },
      { name: "Gesichtsbehandlungen", url: "/gesichtsbehandlungen" },
      { name: "Akne-Narben Behandlung", url: "/akne-narben-behandlung" }
    ],
    heroTitle: "Akne-Narben behandeln in Burbach",
    heroSubtitle: "Sichtbare Verbesserung durch Microneedling, Laser und Carboxy Therapie",
    introText: "Akne-Narben und Pickelmale können das Hautbild auch lange nach einer aktiven Akne beeinträchtigen. In unserem Kosmetikstudio bieten wir moderne Behandlungsmethoden, die die Hautstruktur verbessern und das Erscheinungsbild von Narben sichtbar reduzieren können – sanft, individuell und ohne operative Eingriffe.",
    causesTitle: "Wie entstehen Akne-Narben?",
    causes: [
      "Tiefe entzündliche Akne, die das Hautgewebe schädigt",
      "Unsachgemäßes Ausdrücken von Pickeln",
      "Verzögerte oder fehlende Behandlung aktiver Akne",
      "Gestörte Wundheilung und Narbengewebebildung",
      "Überschüssige oder zu geringe Kollagenproduktion während der Heilung",
      "Genetische Veranlagung zu Narbenbildung"
    ],
    symptomsTitle: "Typische Narbenformen",
    symptoms: [
      "Atrophe Narben (eingesunkene, kraterförmige Vertiefungen)",
      "Eispickelnarben (kleine, tiefe punktförmige Narben)",
      "Rollende Narben (wellenförmige Hautoberfläche)",
      "Boxcar-Narben (scharfkantige, kastenförmige Vertiefungen)",
      "Postinflammatorische Hyperpigmentierung (dunkle Pickelmale)",
      "Rote Pickelmale (Erythem nach abgeheilten Entzündungen)"
    ],
    solutionsTitle: "Unsere Behandlungsmethoden bei Akne-Narben",
    solutionsIntro: "Die Wahl der Methode richtet sich nach Narbentyp, Hautbeschaffenheit und individuellen Wünschen.",
    solutions: [
      { name: "Microneedling", description: "Feine Nadeln erzeugen kontrollierte Mikroverletzungen, die die körpereigene Kollagenproduktion ankurbeln. Ideal bei eingesunkenen Narben und unebener Hautstruktur." },
      { name: "Red Touch Pro Laser", description: "Die 675-nm-Wellenlänge stimuliert die Kollagenneubildung in tieferen Hautschichten. Besonders wirksam bei hartnäckigen Narben und zur Verbesserung der gesamten Hautstruktur." },
      { name: "Carboxy Therapie", description: "CO₂-basierte Behandlung, die die Durchblutung fördert und die Zellaktivierung unterstützt. Kann die Narbenheilung positiv beeinflussen." },
      { name: "Chemische Peelings", description: "Gezielte Hauterneuerung durch kontrolliertes Abtragen der obersten Hautschicht. Hilft bei oberflächlichen Narben und Pigmentveränderungen." }
    ],
    whenProfessional: "Wenn Akne-Narben das Selbstvertrauen beeinträchtigen und Hausmittel keine sichtbare Verbesserung bringen, kann eine professionelle Behandlung den Unterschied machen. Je früher Narben behandelt werden, desto besser lassen sie sich beeinflussen. Wir beraten Sie ehrlich, welche Methode bei Ihrem Narbentyp die besten Chancen bietet.",
    faqs: [
      { question: "Was tun bei Akne-Narben im Gesicht?", answer: "Microneedling und Laserbehandlungen gehören zu den wirksamsten kosmetischen Methoden bei Akne-Narben. Durch die kontrollierte Stimulation der Kollagenproduktion kann sich die Hautstruktur über mehrere Sitzungen sichtbar verbessern. Eine individuelle Hautanalyse hilft, die richtige Methode zu finden." },
      { question: "Ist Microneedling gut bei Akne-Narben?", answer: "Microneedling hat sich bei atrophen Akne-Narben sehr bewährt. Die feinen Mikroverletzungen regen die Bildung von neuem Kollagen an, was eingesunkene Narben nach und nach auffüllen kann. Die Behandlung ist gut verträglich und erfordert keine Ausfallzeit." },
      { question: "Wie viele Behandlungen braucht man bei Akne-Narben?", answer: "In der Regel sind drei bis sechs Sitzungen im Abstand von vier bis sechs Wochen empfehlenswert. Erste Verbesserungen sind oft schon nach der zweiten Behandlung sichtbar. Das Endergebnis entwickelt sich über Wochen, da die Kollagenneubildung Zeit benötigt." },
      { question: "Können Akne-Narben vollständig verschwinden?", answer: "Eine vollständige Beseitigung tiefer Narben ist kosmetisch nicht möglich. Allerdings lassen sich Tiefe, Farbe und Gesamterscheinung deutlich verbessern. Viele Kundinnen berichten von einer spürbaren Verbesserung ihres Hautbildes und ihres Wohlbefindens." }
    ],
    relatedTreatments: [
      { name: "Red Touch Pro Laser", href: "/laserbehandlungen", description: "Hautverjüngung ohne OP" },
      { name: "Akne Behandlung", href: "/akne-behandlung-siegen", description: "Aktive Akne professionell behandeln" },
      { name: "Kollagen aufbauen", href: "/kollagen-aufbau-gesicht", description: "Natürliche Kollagenstimulation" }
    ],
    localText: "Von Siegen (57072) über Haiger (35708), Betzdorf (57518), Herdorf (57562) bis Dillenburg (35683) – unser Studio in Burbach (57299) ist aus der ganzen Region gut erreichbar.",
    ctaText: "Vereinbaren Sie ein Beratungsgespräch und erfahren Sie, welche Methode für Ihre Narben am besten geeignet ist."
  },

  "hautanalyse-burbach": {
    slug: "hautanalyse-burbach",
    seo: {
      title: "Hautanalyse Burbach – Individuelle Hauttyp-Bestimmung",
      description: "Professionelle Hautanalyse in Burbach bei Siegen. Individuelle Hauttyp-Bestimmung als Basis für Ihren persönlichen Behandlungsplan. Jetzt Termin vereinbaren!",
      path: "/hautanalyse-burbach"
    },
    breadcrumb: [
      { name: "Startseite", url: "/" },
      { name: "Gesichtsbehandlungen", url: "/gesichtsbehandlungen" },
      { name: "Hautanalyse", url: "/hautanalyse-burbach" }
    ],
    heroTitle: "Professionelle Hautanalyse in Burbach",
    heroSubtitle: "Individuelle Hauttyp-Bestimmung als Grundlage für gezielte Behandlungen",
    introText: "Jede Haut ist einzigartig. Bevor wir eine Behandlung empfehlen, nehmen wir uns Zeit für eine gründliche Hautanalyse. Wir bestimmen Ihren Hauttyp, erkennen aktuelle Hautprobleme und entwickeln daraus einen individuellen Pflegeplan – die Basis für sichtbare und nachhaltige Ergebnisse.",
    causesTitle: "Warum ist eine Hautanalyse wichtig?",
    causes: [
      "Jeder Hauttyp reagiert anders auf Pflege und Behandlungen",
      "Falsche Produkte können Hautprobleme verschlimmern",
      "Unreinheiten können verschiedene Ursachen haben",
      "Hautzustand verändert sich mit Alter, Hormonen und Jahreszeiten",
      "Gezielte Behandlungen wirken effektiver als Standardprogramme",
      "Prävention ist langfristig wirksamer als Korrektur"
    ],
    symptomsTitle: "Wann ist eine Hautanalyse sinnvoll?",
    symptoms: [
      "Wiederkehrende Unreinheiten trotz Pflege",
      "Unklarer Hauttyp (fettig, trocken oder Mischhaut)",
      "Empfindliche Haut mit häufigen Reaktionen",
      "Veränderte Hautbeschaffenheit (z. B. in den Wechseljahren)",
      "Wunsch nach gezielter Anti-Aging-Strategie",
      "Vor der ersten professionellen Gesichtsbehandlung"
    ],
    solutionsTitle: "So läuft Ihre Hautanalyse ab",
    solutionsIntro: "In einem ruhigen, persönlichen Gespräch nehmen wir uns die Zeit, Ihre Haut ganzheitlich zu beurteilen.",
    solutions: [
      { name: "Hauttyp-Bestimmung", description: "Wir bestimmen ob Ihre Haut eher trocken, fettig, Mischhaut oder empfindlich ist und wie sich Ihr Hauttyp in verschiedenen Gesichtszonen verhält." },
      { name: "Zustandsanalyse", description: "Wir betrachten aktuelle Hautveränderungen wie Unreinheiten, Rötungen, Pigmentierungen, Trockenheitszonen oder erste Anzeichen von Hautalterung." },
      { name: "Pflege-Check", description: "Gemeinsam schauen wir uns Ihre aktuelle Pflegeroutine an und prüfen, ob die verwendeten Produkte zu Ihrem Hauttyp passen." },
      { name: "Individueller Behandlungsplan", description: "Auf Basis aller Erkenntnisse erstellen wir eine Empfehlung – von der geeigneten Behandlung bis zur optimierten Heimpflege." }
    ],
    whenProfessional: "Eine professionelle Hautanalyse lohnt sich besonders, wenn Sie unsicher über Ihren Hauttyp sind, Ihre Pflegeprodukte nicht die gewünschte Wirkung zeigen oder Sie einen fundierten Einstieg in die professionelle Hautpflege suchen. Die Analyse ist auch der ideale Startpunkt für eine langfristige Zusammenarbeit zur Verbesserung Ihrer Hautgesundheit.",
    faqs: [
      { question: "Wie läuft eine professionelle Hautanalyse ab?", answer: "Die Analyse beginnt mit einem persönlichen Gespräch über Ihre Hautgeschichte, aktuelle Pflege und Wünsche. Anschließend beurteilen wir Ihren Hauttyp und -zustand systematisch und entwickeln daraus einen individuellen Behandlungs- und Pflegeplan. Die gesamte Analyse dauert etwa 15 bis 20 Minuten." },
      { question: "Was kostet eine Hautanalyse in Burbach?", answer: "Die individuelle Hautanalyse ist Teil jeder Erstbehandlung und jedes Beratungsgespräches bei Entrance in Harmony. Wir nehmen uns ausreichend Zeit, Ihren Hauttyp zu bestimmen und die passende Behandlung zu empfehlen – transparent und ohne versteckte Kosten." },
      { question: "Wie oft sollte man eine Hautanalyse machen?", answer: "Wir empfehlen eine gründliche Hautanalyse bei der ersten Behandlung und danach etwa alle sechs bis zwölf Monate, da sich der Hautzustand mit den Jahreszeiten, hormonellen Veränderungen und dem Alter wandelt. So passen wir Ihren Pflegeplan optimal an." },
      { question: "Für wen ist eine professionelle Hautanalyse geeignet?", answer: "Für jeden, der seine Haut besser verstehen möchte. Ob Teenagerhaut mit Unreinheiten, reife Haut mit Anti-Aging-Wünschen oder empfindliche Haut mit Reaktionsneigung – die Analyse bildet immer die Grundlage für eine gezielte, wirksame Pflege." }
    ],
    relatedTreatments: [
      { name: "Gesichtsbehandlungen", href: "/gesichtsbehandlungen", description: "Alle Behandlungen im Überblick" },
      { name: "Akne Behandlung", href: "/akne-behandlung-siegen", description: "Behandlung bei unreiner Haut" },
      { name: "Rosazea Behandlung", href: "/rosazea-behandlung", description: "Spezialbehandlung bei Rötungen" }
    ],
    localText: "Kundinnen aus Siegen (57072), Kreuztal (57223), Netphen (57250), Neunkirchen (57290), Haiger (35708), Dillenburg (35683), Betzdorf (57518) und dem Westerwald nutzen unsere Hautanalyse in Burbach (57299) als Einstieg in ihre individuelle Hautpflege.",
    ctaText: "Starten Sie mit einer professionellen Hautanalyse – die Grundlage für Ihre persönliche Hautstrategie."
  },

  "kollagen-aufbau-gesicht": {
    slug: "kollagen-aufbau-gesicht",
    seo: {
      title: "Kollagen aufbauen im Gesicht – Behandlung in Burbach",
      description: "Kollagen im Gesicht natürlich aufbauen. Microneedling & Red Touch Pro Laser in Burbach bei Siegen. Straffere Haut ohne OP. Jetzt beraten lassen!",
      path: "/kollagen-aufbau-gesicht"
    },
    breadcrumb: [
      { name: "Startseite", url: "/" },
      { name: "Laserbehandlungen", url: "/laserbehandlungen" },
      { name: "Kollagen aufbauen", url: "/kollagen-aufbau-gesicht" }
    ],
    heroTitle: "Kollagen aufbauen im Gesicht – natürlich und effektiv",
    heroSubtitle: "Gezielte Kollagenstimulation mit Microneedling und Laser",
    introText: "Ab dem 25. Lebensjahr nimmt die körpereigene Kollagenproduktion schrittweise ab. Die Haut verliert an Spannkraft, Elastizität und Volumen. In unserem Studio in Burbach setzen wir auf nicht-invasive Methoden, die die natürliche Kollagenneubildung gezielt anregen – für eine festere, strahlendere Haut ohne operative Eingriffe.",
    causesTitle: "Warum nimmt Kollagen ab?",
    causes: [
      "Natürlicher Alterungsprozess ab Mitte 20",
      "UV-Strahlung beschleunigt den Kollagenabbau",
      "Rauchen und ungesunde Ernährung",
      "Chronischer Stress und Schlafmangel",
      "Hormonelle Veränderungen (Wechseljahre)",
      "Umwelteinflüsse und freie Radikale"
    ],
    symptomsTitle: "Anzeichen von Kollagenmangel",
    symptoms: [
      "Feine Linien und erste Fältchen",
      "Nachlassende Hautspannkraft",
      "Verlust von Gesichtsvolumen",
      "Trockene, weniger geschmeidige Haut",
      "Vergrößerte Poren",
      "Längere Regenerationszeit der Haut"
    ],
    solutionsTitle: "Unsere Methoden zur Kollagenstimulation",
    solutionsIntro: "Wir nutzen wissenschaftlich fundierte Verfahren, die Ihre Haut zur eigenen Kollagenproduktion anregen.",
    solutions: [
      { name: "Red Touch Pro Laser", description: "Die 675-nm-Wellenlänge des DEKA Lasers dringt gezielt in tiefere Hautschichten ein und stimuliert die Neokollagenese – die Neubildung von Kollagen und Elastin. Sanft, ohne OP, ohne Ausfallzeit." },
      { name: "Microneedling", description: "Kontrollierte Mikroverletzungen aktivieren die natürliche Wundheilung und damit die Kollagen- und Elastinproduktion. Besonders wirksam bei feinen Linien und Hautstrukturverbesserung." },
      { name: "Carboxy Therapie", description: "Die CO₂-Einleitung in die Haut fördert die Durchblutung und Sauerstoffversorgung, was die Zellaktivierung und Kollagensynthese unterstützt." },
      { name: "BB Glow mit Microneedling", description: "Verbindet Kollagenstimulation durch Microneedling mit einem ebenmäßigeren Teint – zwei Vorteile in einer Behandlung." }
    ],
    whenProfessional: "Wenn Sie erste Anzeichen von Hauterschlaffung, feinen Linien oder Volumenverlust bemerken, ist eine professionelle Kollagenstimulation besonders wirkungsvoll. Je früher Sie beginnen, desto besser lässt sich der natürliche Kollagenabbau verlangsamen. Wir beraten Sie individuell zu den Möglichkeiten.",
    faqs: [
      { question: "Wie kann man Kollagen im Gesicht aufbauen?", answer: "Professionelle Behandlungen wie Microneedling und Laserbehandlungen stimulieren die körpereigene Kollagenproduktion gezielt. Der Red Touch Pro Laser erreicht tiefere Hautschichten als topische Produkte und regt die Neokollagenese effektiv an. Ergänzend unterstützt eine abgestimmte Pflege den Aufbauprozess." },
      { question: "Was hilft gegen Falten ohne OP?", answer: "Nicht-invasive Verfahren wie der Red Touch Pro Laser und Microneedling können feine Linien und Falten sichtbar reduzieren, indem sie die natürliche Kollagen- und Elastinproduktion anregen. Die Behandlungen sind sanft, gut verträglich und erfordern keine Ausfallzeit." },
      { question: "Ab welchem Alter ist Kollagenaufbau sinnvoll?", answer: "Präventiver Kollagenaufbau kann ab Mitte bis Ende 20 sinnvoll sein, wenn die natürliche Produktion abnimmt. Für intensive Behandlungen gibt es kein zu spät – auch reifere Haut profitiert deutlich von der Kollagenstimulation. Wir empfehlen eine individuelle Beratung." },
      { question: "Wie viele Behandlungen braucht man für Kollagenaufbau?", answer: "Je nach Methode und Ausgangszustand empfehlen wir drei bis fünf Sitzungen im Abstand von vier bis sechs Wochen. Der Kollagenaufbau setzt sich über Wochen nach der Behandlung fort. Sichtbare Straffung ist oft schon nach der ersten Sitzung spürbar." }
    ],
    relatedTreatments: [
      { name: "Red Touch Pro Laser", href: "/laserbehandlungen", description: "Nicht-invasive Hautverjüngung" },
      { name: "Faltenbehandlung", href: "/faltenbehandlung-siegerland", description: "Anti-Aging ohne OP" },
      { name: "Gesichtsbehandlungen", href: "/gesichtsbehandlungen", description: "Alle Behandlungen im Überblick" }
    ],
    localText: "Kundinnen aus Siegen (57072), Kreuztal (57223), Haiger (35708), Dillenburg (35683), Herborn (35745), Betzdorf (57518) und dem Westerwald vertrauen auf unsere Kollagen-Behandlungen in Burbach (57299).",
    ctaText: "Starten Sie Ihr persönliches Anti-Aging-Programm mit einer individuellen Beratung."
  },

  "faltenbehandlung-siegerland": {
    slug: "faltenbehandlung-siegerland",
    seo: {
      title: "Faltenbehandlung Siegerland – Anti-Aging ohne OP",
      description: "Falten reduzieren ohne OP in Burbach bei Siegen. Red Touch Pro Laser, Microneedling & Kollagenstimulation. Sichtbare Straffung. Jetzt Beratung vereinbaren!",
      path: "/faltenbehandlung-siegerland"
    },
    breadcrumb: [
      { name: "Startseite", url: "/" },
      { name: "Laserbehandlungen", url: "/laserbehandlungen" },
      { name: "Faltenbehandlung", url: "/faltenbehandlung-siegerland" }
    ],
    heroTitle: "Faltenbehandlung im Siegerland – Anti-Aging ohne OP",
    heroSubtitle: "Sichtbare Hautverjüngung mit Laser und Microneedling",
    introText: "Falten gehören zum natürlichen Alterungsprozess, aber sie müssen nicht akzeptiert werden, wenn Sie sich eine straffere Haut wünschen. In unserem Kosmetikstudio in Burbach bieten wir sanfte Anti-Aging-Behandlungen, die Falten reduzieren und die Haut sichtbar verjüngen – ganz ohne Operation und ohne Ausfallzeit.",
    causesTitle: "Wie entstehen Falten?",
    causes: [
      "Abnehmende Kollagen- und Elastinproduktion mit dem Alter",
      "UV-Strahlung als Hauptursache für vorzeitige Hautalterung",
      "Wiederholte Mimik (Stirnfalten, Lachfalten, Krähenfüße)",
      "Feuchtigkeitsverlust und trockene Haut",
      "Rauchen, Stress und Schlafmangel",
      "Genetische Veranlagung"
    ],
    symptomsTitle: "Typische Faltenarten",
    symptoms: [
      "Feine Linien um Augen und Mund",
      "Stirnfalten und Zornesfalte",
      "Nasolabialfalten (Falten von der Nase zum Mundwinkel)",
      "Halsfalten und Dekolleté-Fältchen",
      "Krähenfüße an den Augenwinkeln",
      "Allgemeiner Elastizitätsverlust und erschlaffte Konturen"
    ],
    solutionsTitle: "Unsere Anti-Aging-Behandlungen",
    solutionsIntro: "Sanfte Methoden, die Ihre natürliche Schönheit betonen und die Haut von innen heraus verjüngen.",
    solutions: [
      { name: "Red Touch Pro Laser", description: "Die effektivste nicht-invasive Methode zur Faltenreduktion in unserem Studio. Die 675-nm-Wellenlänge stimuliert die Kollagenneubildung in der Tiefe – für straffere, glattere Haut an Gesicht, Hals, Dekolleté und Händen." },
      { name: "Microneedling", description: "Regt die natürliche Hauterneuerung an und kann feine Linien und oberflächliche Falten sichtbar verbessern. Besonders wirksam in Kombination mit dem Laser." },
      { name: "B-Tox-Peel", description: "Intensivbehandlung mit botulinum-ähnlichem Glättungseffekt – für eine sichtbar geglättete Hautoberfläche ohne Injektion." },
      { name: "Individuelle Pflegestrategie", description: "Ergänzende Beratung zu Anti-Aging-Wirkstoffen und Sonnenschutz für eine langfristige Hautverjüngungsstrategie." }
    ],
    whenProfessional: "Wenn erste Fältchen sichtbar werden, Cremes allein nicht mehr ausreichen oder Sie einen proaktiven Ansatz gegen Hautalterung wünschen, bieten professionelle Behandlungen eine wirkungsvolle Ergänzung. Wir beraten ehrlich und empfehlen nur das, was zu Ihrem Hauttyp und Ihren Zielen passt.",
    faqs: [
      { question: "Was hilft gegen Falten ohne OP?", answer: "Laserbehandlungen wie der Red Touch Pro und Microneedling gehören zu den wirksamsten nicht-invasiven Methoden zur Faltenreduktion. Sie stimulieren die körpereigene Kollagenproduktion und können feine Linien und tiefere Falten sichtbar verbessern – sanft, schmerzarm und ohne Ausfallzeit." },
      { question: "Wie effektiv ist Laserbehandlung gegen Falten?", answer: "Der Red Touch Pro Laser zeigt in der Regel bereits nach der ersten Sitzung sichtbare Verbesserungen. Die Haut wirkt straffer und frischer. Die vollständige Wirkung entfaltet sich über mehrere Wochen, da die Kollagenneubildung Zeit benötigt. Eine Serie von Behandlungen optimiert das Ergebnis." },
      { question: "Ab welchem Alter sollte man mit Anti-Aging beginnen?", answer: "Prävention kann ab Ende 20 sinnvoll sein, etwa durch guten Sonnenschutz und erste Stimulationsbehandlungen. Für intensivere Anti-Aging-Behandlungen gibt es kein oberes Alterslimit – auch reife Haut profitiert deutlich von Kollagenstimulation und professioneller Pflege." },
      { question: "Welche Faltenbehandlung ist für mich geeignet?", answer: "Das hängt von Ihrem Hauttyp, den Faltenarten und Ihren Wünschen ab. In einem persönlichen Beratungsgespräch analysieren wir Ihre Haut und empfehlen die optimale Behandlungskombination. Oft bringt die Verbindung von Laser und Microneedling die besten Ergebnisse." }
    ],
    relatedTreatments: [
      { name: "Red Touch Pro Laser", href: "/laserbehandlungen", description: "Hautverjüngung ohne OP" },
      { name: "Kollagen aufbauen", href: "/kollagen-aufbau-gesicht", description: "Natürliche Kollagenstimulation" },
      { name: "Gesichtsbehandlungen", href: "/gesichtsbehandlungen", description: "Alle Behandlungen im Überblick" }
    ],
    localText: "Kundinnen aus dem gesamten Siegerland nutzen unsere Anti-Aging-Behandlungen: Siegen (57072), Kreuztal (57223), Netphen (57250), Freudenberg (57258), Hilchenbach (57271), Haiger (35708), Bad Marienberg (56470), Hachenburg (57627).",
    ctaText: "Vereinbaren Sie Ihr persönliches Anti-Aging-Beratungsgespräch."
  },

  "pigmentflecken-entfernen": {
    slug: "pigmentflecken-entfernen",
    seo: {
      title: "Pigmentflecken entfernen – Laser & Peeling Burbach",
      description: "Pigmentflecken und Altersflecken in Burbach bei Siegen behandeln. Laser, Peeling & gezielte Pflege für einen ebenmäßigen Teint. Jetzt Termin vereinbaren!",
      path: "/pigmentflecken-entfernen"
    },
    breadcrumb: [
      { name: "Startseite", url: "/" },
      { name: "Laserbehandlungen", url: "/laserbehandlungen" },
      { name: "Pigmentflecken entfernen", url: "/pigmentflecken-entfernen" }
    ],
    heroTitle: "Pigmentflecken behandeln in Burbach",
    heroSubtitle: "Für einen ebenmäßigen, strahlenden Teint",
    introText: "Pigmentflecken, Altersflecken und ungleichmäßige Pigmentierung können das Hautbild unruhig erscheinen lassen. In unserem Studio bieten wir gezielte Behandlungen, die das Erscheinungsbild von Hyperpigmentierungen verbessern und zu einem ebenmäßigeren Teint beitragen können.",
    causesTitle: "Ursachen von Pigmentflecken",
    causes: [
      "Übermäßige Sonneneinstrahlung (UV-Schäden)",
      "Hormonelle Veränderungen (Schwangerschaft, Pille, Wechseljahre)",
      "Natürlicher Alterungsprozess (Altersflecken)",
      "Entzündungsbedingte Pigmentierung (nach Akne, Verletzungen)",
      "Medikamente, die die Lichtempfindlichkeit erhöhen",
      "Genetische Veranlagung"
    ],
    symptomsTitle: "Arten von Pigmentstörungen",
    symptoms: [
      "Sonnenflecken (Lentigines solares)",
      "Altersflecken (Lentigines seniles)",
      "Melasma (großflächige, hormonell bedingte Pigmentierung)",
      "Postinflammatorische Hyperpigmentierung (nach Entzündungen)",
      "Sommersprossen (Epheliden) – verstärkt durch Sonne",
      "Ungleichmäßiger Hautton und fahler Teint"
    ],
    solutionsTitle: "Unsere Behandlungen bei Pigmentflecken",
    solutionsIntro: "Je nach Ursache und Pigmenttyp setzen wir unterschiedliche Verfahren ein.",
    solutions: [
      { name: "Red Touch Pro Laser", description: "Gezielter Einsatz der 675-nm-Wellenlänge zur Hauterneuerung und Verbesserung des Hauttons. Die Laserbehandlung kann Pigmentunregelmäßigkeiten sichtbar reduzieren." },
      { name: "Chemische Peelings", description: "Kontrollierte Hauterneuerung, die oberflächliche Pigmentierungen abtragen und einen frischeren, gleichmäßigeren Teint fördern kann." },
      { name: "BB Glow", description: "Semi-permanente Foundation per Microneedling – kaschiert Pigmentunregelmäßigkeiten und schenkt der Haut sofortigen, natürlichen Glow." },
      { name: "Sonnenschutz-Beratung", description: "Konsequenter UV-Schutz ist die wichtigste Maßnahme zur Vorbeugung neuer Pigmentflecken. Wir beraten Sie zu geeigneten Produkten." }
    ],
    whenProfessional: "Wenn Pigmentflecken zunehmen, sich verändern oder Sie sich einen gleichmäßigeren Teint wünschen, kann eine professionelle Behandlung helfen. Wichtig: Auffällige oder sich verändernde Pigmentmale sollten zuerst dermatologisch abgeklärt werden. Wir behandeln ausschließlich kosmetisch relevante Pigmentveränderungen.",
    faqs: [
      { question: "Welche Behandlung hilft bei Pigmentflecken?", answer: "Laserbehandlungen und chemische Peelings gehören zu den wirksamsten kosmetischen Methoden bei Pigmentflecken. Der Red Touch Pro Laser kann das Erscheinungsbild von Hyperpigmentierungen sichtbar verbessern. Ergänzend ist konsequenter Sonnenschutz entscheidend, um die Neubildung von Flecken zu reduzieren." },
      { question: "Können Pigmentflecken vollständig entfernt werden?", answer: "Viele oberflächliche Pigmentflecken lassen sich deutlich aufhellen oder reduzieren. Hormonell bedingte Pigmentierungen wie Melasma können hartnäckiger sein und erfordern eine langfristige Behandlungsstrategie. Eine ehrliche Einschätzung der Möglichkeiten besprechen wir im Beratungsgespräch." },
      { question: "Ist Laserbehandlung bei Pigmentflecken sicher?", answer: "Der Red Touch Pro Laser arbeitet mit einer kontrollierten Wellenlänge und integrierter Hautkühlung. Die Behandlung ist sanft und gut verträglich. Vor jeder Behandlung klären wir ab, ob die Pigmentveränderung für eine kosmetische Behandlung geeignet ist." },
      { question: "Wie kann ich neuen Pigmentflecken vorbeugen?", answer: "Täglicher Sonnenschutz mit hohem LSF ist die wichtigste Maßnahme. Ergänzend empfehlen wir antioxidative Pflege und regelmäßige professionelle Behandlungen. Eine gute Hautpflege-Routine kann das Risiko neuer Pigmentveränderungen deutlich reduzieren." }
    ],
    relatedTreatments: [
      { name: "Red Touch Pro Laser", href: "/laserbehandlungen", description: "Hautverjüngung und Pigmentreduktion" },
      { name: "Gesichtsbehandlungen", href: "/gesichtsbehandlungen", description: "Peelings und Pflegebehandlungen" },
      { name: "Faltenbehandlung", href: "/faltenbehandlung-siegerland", description: "Anti-Aging ohne OP" }
    ],
    localText: "Kundinnen aus Dillenburg (35683), Haiger (35708), Herborn (35745), Siegen (57072), Betzdorf (57518), Herdorf (57562) und dem Westerwald vertrauen auf unsere Pigmentbehandlungen in Burbach (57299).",
    ctaText: "Lassen Sie Ihre Pigmentflecken professionell beurteilen – vereinbaren Sie ein Beratungsgespräch."
  },

  "rosazea-behandlung": {
    slug: "rosazea-behandlung",
    seo: {
      title: "Rosazea Behandlung Siegerland – Rötungen lindern",
      description: "Rosazea und Couperose in Burbach bei Siegen behandeln. Laser, beruhigende Pflege & individuelle Beratung. Rötungen sichtbar mildern. Jetzt Termin buchen!",
      path: "/rosazea-behandlung"
    },
    breadcrumb: [
      { name: "Startseite", url: "/" },
      { name: "Laserbehandlungen", url: "/laserbehandlungen" },
      { name: "Rosazea Behandlung", url: "/rosazea-behandlung" }
    ],
    heroTitle: "Rosazea Behandlung in Burbach bei Siegen",
    heroSubtitle: "Rötungen mildern, Hautbarriere stärken, Wohlbefinden zurückgewinnen",
    introText: "Rosazea und Couperose können Betroffene stark belasten – sichtbare Rötungen, erweiterte Äderchen und empfindliche Haut. In unserem Kosmetikstudio bieten wir einfühlsame, auf Rosazea-Haut abgestimmte Behandlungen, die Rötungen mildern und die Hautbarriere stärken können. Immer sanft, immer individuell.",
    causesTitle: "Was kann Rosazea auslösen oder verschlimmern?",
    causes: [
      "Genetische Veranlagung",
      "Überempfindliche Blutgefäße in der Gesichtshaut",
      "Scharfe Speisen, Alkohol und heiße Getränke",
      "Extreme Temperaturen und Temperaturwechsel",
      "Stress und emotionale Belastung",
      "Aggressive Hautpflegeprodukte"
    ],
    symptomsTitle: "Typische Anzeichen von Rosazea",
    symptoms: [
      "Anhaltende Gesichtsrötung (besonders Wangen und Nase)",
      "Sichtbare erweiterte Äderchen (Teleangiektasien)",
      "Brennen, Stechen oder Wärmegefühl der Haut",
      "Entzündliche Papeln und Pusteln (Rosazea-Pickel)",
      "Trockene, empfindliche und reaktive Haut",
      "Flushing (anfallsartige Hautrötung bei Triggern)"
    ],
    solutionsTitle: "Unsere Behandlungsansätze bei Rosazea",
    solutionsIntro: "Rosazea-Haut erfordert besondere Rücksicht. Wir setzen auf sanfte Methoden, die die Haut beruhigen statt reizen.",
    solutions: [
      { name: "Red Touch Pro Laser", description: "Die Laserbehandlung kann erweiterte Äderchen und Rötungen gezielt reduzieren. Der Red Touch Pro arbeitet besonders schonend mit integrierter Hautkühlung." },
      { name: "Beruhigende Gesichtsbehandlung", description: "Speziell auf empfindliche Rosazea-Haut abgestimmte Pflege mit entzündungshemmenden und hautbarrierstärkenden Wirkstoffen." },
      { name: "Individuelle Pflegeberatung", description: "Rosazea-Haut braucht die richtigen Produkte. Wir beraten Sie zu einer Pflegeroutine, die Ihre Haut beruhigt statt belastet." },
      { name: "Trigger-Management", description: "Gemeinsam identifizieren wir Ihre persönlichen Auslöser und entwickeln Strategien, um Schübe zu minimieren." }
    ],
    whenProfessional: "Wenn Rötungen und Empfindlichkeit zunehmen, herkömmliche Pflege nicht ausreicht oder Sie sich in Ihrer Haut unwohl fühlen, kann professionelle Unterstützung viel bewirken. Wir arbeiten komplementär zur dermatologischen Behandlung und stimmen unsere Pflege auf verordnete Therapien ab.",
    faqs: [
      { question: "Was hilft bei Rosazea im Gesicht?", answer: "Neben einer angepassten, reizarmen Pflegeroutine können professionelle Behandlungen wie der Red Touch Pro Laser Rötungen sichtbar mildern. Beruhigende Gesichtsbehandlungen stärken die Hautbarriere. Wichtig ist auch, persönliche Trigger zu kennen und zu meiden." },
      { question: "Kann Rosazea durch Kosmetik verschlimmert werden?", answer: "Ja, aggressive Produkte, Peelings mit groben Partikeln, Duftstoffe und Alkohol in Pflegeprodukten können Rosazea verschlimmern. Deshalb ist eine fachkundige Beratung zu geeigneten Produkten so wichtig. Wir empfehlen nur sanfte, hautverträgliche Formulierungen." },
      { question: "Ist eine Laserbehandlung bei Rosazea geeignet?", answer: "Der Red Touch Pro Laser kann bei Rosazea sehr hilfreich sein, insbesondere zur Reduktion von erweiterten Äderchen und anhaltenden Rötungen. Die integrierte Hautkühlung macht die Behandlung besonders schonend. Wir prüfen vorab, ob die Laserbehandlung für Ihre Rosazea-Form geeignet ist." },
      { question: "Kann Rosazea geheilt werden?", answer: "Rosazea ist eine chronische Hauterkrankung, die nicht vollständig heilbar ist. Die Symptome lassen sich jedoch mit der richtigen Pflege, professionellen Behandlungen und Trigger-Management deutlich verbessern. Viele Betroffene erleben langfristig eine spürbare Linderung." }
    ],
    relatedTreatments: [
      { name: "Red Touch Pro Laser", href: "/laserbehandlungen", description: "Rötungen gezielt behandeln" },
      { name: "Hautanalyse", href: "/hautanalyse-burbach", description: "Ihren Hauttyp verstehen" },
      { name: "Gesichtsbehandlungen", href: "/gesichtsbehandlungen", description: "Sanfte Pflege für empfindliche Haut" }
    ],
    localText: "Betroffene aus Siegen (57072), Kreuztal (57223), Netphen (57250), Neunkirchen (57290), Haiger (35708), Betzdorf (57518), Herdorf (57562) und Bad Marienberg (56470) finden bei uns in Burbach (57299) einfühlsame Rosazea-Behandlung.",
    ctaText: "Vereinbaren Sie ein Beratungsgespräch – wir nehmen uns Zeit für Ihre empfindliche Haut."
  },

  "grossporige-haut-behandlung": {
    slug: "grossporige-haut-behandlung",
    seo: {
      title: "Große Poren verfeinern – Behandlung in Burbach",
      description: "Große Poren sichtbar verfeinern in Burbach bei Siegen. Tiefenreinigung, Microneedling & Laser für ein feineres Hautbild. Jetzt Termin vereinbaren!",
      path: "/grossporige-haut-behandlung"
    },
    breadcrumb: [
      { name: "Startseite", url: "/" },
      { name: "Gesichtsbehandlungen", url: "/gesichtsbehandlungen" },
      { name: "Große Poren behandeln", url: "/grossporige-haut-behandlung" }
    ],
    heroTitle: "Große Poren verfeinern in Burbach",
    heroSubtitle: "Für ein feineres, ebenmäßigeres Hautbild",
    introText: "Vergrößerte Poren können das Hautbild unruhig wirken lassen und den Teint uneben erscheinen lassen. In unserem Kosmetikstudio in Burbach bieten wir gezielte Behandlungen, die die Porengröße sichtbar verfeinern und die Hautstruktur verbessern können. Sorgfältig und individuell abgestimmt.",
    causesTitle: "Warum werden Poren größer?",
    causes: [
      "Genetische Veranlagung zu erhöhter Talgproduktion",
      "Hormonelle Einflüsse (Pubertät, Zyklusabhängig)",
      "Nachlassende Hautelastizität mit dem Alter",
      "Komedonen und verstopfte Poren dehnen das Gewebe",
      "UV-Strahlung schwächt das Kollagengerüst",
      "Ungeeignete Pflegeprodukte und komedogene Inhaltsstoffe"
    ],
    symptomsTitle: "Wann werden große Poren zum Problem?",
    symptoms: [
      "Sichtbar vergrößerte Poren besonders in der T-Zone",
      "Unebenes, grobporiges Hautbild",
      "Schnell nachfettende Haut",
      "Vermehrte Mitesser und Unreinheiten",
      "Make-up hält nicht gleichmäßig",
      "Orangenhaut-Optik im Gesicht"
    ],
    solutionsTitle: "Unsere Behandlungen für feinere Poren",
    solutionsIntro: "Eine Kombination aus Reinigung, Stimulation und Pflege bringt die besten Ergebnisse.",
    solutions: [
      { name: "Professionelle Tiefenreinigung", description: "Gründliche Ausreinigung verstopfter Poren, enzymatisches Peeling und beruhigende Nachpflege. Bildet die Grundlage für alle weiteren Behandlungen." },
      { name: "Microneedling", description: "Stimuliert die Kollagenproduktion rund um die Poren und kann deren Erscheinungsbild sichtbar verfeinern. Die Hautstruktur wird insgesamt glatter." },
      { name: "Red Touch Pro Laser", description: "Strafft das Kollagengerüst in der Tiefe und kann vergrößerte Poren nachhaltig reduzieren – besonders wirksam bei altersbedingter Porenvergrößerung." },
      { name: "Regelmäßige Facials", description: "Regelmäßige professionelle Reinigung verhindert die erneute Verstopfung und dehnung der Poren. Empfehlung: alle vier bis sechs Wochen." }
    ],
    whenProfessional: "Wenn die Poren trotz guter Heimpflege sichtbar groß bleiben, Unreinheiten wiederkehren oder Sie sich ein feineres Hautbild wünschen, kann eine professionelle Behandlung spürbare Verbesserungen bringen. Besonders die Kombination aus Tiefenreinigung und Kollagenstimulation zeigt oft gute Ergebnisse.",
    faqs: [
      { question: "Welche Behandlung hilft gegen große Poren?", answer: "Eine Kombination aus professioneller Tiefenreinigung und Kollagenstimulation durch Microneedling oder Laser zeigt die besten Ergebnisse bei vergrößerten Poren. Die Reinigung befreit die Poren, während die Kollagenstimulation das Gewebe strafft und die Poren optisch verkleinert." },
      { question: "Können große Poren dauerhaft verkleinert werden?", answer: "Die Porengröße ist genetisch mitbestimmt und kann nicht vollständig verändert werden. Allerdings lässt sich das Erscheinungsbild durch regelmäßige professionelle Behandlung und abgestimmte Pflege deutlich verfeinern. Die Haut wirkt glatter und ebenmäßiger." },
      { question: "Wie oft sollte man bei großen Poren zum Kosmetiker?", answer: "Für sichtbare Ergebnisse empfehlen wir anfangs eine Behandlung alle vier Wochen. Nach der Intensivphase genügt oft ein Termin alle sechs bis acht Wochen zur Erhaltung. Die richtige Heimpflege zwischen den Behandlungen ist dabei entscheidend." },
      { question: "Welche Pflege hilft bei großen Poren?", answer: "Milde, nicht komedogene Reinigung, regelmäßiges enzymatisches Peeling und leichte Feuchtigkeit ohne schwere Öle. Niacinamid kann die Talgproduktion regulieren. Wir beraten Sie individuell zu den passenden Produkten für Ihren Hauttyp." }
    ],
    relatedTreatments: [
      { name: "Gesichtsbehandlungen", href: "/gesichtsbehandlungen", description: "Tiefenreinigung und mehr" },
      { name: "Akne Behandlung", href: "/akne-behandlung-siegen", description: "Bei Unreinheiten und Pickeln" },
      { name: "Hautanalyse", href: "/hautanalyse-burbach", description: "Ihren Hauttyp bestimmen" }
    ],
    localText: "Kundinnen aus Siegen (57072), Kreuztal (57223), Netphen (57250), Haiger (35708), Dillenburg (35683), Betzdorf (57518) und Herdorf (57562) vertrauen auf unsere Porenbehandlungen in Burbach (57299).",
    ctaText: "Vereinbaren Sie einen Termin für eine professionelle Hautanalyse und Porenbehandlung."
  }
};

function SkinProblemPageContent({ data }: { data: SkinProblemPageData }) {
  return (
    <>
      <SEOHead
        title={data.seo.title}
        description={data.seo.description}
        path={data.seo.path}
        structuredData={breadcrumbSchema(data.breadcrumb)}
      />
      <Header />

      <section className="relative py-16 md:py-24 bg-gradient-to-b from-mauve-50 to-background" data-testid="hero-section">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <ScrollReveal>
            <Badge variant="outline" className="mb-4 text-sm font-normal border-accent/30 text-mauve-600" data-testid="badge-category">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Hautgesundheit
            </Badge>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4" data-testid="heading-title">
              {data.heroTitle}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-subtitle">
              {data.heroSubtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <WaveDivider />

      <section className="py-12 md:py-16" data-testid="section-intro">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-intro">
              {data.introText}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-mauve-50/50" data-testid="section-causes">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl mb-6 text-foreground" data-testid="heading-causes">
              {data.causesTitle}
            </h2>
          </ScrollReveal>
          <StaggerContainer className="space-y-3">
            {data.causes.map((cause, i) => (
              <StaggerItem key={i}>
                <div className="flex items-start gap-3" data-testid={`item-cause-${i}`}>
                  <div className="mt-1 text-accent/70 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <p className="text-muted-foreground">{cause}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-12 md:py-16" data-testid="section-symptoms">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl mb-6 text-foreground" data-testid="heading-symptoms">
              {data.symptomsTitle}
            </h2>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-2 gap-3">
            {data.symptoms.map((symptom, i) => (
              <StaggerItem key={i}>
                <Card className="h-full" data-testid={`card-symptom-${i}`}>
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="mt-0.5 text-mauve-400 shrink-0">
                      <Search className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-muted-foreground">{symptom}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-mauve-50/50" data-testid="section-solutions">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl mb-3 text-foreground" data-testid="heading-solutions">
              {data.solutionsTitle}
            </h2>
            <p className="text-muted-foreground mb-8">{data.solutionsIntro}</p>
          </ScrollReveal>
          <StaggerContainer className="space-y-4">
            {data.solutions.map((solution, i) => (
              <StaggerItem key={i}>
                <Card data-testid={`card-solution-${i}`}>
                  <CardContent className="p-5">
                    <h3 className="font-heading text-xl mb-2 text-foreground">{solution.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{solution.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-12 md:py-16" data-testid="section-when-professional">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-8 h-8 text-accent/70 shrink-0 mt-1" />
                  <div>
                    <h2 className="font-heading text-xl md:text-2xl mb-3 text-foreground" data-testid="heading-when-professional">
                      Wann ist professionelle Behandlung sinnvoll?
                    </h2>
                    <p className="text-muted-foreground leading-relaxed" data-testid="text-when-professional">
                      {data.whenProfessional}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-mauve-50/50" data-testid="section-faq">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl mb-8 text-foreground" data-testid="heading-faq">
              Häufige Fragen
            </h2>
          </ScrollReveal>
          <div className="space-y-3">
            {data.faqs.map((faq, i) => (
              <ScrollReveal key={i}>
                <details className="group" data-testid={`faq-item-${i}`}>
                  <summary className="flex items-center justify-between p-4 cursor-pointer rounded-md bg-card border hover-elevate">
                    <span className="font-medium text-foreground pr-4">{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-4 pb-4 pt-2">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16" data-testid="section-related">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl mb-6 text-foreground" data-testid="heading-related">
              Passende Behandlungen
            </h2>
          </ScrollReveal>
          <StaggerContainer className="grid md:grid-cols-3 gap-4">
            {data.relatedTreatments.map((treatment, i) => (
              <StaggerItem key={i}>
                <Link href={treatment.href}>
                  <Card className="h-full hover-elevate cursor-pointer" data-testid={`card-related-${i}`}>
                    <CardContent className="p-5">
                      <h3 className="font-heading text-lg mb-1 text-foreground">{treatment.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{treatment.description}</p>
                      <span className="text-accent text-sm flex items-center gap-1">
                        Mehr erfahren <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-mauve-50/50" data-testid="section-local">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <ScrollReveal>
            <p className="text-muted-foreground mb-6" data-testid="text-local">
              {data.localText}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-t from-mauve-50 to-background" data-testid="section-cta">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl mb-4 text-foreground" data-testid="heading-cta">
              Individuelle Beratung vereinbaren
            </h2>
            <p className="text-muted-foreground mb-8" data-testid="text-cta">
              {data.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" data-testid="button-whatsapp-cta">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Beratung
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" data-testid="button-contact-cta">
                <Link href="/kontakt">
                  Kontakt aufnehmen
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default function SkinProblemPage({ slug }: { slug: string }) {
  const data = pageData[slug];
  if (!data) return null;
  return <SkinProblemPageContent data={data} />;
}
