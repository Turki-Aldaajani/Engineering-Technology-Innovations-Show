import { useState, useEffect } from "react";
import { useListRegistrations } from "@workspace/api-client-react";
import type { Registration } from "@workspace/api-client-react";
import type { UseQueryOptions } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExpoLogo } from "@/components/ExpoLogo";

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";
const STORAGE_KEY = "admin_token";

const DEMO_REGISTRATIONS: Registration[] = [
  { id: 1, refNumber: "EXP-DEMO01", name: "أحمد العلي", email: "ahmed@example.com", phone: "0501234567", type: "visitor", boothId: null, boothNumber: null, boothHall: null, message: null, createdAt: "2026-09-16T09:00:00Z" },
  { id: 2, refNumber: "EXP-DEMO02", name: "سارة المحمد", email: "sara@company.com", phone: "0559876543", type: "exhibitor", boothId: 1, boothNumber: "A-01", boothHall: "قاعة A", message: "نود عرض أحدث منتجاتنا", createdAt: "2026-09-16T10:30:00Z" },
  { id: 3, refNumber: "EXP-DEMO03", name: "شركة التقنية المتقدمة", email: "info@techco.sa", phone: "0512345678", type: "sponsor", boothId: null, boothNumber: null, boothHall: null, message: "مهتمون برعاية الفعالية", createdAt: "2026-09-16T11:15:00Z" },
  { id: 4, refNumber: "EXP-DEMO04", name: "محمد القحطاني", email: "m.alqahtani@edu.sa", phone: "0534567890", type: "visitor", boothId: null, boothNumber: null, boothHall: null, message: null, createdAt: "2026-09-17T08:45:00Z" },
  { id: 5, refNumber: "EXP-DEMO05", name: "نورة الزهراني", email: "noura@startup.sa", phone: "0578901234", type: "exhibitor", boothId: 2, boothNumber: "B-03", boothHall: "قاعة B", message: null, createdAt: "2026-09-17T13:00:00Z" },
];

type FilterTab = "all" | "visitor" | "exhibitor" | "sponsor";

const TYPE_LABEL: Record<string, string> = {
  visitor: "زائر",
  exhibitor: "عارض",
  sponsor: "راعٍ",
};

const TYPE_COLORS: Record<string, string> = {
  visitor: "bg-blue-100 text-blue-700 border-blue-200",
  exhibitor: "bg-green-100 text-[#1B8354] border-green-200",
  sponsor: "bg-amber-100 text-amber-700 border-amber-200",
};

const FILTER_TABS: { label: string; value: FilterTab }[] = [
  { label: "الكل", value: "all" },
  { label: "زوار", value: "visitor" },
  { label: "عارضون", value: "exhibitor" },
  { label: "رعاة", value: "sponsor" },
];

export default function Admin() {
  const [, setLocation] = useLocation();
  const [token, setToken] = useState<string>(() => sessionStorage.getItem(STORAGE_KEY) ?? "");
  const [inputToken, setInputToken] = useState("");
  const [authError, setAuthError] = useState(false);
  const [filter, setFilter] = useState<FilterTab>("all");

  const hasToken = Boolean(token);

  const { data: apiRegistrations, isLoading, error, refetch } = useListRegistrations({
    query: {
      enabled: hasToken && !DEMO_MODE,
      queryKey: ["/api/registrations", token],
      retry: false,
    } as UseQueryOptions<Registration[]>,
    request: { headers: { Authorization: `Bearer ${token}` } },
  });

  const registrations = DEMO_MODE ? (hasToken ? DEMO_REGISTRATIONS : undefined) : apiRegistrations;

  const isUnauthorized = Boolean(!DEMO_MODE && error && (error as { status?: number })?.status === 401);

  useEffect(() => {
    if (isUnauthorized) {
      setToken("");
      sessionStorage.removeItem(STORAGE_KEY);
      setAuthError(true);
    }
  }, [isUnauthorized]);

  const showDashboard = hasToken && registrations !== undefined;
  const showLoginForm = !hasToken || (!showDashboard && !isLoading) || isUnauthorized;
  const showAuthLoading = !DEMO_MODE && hasToken && isLoading && !registrations;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputToken.trim()) return;
    setAuthError(false);
    setToken(inputToken.trim());
    sessionStorage.setItem(STORAGE_KEY, inputToken.trim());
  };

  const handleLogout = () => {
    setToken("");
    setInputToken("");
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const handleExport = () => {
    const url = "/api/registrations/export";
    const a = document.createElement("a");
    a.href = url;
    const headers = new Headers({ Authorization: `Bearer ${token}` });
    fetch(url, { headers })
      .then(r => r.blob())
      .then(blob => {
        a.href = URL.createObjectURL(blob);
        a.download = "registrations.csv";
        a.click();
      });
  };

  const filtered = filter === "all"
    ? (registrations ?? [])
    : (registrations ?? []).filter(r => r.type === filter);

  const stats = {
    total: registrations?.length ?? 0,
    visitors: registrations?.filter(r => r.type === "visitor").length ?? 0,
    exhibitors: registrations?.filter(r => r.type === "exhibitor").length ?? 0,
    sponsors: registrations?.filter(r => r.type === "sponsor").length ?? 0,
  };

  return (
    <div
      className="min-h-screen bg-[#F5F7F5]"
      style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}
      dir="rtl"
    >
      <header className="bg-white border-b border-[#E6E6E6] sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLocation("/")}
              className="flex items-center gap-2 text-[#525252] hover:text-[#1B8354] transition-colors text-sm font-medium"
            >
              <span className="material-icons text-base">arrow_forward</span>
              الرئيسية
            </button>
            <span className="text-[#E6E6E6]">/</span>
            <span className="text-[#161616] font-semibold text-sm flex items-center gap-1">
              <span className="material-icons text-[#1B8354] text-base">admin_panel_settings</span>
              لوحة التحكم
            </span>
          </div>
          <div className="flex items-center gap-4">
            {showDashboard && (
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm text-[#525252] hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <span className="material-icons text-base">logout</span>
                خروج
              </button>
            )}
            <ExpoLogo variant="default" />
          </div>
        </div>
      </header>

      {/* Hero strip */}
      <div
        className="py-10 text-white text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(22,22,22,0.92), rgba(27,131,84,0.85))",
          backgroundColor: "#1B8354",
        }}
      >
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">لوحة إدارة التسجيلات</h1>
          <p className="text-white/80 text-lg">معرض الابتكارات الهندسية والتقنية</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-10 max-w-6xl">

        {/* Auth loading */}
        {showAuthLoading && (
          <div className="flex items-center justify-center py-20 text-[#525252]">
            <span className="material-icons animate-spin text-3xl text-[#1B8354] ml-3">sync</span>
            جارٍ التحقق من الصلاحيات...
          </div>
        )}

        {/* Login form */}
        {showLoginForm && (
          <div className="flex justify-center">
            <Card className="bg-white border border-[#E6E6E6] shadow-sm w-full max-w-sm">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-[#1B8354]/10 rounded-full flex items-center justify-center">
                    <span className="material-icons text-[#1B8354] text-3xl">lock</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-[#161616] text-center mb-1">وصول المسؤولين فقط</h2>
                <p className="text-[#525252] text-sm text-center mb-6">أدخل رمز الوصول للمتابعة</p>
                {authError && (
                  <div
                    className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4"
                    data-testid="auth-error"
                  >
                    <span className="material-icons text-sm text-red-600">error</span>
                    رمز الوصول غير صحيح. يرجى المحاولة مجدداً.
                  </div>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-[#161616] font-medium text-sm">رمز الوصول</Label>
                    <Input
                      type="password"
                      data-testid="input-admin-token"
                      value={inputToken}
                      onChange={e => setInputToken(e.target.value)}
                      placeholder="أدخل رمز الوصول"
                      className="h-12 border-2 border-[#E6E6E6] focus:border-[#1B8354] rounded-lg bg-white"
                      autoComplete="current-password"
                    />
                  </div>
                  <Button
                    type="submit"
                    data-testid="button-admin-login"
                    className="w-full bg-[#1B8354] hover:bg-[#25935F] text-white font-bold py-3"
                  >
                    دخول
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Dashboard */}
        {showDashboard && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "إجمالي التسجيلات", value: stats.total, icon: "groups", color: "#1B8354" },
                { label: "زوار", value: stats.visitors, icon: "person", color: "#2563EB" },
                { label: "عارضون", value: stats.exhibitors, icon: "storefront", color: "#059669" },
                { label: "رعاة", value: stats.sponsors, icon: "star", color: "#D97706" },
              ].map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                  <Card className="bg-white border border-[#E6E6E6] shadow-sm">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${stat.color}15` }}>
                        <span className="material-icons text-xl" style={{ color: stat.color }}>{stat.icon}</span>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#161616]">{stat.value}</div>
                        <div className="text-xs text-[#525252]">{stat.label}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Filter tabs + Export */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex gap-2 flex-wrap">
                {FILTER_TABS.map(tab => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setFilter(tab.value)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                      filter === tab.value
                        ? "bg-[#161616] text-white border-[#161616]"
                        : "bg-white text-[#525252] border-[#E6E6E6] hover:border-[#525252]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => refetch()}
                  variant="outline"
                  className="border-2 border-[#1B8354] text-[#1B8354] hover:bg-[#1B8354]/5 font-bold"
                >
                  <span className="material-icons text-base ml-1">refresh</span>
                  تحديث
                </Button>
                <Button
                  onClick={handleExport}
                  className="bg-[#1B8354] hover:bg-[#25935F] text-white font-bold"
                  data-testid="button-export-csv"
                >
                  <span className="material-icons text-base ml-1">download</span>
                  تصدير CSV
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-[#E6E6E6] shadow-sm overflow-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center py-20 text-[#525252]">
                  <span className="material-icons animate-spin text-3xl text-[#1B8354] ml-3">sync</span>
                  جارٍ تحميل البيانات...
                </div>
              ) : !filtered.length ? (
                <div className="flex flex-col items-center justify-center py-20 text-[#525252]">
                  <span className="material-icons text-5xl text-[#B3B3B3] mb-3">inbox</span>
                  <p className="text-lg font-medium">لا توجد تسجيلات</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#F5F7F5] border-b border-[#E6E6E6]">
                        <th className="px-4 py-3 text-right font-bold text-[#161616] whitespace-nowrap">رقم التسجيل</th>
                        <th className="px-4 py-3 text-right font-bold text-[#161616] whitespace-nowrap">الاسم</th>
                        <th className="px-4 py-3 text-right font-bold text-[#161616] whitespace-nowrap">البريد الإلكتروني</th>
                        <th className="px-4 py-3 text-right font-bold text-[#161616] whitespace-nowrap">الجوال</th>
                        <th className="px-4 py-3 text-right font-bold text-[#161616] whitespace-nowrap">نوع المشاركة</th>
                        <th className="px-4 py-3 text-right font-bold text-[#161616] whitespace-nowrap">البوث</th>
                        <th className="px-4 py-3 text-right font-bold text-[#161616] whitespace-nowrap">تاريخ التسجيل</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((reg, i) => (
                        <tr
                          key={reg.id}
                          className={`border-b border-[#E6E6E6] hover:bg-[#F5F7F5] transition-colors ${i % 2 === 0 ? "" : "bg-[#FAFAFA]"}`}
                        >
                          <td className="px-4 py-3 font-bold text-[#1B8354]" dir="ltr">{reg.refNumber}</td>
                          <td className="px-4 py-3 font-medium text-[#161616] whitespace-nowrap">{reg.name}</td>
                          <td className="px-4 py-3 text-[#525252]" dir="ltr">{reg.email}</td>
                          <td className="px-4 py-3 text-[#525252]" dir="ltr">{reg.phone}</td>
                          <td className="px-4 py-3">
                            <Badge className={`border text-xs font-semibold ${TYPE_COLORS[reg.type] ?? ""}`}>
                              {TYPE_LABEL[reg.type] ?? reg.type}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-[#525252]" dir="ltr">
                            {reg.boothNumber
                              ? `${reg.boothNumber} (${reg.boothHall})`
                              : <span className="text-[#B3B3B3]">—</span>
                            }
                          </td>
                          <td className="px-4 py-3 text-[#525252] text-xs" dir="ltr">
                            {reg.createdAt
                              ? new Date(reg.createdAt).toLocaleString("ar-SA")
                              : "—"
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
