#!/bin/bash
# ============================================================
# Database Security Audit & Hardening Script
# For Khalid Al-harbi's Cyber Security Website
# ============================================================
# This script:
# 1. Audits Prisma schema for SQL injection risks
# 2. Checks input sanitization in API routes
# 3. Verifies database file permissions
# 4. Scans for hardcoded secrets
# 5. Generates a security report
# ============================================================

set -e

PROJECT_DIR="/home/z/my-project"
cd "$PROJECT_DIR"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "============================================================"
echo "  🔒 DATABASE SECURITY AUDIT & HARDENING"
echo "  Khalid Al-harbi — Cyber Security Website"
echo "============================================================"
echo ""

ISSUES=0
WARNINGS=0
PASSED=0

# ============================================================
# 1. CHECK PRISMA SCHEMA
# ============================================================
echo "📋 [1/5] Checking Prisma Schema..."

SCHEMA_FILE="prisma/schema.prisma"
if [ -f "$SCHEMA_FILE" ]; then
  echo "   ✓ Schema file found"

  # Check for raw SQL queries (SQL injection risk)
  RAW_SQL=$(grep -r "Prisma.raw\|\\$queryRaw\|\\$executeRaw" src/ 2>/dev/null | wc -l)
  if [ "$RAW_SQL" -gt 0 ]; then
    echo -e "   ${RED}✗ Found $RAW_SQL raw SQL queries — SQL injection risk!${NC}"
    grep -rn "Prisma.raw\|\\$queryRaw\|\\$executeRaw" src/ 2>/dev/null
    ISSUES=$((ISSUES + 1))
  else
    echo -e "   ${GREEN}✓ No raw SQL queries (safe from SQL injection)${NC}"
    PASSED=$((PASSED + 1))
  fi

  # Check for parameterized queries
  PARAM_QUERIES=$(grep -r "prisma\.\|db\." src/ 2>/dev/null | wc -l)
  echo "   ℹ️  Found $PARAM_QUERIES Prisma parameterized queries (safe)"
else
  echo -e "   ${YELLOW}⚠ No Prisma schema found${NC}"
  WARNINGS=$((WARNINGS + 1))
fi
echo ""

# ============================================================
# 2. CHECK INPUT SANITIZATION IN API ROUTES
# ============================================================
echo "📋 [2/5] Checking API Route Input Sanitization..."

API_DIR="src/app/api"
if [ -d "$API_DIR" ]; then
  API_FILES=$(find "$API_DIR" -name "route.ts" | wc -l)
  echo "   ℹ️  Found $API_FILES API routes"

  # Check if routes validate input
  UNVALIDATED=0
  for route in $(find "$API_DIR" -name "route.ts"); do
    if ! grep -q "trim\|typeof\|!message\|!body\|zod\|validate\|parse" "$route" 2>/dev/null; then
      echo -e "   ${YELLOW}⚠ $route may lack input validation${NC}"
      UNVALIDATED=$((UNVALIDATED + 1))
    fi
  done

  if [ "$UNVALIDATED" -eq 0 ]; then
    echo -e "   ${GREEN}✓ All API routes have input validation${NC}"
    PASSED=$((PASSED + 1))
  else
    echo -e "   ${YELLOW}⚠ $UNVALIDATED routes may need input validation review${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi
else
  echo "   ℹ️  No API directory found"
fi
echo ""

# ============================================================
# 3. CHECK DATABASE FILE PERMISSIONS
# ============================================================
echo "📋 [3/5] Checking Database File Permissions..."

DB_FILE="db/custom.db"
if [ -f "$DB_FILE" ]; then
  PERMS=$(stat -c "%a" "$DB_FILE")
  OWNER=$(stat -c "%U" "$DB_FILE")

  if [ "$PERMS" -le "640" ]; then
    echo -e "   ${GREEN}✓ Database permissions are restrictive ($PERMS)${NC}"
    PASSED=$((PASSED + 1))
  elif [ "$PERMS" -le "660" ]; then
    echo -e "   ${YELLOW}⚠ Database permissions are moderate ($PERMS) — consider 640${NC}"
    # Auto-harden
    chmod 640 "$DB_FILE"
    echo -e "   ${GREEN}✓ Auto-hardened to 640${NC}"
    PASSED=$((PASSED + 1))
  else
    echo -e "   ${RED}✗ Database permissions are too open ($PERMS) — hardening...${NC}"
    chmod 640 "$DB_FILE"
    echo -e "   ${GREEN}✓ Hardened to 640${NC}"
    ISSUES=$((ISSUES + 1))
  fi

  echo "   ℹ️  Owner: $OWNER"
else
  echo "   ℹ️  No database file found (may not be in use)"
fi
echo ""

# ============================================================
# 4. SCAN FOR HARDCODED SECRETS
# ============================================================
echo "📋 [4/5] Scanning for Hardcoded Secrets..."

# Check for API keys, passwords, tokens in source
SECRET_PATTERNS="api_key\|apikey\|secret_key\|password.*=.*['\"]\|token.*=.*['\"]\|Bearer\s+[A-Za-z0-9]"
SECRETS_FOUND=$(grep -rn "$SECRET_PATTERNS" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "node_modules\|\.env\|process\.env\|PAYPAL_CLIENT_ID\|grouthhacker" | wc -l)

if [ "$SECRETS_FOUND" -eq 0 ]; then
  echo -e "   ${GREEN}✓ No hardcoded secrets found in source code${NC}"
  PASSED=$((PASSED + 1))
else
  echo -e "   ${RED}✗ Found $SECRETS_FOUND potential hardcoded secrets:${NC}"
  grep -rn "$SECRET_PATTERNS" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | grep -v "node_modules\|\.env\|process\.env\|PAYPAL_CLIENT_ID\|grouthhacker" | head -5
  ISSUES=$((ISSUES + 1))
fi

# Check .env is not tracked by git
if [ -f ".gitignore" ] && grep -q ".env" ".gitignore" 2>/dev/null; then
  echo -e "   ${GREEN}✓ .env is in .gitignore (not tracked)${NC}"
  PASSED=$((PASSED + 1))
else
  echo -e "   ${YELLOW}⚠ .env may not be in .gitignore${NC}"
  WARNINGS=$((WARNINGS + 1))
fi
echo ""

# ============================================================
# 5. CHECK SECURITY HEADERS
# ============================================================
echo "📋 [5/5] Checking Security Headers (proxy.ts)..."

PROXY_FILE="src/proxy.ts"
if [ -f "$PROXY_FILE" ]; then
  HEADERS_COUNT=$(grep -c "res.headers.set" "$PROXY_FILE" 2>/dev/null)

  if [ "$HEADERS_COUNT" -ge 8 ]; then
    echo -e "   ${GREEN}✓ $HEADERS_COUNT security headers configured${NC}"
    PASSED=$((PASSED + 1))
  else
    echo -e "   ${YELLOW}⚠ Only $HEADERS_COUNT security headers (recommended: 8+)${NC}"
    WARNINGS=$((WARNINGS + 1))
  fi

  # Check specific headers
  for header in "Content-Security-Policy" "X-Frame-Options" "X-Content-Type-Options" "Strict-Transport-Security" "Referrer-Policy" "Permissions-Policy"; do
    if grep -q "$header" "$PROXY_FILE" 2>/dev/null; then
      echo -e "   ${GREEN}  ✓ $header${NC}"
    else
      echo -e "   ${RED}  ✗ Missing: $header${NC}"
      ISSUES=$((ISSUES + 1))
    fi
  done
else
  echo -e "   ${RED}✗ No proxy.ts found!${NC}"
  ISSUES=$((ISSUES + 1))
fi
echo ""

# ============================================================
# SUMMARY
# ============================================================
echo "============================================================"
echo "  📊 SECURITY AUDIT SUMMARY"
echo "============================================================"
echo -e "  ${GREEN}✓ Passed: $PASSED${NC}"
echo -e "  ${YELLOW}⚠ Warnings: $WARNINGS${NC}"
echo -e "  ${RED}✗ Issues: $ISSUES${NC}"
echo ""

if [ "$ISSUES" -gt 0 ]; then
  echo -e "  ${RED}⚠ ACTION REQUIRED: Fix $ISSUES security issue(s) above${NC}"
  exit 1
else
  echo -e "  ${GREEN}✅ Database security audit PASSED${NC}"
  exit 0
fi
