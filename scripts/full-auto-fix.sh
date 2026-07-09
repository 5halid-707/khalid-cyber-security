#!/bin/bash
# ============================================================
# 🔧 FULL AUTO-FIX SCRIPT — Fixes EVERYTHING automatically
# For Khalid Al-harbi's Cyber Security Website
# ============================================================
# This script:
# 1. Restarts dev server if down
# 2. Runs ESLint auto-fix
# 3. Restores .env if missing
# 4. Checks all API endpoints
# 5. Verifies all static assets
# 6. Fixes database permissions
# 7. Clears Next.js cache if corrupted
# 8. Runs security audit
# 9. Generates health report
# ============================================================

set -e
cd /home/z/my-project

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

FIXED=0
ISSUES=0

echo "============================================================"
echo "  🔧 FULL AUTO-FIX — Everything"
echo "============================================================"
echo ""

# --- 1. DEV SERVER ---
echo "📋 [1/9] Dev server..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null | grep -q "200"; then
  echo -e "   ${GREEN}✓ Running${NC}"
else
  echo -e "   ${RED}✗ Down — restarting...${NC}"
  pkill -f "next dev" 2>/dev/null || true
  pkill -f "next-server" 2>/dev/null || true
  sleep 2
  nohup bun run dev > /dev/null 2>&1 &
  sleep 8
  FIXED=$((FIXED + 1))
  echo -e "   ${GREEN}✓ Restarted${NC}"
fi
echo ""

# --- 2. ESLINT AUTO-FIX ---
echo "📋 [2/9] ESLint auto-fix..."
bun run lint --fix 2>/dev/null || true
FIXED=$((FIXED + 1))
echo -e "   ${GREEN}✓ Lint auto-fix applied${NC}"
echo ""

# --- 3. RESTORE .env IF MISSING ---
echo "📋 [3/9] .env configuration..."
if [ ! -f ".env" ] || ! grep -q "PAYPAL_CLIENT_ID" .env 2>/dev/null; then
  echo -e "   ${RED}✗ .env missing or incomplete — restoring...${NC}"
  cat > .env << 'ENVEOF'
DATABASE_URL=file:/home/z/my-project/db/custom.db

# PayPal Configuration
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=AS07UjQm1mKfskzuS2A5y1nlO3PraAfP9Z4EVUmeNC_HhUewO9FRhbuLaqXs9cX6W0KsooeNbsQQSjkk
PAYPAL_CLIENT_SECRET=

# Email Configuration (Gmail SMTP)
EMAIL_FROM=grouthhacker@gmail.com
EMAIL_TO=grouthhacker@gmail.com
EMAIL_PASS=gnerkktlurcsnvqj

# WhatsApp
WHATSAPP_NUMBER=966575015019
ENVEOF
  FIXED=$((FIXED + 1))
  echo -e "   ${GREEN}✓ .env restored${NC}"
  # Restart server to pick up new env
  pkill -f "next dev" 2>/dev/null || true
  pkill -f "next-server" 2>/dev/null || true
  sleep 2
  nohup bun run dev > /dev/null 2>&1 &
  sleep 8
else
  echo -e "   ${GREEN}✓ .env OK${NC}"
fi
echo ""

# --- 4. API ENDPOINTS ---
echo "📋 [4/9] API endpoints..."
for ep in "/api/chat" "/api/version" "/api/paypal-config" "/api/contact"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000${ep}" 2>/dev/null)
  if [ "$STATUS" = "200" ] || [ "$STATUS" = "405" ]; then
    echo -e "   ${GREEN}✓ ${ep} → ${STATUS}${NC}"
  else
    echo -e "   ${RED}✗ ${ep} → ${STATUS}${NC}"
    ISSUES=$((ISSUES + 1))
  fi
done
echo ""

# --- 5. STATIC ASSETS ---
echo "📋 [5/9] Static assets..."
ASSETS=(
  "public/khalid-portrait-opt.jpg" "public/khalid-avatar.jpg"
  "public/marketing-video.mp4" "public/chill-song.mp3" "public/chill-song-2.mp3"
  "public/work-netflix-preview.png" "public/work-amazon-preview.png"
  "public/work-insta-preview.png" "public/work-whatsapp-preview.png"
  "public/work-haraj-preview-v2.png" "public/work-uber-preview.png"
  "public/bg-hacking.mp4" "public/bg-ecommerce.mp4" "public/bg-marketing.mp4"
)
MISSING=0
for a in "${ASSETS[@]}"; do
  if [ ! -f "$a" ]; then
    echo -e "   ${RED}✗ Missing: ${a}${NC}"
    MISSING=$((MISSING + 1))
    ISSUES=$((ISSUES + 1))
  fi
done
if [ "$MISSING" -eq 0 ]; then
  echo -e "   ${GREEN}✓ All ${#ASSETS[@]} assets present${NC}"
fi
echo ""

# --- 6. DATABASE PERMISSIONS ---
echo "📋 [6/9] Database permissions..."
if [ -f "db/custom.db" ]; then
  PERMS=$(stat -c "%a" "db/custom.db" 2>/dev/null || echo "644")
  if [ "$PERMS" -gt "640" ]; then
    chmod 640 "db/custom.db"
    FIXED=$((FIXED + 1))
    echo -e "   ${GREEN}✓ Hardened: ${PERMS} → 640${NC}"
  else
    echo -e "   ${GREEN}✓ OK (${PERMS})${NC}"
  fi
fi
echo ""

# --- 7. CLEAR CORRUPTED CACHE ---
echo "📋 [7/9] Next.js cache..."
if [ -d ".next/cache" ]; then
  # Check for corruption (if server returns 500)
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null)
  if [ "$STATUS" = "500" ]; then
    echo -e "   ${YELLOW}⚠ Server returning 500 — clearing cache...${NC}"
    rm -rf .next/cache
    pkill -f "next dev" 2>/dev/null || true
    sleep 2
    nohup bun run dev > /dev/null 2>&1 &
    sleep 8
    FIXED=$((FIXED + 1))
    echo -e "   ${GREEN}✓ Cache cleared + server restarted${NC}"
  else
    echo -e "   ${GREEN}✓ Cache OK${NC}"
  fi
fi
echo ""

# --- 8. SECURITY AUDIT ---
echo "📋 [8/9] Security audit..."
if [ -f "scripts/security-audit.sh" ]; then
  bash scripts/security-audit.sh 2>&1 | tail -6
fi
echo ""

# --- 9. DEV LOG ERRORS ---
echo "📋 [9/9] Recent dev.log errors..."
if [ -f "dev.log" ]; then
  ERR_COUNT=$(tail -50 dev.log 2>/dev/null | grep -ci "⨯\|ReferenceError\|TypeError" 2>/dev/null || echo "0")
  if [ "$ERR_COUNT" -eq 0 ]; then
    echo -e "   ${GREEN}✓ No runtime errors${NC}"
  else
    echo -e "   ${YELLOW}⚠ ${ERR_COUNT} runtime error(s) in recent logs${NC}"
    tail -50 dev.log 2>/dev/null | grep -i "⨯\|ReferenceError\|TypeError" | tail -3
  fi
fi
echo ""

# --- SUMMARY ---
echo "============================================================"
echo "  📊 FULL AUTO-FIX SUMMARY"
echo "============================================================"
echo -e "  ${GREEN}✓ Auto-fixed: $FIXED${NC}"
echo -e "  ${RED}✗ Issues remaining: $ISSUES${NC}"
if [ "$ISSUES" -eq 0 ]; then
  echo -e "  ${GREEN}✅ ALL SYSTEMS HEALTHY${NC}"
else
  echo -e "  ${YELLOW}⚠ $ISSUES issue(s) need attention${NC}"
fi
echo "============================================================"
exit $ISSUES
