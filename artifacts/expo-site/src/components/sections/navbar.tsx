import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ExpoLogo } from "@/components/ExpoLogo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "عن المعرض", href: "#about" },
    { label: "الفئات المستهدفة", href: "#audience" },
    { label: "لماذا تشارك", href: "#why" },
    { label: "الأسئلة الشائعة", href: "#faq" },
    { label: "المتحدثون", href: "#speakers" },
    { label: "ورش العمل", href: "#workshops" },
    { label: "الرعاة", href: "#sponsors" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <a href={import.meta.env.BASE_URL} className="block">
          <ExpoLogo variant={scrolled ? "default" : "white"} />
        </a>

        <div className="hidden lg:flex items-center gap-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                scrolled ? "text-foreground" : "text-white/90 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <Button
          data-testid="button-register-nav"
          className="bg-[#1B8354] hover:bg-[#25935F] text-white font-semibold rounded-lg px-6 py-2 shadow-sm"
          onClick={() => setLocation("/register")}
        >
          سجل الآن
        </Button>
      </div>
    </nav>
  );
}
