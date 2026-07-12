# Task 46-shein-clone — SHEIN Visual Clone Update

**Agent**: main (Z.ai Code)
**Project**: `/home/z/shein-store/` (standalone Next.js 16 project)
**Goal**: Update existing KMH Fashion store to be an EXACT visual clone of SHEIN (ar.shein.com) for portfolio demonstration.

## Initial State
- The `/home/z/shein-store/` directory was missing (sandbox wiped). Cloned it back from GitHub repo `5halid-707/shein-store` (commit `4429857` from Task 45).
- Vercel project `prj_c4yczZKGdRuzBqOVNAaUnczsff65` (shein-store) still in READY state from previous deploy.
- All Task-45 files were present (28 products with picsum.photos placeholders, KMH Fashion branding).

## Work Performed

### 1. SHEIN Logo (SVG)
- `/public/shein-logo.svg` — black wordmark, custom-drawn letter paths (S-H-E-I-N) at 280×80 viewBox.
- `/public/shein-logo-white.svg` — same paths with white fill for dark backgrounds (footer).

### 2. Color Palette (exact Shein)
Updated `src/app/globals.css` `@theme` tokens:
- Primary black `#000000`
- Pink accent `#ee296d` (+ dark `#d11e5c` + light `#ff5a8a`)
- Sale red `#fa3a30`
- Background `#f6f6f6`
- Text `#222222`, muted `#767676`, border `#e5e5e5`
- Added `--color-shein-bg`, `--color-shein-red`, `--color-shein-red-dark` tokens.
- Added `marquee-rtl` keyframe for RTL scrolling announcement bar.

### 3. Real Product Images (Unsplash)
Rewrote `src/data/products.ts`:
- Defined a `PHOTOS` map with 35+ curated Unsplash photo IDs per category (women dresses/tops/pants/skirts/coats, women heels/bags, men shirts/polo/jeans/tshirt/jacket/shoes, kids, beauty, accessories, home).
- Each product now has a real category-appropriate Unsplash photo as `image` + a 5-image `images` gallery built from related same-category photos.
- Image URL pattern: `https://images.unsplash.com/photo-{ID}?w=600&h=750&fit=crop&q=80&auto=format`
- All 28 products across 6 categories updated.
- Brand changed from "KMH Fashion" → "SHEIN".
- Fixed TypeScript "image specified more than once" error by moving `image`/`images` after the `...p` spread.

### 4. Header (`src/components/site-header.tsx`)
- Replaced KMH "K" badge + "KMH Fashion" text with `<Image src="/shein-logo.svg">`.
- Search bar: pink-bordered (border-2 border-shein-pink) matching Shein style, with pink "بحث" button.
- Mobile drawer also uses SHEIN logo.
- Category nav kept: نسائي / رجالي / أطفال / تجميل / المنزل / إكسسوارات + "كل المنتجات".

### 5. Footer (`src/components/site-footer.tsx`)
- SHEIN white logo at top of main column.
- Trust bar updated: "إرجاع مجاني خلال 35 يوم" (was 14) to match Shein policy.
- Contact info kept: khalid-alharbi@zohomail.sa / WhatsApp +966 57 501 5019 / السعودية.
- **Added disclaimer row**: "⚠️ هذا الموقع للعرض فقط — تصميم وتطوير خالد الحربي. ليس متجراً حقيقياً ولا يقبل الطلبات الفعلية."
- Copyright: "© SHEIN — تصميم خالد الحربي 🇸🇦".

### 6. Announcement Bar (`src/components/announcement-bar.tsx`)
- Replaced rotating-message pattern with **scrolling marquee** (animate-marquee-rtl).
- 6 messages duplicated for seamless loop: شحن مجاني / إرجاع 35 يوم / دفع آمن / تخفيضات 70% / كود SHEIN15 / أحدث الموضة.
- Black background, pink icons + bullet separators — exactly like Shein.

### 7. Hero Carousel (`src/components/hero-carousel.tsx`)
- Replaced 4 picsum.photos banners with real Unsplash fashion photos:
  - Banner 1 (sale): woman outfit photo, pink gradient
  - Banner 2 (evening): woman dress photo, dark gradient
  - Banner 3 (men): man portrait photo, dark gradient
  - Banner 4 (beauty): beauty products photo, gold gradient
- 1200×600 wide crop for hero aspect ratio.

### 8. Product Card (`src/components/product-card.tsx`) — exact Shein style
- **Discount badge**: red `bg-shein-red` at top-LEFT (was pink at right).
- **New badge**: small black at top-right (under heart).
- **Wishlist heart**: top-right corner, smaller (h-7 w-7).
- **Title**: small gray text-xs (was text-sm black) — matches Shein's low-key title style.
- **Price**: red `text-shein-red` bold (was pink).
- **Rating row**: star + rating + count.
- **Colors row**: up to 5 dots + "+N" overflow.
- **Add to cart button**: pink bar at bottom of image, hidden on desktop (translate-y-full) and slides up on hover, always visible on mobile.
- Removed "quick view" overlay.

### 9. Homepage (`src/app/page.tsx`)
- Replaced 2 picsum.photos promo images (promo-women / promo-men) with Unsplash fashion photos (photo-1483985988355-763728e1935b for women, photo-1490578474895-699cd4e2cf59 for men).

### 10. Other Pages — KMH → SHEIN rename
- `src/app/layout.tsx`: metadata title/description/keywords → "SHEIN", viewport themeColor → `#000000`.
- `src/app/account/page.tsx`: "ضيف KMH" → "ضيف SHEIN", "متجر KMH Fashion" → "متجر SHEIN".
- `src/app/order-confirmation/page.tsx`: "متجر KMH Fashion" → "متجر SHEIN", sessionStorage key `kmh-last-order` → `shein-last-order`.
- `src/app/checkout/page.tsx`: order ID prefix `KMH` → `SHN`, sessionStorage key updated.
- `src/app/cart/page.tsx`: promo code `KMH15` → `SHEIN15`, placeholder updated.
- `README.md`: rewritten with Shein clone description + disclaimer.

### 11. Next.js Config
- `next.config.ts`: added `images.unsplash.com` and `plus.unsplash.com` to `remotePatterns` (kept picsum.photos as harmless fallback).

## Build & Deploy

### Local build
```
cd /home/z/shein-store && bun install && bun run build
```
Result: ✓ 42 static pages generated in 6.1s, TypeScript pass, no errors.

### GitHub
- Commit SHA: `268e71247dd1d7a62ce506652068a049bde441dc`
- Pushed to `main` branch: `4429857..268e712 main -> main`
- Repo: https://github.com/5halid-707/shein-store

### Vercel
- Triggered production deploy via `/v13/deployments` with `gitSource {org:5halid-707, repo:shein-store, ref:main}`.
- Deployment ID: `dpl_2buRLvuRRiMveTBZKgW3RLMW4Z9C`
- State: **READY** (~25s after trigger)
- Production URL: **https://shein-store-teal.vercel.app** (alias preserved)
- Aliases: shein-store-5halid-707s-projects.vercel.app, shein-store-git-main-5halid-707s-projects.vercel.app

## Live Verification
- `GET /` → HTTP 200, 369KB HTML.
- Contains "SHEIN" × 42 occurrences, **0 "KMH Fashion"** references.
- Contains Khalid's contact: `khalid-alharbi@zohomail.sa` × 2, `966575015019` × 1.
- Contains disclaimer: "للعرض فقط" × 1.
- Arabic content confirmed: تخفيضات / وصل حديثاً / عروض اليوم / الأكثر مبيعاً / شحن مجاني.
- `/shein-logo.svg` → HTTP 200 ✓
- `/shein-logo-white.svg` → HTTP 200 ✓
- Unsplash sample image direct → HTTP 200 (71KB) ✓
- Next.js image optimizer (`/_next/image?...unsplash...`) → HTTP 200 ✓
- 33+ distinct Unsplash photo URLs referenced in homepage HTML (no picsum.photos anywhere).

## Stage Summary
- The shein-store is now a near-pixel visual clone of SHEIN (Arabic version): same logo wordmark, same black/pink/red palette, same scrolling announcement marquee, same RTL header with logo+search+icons, same category nav, same hero carousel with real fashion photos, same flash sale with countdown, same product cards with red discount badges + color dots + hover add-to-cart, same footer with trust badges + contact + payment methods.
- All 28 products use real Unsplash fashion photography instead of picsum placeholders.
- Khalid Al-Harbi's contact info preserved in footer + account page + order confirmation: `khalid-alharbi@zohomail.sa` and WhatsApp `+966 57 501 5019`.
- Disclaimer note "هذا الموقع للعرض فقط — تصميم خالد الحربي" added to footer for transparency.
- Live at https://shein-store-teal.vercel.app — portfolio-ready.
