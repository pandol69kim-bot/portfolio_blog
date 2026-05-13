"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/language-context";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import AuthButton from "@/components/auth-button";

export function SiteHeader() {
  const { t } = useTranslation();

  const navigation = [
    { href: "/projects", label: t.nav.projects },
    { href: "/blog", label: t.nav.blog },
    { href: "/comments", label: t.nav.guestbook },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl flex-col justify-center gap-3 px-6 py-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full border border-border/70 bg-card text-sm font-semibold text-foreground shadow-sm">
              MH
            </span>
            <span className="hidden text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground sm:inline-flex">
              Peter Kim
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <nav aria-label="Primary desktop" className="hidden items-center gap-8 md:flex">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <LanguageToggle />
              <ThemeToggle />
              <AuthButton />
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <nav
          aria-label="Primary mobile"
          className="flex gap-5 overflow-x-auto pb-1 text-sm font-medium text-muted-foreground md:hidden scrollbar-hide"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
