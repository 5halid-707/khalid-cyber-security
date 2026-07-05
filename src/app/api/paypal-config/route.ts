import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Returns the PayPal Client ID + mode to the frontend.
 * The Client ID is PayPal's PUBLIC identifier (safe to expose).
 * The Client Secret stays server-side only and is NEVER returned here.
 */
export async function GET() {
  return NextResponse.json({
    clientId: process.env.PAYPAL_CLIENT_ID || "",
    mode: process.env.PAYPAL_MODE || "sandbox",
    enabled: !!process.env.PAYPAL_CLIENT_ID,
  });
}
