import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { PageTransition } from "@/components/PageTransition";
import { ScrollProgress } from "@/components/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://krishtal.dev"),
  title: {
    default: "Krishtal Budhathoki — Building What Comes Next",
    template: "%s | Krishtal Budhathoki",
  },
  description:
    "Portfolio of Krishtal Budhathoki — A-Level graduate from Kathmandu, Nepal, beginning a journey into cybersecurity, networking, and computer science.",
  keywords: [
    "Krishtal Budhathoki",
    "cybersecurity",
    "networking",
    "computer science",
    "A-Level",
    "Kathmandu",
    "Nepal",
    "portfolio",
    "student",
  ],
  authors: [{ name: "Krishtal Budhathoki" }],
  creator: "Krishtal Budhathoki",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://krishtal.dev",
    siteName: "Krishtal Budhathoki",
    title: "Krishtal Budhathoki — Building What Comes Next",
    description:
      "A-Level graduate from Kathmandu, Nepal, beginning a journey into cybersecurity, networking, and computer science.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Krishtal Budhathoki Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishtal Budhathoki — Building What Comes Next",
    description:
      "A-Level graduate from Kathmandu, Nepal, beginning a journey into cybersecurity, networking, and computer science.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <LoadingScreen />
        <ScrollProgress />
        <Navigation />
        <PageTransition>
          <main id="main-content">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
