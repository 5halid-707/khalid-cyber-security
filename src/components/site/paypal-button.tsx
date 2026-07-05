"use client";

import { useEffect, useRef, useState } from "react";
import { CreditCard, Loader2, Lock, Receipt } from "lucide-react";
import { useI18n } from "./i18n";

/**
 * PayPal checkout button — REAL integration using PayPal's official JS SDK.
 * Stable version with retry logic + error recovery.
 *
 * === HOW IT WORKS ===
 * 1. Loads PayPal config (Client ID + mode) from /api/paypal-config
 * 2. Injects PayPal's official SDK script with the Client ID
 * 3. Renders real PayPal buttons that open PayPal's checkout popup
 * 4. Buyer pays with PayPal account or card → money goes to your PayPal
 * 5. VAT 15% is automatically included in the total
 *
 * === STABILITY FEATURES ===
 * - Retry SDK loading up to 3 times on failure
 * - Re-render buttons if container is empty (visibility change)
 * - Timeout fallback if SDK takes too long
 * - Graceful error message instead of silent failure
 */

const VAT_RATE = 0.15;
const VAT_LABEL_AR = "ضريبة القيمة المضافة (15%)";
const VAT_LABEL_EN = "VAT (15%)";

let sdkLoadPromise: Promise<void> | null = null;
let cachedConfig: {
  clientId: string;
  mode: string;
  enabled: boolean;
} | null = null;

async function loadConfig() {
  if (cachedConfig) return cachedConfig;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch("/api/paypal-config", { cache: "no-store" });
      if (res.ok) {
        cachedConfig = await res.json();
        return cachedConfig;
      }
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
  }
  return { clientId: "", mode: "sandbox", enabled: false };
}

async function loadPayPalSDK(clientId: string): Promise<void> {
  if (typeof window === "undefined") return;
  if ((window as any).paypal) return;
  if (sdkLoadPromise) return sdkLoadPromise;

  sdkLoadPromise = new Promise<void>((resolve, reject) => {
    // Timeout after 15s
    const timeout = setTimeout(() => {
      reject(new Error("PayPal SDK load timeout"));
    }, 15000);

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&intent=capture&disable-funding=credit`;
    script.async = true;
    script.onload = () => {
      clearTimeout(timeout);
      resolve();
    };
    script.onerror = () => {
      clearTimeout(timeout);
      sdkLoadPromise = null; // allow retry
      reject(new Error("Failed to load PayPal SDK"));
    };
    document.head.appendChild(script);
  });
  return sdkLoadPromise;
}

type Props = {
  itemName: string;
  amount: number;
  itemNameAr?: string;
  color?: string;
  compact?: boolean;
};

export default function PayPalButton({
  itemName,
  amount,
  itemNameAr,
  compact = false,
}: Props) {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const [showInvoice, setShowInvoice] = useState(false);
  const [status, setStatus] = useState<
    "loading" | "ready" | "error" | "disabled"
  >("loading");
  const [config, setConfig] = useState<{
    clientId: string;
    mode: string;
    enabled: boolean;
  } | null>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const renderKeyRef = useRef(0);

  const vatAmount = amount * VAT_RATE;
  const total = amount + vatAmount;

  // Load config + SDK on mount
  useEffect(() => {
    let mounted = true;
    let retryCount = 0;

    const init = async () => {
      const cfg = await loadConfig();
      if (!mounted) return;
      setConfig(cfg);

      if (!cfg.enabled || !cfg.clientId) {
        setStatus("disabled");
        return;
      }

      // Try loading SDK with retries
      while (retryCount < 3) {
        try {
          await loadPayPalSDK(cfg.clientId);
          if (mounted) setStatus("ready");
          return;
        } catch (e) {
          retryCount++;
          if (retryCount >= 3) {
            if (mounted) setStatus("error");
            return;
          }
          await new Promise((r) => setTimeout(r, 1000 * retryCount));
        }
      }
    };

    init();
    return () => {
      mounted = false;
    };
  }, []);

  // Render PayPal buttons when ready
  useEffect(() => {
    if (status !== "ready" || !config?.enabled) return;
    const paypal = (window as any).paypal;
    if (!paypal || !buttonContainerRef.current) return;

    // Clear previous buttons
    buttonContainerRef.current.innerHTML = "";
    renderKeyRef.current++;

    try {
      paypal
        .Buttons({
          style: {
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "paypal",
            height: 40,
          },
          createOrder: (_data: any, actions: any) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: `${
                    isAr && itemNameAr ? itemNameAr : itemName
                  } (incl. VAT 15%)`,
                  amount: {
                    currency_code: "USD",
                    value: total.toFixed(2),
                    breakdown: {
                      item_total: {
                        currency_code: "USD",
                        value: amount.toFixed(2),
                      },
                      tax_total: {
                        currency_code: "USD",
                        value: vatAmount.toFixed(2),
                      },
                    },
                  },
                },
              ],
            });
          },
          onApprove: async (_data: any, actions: any) => {
            const details = await actions.order.capture();
            alert(
              isAr
                ? `✅ تم الدفع بنجاح!\nرقم المعاملة: ${details.id}\nالمبلغ: $${total.toFixed(
                    2
                  )}\n\nشكراً لك! سأتواصل معك قريباً.`
                : `✅ Payment successful!\nTransaction ID: ${details.id}\nAmount: $${total.toFixed(
                    2
                  )}\n\nThank you! I'll contact you soon.`
            );
          },
          onError: (err: any) => {
            console.error("PayPal checkout error:", err);
            alert(
              isAr
                ? "❌ حدث خطأ في عملية الدفع. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب."
                : "❌ Payment error. Please try again or contact via WhatsApp."
            );
          },
        })
        .render(buttonContainerRef.current);
    } catch (e) {
      console.error("PayPal render error:", e);
      setStatus("error");
    }
  }, [status, config, total, amount, vatAmount, itemName, itemNameAr, isAr, compact]);

  // Re-render on visibility change (fixes tabs/background issues)
  useEffect(() => {
    const onVisible = () => {
      if (status === "ready" && buttonContainerRef.current) {
        const hasChildren = buttonContainerRef.current.children.length > 0;
        if (!hasChildren) {
          setStatus("loading");
          setTimeout(() => setStatus("ready"), 100);
        }
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [status]);

  // Loading state
  if (status === "loading") {
    return (
      <button
        type="button"
        disabled
        className={`flex items-center justify-center gap-2 w-full ${
          compact ? "py-2 px-3" : "py-2.5"
        } rounded-lg font-bold text-xs sm:text-sm bg-[#0070ba]/40 text-white/50 cursor-not-allowed`}
      >
        <Loader2 size={13} className="animate-spin" />
        {isAr ? "تحميل PayPal..." : "Loading PayPal..."}
      </button>
    );
  }

  // Error state — show retry button
  if (status === "error") {
    return (
      <button
        type="button"
        onClick={() => {
          setStatus("loading");
          sdkLoadPromise = null;
          setTimeout(() => window.location.reload(), 500);
        }}
        className={`flex items-center justify-center gap-2 w-full ${
          compact ? "py-2 px-3" : "py-2.5"
        } rounded-lg font-bold text-xs sm:text-sm bg-red-600/80 text-white hover:bg-red-700 transition-all`}
      >
        {isAr ? "❌ خطأ PayPal — إعادة المحاولة" : "❌ PayPal error — Retry"}
      </button>
    );
  }

  // Disabled state (no config)
  if (status === "disabled" || !config?.enabled) {
    return (
      <button
        type="button"
        disabled
        className={`flex items-center justify-center gap-2 w-full ${
          compact ? "py-2 px-3" : "py-2.5"
        } rounded-lg font-bold text-xs sm:text-sm bg-[#0070ba]/30 text-white/40 cursor-not-allowed`}
      >
        <Lock size={13} />
        {isAr ? "PayPal غير مفعّل" : "PayPal disabled"}
      </button>
    );
  }

  // Ready — show invoice toggle (non-compact only) + PayPal buttons
  if (compact) {
    return <div ref={buttonContainerRef} className="w-full" />;
  }

  return (
    <div className="w-full">
      {/* Invoice breakdown toggle */}
      <button
        type="button"
        onClick={() => setShowInvoice((v) => !v)}
        className="w-full flex items-center justify-between gap-2 py-1.5 px-2 mb-1 text-[11px] text-fg/60 hover:text-fg/90 transition-colors"
      >
        <span className="inline-flex items-center gap-1">
          <Receipt size={11} />
          {isAr ? "تفاصيل الفاتورة" : "Invoice details"}
        </span>
        <span className="mono-tech text-neon-green font-bold">
          ${total.toFixed(2)}
        </span>
      </button>

      {showInvoice && (
        <div className="mb-2 p-2.5 rounded-lg bg-[#0d1117] border border-edge text-[11px] space-y-1">
          <div className="flex justify-between text-fg/70">
            <span>{isAr ? "المبلغ الأساسي" : "Subtotal"}</span>
            <span className="mono-tech">${amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-fg/70">
            <span>{isAr ? VAT_LABEL_AR : VAT_LABEL_EN}</span>
            <span className="mono-tech text-neon-blue">
              +${vatAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between pt-1 border-t border-edge text-white font-bold">
            <span>{isAr ? "الإجمالي" : "Total"}</span>
            <span className="mono-tech text-neon-green">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* PayPal SDK buttons container */}
      <div ref={buttonContainerRef} className="w-full" />

      {/* Mode badge + security note */}
      <div className="flex items-center justify-center gap-1.5 mt-1.5">
        <Lock size={9} className="text-fg/40" />
        <span className="text-[9px] text-fg/40">
          {config.mode === "sandbox"
            ? isAr
              ? "وضع الاختبار (Sandbox)"
              : "Sandbox mode"
            : isAr
              ? "مدفوعات حقيقية • آمن عبر PayPal"
              : "Live payments • Secured by PayPal"}
        </span>
      </div>
    </div>
  );
}
