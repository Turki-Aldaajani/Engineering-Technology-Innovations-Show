import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [, setLocation] = useLocation();

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      {/* CSS Geometric Background */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(30deg, #1B8354 12%, transparent 12.5%, transparent 87%, #1B8354 87.5%, #1B8354),
            linear-gradient(150deg, #1B8354 12%, transparent 12.5%, transparent 87%, #1B8354 87.5%, #1B8354),
            linear-gradient(30deg, #1B8354 12%, transparent 12.5%, transparent 87%, #1B8354 87.5%, #1B8354),
            linear-gradient(150deg, #1B8354 12%, transparent 12.5%, transparent 87%, #1B8354 87.5%, #1B8354),
            linear-gradient(60deg, #54C08A77 25%, transparent 25.5%, transparent 75%, #54C08A77 75%, #54C08A77),
            linear-gradient(60deg, #54C08A77 25%, transparent 25.5%, transparent 75%, #54C08A77 75%, #54C08A77)
          `,
          backgroundSize: "80px 140px",
          backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px",
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, rgba(22,22,22,0.88), rgba(27,131,84,0.72))",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-8">
            <span className="text-lg font-medium tracking-wide">2026 - 1447</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
            معرض الابتكارات الهندسية والتقنية
          </h1>

          <p className="text-xl md:text-2xl text-white/80 font-light mb-8">
            Engineering & Technology Innovations Show
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-lg text-white/90 mb-12">
            <div className="flex items-center gap-2">
              <span className="material-icons">account_balance</span>
              <span>جامعة الإمام محمد بن سعود الإسلامية</span>
            </div>
            <span className="hidden md:inline text-white/50">|</span>
            <div className="flex items-center gap-2">
              <span className="material-icons">event</span>
              <span>2026 - 1447</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              data-testid="button-visitor-register"
              className="w-full sm:w-auto bg-[#1B8354] hover:bg-[#25935F] text-white px-8 py-6 rounded-lg text-lg font-bold shadow-lg"
              onClick={() => setLocation("/register")}
            >
              تسجيل زائر
            </Button>
            <Button
              data-testid="button-booth-reserve"
              variant="outline"
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 rounded-lg text-lg font-bold"
              onClick={() => setLocation("/register")}
            >
              حجز بوث
            </Button>
          </div>

          {/* Upcoming label instead of countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-4"
          >
            <span className="material-icons text-[#54C08A] text-2xl">upcoming</span>
            <div className="text-right">
              <div className="text-white font-bold text-lg">قريباً</div>
              <div className="text-white/70 text-sm">تابع الإعلانات للمزيد من التفاصيل</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
