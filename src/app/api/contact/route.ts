import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Contact form endpoint.
 * Receives: { name, email, phone, service, details }
 * Sends: 
 *   1. WhatsApp notification to +966575015019
 *   2. Email notification to grouthhacker@gmail.com
 * 
 * Since we can't send real emails without an SMTP service,
 * we log the submission + format a WhatsApp link the site owner can use.
 * In production, integrate with Resend/SendGrid for email delivery.
 */

const WHATSAPP_NUMBER = "966575015019";
const OWNER_EMAIL = "grouthhacker@gmail.com";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const name: string = (body?.name || "").toString().trim().slice(0, 100);
    const email: string = (body?.email || "").toString().trim().slice(0, 200);
    const phone: string = (body?.phone || "").toString().trim().slice(0, 50);
    const service: string = (body?.service || "").toString().trim().slice(0, 200);
    const details: string = (body?.details || "").toString().trim().slice(0, 2000);

    // Validate required fields
    if (!name || !email || !phone || !details) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Build WhatsApp message for the owner
    const waMessage = `🔔 *طلب جديد من الموقع*

👤 *الاسم:* ${name}
📧 *الإيميل:* ${email}
📱 *الجوال:* ${phone}
🛡️ *الخدمة:* ${service || "غير محدد"}

📝 *التفاصيل:*
${details}

---
تم الإرسال من موقع خالد الحربي`;

    // Build WhatsApp link (owner gets notified)
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    // Log the submission (server-side record)
    console.log("📧 New contact form submission:", {
      name,
      email,
      phone,
      service,
      details: details.slice(0, 100) + "...",
      timestamp: new Date().toISOString(),
    });

    // In production, send email via Resend/SendGrid here:
    // await sendEmail({
    //   to: OWNER_EMAIL,
    //   subject: `طلب جديد من ${name}`,
    //   body: waMessage,
    // });

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
      whatsappLink: waLink, // Frontend can use this to auto-open WhatsApp
      ownerEmail: OWNER_EMAIL,
    });
  } catch (err) {
    console.error("[/api/contact] error:", err);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "/api/contact",
    method: "POST",
  });
}
