"use client";

import { useState } from "react";
import { CreditCard, Loader2, Lock } from "lucide-react";
import { useI18n } from "./i18n";

/**
 * PayPal "Buy Now" button — FREE integration (no SDK, no API keys, no monthly fees).
 * Uses PayPal's standard form POST to https://www.paypal.com/cgi-bin/webscr
 * Only requires a PayPal Business email (merchant email).
 * PayPal charges a per-transaction fee (~2.9% + $0.30) only when you receive money.
 *
 * To activate: replace PAYPAL_EMAIL below with your PayPal business email.
 */

// 🔧 Replace this with your PayPal business email to activate payments
const PAYPAL_EMAIL = "grouthhacker@gmail.com";

// Set to true once you've replaced the email above with a real PayPal business account
const PAYPAL_ENABLED = PAYPAL_EMAIL !== "grouthhacker@gmail.com";

type Props = {
  itemName: string;
  amount: number; // in USD
  itemNameAr?: string;
  color?: string;
  compact?: boolean;
};

export default function PayPalButton({
  itemName,
  amount,
  itemNameAr,
  color = "var(--neon-green)",
  compact = false,
}: Props) {
  const { lang } = useI18n();
  const isAr = lang === "ar";
  const [loading, setLoading] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    if (!PAYPAL_ENABLED) {
      e.preventDefault();
      alert(
        isAr
          ? "لتفعيل الدفع عبر PayPal، يرجى تحديث بريد PayPal في الكود (PayPalButton.tsx). حالياً يمكنك التواصل عبر واتساب لإتمام الطلب."
          : "To enable PayPal payments, update the PayPal email in PayPalButton.tsx. For now, contact via WhatsApp to complete your order."
      );
      return;
    }
    setLoading(true);
    // Form will POST to PayPal — loading state shows briefly
  };

  if (compact) {
    return (
      <form
        action="https://www.paypal.com/cgi-bin/webscr"
        method="post"
        target="_blank"
        onSubmit={handlePay}
        className="inline-block"
      >
        <input type="hidden" name="cmd" value="_xclick" />
        <input type="hidden" name="business" value={PAYPAL_EMAIL} />
        <input
          type="hidden"
          name="item_name"
          value={isAr && itemNameAr ? itemNameAr : itemName}
        />
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="currency_code" value="USD" />
        <input type="hidden" name="no_shipping" value="2" />
        <input
          type="hidden"
          name="return"
          value={typeof window !== "undefined" ? window.location.origin : ""}
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg font-bold text-xs transition-all bg-[#0070ba] text-white hover:bg-[#005ea6] disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <CreditCard size={13} />
          )}
          PayPal
        </button>
      </form>
    );
  }

  return (
    <form
      action="https://www.paypal.com/cgi-bin/webscr"
      method="post"
      target="_blank"
      onSubmit={handlePay}
      className="w-full"
    >
      <input type="hidden" name="cmd" value="_xclick" />
      <input type="hidden" name="business" value={PAYPAL_EMAIL} />
      <input
        type="hidden"
        name="item_name"
        value={isAr && itemNameAr ? itemNameAr : itemName}
      />
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="currency_code" value="USD" />
      <input type="hidden" name="no_shipping" value="2" />
      <input
        type="hidden"
        name="return"
        value={typeof window !== "undefined" ? window.location.origin : ""}
      />
      <button
        type="submit"
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-bold text-sm transition-all bg-[#0070ba] text-white hover:bg-[#005ea6] hover:shadow-[0_0_15px_rgba(0,112,186,0.5)] disabled:opacity-60"
      >
        {loading ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <>
            <CreditCard size={15} />
            {isAr ? "ادفع عبر PayPal" : "Pay with PayPal"}
            <span className="inline-flex items-center gap-0.5 text-[10px] opacity-80">
              <Lock size={9} />
              {isAr ? "آمن" : "Secure"}
            </span>
          </>
        )}
      </button>
      {!PAYPAL_ENABLED && (
        <p className="text-[9px] text-fg/30 text-center mt-1 leading-tight">
          {isAr
            ? "(سيُفعّل الدفع قريباً — تواصل عبر واتساب للطلب الآن)"
            : "(Payment coming soon — WhatsApp to order now)"}
        </p>
      )}
    </form>
  );
}
