import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WaveDivider from "@/components/WaveDivider";
import { Gem, Award, Heart, Crown, Sparkles } from "lucide-react";
import heroImage from "@assets/Screenshot 2025-10-05 225321_1759697624011.png";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [showGoldDust, setShowGoldDust] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start("visible");
      setTimeout(() => setShowGoldDust(false), 3000);
    };
    sequence();
  }, [controls]);

  return (
    <section className="relative min-h-screen overflow-hidden">
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
            <Gem className="w-5 h-5 text-primary" />
            <span className="text-white font-medium text-sm tracking-wide uppercase">Beauty & Aesthetics</span>
          </div>
        </div>

        <motion.div 
          className="relative inline-block"
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              transition: {
                duration: 2,
                ease: "easeOut"
              }
            }
          }}
        >
          <div className="absolute inset-0 -inset-x-20 -inset-y-10 halo-glow pointer-events-none"></div>
          
          {showGoldDust && [...Array(40)].map((_, i) => {
            const startX = Math.random() * 200 - 100;
            const startY = Math.random() * 200 - 100;
            const endX = (Math.random() - 0.5) * 20;
            const endY = (Math.random() - 0.5) * 20;
            
            return (
              <motion.div
                key={`dust-${i}`}
                className="absolute gold-dust-particle pointer-events-none"
                initial={{ 
                  x: startX,
                  y: startY,
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  x: [startX, endX, endX],
                  y: [startY, endY, endY],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.02,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
                style={{
                  left: '50%',
                  top: '50%',
                }}
              >
                <div className="w-1 h-1 bg-primary rounded-full gold-glow"></div>
              </motion.div>
            );
          })}
          
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute sparkle-particle pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * -80 - 20],
                scale: [0, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: 2.5 + i * 0.5 + Math.random(),
                ease: "easeOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <div className="w-1 h-1 bg-primary rounded-full gold-glow"></div>
            </motion.div>
          ))}

          <motion.h1 
            className="relative font-serif text-4xl md:text-7xl lg:text-8xl font-light mb-6 text-white drop-shadow-2xl tracking-wide"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                transition: {
                  duration: 1.8,
                  delay: 0.3,
                  ease: "easeOut"
                }
              }
            }}
          >
            <motion.span 
              className="block mb-2 relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 1.5,
                    delay: 0.5
                  }
                }
              }}
            >
              <span className="gold-dust-reveal">ENTRANCE IN</span>
            </motion.span>
            <motion.span 
              className="block text-gold-gradient text-shimmer text-5xl md:text-8xl lg:text-9xl relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 1.5,
                    delay: 0.8
                  }
                }
              }}
            >
              <span className="gold-dust-reveal">HARMONY</span>
            </motion.span>
          </motion.h1>
        </motion.div>
        
        <div className="h-0.5 w-32 mx-auto mb-8 gold-shimmer rounded-full fade-up" style={{ animationDelay: "0.6s", opacity: 0 }}></div>

        <p className="text-xl md:text-3xl mb-6 text-white/95 drop-shadow-lg font-light max-w-2xl mx-auto fade-up" style={{ animationDelay: "0.8s", opacity: 0 }}>
          Ihre Schönheitsexpertin in Burbach
        </p>
        <p className="text-lg md:text-xl mb-12 text-white/90 drop-shadow-lg font-light max-w-3xl mx-auto fade-up leading-relaxed" style={{ animationDelay: "1s", opacity: 0 }}>
          Wo Schönheit auf Expertise trifft – Gönnen Sie sich professionelle Beauty-Behandlungen in luxuriöser Atmosphäre
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center fade-up" style={{ animationDelay: "1.2s", opacity: 0 }}>
          <Button
            size="lg"
            variant="ghost"
            className="text-sm px-12 py-6 bg-white/5 backdrop-blur text-white/90 border border-white/20 hover:bg-white/10 hover:border-white/30 font-serif uppercase tracking-widest transition-all duration-300"
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
            className="text-sm px-12 py-6 text-white/80 border border-white/15 hover:bg-white/5 hover:border-white/25 font-serif uppercase tracking-widest transition-all duration-300"
            asChild
            data-testid="button-behandlungen-hero"
          >
            <a href="/leistungen">Behandlungen entdecken</a>
          </Button>
        </div>
      </div>

      <WaveDivider position="bottom" color="hsl(var(--background))" />
    </section>
  );
}
