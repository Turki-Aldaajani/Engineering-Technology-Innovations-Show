import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="py-24 bg-white text-foreground">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">عن المعرض</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <Card className="h-full bg-secondary/30 border-none shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                  <span className="material-icons text-3xl">visibility</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">الرؤية</h3>
                <p className="text-text-secondary leading-relaxed text-lg">
                  التميّز في إبراز الابتكارات الهندسية والتقنية وتعزيز دور الجامعات في تطوير حلول تقنية تواكب تطلعات رؤية المملكة 2030.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="h-full"
          >
            <Card className="h-full bg-secondary/30 border-none shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                  <span className="material-icons text-3xl">flag</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">الرسالة</h3>
                <p className="text-text-secondary leading-relaxed text-lg">
                  تمكين العقول الشابة من تقديم أفكارهم وابتكاراتهم الهندسية والتقنية ضمن بيئة داعمة ومحفزة للإبداع والتطوير، وتعزيز التواصل بين الطلبة والجهات الصناعية والاستثمارية.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-8 md:p-12 mb-16 border border-border"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-accent">
            <span className="material-icons text-primary">track_changes</span>
            الأهداف
          </h3>
          <ul className="space-y-4">
            {[
              "تمكين طلاب الجامعة من تحويل أفكارهم إلى مشاريع مبتكرة تُجسّد الحلول التقنية المستقبلية وتُعرض أمام جمهور متخصص.",
              "إتاحة الفرصة للجهات الصناعية لاكتشاف المواهب الوطنية الواعدة ودعم مسيرتهم نحو التميز المهني.",
              "بناء جسور فاعلة بين الطلبة وسوق العمل من خلال لقاءات تفاعلية مع شركات رائدة في المجالات التقنية والصناعية.",
              "ترسيخ ثقافة الابتكار والإبداع التقني داخل الجامعات وتحفيز التفكير النقدي وريادة الأعمال.",
              "إيجاد بيئة تنافسية مشجعة على التميز والإبداع تُلهم الطلاب لتقديم الأفضل في مجالات التصميم والتطوير الهندسي والتقني."
            ].map((objective, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <p className="text-text-secondary leading-relaxed pt-1 text-lg">{objective}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold mb-8 text-accent">محاور المعرض</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "مشاريع التخرج والمشاريع الابتكارية", icon: "school" },
              { title: "ورش عمل وجلسات حوارية تقنية", icon: "groups" },
              { title: "أركان الجهات الراعية والمهتمة بالابتكار", icon: "handshake" },
            ].map((theme, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-primary text-white rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-md hover:bg-primary-hover transition-colors"
              >
                <span className="material-icons text-4xl mb-4 opacity-90">{theme.icon}</span>
                <h4 className="text-lg font-semibold">{theme.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}