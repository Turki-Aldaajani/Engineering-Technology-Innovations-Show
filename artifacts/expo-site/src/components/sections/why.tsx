import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Why() {
  const [, setLocation] = useLocation();
  const reasons = [
    { title: "عرض مشروعك", icon: "present_to_all", desc: "اعرض مشروعك أمام جمهور متخصص من الخبراء والشركات" },
    { title: "بناء شبكة علاقات", icon: "group_add", desc: "تواصل مع الجهات الصناعية والمستثمرين" },
    { title: "فرص الاستثمار", icon: "trending_up", desc: "اكتشف فرص تمويل لأفكارك المبتكرة" },
    { title: "التميز والإبداع", icon: "emoji_events", desc: "تنافس في بيئة محفزة للإبداع التقني" },
    { title: "التعلم والتطوير", icon: "auto_stories", desc: "حضور ورش عمل وجلسات حوارية تقنية" },
    { title: "رؤية السعودية 2030", icon: "flag", desc: "كن جزءاً من تحقيق رؤية المملكة المستقبلية" }
  ];

  return (
    <section id="why" className="py-24 bg-white text-foreground">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">لماذا تشارك</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reasons.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full bg-secondary/10 border-none shadow-sm hover:bg-secondary/30 transition-colors">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-icons text-primary text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-accent mb-2">{item.title}</h3>
                    <p className="text-text-secondary">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            data-testid="button-participate-now"
            className="bg-primary hover:bg-primary-hover text-white px-10 py-6 rounded-lg text-lg font-bold shadow-md"
            onClick={() => setLocation("/register")}
          >
            سجل كمشارك الآن
          </Button>
        </div>
      </div>
    </section>
  );
}