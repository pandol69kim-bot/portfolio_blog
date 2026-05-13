"use client";

import Link from "next/link";
import { ArrowRight, Globe, Mail } from "lucide-react";

import { PageIntro } from "@/components/portfolio/page-intro";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { contactEmail, projects } from "@/lib/portfolio-data";
import { useTranslation } from "@/lib/i18n/language-context";

export default function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-12">
      <div className="space-y-12">
        <PageIntro
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          description={t.projects.description}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="h-full border-border/70 bg-card/90 shadow-lg shadow-black/5"
            >
              <CardHeader className="space-y-4">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-secondary-foreground">
                  <Globe className="size-3.5" />
                  {t.projects.caseStudy}
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-xl font-semibold">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="leading-7">
                    {project.summary}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-7 text-foreground">
                  {project.outcome}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-border/70 pt-8 sm:flex-row">
          <Button asChild size="lg" className="px-5">
            <Link href="/contact">
              {t.projects.startProject}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-5">
            <Link href={`mailto:${contactEmail}`}>
              <Mail className="size-4" />
              {contactEmail}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}