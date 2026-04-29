import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export function Audience() {
  const audiences = [
    {
      title: "طلاب وطالبات الجامعات",
      icon: "school",
      desc: "الجيل القادم من المهندسين والمبتكرين",
    },
    {
      title: "الأكاديميون والباحثون",
      icon: "menu_book",
      desc: "خبراء التعليم والبحث العلمي",
    },
    {
      title: "الجهات الصناعية والتقنية",
      icon: "factory",
      desc: "الشركات الرائدة في القطاع",
    },
    {
      title: "المستثمرون في مجالات الابتكار",
      icon: "handshake",
      desc: "داعمو المشاريع الناشئة والمبتكرة",
    }
  ];

  return (
    <section id="audience" className="py-24 bg-secondary/20 text-foreground">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">الفئات المستهدفة</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="h-full"
            >
              <Card className="h-full bg-white border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="material-icons text-4xl text-primary">{item.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-accent mb-3">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}