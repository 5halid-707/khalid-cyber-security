/**
 * Simple in-memory rate limiter for API routes.
 * Blocks IPs that send too many requests (potential attackers).
 */

const REQUESTS = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS = 30; // max requests per window
const WINDOW_MS = 60 * 1000; // 1 minute window
const BLOCK_MS = 5 * 60 * 1000; // block for 5 minutes

const BLOCKED_IPS = new Map<string, number>(); // IP → block expiry timestamp

/**
 * Check if an IP is allowed to make a request.
 * Returns { allowed: boolean, retryAfter?: number }
 */
export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();

  // Check if IP is blocked
  const blockExpiry = BLOCKED_IPS.get(ip);
  if (blockExpiry && blockExpiry > now) {
    return { allowed: false, retryAfter: Math.ceil((blockExpiry - now) / 1000) };
  }
  if (blockExpiry && blockExpiry <= now) {
    BLOCKED_IPS.delete(ip);
  }

  // Get or create request record
  let record = REQUESTS.get(ip);
  if (!record || record.resetTime < now) {
    record = { count: 0, resetTime: now + WINDOW_MS };
    REQUESTS.get(ip);
  }

  record.count++;

  if (record.count > MAX_REQUESTS) {
    // Block this IP
    BLOCKED_IPS.set(ip, now + BLOCK_MS);
    console.warn(`🚫 IP ${ip} blocked for ${BLOCK_MS / 1000}s (rate limit exceeded)`);
    return { allowed: false, retryAfter: BLOCK_MS / 1000 };
  }

  REQUESTS.set(ip, record);
  return { allowed: true };
}

/**
 * Get client IP from request headers.
 */
export function getClientIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");
  return forwarded?.split(",")[0] || realIP || "unknown";
}

/**
 * Manually block an IP (for suspected attackers).
 */
export function blockIP(ip: string, durationMs: number = BLOCK_MS): void {
  BLOCKED_IPS.set(ip, Date.now() + durationMs);
  console.warn(`🚫 IP ${ip} manually blocked for ${durationMs / 1000}s`);
}

/**
 * Check if an IP is currently blocked.
 */
export function isBlocked(ip: string): boolean {
  const expiry = BLOCKED_IPS.get(ip);
  if (!expiry) return false;
  if (expiry <= Date.now()) {
    BLOCKED_IPS.delete(ip);
    return false;
  }
  return true;
}
