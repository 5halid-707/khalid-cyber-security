"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, MessageSquare, Send, X } from "lucide-react";
import { useI18n } from "./i18n";

type Msg = { role: "bot" | "user"; text: string };

const WELCOME = {
  ar: "مرحباً بك! 👋 أنا مساعد خالد الحربي — خبير الأمن السيبراني المعتمد.\nكيف أقدر أساعدك اليوم؟ يمكنك سؤالي عن الخدمات أو الأسعار أو المؤهلات.",
  en: "Welcome! 👋 I'm Khalid Al-harbi's assistant — a certified Cyber Security Expert.\nHow can I help you today? Ask me about services, pricing, or credentials.",
};

const QUICK = {
  ar: [
    "ما هي خدماتك؟",
    "أسعار اختبار الاختراق",
    "ما هي مؤهلاتك؟",
    "أريد حماية شبكتي",
  ],
  en: [
    "What are your services?",
    "Penetration testing price",
    "What are your credentials?",
    "I want to secure my network",
  ],
};

export default function Chatbot() {
  const { lang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: WELCOME[lang] },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Reset welcome message when language changes
  useEffect(() => {
    const id = setTimeout(
      () => setMessages([{ role: "bot", text: WELCOME[lang] }]),
      0
    );
    return () => clearTimeout(id);
  }, [lang]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: content }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, lang }),
      });

      if (!res.ok) throw new Error("network");

      const data = await res.json();
      const reply: string = data.reply ?? "Sorry, I couldn't respond right now.";
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text:
            lang === "ar"
              ? "عذراً، حدث خطأ في الاتصال. تأكد من اتصالك بالإنترنت وحاول مجدداً. 🛠️"
              : "Sorry, a connection error occurred. Please check your internet and try again. 🛠️",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none">
      {/* Chat window — absolutely positioned so it doesn't block clicks when closed */}
      {open && (
        <div
          className="w-[min(92vw,360px)] h-[min(70vh,520px)] bg-surface border border-neon-green rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden origin-bottom-right pointer-events-auto"
        >
        {/* Header */}
        <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-edge">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-neon-green/15 border border-neon-green/40 flex items-center justify-center">
              <Bot size={18} className="text-neon-green" />
            </div>
            <div>
              <p className="text-neon-green font-bold text-sm">
                {t("chatbot.title")}
              </p>
              <p className="text-fg/50 text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green inline-block" />
                {t("chatbot.online")}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="text-fg/60 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div
          ref={bodyRef}
          className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-[#0d1117]"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                m.role === "bot"
                  ? "self-start bg-[#161b22] text-fg rounded-bl-sm border border-edge"
                  : "self-end bg-neon-green text-[#05080f] font-medium rounded-br-sm"
              }`}
            >
              {m.text}
            </div>
          ))}

          {loading && (
            <div className="self-start bg-[#161b22] text-fg/70 rounded-2xl rounded-bl-sm border border-edge px-4 py-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neon-green/60 animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 rounded-full bg-neon-green/60 animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 rounded-full bg-neon-green/60 animate-bounce" />
            </div>
          )}

          {/* Quick replies (only show at start) */}
          {messages.length === 1 && !loading && (
            <div className="flex flex-wrap gap-2 mt-2 self-start">
              {QUICK[lang].map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-xs px-3 py-1.5 rounded-full border border-neon-green/40 text-neon-green hover:bg-neon-green/10 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="p-3 bg-[#161b22] border-t border-edge flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("chatbot.placeholder")}
            className="flex-1 bg-[#0d1117] border border-edge rounded-lg px-3 py-2 text-sm text-white placeholder:text-fg/40 focus:outline-none focus:border-neon-green/60 transition-colors"
            dir={lang === "ar" ? "rtl" : "ltr"}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send"
            className="bg-neon-green text-[#05080f] rounded-lg px-3 flex items-center justify-center disabled:opacity-40 hover:shadow-[0_0_10px_rgba(0,255,204,0.5)] transition-shadow"
          >
            <Send size={18} className={lang === "ar" ? "rotate-180" : ""} />
          </button>
        </form>
      </div>
      )}

      {/* Toggler with label */}
      <div className="flex flex-col items-end gap-1 pointer-events-auto">
        {!open && (
          <span className="text-[10px] bg-neon-green/15 border border-neon-green/40 text-neon-green px-2 py-0.5 rounded-full whitespace-nowrap mono-tech">
            موظف .م خالد الحربي
          </span>
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chat" : "Open chat"}
          className="w-14 h-14 rounded-full bg-neon-green text-[#05080f] flex items-center justify-center shadow-[0_0_15px_var(--neon-green)] animate-pulse-bot hover:scale-110 transition-transform pointer-events-auto touch-manipulation"
          style={{ touchAction: "manipulation" }}
        >
          {open ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>
    </div>
  );
}
