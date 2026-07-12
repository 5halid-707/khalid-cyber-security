"use client";

import { useState, type FormEvent } from "react";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Lock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Reveal from "./reveal";
import TypedHeading from "./typed-heading";
import { useI18n } from "./i18n";

type Step = 0 | 1 | 2 | 3;

export default function ContactSection() {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const Arrow = isAr ? ChevronLeft : ChevronRight;

  const [step, setStep] = useState<Step>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    details: "",
  });

  const services = isAr
    ? [
        "الباقة الأساسية للحماية ($1,500)",
        "اختبار الاختراق الاحترافي ($2,500)",
        "الباقة المؤسسية - Cisco ($3,500)",
        "تأمين المواقع الإلكترونية ($800)",
        "الاستجابة للحوادث ($1,200)",
        "الامتثال والتدريب ($600)",
        "تطوير موقع/تطبيق شامل ($2,500+)",
        "استشارات إدارة المخاطر ($2,000)",
        "تصميم أنظمة آمنة ($3,000)",
        "هندسة الدفاع السيبراني ($2,800)",
        "أخرى / استشارة مخصصة",
      ]
    : [
        "Essential Protection ($1,500)",
        "Penetration Testing ($2,500)",
        "Enterprise - Cisco ($3,500)",
        "Web Security ($800)",
        "Incident Response ($1,200)",
        "Compliance & Training ($600)",
        "Custom Website/App ($2,500+)",
        "Risk Management Consulting ($2,000)",
        "Secure System Design ($3,000)",
        "Network Defense Engineering ($2,800)",
        "Other / Custom",
      ];

  const steps = [
    {
      icon: User,
      label: isAr ? "الاسم" : "Name",
      field: "name" as const,
      placeholder: isAr ? "ما اسمك؟" : "What's your name?",
      type: "text",
    },
    {
      icon: Mail,
      label: isAr ? "الإيميل" : "Email",
      field: "email" as const,
      placeholder: isAr ? "بريدك الإلكتروني" : "Your email address",
      type: "email",
    },
    {
      icon: Phone,
      label: isAr ? "الجوال" : "Phone",
      field: "phone" as const,
      placeholder: isAr ? "رقم الجوال (مثال: 0575015019)" : "Phone (e.g. +966575015019)",
      type: "tel",
    },
    {
      icon: MessageSquare,
      label: isAr ? "التفاصيل" : "Details",
      field: "details" as const,
      placeholder: isAr
        ? "اكتب تفاصيل الخدمة التي تحتاجها..."
        : "Describe the service you need...",
      type: "textarea",
    },
  ];

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const validateStep = (currentStep: Step): boolean => {
    if (currentStep === 0 && !form.name.trim()) {
      setError(isAr ? "الرجاء إدخال اسمك" : "Please enter your name");
      return false;
    }
    if (currentStep === 1 && !form.email.trim()) {
      setError(isAr ? "الرجاء إدخال بريدك الإلكتروني" : "Please enter your email");
      return false;
    }
    if (currentStep === 1 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError(isAr ? "البريد الإلكتروني غير صحيح" : "Invalid email format");
      return false;
    }
    if (currentStep === 2 && !form.phone.trim()) {
      setError(isAr ? "الرجاء إدخال رقم جوالك" : "Please enter your phone");
      return false;
    }
    if (currentStep === 3 && !form.details.trim()) {
      setError(isAr ? "الرجاء كتابة تفاصيل الخدمة" : "Please describe the service");
      return false;
    }
    return true;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((prev) => Math.min(3, (prev + 1) as Step));
  };

  const prev = () => {
    setError("");
    setStep((prev) => Math.max(0, (prev - 1) as Step));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();

      // Auto-open WhatsApp with the formatted message
      if (data.whatsappLink) {
        window.open(data.whatsappLink, "_blank");
      }

      setSubmitted(true);
    } catch {
      setError(
        isAr
          ? "حدث خطأ في الإرسال. تواصل معي مباشرة عبر واتساب: 0575015019"
          : "Submission failed. Contact me via WhatsApp: +966575015019"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact-form" className="py-24 px-5 relative">
        <div className="mx-auto max-w-2xl">
          <Reveal className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-neon-green/15 border-2 border-neon-green flex items-center justify-center mb-6 animate-scale-in">
              <CheckCircle2 size={40} className="text-neon-green" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
              {isAr ? "تم استلام طلبك! ✅" : "Request Received! ✅"}
            </h2>
            <p className="text-fg/60 mb-6 max-w-md mx-auto">
              {isAr
                ? `شكراً ${form.name}! وصلتني تفاصيل طلبك وسأتواصل معك قريباً على ${form.email} و ${form.phone}`
                : `Thank you ${form.name}! I received your request and will contact you soon at ${form.email} and ${form.phone}`}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/966575015019?text=${encodeURIComponent(
                  `مرحبا خالد، أنا ${form.name}. ${form.details}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-neon-green text-[#05080f] font-bold px-6 py-3 rounded-lg hover:shadow-[0_0_20px_rgba(0,255,204,0.5)] transition-all"
              >
                <MessageSquare size={18} />
                {isAr ? "تواصل عبر واتساب الآن" : "Message me on WhatsApp now"}
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(0);
                  setForm({ name: "", email: "", phone: "", service: "", details: "" });
                }}
                className="inline-flex items-center justify-center gap-2 border-2 border-edge text-fg/70 font-bold px-6 py-3 rounded-lg hover:border-neon-green hover:text-neon-green transition-all"
              >
                {isAr ? "إرسال طلب آخر" : "Send another request"}
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  const currentStepData = steps[step];
  const StepIcon = currentStepData.icon;

  return (
    <section id="contact-form" className="py-24 px-5 relative">
      <div className="mx-auto max-w-2xl">
        <Reveal className="text-center mb-10">
          <p className="mono-tech text-xs text-neon-green/70 tracking-[0.3em] mb-3">
            {"// GET IN TOUCH"}
          </p>
          <TypedHeading
            text={isAr ? "تواصل معي مباشرة" : "Contact Me Directly"}
            as="h2"
            className="text-3xl md:text-4xl font-black text-white mb-3"
            prefix="> "
          />
          <p className="text-fg/60 max-w-xl mx-auto mb-5">
            {isAr
              ? "املأ النموذج التالي خطوة بخطوة — وسأتواصل معك على إيميلك وواتسابك خلال 24 ساعة"
              : "Fill the form step by step — I'll contact you via email and WhatsApp within 24 hours"}
          </p>
          <div className="w-20 h-1 mx-auto bg-neon-green rounded-full shadow-[0_0_10px_var(--neon-green)]" />
        </Reveal>

        {/* Chat-style form card */}
        <Reveal>
          <div className="bg-surface rounded-2xl border-2 border-edge overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
            {/* Chat header */}
            <div className="bg-[#161b22] px-5 py-4 flex items-center gap-3 border-b border-edge">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-neon-green/15 border border-neon-green/40 flex items-center justify-center">
                  <ShieldCheck size={20} className="text-neon-green" />
                </div>
                <span className="absolute bottom-0 left-0 w-3 h-3 bg-neon-green rounded-full border-2 border-[#161b22] animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">
                  {isAr ? "خبير الأمن السيبراني" : "Cyber Security Expert"}
                </p>
                <p className="text-[10px] text-neon-green flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                  {isAr ? "متصل الآن — يرد خلال 24 ساعة" : "Online — replies within 24h"}
                </p>
              </div>
              <Lock size={14} className="text-fg/30" />
            </div>

            {/* Progress bar */}
            <div className="flex items-center px-5 py-3 gap-2 bg-[#0d1117] border-b border-edge">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const isDone = i < step;
                const isActive = i === step;
                return (
                  <div key={i} className="flex items-center flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
                        isDone
                          ? "bg-neon-green text-[#05080f]"
                          : isActive
                            ? "bg-neon-green/20 border-2 border-neon-green text-neon-green"
                            : "bg-surface border border-edge text-fg/30"
                      }`}
                    >
                      {isDone ? <CheckCircle2 size={16} /> : <Icon size={14} />}
                    </div>
                    {i < 3 && (
                      <div
                        className={`flex-1 h-0.5 mx-1 rounded-full transition-all ${
                          isDone ? "bg-neon-green" : "bg-edge"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Chat body */}
            <div className="p-5 min-h-[280px] flex flex-col">
              {/* Bot message */}
              <div className="flex items-start gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-neon-green/15 border border-neon-green/30 flex items-center justify-center shrink-0">
                  <ShieldCheck size={14} className="text-neon-green" />
                </div>
                <div className="bg-[#161b22] rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[80%]">
                  <p className="text-sm text-fg/80">
                    {step === 0 && (isAr ? "أهلاً وسهلاً! 👋 ما اسمك الكريم؟" : "Welcome! 👋 What's your name?")}
                    {step === 1 && (isAr ? `سعيد بلقائك ${form.name}! 📧 ما بريدك الإلكتروني؟` : `Nice to meet you ${form.name}! 📧 What's your email?`)}
                    {step === 2 && (isAr ? "ممتاز! 📱 ما رقم جوالك للتواصل عبر واتساب؟" : "Great! 📱 What's your phone for WhatsApp?")}
                    {step === 3 && (isAr ? "أخيراً! 💬 ما الخدمة التي تحتاجها؟ اكتب التفاصيل" : "Finally! 💬 What service do you need? Share details")}
                  </p>
                </div>
              </div>

              {/* Input area */}
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                {step === 3 && (
                  <div className="mb-3">
                    <label className="text-[10px] text-fg/40 mb-1.5 block">
                      {isAr ? "اختر الخدمة (اختياري)" : "Select service (optional)"}
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => updateField("service", e.target.value)}
                      className="w-full bg-[#0d1117] border border-edge rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-green/50 transition-colors mb-3"
                    >
                      <option value="">{isAr ? "-- اختر خدمة --" : "-- Select service --"}</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex items-center gap-2 bg-[#0d1117] border border-edge rounded-xl p-1.5 focus-within:border-neon-green/40 transition-colors">
                  <StepIcon size={18} className="text-neon-green/60 shrink-0 ml-1" />
                  {currentStepData.type === "textarea" ? (
                    <textarea
                      value={form[currentStepData.field]}
                      onChange={(e) => updateField(currentStepData.field, e.target.value)}
                      placeholder={currentStepData.placeholder}
                      rows={3}
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-fg/30 focus:outline-none resize-none"
                      autoFocus
                    />
                  ) : (
                    <input
                      type={currentStepData.type}
                      value={form[currentStepData.field]}
                      onChange={(e) => updateField(currentStepData.field, e.target.value)}
                      placeholder={currentStepData.placeholder}
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-fg/30 focus:outline-none"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && step < 3) {
                          e.preventDefault();
                          next();
                        }
                      }}
                    />
                  )}
                </div>

                {error && (
                  <p className="text-[11px] text-red-400 mt-2">{error}</p>
                )}

                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-4 gap-2">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={prev}
                      className="inline-flex items-center gap-1 text-xs text-fg/50 hover:text-fg/80 transition-colors px-3 py-2"
                    >
                      <Arrow size={14} className="rotate-180" />
                      {isAr ? "السابق" : "Back"}
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={next}
                      className="inline-flex items-center gap-1.5 bg-neon-green text-[#05080f] font-bold text-sm px-5 py-2.5 rounded-lg hover:shadow-[0_0_15px_rgba(0,255,204,0.4)] transition-all"
                    >
                      {isAr ? "التالي" : "Next"}
                      <Arrow size={15} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-1.5 bg-neon-green text-[#05080f] font-bold text-sm px-5 py-2.5 rounded-lg hover:shadow-[0_0_15px_rgba(0,255,204,0.4)] transition-all disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          {isAr ? "جاري الإرسال..." : "Sending..."}
                        </>
                      ) : (
                        <>
                          <Send size={15} className={isAr ? "rotate-180" : ""} />
                          {isAr ? "إرسال الطلب" : "Send Request"}
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Footer security note */}
            <div className="px-5 py-3 bg-[#0d1117] border-t border-edge flex items-center justify-center gap-1.5">
              <Lock size={11} className="text-neon-green/50" />
              <p className="text-[10px] text-fg/40">
                {isAr
                  ? "بياناتك محمية ومشفرة — لن تُشارك مع أي طرف ثالث"
                  : "Your data is protected and encrypted — never shared with third parties"}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Direct contact alternatives */}
        <Reveal className="mt-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/966575015019"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-sm text-fg/60 hover:text-neon-green transition-colors"
            >
              <MessageSquare size={15} className="text-[#25D366]" />
              <span className="mono-tech" dir="ltr">+966 57 501 5019</span>
            </a>
            <span className="text-fg/20 hidden sm:inline">|</span>
            <a
              href="mailto:khalid-alharbi@zohomail.sa"
              className="inline-flex items-center justify-center gap-2 text-sm text-fg/60 hover:text-neon-pink transition-colors"
            >
              <Mail size={15} className="text-neon-pink" />
              <span className="mono-tech" dir="ltr">khalid-alharbi@zohomail.sa</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
