import { NextResponse } from "next/server";

export async function GET() {
  // Safe: no user input, static response
  return NextResponse.json({
    status: "ok",
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
}
