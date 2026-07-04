import type { Metadata } from "next";
import { Cairo, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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

export const metadata: Metadata = {
  title: "Elite Tech Agency | أمن، برمجة، وتسويق",
  description:
    "وكالة النخبة التقنية - خبراء في الأمن السيبراني، برمجة التطبيقات، والتسويق والتصميم. حلول متكاملة لأعمالك.",
  keywords: [
    "Elite Tech",
    "الأمن السيبراني",
    "برمجة",
    "تسويق",
    "تطبيقات",
    "وكالة تقنية",
  ],
  authors: [{ name: "Elite Tech Agency" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${shareTechMono.variable} antialiased bg-bg text-fg overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
