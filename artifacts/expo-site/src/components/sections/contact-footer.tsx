import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ExpoLogo } from "@/components/ExpoLogo";

export function ContactFooter() {
  const [, setLocation] = useLocation();

  return (
    <footer className="bg-[#161616] text-white" id="contact">
      {/* CTA Strip */}
      <div className="border-b border-white/10 py-12">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">هل أنت مستعد للمشاركة؟</h2>
          <p className="text-white/60 mb-6 max-w-xl mx-auto">
            سجّل الآن واكن جزءاً من معرض الابتكارات الهندسية والتقنية 2026
          </p>
          <Button
            data-testid="button-register-footer-cta"
            onClick={() => setLocation("/register")}
            className="bg-[#1B8354] hover:bg-[#25935F] text-white px-8 py-4 rounded-lg font-bold text-base shadow-sm"
          >
            سجل الآن
          </Button>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Logo + about */}
          <div className="md:col-span-1">
            <ExpoLogo variant="white" />
            <p className="text-white/50 text-sm mt-4 leading-relaxed">
              معرض الابتكارات الهندسية والتقنية منصة لتمكين العقول الشابة وتعزيز التواصل بين الطلبة والجهات الصناعية.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-white mb-4 text-base">روابط سريعة</h3>
            <ul className="space-y-2">
              {[
                { label: "عن المعرض", href: "#about" },
                { label: "المتحدثون", href: "#speakers" },
                { label: "ورش العمل", href: "#workshops" },
                { label: "الرعاة", href: "#sponsors" },
                { label: "الشركاء", href: "#partners" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[#54C08A] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-bold text-white mb-4 text-base">معلومات التواصل</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="material-icons text-[#1B8354] text-base mt-0.5">location_on</span>
                <div>
                  <p className="text-white/80 text-sm font-medium">الموقع</p>
                  <p className="text-white/50 text-sm">جامعة الإمام محمد بن سعود الإسلامية<br />الرياض، المملكة العربية السعودية</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-icons text-[#1B8354] text-base mt-0.5">email</span>
                <div>
                  <p className="text-white/80 text-sm font-medium">البريد الإلكتروني</p>
                  <p className="text-white/50 text-sm" dir="ltr">info@expo.imamu.edu.sa</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-icons text-[#1B8354] text-base mt-0.5">phone</span>
                <div>
                  <p className="text-white/80 text-sm font-medium">الهاتف</p>
                  <p className="text-white/50 text-sm" dir="ltr">+966 11 000 0000</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2026 معرض الابتكارات الهندسية والتقنية. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-white/30 text-xs">
              جامعة الإمام محمد بن سعود الإسلامية
            </p>
            <span className="text-white/20 text-xs">|</span>
            <button
              type="button"
              onClick={() => setLocation("/admin")}
              className="text-white/25 hover:text-white/50 text-xs transition-colors"
              data-testid="link-admin"
            >
              لوحة التحكم
            </button>
            <button
              type="button"
              onClick={() => setLocation("/organizer")}
              className="text-white/25 hover:text-white/50 text-xs transition-colors"
              data-testid="link-organizer"
            >
              المنظم الميداني
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
