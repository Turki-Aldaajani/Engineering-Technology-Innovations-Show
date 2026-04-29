import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function SponsorsPartners() {
  const [, setLocation] = useLocation();
  const sponsors = [
    { title: "الرعاة الماسيون", count: 3, gridClass: "grid-cols-1 md:grid-cols-3", sizeClass: "h-32 text-xl" },
    { title: "الرعاة الذهبيون", count: 4, gridClass: "grid-cols-2 md:grid-cols-4", sizeClass: "h-24 text-lg" },
    { title: "الرعاة الفضيون", count: 5, gridClass: "grid-cols-2 md:grid-cols-5", sizeClass: "h-20 text-base" },
    { title: "الرعاة البرونزيون", count: 6, gridClass: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6", sizeClass: "h-16 text-sm" },
  ];

  return (
    <>
      <section id="sponsors" className="py-24 bg-secondary/20 text-foreground">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">الرعاة</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="space-y-16">
            {sponsors.map((tier, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-center text-text-secondary mb-6">{tier.title}</h3>
                <div className={`grid gap-4 ${tier.gridClass}`}>
                  {Array.from({ length: tier.count }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`bg-white border-2 border-primary/20 rounded-xl flex items-center justify-center font-bold text-primary/60 hover:border-primary transition-colors ${tier.sizeClass}`}
                    >
                      شعار الراعي
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button 
              data-testid="button-become-sponsor"
              className="bg-primary hover:bg-primary-hover text-white px-8 py-6 rounded-lg text-lg font-bold shadow-sm"
              onClick={() => setLocation("/register")}
            >
              كن راعياً لمعرض الابتكارات الهندسية والتقنية
            </Button>
          </div>
        </div>
      </section>

      <section id="partners" className="py-24 bg-white text-foreground border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">الشركاء</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-center text-accent mb-8">الشركاء الاستراتيجيون</h3>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {["جامعة الإمام محمد بن سعود الإسلامية", "هيئة الحكومة الرقمية", "وزارة الاتصالات وتقنية المعلومات", "رؤية السعودية 2030"].map((partner, i) => (
                  <div key={i} className="bg-secondary/30 border border-border px-6 py-4 rounded-xl text-center font-bold text-accent md:text-lg min-w-[200px] flex-1 max-w-[280px] shadow-sm flex items-center justify-center min-h-[80px]">
                    {partner}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-center text-accent mb-8">الشركاء الأكاديميون</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-white border-2 border-dashed border-secondary px-6 py-3 rounded-lg text-text-secondary font-medium">
                    شريك أكاديمي
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}