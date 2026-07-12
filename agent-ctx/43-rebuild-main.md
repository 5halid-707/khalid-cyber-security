# Task 43-rebuild — Rebuild site with REAL content from live site

## Task Overview
Rebuild the Next.js 16 portfolio website for Khalid Al-harbi to match the LIVE site's content (khalid-cyber-security.vercel.app) exactly, while preserving all mobile fixes from previous tasks (41, 42).

## Work Log

### 1. i18n.tsx — Internationalization updates
- Fixed broken `nav.portfolio` key (was a raw string never resolved) → `أعمالي` / `Portfolio`
- Added `nav.training` = `تدريبي` / `Training`
- Added `nav.designs` = `تصاميمي` / `Designs`
- Added `nav.showcase` = `استكشف خدماتي` / `Showcase`
- Added `hero.title` = `م. خالد الحربي` / `Eng. Khalid Al-harbi` (with the engineer prefix)
- Added `hero.subtitle_role` = `باحث أمني — The Hackers One العالمية`
- Added `hero.services_line` = `اختبار اختراق وحماية • تصميم متاجر ومواقع • تسويق إلكتروني`
- Added `hero.cpd_badge` = `معتمد CPD — المملكة المتحدة • 250 ساعة تدريب`
- Added `about.cta_available` = `⚡ متاح لمشروعك التالي — تواصل معي واحصل على تقييم أمني مجاني`
- Added `training.title`, `training.subtitle`, `training.eyebrow`
- Added `certs.title`, `certs.subtitle`, `certs.eyebrow`, `certs.verify`, `certs.issuer`, `certs.date`
- Kept `about.nameplate.name` updated to `م. خالد محمد الحربi`

### 2. about.tsx — Bio + work experience + stats + expertise (7 jobs, 8 expertise)
- Replaced intro bio with REAL content: `أنا م. خالد محمد الحربي — خبير أمن سيبراني من المملكة العربية السعودية. السيبرانية مش ترف — ضرورة. وأنا هنا أساعدك تؤمن أعمالك قبل ما المخترقين يسبقونك...`
- Replaced 2nd paragraph: `ليست عندي شهادات تجميلية — كل اعتمادي موثّق على Credly و CPD UK... أستخدم Kali Linux و Metasploit و Nmap وأدوات احترافية حقيقية، لا أدوات هواة. هدفي بسيط: أجعل شبكتك آمنة بأعلى معايير البنوك.`
- Replaced 9 work experiences with 7 REAL ones:
  1. باحث أمني — The Hackers One (العالمية) — حالياً
  2. مشرف مشاريع تصميم وبرمجة — شركة المرجان (سيشيلز + بلو كورال)
  3. مصمم ومبرمج وحماية مواقع — شركة الجبال الإقتصادية
  4. مدير حسابات شركات — STC (Salesforce)
  5. مساعد مدير موقع — شركة الخدمات المساندة المحدودة (كامباوند سكني)
  6. فني مختبر هندسي — شركة العزاز المحدودة (تربة وخرسانة)
  7. مدير مختبر هندسي — شركة العصيمي الهندسية (مواد البناء)
- Updated stats: `30+ شهادة ودورة`, `8+ سنوات خبرة`, `100+ دورة تدريبية`
- Updated CTA to `⚡ متاح لمشروعك التالي` (clickable link to #contact-form)
- Updated 8 expertise areas to match live site (Penetration Testing, Cisco Networks, Vulnerability Discovery, Web/App Security, Cloud/Infrastructure, IR & Forensics, OS Security Linux/Windows, Scripting Python/Bash)

### 3. Email migration (khalid-alharbi@zohomail.sa → kmalharbi.c@gmail.com)
Updated in 6 files / 8 locations:
- `src/components/site/contact-section.tsx` (mailto link + display text)
- `src/components/site/footer.tsx` (CTA email button + social icon)
- `src/components/site/floating-contact.tsx` (mailto link)
- `src/app/api/chat/route.ts` (system prompt: official email + redirect instruction)
- `src/app/api/contact/route.ts` (OWNER_EMAIL + FROM_EMAIL + comment)
- `.env` (EMAIL_FROM + EMAIL_TO)

### 4. previous-works.tsx — 7th project (Ritz-Carlton) + Uber description update
- Added new project entry: **The Ritz-Carlton Jeddah** — `hotel-ritz.vercel.app`
  - Title: `The Ritz-Carlton Jeddah — Luxury Hotel` / `ذا ريتز كارلتون جدة — فندق فاخر`
  - Category: `موقع فندق فاخر + Dashboard` / `Luxury Hotel Website + Dashboard`
  - Color: gold (#c9a227)
  - Icon: Hotel (lucide-react)
  - Tech: `Next.js, React, TypeScript, Tailwind, RTL, Booking System, Admin Panel, Dashboard`
- Updated Uber description to: `تطبيق طلب سيارات بأسلوب Uber — خريطة تفاعلية بتتبع السائق، حجز رحلة، اختيار نوع السيارة، حساب الأجرة، تقييم السائق، واجهة دركن احترافية`
- Updated Uber tech tags: `React, Next.js, Map API, Geolocation, Real-time Tracking, Dark UI, Scalable`
- Also updated chatbot system prompt: 9 jobs → 7 jobs, 6 projects → 7 projects (with Ritz-Carlton)

### 5. NEW: training-labs.tsx — Hands-on Training & Labs section
- Section id="training"
- Stats bar: 6 platforms, 40+ courses, 50+ lab hours, 100% hands-on
- 6 platform cards, each with: name, flag, origin, icon, course count badge, scrollable course list:
  1. **TryHackMe** 🇬🇧 (7 courses: Red Team, Mr. Robot, Airplane, Solar System, Steel Mountain, Juice Shop, Bark Web Server)
  2. **Cybrary** 🇺🇸 (7 courses: Ethical Hacker, Security & Risk Mgmt, IAM, Access Security, Security Engineering, Security Assessment, Secure Software Dev)
  3. **Cisco (Udemy)** 🌐 (9 courses: CCNA, CCNP GNS3, Meraki Wireless, Cisco Security, MPLS, IPv6, GNS3 VPN/GRE, Multi-layer Switching, Cisco Live 2019 Python/Ansible)
  4. **Amazon AWS** 🟧 (3 courses: Cloud Practitioner, Solutions Architect, Developer — all certified)
  5. **تطوير مهني** 📈 (9 courses: HP LIFE x5, SoloLearn, ICDL, IEEE, Taylor & Francis)
  6. **AWS والسحابة** ☁️ (8 courses: Udemy x4, Elite Leaders Institute, Queen Rania Foundation, Monshaat x2)
- Custom scrollbar styling, mobile-responsive 2-col grid, top accent line per platform color

### 6. NEW: certificate-gallery.tsx — Certificate Gallery section
- Section id="certificates"
- Stats bar: 21 شهادة, 5 جهات إصدار, 250+ ساعة CPD, 100% موثّق
- 8 certificate cards in responsive 4-col grid, each with: SVG preview image, issuer (with icon), title (line-clamp-3), date, verify link
- Cards link to Credly / issuer verify URLs (open in new tab)
- "موثّق" / "VERIFIED" badge overlay on each image
- Mobile-responsive: grid-cols-1 → sm:grid-cols-2 → lg:grid-cols-4

### 7. NEW: 8 certificate SVG images in /public/certs/
Cyber-themed dark certificates with brand colors:
- `cpd-250.svg` — CPD UK 250 hours (neon-green, with star-in-circle logo)
- `ibm-cybersecurity.svg` — IBM SkillsBuild Cybersecurity Certificate (blue, with shield icon)
- `ibm-cloud-security.svg` — IBM Cloud Security Badge (cyan, with cloud icon)
- `ibm-grc.svg` — IBM Governance Risk & Compliance Badge (royal blue, with GRC shield)
- `ibm-security-ops.svg` — IBM Security Operations & Management (deep blue, with server racks)
- `cisco-ethical-hacker.svg` — Cisco Ethical Hacker Badge (cyan, with Cisco bridge logo + hood icon)
- `hp-professional-networking.svg` — HP LIFE Professional Networking (HP blue, with network nodes)
- `alison-cyber.svg` — Alison Cyber Security Essentials 250h (neon-green, with lock icon)

All HTTP 200 verified via curl.

### 8. page.tsx — Updated section order
Final order matches spec:
`Hero → About → Products → Credentials → AcademicCredentials → VideoShowcase → Designs → PreviousWorks → TrainingLabs → CertificateGallery → InteractiveShowcase → ContactSection`

### 9. hero.tsx — Updated content
- CPD badge now uses `t("hero.cpd_badge")` (was hardcoded "خبير محترف معتمد")
- Title uses `t("hero.title")` = `م. خالد الحربي`
- Added `subtitle_role` (باحث أمني — The Hackers One) above main subtitle
- Services line uses `t("hero.services_line")` (was hardcoded list with "مونتاج")
- Stats unchanged: 35+ creds, 9 services, 3 tracks, 250+ CPD hours (already matched spec)

### 10. navbar.tsx + footer.tsx — Updated links
Navbar (9 links, all use i18n keys):
- #home, #about, #products, #previous-works (Portfolio), #designs, #showcase, #training, #credentials, #contact-form
- Removed unused `isAr` variable (was orphaned after refactor)

Footer quick links:
- #about, #products, #previous-works, #training, #credentials (5 most relevant)

### 11. Mobile fixes preserved (NO regression)
Verified unchanged:
- ✅ `pointer-events-none` on ToastViewport (`src/components/ui/toast.tsx` line 19)
- ✅ `pointer-events-none` on chatbot container (`src/components/site/chatbot.tsx` line 91)
- ✅ `pointer-events-none` on floating-contact container (`src/components/site/floating-contact.tsx` line 37)
- ✅ `pointer-events-none` on music-player container (`src/components/site/music-player.tsx` line 183)
- ✅ `touch-action: manipulation` in `globals.css` (line 17 + 27)
- ✅ `overflow-x: hidden` on html (line 18)
- ✅ `-webkit-tap-highlight-color: transparent` (line 12)
- ✅ `min-height: 44px` touch target media query (line 35)

## Verification Results

### ESLint
```
$ bun run lint
$ eslint .
EXIT_CODE=0  ✅ Clean
```

### curl verifications (all pass)
```
[1]  kmalharbi.c@gmail.com (NEW email):              1  ✅
[2]  khalid-alharbi@zohomail.sa (OLD email):         0  ✅ (fully removed)
[3]  The Hackers One (about.tsx):                    1  ✅
[4]  hotel-ritz.vercel.app (previous-works.tsx):     1  ✅
[5]  nav.portfolio raw key (broken):                 0  ✅ (fixed to "أعمالي")
[6]  id="training" section:                          1  ✅
[7]  id="certificates" section:                      1  ✅
[8]  م. خالد الحربi title:                           1  ✅
[9]  السيبرانية مش ترف bio:                          1  ✅
[10] متاح لمشروعك التالي CTA:                        1  ✅
[11] Metasploit tool mentioned:                      1  ✅
[12] ريتز كارلتون (Ritz-Carlton AR):                 1  ✅
[13] TryHackMe platform:                             2  ✅
[14] Cybrary platform:                               1  ✅
[15] Uber new desc (خريطة تفاعلية):                  1  ✅
[16] معرض الشهادات title:                            1  ✅
[17] CPD badge in hero:                              2  ✅
```

### Certificate SVGs HTTP status (all 200)
```
/certs/cpd-250.svg                    -> HTTP 200
/certs/ibm-cybersecurity.svg          -> HTTP 200
/certs/ibm-cloud-security.svg         -> HTTP 200
/certs/ibm-grc.svg                    -> HTTP 200
/certs/ibm-security-ops.svg           -> HTTP 200
/certs/cisco-ethical-hacker.svg       -> HTTP 200
/certs/hp-professional-networking.svg -> HTTP 200
/certs/alison-cyber.svg               -> HTTP 200
```

## Files Modified (12) + Files Created (10)
**Modified:**
- `.env` (emails)
- `src/app/api/chat/route.ts` (system prompt: 7 jobs, 7 projects, new email)
- `src/app/api/contact/route.ts` (OWNER_EMAIL, FROM_EMAIL)
- `src/app/page.tsx` (added TrainingLabs + CertificateGallery)
- `src/components/site/about.tsx` (bio, 7 jobs, 8 expertise, stats, CTA)
- `src/components/site/contact-section.tsx` (email)
- `src/components/site/floating-contact.tsx` (email)
- `src/components/site/footer.tsx` (email + quick links)
- `src/components/site/hero.tsx` (CPD badge, title, subtitle_role, services_line)
- `src/components/site/i18n.tsx` (nav.portfolio fix, nav.training, all new strings)
- `src/components/site/navbar.tsx` (9 links with i18n keys, removed orphan isAr)
- `src/components/site/previous-works.tsx` (added Ritz-Carlton, updated Uber desc)

**Created:**
- `public/certs/cpd-250.svg`
- `public/certs/ibm-cybersecurity.svg`
- `public/certs/ibm-cloud-security.svg`
- `public/certs/ibm-grc.svg`
- `public/certs/ibm-security-ops.svg`
- `public/certs/cisco-ethical-hacker.svg`
- `public/certs/hp-professional-networking.svg`
- `public/certs/alison-cyber.svg`
- `src/components/site/training-labs.tsx`
- `src/components/site/certificate-gallery.tsx`

## Git Commit
```
3beeff0 feat: rebuild site with real content + mobile fixes
```

## Stage Summary
- ✅ All 8 tasks completed: i18n, about, emails, previous-works (Ritz-Carlton), training-labs (NEW), certificate-gallery (NEW), page.tsx section order, hero updates
- ✅ Mobile fixes from tasks 41 + 42 fully preserved (no regressions)
- ✅ Visual design unchanged — only CONTENT updated + NEW sections added
- ✅ Cyber/neon dark theme preserved (neon-green #00ffcc, neon-blue #00a8e8, neon-pink #ff00cc)
- ✅ All text RTL Arabic with English translations in i18n
- ✅ ESLint clean (exit 0)
- ✅ All 17 verification checks pass
- ✅ All 8 certificate SVGs return HTTP 200
