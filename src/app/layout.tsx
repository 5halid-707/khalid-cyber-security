import type { Metadata, Viewport } from "next";
import { Cairo, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import DynamicVideoBackground from "@/components/site/dynamic-video-bg";
import { I18nProvider } from "@/components/site/i18n";
import JsonLd from "@/components/site/json-ld";

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

const SITE_URL = "https://khalid-cyber-security.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#05080f",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "خالد الحربي | خبير أمن سيبراني معتمد CPD — السعودية",
  description:
    "خالد محمد الحربي — خبير أمن سيبراني معتمد CPD من المملكة المتحدة. خدمات اختبار اختراق، حماية الشبكات، تأمين المواقع، والاستجابة للحوادث الأمنية في السعودية.",
  keywords: [
    "خالد الحربي",
    "أمن سيبراني",
    "Cyber Security",
    "اختبار اختراق",
    "Penetration Testing",
    "CPD",
    "حماية الشبكات",
    "خبير أمن سيبراني السعودية",
    "Network Security Saudi Arabia",
    "Khalid Al-harbi",
  ],
  authors: [{ name: "Khalid Al-harbi" }],
  creator: "Khalid Al-harbi",
  publisher: "Khalid Al-harbi",
  alternates: {
    canonical: "/",
    languages: {
      "ar-SA": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    title: "خالد الحربي | خبير أمن سيبراني معتمد CPD",
    description:
      "خبير أمن سيبراني معتمد CPD — خدمات اختبار اختراق، حماية الشبكات، تأمين المواقع، والاستجابة للحوادث الأمنية في السعودية.",
    url: SITE_URL,
    siteName: "Khalid Al-harbi — Cyber Security Expert",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "خالد الحربي — خبير أمن سيبراني معتمد CPD",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "خالد الحربي | خبير أمن سيبراني معتمد",
    description:
      "خدمات اختبار اختراق، حماية الشبكات، تأمين المواقع، والاستجابة للحوادث الأمنية.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.jpg", sizes: "120x120", type: "image/jpeg" },
    ],
    shortcut: "/favicon.svg",
    apple: "/icon.jpg",
  },
  manifest: "/favicon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${shareTechMono.variable} antialiased text-fg`}
      >
        <DynamicVideoBackground />
        <I18nProvider>
          <JsonLd />
          {children}
        </I18nProvider>
        <Toaster />
      </body>
    </html>
  );
}
