import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export const runtime = "nodejs";

// Create ZAI instance — try config file first (local), fall back to env vars (Vercel)
async function createZAI(): Promise<InstanceType<typeof ZAI>> {
  try {
    // Try normal create (reads /etc/.z-ai-config in sandbox)
    return await ZAI.create();
  } catch {
    // Fall back to constructor with env vars (Vercel)
    const config = {
      baseUrl: process.env.ZAI_BASE_URL || "https://internal-api.z.ai/v1",
      apiKey: process.env.ZAI_API_KEY || "Z.ai",
      chatId: process.env.ZAI_CHAT_ID || "",
      token: process.env.ZAI_TOKEN || "",
      userId: process.env.ZAI_USER_ID || "",
    };
    // @ts-expect-error — ZAI constructor accepts config object
    return new ZAI(config) as InstanceType<typeof ZAI>;
  }
}

const SYSTEM_PROMPT = `أنت المساعد الذكي الشخصي للخبير خالد محمد عودة الحربي — خبير أمن سيبراني معتمد وباحث أمني. تعمل على موققه الإلكتروني للرد على استفسارات العملاء وتسويق خدماته وإقناعهم بالتعامل معه بلغة عربية فصحى مبسطة وجذابة. لديك معرفة شاملة بكل محتوى الموقع.

=== معلومات الاتصال الرسمية ===
- الاسم الكامل: خالد محمد عودة الحربي (Khalid Mohammed Al-harbi)
- البريد الرسمي: khalid-alharbi@zohomail.sa
- واتساب: +966575015019 (https://wa.me/966575015019)
- الموقع: المملكة العربية السعودية — جدة
- يقدّم خدماته محلياً وعن بُعد

=== الخبرات المهنية الحالية والسابقة (7 وظائف) ===
1. باحث أمني — The Hackers One (العالمية) — حالياً. أبحاث أمنية، كشف ثغرات، وتحليل أنظمة لحماية البنية التحتية الرقمية.
2. مشرف مشاريع تصميم وبرمجة — شركة المرجان — سابقاً. تصميم منتجع سيشيلز وفندق بلو كورال وإدارة فريق تقني للضيافة.
3. مصمم ومبرمج وحماية مواقع — شركة الجبال الإقتصادية — سابقاً. تصميم وبرمجة وحماية متجر سوبرماركت إلكتروني ومنصة رقمية متكاملة.
4. مدير حسابات شركات — شركة STC — سابقاً. إدارة حسابات الشركات والمؤسسات ومتابعة الباقات عبر Salesforce.
5. مساعد مدير موقع — شركة الخدمات المساندة المحدودة — سابقاً. إدارة كامباوند سكني — خطط تشغيلية وأمنية وصيانة وعقود.
6. فني مختبر هندسي — شركة العزاز المحدودة — سابقاً. فحص التربة والخرسانة ونتائج الجودة للمشاريع الهندسية.
7. مدير مختبر هندسي — شركة العصيمي الهندسية — سابقاً. إدارة مختبر مواد البناء وإشراف على فرق الجيوتقنية والخرسانة والأسفلت.

=== التعليم الأكاديمي المعتمد (Coventry University عبر FutureLearn) ===
3 مسارات احترافية (ExpertTracks) و15 دورة من Coventry University البريطانية:

1. Digital Security Training: Cyber Threats and Risk Management — مكتمل 100%
   - The Cyber Security Landscape
   - Risk Management and Security Vulnerabilities
   - Information Security Policy and Management
   - Cryptography and Digital Certificates
   - The Future of Cyber Security and Emerging Technologies

2. Information Security Design and Development — مكتمل 99%
   - How Cyber Security Affects the Software Development Life Cycle
   - Secure System Analysis and Design (96%)
   - Security System and Application Development
   - System Security Testing and Maintenance
   - Current Issues in Secure Development

3. Network Security and Defence — مكتمل 100%
   - Introduction to Network Security and Defence
   - Network Security and Defence: A History of IT
   - Network Security and Defence: Network Environments
   - Network Security and Defence: Security Architecture
   - The Future of Network Security and Defence

=== المؤهلات المهنية الموثّقة (قابلة للتحقق على Credly) ===
1. شهادة CPD المعتمدة من المملكة المتحدة (The CPD Certification Service) — 250 ساعة تطوير مهني مستمر (2026).
2. شهادة IBM SkillsBuild Cybersecurity Certificate (Feb 11, 2026).
3. شهادة Cisco Network Technician Career Path (Aug 07, 2025) — موقّعة من مدير Cisco Networking Academy.
4. شهادة Alison — Cyber Security Essentials Course (Feb 01, 2026) — 250 ساعة تدريب.
5. شهادة OPSWAT ICIP (Aug 05, 2025) — مقدمة في حماية البنية التحتية الحرجة.

=== أوسمة IBM SkillsBuild المهارية الثمانية (كلها موثّقة على Credly) ===
- Cybersecurity Fundamentals (أساسيات الأمن السيبراني) — Jul 10, 2025
- Cloud Security (أمن السحابة) — Feb 11, 2026
- Governance, Risk, Compliance & Data Privacy (الحوكمة والمخاطر والامتثال) — Feb 08, 2026
- Incident Response & Systems Forensics (الاستجابة للحوادث والتحقيق الجنائي) — Feb 11, 2026
- Security Operations & Management (عمليات وإدارة الأمن) — Feb 11, 2026
- System & Network Security (أمن الأنظمة والشبكات) — Feb 10, 2026
- Vulnerability Management (إدارة الثغرات) — Feb 08, 2026
- Information Technology Fundamentals (أساسيات تقنية المعلومات) — Feb 12, 2026

=== أوسمة Cisco الموثّقة على Credly (وسمان) ===
- Network Technician Career Path (مسار فني الشبكات) — Aug 07, 2025
- Ethical Hacker (الهاكر الأخلاقي) — Aug 05, 2025

=== شهادة OPSWAT الموثّقة على Credly ===
- OPSWAT Introduction to Critical Infrastructure Protection (ICIP) — Aug 05, 2025 (تنتهي Aug 05, 2026)

=== دورات Cisco Networking Academy المكتملة (6 دورات) ===
- Network Defense (دفاع الشبكات)
- Endpoint Security (أمن نقاط النهاية)
- Cyber Threat Management (إدارة التهديدات السيبرانية)
- Networking Basics (أساسيات الشبكات)
- Networking Devices & Initial Configuration (أجهزة الشبكات والإعداد الأولي)
- Network Support & Security (دعم وأمن الشبكات)

=== الخبرات الأساسية في الأمن السيبراني (11 مجال) ===
1. أساسيات الأمن السيبراني ومبادئه وممارساته.
2. كشف ثغرات الأنظمة واختبار الاختراق (Penetration Testing) — وسام Ethical Hacker من Cisco.
3. حماية الشبكات والأجهزة (pfSense / Cisco) — شهادة Network Technician + مسار Network Security and Defence.
4. أمن السحابة (Cloud Security) — وسام من IBM.
5. تأمين المواقع والتطبيقات (OWASP Top 10) — مسار Information Security Design and Development.
6. الاستجابة للحوادث والتحقيق الجنائي الرقمي — وسام من IBM.
7. الحوكمة والمخاطر والامتثال وحماية البيانات — وسام من IBM + مسار Digital Security Training.
8. إدارة الثغرات (Vulnerability Management) — وسام من IBM.
9. عمليات وإدارة الأمن (Security Operations) — وسام من IBM.
10. التشفير والشهادات الرقمية (Cryptography) — من Coventry University.
11. تصميم وتطوير الأنظمة الآمنة (Secure SDLC) — من Coventry University.

=== المنتجات والباقات المعروضة على الموقع ===

--- الخدمات المهنية الأساسية (7 باقات) ---
1. الباقة الأساسية للحماية — $1,500 + $100/شهر صيانة. تقييم أمني شامل، تأمين نقاط الدخول، إعداد pfSense، تقرير ثغرات. (الأكثر طلباً)
2. اختبار الاختراق الاحترافي — $2,500 لكل حملة. محاكاة هجمات حقيقية، كشف OWASP Top 10، تقرير فني وتنفيذي، إعادة اختبار.
3. الباقة المؤسسية (Cisco) — $3,500 + $250/شهر صيانة. هندسة شبكة Cisco، عزل DMZ، IDS/IPS، مراقبة 24/7.
4. تأمين المواقع الإلكترونية — $800 لكل موقع. فحص ثغرات الويب، حماية SQL/XSS، WAF + SSL، تدقيق الكود.
5. الاستجابة للحوادث — $1,200 لكل حادثة. استجابة طارئة، احتواء وعزل، تحقيق جنائي رقمي، خطة استعادة.
6. الامتثال والتدريب — $600 لكل برنامج. تقييم ISO/PCI-DSS، سياسات أمنية، تدريب الفريق.
7. تطوير موقع/تطبيق شامل — $2,500+ + $200/شهر. تصميم UI/UX، frontend + backend، DB + users + dashboard، تكامل دفع، SEO، صيانة.

--- الخدمات الاستشارية Premium المدعومة بتعليم Coventry (3 باقات) ---
8. استشارات إدارة المخاطر السيبرانية — $2,000. مستندة لمسار Digital Security Training (100%). تقييم مخاطر + سياسة أمنية + تطبيق التشفير + تقرير تنفيذي.
9. تصميم وتطوير أنظمة آمنة — $3,000. مستندة لمسار Information Security Design and Development (99%). مراجعة Secure SDLC + بنية آمنة + اختبار أمني + خطة صيانة.
10. هندسة الدفاع السيبراني للشبكات — $2,800. مستندة لمسار Network Security and Defence (100%). بنية متعددة الطبقات + استراتيجية دفاع + مراقبة + تحصين.

ملاحظة: جميع الأسعار تقديرية وقابلة للتخصيص حسب حجم المنشأة.

=== قسم التصاميم والإبداع البصري (6 خدمات) ===
1. تصميم الشعارات (Logo Design) — wordmarks / symbol / combination marks.
2. الهوية البصرية (Visual Identity) — لوحة الألوان + دليل الهوية + عناصر مساعدة.
3. تصميم الإعلانات (Ad Design) — إعلانات سوشيال ميديا + بانرات + أسلوب Amazon.
4. تصميم المودلز 3D (3D Model Design) — عبايات + ذهب + شنط + إكسسوارات.
5. تصميم الواجهات UI/UX — تطبيقات موبايل + مواقع ويب + لوحات تحكم.
6. تصميم السوشيال ميديا — بوستات + ستوريز + كفرات + محتوى تسويقي.

=== الأعمال المنجزة (7 مشاريع حقيقية مع روابط مباشرة) ===
1. Netflix Clone (KMHflix) — منصة بث أفلام — https://kmhflix.netlify.app/
2. Amazon Clone — متجر إلكتروني — https://bright-5halid-amazon.netlify.app/
3. Instagram Clone — تطبيق اجتماعي — https://bright-khalid-insta-app.netlify.app/
4. WhatsApp Clone — تطبيق محادثات — https://bright-khalid-whats-app.netlify.app/
5. Haraj — سوق إعلانات مبوبة سعودي — https://haraj-v2.vercel.app/
6. Uber — منصة نقل وتوصيل ذكية — https://uber-new-omega.vercel.app/
7. The Ritz-Carlton Jeddah — موقع فندق فاخر — https://hotel-ritz.vercel.app/ — مع dashboard ونظام حجز ولوحة تحكم admin، مبني بـ Next.js/React/Tailwind/TypeScript/RTL.

=== المنصات والأدوات التي يعمل بها ===
- الأدوات التقنية: IBM, Cisco, Kali Linux, Python, Flutter, MySQL, WordPress, Photoshop, Premiere Pro.
- منصات الاعتماد: Coventry University, FutureLearn, Credly, TryHackMe, CPD UK, Alison.

=== تعليمات الرد ===
- كن ودوداً ومهنياً، استخدم الإيموجي المناسبة باعتدال.
- اجعل إجاباتك مختصرة ومفيدة (3-6 أسطر عادةً).
- عند سؤال العميل عن الخدمات أو الأسعار، قدّم الباقة المناسبة لاحتياجه.
- عندما يبدو العميل مهتماً، وجّهه للتواصل عبر واتساب +966575015019 أو البريد khalid-alharbi@zohomail.sa للحصول على استشارة مجانية وعرض سعر مخصص.
- إذا سُئلت عن المؤهلات، اذكر بفخر: مسارات Coventry (3 + 15 دورة)، CPD UK (250 ساعة)، IBM SkillsBuild + 8 أوسمة، Cisco (2 أوسمة)، Alison، OPSWAT، 6 دورات Cisco Academy. كل الأوسمة موثّقة على Credly.
- إذا سُئلت عن الخبرات المهنية، اذكر: باحث أمني حالياً في The Hackers One (العالمية)، + 6 خبرات سابقة في شركات رائدة (المرجان، الجبال الإقتصادية، STC، الخدمات المساندة، العزاز، العصيمي الهندسية).
- إذا سُئلت عن التصاميم، اذكر 6 خدمات: شعارات، هوية بصرية، إعلانات، مودلز 3D، UI/UX، سوشيال ميديا.
- إذا سُئلت عن الأعمال المنجزة، اذكر 7 مشاريع حقيقية مع روابطها: KMHflix (Netflix)، Amazon، Instagram، WhatsApp، Haraj، Uber، The Ritz-Carlton Jeddah.
- إذا سُئلت عن التصاميم، اذكر 6 فئات مع 18 عمل احترافي: شعارات (3)، هوية بصرية (3)، إعلانات (3)، مودلز 3D (3)، واجهات UI/UX (3)، سوشيال ميديا (3). كلها معروضة في قسم التصاميم + معرض كامل على Google Drive.
- إذا سُئلت عن الخبرة العملية أو التقارير الأمنية أو حماية الشبكات/المواقع/التطبيقات/قاعدة البيانات/الكاميرات، اذكر بفخر: تقرير الحماية واختبار الاختراق وإغلاق الثغرات (53 خطوة موثّقة، 5 ثغرات مكتشفة، 100% إغلاق، إعادة اختبار ناجحة). التقرير يحمي: شبكاتك (pfSense Firewall)، مواقعك وتطبيقاتك الإلكترونية (Windows Server 2025 + Active Directory)، قاعدة بياناتك (منع اعتراض بيانات الاعتماد + حظر الوصول غير المصرّح)، كاميراتك من الاختراق (تأمين كاميرات المراقبة + عزلها عن شبكة البيانات). يغطي تحليل اختبارات اختراق لاكتشاف الثغرات بالأدوات: Kali Linux, Nmap, Impacket, Hashcat, Responder, BloodHound, Wireshark. الثغرات المكتشفة: SMB Null Session + LLMNR Poisoning + GPP Passwords + LDAP RootDSE + Credential Interception. الإغلاق: إغلاق جميع الثغرات على شبكتك (GPO + Registry Hardening + عزل الكاميرات + Re-Testing). مناسب لجميع الفئات: الأفراد، المؤسسات الصغيرة (1-50 موظف)، المتوسطة (50-250)، الكبيرة (250+). التقرير متاح للتحميل في قسم "التقارير الأمنية" على الموقع.
- إذا سُئلت عن شهادات HP LIFE، اذكر: HP LIFE — IT for Business Success (اختيار أفضل تكنولوجيا للأعمال) + HP LIFE — Professional Networking for Career Growth (الشبكات المهنية + العلامة التجارية الشخصية). كلاهما معتمد من HP Foundation.
- ⚠️ مهم — الدقة والشفافية: ExpertTracks برامج تدريبية عالية المستوى من Coventry University عبر FutureLearn — ليست شهادة جامعية تقليدية. لا تدّعِ "خبرة معتمدة" — استخدم "متخصص معتمد" أو "حاصل على مسارات تدريبية متقدمة".
- أكّد دائماً أن الشهادات موثّقة إلكترونياً على Credly ويمكن للعميل التحقق منها بنفسه.
- أكّد أن التقارير الأمنية موثّقة بالصور والأوامر الفعلية — شفافية كاملة قبل التعاقد.`;

// In-memory conversation store per session (server-side only).
const conversationStore = new Map<string, { role: string; content: string }[]>();
const MAX_HISTORY = 10;

// Offline fallback — professional marketer bot with varied, non-repetitive responses
// Each intent has multiple response variants picked randomly to avoid repetition
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getOfflineReply(message: string, isAr: boolean): string {
  const msg = message.toLowerCase();
  const has = (kw: string[]) => kw.some((k) => msg.includes(k));

  if (isAr) {
    // 1. عن خالد / لماذا يختارني
    if (has(["لماذا", "ليش", "خالد", "من انت", "من أنت", "عنك", "عن خالد", "اختيار", "الأفضل", "الافضل", "why", "who"])) {
      return pick([
        "خالد الحربي ليس مجرد خبير أمن سيبراني — هو باحث أمني نشط في The Hackers One العالمية 🌍، مع 30+ شهادة موثّقة على Credly و3 مسارات من Coventry University البريطانية. ما يميزه: الخبرة العملية المزدوجة (أمن + تصميم + إدارة) عبر 7 شركات سعودية رائدة. عندما تتعاقد معه، لا تحصل على نصائح نظرية — تحصل على حلول مختبرة في الميدان. 🏆 تواصل واتساب +966575015019 لاستشارة مجانية!",
        "لماذا خالد؟ 🤔 لأنه الوحيد الذي يجمع 3 مزايا نادرة: (1) تعليم أكاديمي بريطاني معتمد من Coventry، (2) خبرة عملية في 7 شركات包括 STC والجبال الاقتصادية، (3) باحث أمني نشط حالياً في The Hackers One. هذا يعني: عمق أكاديمي + خبرة ميدانية + اطلاع على أحدث التهديدات. لا تدّعي — أثبت بشهادات موثّقة على Credly. 🛡️ احجز استشارتك المجانية: +966575015019",
        "خالد محمد عودة الحربي — خبير أمن سيبراني سعودي، مقره جدة 🇸🇦. مسيرته المهنية متنوعة بشكل فريد: من مدير مختبر هندسي إلى مشرف مشاريع إلى مدير حسابات في STC إلى مصمم ومبرمج متاجر إلكترونية إلى باحث أمني حالياً. هذه الخبرة الميدانية المختلطة تعني أنه يفهم أعمالك من زاوية لا يفهمها خبير تقني بحت. +250 ساعة تدريب CPD + 30 شهادة موثّقة = خبرة مثبتة وليست ادعاء. 💎 تواصل: +966575015019",
      ]);
    }

    // 2. الخدمات
    if (has(["خدمة", "خدمات", "service", "باقة", "باقات"])) {
      return pick([
        "أقدم 7 باقات أمن سيبراني مصممة لكل حجم أعمال 🛡️:\n\n🔹 الباقة الأساسية — $1,500 (الدرع الأول)\n🔹 اختبار الاختراق — $2,500 (اخترق قبلهم)\n🔹 الباقة المؤسسية Cisco — $3,500 (حماية مؤسسات)\n🔹 تأمين المواقع — $800 (احمِ موقعك)\n🔹 الاستجابة للحوادث — $1,200 (وقت الأزمة)\n🔹 الامتثال والتدريب — $600 (ثقافة أمنية)\n🔹 تطوير موقع/تطبيق شامل — $2,500+\n\nأي باقة تهمك؟ أعطني تفاصيل أعمالك وأرشح لك الأنسب 👍",
        "خدماتي مقسمة لـ 7 باقات أمنية + 6 خدمات تصاميم 🎨. الباقة الأكثر طلباً هي \"اختبار الاختراق\" ($2,500) لأنها تكشف ثغراتك قبل المهاجمين. لو عندك موقع إلكتروني، أنصحك بـ \"تأمين المواقع\" ($800). لو مؤسسة كبيرة، \"الباقة المؤسسية Cisco\" ($3,500) هي الأفضل. كل الأسعار قابلة للتخصيص حسب حجم منشأتك. 📞 واتساب +966575015019 لاستشارة مجانية!",
        "عندي 7 باقات لحماية أعمالك 💪:\n1️⃣ أساسية $1,500 — تقييم شامل\n2️⃣ اختراق $2,500 — محاكاة هجمات حقيقية\n3️⃣ مؤسسية $3,500 — Cisco + DMZ + IDS/IPS\n4️⃣ مواقع $800 — حماية SQL/XSS\n5️⃣ حوادث $1,200 — استجابة طارئة\n6️⃣ امتثال $600 — ISO/PCI-DSS\n7️⃣ تطوير $2,500+ — موقع/تطبيق شامل\n\nقول لي وش طبيعة أعمالك وأنا أرشح لك الباقة المثالية 🎯",
      ]);
    }

    // 3. الأسعار
    if (has(["سعر", "أسعار", "كم", "price", "cost", "تكلفة", "بكام"])) {
      return pick([
        "الأسعار تبدأ من $600 وتصل لـ $3,500 💰:\n\n• الامتثال والتدريب — $600 (الأقل تكلفة)\n• تأمين المواقع — $800\n• الاستجابة للحوادث — $1,200\n• الباقة الأساسية — $1,500 (الأكثر طلباً ⚡)\n• اختبار الاختراق — $2,500\n• تطوير موقع/تطبيق — $2,500+\n• الباقة المؤسسية Cisco — $3,500\n\n⚠️ جميع الأسعار تقديرية وقابلة للتخصيص حسب حجم منشأتك. تواصل واتساب +966575015019 لعرض سعر مخصص مجاناً!",
        "أسعاري تنافسية لأنها تعكس خبرة حقيقية وليست نظرية 📊. لو مقارن بخبراء آخرين بنفس المؤهلات (Coventry + IBM + Cisco + CPD)، ستجد أسعاري معقولة جداً. الباقة الأساسية $1,500 تشمل تقييم أمني شامل + تأمين نقاط الدخول + pfSense + تقرير ثغرات — قيمة ممتازة. وأيضاً أقدم استشارة مجانية لتقييم احتياجك الفعلي قبل أي تعاقد. 🤝 واتساب: +966575015019",
        "كل سعر مرن وقابل للتفاوض حسب حجم أعمالك 💡. مثلاً:\n- متجر صغير؟ تأمين المواقع $800 كافٍ\n- شركة متوسطة؟ الباقة الأساسية $1,500 + $100/شهر صيانة\n- مؤسسة كبيرة؟ Cisco $3,500 + $250/شهر (مراقبة 24/7)\n- ميزانية محدودة؟ الامتثال $600 نقطة بداية ممتازة\n\nأعطني ميزانيتك التقريبية وأرشح لك الخيار الأمثل 🎯",
      ]);
    }

    // 4. المؤهلات
    if (has(["مؤهل", "شهادة", "credly", "credential", "اعتماد", "شهادات"])) {
      return pick([
        "خالد يمتلك 30+ شهادة موثّقة من مؤسسات عالمية 🎓:\n\n🇬🇧 Coventry University — 3 مسارات (ExpertTracks) + 15 دورة\n🇬🇧 CPD UK — 250 ساعة تطوير مهني\n🇺🇸 IBM SkillsBuild — شهادة + 8 أوسمة مهارية\n🇺🇸 Cisco — 2 أوسمة (Network Technician + Ethical Hacker)\n🇺🇸 OPSWAT — حماية البنية التحتية الحرجة\n🇮🇪 Alison — أساسيات الأمن السيبراني\n\n✅ كل شهادة قابلة للتحقق إلكترونياً على Credly. لا ندّعي — أثبت! تحقق بنفسك قبل التعاقد 🔍",
        "المؤهلات؟ 30+ شهادة موثّقة عالمياً 🏆. الأهم: ليست شهادات تجميلية — كلها موثّقة على Credly بروابط تحقق مباشرة. أمتلك CPD UK (250 ساعة)، IBM SkillsBuild Cybersecurity Certificate + 8 أوسمة مهارية (Cloud Security, GRC, Incident Response, Security Ops, System/Network Security, Vulnerability Management, IT Fundamentals)، Cisco Network Technician + Ethical Hacker، OPSWAT ICIP، و3 مسارات Coventry University البريطانية. 🎓 تحقق بنفسك: credly.com/users/khalid-mohammed-alharbi",
        "خالد لا يدّعي الخبرة — يثبتها بـ 30+ شهادة موثّقة 📜:\n• CPD UK (250 ساعة) — معتمدة دولياً\n• IBM SkillsBuild + 8 أوسمة (Cloud, GRC, Incident Response, SecOps, S&N Security, Vuln Mgmt, IT Fundamentals, Cybersecurity Fundamentals)\n• Cisco (Network Technician + Ethical Hacker)\n• OPSWAT ICIP — حماية البنية التحتية الحرجة\n• Alison — Cyber Security Essentials\n• Coventry University — 3 ExpertTracks + 15 دورة\n\nكل وسام له رابط تحقق مباشر على Credly. 🛡️ شفافية كاملة قبل التعاقد!",
      ]);
    }

    // 5. الخبرات العملية
    if (has(["خبرة", "وظيفة", "عمل", "experience", "سيرة", "resume", "cv"])) {
      return pick([
        "مسيرة خالد المهنية متنوعة بشكل فريد 💼 — 7 وظائف في قطاعات مختلفة:\n\n1️⃣ باحث أمني — The Hackers One (حالياً 🟢)\n2️⃣ مشرف مشاريع تصميم وبرمجة — المرجان\n3️⃣ مصمم ومبرمج وحماية مواقع — الجبال الاقتصادية\n4️⃣ مدير حسابات شركات — STC\n5️⃣ مساعد مدير موقع — الخدمات المساندة\n6️⃣ فني مختبر هندسي — العزاز\n7️⃣ مدير مختبر هندسي — العصيمي الهندسية\n\nهذا التنوع يعني: يفهم أعمالك من زاوية إدارية + تقنية + أمنية. نادراً ما تجد خبير أمن يمتلك هذه الخبرة الميدانية المختلطة. 🎯",
        "خالد عمل في 7 شركات في قطاعات مختلفة 💪 — هذا ما يميزه:\n\n🔹 حالياً: باحث أمني في The Hackers One العالمية (أبحاث + تحليل ثغرات)\n🔹 سابقاً: مشرف مشاريع في المرجان (تصميم منتجع سيشيلز + بلو كورال)\n🔹 مصمم ومبرمج في الجبال الاقتصادية (متجر سوبرماركت إلكتروني متكامل)\n🔹 مدير حسابات في STC (حسابات الشركات عبر Salesforce)\n🔹 مساعد مدير موقع في الخدمات المساندة (كامباوند سعودي أوجيه)\n🔹 فني مختبر في العزاز + مدير مختبر في العصيمي\n\nخبرة ميدانية حقيقية + 8+ سنوات = ليس نظري بل تطبيقي. 🏆",
      ]);
    }

    // 6. التصاميم
    if (has(["تصميم", "design", "شعار", "هوية", "إعلان", "logo", "brand", "3d"])) {
      return pick([
        "قسم التصاميم عندي يقدم 6 خدمات إبداعية 🎨:\n\n🖌️ تصميم الشعارات — wordmarks/symbol/combination\n🎨 الهوية البصرية — ألوان + خطوط + دليل استخدام\n📢 تصميم الإعلانات — أسلوب Amazon + سوشيال ميديا\n🧊 مودلز 3D — عبايات + ذهب + شنط + إكسسوارات\n📱 واجهات UI/UX — موبايل + ويب + لوحات تحكم\n✨ سوشيال ميديا — بوستات + ستوريز + كفرات\n\nأي نوع تصميم تحتاجه؟ أعطني فكرتك وأحوّلها لواقع بصري مذهل ✨ واتساب: +966575015019",
        "التصاميم ليست هواية عندي — مهارة احترافية مكتسبة من عمل فعلي في شركة الجبال الاقتصادية ومشاريع سيشيلز + بلو كورال 🏨. أقدم 6 خدمات: شعارات، هوية بصرية، إعلانات (أسلوب أمازون)، مودلز 3D (للمنتجات)، UI/UX (مواقع/تطبيقات)، سوشيال ميديا. كل تصميم يدمج الجمال البصري مع الوظيفة التسويقية. 🎯 تواصل واتساب +966575015019 لطلب تصميمك!",
        "تصاميمي تجمع بين الجمال والوظيفة 💎:\n• شعار احترافي يعكس هويتك → يبني الثقة\n• هوية بصرية متكاملة → اتساق علامتك التجارية\n• إعلانات بأسلوب أمازون → تحوّل المتصفح لعميل\n• مودلز 3D لمنتجاتك → عرض احترافي\n• واجهات UI/UX → تجربة مستخدم سلسة\n• سوشيال ميديا → محتوى يجذب جمهورك\n\nسواء تحتاج شعار جديد أو إعادة هيكلة هوية بصرية، أنا هنا. 🚀 +966575015019",
      ]);
    }

    // 7. التواصل
    if (has(["تواصل", "واتساب", "whatsapp", "email", "إيميل", "بريد", "ايميل", "contact", "رقم", "هاتف"])) {
      return pick([
        "تواصل مع خالد مباشرة 🤝:\n\n📱 واتساب: +966 57 501 5019\n📧 إيميل: khalid-alharbi@zohomail.sa\n🌍 الموقع: المملكة العربية السعودية — جدة\n⏰ أرد خلال 24 ساعة\n\n💬 الأسرع: واتساب (رد فوري خلال ساعات العمل)\n📧 للأمور الرسمية: إيميل (توثيق كامل)\n\nجاهز لحماية أعمالك؟ تواصل الآن واحصل على استشارة أمنية مجانية! 🛡️",
        "أسهل طرق التواصل معي 📞:\n\nالواتساب هو الأسرع: +966575015019 — رد خلال دقائق في أوقات العمل ⚡\nالإيميل للتفاصيل الرسمية: khalid-alharbi@zohomail.sa\n\nأقدم استشارة مجانية لأي سؤال أمني أو تصميمي. لا تتردد — أمنك أهم من أي تأخير! 🛡️",
        "متواصل دائماً مع عملائي 🤝:\n📱 واتساب: 966575015019 (الأفضل)\n📧 إيميل: khalid-alharbi@zohomail.sa\n🌍 جدة، السعودية (خدمات محلية + عن بُعد)\n\nجرّب واتساب الآن — ابعث لي رسالة بأي سؤال وأرد عليك فوراً. الاستشارة الأولى مجانية دائماً! 🎁",
      ]);
    }

    // 8. الأعمال / المشاريع
    if (has(["أعمال", "مشاريع", "portfolio", "project", "أمثلة", "نماذج", "اعمال"])) {
      return pick([
        "أنجزت 7 مشاريع حقيقية على الإنترنت 🚀 — كلها معاينة مباشرة:\n\n🎬 Netflix Clone — kmhflix.netlify.app\n🛒 Amazon Clone — متجر إلكتروني متكامل\n📸 Instagram Clone — تطبيق اجتماعي ثنائي اللغة\n💬 WhatsApp Clone — محادثات فورية\n🚗 Haraj — سوق إعلانات سعودي (20+ قسم)\n🚙 Uber Clone — تتبع + حجز رحلات\n🏨 فندق Ritz-Carlton Jeddah — hotel-ritz.vercel.app (لوحة تحكم + حجوزات)\n\nكل مشروع مبني بتقنيات حديثة: React, Next.js, TypeScript, Service Worker, PWA. جرّبها بنفسك! 🎯",
        "مشاريعي تتكلم عن نفسها 💪:\n\nأحدثها: فندق Ritz-Carlton Jeddah — موقع فندقي فاخر بلوحة تحكم كاملة للعميل والإدارة، نظام حجوزات، نقاط ولاء. مبني بـ Next.js + TypeScript + RTL. 🔥\n\nقبلها: حراج (20+ قسم، Service Worker للعمل offline)، Uber (تتبع خرائط)، Netflix/Amazon/Instagram/WhatsApp clones.\n\n7 مشاريع حقيقية = خبرة مثبتة وليست ادعاء. 🏆 شاهد: hotel-ritz.vercel.app",
        "كل مشروع أنجزته يحكي قصة احترافية 📚:\n\n1️⃣ Netflix — تعلمت بناء منصات بث متقدمة\n2️⃣ Amazon — إتقنت المتاجر الإلكترونية\n3️⃣ Instagram — تطبيقات اجتماعية ثنائية اللغة\n4️⃣ WhatsApp — محادثات real-time\n5️⃣ Haraj — منصات إعلانات كبيرة (PWA + offline)\n6️⃣ Uber — تكامل خرائط + تتبع\n7️⃣ Ritz-Carlton — مواقع فندقية فاخرة + dashboards\n\nكل مشروع رفع مستوى خبرتي. مشروعك القادم سيكون تحفتي الثامنة! 🎨 +966575015019",
      ]);
    }

    // 9. التدريب / التعليم
    if (has(["تدريب", "تدريبي", "lab", "مختبر", "tryhackme", "cybrary", "aws", "ccna", "course", "دورة"])) {
      return pick([
        "خالد تدرب على 50+ منصة عالمية 📚:\n\n🇬🇧 TryHackMe — 7 مختبرات اختراق (Mr. Robot, Airplane, Steel Mountain...)\n🇺🇸 Cybrary — 7 دورات (Ethical Hacker, GRC, Identity Management...)\n🌐 Cisco (Udemy) — CCNA + CCNP + Meraki + MPLS + IPv6 + GNS3\n🟧 AWS — Cloud Practitioner + Solutions Architect + Developer\n📈 HP LIFE — IT + Communication + Finance + Inventory\n💻 SoloLearn — Python/SQL/PHP/CSS/HTML\n🎓 ICDL + IEEE + Taylor & Francis\n\nتدريب عملي مستمر = خبرة محدّثة دائماً. 🚀",
        "التعلم المستمر هو سر تميز خالد 🎓:\n\n• TryHackMe بريطانيا — مختبرات اختراق احترافية\n• Cybrary أمريكا — دورات أمنية متقدمة\n• Cisco Udemy — CCNA/CCNP/GNS3/MPLS\n• Amazon AWS — 3 شهادات سحابية\n• HP LIFE — تطوير مهني\n• Coventry University — 3 ExpertTracks + 15 دورة\n\n+100 دورة تدريبية = خبير دائماً على اطلاع بأحدث التهديدات والحلول. 🛡️",
      ]);
    }

    // 10. التحية / البداية
    if (has(["مرحبا", "السلام", "هلا", "hello", "hi", "hey", "صباح", "مساء", "سلام"])) {
      return pick([
        "أهلاً وسهلاً بك! 👋🌟\nأنا مساعد خالد الحربي — خبير الأمن السيبراني.\n\nكيف أقدر أخدمك اليوم؟ تقدر تسألني عن:\n🛡️ الخدمات (7 باقات أمنية)\n💰 الأسعار\n🎓 المؤهلات (30+ شهادة)\n💼 الخبرات (7 وظائف)\n🎨 التصاميم (6 خدمات)\n🚀 الأعمال (7 مشاريع)\n📞 التواصل\n\nأو قول لي وش طبيعة أعمالك وأرشح لك الخدمة المناسبة 👍",
        "حياك الله! 🌟 منور صفحتنا.\nأنا هنا أساعدك في كل ما يخص الأمن السيبراني والتصميم.\n\nسؤال سريع: هل تبحث عن حماية موقعك؟ أم تصميم جديد؟ أم استشارة أمنية شاملة؟\n\nأو اكتب سؤالك مباشرة وأرد عليك فوراً 💬\n(للتواصل المباشر: واتساب +966575015019)",
        "مرحباً بك! 🤝\nسعيد بتواصلك مع خالد الحربي — خبير أمن سيبراني معتمد.\n\nأقدر أساعدك في:\n• حماية أعمالك من الاختراق 🛡️\n• تصميم موقع/متجر/شعار 🎨\n• استشارة أمنية مجانية 💡\n• معرفة المؤهلات والخبرات 🎓\n\nوش اللي يهمك أكثر؟ 🎯",
        "أهلاً! 👋\nأساعدك في حماية أعمالك سيبرانياً وتصميم هويتك البصرية.\n\nلو عندك سؤال محدد، اكتبه وأرد فوراً.\nلو تبي تواصل مباشر: واتساب +966575015019 📱\n\nجاهز أساعدك في أي شيء تحتاجه 💪",
      ]);
    }

    // 11. شكر / امتنان
    if (has(["شكرا", "شكراً", "thanks", "thank", "مشكور", "ممتن"])) {
      return pick([
        "العفو! 🤝 سعيد بمساعدتك. لو عندك أي سؤال ثاني، أنا هنا.\nللتواصل المباشر: واتساب +966575015019 📱\nجاهز دائماً لخدمتك! 🛡️",
        "لا شكر على واجب! 🌟 أتمنى لك التوفيق في أعمالك.\nلا تتردد ترجع لي أي وقت تحتاج مساعدة أمنية أو تصميم.\nواتساب: +966575015019 💪",
        "تسلم! 🙏 سعيد بإفادتك. لو حابب تستشار خالد مباشرة، راسله واتساب +966575015019 — يستقبل استفساراتك ويعطيك استشارة مجانية. 🎯",
      ]);
    }

    // 12. التقارير الأمنية / اختبار الاختراق
    if (has(["تقرير", "reports", "report", "اختبار اختراق", "penetration", "pfsense", "active directory", "اختراق ad", "ثغرات", "مختبر", "حماية شبكة", "حماية موقع", "حماية تطبيق", "قاعدة بيانات", "كاميرا", "كاميرات", "camera"])) {
      return pick([
        "نعم! خالد عنده تقرير احترافي شامل قابل للتحميل 📄🔧:\n\n🛡️ تقرير الحماية واختبار الاختراق وإغلاق الثغرات\n📊 53 خطوة موثّقة بالصور والأوامر الفعلية\n🚨 5 ثغرات مكتشفة\n✅ 100% إغلاق + إعادة اختبار ناجحة\n\nيحمي:\n🌐 شبكاتك (pfSense Firewall + قواعد)\n🔐 مواقعك وتطبيقاتك (Windows Server 2025 + AD)\n📷 كاميراتك من الاختراق (عزل + تأمين)\n💾 قاعدة بياناتك (منع اعتراض بيانات الاعتماد)\n🔒 إغلاق جميع الثغرات على شبكتك\n\nلمن؟ 👤 الأفراد | 🏢 صغيرة (1-50) | 🏬 متوسطة (50-250) | 🏛️ كبيرة (250+)\n\n📥 حمّله من قسم 'التقارير الأمنية' في الموقع!",
        "تقرير خالد الأمني = حماية شاملة لأعمالك 🏆:\n\n🔍 تحليل اختبارات اختراق لاكتشاف الثغرات\nالأدوات: Kali Linux, Nmap, Impacket, Hashcat, Responder, BloodHound, Wireshark\n\n🚨 الثغرات المكتشفة:\n• SMB Null Session\n• LLMNR Poisoning (اعتراض NTLMv2)\n• GPP Passwords\n• LDAP RootDSE\n• Credential Interception\n\n✅ الإغلاق: GPO + Registry Hardening + عزل الكاميرات + Re-Testing ناجح 100%\n\n53 خطوة موثّقة ثنائية اللغة. 📥 تحميل مجاني من الموقع!",
        "سؤال ممتاز! 📊 تقرير خالد يحمي شبكاتك ومواقعك وتطبيقاتك وكاميراتك وقاعدة بياناتك:\n\n🛡️ الحماية:\n• شبكاتك: pfSense (ZFS + DHCP + Firewall Rules + حظر Nmap)\n• مواقعك وتطبيقاتك: Windows Server 2025 + AD (DC + OUs + GPO + 5 مستخدمين)\n• كاميراتك: تأمين كاميرات المراقبة + عزلها عن شبكة البيانات\n• قاعدة بياناتك: منع اعتراض بيانات الاعتماد + حظر الوصول غير المصرّح\n\n🔍 الاختبار: 53 خطوة (Nmap + BloodHound + Responder + Hashcat)\n🔒 الإغلاق: إغلاق جميع الثغرات على شبكتك 100% + Re-Testing\n\nللأفراد + المؤسسات الصغيرة والمتوسطة والكبيرة. 📥 حمّله من الموقع!",
        "خالد يقدم تحفة احترافية: تقرير الحماية واختبار الاختراق وإغلاق الثغرات 💎\n\n📌 53 خطوة موثّقة (عربي/إنجليزي)\n📌 5 ثغرات مكتشفة ومغلقة 100%\n📌 أدوات Enterprise: Kali, Nmap, Impacket, Responder, BloodHound, Hashcat, Wireshark, pfSense\n\nيحميك من:\n🚨 الاختراق والهجمات السيبرانية\n🚨 سرقة قاعدة بياناتك\n🚨 اختراق كاميرات المراقبة\n🚨 اعتراض بيانات الاعتماد\n🚨 الوصول غير المصرّح\n🔒 + إغلاق جميع الثغرات على شبكتك\n\nمناسب لجميع الأحجام: 👤 فرد | 🏢 1-50 | 🏬 50-250 | 🏛️ 250+\n📥 تحميل مجاني في قسم 'التقارير الأمنية'!",
      ]);
    }

    // 13. شهادات HP LIFE
    if (has(["hp", "hewlett", "hp life", "حياة hp", "اتش بي"])) {
      return pick([
        "خالد حاصل على شهادتين من HP LIFE (HP Foundation) 📜:\n\n1️⃣ IT for Business Success — اختيار أفضل تكنولوجيا للأعمال ودمجها\n2️⃣ Professional Networking for Career Growth — الشبكات المهنية + العلامة التجارية الشخصية\n\nهذه الشهادات تثبت أن خالد لا يملك فقط المهارات التقنية، بل يفهم أيضاً:\n• احتياجات الأعمال 🏢\n• بناء العلاقات المهنية 🤝\n• العلامة التجارية الشخصية 🎯\n\nنادراً ما تجد خبير أمن يجمع هذه المهارات! تحميل الشهادات متاح في قسم 'الشهادات'.",
      ]);
    }

    // 14. رد افتراضي ذكي — يحاول فهم السؤال ويوجه العميل
    return pick([
      "سؤال ممتاز! 🤔\nلأقدر أساعدك بشكل أدق، قول لي:\n• وش طبيعة أعمالك؟ (متجر/شركة/موقع شخصي)\n• وش هدفك؟ (حماية/تصميم/استشارة)\n\nأو تواصل مباشر مع خالد: واتساب +966575015019 📱\nأو اسألني عن: الخدمات، الأسعار، المؤهلات، الأعمال، التصاميم، الخبرات",
      "أحب أساعدك! 💪\nعندي معلومات شاملة عن خدمات خالد. تقدر تسألني بشكل محدد:\n• \"وش الخدمات اللي تقدمها؟\"\n• \"كم سعر اختبار الاختراق؟\"\n• \"ورني مشاريعك\"\n• \"كيف أتواصل معك؟\"\n\nأو راسل خالد مباشرة: واتساب +966575015019 — يرد خلال 24 ساعة 🤝",
      "فهمت استفسارك! 👍\nلأعطيك أفضل إجابة، جرّب تسألني بطريقة مختلفة أو اختر من:\n🛡️ الخدمات | 💰 الأسعار | 🎓 المؤهلات | 💼 الخبرات | 🎨 التصاميم | 🚀 الأعمال\n\nأو تواصل مع خالد مباشرة: +966575015019 (واتساب) | khalid-alharbi@zohomail.sa",
      "محتاج أعرف تفاصيل أكثر عشان أساعدك صح 😊\n\nلو سؤالك عن:\n• حماية → اسأل \"ما هي خدماتك؟\"\n• أسعار → \"كم سعر الحماية؟\"\n• خبرة → \"ما هي مؤهلاتك؟\"\n• تصميم → \"ما هي خدمات التصميم؟\"\n\nأو واتساب مباشر: +966575015019 📱",
    ]);
  }

  // English responses
  if (has(["why", "who", "khalid", "about", "best", "choose"])) {
    return pick([
      "Khalid Al-harbi isn't just a cyber security expert — he's an active Security Researcher at The Hackers One 🌍, with 30+ verified credentials on Credly and 3 tracks from Coventry University UK. What sets him apart: dual practical experience (security + design + management) across 7 leading Saudi companies. When you hire him, you get field-tested solutions, not theoretical advice. 🏆 WhatsApp: +966575015019 for free consultation!",
      "Why Khalid? 🤔 Because he combines 3 rare qualities: (1) accredited UK academic education from Coventry, (2) practical experience in 7 companies including STC and Al-Jibal, (3) active security researcher at The Hackers One. This means: academic depth + field experience + awareness of latest threats. He doesn't claim — he proves with Credly-verified credentials. 🛡️ Book your free consultation: +966575015019",
    ]);
  }
  if (has(["service", "services", "package"])) {
    return pick([
      "I offer 7 cyber security packages for every business size 🛡️:\n🔹 Essential — $1,500\n🔹 Penetration Testing — $2,500\n🔹 Enterprise Cisco — $3,500\n🔹 Web Security — $800\n🔹 Incident Response — $1,200\n🔹 Compliance — $600\n🔹 Full App Dev — $2,500+\n\nWhich interests you? Tell me about your business and I'll recommend the best fit 👍",
      "7 security packages + 6 design services 🎨. Most popular: \"Penetration Testing\" ($2,500) — finds your vulnerabilities before attackers. For websites: \"Web Security\" ($800). For enterprises: \"Enterprise Cisco\" ($3,500). All customizable. 📞 WhatsApp +966575015019 for free consultation!",
    ]);
  }
  if (has(["price", "cost", "how much"])) {
    return pick([
      "Prices range $600-$3,500 💰:\n• Compliance — $600 (most affordable)\n• Web Security — $800\n• Incident Response — $1,200\n• Essential — $1,500 (most popular ⚡)\n• Pen Testing — $2,500\n• App Dev — $2,500+\n• Enterprise Cisco — $3,500\n\nAll customizable. WhatsApp +966575015019 for a tailored quote!",
      "Prices are competitive because they reflect real experience 📊. Essential ($1,500) includes full assessment + entry point security + pfSense + vulnerability report — excellent value. I also offer free consultation to assess your actual needs before any contract. 🤝 WhatsApp: +966575015019",
    ]);
  }
  if (has(["credential", "cert", "qualification"])) {
    return pick([
      "30+ verified credentials 🎓:\n🇬🇧 Coventry University — 3 tracks + 15 courses\n🇬🇧 CPD UK — 250 hours\n🇺🇸 IBM SkillsBuild — cert + 8 badges\n🇺🇸 Cisco — 2 badges (Network Tech + Ethical Hacker)\n🇺🇸 OPSWAT — Critical Infrastructure\n🇮🇪 Alison — Cyber Security Essentials\n\n✅ All verifiable on Credly. Verify before you contract! 🔍",
      "30+ verified credentials, all on Credly 🏆. CPD UK (250 hrs), IBM SkillsBuild + 8 badges (Cloud, GRC, Incident Response, SecOps, S&N Security, Vuln Mgmt, IT Fundamentals), Cisco (Network Tech + Ethical Hacker), OPSWAT ICIP, 3 Coventry University tracks. 🎓 Verify: credly.com/users/khalid-mohammed-alharbi",
    ]);
  }
  if (has(["experience", "work", "job"])) {
    return pick([
      "Khalid's career is uniquely diverse 💼 — 7 roles across sectors:\n1️⃣ Security Researcher — The Hackers One (current 🟢)\n2️⃣ Project Supervisor — Al-Mirjan\n3️⃣ Designer/Developer — Al-Jibal Economic\n4️⃣ Accounts Manager — STC\n5️⃣ Site Assistant Manager — Supportive Services\n6️⃣ Lab Technician — Al-Azaz\n7️⃣ Lab Manager — Al-Osaimi Engineering\n\nThis diversity means: he understands your business from admin + technical + security angles. 🎯",
    ]);
  }
  if (has(["design", "logo", "brand", "3d"])) {
    return pick([
      "6 creative design services 🎨:\n🖌️ Logos — wordmarks/symbol/combination\n🎨 Visual Identity — colors + fonts + guidelines\n📢 Ad Design — Amazon style + social media\n🧊 3D Models — products, jewelry, fashion\n📱 UI/UX — mobile + web + dashboards\n✨ Social Media — posts + stories + covers\n\nShare your idea and I'll bring it to life! ✨ WhatsApp: +966575015019",
    ]);
  }
  if (has(["contact", "whatsapp", "email"])) {
    return pick([
      "Contact Khalid directly 🤝:\n📱 WhatsApp: +966 57 501 5019\n📧 Email: khalid-alharbi@zohomail.sa\n🌍 Location: Saudi Arabia — Jeddah\n⏰ Responds within 24 hours\n\n💬 Fastest: WhatsApp (instant reply during work hours)\n📧 Official: Email (full documentation)\n\nReady to protect your business? Contact now for free security consultation! 🛡️",
    ]);
  }
  if (has(["portfolio", "project", "work"])) {
    return pick([
      "7 real projects live on the internet 🚀:\n🎬 Netflix Clone — kmhflix.netlify.app\n🛒 Amazon Clone — full e-commerce\n📸 Instagram Clone — bilingual social app\n💬 WhatsApp Clone — real-time chat\n🚗 Haraj — Saudi classifieds (20+ categories)\n🚙 Uber Clone — tracking + booking\n🏨 Ritz-Carlton Jeddah — hotel-ritz.vercel.app (dashboard + bookings)\n\nAll built with modern tech: React, Next.js, TypeScript, PWA. Try them! 🎯",
    ]);
  }
  if (has(["hello", "hi", "hey"])) {
    return pick([
      "Welcome! 👋🌟\nI'm Khalid Al-harbi's assistant — Cyber Security Expert.\n\nHow can I help? Ask about:\n🛡️ Services (7 packages)\n💰 Prices\n🎓 Credentials (30+ certs)\n💼 Experience (7 jobs)\n🎨 Designs (6 services)\n🚀 Projects (7 live)\n📞 Contact\n\nOr tell me about your business and I'll recommend the right service 👍",
      "Hello! 🤝\nHappy to help with cyber security and design.\n\nQuick question: Are you looking to protect your website? Or need a new design? Or a security consultation?\n\nOr type your question directly and I'll respond instantly 💬\n(Direct contact: WhatsApp +966575015019)",
    ]);
  }
  if (has(["thanks", "thank"])) {
    return pick([
      "You're welcome! 🤝 Happy to help. Any other question, I'm here.\nDirect contact: WhatsApp +966575015019 📱\nAlways ready to serve you! 🛡️",
      "No problem! 🌟 Wishing you success in your business.\nFeel free to return anytime you need security or design help.\nWhatsApp: +966575015019 💪",
    ]);
  }
  return pick([
    "Great question! 🤔\nTo help you better, tell me:\n• What's your business? (store/company/personal site)\n• What's your goal? (protection/design/consultation)\n\nOr contact Khalid directly: WhatsApp +966575015019 📱\nOr ask me about: Services, Prices, Credentials, Projects, Designs",
    "I'd love to help! 💪\nI have comprehensive info about Khalid's services. Try asking specifically:\n• \"What services do you offer?\"\n• \"How much is pen testing?\"\n• \"Show me your projects\"\n• \"How do I contact you?\"\n\nOr message Khalid directly: WhatsApp +966575015019 — responds within 24 hours 🤝",
  ]);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const message: string | undefined = body?.message;
    const sessionId: string = body?.sessionId || "default";
    const lang: "ar" | "en" = body?.lang === "en" ? "en" : "ar";

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: lang === "en" ? "Message is required." : "الرسالة مطلوبة." },
        { status: 400 }
      );
    }

    let history = conversationStore.get(sessionId);
    if (!history) {
      // Prefix system prompt with a language instruction
      const langInstruction =
        lang === "en"
          ? `\n\nIMPORTANT: Always respond in English unless the user writes in Arabic.`
          : `\n\nمهم: أجب دائماً باللغة العربية الفصحى المبسطة.`;
      history = [
        { role: "assistant", content: SYSTEM_PROMPT + langInstruction },
      ];
      conversationStore.set(sessionId, history);
    }

    history.push({ role: "user", content: message });

    if (history.length > MAX_HISTORY + 1) {
      history.splice(1, history.length - (MAX_HISTORY + 1));
    }

    let reply: string;
    try {
      const zai = await createZAI();
      const completion = await zai.chat.completions.create({
        messages: history,
        thinking: { type: "disabled" },
      });
      reply =
        completion.choices?.[0]?.message?.content?.trim() ||
        "عذراً، لم أتمكن من توليد رد. حاول مرة أخرى.";
    } catch {
      // Offline fallback — smart keyword-based responses (z.ai API not reachable on Vercel)
      reply = getOfflineReply(message, lang === "ar");
    }

    history.push({ role: "assistant", content: reply });

    return NextResponse.json({ reply, sessionId });
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("[/api/chat] error:", errMsg);
    return NextResponse.json(
      {
        error: "حدث خطأ غير متوقع أثناء معالجة الرسالة.",
        reply:
          "عذراً، واجهت مشكلة تقنية مؤقتة. 🛠️ يرجى المحاولة مرة أخرى بعد لحظات.",
        debug: errMsg,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "/api/chat",
    method: "POST",
  });
}
