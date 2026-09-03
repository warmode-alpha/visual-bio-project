import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Reveal, Counter } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arihant Bengani — Finance & Risk Analyst" },
      {
        name: "description",
        content:
          "Portfolio of Arihant Bengani: finance, risk and compliance professional (Tide, JPMorgan Chase) building data tools, dashboards and equity research.",
      },
      { property: "og:title", content: "Arihant Bengani — Finance & Risk Analyst" },
      {
        property: "og:description",
        content:
          "3.4+ years across Tide and JPMorgan Chase. £10M+ risk exposure mitigated, 24,000+ clients screened. Tools, dashboards and research.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "work", label: "Work" },
  { id: "tools", label: "Tools" },
  { id: "education", label: "Education" },
  { id: "beyond", label: "Beyond" },
  { id: "contact", label: "Contact" },
];

const STATS = [
  { value: 10, prefix: "£", suffix: "M+", label: "risk exposure mitigated" },
  { value: 24000, suffix: "+", label: "clients screened for financial crime" },
  { value: 40, suffix: "%", label: "productivity gain via process redesign" },
  { value: 730, suffix: "", label: "GMAT (Q50, V40)" },
];

const ROLES = [
  {
    company: "Tide",
    full: "Tide Platform Technology & Servicing",
    role: "KYX / Re-KYC Analyst",
    period: "Feb 2024 — Jun 2026",
    place: "Hyderabad",
    groups: [
      {
        title: "Operations & process improvement",
        points: [
          "Drove 40% productivity and 15% quality gains through root-cause analysis of bottlenecks and workflow redesign.",
          "Spearheaded end-to-end rollout of an on-call review process, lifting CSAT to 4.4/5.",
          "Improved SLA adherence by redesigning SOPs, removing redundancies and aligning stakeholders.",
        ],
      },
      {
        title: "Risk analysis & regulatory compliance",
        points: [
          "Mitigated £10M+ in potential exposure via hypothesis-driven document reviews and structured risk frameworks.",
          "Executed 2,000+ CDD, EDD and Source of Wealth/Fund reviews, flagging exposure beyond risk appetite.",
          "Offboarded and reported 1,000+ high-risk accounts using data-driven risk profiling and segmentation.",
          "Reduced company-wide risk exposure with FCA-aligned SOPs and quality assurance across operations.",
        ],
      },
    ],
  },
  {
    company: "JPMorgan Chase",
    full: "JP Morgan Chase & Co.",
    role: "GFCC Screening Specialist / Compliance Assistant",
    period: "Jan 2022 — Feb 2023",
    place: "Hyderabad",
    groups: [
      {
        title: "Process transformation",
        points: [
          "Delivered 10% productivity and 4% quality gain by diagnosing production delays and re-engineering screening.",
          "Cleaned vendor-level data logs to remove noise, improving decision accuracy and exposing redundant workflow.",
        ],
      },
      {
        title: "Financial crime risk management",
        points: [
          "Screened 24,000+ clients, blocked 1,000+ accounts and restricted 5,500+ transactions.",
          "Led investigations across 100+ financial crime cases, supporting regulatory reporting and escalations.",
          "Partnered with fraud and compliance teams to uncover suspicious transaction networks across 100+ accounts.",
          "Escalated sanctions, insider trading and illicit fund flow cases for regulatory reporting.",
        ],
      },
    ],
  },
  {
    company: "eFinLadder",
    full: "eFinLadder (Internship)",
    role: "Equity Researcher",
    period: "Jul 2020 — Aug 2020",
    place: "Remote",
    groups: [
      {
        title: "Equity research",
        points: [
          "Shortlisted high-conviction investments by building stock screening models on ROE, ROCE, P/E, EPS and FCF.",
          "Identified opportunities through competitive analysis, industry research and risk-reward assessment.",
        ],
      },
    ],
  },
];

const TOOLS = [
  {
    title: "Interactive Analysis Artifact",
    kind: "Claude Artifact",
    href: "https://claude.ai/public/artifacts/0af509bf-2284-4eec-b5ec-2c531ba27a04",
    blurb:
      "A built-from-scratch interactive artifact turning a business question into an explorable, self-contained web app.",
    tags: ["Prototyping", "AI-assisted build", "Storytelling"],
  },
  {
    title: "Tableau Fire — Dashboard Playground",
    kind: "Live web app",
    href: "https://tableau-fire.lovable.app/",
    blurb:
      "A visual analytics surface for slicing datasets the way a Tableau workbook would, built and shipped on the web.",
    tags: ["Tableau", "Data viz", "Analytics"],
  },
  {
    title: "EMI Calculator",
    kind: "Live web app",
    href: "https://emi-calculator-c59h.bolt.host/",
    blurb:
      "A clean loan amortisation calculator: tenure, rate and principal in, monthly outgo and interest split out.",
    tags: ["Personal finance", "Modelling", "Product"],
  },
];

const EDUCATION = [
  {
    school: "Masters' Union",
    detail: "PGP in Technology & Business Management",
    period: "2026 — Present",
    place: "Gurugram",
    notes: [
      "Pankaj Bansal Scholarship among 400+ students",
      "Runner-up, Startup Weekend",
      "Core member — Masters' Union Investment Fund (₹5 Cr student-led fund)",
      "Core member — Fintech Club",
    ],
  },
  {
    school: "St. Mary's College",
    detail: "Bachelor's in Business Administration — 9.16/10, Rank 3",
    period: "2018 — 2021",
    place: "Hyderabad",
    notes: ["Vice President, Finance Club", "Scholarships incl. 30% fee waiver"],
  },
  {
    school: "St. Mary's Junior College",
    detail: "Commerce, Class XII — 95.8%, Rank 5",
    period: "2017 — 2018",
    place: "Hyderabad",
    notes: ["Merit-based scholarship"],
  },
  {
    school: "St. Andrews High School",
    detail: "Class X — 9.2/10, Top 10%",
    period: "2015 — 2016",
    place: "Hyderabad",
    notes: [],
  },
];

const CERTS = [
  ["Lean Six Sigma Green Belt", "Simplilearn · Apr 2025"],
  ["Building Your Leadership Skills", "HEC Paris · Jun 2024"],
  ["Tableau Certified Data Analyst Training", "Udemy · Jan 2023"],
  ["Country Level Economics", "UIUC · Nov 2022"],
  ["Introduction to Corporate Finance", "Wharton, Penn · Dec 2021"],
  ["Quantitative Methods in Finance", "HSE University · Dec 2021"],
];

const SKILLS = {
  Business: [
    "AML",
    "KYC",
    "World Check",
    "World Compliance",
    "LexisNexis",
    "RDC",
    "Passfort",
  ],
  Technical: [
    "Tableau",
    "Power BI",
    "MS Excel",
    "PowerPoint",
    "Data Analysis",
    "Equity Research",
    "Financial Modelling",
  ],
};

const BEYOND = [
  {
    title: "Research paper — Equity analysis & valuation of steel companies",
    meta: "Published by IJNRD (ISSN 2456-4184) · Jun 2023",
    points: [
      "Equity research on industry trends and financial performance using secondary data.",
      "Applied Graham valuation to assess intrinsic value and identify 10–15% potential upside.",
    ],
  },
  {
    title: "Vice President — Finvesta Finance Club",
    meta: "Jan 2020 — Jan 2021",
    points: [
      "Grew the club 4x, from 12 to 50+ students, lifting participation and financial literacy.",
      "Ran quizzes and debates for an inter-college fest featuring 5+ colleges.",
    ],
  },
  {
    title: "Volunteer — Teach For India",
    meta: "Jan 2025 — Mar 2025",
    points: [
      "Taught mathematics to grade 2–4 students at a government primary school.",
      "Organised a specialised learning class for children with dyslexia and led parent-teacher engagement.",
    ],
  },
  {
    title: "Volunteer — World Youth Council",
    meta: "Jun 2020 — Jul 2020",
    points: [
      "Delivered online mathematics classes to students from Mumbai's slum communities.",
      "Helped 15+ children close learning gaps through personalised instruction.",
    ],
  },
];

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-border py-20 md:py-28">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">{title}</h2>
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}

function Portfolio() {
  const [active, setActive] = useState("work");
  const [role, setRole] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const current = ROLES[role];

  return (
    <div className="rule-grid min-h-screen">
      <header
        className={`sticky top-0 z-50 backdrop-blur transition-colors ${
          scrolled ? "border-b border-border bg-background/85" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-lg tracking-wide">
            Arihant<span className="text-primary">.</span>
          </a>
          <ul className="hidden gap-7 text-sm text-muted-foreground md:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className={`link-underline transition-colors hover:text-foreground ${
                    active === n.id ? "text-foreground" : ""
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="mailto:arihant.bengani2027@mastersunion.org"
            className="rounded-full border border-primary/50 px-4 py-1.5 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Get in touch
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-6" id="top">
        {/* Hero */}
        <section className="py-20 md:py-32">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-accent">
              Finance · Risk · Analytics
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-6xl leading-[0.95] md:text-8xl">
              Arihant
              <br />
              <span className="text-brass">Bengani</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Finance and risk professional with 3.4+ years at{" "}
              <span className="text-foreground">Tide</span> and{" "}
              <span className="text-foreground">JPMorgan Chase</span> — mitigating
              £10M+ in exposure, screening 24,000+ clients, and redesigning the
              processes behind 2,000+ CDD/EDD reviews. Now at Masters' Union, building
              tools where finance meets technology.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#tools"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                See what I've built
              </a>
              <a
                href="https://www.linkedin.com/in/arihant-bengani/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border px-5 py-2.5 text-sm transition-colors hover:border-primary hover:text-primary"
              >
                LinkedIn
              </a>
            </div>
          </Reveal>

          <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div>
                  <div className="font-display text-4xl text-primary md:text-5xl">
                    <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 text-sm leading-snug text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Work */}
        <Section id="work" eyebrow="Experience" title="Where I've worked">
          <div className="grid gap-8 md:grid-cols-[minmax(0,220px)_1fr]">
            <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
              {ROLES.map((r, i) => (
                <button
                  key={r.company}
                  onClick={() => setRole(i)}
                  className={`shrink-0 rounded-xl border px-4 py-3 text-left text-sm transition-all md:w-full ${
                    role === i
                      ? "border-primary/60 bg-secondary text-foreground"
                      : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  <span className="block font-medium">{r.company}</span>
                  <span className="mt-0.5 block font-mono text-[11px] opacity-70">
                    {r.period}
                  </span>
                </button>
              ))}
            </div>

            <div key={role} className="surface animate-in fade-in slide-in-from-bottom-2 p-7 duration-500 md:p-9">
              <h3 className="font-display text-2xl">{current.role}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {current.full} · {current.place} · {current.period}
              </p>
              <div className="mt-7 space-y-7">
                {current.groups.map((g) => (
                  <div key={g.title}>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                      {g.title}
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {g.points.map((p) => (
                        <li key={p} className="flex gap-3 text-sm leading-relaxed">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                          <span className="text-muted-foreground">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Tools */}
        <Section id="tools" eyebrow="Artifacts" title="Tools I've built">
          <div className="grid gap-5">
            {TOOLS.map((t, i) => (
              <Reveal key={t.title} delay={i * 90}>
                <a
                  href={t.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group surface block p-7 transition-all hover:-translate-y-1 hover:border-primary/50 md:p-9"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                        {t.kind}
                      </p>
                      <h3 className="mt-3 font-display text-2xl md:text-3xl">
                        {t.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {t.blurb}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {t.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="mt-1 text-2xl text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section id="education" eyebrow="Education" title="How I got here">
          <div className="relative border-l border-border pl-7">
            {EDUCATION.map((e, i) => (
              <Reveal key={e.school} delay={i * 80}>
                <div className="relative pb-10">
                  <span className="absolute -left-[34px] top-2 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-display text-2xl">{e.school}</h3>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {e.period} · {e.place}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-foreground/80">{e.detail}</p>
                  {e.notes.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {e.notes.map((n) => (
                        <li
                          key={n}
                          className="rounded-full bg-secondary px-3 py-1 text-[11px] text-muted-foreground"
                        >
                          {n}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="surface h-full p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                  Certifications
                </p>
                <ul className="mt-4 space-y-3">
                  {CERTS.map(([name, meta]) => (
                    <li key={name} className="text-sm">
                      <span className="block">{name}</span>
                      <span className="text-xs text-muted-foreground">{meta}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="surface h-full p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                  Skills
                </p>
                {Object.entries(SKILLS).map(([group, items]) => (
                  <div key={group} className="mt-5">
                    <p className="text-xs text-muted-foreground">{group}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {items.map((s) => (
                        <span
                          key={s}
                          className="rounded-md border border-border px-2.5 py-1 text-xs transition-colors hover:border-primary hover:text-primary"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
                  GMAT 730 (Q50, V40) · Multiple performance awards at Tide ·
                  Appreciated at the BCIPS national conference for an academic paper
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Beyond */}
        <Section id="beyond" eyebrow="Beyond the desk" title="Research, leadership & impact">
          <div className="grid gap-5 md:grid-cols-2">
            {BEYOND.map((b, i) => (
              <Reveal key={b.title} delay={i * 80}>
                <div className="surface h-full p-7 transition-colors hover:border-primary/40">
                  <h3 className="font-display text-xl leading-snug">{b.title}</h3>
                  <p className="mt-1 font-mono text-[11px] text-accent">{b.meta}</p>
                  <ul className="mt-4 space-y-2">
                    {b.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" eyebrow="Contact" title="Let's talk">
          <Reveal>
            <div className="surface p-8 md:p-12">
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                Open to conversations on risk, compliance, fintech products and
                anything data-driven in finance.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    label: "Email",
                    value: "arihant.bengani2027@mastersunion.org",
                    href: "mailto:arihant.bengani2027@mastersunion.org",
                  },
                  { label: "Phone", value: "+91 89193 30532", href: "tel:+918919330532" },
                  {
                    label: "LinkedIn",
                    value: "/in/arihant-bengani",
                    href: "https://www.linkedin.com/in/arihant-bengani/",
                  },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group rounded-xl border border-border p-4 transition-colors hover:border-primary/60"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                      {c.label}
                    </p>
                    <p className="mt-2 break-words text-sm transition-colors group-hover:text-primary">
                      {c.value}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </Section>

        <footer className="border-t border-border py-10 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Arihant Bengani · Hyderabad / Gurugram
        </footer>
      </main>
    </div>
  );
}
