import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

/**
 * Contact form endpoint.
 * Receives: { name, email, phone, service, details }
 * Sends:
 *   1. Email notification to grouthhacker@gmail.com (via Gmail SMTP)
 *   2. Returns WhatsApp link for auto-open
 *
 * === SETUP ===
 * 1. Go to https://myaccount.google.com/security
 * 2. Enable 2-Step Verification
 * 3. Generate an "App Password" for Mail
 * 4. Put it in .env as EMAIL_PASS (16 chars, no spaces)
 */

const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || "966575015019";
const OWNER_EMAIL = process.env.EMAIL_TO || "grouthhacker@gmail.com";
const FROM_EMAIL = process.env.EMAIL_FROM || "grouthhacker@gmail.com";
const EMAIL_PASS = process.env.EMAIL_PASS || "";

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

    // Build WhatsApp message
    const waMessage = `🔔 *طلب جديد من الموقع*

👤 *الاسم:* ${name}
📧 *الإيميل:* ${email}
📱 *الجوال:* ${phone}
🛡️ *الخدمة:* ${service || "غير محدد"}

📝 *التفاصيل:*
${details}

---
تم الإرسال من موقع خبير الأمن السيبراني`;

    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    // === SEND EMAIL ===
    let emailSent = false;
    let emailError = "";

    if (EMAIL_PASS && EMAIL_PASS !== "xxxx xxxx xxxx xxxx") {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: FROM_EMAIL,
            pass: EMAIL_PASS,
          },
        });

        const htmlBody = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0d1117; color: #e6edf3; border-radius: 12px; overflow: hidden; border: 1px solid #1f2937;">
            <div style="background: #161b22; padding: 20px; border-bottom: 2px solid #00ffcc;">
              <h2 style="margin: 0; color: #00ffcc; font-size: 18px;">🔔 طلب جديد من الموقع</h2>
              <p style="margin: 5px 0 0; color: #6b7280; font-size: 12px;">${new Date().toLocaleString("ar-SA")}</p>
            </div>
            <div style="padding: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #6b7280; width: 100px;">👤 الاسم:</td><td style="padding: 8px 0; color: #fff; font-weight: bold;">${name}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;">📧 الإيميل:</td><td style="padding: 8px 0; color: #00a8e8;">${email}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;">📱 الجوال:</td><td style="padding: 8px 0; color: #25D366;">${phone}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b7280;">🛡️ الخدمة:</td><td style="padding: 8px 0; color: #ff00cc;">${service || "غير محدد"}</td></tr>
              </table>
              <div style="margin-top: 16px; padding: 12px; background: #05080f; border-radius: 8px; border: 1px solid #1f2937;">
                <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px;">📝 التفاصيل:</p>
                <p style="margin: 0; color: #e6edf3; line-height: 1.6;">${details}</p>
              </div>
            </div>
            <div style="padding: 12px 20px; background: #161b22; border-top: 1px solid #1f2937; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 11px;">تم الإرسال من موقع خبير الأمن السيبراني — خالد الحربي</p>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"موقع خالد الحربي" <${FROM_EMAIL}>`,
          to: OWNER_EMAIL,
          subject: `🔔 طلب جديد من ${name} — ${service || "خدمة مخصصة"}`,
          text: waMessage,
          html: htmlBody,
          replyTo: email,
        });

        emailSent = true;
        console.log("✅ Email sent successfully to", OWNER_EMAIL);
      } catch (mailErr: any) {
        emailError = mailErr.message;
        console.error("❌ Email sending failed:", emailError);
      }
    } else {
      console.log("⚠️ EMAIL_PASS not configured — skipping email. Set it in .env");
    }

    // Log the submission
    console.log("📧 Contact form submission:", {
      name,
      email,
      phone,
      service,
      emailSent,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Contact form submitted",
      whatsappLink: waLink,
      emailSent,
      emailError: emailError || undefined,
      note:
        !emailSent && !EMAIL_PASS
          ? "Email not configured. Set EMAIL_PASS in .env to receive emails."
          : undefined,
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
    emailConfigured:
      !!EMAIL_PASS && EMAIL_PASS !== "xxxx xxxx xxxx xxxx",
  });
}
