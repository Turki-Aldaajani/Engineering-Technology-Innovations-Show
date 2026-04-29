import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Workshops() {
  const [, setLocation] = useLocation();
  const workshops = [
    { title: "ورشة الذكاء الاصطناعي للمبتدئين", trainer: "د. خالد الشمري", date: "يُحدد لاحقاً - 2026", time: "10:00-13:00", duration: "3 ساعات", seats: "30 مقعداً", level: "مبتدئ" },
    { title: "ورشة تطوير تطبيقات الويب الحديثة", trainer: "م. عبدالرحمن الدوسري", date: "يُحدد لاحقاً - 2026", time: "14:00-18:00", duration: "4 ساعات", seats: "25 مقعداً", level: "متوسط" },
    { title: "ورشة الأمن السيبراني", trainer: "أ. فيصل الحربي", date: "يُحدد لاحقاً - 2026", time: "10:00-13:00", duration: "3 ساعات", seats: "20 مقعداً", level: "متقدم" },
    { title: "ورشة إنترنت الأشياء (IoT)", trainer: "د. لميس العنزي", date: "يُحدد لاحقاً - 2026", time: "14:00-18:00", duration: "4 ساعات", seats: "25 مقعداً", level: "متوسط" },
    { title: "ورشة تصميم واجهات المستخدم", trainer: "م. هند القحطاني", date: "يُحدد لاحقاً - 2026", time: "10:00-12:00", duration: "ساعتان", seats: "35 مقعداً", level: "جميع المستويات" },
    { title: "ورشة البلوك تشين والعملات الرقمية", trainer: "د. ياسر المالكي", date: "يُحدد لاحقاً - 2026", time: "15:00-18:00", duration: "3 ساعات", seats: "20 مقعداً", level: "متوسط" },
  ];

  const getLevelColor = (level: string) => {
    switch(level) {
      case "مبتدئ": return "bg-primary text-white";
      case "متوسط": return "bg-text-secondary text-white";
      case "متقدم": return "bg-accent text-white";
      default: return "bg-secondary text-accent";
    }
  };

  return (
    <section id="workshops" className="py-24 bg-white text-foreground">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">ورش العمل</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full flex flex-col border-border shadow-sm hover:shadow-md transition-shadow relative">
                <div className="absolute top-4 left-4">
                  <Badge className={`${getLevelColor(workshop.level)} px-3 py-1 font-medium border-none shadow-none`}>
                    {workshop.level}
                  </Badge>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col pt-12">
                  <h3 className="text-xl font-bold text-accent mb-6 leading-tight">{workshop.title}</h3>
                  
                  <div className="space-y-3 mb-8 text-sm text-text-secondary flex-1">
                    <div className="flex items-center gap-3">
                      <span className="material-icons text-primary/80 text-lg">person</span>
                      <span>{workshop.trainer}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-icons text-primary/80 text-lg">event</span>
                      <span>{workshop.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-icons text-primary/80 text-lg">schedule</span>
                      <span>{workshop.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-icons text-primary/80 text-lg">timer</span>
                      <span>{workshop.duration}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-icons text-primary/80 text-lg">group</span>
                      <span>{workshop.seats}</span>
                    </div>
                  </div>

                  <Button 
                    data-testid={`button-book-workshop-${idx}`}
                    className="w-full bg-secondary hover:bg-primary hover:text-white text-accent transition-colors py-5 font-semibold"
                    onClick={() => setLocation("/register")}
                  >
                    احجز مقعداً
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}