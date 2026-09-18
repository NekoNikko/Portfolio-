import type { Metadata } from "next";
import {
  Space_Grotesk,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
} from "next/font/google";

import "./globals.css";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollRail from "@/components/ScrollRail";
import { getSiteConfig } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

const headingFont = Space_Grotesk({
  variable: "--font-heading-family",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const bodyFont = IBM_Plex_Sans({
  variable: "--font-body-family",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export function generateMetadata(): Metadata {
  const site = getSiteConfig() as {
    name?: string;
    professionalTitle?: string;
    seo?: {
      siteName?: string;
      description?: string;
      keywords?: string[];
    };
  };

  const siteName =
    site.seo?.siteName ??
    "Marlon T. Argente — IT Specialist & Software Support Engineer";

  const description =
    site.seo?.description ??
    "Systems, infrastructure, security, automation and AI-assisted engineering portfolio.";

  return {
    metadataBase: new URL(absoluteUrl("/")),
    title: {
      default: siteName,
      template: `%s — ${site.name ?? "Marlon"}`,
    },
    description,
    keywords: site.seo?.keywords,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName,
      title: siteName,
      description,
      url: absoluteUrl("/"),
    },
    twitter: {
      card: "summary",
      title: siteName,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Nav />
        <ScrollRail />

        <main className="relative z-10 flex-1 w-full pt-16">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}