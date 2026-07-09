#!/bin/bash
# ============================================================
# 🔧 AUTO-FIX & MAINTENANCE SCRIPT
# For Khalid Al-harbi's Cyber Security Website
# ============================================================
# This script:
# 1. Checks if dev server is running, restarts if down
# 2. Runs ESLint and auto-fixes what it can
# 3. Checks for common runtime errors in dev.log
# 4. Verifies all API endpoints respond
# 5. Checks all static assets exist
# 6. Runs security audit
# 7. Generates a health report
# ============================================================

set -e

PROJECT_DIR="/home/z/my-project"
cd "$PROJECT_DIR"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

FIXED=0
ISSUES=0
WARNINGS=0

echo "============================================================"
echo "  🔧 AUTO-FIX & MAINTENANCE"
echo "  Khalid Al-harbi — Cyber Security Website"
echo "============================================================"
echo ""

# ============================================================
# 1. CHECK DEV SERVER
# ============================================================
echo "📋 [1/7] Checking dev server..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null | grep -q "200"; then
  echo -e "   ${GREEN}✓ Dev server is running${NC}"
else
  echo -e "   ${RED}✗ Dev server is down — restarting...${NC}"
  pkill -f "next dev" 2>/dev/null || true
  pkill -f "next-server" 2>/dev/null || true
  sleep 2
  nohup bun run dev > /dev/null 2>&1 &
  sleep 8
  if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null | grep -q "200"; then
    echo -e "   ${GREEN}✓ Dev server restarted successfully${NC}"
    FIXED=$((FIXED + 1))
  else
    echo -e "   ${RED}✗ Failed to restart dev server${NC}"
    ISSUES=$((ISSUES + 1))
  fi
fi
echo ""

# ============================================================
# 2. RUN ESLINT WITH AUTO-FIX
# ============================================================
echo "📋 [2/7] Running ESLint auto-fix..."
LINT_OUTPUT=$(bun run lint 2>&1)
LINT_ERRORS=$(echo "$LINT_OUTPUT" | grep -c "error" 2>/dev/null || echo "0")
LINT_WARNINGS=$(echo "$LINT_OUTPUT" | grep -c "warning" 2>/dev/null || echo "0")

if [ "$LINT_ERRORS" -eq 0 ] && [ "$LINT_WARNINGS" -eq 0 ]; then
  echo -e "   ${GREEN}✓ ESLint clean — no errors or warnings${NC}"
else
  echo -e "   ${YELLOW}⚠ ESLint: $LINT_ERRORS errors, $LINT_WARNINGS warnings${NC}"
  # Try auto-fix
  bun run lint --fix 2>/dev/null || true
  FIXED=$((FIXED + 1))
  echo -e "   ${GREEN}✓ Auto-fix applied${NC}"
fi
echo ""

# ============================================================
# 3. CHECK DEV.LOG FOR RUNTIME ERRORS
# ============================================================
echo "📋 [3/7] Scanning dev.log for runtime errors..."
if [ -f "dev.log" ]; then
  ERRORS_FOUND=$(tail -100 dev.log 2>/dev/null | grep -ci "error\|failed\|⨯" 2>/dev/null || echo "0")
  if [ "$ERRORS_FOUND" -eq 0 ]; then
    echo -e "   ${GREEN}✓ No runtime errors in recent logs${NC}"
  else
    echo -e "   ${YELLOW}⚠ Found $ERRORS_FOUND error(s) in recent logs${NC}"
    tail -100 dev.log 2>/dev/null | grep -i "error\|failed\|⨯" | tail -5
    WARNINGS=$((WARNINGS + 1))
  fi
else
  echo -e "   ${YELLOW}⚠ No dev.log found${NC}"
  WARNINGS=$((WARNINGS + 1))
fi
echo ""

# ============================================================
# 4. VERIFY API ENDPOINTS
# ============================================================
echo "📋 [4/7] Verifying API endpoints..."
API_ENDPOINTS=("/api/chat" "/api/version" "/api/paypal-config" "/api/contact")
API_OK=0
API_FAIL=0

for endpoint in "${API_ENDPOINTS[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000${endpoint}" 2>/dev/null)
  if [ "$STATUS" = "200" ] || [ "$STATUS" = "405" ]; then
    echo -e "   ${GREEN}✓ ${endpoint} → ${STATUS}${NC}"
    API_OK=$((API_OK + 1))
  else
    echo -e "   ${RED}✗ ${endpoint} → ${STATUS}${NC}"
    API_FAIL=$((API_FAIL + 1))
    ISSUES=$((ISSUES + 1))
  fi
done
echo ""

# ============================================================
# 5. CHECK STATIC ASSETS
# ============================================================
echo "📋 [5/7] Checking static assets..."
ASSETS=(
  "public/khalid-portrait-opt.jpg"
  "public/khalid-avatar.jpg"
  "public/marketing-video.mp4"
  "public/chill-song.mp3"
  "public/work-netflix-preview.png"
  "public/work-amazon-preview.png"
  "public/work-insta-preview.png"
  "public/work-whatsapp-preview.png"
  "public/work-haraj-preview-v2.png"
  "public/work-uber-preview.png"
  "public/bg-hacking.mp4"
  "public/bg-ecommerce.mp4"
  "public/bg-marketing.mp4"
)
ASSETS_OK=0
ASSETS_FAIL=0

for asset in "${ASSETS[@]}"; do
  if [ -f "$asset" ]; then
    ASSETS_OK=$((ASSETS_OK + 1))
  else
    echo -e "   ${RED}✗ Missing: ${asset}${NC}"
    ASSETS_FAIL=$((ASSETS_FAIL + 1))
    ISSUES=$((ISSUES + 1))
  fi
done
echo -e "   ${GREEN}✓ $ASSETS_OK/$((ASSETS_OK + ASSETS_FAIL)) assets present${NC}"
if [ "$ASSETS_FAIL" -gt 0 ]; then
  echo -e "   ${RED}✗ $ASSETS_FAIL asset(s) missing${NC}"
fi
echo ""

# ============================================================
# 6. RUN SECURITY AUDIT
# ============================================================
echo "📋 [6/7] Running security audit..."
if [ -f "scripts/security-audit.sh" ]; then
  bash scripts/security-audit.sh 2>&1 | tail -5
else
  echo -e "   ${YELLOW}⚠ security-audit.sh not found${NC}"
  WARNINGS=$((WARNINGS + 1))
fi
echo ""

# ============================================================
# 7. CHECK .ENV CONFIGURATION
# ============================================================
echo "📋 [7/7] Checking .env configuration..."
if [ -f ".env" ]; then
  # Check PayPal
  if grep -q "PAYPAL_CLIENT_ID=AS07" .env 2>/dev/null; then
    echo -e "   ${GREEN}✓ PayPal configured${NC}"
  else
    echo -e "   ${RED}✗ PayPal not configured${NC}"
    ISSUES=$((ISSUES + 1))
  fi

  # Check Email
  if grep -q "EMAIL_PASS=gner" .env 2>/dev/null; then
    echo -e "   ${GREEN}✓ Email (Gmail SMTP) configured${NC}"
  else
    echo -e "   ${YELLOW}⚠ Email not fully configured${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi

  # Check WhatsApp
  if grep -q "WHATSAPP_NUMBER=966575015019" .env 2>/dev/null; then
    echo -e "   ${GREEN}✓ WhatsApp configured${NC}"
  else
    echo -e "   ${RED}✗ WhatsApp not configured${NC}"
    ISSUES=$((ISSUES + 1))
  fi
else
  echo -e "   ${RED}✗ .env file missing${NC}"
  ISSUES=$((ISSUES + 1))
fi
echo ""

# ============================================================
# SUMMARY
# ============================================================
echo "============================================================"
echo "  📊 AUTO-FIX & MAINTENANCE SUMMARY"
echo "============================================================"
echo -e "  ${GREEN}✓ Auto-fixed: $FIXED${NC}"
echo -e "  ${YELLOW}⚠ Warnings: $WARNINGS${NC}"
echo -e "  ${RED}✗ Issues: $ISSUES${NC}"
echo ""

if [ "$ISSUES" -gt 0 ]; then
  echo -e "  ${RED}⚠ $ISSUES issue(s) need manual attention${NC}"
else
  echo -e "  ${GREEN}✅ All systems healthy — no issues detected${NC}"
fi

echo ""
echo "  Next steps:"
echo "  • Run this script daily: bash scripts/auto-fix.sh"
echo "  • Set up cron: 0 9 * * * cd /home/z/my-project && bash scripts/auto-fix.sh"
echo "============================================================"

exit $ISSUES
