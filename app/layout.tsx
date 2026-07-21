import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, Sora, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://nsartgateway.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NSART · Technology Interaction",
    template: "%s · NSART",
  },
  description:
    "Deep-tech ventures from Central Asia to the world. R&D, intellectual property, and investment infrastructure across Kazakhstan, Saudi Arabia, and Africa.",
  keywords: [
    "NSART",
    "deep tech",
    "Kazakhstan",
    "Saudi Arabia",
    "data center",
    "GovTech",
    "AI",
    "Miras Accelerator",
    "ESG",
    "intellectual property",
  ],
  openGraph: {
    title: "NSART · Technology Interaction",
    description:
      "Deep-tech ventures from Central Asia to the world — R&D, intellectual property, and investment infrastructure.",
    type: "website",
    siteName: "NSART",
    url: "/",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NSART · Technology Interaction",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NSART · Technology Interaction",
    description:
      "Deep-tech ventures from Central Asia to the world — R&D, intellectual property, and investment infrastructure.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const host = (await headers()).get("host")?.split(":")[0];
  const isAixcHost = host === "aixc.nsartgateway.com";

  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${sora.variable} ${plexArabic.variable} antialiased`}
    >
      <body className="min-h-dvh bg-white text-ink">
        {isAixcHost ? (
          children
        ) : (
          <LanguageProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </LanguageProvider>
        )}
      </body>
    </html>
  );
}
