import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ExpoLogo } from "@/components/ExpoLogo";

interface ManualVisitor {
  id: number;
  name: string;
  phone: string;
  time: string;
}

interface ScanRecord {
  id: number;
  ref: string;
  name: string;
  time: string;
  status: "success" | "not_found" | "already_entered";
}

type ActiveTab = "scanner" | "manual";

export default function Organizer() {
  const [, setLocation] = useLocation();

  const [activeTab, setActiveTab] = useState<ActiveTab>("scanner");

  // Stats
  const [totalRegistered] = useState(127);
  const [checkedIn, setCheckedIn] = useState(34);

  // Scanner state
  const [manualRef, setManualRef] = useState("");
  const [scanRecords, setScanRecords] = useState<ScanRecord[]>([
    { id: 1, ref: "REG-33456", name: "خالد المطيري", time: "13:12", status: "success" },
    { id: 2, ref: "REG-44567", name: "سارة الدوسري", time: "13:08", status: "already_entered" },
  ]);

  // Manual registration state
  const [manualVisitors, setManualVisitors] = useState<ManualVisitor[]>([
    { id: 1, name: "طارق السعيد", phone: "0501234567", time: "13:05" },
    { id: 2, name: "منيرة الزهراني", phone: "0557654321", time: "13:18" },
  ]);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [formErrors, setFormErrors] = useState({ name: "", phone: "" });
  const [registered, setRegistered] = useState(false);

  const validateForm = () => {
    const e = { name: "", phone: "" };
    if (!form.name.trim()) e.name = "الاسم مطلوب";
    if (!/^05\d{8}$/.test(form.phone)) e.phone = "رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام";
    setFormErrors(e);
    return !e.name && !e.phone;
  };

  const handleManualRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setManualVisitors(prev => [{ id: Date.now(), name: form.name, phone: form.phone, time }, ...prev]);
    setForm({ name: "", phone: "" });
    setFormErrors({ name: "", phone: "" });
    setRegistered(true);
    setTimeout(() => setRegistered(false), 3000);
  };

  const handleScanLookup = () => {
    if (!manualRef.trim()) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    const existing = scanRecords.find(r => r.ref === manualRef.trim());
    if (existing) {
      setScanRecords(prev => [
        { id: Date.now(), ref: manualRef.trim(), name: existing.name, time, status: "already_entered" },
        ...prev,
      ]);
    } else if (manualRef.startsWith("REG-")) {
      setScanRecords(prev => [
        { id: Date.now(), ref: manualRef.trim(), name: "زائر مسجّل", time, status: "success" },
        ...prev,
      ]);
      setCheckedIn(c => c + 1);
    } else {
      setScanRecords(prev => [
        { id: Date.now(), ref: manualRef.trim(), name: "—", time, status: "not_found" },
        ...prev,
      ]);
    }
    setManualRef("");
  };

  const SCAN_STATUS_CONFIG = {
    success: { label: "دخل بنجاح", icon: "check_circle", color: "text-[#1B8354]", bg: "bg-green-50 border-green-200" },
    not_found: { label: "تذكرة غير موجودة", icon: "cancel", color: "text-red-600", bg: "bg-red-50 border-red-200" },
    already_entered: { label: "دخل مسبقاً", icon: "info", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  };

  return (
    <div className="min-h-screen bg-[#F5F7F5]" dir="rtl" style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-[#E6E6E6] sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setLocation("/")} className="flex items-center gap-2 text-[#525252] hover:text-[#1B8354] transition-colors text-sm font-medium">
              <span className="material-icons text-base">arrow_forward</span>
              الرئيسية
            </button>
            <span className="text-[#E6E6E6]">/</span>
            <span className="text-[#161616] font-semibold text-sm flex items-center gap-1">
              <span className="material-icons text-[#1B8354] text-base">badge</span>
              صفحة المُنظم — Check-in
            </span>
          </div>
          <ExpoLogo variant="default" />
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-8 py-8 max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#161616] mb-1">صفحة المُنظم — Check-in</h1>
          <p className="text-[#525252] text-sm">مسح تذاكر الزوار وتسجيل الحضور</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "إجمالي المسجلين", value: totalRegistered, icon: "groups", active: false },
            { label: "دخلوا اليوم", value: checkedIn, icon: "how_to_reg", active: true },
            { label: "لم يدخلوا بعد", value: totalRegistered - checkedIn, icon: "pending_actions", active: false },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Card className={`border shadow-sm ${stat.active ? "bg-[#1B8354] border-[#1B8354]" : "bg-white border-[#E6E6E6]"}`}>
                <CardContent className="p-4 text-center">
                  <span className={`material-icons text-2xl mb-1 ${stat.active ? "text-white" : "text-[#1B8354]"}`}>{stat.icon}</span>
                  <div className={`text-3xl font-bold ${stat.active ? "text-white" : "text-[#161616]"}`}>{stat.value}</div>
                  <div className={`text-xs mt-0.5 ${stat.active ? "text-white/80" : "text-[#525252]"}`}>{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {[
            { value: "scanner" as ActiveTab, label: "مسح رمز QR", icon: "qr_code_scanner" },
            { value: "manual" as ActiveTab, label: "تسجيل يدوي", icon: "person_add" },
          ].map(tab => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                activeTab === tab.value
                  ? "bg-[#1B8354] text-white shadow-sm"
                  : "bg-white text-[#525252] border border-[#E6E6E6] hover:border-[#1B8354]/40"
              }`}
            >
              <span className="material-icons text-base">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* ── QR SCANNER TAB ── */}
          {activeTab === "scanner" && (
            <motion.div key="scanner" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <Card className="bg-white border border-[#E6E6E6] shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-base font-bold text-[#161616] mb-1 flex items-center gap-2">
                    <span className="material-icons text-[#1B8354] text-base">qr_code_scanner</span>
                    مسح رمز QR
                  </h2>
                  <p className="text-[#525252] text-xs mb-5">وجّه الكاميرا نحو رمز QR الموجود في التذكرة</p>

                  {/* Scanner viewport */}
                  <div className="relative mx-auto w-full max-w-xs aspect-square bg-gradient-to-br from-[#161616] to-[#1B8354]/60 rounded-2xl overflow-hidden flex items-center justify-center mb-4">
                    {/* Corner brackets */}
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-[#54C08A] rounded-tr-md" />
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-[#54C08A] rounded-tl-md" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-[#54C08A] rounded-br-md" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-[#54C08A] rounded-bl-md" />

                    {/* Scan line animation */}
                    <motion.div
                      className="absolute left-6 right-6 h-0.5 bg-[#54C08A]/70 shadow-lg"
                      animate={{ top: ["20%", "80%", "20%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <div className="text-center z-10">
                      <span className="material-icons text-white/40 text-5xl">videocam_off</span>
                      <p className="text-white/60 text-xs mt-2">جاري الانتظار...</p>
                      <p className="text-white/30 text-[10px] mt-1">ستتم ربط الكاميرا حقيقياً لاحقاً</p>
                    </div>
                  </div>

                  {/* Manual ref input */}
                  <div className="border-t border-[#E6E6E6] pt-4">
                    <p className="text-[#525252] text-xs text-center mb-3">أو أدخل رقم التذكرة يدوياً</p>
                    <div className="flex gap-2">
                      <Input
                        value={manualRef}
                        onChange={e => setManualRef(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleScanLookup()}
                        placeholder="EXPO-2026-XXXX"
                        dir="ltr"
                        data-testid="input-manual-ref"
                        className="h-11 border-2 border-[#E6E6E6] focus:border-[#1B8354] rounded-lg bg-white text-left flex-1"
                      />
                      <Button
                        type="button"
                        onClick={handleScanLookup}
                        data-testid="button-lookup-ref"
                        className="bg-[#1B8354] hover:bg-[#25935F] text-white h-11 px-4 rounded-lg font-bold flex items-center gap-1 whitespace-nowrap"
                      >
                        <span className="material-icons text-base">search</span>
                        البحث
                      </Button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-3 w-full border-2 border-[#1B8354] text-[#1B8354] hover:bg-[#1B8354]/5 transition-colors py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
                    data-testid="button-simulate-scan"
                    onClick={() => {
                      const demoRef = "REG-" + Math.floor(10000 + Math.random() * 90000);
                      const now = new Date();
                      const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
                      setScanRecords(prev => [
                        { id: Date.now(), ref: demoRef, name: "زائر تجريبي", time, status: "success" },
                        ...prev,
                      ]);
                      setCheckedIn(c => c + 1);
                    }}
                  >
                    <span className="material-icons text-base">qr_code_2</span>
                    محاكاة مسح تذكرة
                    <span className="text-[#525252] text-xs font-normal">— للتجربة فقط</span>
                  </button>
                </CardContent>
              </Card>

              {/* Scan history */}
              <Card className="bg-white border border-[#E6E6E6] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#E6E6E6] flex items-center justify-between">
                  <h3 className="font-bold text-[#161616] text-base flex items-center gap-2">
                    <span className="material-icons text-[#1B8354] text-base">history</span>
                    آخر عمليات المسح
                  </h3>
                  {scanRecords.length > 0 && (
                    <span className="text-xs bg-[#E6E6E6] text-[#525252] px-2.5 py-1 rounded-full font-medium">
                      {scanRecords.length}
                    </span>
                  )}
                </div>
                {scanRecords.length === 0 ? (
                  <div className="py-12 text-center text-[#525252] text-sm">
                    <span className="material-icons text-[#E6E6E6] text-4xl block mb-2">qr_code_scanner</span>
                    لا توجد عمليات مسح بعد
                  </div>
                ) : (
                  <div className="divide-y divide-[#E6E6E6]">
                    <AnimatePresence initial={false}>
                      {scanRecords.map(record => {
                        const cfg = SCAN_STATUS_CONFIG[record.status];
                        return (
                          <motion.div
                            key={record.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className={`flex items-center justify-between px-5 py-3.5 border-r-4 ${record.status === "success" ? "border-r-[#1B8354]" : record.status === "already_entered" ? "border-r-amber-400" : "border-r-red-400"}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`material-icons text-xl ${cfg.color}`}>{cfg.icon}</span>
                              <div>
                                <p className="font-semibold text-[#161616] text-sm">{record.name}</p>
                                <p className="text-[#525252] text-xs font-mono">{record.ref}</p>
                              </div>
                            </div>
                            <div className="text-left">
                              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                              <p className="text-[#B3B3B3] text-xs mt-1 text-left">{record.time}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </Card>
            </motion.div>
          )}

          {/* ── MANUAL REGISTRATION TAB ── */}
          {activeTab === "manual" && (
            <motion.div key="manual" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              <Card className="bg-white border border-[#E6E6E6] shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-base font-bold text-[#161616] mb-4 flex items-center gap-2">
                    <span className="material-icons text-[#1B8354]">person_add</span>
                    تسجيل زائر يدوياً
                  </h2>

                  <AnimatePresence>
                    {registered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-2 text-green-700 text-sm font-medium"
                      >
                        <span className="material-icons text-base">check_circle</span>
                        تم تسجيل الزائر بنجاح!
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleManualRegister} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="org-name" className="text-[#161616] font-medium text-sm">
                          اسم الزائر <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="org-name"
                          data-testid="input-organizer-name"
                          value={form.name}
                          onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setFormErrors(er => ({ ...er, name: "" })); }}
                          placeholder="أدخل الاسم الكامل"
                          className={`h-11 border-2 rounded-lg bg-white ${formErrors.name ? "border-red-400" : "border-[#E6E6E6] focus:border-[#1B8354]"}`}
                        />
                        {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="org-phone" className="text-[#161616] font-medium text-sm">
                          رقم الجوال <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="org-phone"
                          data-testid="input-organizer-phone"
                          value={form.phone}
                          onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setFormErrors(er => ({ ...er, phone: "" })); }}
                          placeholder="05XXXXXXXX"
                          dir="ltr"
                          className={`h-11 border-2 rounded-lg bg-white text-left ${formErrors.phone ? "border-red-400" : "border-[#E6E6E6] focus:border-[#1B8354]"}`}
                        />
                        {formErrors.phone && <p className="text-red-500 text-xs">{formErrors.phone}</p>}
                      </div>
                    </div>
                    <Button
                      type="submit"
                      data-testid="button-organizer-register"
                      className="w-full bg-[#1B8354] hover:bg-[#25935F] text-white font-bold py-3 rounded-lg"
                    >
                      <span className="material-icons text-base ml-2">how_to_reg</span>
                      تسجيل الزائر
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Registered visitors list */}
              <Card className="bg-white border border-[#E6E6E6] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#E6E6E6] flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#161616] flex items-center gap-2">
                    <span className="material-icons text-[#1B8354] text-base">format_list_bulleted</span>
                    الزوار المسجلون في هذه الجلسة
                  </h3>
                  <span className="text-xs text-[#525252] bg-[#E6E6E6] px-2.5 py-1 rounded-full font-medium">
                    {manualVisitors.length} زائر
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F5F7F5] border-b border-[#E6E6E6]">
                      <tr>
                        {["#", "الاسم", "رقم الجوال", "وقت التسجيل"].map(h => (
                          <th key={h} className="text-right text-[#525252] font-semibold px-4 py-3">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6E6E6]">
                      <AnimatePresence initial={false}>
                        {manualVisitors.map((v, idx) => (
                          <motion.tr
                            key={v.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="hover:bg-[#F5F7F5] transition-colors"
                          >
                            <td className="px-4 py-3 text-[#525252] text-xs">{idx + 1}</td>
                            <td className="px-4 py-3 font-semibold text-[#161616]">{v.name}</td>
                            <td className="px-4 py-3 text-[#525252]" dir="ltr">{v.phone}</td>
                            <td className="px-4 py-3 text-[#525252]">{v.time}</td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
