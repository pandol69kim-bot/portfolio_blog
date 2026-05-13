"use client";

import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

import { PageIntro } from "@/components/portfolio/page-intro";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { contactEmail } from "@/lib/portfolio-data";
import { useTranslation } from "@/lib/i18n/language-context";

const collaborationModes = [
  "Freelance product delivery",
  "Portfolio and landing page builds",
  "Internal tool UI implementation",
  "Longer-term frontend collaboration",
] as const;

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <PageIntro
          eyebrow={t.nav.contact}
          title={t.contact.title}
          description={t.contact.description}
        />

        <Card className="border-border/70 bg-primary text-primary-foreground shadow-2xl shadow-primary/15">
          <CardHeader className="space-y-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-sm text-primary-foreground/80">
              <MapPin className="size-4" />
              Seoul, KR
            </div>
            <CardTitle className="text-3xl font-semibold tracking-tight text-primary-foreground">
              {t.contact.emailTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-base leading-8 text-primary-foreground/85">
              {t.contact.emailDesc}
            </p>
            <div className="flex flex-wrap gap-2">
              {collaborationModes.map((mode) => (
                <span
                  key={mode}
                  className="rounded-full border border-primary-foreground/20 bg-primary-foreground/8 px-3 py-2 text-sm text-primary-foreground"
                >
                  {mode}
                </span>
              ))}
            </div>
            <Button asChild size="lg" variant="secondary" className="px-5">
              <Link href={`mailto:${contactEmail}`}>
                <Mail className="size-4" />
                {contactEmail}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}