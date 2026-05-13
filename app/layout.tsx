import type { Metadata } from "next";
import { Fraunces, Geist_Mono, Manrope } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { cn } from "@/lib/utils";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Marshall Han | Full-stack Developer",
  description:
    "Portfolio for Marshall Han, a full-stack developer building high-clarity web products with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full scroll-smooth antialiased",
        manrope.variable,
        fraunces.variable,
        geistMono.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <LanguageProvider>
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </LanguageProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
