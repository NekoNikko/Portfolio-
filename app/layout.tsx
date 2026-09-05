import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getSiteConfig } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

  const siteName = site.seo?.siteName ?? "Live Agentic Engineering Portfolio";
  const description =
    site.seo?.description ??
    "A living engineering portfolio: real projects, engineering journal, case studies and the AI-assisted workflow behind them.";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Subtle technical grid behind everything */}
        <div aria-hidden="true" className="grid-backdrop fixed inset-0 z-0" />
        <Nav />
        <main className="relative z-10 flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}