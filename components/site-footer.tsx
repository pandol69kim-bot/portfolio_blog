"use client";

import { useTranslation } from "@/lib/i18n/language-context";

export function SiteFooter() {
  const { mounted } = useTranslation();

  if (!mounted) return null;

  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-muted-foreground sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <p>Marshall Han Portfolio</p>
        <p>Built with Next.js 16, React 19, TypeScript, and shadcn/ui.</p>
      </div>
    </footer>
  );
}
