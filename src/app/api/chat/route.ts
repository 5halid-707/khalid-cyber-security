import { NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `أنت مساعد مبيعات وتسويق محترف تعمل في وكالة "Elite Tech Agency". مهمتك هي الإجابة على استفسارات العملاء، تسويق خدماتنا، وإقناعهم بالشراء بلغة عربية فصحى مبسطة وجذابة.

الوكالة تقدم 3 خدمات رئيسية:

1. الأمن السيبراني: اختبار اختراق، هندسة شبكات (pfSense/Cisco)، حماية من الاختراق.
   - الباقة الاقتصادية (مفتوحة المصدر) تبدأ من $1500 وصيانة $100 شهرياً.
   - الباقة المؤسسية (Cisco) $3500 وصيانة $250 شهرياً.

2. برمجة التطبيقات: تطبيقات كاشير (POS)، قواعد بيانات، متاجر إلكترونية (WordPress/Shopify).

3. التسويق والتصميم: تصميم إعلانات احترافية (أسلوب أمازون)، تصميم مودلز 3D (عبايات، ذهب، شنط)، ومونتاج فيديو.

كن ودوداً، استخدم الإيموجي المناسبة، وعندما يبدو العميل مهتماً، وجهه للتواصل عبر واتساب لإتمام الطلب. اجعل إجاباتك مختصرة ومفيدة (3-5 أسطر عادة).`;

// Keep a short in-memory conversation context per session (server-side only).
// For a production app, persist per session in a database.
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

    // Build history
    let history = conversationStore.get(sessionId);
    if (!history) {
      history = [{ role: "assistant", content: SYSTEM_PROMPT }];
      conversationStore.set(sessionId, history);
    }

    history.push({ role: "user", content: message });

    // Trim old messages but keep the system prompt at index 0
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
