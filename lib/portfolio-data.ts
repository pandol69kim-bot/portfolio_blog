export const projects = [
  {
    title: "OpsBoard Analytics",
    summary:
      "Operational dashboard for logistics teams with real-time KPI tiles, route risk alerts, and weekly reporting automation.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    outcome: "Reduced manual reporting time by 68% across three regions.",
  },
  {
    title: "Studio Commerce",
    summary:
      "Headless storefront focused on premium product launches, editorial storytelling, and conversion-focused checkout flows.",
    stack: ["React", "Next.js", "Stripe", "Sanity"],
    outcome: "Lifted launch-week conversion by 22% with faster landing pages.",
  },
  {
    title: "Signal CRM",
    summary:
      "Internal sales workspace combining pipeline visibility, activity capture, and account health scoring in one interface.",
    stack: ["TypeScript", "Node.js", "Prisma", "Vercel"],
    outcome: "Unified fragmented tooling and shortened response latency for leads.",
  },
] as const;

export const experience = [
  {
    period: "2024 - Present",
    role: "Senior Frontend Engineer",
    company: "Independent / Contract",
    description:
      "Designing product-facing web applications with a strong bias toward fast delivery, clear UX, and maintainable systems.",
  },
  {
    period: "2021 - 2024",
    role: "Full Stack Developer",
    company: "Product Studio",
    description:
      "Built internal platforms and customer experiences spanning admin tools, e-commerce, and marketing sites.",
  },
  {
    period: "2018 - 2021",
    role: "Frontend Developer",
    company: "Digital Agency",
    description:
      "Delivered responsive interfaces and component systems for launch-driven brand and content websites.",
  },
] as const;

export const capabilities = [
  "Product UI architecture",
  "Design system implementation",
  "API integration",
  "Performance optimization",
  "Accessibility and responsive design",
  "Frontend mentoring",
] as const;

export const metrics = [
  { value: "8+", label: "years building web products" },
  { value: "30+", label: "launches shipped end-to-end" },
  { value: "95", label: "Lighthouse scores targeted on core pages" },
] as const;

export const contactEmail = "hello@marshallhan.dev";

export const sectionLinks = [
  {
    href: "/projects",
    label: "Projects",
    description: "Case studies centered on measurable product outcomes.",
  },
  {
    href: "/about",
    label: "About",
    description: "Working style, technical range, and collaboration approach.",
  },
  {
    href: "/experience",
    label: "Experience",
    description: "Roles shaped by shipping across product, studio, and agency work.",
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Availability, engagement types, and the fastest way to reach out.",
  },
] as const;