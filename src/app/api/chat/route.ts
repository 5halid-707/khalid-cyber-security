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
- ⚠️ مهم — الدقة والشفافية: ExpertTracks برامج تدريبية عالية المستوى من Coventry University عبر FutureLearn — ليست شهادة جامعية تقليدية. لا تدّعِ "خبرة معتمدة" — استخدم "متخصص معتمد" أو "حاصل على مسارات تدريبية متقدمة".
- أكّد دائماً أن الشهادات موثّقة إلكترونياً على Credly ويمكن للعميل التحقق منها بنفسه.`;

// In-memory conversation store per session (server-side only).
const conversationStore = new Map<string, { role: string; content: string }[]>();
const MAX_HISTORY = 10;

// Offline fallback — smart keyword-based responses when z.ai API is unreachable
function getOfflineReply(message: string, isAr: boolean): string {
  const msg = message.toLowerCase();
  const has = (kw: string[]) => kw.some((k) => msg.includes(k));

  if (isAr) {
    if (has(["خدمة", "خدمات", "service"]))
      return "أقدم 7 باقات أمن سيبراني: الباقة الأساسية ($1,500)، اختبار الاختراق ($2,500)، الباقة المؤسسية Cisco ($3,500)، تأمين المواقع ($800)، الاستجابة للحوادث ($1,200)، الامتثال والتدريب ($600)، وتطوير موقع/تطبيق شامل ($2,500+). بالإضافة لـ 6 خدمات تصاميم. تواصل معي عبر واتساب +966575015019 لعرض سعر مخصص! 🛡️";
    if (has(["سعر", "أسعار", "كم", "price"]))
      return "الأسعار تبدأ من $600 للامتثال والتدريب، $800 لتأمين المواقع، $1,200 للاستجابة للحوادث، $1,500 للباقة الأساسية، $2,500 لاختبار الاختراق، $2,500+ لتطوير موقع/تطبيق، و$3,500 للباقة المؤسسية Cisco. جميع الأسعار تقديرية وقابلة للتخصيص. تواصل عبر واتساب +966575015019 💰";
    if (has(["مؤهل", "شهادة", "credly", "credential"]))
      return "أمتلك 30+ شهادة موثّقة: CPD UK (250 ساعة)، IBM SkillsBuild + 8 أوسمة، Cisco (2 أوسمة)، OPSWAT، Alison، + 3 مسارات Coventry University. كلها قابلة للتحقق على Credly. 🎓";
    if (has(["خبرة", "وظيفة", "عمل", "experience"]))
      return "أعمل حالياً باحث أمني في The Hackers One. سبق أن عملت في: شركة المرجان (مشرف مشاريع)، الجبال الاقتصادية (مصمم ومبرمج)، STC (مدير حسابات)، الخدمات المساندة (مساعد مدير موقع)، العزاز (فني مختبر)، العصيمي الهندسية (مدير مختبر). 💼";
    if (has(["تصميم", "design", "شعار", "هوية"]))
      return "أقدم 6 خدمات تصاميم: الشعارات، الهوية البصرية، الإعلانات، المودلز 3D، واجهات UI/UX، والسوشيال ميديا. تواصل عبر واتساب +966575015019 لطلب تصميمك! 🎨";
    if (has(["تواصل", "واتساب", "whatsapp", "email", "إيميل", "بريد"]))
      return "تواصل معي عبر: 📱 واتساب: +966575015019 | 📧 إيميل: khalid-alharbi@zohomail.sa | 🌍 الموقع: المملكة العربية السعودية. أرد خلال 24 ساعة! 🤝";
    if (has(["أعمال", "مشاريع", "portfolio", "project"]))
      return "أنجزت 7 مشاريع حقيقية: Netflix (kmhflix.netlify.app)، Amazon، Instagram، WhatsApp، Haraj، Uber، وفندق Ritz-Carlton Jeddah (hotel-ritz.vercel.app). كلها معاينة مباشرة! 🚀";
    if (has(["مرحبا", "السلام", "هلا", "hello", "hi", "سلام"]))
      return "مرحباً بك! 👋 أنا مساعد خالد الحربي — خبير الأمن السيبراني. كيف أقدر أساعدك؟ اسألني عن: الخدمات، الأسعار، المؤهلات، الأعمال، أو التصاميم. 🛡️";
    return "شكراً لسؤالك! 🤝 أنا مساعد خالد الحربي — خبير أمن سيبراني. يمكنني مساعدتك في: الخدمات (7 باقات)، الأسعار، المؤهلات (30+ شهادة)، الأعمال (7 مشاريع)، أو التصاميم (6 خدمات). تواصل مباشرة عبر واتساب +966575015019 أو إيميل khalid-alharbi@zohomail.sa";
  } else {
    if (has(["service", "services"]))
      return "I offer 7 cyber security packages: Essential ($1,500), Penetration Testing ($2,500), Enterprise Cisco ($3,500), Web Security ($800), Incident Response ($1,200), Compliance ($600), Full App Dev ($2,500+). Plus 6 design services. Contact via WhatsApp +966575015019! 🛡️";
    if (has(["price", "cost", "how much"]))
      return "Prices start from $600 (Compliance), $800 (Web Security), $1,200 (Incident Response), $1,500 (Essential), $2,500 (Pen Testing), $2,500+ (App Dev), $3,500 (Enterprise Cisco). All customizable. WhatsApp +966575015019 💰";
    if (has(["credential", "cert", "qualification"]))
      return "I have 30+ verified credentials: CPD UK (250 hrs), IBM SkillsBuild + 8 badges, Cisco (2 badges), OPSWAT, Alison, + 3 Coventry University tracks. All verifiable on Credly. 🎓";
    if (has(["experience", "work", "job"]))
      return "Currently Security Researcher at The Hackers One. Previously: Al-Mirjan (Project Supervisor), Al-Jibal (Designer/Developer), STC (Accounts Manager), Supportive Services, Al-Azaz (Lab Tech), Al-Osaimi (Lab Manager). 💼";
    if (has(["design", "logo", "brand"]))
      return "I offer 6 design services: Logos, Visual Identity, Ad Design, 3D Models, UI/UX, Social Media. Contact via WhatsApp +966575015019! 🎨";
    if (has(["contact", "whatsapp", "email"]))
      return "Contact me: 📱 WhatsApp: +966575015019 | 📧 Email: khalid-alharbi@zohomail.sa | 🌍 Location: Saudi Arabia. I respond within 24 hours! 🤝";
    if (has(["portfolio", "project", "work"]))
      return "I've completed 7 real projects: Netflix, Amazon, Instagram, WhatsApp, Haraj, Uber, and The Ritz-Carlton Jeddah. All live! 🚀";
    if (has(["hello", "hi", "hey"]))
      return "Hello! 👋 I'm Khalid Al-harbi's assistant — Cyber Security Expert. How can I help? Ask about: Services, Prices, Credentials, Projects, or Designs. 🛡️";
    return "Thanks for your question! 🤝 I'm Khalid Al-harbi's assistant. I can help with: Services (7 packages), Prices, Credentials (30+ certs), Projects (7 live), or Designs (6 services). Contact directly via WhatsApp +966575015019 or email khalid-alharbi@zohomail.sa";
  }
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
