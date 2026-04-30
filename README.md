<div align="center">

<img src="https://raw.githubusercontent.com/Turki-Aldaajani/Engineering-Technology-Innovations-Show/main/assets/expo-logo.png" alt="Expo Logo" width="120" />

# معرض الابتكارات الهندسية والتقنية
## Engineering & Technology Innovation Expo

**١٦ – ١٧ سبتمبر ٢٠٢٦ م | ١٤٤٧ هـ**

كلية الهندسة — جامعة الإمام محمد بن سعود الإسلامية

---

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![License](https://img.shields.io/badge/License-Academic-1B8354?style=flat-square)

</div>

---

## 📋 نظرة عامة | Overview

منصة رقمية متكاملة لإدارة **معرض الابتكارات الهندسية والتقنية ٢٠٢٦**، تتيح:

- 🎫 **تسجيل الزوار والعارضين** مع نظام OTP وQR Code
- 🗺️ **خريطة البوثات التفاعلية** لاختيار وحجز المواقع
- 🛡️ **لوحة تحكم المشرفين** لإدارة وقبول الطلبات
- 📱 **صفحة المنظم الميداني** مع مسح QR وتسجيل الحضور
- ❓ **قسم الأسئلة الشائعة** الشامل
- 🌐 واجهة **RTL عربية** بالكامل مع هوية بصرية سعودية خضراء

---

## 🗂️ هيكل المشروع | Project Structure

```
Engineering-Technology-Innovations-Show/
│
├── 📁 src/
│   ├── 📁 pages/                   # صفحات التطبيق
│   │   ├── home.tsx                # الصفحة الرئيسية
│   │   ├── register.tsx            # تسجيل الزوار والعارضين
│   │   ├── admin.tsx               # لوحة تحكم المشرفين
│   │   └── organizer.tsx           # صفحة المنظم الميداني
│   │
│   ├── 📁 components/
│   │   ├── 📁 sections/            # أقسام الصفحة الرئيسية
│   │   │   ├── navbar.tsx          # شريط التنقل
│   │   │   ├── hero.tsx            # الشاشة الترحيبية
│   │   │   ├── about.tsx           # عن المعرض
│   │   │   ├── audience.tsx        # الفئات المستهدفة
│   │   │   ├── why.tsx             # لماذا تشارك؟
│   │   │   ├── speakers.tsx        # المتحدثون
│   │   │   ├── workshops.tsx       # ورش العمل
│   │   │   ├── sponsors-partners.tsx # الرعاة والشركاء
│   │   │   ├── faq.tsx             # الأسئلة الشائعة
│   │   │   ├── contact-footer.tsx  # الفوتر والتواصل
│   │   │   └── booth-map.tsx       # خريطة البوثات
│   │   └── 📁 ui/                  # مكوّنات shadcn/ui
│   │
│   └── App.tsx                     # التوجيه الرئيسي
│
├── 📁 assets/
│   ├── 📁 images/
│   │   └── opengraph.jpg           # صورة المشاركة الاجتماعية
│   └── 📁 logos/
│       └── expo-logo.png           # شعار المعرض
│
└── README.md
```

---

## 🎨 الهوية البصرية | Brand Identity

<div align="center">

| العنصر | القيمة | المعاينة |
|:---:|:---:|:---:|
| اللون الأساسي | `#1B8354` | ![#1B8354](https://via.placeholder.com/60x20/1B8354/FFFFFF?text=+) |
| الخلفية | `#F5F7F5` | ![#F5F7F5](https://via.placeholder.com/60x20/F5F7F5/161616?text=+) |
| النص الأساسي | `#161616` | ![#161616](https://via.placeholder.com/60x20/161616/FFFFFF?text=+) |
| النص الثانوي | `#525252` | ![#525252](https://via.placeholder.com/60x20/525252/FFFFFF?text=+) |
| الحدود | `#E6E6E6` | ![#E6E6E6](https://via.placeholder.com/60x20/E6E6E6/161616?text=+) |

</div>

- **الخط:** IBM Plex Sans Arabic
- **الاتجاه:** RTL (يمين إلى يسار)
- **الأيقونات:** Material Icons

---

## 🖥️ الصفحات | Pages

### 🏠 الصفحة الرئيسية `/`
> الواجهة الرئيسية للزوار تعرض معلومات المعرض كاملةً

| القسم | الوصف |
|:---|:---|
| **Hero** | شاشة ترحيبية مع أزرار تسجيل وحجز بوث |
| **About** | نبذة تعريفية شاملة عن المعرض |
| **Audience** | الفئات المستهدفة من الطلاب والشركات |
| **Why** | مزايا وأسباب المشاركة |
| **Speakers** | المتحدثون ونبذ عنهم |
| **Workshops** | ورش العمل التقنية |
| **Sponsors & Partners** | الرعاة والشركاء الأكاديميون |
| **FAQ** | 9 أسئلة شائعة مع إجاباتها |
| **Footer** | معلومات التواصل وروابط سريعة |

---

### 📝 صفحة التسجيل `/register`
> نظام تسجيل ثلاثي المراحل

```
النموذج ──► التحقق بـ OTP ──► صفحة النجاح + QR Code
```

**للزوار:**
- ✅ اختيار مدة الزيارة: ١٦ سبتمبر، ١٧ سبتمبر، أو اليومين
- ✅ التحقق من رقم الجوال (١٠ أرقام تبدأ بـ ٠٥) والبريد الإلكتروني
- ✅ إدخال رمز OTP من ٦ خانات
- ✅ عرض QR Code مع رقم التذكرة

**للعارضين:**
- ✅ اختيار بوث من الخريطة التفاعلية
- ✅ صفحة تأكيد مع بيانات ضابط الاتصال

---

### 🛡️ لوحة التحكم `/admin`
> إدارة جميع طلبات التسجيل

- 📊 إحصاءات فورية (إجمالي / قيد الانتظار / مقبول / مرفوض)
- 👥 جدول طلبات الزوار مع قبول/رفض فردي
- 🏪 جدول طلبات البوثات مع نوع الجهة ورقم البوث
- 🔍 فلترة الطلبات حسب الحالة

---

### 📲 صفحة المنظم `/organizer`
> إدارة الحضور الميداني يوم الفعالية

- 📡 **عداد الزوار الحي** — جاهز للربط بقاعدة البيانات
- 📷 **ماسح QR** — إطار بصري مع خط مسح متحرك + ربط الكاميرا لاحقاً
- ⌨️ **إدخال يدوي** لرقم التذكرة للتحقق منها
- 📋 **سجل عمليات المسح** مع حالة كل زيارة
- ✍️ **تسجيل يدوي** للزوار عند الحاجة

---

## ⚙️ التقنيات | Tech Stack

<div align="center">

| الطبقة | التقنية | الغرض |
|:---:|:---:|:---:|
| **Frontend** | React 18 + TypeScript | بناء الواجهة |
| **Build Tool** | Vite 5 | التطوير والبناء |
| **Styling** | Tailwind CSS v4 | التنسيق |
| **Components** | shadcn/ui + Radix UI | مكوّنات الواجهة |
| **Animation** | Framer Motion | الحركة والانتقالات |
| **Routing** | wouter | التوجيه |
| **State** | TanStack Query | إدارة البيانات |
| **Backend** | Express.js | خادم API |
| **Database** | PostgreSQL + Drizzle ORM | قاعدة البيانات |
| **Font** | IBM Plex Sans Arabic | الخط الرسمي |
| **Icons** | Material Icons | الأيقونات |

</div>

---

## 🌐 الموقع المنشور | Live Demo

> بعد رفع الملفات لـ GitHub وتفعيل Pages سيظهر الرابط هنا:

```
https://Turki-Aldaajani.github.io/Engineering-Technology-Innovations-Show/
```

[![Deploy to GitHub Pages](https://github.com/Turki-Aldaajani/Engineering-Technology-Innovations-Show/actions/workflows/deploy-gh-pages.yml/badge.svg)](https://github.com/Turki-Aldaajani/Engineering-Technology-Innovations-Show/actions/workflows/deploy-gh-pages.yml)

---

## 🚀 تشغيل المشروع | Getting Started

### المتطلبات الأساسية

- Node.js `>= 18`
- pnpm `>= 8`
- PostgreSQL `>= 14`

### خطوات الإعداد

```bash
# 1️⃣ استنساخ المستودع
git clone https://github.com/Turki-Aldaajani/Engineering-Technology-Innovations-Show.git
cd Engineering-Technology-Innovations-Show

# 2️⃣ تثبيت المكتبات
pnpm install

# 3️⃣ إعداد متغيرات البيئة
cp .env.example .env
# ثم عدّل القيم في ملف .env

# 4️⃣ إعداد قاعدة البيانات
pnpm --filter @workspace/db run push

# 5️⃣ تشغيل الموقع والخادم
pnpm --filter @workspace/expo-site dev   # الواجهة الأمامية
pnpm --filter @workspace/api-server dev  # الخادم الخلفي
```

### متغيرات البيئة

```env
DATABASE_URL=postgresql://user:password@localhost:5432/expo_db
SESSION_SECRET=your_secret_key_here
PORT=3000
```

---

## 🔌 واجهة API | API Reference

| الطريقة | المسار | الوصف |
|:---:|:---|:---|
| `GET` | `/api/healthz` | فحص صحة الخادم |
| `GET` | `/api/booths` | جلب البوثات المتاحة |
| `POST` | `/api/registrations` | إنشاء تسجيل جديد |
| `GET` | `/api/registrations` | جلب جميع التسجيلات |
| `PATCH` | `/api/registrations/:id/status` | تحديث حالة التسجيل |

---

## 📅 تفاصيل الفعالية | Event Details

<div align="center">

| 📍 المكان | 📅 التاريخ | ⏰ الوقت | 🎟️ الدخول |
|:---:|:---:|:---:|:---:|
| مبنى المؤتمرات | ١٦ – ١٧ سبتمبر ٢٠٢٦ | ١:٠٠ ظهراً – ٥:٠٠ مساءً | مجاني |

**البوابة المقترحة:** بوابة رقم 13 ← لوحات إرشادية للمواقف

</div>

---

## 📬 التواصل | Contact

<div align="center">

📧 **البريد:** info@expo.imamu.edu.sa

🏛️ **الجهة:** كلية الهندسة — جامعة الإمام محمد بن سعود الإسلامية

📍 **الموقع:** الرياض، المملكة العربية السعودية

</div>

---

<div align="center">

**© 2026 معرض الابتكارات الهندسية والتقنية**

جامعة الإمام محمد بن سعود الإسلامية | جميع الحقوق محفوظة

</div>
