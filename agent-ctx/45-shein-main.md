# Task 45-shein — KMH Fashion Store (Shein-inspired)

## Summary
Built and deployed a complete standalone Arabic RTL e-commerce store inspired by Shein for owner Khalid Al-harbi, located at `/home/z/shein-store/` (separate from main portfolio).

## Deliverables
- **Production URL**: https://shein-store-teal.vercel.app
- **GitHub repo**: https://github.com/5halid-707/shein-store
- **Owner**: Khalid Al-harbi (khalid-alharbi@zohomail.sa / +966 57 501 5019 / Saudi Arabia)

## Tech Stack
- Next.js 16.2.10 (App Router) + TypeScript 5 + Tailwind CSS 4
- Framer Motion + Lucide icons + React Context + localStorage
- 28 mock products across 6 categories (women/men/kids/beauty/home/accessories)
- 9 working pages: Home, Product/[id], Cart, Checkout, Order-confirmation, Category/[name] (7 variants), Wishlist, Account

## Features Implemented
- Homepage: announcement bar, sticky header w/ search+cart+wishlist badges, category nav, hero carousel (4 slides auto-play), quick category grid, promo strip, flash sale section w/ live countdown timer, trending categories, mid-promo banners, new arrivals, best sellers, recommended, newsletter signup, footer w/ payment methods + social
- Product card: discount badge, NEW badge, wishlist heart toggle, quick view hover, rating, 2-line title, price (old+new), color dots, add-to-cart
- Product detail: 5-image gallery w/ thumbnails, brand+title, rating stars, price box w/ savings, color/size/qty selectors, add-to-cart + buy now + wishlist + share, benefits row, description, size guide table, reviews (summary + list), related products
- Cart page: items list w/ qty controls + remove, promo codes (KMH15=15%, WELCOME=10%), free shipping progress (200 SAR), summary
- Checkout: shipping form (name/email/phone/address/city/zip/notes), 5 payment methods (COD/mada/visa/Apple Pay/STC), order summary, place order → confirmation page
- Order confirmation: success animation, order #, status tracker (4 steps), contact info
- Category page: filters sidebar (size/color/price), sort dropdown (6 options), grid toggle (2/5 cols), pagination "load more", mobile filter drawer, category chips
- Wishlist + Account pages
- Cart drawer (slide-in from left) + Toast notifications
- Mobile bottom tab bar (Home/Categories/Cart/Wishlist/Account)
- RTL Arabic throughout, dir="rtl", Cairo font
- Shein pink (#ee296d) primary color

## Deployment Notes
- Vercel project created via API (prj_c4yczZKGdRuzBqOVNAaUnczsff65) without git link (GitHub app not installed).
- Deployment triggered via /v13/deployments with gitSource {org:5halid-707, repo:shein-store, ref:main}.
- Initial deploy failed: "Vulnerable version of Next.js detected" (next@16.0.0). Fixed by updating to next@16.2.10.
- Final deploy: READY in ~30s. All routes return 200.

## Issues Encountered
- lucide-react v1.24 removed brand icons (Youtube/Instagram/Twitter/Facebook). Replaced with generic icons (Camera/Send/Users/PlayCircle).
- Local dev server (next dev) was OOM-killed multiple times (system has only 3.9GB RAM with chrome-headless + main project consuming 2.5GB). Verified correctness via `bun run build` (42 static pages, 6.1s compile) instead of relying on dev server.
- Vercel requires GitHub App installation for direct repo linking; worked around by using gitSource in deployment API.

## Files Structure
```
/home/z/shein-store/
├── package.json, next.config.ts, tsconfig.json, postcss.config.mjs, eslint.config.mjs
├── README.md, .gitignore
├── src/
│   ├── app/
│   │   ├── layout.tsx, page.tsx, globals.css
│   │   ├── product/[id]/page.tsx
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── order-confirmation/page.tsx
│   │   ├── category/[name]/page.tsx
│   │   ├── wishlist/page.tsx
│   │   └── account/page.tsx
│   ├── components/ (15 files: site-header, site-footer, mobile-tab-bar, announcement-bar, toaster, cart-drawer, product-card, hero-carousel, flash-sale-timer, product-gallery, product-info, product-reviews, category-client, plus utils)
│   ├── context/ (cart-context, wishlist-context, toast-context)
│   ├── data/products.ts (28 products + helpers)
│   ├── types/index.ts
│   └── lib/utils.ts
└── 37 git-tracked files
```

