import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "أين سيقام المعرض؟",
    a: "مبنى المؤتمرات بالمدينة الجامعية بجامعة الإمام محمد بن سعود الإسلامية.",
    icon: "location_on",
  },
  {
    q: "متى سيقام المعرض؟",
    a: "يومي 16 و17 سبتمبر.",
    icon: "event",
  },
  {
    q: "من هي الجهة المنظمة للمعرض؟",
    a: "كلية الهندسة بجامعة الإمام محمد بن سعود الإسلامية.",
    icon: "account_balance",
  },
  {
    q: "هل الدخول إلى المعرض مجاني؟",
    a: "نعم، الدخول مجاني لجميع الزوار.",
    icon: "confirmation_number",
  },
  {
    q: "ما هي الفئة المستهدفة للمعرض؟",
    a: "الفئة المستهدفة موجودة في الملف التعريفي للمعرض، وتشمل الطلاب والأكاديميين والشركات التقنية والجهات الصناعية.",
    icon: "groups",
  },
  {
    q: "ما هي أوقات زيارة المعرض؟",
    a: "تبدأ فعاليات المعرض من الساعة 1 ظهراً وحتى الساعة 5 مساءً.",
    icon: "schedule",
  },
  {
    q: "هل يتطلب الدخول تسجيلاً مسبقاً؟",
    a: "نعم، يفضل التسجيل عبر الرابط الموجود في البايو للحصول على كود الدخول (QR Code) وتسريع عملية الدخول عند البوابة.",
    icon: "qr_code_scanner",
  },
  {
    q: "أي بوابة يجب أن يسلكها الزوار للوصول لمبنى المؤتمرات؟",
    a: "يفضل الدخول عبر بوابة رقم 13، وستجد لوحات إرشادية تقودك مباشرة لمواقف مبنى المؤتمرات.",
    icon: "directions",
  },
  {
    q: "هل هناك ورش عمل متخصصة ضمن فعاليات المعرض؟ وهل هي مجانية؟",
    a: "نعم، يضم المعرض أجندة حافلة بورش العمل التقنية، وهي مجانية لجميع الحضور.",
    icon: "workspace_premium",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-[#F5F7F5] text-foreground">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#161616] mb-4">
            الأسئلة الشائعة
          </h2>
          <div className="w-24 h-1 bg-[#1B8354] mx-auto rounded-full mb-4" />
          <p className="text-[#525252] text-lg max-w-xl mx-auto">
            إجابات على أبرز الأسئلة المتعلقة بمعرض الابتكارات الهندسية والتقنية
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="bg-white border border-[#E6E6E6] rounded-xl px-6 shadow-sm data-[state=open]:border-[#1B8354]/30 data-[state=open]:shadow-md transition-all"
              >
                <AccordionTrigger className="text-right text-[#161616] font-semibold text-base py-5 hover:no-underline hover:text-[#1B8354] gap-4 [&[data-state=open]]:text-[#1B8354]">
                  <div className="flex items-center gap-3 text-right">
                    <span className="material-icons text-[#1B8354] text-xl flex-shrink-0">
                      {faq.icon}
                    </span>
                    <span>{faq.q}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-[#525252] text-base leading-relaxed pb-5 pr-9">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
