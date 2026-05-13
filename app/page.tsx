"use client";

import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n/language-context";
import { contactEmail, metrics } from "@/lib/portfolio-data";

export default function Page() {
  const { t } = useTranslation();

  // Map section links to translated labels
  const sectionLinks = [
    { href: "/projects", label: t.nav.projects },
    { href: "/about", label: t.nav.about },
    { href: "/blog", label: t.nav.blog },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <main className="relative overflow-hidden">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl flex-col justify-center px-6 pb-16 pt-12 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
              <Sparkles className="size-4 text-primary" />
              {t.hero.subtitle}
            </div>
            <div className="space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
                Portfolio 2026
              </p>
              <h1 className="max-w-4xl text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                {t.hero.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                {t.hero.description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="px-5">
                <Link href="/projects">
                  {t.hero.cta}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-5">
                <Link href="/contact">
                  <Mail className="size-4" />
                  {t.nav.contact}
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 border-t border-border/70 pt-8 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="text-3xl font-semibold tracking-tight text-foreground">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Card className="border-border/70 bg-card/85 shadow-2xl shadow-black/8 backdrop-blur-sm">
            <CardHeader className="space-y-5">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-primary">
                  <Briefcase className="size-4" />
                  {t.about.freelance}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4" />
                  Seoul, KR
                </span>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-semibold tracking-tight">
                  {t.about.capabilities}
                </CardTitle>
                <CardDescription className="text-base leading-7">
                  {t.about.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {sectionLinks.map((section) => (
                  <Link
                    key={section.href}
                    href={section.href}
                    className="rounded-full border border-border/70 bg-background px-3 py-2 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {section.label}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}