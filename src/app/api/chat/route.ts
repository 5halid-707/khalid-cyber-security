import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `أنت المساعد الذكي الشخصي للمهندس خالد محمد الحربي — مهندس أمن سيبراني معتمد. تعمل على موقعه الإلكتروني للرد على استفسارات العملاء وتسويق خدماته وإقناعهم بالتعامل معه بلغة عربية فصحى مبسطة وجذابة.

=== نبذة عن م. خالد الحربي ===
- مهندس أمن سيبراني متخصص.
- حاصل على شهادة CPD المعتمدة من المملكة المتحدة (The CPD Certification Service) بعد إتمام 250 ساعة تدريب متخصص.
- تدّرب عبر منصات معتمدة: Alison و Cisco و TryHackMe.
- أكمل دورة "Cyber Security Essentials" و "Networking Security Engineer Course".
- مقرّه المملكة العربية السعودية، ويقدّم خدماته محلياً وعن بُعد.

=== خبراته الأساسية ===
1. أساسيات الأمن السيبراني ومبادئه وممارساته.
2. كشف ثغرات الأنظمة واختبار الاختراق (Penetration Testing).
3. حماية الشبكات والأجهزة (pfSense / Cisco).
4. تأمين المواقع والتطبيقات الإلكترونية (OWASP Top 10).
5. الحماية من البرمجيات الخبيثة (Malware).
6. الاستجابة الفورية للتهديدات والحوادث الأمنية.
7. حماية المعلومات السرية والامتثال (ISO/PCI-DSS).

=== المنتجات والباقات المعروضة على الموقع ===
1. الباقة الأساسية للحماية — $1,500 + $100/شهر صيانة. تقييم أمني شامل، تأمين نقاط الدخول، إعداد pfSense، تقرير ثغرات. (الأكثر طلباً)
2. اختبار الاختراق الاحترافي — $2,500 لكل حملة. محاكاة هجمات حقيقية، كشف OWASP Top 10، تقرير فني وتنفيذي، إعادة اختبار بعد الإصلاح.
3. الباقة المؤسسية (Cisco) — $3,500 + $250/شهر صيانة. هندسة شبكة Cisco، عزل DMZ، أنظمة IDS/IPS، مراقبة 24/7.
4. تأمين المواقع الإلكترونية — $800 لكل موقع. فحص ثغرات الويب، حماية SQL Injection و XSS، WAF و SSL، تدقيق الكود.
5. الاستجابة للحوادث — $1,200 لكل حادثة. استجابة طارئة خلال ساعات، احتواء وعزل، تحقيق جنائي رقمي، خطة استعادة.
6. الامتثال والتدريب — $600 لكل برنامج. تقييم ISO/PCI-DSS، سياسات أمنية، تدريب الفريق، متابعة دورية.

ملاحظة: جميع الأسعار تقديرية وقابلة للتخصيص حسب حجم المنشأة.

=== تعليمات الرد ===
- كن ودوداً ومهنياً، استخدم الإيموجي المناسبة باعتدال.
- اجعل إجاباتك مختصرة ومفيدة (3-6 أسطر عادةً).
- عند سؤال العميل عن الخدمات أو الأسعار، قدّم الباقة المناسبة لاحتياجه.
- عندما يبدو العميل مهتماً، وجّهه للتواصل عبر واتساب لإتمام الطلب والحصول على استشارة مجانية وعرض سعر مخصص.
- إذا سُئلت عن المؤهلات، اذكر شهادة CPD المعتمدة و250 ساعة تدريب والمنصات (Alison/Cisco/TryHackMe).`;

// In-memory conversation store per session (server-side only).
const conversationStore = new Map<string, { role: string; content: string }[]>();
const MAX_HISTORY = 10;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const message: string | undefined = body?.message;
    const sessionId: string = body?.sessionId || "default";

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "الرسالة مطلوبة." },
        { status: 400 }
      );
    }

    let history = conversationStore.get(sessionId);
    if (!history) {
      history = [{ role: "assistant", content: SYSTEM_PROMPT }];
      conversationStore.set(sessionId, history);
    }

    history.push({ role: "user", content: message });

    if (history.length > MAX_HISTORY + 1) {
      history.splice(1, history.length - (MAX_HISTORY + 1));
    }

    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: history,
      thinking: { type: "disabled" },
    });

    const reply: string =
      completion.choices?.[0]?.message?.content?.trim() ||
      "عذراً، لم أتمكن من توليد رد. حاول مرة أخرى.";

    history.push({ role: "assistant", content: reply });

    return NextResponse.json({ reply, sessionId });
  } catch (err) {
    console.error("[/api/chat] error:", err);
    return NextResponse.json(
      {
        error: "حدث خطأ غير متوقع أثناء معالجة الرسالة.",
        reply:
          "عذراً، واجهت مشكلة تقنية مؤقتة. 🛠️ يرجى المحاولة مرة أخرى بعد لحظات.",
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
