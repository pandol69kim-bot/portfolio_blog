"use client";

import { PageIntro } from "@/components/portfolio/page-intro";
import { Card, CardContent } from "@/components/ui/card";
import { experience } from "@/lib/portfolio-data";
import { useTranslation } from "@/lib/i18n/language-context";

export default function ExperiencePage() {
  const { t, mounted } = useTranslation();

  if (!mounted) return null;

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
      <div className="space-y-12">
        <PageIntro
          eyebrow={t.nav.projects}
          title="Roles shaped by shipping, not ceremony."
          description="The through-line has been consistent: build interfaces that reduce friction, help teams make decisions faster, and stay maintainable as products evolve."
        />

        <div className="grid gap-4">
          {experience.map((item) => (
            <Card
              key={`${item.period}-${item.role}`}
              className="border-border/70 bg-card/85 shadow-md shadow-black/5"
            >
              <CardContent className="grid gap-5 py-6 lg:grid-cols-[180px_1fr] lg:items-start">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {item.period}
                </p>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {item.role}
                  </h3>
                  <p className="text-base font-medium text-primary">
                    {item.company}
                  </p>
                  <p className="text-base leading-8 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}