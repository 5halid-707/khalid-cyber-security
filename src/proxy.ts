import { NextResponse, type NextRequest } from "next/server";

/**
 * Security proxy — adds protective HTTP headers to ALL responses.
 * (Replaces the deprecated middleware.ts convention in Next.js 16.)
 * Protects against: XSS, clickjacking, MIME sniffing, downgrade attacks,
 * referrer leaks, and enforces a strict Content Security Policy.
 */

// Allowed CSP origins. Uses wildcard for paypal to support sandbox + live + checkout.
const CSP_DIRECTIVES = [
  "default-src 'self'",
  // Scripts: allow inline (for Next.js hydration) + paypal SDK + cdnjs
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.paypal.com https://*.paypal.com https://cdnjs.cloudflare.com",
  // Styles: allow inline (Next.js + styled-jsx)
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  // Images: allow self + data URIs + all https (paypal uses many CDN hosts)
  "img-src 'self' data: blob: https: http:",
  // Fonts
  "font-src 'self' data: https://fonts.gstatic.com",
  // Media (video/audio)
  "media-src 'self' blob: https:",
  // Connections: allow self + ALL paypal domains (sandbox + live + api + checkout) + z.ai API (chatbot)
  "connect-src 'self' https://*.paypal.com https://*.paypalobjects.com https://*.z.ai https://internal-api.z.ai",
  // Frames: allow self + ALL paypal domains (checkout popup/iframe)
  "frame-src 'self' https://*.paypal.com https://*.paypalobjects.com",
  // Frame ancestors: allow self only (security)
  "frame-ancestors 'self'",
  // Form actions: allow self + ALL paypal domains
  "form-action 'self' https://*.paypal.com",
  // Base URI restriction
  "base-uri 'self'",
  // Object restriction (block plugins)
  "object-src 'none'",
  // Upgrade insecure requests
  "upgrade-insecure-requests",
].join("; ");

export function proxy(_req: NextRequest) {
  const res = NextResponse.next();

  // 1. Content Security Policy — prevents XSS, data injection
  res.headers.set("Content-Security-Policy", CSP_DIRECTIVES);

  // 2. X-Frame-Options — SAMEORIGIN (allows PayPal iframes from same origin)
  res.headers.set("X-Frame-Options", "SAMEORIGIN");

  // 3. X-Content-Type-Options — prevents MIME sniffing
  res.headers.set("X-Content-Type-Options", "nosniff");

  // 4. Referrer-Policy — controls referrer info sent to other sites
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // 5. Strict-Transport-Security — forces HTTPS (HSTS)
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  // 6. Permissions-Policy — disables unwanted browser features
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(self)"
  );

  // 7. X-DNS-Prefetch-Control — reduces DNS lookup time
  res.headers.set("X-DNS-Prefetch-Control", "on");

  // 8. Cross-Origin policies — modern isolation
  res.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  res.headers.set("Cross-Origin-Resource-Policy", "same-origin");

  return res;
}

export const config = {
  // Apply to all routes except static assets
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|ico|mp3)$).*)",
  ],
};
