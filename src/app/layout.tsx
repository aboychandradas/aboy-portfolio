import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { site } from "@/data/site";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Aboy Systems — Dashboards, CRMs & Business Web Apps",
    template: "%s — Aboy Systems",
  },
  description: site.description,
  keywords: [
    "full-stack developer",
    "Next.js developer",
    "business dashboard",
    "CRM development",
    "workflow automation",
    "admin panel",
    "TypeScript",
    "freelance web developer",
  ],
  authors: [{ name: site.owner }],
  creator: site.owner,
  openGraph: {
    title: "Aboy Systems — Dashboards, CRMs & Business Web Apps",
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Aboy Systems — Dashboards, CRMs & Business Web Apps",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0e15",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body className="flex min-h-svh flex-col bg-background font-sans text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-brand-foreground"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
