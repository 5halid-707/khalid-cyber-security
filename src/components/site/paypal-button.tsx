"use client";

import { useState } from "react";
import { CreditCard, Loader2, Lock, Receipt } from "lucide-react";
import { useI18n } from "./i18n";

/**
 * PayPal "Buy Now" button with VAT support — FREE integration.
 * Uses PayPal's standard form POST to https://www.paypal.com/cgi-bin/webscr
 * No SDK, no API keys, no monthly fees. Only per-transaction fees (~2.9% + $0.30).
 *
 * === ACTIVATION STEPS ===
 * 1. Create a FREE PayPal Business account at https://paypal.com/business
 * 2. Verify your email and link your bank/card
 * 3. Enable international payments in account settings
 * 4. Replace PAYPAL_EMAIL below with your PayPal Business email
 * 5. Set PAYPAL_ENABLED to true
 * 6. Test with a real card — money arrives instantly to your PayPal balance
 *
 * === VAT CONFIGURATION ===
 * VAT_RATE is configurable. For Saudi Arabia it's 15% (default).
 * Change VAT_RATE to any other percentage (e.g., 0.05 for 5%, 0.20 for 20%).
 * Set VAT_RATE to 0 to disable VAT.
 */

// 🔧 Replace with your PayPal Business email to activate payments
const PAYPAL_EMAIL = "grouthhacker@gmail.com";

// Set to true once you've replaced the email with a real PayPal Business account
const PAYPAL_ENABLED = PAYPAL_EMAIL !== "grouthhacker@gmail.com";

// 🇸🇦 Saudi Arabia VAT rate (15%). Change as needed.
const VAT_RATE = 0.15;

const VAT_LABEL_AR = "ضريبة القيمة المضافة (15%)";
const VAT_LABEL_EN = "VAT (15%)";

type Props = {
  itemName: string;
  amount: number; // base price in USD (before VAT)
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
  const [showInvoice, setShowInvoice] = useState(false);

  const vatAmount = amount * VAT_RATE;
  const total = amount + vatAmount;

  const handlePay = (e: React.FormEvent) => {
    if (!PAYPAL_ENABLED) {
      e.preventDefault();
      alert(
        isAr
          ? "لتفعيل الدفع عبر PayPal:\n1. أنشئ حساب PayPal Business على paypal.com/business\n2. استبدل البريد في ملف paypal-button.tsx ببريد PayPal الحقيقي\n3. اضبط PAYPAL_ENABLED = true\n\nحالياً يمكنك التواصل عبر واتساب لإتمام الطلب."
          : "To enable PayPal payments:\n1. Create a PayPal Business account at paypal.com/business\n2. Replace the email in paypal-button.tsx with your real PayPal email\n3. Set PAYPAL_ENABLED = true\n\nFor now, contact via WhatsApp to complete your order."
      );
      return;
    }
    setLoading(true);
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
          value={`${isAr && itemNameAr ? itemNameAr : itemName} (incl. VAT)`}
        />
        <input type="hidden" name="amount" value={total.toFixed(2)} />
        <input type="hidden" name="tax_rate" value={VAT_RATE * 100} />
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
          ${total.toFixed(2)}
        </button>
      </form>
    );
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
            <span className="mono-tech text-neon-blue">+${vatAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-edge text-white font-bold">
            <span>{isAr ? "الإجمالي" : "Total"}</span>
            <span className="mono-tech text-neon-green">${total.toFixed(2)}</span>
          </div>
        </div>
      )}

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
          value={`${isAr && itemNameAr ? itemNameAr : itemName} (incl. VAT 15%)`}
        />
        <input type="hidden" name="amount" value={total.toFixed(2)} />
        <input type="hidden" name="tax_rate" value={(VAT_RATE * 100).toFixed(2)} />
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
    </div>
  );
}
