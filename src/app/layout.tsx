import type { Metadata, Viewport } from "next";
import { Cairo, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import DynamicVideoBackground from "@/components/site/dynamic-video-bg";
import { I18nProvider } from "@/components/site/i18n";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "500", "700", "900"],
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-tech-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#05080f",
};

export const metadata: Metadata = {
  title: "خالد الحربي | خبير أمن سيبراني معتمد",
  description:
    "خالد محمد الحربي — خبير أمن سيبراني معتمد CPD. خدمات اختبار اختراق، حماية الشبكات، تأمين المواقع، والاستجابة للحوادث الأمنية.",
  keywords: [
    "خالد الحربي",
    "أمن سيبراني",
    "Cyber Security",
    "اختبار اختراق",
    "CPD",
    "حماية الشبكات",
    "خبير أمن",
  ],
  authors: [{ name: "Khalid Al-harbi" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${shareTechMono.variable} antialiased text-fg overflow-x-hidden`}
      >
        <DynamicVideoBackground />
        <I18nProvider>
          {children}
        </I18nProvider>
        <Toaster />
      </body>
    </html>
  );
}
