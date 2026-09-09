import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import portraitAsset from "@/assets/portrait.png.asset.json";
import { Reveal, Counter } from "@/components/Reveal";
import {
  Preloader,
  CustomCursor,
  GrainOverlay,
  ScrollProgress,
  Magnetic,
  TiltCard,
  Marquee,
  SplitText,
  Typewriter,
  ScrambleText,
  useParallax,
  CommandPalette,
  LiveClock,
  CopyText,
  type CommandItem,
} from "@/components/interactive";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arihant Bengani — Risk, Compliance & Data" },
      {
        name: "description",
        content:
          "Portfolio of Arihant Bengani: finance, risk and compliance professional (Tide, JPMorgan Chase) building data tools, dashboards and equity research.",
      },
      { property: "og:title", content: "Arihant Bengani — Risk, Compliance & Data" },
      {
        property: "og:description",
        content:
          "3.4+ years across Tide and JPMorgan Chase. £10M+ risk exposure mitigated, 24,000+ clients screened. Tools, dashboards and research.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:image", content: portraitAsset.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: portraitAsset.url },
    ],
  }),
  component: Portfolio,
});

const EMAIL = "arihant.bengani2027@mastersunion.org";
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}`;
const PORTRAIT_SRC = portraitAsset.url;

const NAV = [
  { id: "work", label: "Work", hint: "1" },
  { id: "tools", label: "Tools", hint: "2" },
  { id: "education", label: "Education", hint: "3" },
  { id: "beyond", label: "Beyond", hint: "4" },
  { id: "contact", label: "Contact", hint: "5" },
];

const STATS: { value: number; prefix?: string; suffix: string; label: string }[] = [
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
    span: "md:col-span-4",
  },
  {
    title: "Tableau Fire — Dashboard Playground",
    kind: "Live web app",
    href: "https://tableau-fire.lovable.app/",
    blurb:
      "A visual analytics surface for slicing datasets the way a Tableau workbook would, built and shipped on the web.",
    tags: ["Tableau", "Data viz"],
    span: "md:col-span-2",
  },
  {
    title: "EMI Calculator",
    kind: "Live web app",
    href: "https://emi-calculator-c59h.bolt.host/",
    blurb:
      "A clean loan amortisation calculator: tenure, rate and principal in, monthly outgo and interest split out.",
    tags: ["Personal finance", "Modelling"],
    span: "md:col-span-2",
  },
  {
    title: "Spend Savvy",
    kind: "Live web app",
    href: "https://spend-savvy-1.lovable.app",
    blurb:
      "A personal spending tracker that turns daily expenses into clear insights and smarter budgeting habits.",
    tags: ["Personal finance", "Budgeting", "Product"],
    span: "md:col-span-4",
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
  Business: ["AML", "KYC", "World Check", "World Compliance", "LexisNexis", "RDC", "Passfort"],
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

const TICKER_ITEMS = [
  "AML SCREENING",
  "KYC / RE-KYC",
  "SANCTIONS SCREENING",
  "TABLEAU",
  "POWER BI",
  "FINANCIAL MODELLING",
  "EQUITY RESEARCH",
  "PROCESS REDESIGN",
  "RISK FRAMEWORKS",
  "DATA ANALYSIS",
];

const TYPE_WORDS = [
  "Risk & Compliance Analyst",
  "KYC / AML Specialist",
  "Process Redesigner",
  "Data-Driven Finance Builder",
  "Equity Research Enthusiast",
];

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

const COMMANDS: CommandItem[] = [
  ...NAV.map((n) => ({
    id: n.id,
    label: n.label,
    group: "Sections",
    href: `#${n.id}`,
    hint: n.hint,
  })),
  {
    id: "email",
    label: "Email me",
    group: "Actions",
    href: "mailto:arihant.bengani2027@mastersunion.org",
    hint: "M",
    external: false,
  },
  {
    id: "linkedin",
    label: "Open LinkedIn ↗",
    group: "Actions",
    href: "https://www.linkedin.com/in/arihant-bengani/",
    hint: "L",
    external: true,
  },
  {
    id: "artifact",
    label: "Interactive Analysis Artifact ↗",
    group: "Projects",
    href: "https://claude.ai/public/artifacts/0af509bf-2284-4eec-b5ec-2c531ba27a04",
    hint: "↗",
    external: true,
  },
  {
    id: "tableau-fire",
    label: "Tableau Fire ↗",
    group: "Projects",
    href: "https://tableau-fire.lovable.app/",
    hint: "↗",
    external: true,
  },
];

function Section({
  id,
  numeral,
  eyebrow,
  title,
  children,
}: {
  id: string;
  numeral: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-24 border-t border-border py-20 md:py-28">
      <span className="ghost-numeral" aria-hidden="true">
        {numeral}
      </span>
      <Reveal className="relative">
        <p className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
          <span className="opacity-60">{numeral}</span>
          <span aria-hidden="true" className="h-px w-10 bg-primary/50" />
          <ScrambleText text={eyebrow} trigger="view" />
        </p>
        <h2 className="mt-4 font-display text-5xl uppercase leading-none md:text-7xl">{title}</h2>
      </Reveal>
      <div className="relative mt-12">{children}</div>
    </section>
  );
}

function Portrait() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="portrait-frame aspect-[4/5] w-full max-w-[340px] justify-self-center md:max-w-none">
      {failed ? (
        <div className="portrait-mono h-full w-full text-[7rem]" aria-hidden="true">
          AB
        </div>
      ) : (
        <img
          src={PORTRAIT_SRC}
          alt="Portrait of Arihant Bengani"
          className="portrait-img"
          loading="eager"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      <div className="portrait-chip">
        <span>
          ID — <span className="text-foreground">ARIHANT.BENGANI</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="ok-dot" aria-hidden="true" />
          VERIFIED
        </span>
      </div>
    </div>
  );
}

function Portfolio() {
  const [revealed, setRevealed] = useState(false);
  const [active, setActive] = useState("work");
  const [openRoles, setOpenRoles] = useState<Set<number>>(() => new Set([0]));
  const [cmdOpen, setCmdOpen] = useState(false);

  const handleReveal = useCallback(() => setRevealed(true), []);

  const heroParallax = useParallax<HTMLDivElement>(28);

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      const hit = NAV.find((n) => n.hint === e.key);
      if (hit) {
        document.getElementById(hit.id)?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleRole = (i: number) => {
    setOpenRoles((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  return (
    <div className="rule-grid relative min-h-screen overflow-x-clip">
      <div className="crt" aria-hidden="true" />
      <Preloader name="ARIHANT BENGANI // PORTFOLIO" onReveal={handleReveal} />
      <CustomCursor />
      <GrainOverlay />
      <ScrollProgress />
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} items={COMMANDS} />

      {/* Top nav bar */}
      <header className="nav-bar fixed inset-x-0 top-0 z-50">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3.5">
          <a href="#top" className="font-mono text-sm font-semibold tracking-[0.2em]">
            AB<span className="text-primary">_</span>RISK/DATA
          </a>
          <ul className="hidden items-center gap-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground md:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className={`link-underline transition-colors hover:text-foreground ${
                    active === n.id ? "text-primary" : ""
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              className="hidden items-center gap-2 border border-input px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary hover:text-foreground sm:flex"
              aria-label="Open command menu"
            >
              <span>⌘K</span>
            </button>
            <Magnetic strength={0.25}>
              <a href="#contact" className="btn-primary !px-4 !py-1.5 !text-[11px]">
                Get in touch
              </a>
            </Magnetic>
          </div>
        </nav>
      </header>

      <main className="relative mx-auto max-w-6xl px-6 pt-16" id="top">
        {/* Hero */}
        <section className="relative flex min-h-[92svh] flex-col justify-center py-24 md:py-32">
          <div ref={heroParallax} className="min-w-0">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
                <span className="text-primary">$</span>{" "}
                <ScrambleText text="whoami — finance · risk · analytics" trigger="view" />
              </p>
            </Reveal>

            <div className="mt-7 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
              <h1 className="font-display uppercase leading-[0.88] text-[clamp(3.4rem,12vw,9.5rem)]">
                <SplitText text="Arihant" active={revealed} delay={150} className="acid-shimmer" />
                <br />
                <span className="text-outline">
                  <SplitText text="Bengani" active={revealed} delay={420} />
                </span>
              </h1>
              <Reveal delay={760} className="shrink-0">
                <div className="w-32 sm:w-40 md:w-44 lg:w-52">
                  <Portrait />
                </div>
              </Reveal>
            </div>

            <Reveal delay={840}>
              <p className="mt-7 font-mono text-sm text-accent md:text-base">
                <Typewriter words={TYPE_WORDS} />
              </p>
            </Reveal>
            <Reveal delay={920}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Finance and risk professional with 3.4+ years at{" "}
                <span className="text-foreground">Tide</span> and{" "}
                <span className="text-foreground">JPMorgan Chase</span> — mitigating £10M+ in
                exposure, screening 24,000+ clients, and redesigning the processes behind 2,000+
                CDD/EDD reviews. Now at Masters' Union, building tools where finance meets
                technology.
              </p>
            </Reveal>
            <Reveal delay={1000}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Magnetic strength={0.15}>
                  <a href="#work" className="btn-primary">
                    See the work ↓
                  </a>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <a
                    href="https://www.linkedin.com/in/arihant-bengani/"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost"
                  >
                    LinkedIn ↗
                  </a>
                </Magnetic>
                <span className="ml-1 inline-flex items-center gap-2 border border-input px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  Status: open to conversations
                </span>
              </div>
            </Reveal>

            <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={1060 + i * 90}>
                  <div className="border-t border-border pt-4">
                    <div className="font-display text-4xl text-primary md:text-5xl">
                      <Counter to={s.value} prefix={s.prefix ?? ""} suffix={s.suffix} />
                    </div>
                    <p className="mt-2 font-mono text-xs leading-snug text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={1420}>
            <div className="mt-16 flex items-center gap-4">
              <div className="scroll-hint" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                scroll
              </span>
            </div>
          </Reveal>
        </section>

        {/* Terminal ticker */}
        <div className="-mx-6 border-y border-border py-3 md:-mx-12">
          <Marquee duration={38}>
            {TICKER_ITEMS.map((item) => (
              <span
                key={item}
                className="mx-4 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground"
              >
                <span className="text-primary">▸</span>
                {item}
                <span className="text-muted-foreground/40">//</span>
              </span>
            ))}
          </Marquee>
        </div>

        {/* Work — accordion rows */}
        <Section id="work" numeral="01" eyebrow="Experience" title="Where I've worked">
          <div>
            {ROLES.map((r, i) => {
              const open = openRoles.has(i);
              return (
                <Reveal key={r.company} delay={i * 60}>
                  <div className="acc-row" data-open={open}>
                    <button
                      type="button"
                      className="acc-head"
                      onClick={() => toggleRole(i)}
                      aria-expanded={open}
                    >
                      <span className="acc-index">{String(i + 1).padStart(2, "0")}</span>
                      <span className="acc-title">{r.company}</span>
                      <span className="acc-plus" aria-hidden="true">
                        +
                      </span>
                    </button>
                    <div className="acc-body" data-open={open}>
                      <div>
                        <div className="px-1 pb-8 md:pl-[4.5rem]">
                          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                            {r.role}
                          </p>
                          <p className="mt-1 font-mono text-xs text-muted-foreground">
                            {r.full} · {r.place} · {r.period}
                          </p>
                          <div className="mt-6 grid gap-6 lg:grid-cols-2">
                            {r.groups.map((g) => (
                              <div key={g.title}>
                                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                                  {g.title}
                                </p>
                                <ul className="mt-3 space-y-2.5">
                                  {g.points.map((p) => (
                                    <li key={p} className="flex gap-3 text-sm leading-relaxed">
                                      <span className="mt-2 h-1 w-1 shrink-0 bg-primary" />
                                      <span className="text-muted-foreground">{p}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Section>

        {/* Tools — bento grid */}
        <Section id="tools" numeral="02" eyebrow="Artifacts" title="Tools I've built">
          <div className="grid gap-5 md:grid-cols-6">
            {TOOLS.map((t, i) => (
              <Reveal key={t.title} delay={i * 90} className={t.span}>
                <TiltCard className="surface acid-edge group h-full p-7 md:p-8">
                  <a
                    href={t.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-full flex-col items-start justify-between gap-6"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                          {t.kind}
                        </p>
                        <p className="font-mono text-[11px] text-muted-foreground/60">T-0{i + 1}</p>
                      </div>
                      <h3 className="mt-3 font-display text-2xl uppercase md:text-3xl">
                        {t.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {t.blurb}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {t.tags.map((tag) => (
                          <span
                            key={tag}
                            className="border border-input px-3 py-1 font-mono text-[11px] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="mt-2 font-mono text-2xl text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </a>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section id="education" numeral="03" eyebrow="Education" title="How I got here">
          <div className="relative border-l border-border pl-8">
            {EDUCATION.map((e, i) => (
              <Reveal key={e.school} delay={i * 80}>
                <div className="relative pb-10">
                  <span
                    className="timeline-dot h-2.5 w-2.5"
                    style={{ left: "-37px", top: "8px" }}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-display text-2xl uppercase">{e.school}</h3>
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
                          className="bg-secondary px-3 py-1 font-mono text-[11px] text-muted-foreground"
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
                      <span className="font-mono text-xs text-muted-foreground">{meta}</span>
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
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      {group}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {items.map((s) => (
                        <span
                          key={s}
                          className="border border-input px-2.5 py-1 font-mono text-xs transition-colors hover:border-primary hover:text-primary"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="mt-6 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
                  GMAT 730 (Q50, V40) · Multiple performance awards at Tide · Appreciated at the
                  BCIPS national conference for an academic paper
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Beyond */}
        <Section id="beyond" numeral="04" eyebrow="Beyond the desk" title="Research & impact">
          <div className="grid gap-5 md:grid-cols-2">
            {BEYOND.map((b, i) => (
              <Reveal key={b.title} delay={i * 80}>
                <TiltCard className="surface acid-edge h-full p-7" max={4}>
                  <h3 className="font-display text-xl uppercase leading-snug">{b.title}</h3>
                  <p className="mt-1 font-mono text-[11px] text-accent">{b.meta}</p>
                  <ul className="mt-4 space-y-2">
                    {b.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-primary" />
                        <span className="text-muted-foreground">{p}</span>
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" numeral="05" eyebrow="Contact" title="Let's talk">
          <Reveal>
            <TiltCard className="surface acid-edge p-8 md:p-14" max={3}>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Have a role, a project, or a question?
              </p>
              <p className="mt-4 font-display text-4xl uppercase leading-[0.95] md:text-6xl">
                Open to conversations on <span className="text-acid">risk, compliance</span> &
                anything data-driven in finance.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Magnetic strength={0.15}>
                  <a href={GMAIL_COMPOSE} target="_blank" rel="noreferrer" className="btn-primary">
                    Email me ↗
                  </a>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <a href={`mailto:${EMAIL}`} className="btn-ghost">
                    Open mail app
                  </a>
                </Magnetic>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="border border-input p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                    Email — click to copy
                  </p>
                  <CopyText
                    value={EMAIL}
                    className="mt-2 block max-w-full text-left font-mono text-sm hover:text-primary"
                  >
                    <span className="break-all">{EMAIL}</span>
                  </CopyText>
                </div>
                <div className="border border-input p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                    Phone — click to copy
                  </p>
                  <CopyText
                    value="+918919330532"
                    className="mt-2 block max-w-full text-left font-mono text-sm hover:text-primary"
                  >
                    +91 89193 30532
                  </CopyText>
                </div>
                <a
                  href="https://www.linkedin.com/in/arihant-bengani/"
                  target="_blank"
                  rel="noreferrer"
                  className="group border border-input p-4 transition-colors hover:border-primary/60"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                    LinkedIn
                  </p>
                  <p className="mt-2 break-words font-mono text-sm transition-colors group-hover:text-primary">
                    /in/arihant-bengani ↗
                  </p>
                </a>
              </div>
            </TiltCard>
          </Reveal>
        </Section>

        {/* Footer */}
        <footer className="border-t border-border pb-10 pt-8">
          <div className="footer-mark text-center">Arihant Bengani</div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Arihant Bengani · Hyderabad / Gurugram</span>
            <span className="hidden items-center gap-2 sm:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Local time — <LiveClock timeZone="Asia/Kolkata" /> IST
            </span>
            <Magnetic strength={0.3}>
              <a
                href="#top"
                aria-label="Back to top"
                className="inline-flex h-10 w-10 items-center justify-center border border-input transition-colors hover:border-primary hover:text-primary"
              >
                ↑
              </a>
            </Magnetic>
          </div>
        </footer>
      </main>
    </div>
  );
}
