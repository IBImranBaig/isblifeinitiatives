import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Playfair_Display, Inter } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { RouteScrollManager } from "@/components/providers/RouteScrollManager";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { ScrollPenMount } from "@/components/three/ScrollPenMount";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// High-contrast Didone-style serif for emotional display type.
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
});

// Precise neo-grotesque for interface + body.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://imranbaig.com"),
  title: {
    default: "Imran Baig — The Mind Decoder",
    template: "%s · Imran Baig",
  },
  description:
    "One glance at your handwriting reveals more than 128 aspects of personality and health. Imran Baig — world-renowned graphologist and graphotherapist.",
  openGraph: {
    title: "Imran Baig — The Mind Decoder",
    description:
      "Decode personality, health, and the subconscious through the science of handwriting.",
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Funnel/offer routes (the ebook subdomain and the /tpapaid OTO) are flagged by
  // middleware to render standalone — without the main-site nav/footer/chrome —
  // so they stay distraction-free with no exit links.
  const bareChrome = (await headers()).get("x-bare-chrome") === "1";

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        {bareChrome ? (
          children
        ) : (
          <>
            <AmbientBackground />
            <ScrollPenMount />
            <SmoothScrollProvider>
              <RouteScrollManager />
              <Nav />
              {children}
              <Footer />
            </SmoothScrollProvider>
          </>
        )}
      </body>
    </html>
  );
}
