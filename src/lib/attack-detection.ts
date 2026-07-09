/**
 * Attack pattern detection — blocks suspicious requests.
 * Scans for common attack signatures in URLs and payloads.
 */

// Patterns that indicate an attack attempt
const ATTACK_PATTERNS: RegExp[] = [
  // SQL injection
  /union\s+select/i,
  /or\s+1=1/i,
  /drop\s+table/i,
  /insert\s+into/i,
  /delete\s+from/i,
  /';.*--/i,
  /\bxp_cmdshell\b/i,

  // XSS
  /<script[^>]*>/i,
  /javascript:/i,
  /onerror\s*=/i,
  /onload\s*=/i,
  /<iframe/i,
  /document\.cookie/i,

  // Path traversal
  /\.\.\//,
  /\.\.\\/,
  /\/etc\/passwd/,
  /\/proc\/self/,

  // Command injection
  /;\s*(cat|ls|id|whoami|wget|curl|rm)\s/i,
  /\|\s*(cat|ls|id|whoami|wget|curl|rm)\s/i,
  /`.*`/,

  // SSRF
  /http:\/\/localhost/i,
  /http:\/\/127\.0\.0\.1/i,
  /http:\/\/0\.0\.0\.0/i,
  /http:\/\/metadata/i,
];

/**
 * Check if a string contains attack patterns.
 * Returns the matched pattern or null.
 */
export function detectAttack(input: string): string | null {
  for (const pattern of ATTACK_PATTERNS) {
    if (pattern.test(input)) {
      return pattern.source;
    }
  }
  return null;
}

/**
 * Check a full request for attacks.
 * Scans: URL, body, headers.
 */
export function scanRequest(req: Request, body?: string): { isAttack: boolean; pattern?: string } {
  // Scan URL
  const url = req.url || "";
  const urlAttack = detectAttack(url);
  if (urlAttack) return { isAttack: true, pattern: urlAttack };

  // Scan body
  if (body) {
    const bodyAttack = detectAttack(body);
    if (bodyAttack) return { isAttack: true, pattern: bodyAttack };
  }

  // Scan suspicious headers
  const userAgent = req.headers.get("user-agent") || "";
  const uaAttack = detectAttack(userAgent);
  if (uaAttack) return { isAttack: true, pattern: uaAttack };

  return { isAttack: false };
}
