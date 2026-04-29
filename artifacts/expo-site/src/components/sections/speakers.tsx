import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export function Speakers() {
  const speakers = [
    { name: "د. محمد العتيبي", title: "رئيس تنفيذي", company: "شركة الابتكار التقني", topic: "مستقبل الذكاء الاصطناعي في الهندسة" },
    { name: "م. سارة الأحمد", title: "مديرة مختبر الذكاء الاصطناعي", company: "مركز الأبحاث التقنية", topic: "تطبيقات IoT في الصناعة" },
    { name: "أ. فهد السبيعي", title: "شريك استثماري", company: "صندوق الاستثمار التقني", topic: "تمويل المشاريع الناشئة" },
    { name: "د. نورة الغامدي", title: "أستاذة الهندسة", company: "جامعة الملك سعود", topic: "الابتكار في التعليم الهندسي" },
    { name: "م. عبدالله القحطاني", title: "رئيس قسم الهندسة", company: "أرامكو السعودية", topic: "التحول الرقمي الصناعي" },
    { name: "أ. ريم الشمري", title: "مؤسسة ومديرة تنفيذية", company: "StartupX", topic: "ريادة الأعمال التقنية" },
  ];

  const getInitials = (name: string) => {
    const parts = name.replace(/^(د\.|م\.|أ\.)\s*/, "").split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`;
    return parts[0][0];
  };

  return (
    <section id="speakers" className="py-24 bg-secondary/20 text-foreground">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">المتحدثون</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {speakers.map((speaker, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full bg-white border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <CardContent className="p-6 flex flex-col items-center text-center relative z-10">
                  <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-white shadow-sm flex items-center justify-center text-primary text-2xl font-bold mb-4">
                    {getInitials(speaker.name)}
                  </div>
                  <h3 className="text-xl font-bold text-accent mb-1">{speaker.name}</h3>
                  <p className="text-text-secondary text-sm mb-1">{speaker.title}</p>
                  <p className="text-text-secondary text-sm mb-4">{speaker.company}</p>
                  
                  <div className="mt-auto pt-4 border-t border-border w-full">
                    <span className="inline-block bg-secondary text-text-secondary px-3 py-1 rounded-full text-xs font-medium">
                      {speaker.topic}
                    </span>
                  </div>
                </CardContent>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity z-0 pointer-events-none"></div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}