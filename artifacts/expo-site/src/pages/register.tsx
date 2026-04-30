import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ExpoLogo } from "@/components/ExpoLogo";
import { BoothMap } from "@/components/sections/booth-map";
import {
  useCreateRegistration,
  useListBooths,
} from "@workspace/api-client-react";
import type { Registration } from "@workspace/api-client-react";

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

interface Booth {
  id: number;
  number: string;
  hall: string;
  width: number;
  height: number;
  status: "available" | "occupied" | "selected";
  row: number;
  col: number;
}

type Screen = "form" | "otp" | "success";

function validatePhone(phone: string) {
  return /^05\d{8}$/.test(phone.replace(/\s/g, ""));
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function QRPlaceholder({ value }: { value: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-44 h-44 border-4 border-[#1B8354] rounded-2xl flex items-center justify-center bg-white p-3 shadow-sm relative overflow-hidden">
        <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-[#1B8354] rounded-tr-sm" />
        <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-[#1B8354] rounded-tl-sm" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-[#1B8354] rounded-br-sm" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-[#1B8354] rounded-bl-sm" />
        <div className="text-center px-2">
          <span className="material-icons text-[#1B8354] text-4xl mb-1">qr_code_2</span>
          <p className="text-[#525252] text-[10px] leading-tight">رمز QR للدخول السريع</p>
        </div>
      </div>
      <p className="text-[#525252] text-xs mt-2 font-mono">{value}</p>
    </div>
  );
}

export default function Register() {
  const [, setLocation] = useLocation();
  const [screen, setScreen] = useState<Screen>("form");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    duration: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    duration: "",
  });
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);
  const [submittedRegistration, setSubmittedRegistration] = useState<Registration | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: dbBooths } = useListBooths({ query: { enabled: !DEMO_MODE } });
  const occupiedBoothNumbers = DEMO_MODE
    ? []
    : (dbBooths ?? []).filter(b => b.status === "occupied").map(b => b.number);

  const [demoPending, setDemoPending] = useState(false);
  const { mutate: createRegistration, isPending: apiPending } = useCreateRegistration({
    mutation: {
      onSuccess: (data) => {
        setSubmittedRegistration(data);
        setScreen("success");
        setSubmitError(null);
      },
      onError: (err: unknown) => {
        const data = (err as { data?: { message?: string } })?.data;
        const message = data?.message ?? "حدث خطأ أثناء التسجيل. يرجى المحاولة مجدداً.";
        setSubmitError(message);
        setScreen("form");
      },
    },
  });
  const isPending = DEMO_MODE ? demoPending : apiPending;

  const VISIT_OPTIONS = [
    { value: "day1", label: "يوم واحد", dates: "16 سبتمبر" },
    { value: "day2", label: "يوم واحد", dates: "17 سبتمبر" },
    { value: "both", label: "يومين", dates: "16 - 17 سبتمبر" },
  ];

  const typeLabel: Record<string, string> = {
    visitor: "زائر",
    exhibitor: "عارض",
    sponsor: "راعٍ",
  };

  const getDurationLabel = () => {
    const opt = VISIT_OPTIONS.find(o => o.value === formData.duration);
    return opt ? `${opt.label} — ${opt.dates}` : "";
  };

  const validate = () => {
    const e = { name: "", email: "", phone: "", type: "", duration: "" };
    if (!formData.name.trim()) e.name = "الاسم مطلوب";
    if (!formData.email.trim()) e.email = "البريد الإلكتروني مطلوب";
    else if (!validateEmail(formData.email)) e.email = "صيغة البريد الإلكتروني غير صحيحة";
    if (!formData.phone.trim()) e.phone = "رقم الجوال مطلوب";
    else if (!validatePhone(formData.phone)) e.phone = "رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام بالضبط";
    if (!formData.type) e.type = "يرجى اختيار نوع المشاركة";
    if (formData.type === "visitor" && !formData.duration) e.duration = "يرجى اختيار مدة الزيارة";
    setErrors(e);
    return !e.name && !e.email && !e.phone && !e.type && !e.duration;
  };

  const submitToApi = () => {
    setSubmitError(null);
    if (DEMO_MODE) {
      setDemoPending(true);
      setTimeout(() => {
        const fakeReg: Registration = {
          id: Math.floor(Math.random() * 90000) + 10000,
          refNumber: `EXP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          type: formData.type as "visitor" | "exhibitor" | "sponsor",
          boothId: selectedBooth?.id ?? null,
          boothNumber: selectedBooth?.number ?? null,
          boothHall: selectedBooth?.hall ?? null,
          message: formData.message || null,
          createdAt: new Date().toISOString(),
        };
        setDemoPending(false);
        setSubmittedRegistration(fakeReg);
        setScreen("success");
      }, 900);
    } else {
      createRegistration({
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          type: formData.type as "visitor" | "exhibitor" | "sponsor",
          boothId: selectedBooth?.id ?? null,
          message: formData.message || null,
        },
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.type === "exhibitor" && !selectedBooth) {
      alert("يرجى اختيار بوث من الخريطة التفاعلية قبل إكمال التسجيل.");
      return;
    }
    if (!validate()) return;
    if (formData.type === "visitor") {
      setScreen("otp");
    } else {
      submitToApi();
    }
  };

  const handleOtpVerify = () => {
    submitToApi();
  };

  const resetAll = () => {
    setScreen("form");
    setFormData({ name: "", email: "", phone: "", type: "", duration: "", message: "" });
    setSelectedBooth(null);
    setErrors({ name: "", email: "", phone: "", type: "", duration: "" });
    setOtpDigits(["", "", "", "", "", ""]);
    setSubmittedRegistration(null);
    setSubmitError(null);
  };

  const refNumber = submittedRegistration?.refNumber ?? "";

  return (
    <div
      className="min-h-screen bg-[#F5F7F5] font-sans"
      style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}
      dir="rtl"
    >
      {/* Header */}
      <header className="bg-white border-b border-[#E6E6E6] sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 text-[#525252] hover:text-[#1B8354] transition-colors text-sm font-medium"
            data-testid="button-back-home"
          >
            <span className="material-icons text-base">arrow_forward</span>
            العودة للرئيسية
          </button>
          <ExpoLogo variant="default" />
        </div>
      </header>

      {/* Hero strip */}
      <div
        className="py-12 text-white text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(22,22,22,0.92), rgba(27,131,84,0.85))",
          backgroundColor: "#1B8354",
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(30deg, #1B8354 12%, transparent 12.5%, transparent 87%, #1B8354 87.5%, #1B8354),
              linear-gradient(150deg, #1B8354 12%, transparent 12.5%, transparent 87%, #1B8354 87.5%, #1B8354)`,
            backgroundSize: "60px 100px",
          }}
        />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">التسجيل في المعرض</h1>
          <p className="text-white/80 text-lg">معرض الابتكارات الهندسية والتقنية — 2026 - 1447</p>
        </div>
      </div>

      {/* Progress bar */}
      {screen !== "success" && (
        <div className="bg-white border-b border-[#E6E6E6] py-3">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl flex items-center gap-3 text-sm">
            {[
              { label: "البيانات", icon: "edit", active: screen === "form", done: screen === "otp" },
              { label: "التحقق", icon: "sms", active: screen === "otp", done: false },
              { label: "التأكيد", icon: "check_circle", active: false, done: false },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && <div className={`h-px w-8 md:w-16 ${step.done || step.active ? "bg-[#1B8354]" : "bg-[#E6E6E6]"}`} />}
                <div className={`flex items-center gap-1.5 ${step.active ? "text-[#1B8354] font-semibold" : step.done ? "text-[#1B8354]" : "text-[#B3B3B3]"}`}>
                  <span className="material-icons text-base">{step.done ? "check_circle" : step.icon}</span>
                  <span className="hidden md:inline">{step.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-8 max-w-4xl py-12">
        <AnimatePresence mode="wait">

          {/* ── FORM SCREEN ── */}
          {screen === "form" && (
            <motion.div key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <Card className="bg-white border border-[#E6E6E6] shadow-sm">
                <CardContent className="p-8 md:p-10">
                  <h2 className="text-2xl font-bold text-[#161616] mb-2">نموذج التسجيل</h2>
                  <p className="text-[#525252] mb-8">يرجى تعبئة جميع الحقول المطلوبة للإتمام التسجيل.</p>

                  <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
                    {/* Name */}
                    <div className="space-y-1.5">
                      <Label htmlFor="reg-name" className="text-[#161616] font-medium">الاسم الكامل <span className="text-red-500">*</span></Label>
                      <Input
                        id="reg-name"
                        data-testid="input-name"
                        value={formData.name}
                        onChange={e => { setFormData(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: "" })); }}
                        placeholder="أدخل اسمك الكامل"
                        className={`h-12 border-2 rounded-lg bg-white ${errors.name ? "border-red-400 focus:border-red-400" : "border-[#E6E6E6] focus:border-[#1B8354]"}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                    </div>

                    {/* Email + Phone */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <Label htmlFor="reg-email" className="text-[#161616] font-medium">البريد الإلكتروني <span className="text-red-500">*</span></Label>
                        <Input
                          id="reg-email"
                          type="email"
                          data-testid="input-email"
                          value={formData.email}
                          onChange={e => { setFormData(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: "" })); }}
                          placeholder="example@domain.com"
                          className={`h-12 border-2 rounded-lg bg-white text-left ${errors.email ? "border-red-400" : "border-[#E6E6E6] focus:border-[#1B8354]"}`}
                          dir="ltr"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="reg-phone" className="text-[#161616] font-medium">رقم الجوال <span className="text-red-500">*</span></Label>
                        <Input
                          id="reg-phone"
                          type="tel"
                          data-testid="input-phone"
                          value={formData.phone}
                          onChange={e => { setFormData(f => ({ ...f, phone: e.target.value })); setErrors(er => ({ ...er, phone: "" })); }}
                          placeholder="05XXXXXXXX"
                          className={`h-12 border-2 rounded-lg bg-white text-left ${errors.phone ? "border-red-400" : "border-[#E6E6E6] focus:border-[#1B8354]"}`}
                          dir="ltr"
                        />
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Participation type */}
                    <div className="space-y-1.5">
                      <Label className="text-[#161616] font-medium">نوع المشاركة <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.type}
                        onValueChange={val => {
                          setFormData(f => ({ ...f, type: val, duration: "" }));
                          if (val !== "exhibitor") setSelectedBooth(null);
                          setErrors(er => ({ ...er, type: "", duration: "" }));
                        }}
                      >
                        <SelectTrigger className={`h-12 border-2 rounded-lg bg-white ${errors.type ? "border-red-400" : "border-[#E6E6E6]"}`} data-testid="select-type">
                          <SelectValue placeholder="اختر نوع المشاركة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="visitor">زائر</SelectItem>
                          <SelectItem value="exhibitor">عارض</SelectItem>
                          <SelectItem value="sponsor">راعٍ</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.type && <p className="text-red-500 text-xs">{errors.type}</p>}
                    </div>

                    {/* Visit duration — visitors only */}
                    <AnimatePresence>
                      {formData.type === "visitor" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 overflow-hidden"
                        >
                          <Label className="text-[#161616] font-medium">مدة الزيارة <span className="text-red-500">*</span></Label>
                          <div className="grid grid-cols-3 gap-3">
                            {VISIT_OPTIONS.map(opt => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => { setFormData(f => ({ ...f, duration: opt.value })); setErrors(er => ({ ...er, duration: "" })); }}
                                className={`flex flex-col items-center justify-center py-4 px-2 rounded-xl border-2 text-sm font-semibold transition-all ${
                                  formData.duration === opt.value
                                    ? "border-[#1B8354] bg-[#1B8354] text-white shadow-sm"
                                    : "border-[#E6E6E6] bg-white text-[#161616] hover:border-[#1B8354]/40"
                                }`}
                                data-testid={`duration-${opt.value}`}
                              >
                                <span className="material-icons text-base mb-1">{opt.value === "both" ? "date_range" : "event"}</span>
                                <span>{opt.label}</span>
                                <span className={`text-sm font-bold mt-1 ${formData.duration === opt.value ? "text-white" : "text-[#1B8354]"}`}>{opt.dates}</span>
                              </button>
                            ))}
                          </div>
                          {errors.duration && <p className="text-red-500 text-xs">{errors.duration}</p>}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Booth map — exhibitors only */}
                    <AnimatePresence>
                      {formData.type === "exhibitor" && (
                        <BoothMap
                          selectedBooth={selectedBooth}
                          onSelect={setSelectedBooth}
                          occupiedBoothNumbers={occupiedBoothNumbers}
                        />
                      )}
                    </AnimatePresence>

                    {/* Optional message */}
                    <div className="space-y-1.5">
                      <Label htmlFor="reg-message" className="text-[#161616] font-medium">ملاحظات إضافية (اختياري)</Label>
                      <Textarea
                        id="reg-message"
                        data-testid="input-message"
                        value={formData.message}
                        onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                        placeholder="أضف أي تفاصيل أو استفسارات..."
                        className="min-h-[90px] border-2 border-[#E6E6E6] focus:border-[#1B8354] rounded-lg bg-white resize-none"
                      />
                    </div>

                    {formData.type === "exhibitor" && !selectedBooth && (
                      <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                        <span className="material-icons text-base text-amber-600">info</span>
                        يرجى اختيار بوث من الخريطة أعلاه قبل إرسال النموذج.
                      </div>
                    )}

                    {/* API error */}
                    {submitError && (
                      <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3" data-testid="submit-error">
                        <span className="material-icons text-base text-red-600">error</span>
                        {submitError}
                      </div>
                    )}

                    <Button
                      type="submit"
                      data-testid="button-submit-form"
                      disabled={isPending}
                      className="w-full bg-[#1B8354] hover:bg-[#25935F] text-white py-6 text-lg font-bold rounded-lg shadow-sm transition-colors disabled:opacity-60"
                    >
                      {isPending ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="material-icons animate-spin text-base">sync</span>
                          جارٍ الإرسال...
                        </span>
                      ) : (
                        <>
                          <span className="material-icons ml-2 text-base">
                            {formData.type === "visitor" ? "sms" : "send"}
                          </span>
                          {formData.type === "visitor" ? "التالي — التحقق برمز OTP" : "إرسال طلب التسجيل"}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ── OTP SCREEN ── */}
          {screen === "otp" && (
            <motion.div key="otp" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <Card className="bg-white border border-[#E6E6E6] shadow-sm max-w-md mx-auto">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#1B8354]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <span className="material-icons text-[#1B8354] text-3xl">sms</span>
                  </div>
                  <h2 className="text-xl font-bold text-[#161616] mb-2">التحقق برمز OTP</h2>
                  <p className="text-[#525252] text-sm mb-1">تم إرسال رمز التحقق إلى رقم جوالك</p>
                  <p className="text-[#1B8354] font-semibold text-sm mb-8" dir="ltr">{formData.phone}</p>

                  <div className="flex justify-center gap-2 mb-8" dir="ltr">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        inputMode="numeric"
                        value={digit}
                        data-testid={`otp-digit-${idx}`}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/, "");
                          const next = [...otpDigits];
                          next[idx] = val;
                          setOtpDigits(next);
                          if (val && idx < 5) {
                            const nextEl = document.querySelector<HTMLInputElement>(`[data-testid="otp-digit-${idx + 1}"]`);
                            nextEl?.focus();
                          }
                        }}
                        onKeyDown={e => {
                          if (e.key === "Backspace" && !digit && idx > 0) {
                            const prevEl = document.querySelector<HTMLInputElement>(`[data-testid="otp-digit-${idx - 1}"]`);
                            prevEl?.focus();
                          }
                        }}
                        className="w-11 h-14 text-center text-xl font-bold border-2 border-[#E6E6E6] rounded-xl focus:border-[#1B8354] focus:outline-none transition-colors bg-[#F5F7F5]"
                      />
                    ))}
                  </div>

                  <Button
                    onClick={handleOtpVerify}
                    data-testid="button-otp-verify"
                    disabled={isPending}
                    className="w-full bg-[#1B8354] hover:bg-[#25935F] text-white font-bold py-4 rounded-lg text-base mb-4"
                  >
                    {isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="material-icons animate-spin text-base">sync</span>
                        جارٍ الإرسال...
                      </span>
                    ) : "تحقق وأكمل التسجيل"}
                  </Button>

                  <button
                    type="button"
                    className="text-[#525252] text-sm hover:text-[#1B8354] transition-colors"
                    data-testid="button-resend-otp"
                  >
                    لم تستلم الرمز؟ <span className="text-[#1B8354] font-semibold">إعادة الإرسال</span>
                  </button>

                  <div className="mt-4 pt-4 border-t border-[#E6E6E6]">
                    <button
                      type="button"
                      onClick={() => setScreen("form")}
                      className="text-[#525252] text-xs hover:text-[#1B8354] transition-colors flex items-center gap-1 mx-auto"
                    >
                      <span className="material-icons text-sm">arrow_forward</span>
                      العودة للنموذج
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* ── SUCCESS SCREEN ── */}
          {screen === "success" && submittedRegistration && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <div className="w-24 h-24 bg-[#1B8354]/10 rounded-full flex items-center justify-center mb-6">
                <span className="material-icons text-[#1B8354] text-5xl">check_circle</span>
              </div>
              <h2 className="text-3xl font-bold text-[#161616] mb-3">تم التسجيل بنجاح!</h2>
              <p className="text-[#525252] text-lg mb-8">شكراً لتسجيلك في معرض الابتكارات الهندسية والتقنية</p>

              {/* QR Placeholder — for visitors */}
              {submittedRegistration.type === "visitor" && (
                <div className="mb-8">
                  <p className="text-[#525252] text-sm mb-4">احتفظ برمز QR الخاص بك للدخول السريع</p>
                  <QRPlaceholder value={refNumber} />
                </div>
              )}

              <Card className="bg-white border-2 border-[#1B8354]/20 max-w-sm w-full mb-6">
                <CardContent className="p-6 space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-[#E6E6E6]">
                    <span className="text-[#525252] text-sm">رقم التسجيل</span>
                    <span className="font-bold text-[#1B8354] text-base" data-testid="text-ref-number">{refNumber}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#E6E6E6]">
                    <span className="text-[#525252] text-sm">الاسم</span>
                    <span className="font-semibold text-[#161616]">{submittedRegistration.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#E6E6E6]">
                    <span className="text-[#525252] text-sm">نوع المشاركة</span>
                    <span className="font-semibold text-[#161616]">{typeLabel[submittedRegistration.type]}</span>
                  </div>
                  {formData.duration && (
                    <div className="flex justify-between items-center py-2 border-b border-[#E6E6E6]">
                      <span className="text-[#525252] text-sm">مدة الزيارة</span>
                      <span className="font-semibold text-[#161616]">{getDurationLabel()}</span>
                    </div>
                  )}
                  {submittedRegistration.boothNumber && (
                    <div className="flex justify-between items-center py-2 border-b border-[#E6E6E6]">
                      <span className="text-[#525252] text-sm">البوث المحجوز</span>
                      <span className="font-semibold text-[#1B8354]">
                        {submittedRegistration.boothNumber} — {submittedRegistration.boothHall}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[#525252] text-sm">البريد الإلكتروني</span>
                    <span className="font-semibold text-[#161616] text-sm" dir="ltr">{submittedRegistration.email}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Contact officer — Exhibitors only */}
              {submittedRegistration.type === "exhibitor" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-sm w-full mb-6"
                >
                  <Card className="bg-[#1B8354]/5 border border-[#1B8354]/20">
                    <CardContent className="p-5">
                      <h4 className="font-bold text-[#161616] mb-3 flex items-center gap-2 text-sm">
                        <span className="material-icons text-[#1B8354] text-base">support_agent</span>
                        ضابط الاتصال — للدعم والاستفسارات
                      </h4>
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-3">
                          <span className="material-icons text-[#1B8354] text-sm">person</span>
                          <span className="text-[#161616] font-semibold text-sm">أحمد المحمد</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="material-icons text-[#1B8354] text-sm">phone</span>
                          <span className="text-[#525252] text-sm" dir="ltr">0501234567</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="material-icons text-[#1B8354] text-sm">email</span>
                          <span className="text-[#525252] text-sm" dir="ltr">support@expo.imamu.edu.sa</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              <p className="text-[#525252] text-sm mb-8">سيتم إرسال تأكيد التسجيل إلى بريدك الإلكتروني قريباً.</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setLocation("/")}
                  className="bg-[#1B8354] hover:bg-[#25935F] text-white px-8 py-3 rounded-lg font-bold"
                  data-testid="button-back-home-success"
                >
                  العودة للرئيسية
                </Button>
                <Button
                  onClick={resetAll}
                  variant="outline"
                  className="border-2 border-[#1B8354] text-[#1B8354] hover:bg-[#1B8354]/5 px-8 py-3 rounded-lg font-bold"
                  data-testid="button-new-registration"
                >
                  تسجيل جديد
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
