import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { useState, useEffect, useRef } from "react";

export default function FloatingWhatsApp() {
  const [hideButtons, setHideButtons] = useState(false);

  useEffect(() => {
    const checkFooter = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;
      const footerRect = footer.getBoundingClientRect();
      setHideButtons(footerRect.top < window.innerHeight);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkFooter();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    checkFooter();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-opacity duration-300 ${hideButtons ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <a
        href="https://wa.me/491709287722"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
        data-testid="button-floating-whatsapp"
        aria-label="WhatsApp Termin vereinbaren"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-md group-hover:bg-primary/20 transition-all"></div>
          <div className="relative bg-background/95 backdrop-blur-sm hover:bg-primary/10 border border-primary/20 hover:border-primary/40 text-primary p-3 rounded-full shadow-md transition-all duration-300 hover-elevate active-elevate-2">
            <SiWhatsapp className="h-5 w-5" />
          </div>
        </div>
      </a>
      
      <a
        href="https://instagram.com/entranceinharmony"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
        data-testid="button-floating-instagram"
        aria-label="Instagram folgen"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-md group-hover:bg-primary/20 transition-all"></div>
          <div className="relative bg-background/95 backdrop-blur-sm hover:bg-primary/10 border border-primary/20 hover:border-primary/40 text-primary p-3 rounded-full shadow-md transition-all duration-300 hover-elevate active-elevate-2">
            <SiInstagram className="h-5 w-5" />
          </div>
        </div>
      </a>
    </div>
  );
}
