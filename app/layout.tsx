import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Antonio, Bricolage_Grotesque, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/data/content";

// Display font for headings, sans for body text. Loaded and self-hosted by Next.js.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

// Tall condensed font for your name, the availability line and the profile links.
const condensed = Antonio({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-antonio",
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: `${site.name} | Software engineer`,
  description: site.summary,
  openGraph: {
    title: `${site.name} | Software engineer`,
    description: site.summary,
    url: site.siteUrl,
    siteName: site.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${condensed.variable} ${body.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
