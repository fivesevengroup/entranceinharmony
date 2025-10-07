import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WaveDivider from "@/components/WaveDivider";
import { Sparkles, Award, Heart } from "lucide-react";
import heroImage from "@assets/Screenshot 2025-10-05 225321_1759697624011.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 text-center pt-44 pb-20">
        <div className="fade-up" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glassmorphism mb-8 border-2 border-white/30 gold-glow">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-white font-medium text-sm tracking-wide uppercase">Beauty & Aesthetics</span>
          </div>
        </div>

        <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl font-light mb-6 text-white drop-shadow-2xl fade-up tracking-wide" style={{ animationDelay: "0.4s", opacity: 0 }}>
          <span className="block mb-2">ENTRANCE IN</span>
          <span className="block text-gold-gradient text-5xl md:text-8xl lg:text-9xl">HARMONY</span>
        </h1>
        
        <div className="h-0.5 w-32 mx-auto mb-8 gold-shimmer rounded-full fade-up" style={{ animationDelay: "0.6s", opacity: 0 }}></div>

        <p className="text-xl md:text-3xl mb-6 text-white/95 drop-shadow-lg font-light max-w-2xl mx-auto fade-up" style={{ animationDelay: "0.8s", opacity: 0 }}>
          Ihre Schönheitsexpertin in Burbach
        </p>
        <p className="text-lg md:text-xl mb-12 text-white/90 drop-shadow-lg font-light max-w-3xl mx-auto fade-up leading-relaxed" style={{ animationDelay: "1s", opacity: 0 }}>
          Wo Schönheit auf Expertise trifft – Gönnen Sie sich professionelle Beauty-Treatments in luxuriöser Atmosphäre
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16 fade-up" style={{ animationDelay: "1.2s", opacity: 0 }}>
          <Button
            size="lg"
            variant="ghost"
            className="text-sm px-12 py-6 bg-white/5 backdrop-blur text-white/90 text-gold-glow border border-white/20 hover:bg-white/10 hover:border-white/30 font-serif uppercase tracking-widest transition-all duration-300"
            asChild
            data-testid="button-termin-hero"
          >
            <a href="https://wa.me/491709287722" target="_blank" rel="noopener noreferrer">
              Jetzt Termin buchen
            </a>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="text-sm px-12 py-6 text-white/80 text-gold-glow border border-white/15 hover:bg-white/5 hover:border-white/25 font-serif uppercase tracking-widest transition-all duration-300"
            asChild
            data-testid="button-behandlungen-hero"
          >
            <a href="/leistungen">Behandlungen entdecken</a>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 fade-up" style={{ animationDelay: "1.4s", opacity: 0 }}>
          <Badge variant="secondary" className="glassmorphism border-2 border-white/20 text-white px-5 py-3 text-sm font-medium">
            <Award className="w-4 h-4 mr-2 text-primary" />
            Zertifiziert & Professionell
          </Badge>
          <Badge variant="secondary" className="glassmorphism border-2 border-white/20 text-white px-5 py-3 text-sm font-medium">
            <Heart className="w-4 h-4 mr-2 text-primary" />
            Mit Herz & Leidenschaft
          </Badge>
          <Badge variant="secondary" className="glassmorphism border-2 border-white/20 text-white px-5 py-3 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            Premium Treatments
          </Badge>
        </div>
      </div>

      <WaveDivider position="bottom" color="hsl(var(--background))" />
    </section>
  );
}
