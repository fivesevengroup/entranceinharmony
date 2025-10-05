import { SiWhatsapp } from "react-icons/si";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/491709287722"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      data-testid="button-floating-whatsapp"
      aria-label="WhatsApp Termin vereinbaren"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#25D366]/20 rounded-full blur-xl group-hover:bg-[#25D366]/30 transition-all"></div>
        <div className="relative bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg transition-all duration-300 group-hover:scale-110">
          <SiWhatsapp className="h-7 w-7" />
        </div>
      </div>
    </a>
  );
}
