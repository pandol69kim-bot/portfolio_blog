"use client";

import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";

import { PageIntro } from "@/components/portfolio/page-intro";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capabilities } from "@/lib/portfolio-data";
import { useTranslation } from "@/lib/i18n/language-context";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <PageIntro
          eyebrow={t.nav.about}
          title={t.about.title}
          description={t.about.description}
        />

        <div className="space-y-6">
          <Card className="border-border/70 bg-card/90 shadow-lg shadow-black/5">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold tracking-tight">
                {t.about.capabilities}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-base leading-8 text-muted-foreground">
                My toolkit centers on Next.js, TypeScript, React, and component
                systems, with enough backend comfort to define schemas, wire APIs,
                and deploy production-ready features without unnecessary overhead.
              </p>
              <div className="flex flex-wrap gap-2">
                {capabilities.map((capability) => (
                  <span
                    key={capability}
                    className="rounded-full border border-border/70 bg-background px-3 py-2 text-sm text-foreground"
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-primary text-primary-foreground shadow-2xl shadow-primary/15">
            <CardContent className="space-y-5 py-8">
              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-sm text-primary-foreground/80">
                <Briefcase className="size-4" />
                {t.about.freelance}
              </div>
              <p className="text-base leading-8 text-primary-foreground/85">
                Recent work has focused on B2B SaaS, e-commerce, and internal tools
                where speed, readability, and maintainability matter more than novelty.
              </p>
              <Button asChild size="lg" variant="secondary" className="w-fit px-5">
                <Link href="/experience">
                  View Experience
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}