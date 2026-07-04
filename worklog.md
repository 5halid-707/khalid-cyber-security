---
Task ID: 1
Agent: main (Z.ai Code)
Task: تحليل وتشغيل موقع "Elite Tech Agency" — تحويل HTML ثابت إلى تطبيق Next.js 16 متكامل مع حماية مفتاح API.

Work Log:
- قرأت كود HTML الأصلي وحللته: موقع وكالة تقنية عربي RTL بثيم سايبربانك (نيون أخضر/أزرق/وردي)، يحتوي على Hero بتأثير الكتابة، 3 بطاقات خدمات، شريط أدوات متحرك، معرض أعمال، FAB للتواصل، وروبوت محادثة يستخدم مفتاح Groq مكشوف في الكلاينت (خطر أمني).
- استدعيت مهارة LLM لتعلم استخدام z-ai-web-dev-sdk في الباك إند بشكل آمن.
- حدّثت `src/app/layout.tsx`: RTL عربي، خطوط Cairo + Share Tech Mono، ثيم داكن افتراضي.
- أعيد كتابة `src/app/globals.css` بنظام ألوان النيون الكامل + حركات مخصصة (marquee, pulse-bot, blink-cursor, glow-pulse, reveal) + scrollbar مخصص + خلفية شبكة سايبر.
- أنشأت المكونات في `src/components/site/`:
  - `navbar.tsx` — شريط علوي ثابت مع blur عند التمرير + قائمة موبايل.
  - `hero.tsx` — قسم رئيسي مع تأثير الكتابة المتحركة (4 عبارات) + خلفية شبكة + كرات توهج.
  - `services.tsx` — 3 بطاقات خدمات (أمن سيبراني/برمجة/تسويق) مع أيقونات Lucide وزوايا نيون.
  - `tools-marquee.tsx` — شريط أدوات لا نهائي (Kali/Python/Cisco/Flutter/MySQL...) مع تلاشي الحواف.
  - `portfolio.tsx` — 3 بطاقات أعمال مع تأثير الـ shine sweep وتحويل الصور من رمادي إلى ملون.
  - `footer.tsx` — فوتر ثابت في الأسفل مع روابط سريعة وأيقونات تواصل.
  - `floating-contact.tsx` — زر FAB عائم (يسار) يفتح 4 روابط تواصل.
  - `chatbot.tsx` — نافذة محادثة (يمين) تتصل بـ `/api/chat` مع ردود سريعة ومؤشر تحميل.
  - `reveal.tsx` — مكون مساعد للحركة عند التمرير عبر IntersectionObserver.
- أنشأت `src/app/api/chat/route.ts` — مسار POST آمن يستخدم z-ai-web-dev-sdk في الباك إند فقط (لا مفاتيح مكشوفة)، مع system prompt عربي يحتوي تفاصيل الخدمات والأسعار، وإدارة سجل محادثة لكل session.
- جمّعت كل شيء في `src/app/page.tsx` ببنية `min-h-screen flex flex-col` + `mt-auto` على الفوتر.
- شغّلت ESLint وأصلحت 4 أخطاء (`//` comments داخل JSX → تغليفها بـ string expressions).
- تحققت عبر Agent Browser:
  - الصفحة تُحمّل بـ HTTP 200 بدون أخطاء console أو runtime.
  - جميع الأقسام تُعرض (Hero/Services/Tools/Portfolio/Footer).
  - الروبوت يعمل end-to-end: أرسلت سؤال عن أسعار الأمن السيبراني فأجاب الـ LLM بالباقتين ($1500/$3500) بالعربية مع إيموجي.
  - زر FAB يفتح ويغلق قائمة التواصل بشكل صحيح.
  - قائمة الموبايل تعمل (hamburger → expands).
  - الفوتر الثابت: flex-col + mt-auto + 0px gap أسفل الفوتر.
  - الـ layout متجاوب على 390px و 1440px.
  - `POST /api/chat 200` ظاهر في سجل الخادم.

Stage Summary:
- الموقع يعمل بالكامل ومنتج وجاهز للمعاينة.
- تم استبدال مفتاح Groq المكشوف (خطر أمني حرج) بـ z-ai-web-dev-sdk في الباك إند — لا توجد مفاتيح في الكلاينت إطلاقاً.
- التقنيات: Next.js 16 App Router + TypeScript + Tailwind 4 + shadcn/ui + Lucide icons + z-ai-web-dev-sdk (LLM).
- الثيم: سايبربانك داكن بنفس ألوان النيون الأصلية، RTL عربي، خطوط Cairo + Share Tech Mono.
- جميع التفاعلات مُتحقَّق منها في المتصفح: المحادثة الذكية، FAB، قائمة الموبايل، الفوتر الثابت، التجاوب.
