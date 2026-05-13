type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
        {eyebrow}
      </p>
      <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
        {description}
      </p>
    </div>
  );
}