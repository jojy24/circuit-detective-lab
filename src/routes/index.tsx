import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Search,
  CircuitBoard,
  Github,
  NotebookPen,
  Wrench,
  Cpu,
  Lock,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
        <CircuitBoard className="h-5 w-5 text-primary" strokeWidth={2.25} />
        <Search
          className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-background p-[1px] text-secondary"
          strokeWidth={2.75}
        />
      </div>
      <span className="text-[15px] font-semibold tracking-tight text-foreground">
        Circuit Detective
      </span>
    </div>
  );
}

function Nav() {
  const links = [
    { label: "Case Files", href: "#cases" },
    { label: "Engineering Notebook", href: "#notebook" },
    { label: "About", href: "#about" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-elevated)]">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            board-01.brd
          </span>
        </div>

        <svg viewBox="0 0 320 200" className="w-full">
          <defs>
            <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path
                d="M 16 0 L 0 0 0 16"
                fill="none"
                stroke="oklch(0.90 0.01 250)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="320" height="200" fill="url(#grid)" rx="8" />

          {/* traces */}
          <g fill="none" stroke="oklch(0.58 0.12 235)" strokeWidth="2" strokeLinecap="round">
            <path d="M40 60 H140 V110 H210" />
            <path d="M40 140 H90 V90 H180" />
            <path d="M220 40 V150 H280" />
          </g>

          {/* pads / joints */}
          <g fill="oklch(0.58 0.12 235)">
            <circle cx="40" cy="60" r="3" />
            <circle cx="140" cy="110" r="3" />
            <circle cx="210" cy="110" r="3" />
            <circle cx="90" cy="90" r="3" />
            <circle cx="180" cy="90" r="3" />
            <circle cx="220" cy="40" r="3" />
            <circle cx="280" cy="150" r="3" />
          </g>

          {/* resistor */}
          <g transform="translate(150 100)">
            <rect x="0" y="0" width="40" height="20" rx="3" fill="oklch(0.72 0.17 48)" />
            <rect x="8" y="0" width="2" height="20" fill="oklch(0.99 0.005 90)" opacity="0.7" />
            <rect x="20" y="0" width="2" height="20" fill="oklch(0.99 0.005 90)" opacity="0.7" />
            <rect x="30" y="0" width="2" height="20" fill="oklch(0.99 0.005 90)" opacity="0.7" />
          </g>

          {/* chip */}
          <g transform="translate(60 40)">
            <rect width="60" height="40" rx="4" fill="oklch(0.30 0.04 250)" />
            <text
              x="30"
              y="24"
              textAnchor="middle"
              fontSize="8"
              fill="oklch(0.99 0.005 90)"
              fontFamily="ui-monospace, monospace"
            >
              MCU-01
            </text>
            <g fill="oklch(0.55 0.03 250)">
              {[0, 12, 24, 36, 48].map((x) => (
                <rect key={"t" + x} x={6 + x} y="-4" width="4" height="4" />
              ))}
              {[0, 12, 24, 36, 48].map((x) => (
                <rect key={"b" + x} x={6 + x} y="40" width="4" height="4" />
              ))}
            </g>
          </g>

          {/* LED (the suspect) */}
          <g transform="translate(260 90)">
            <circle r="10" fill="oklch(0.60 0.22 27 / 0.15)" stroke="oklch(0.60 0.22 27)" strokeWidth="1.5" />
            <circle r="4" fill="oklch(0.60 0.22 27)" />
          </g>

          {/* magnifier */}
          <g transform="translate(230 110)">
            <circle
              r="34"
              fill="oklch(1 0 0 / 0.7)"
              stroke="oklch(0.24 0.03 250)"
              strokeWidth="2.5"
            />
            <line
              x1="24"
              y1="24"
              x2="46"
              y2="46"
              stroke="oklch(0.24 0.03 250)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        </svg>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-destructive" />
            Fault detected · LED node
          </div>
          <span className="font-mono text-[11px] text-muted-foreground">3.3V / 0mA</span>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.58 0.12 235 / 0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse at top, black 40%, transparent 75%)",
        }}
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Interactive engineering cases
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-[3.25rem] md:leading-[1.05]">
            Learn to Think Like an Engineer.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Investigate failures, analyze evidence, and master systematic
            debugging through interactive engineering cases.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-[var(--primary-hover)] hover:shadow-md active:translate-y-px">
              Enter Case File #001
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
              Explore Cases
            </button>
          </div>
        </div>
        <HeroIllustration />
      </div>
    </section>
  );
}

function Philosophy() {
  const items = [
    {
      icon: Search,
      title: "Investigation Over Memorization",
      body: "Learn how engineers diagnose failures instead of only studying systems when they work.",
    },
    {
      icon: Wrench,
      title: "Real Engineering Scenarios",
      body: "Practice troubleshooting inspired by robotics and electronics challenges.",
    },
    {
      icon: NotebookPen,
      title: "Engineering Notebook",
      body: "Track discoveries, hypotheses, and debugging progress.",
    },
  ];
  return (
    <section id="about" className="border-y border-border bg-workspace">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
            Our approach
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built the way engineers actually work.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
                <Icon className="h-5 w-5" strokeWidth={2.25} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CasePreview() {
  return (
    <section id="cases" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
            Featured case
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Start with a real failure.
          </h2>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="grid md:grid-cols-[1.1fr_1fr]">
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-secondary/10 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-secondary">
                Case File #001
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                <Lock className="h-3 w-3" /> Locked
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
              The Silent LED
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Minutes before a robotics competition, the robot indicator LED
              stops working. Find the failure.
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6">
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Difficulty
                </dt>
                <dd className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  Beginner
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Category
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  Electronics Debugging
                </dd>
              </div>
            </dl>

            <button
              disabled
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-semibold text-muted-foreground"
            >
              <Lock className="h-4 w-4" />
              Unlocks soon
            </button>
          </div>

          <div className="relative flex items-center justify-center border-t border-border bg-workspace p-8 md:border-l md:border-t-0">
            <div className="grid w-full max-w-xs gap-3">
              <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Cpu className="h-4 w-4 text-secondary" /> Microcontroller
                </div>
                <span className="text-xs text-success">OK</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Wrench className="h-4 w-4 text-secondary" /> Resistor R7
                </div>
                <span className="text-xs text-muted-foreground">
                  Untested
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Lightbulb className="h-4 w-4 text-destructive" /> Indicator LED
                </div>
                <span className="text-xs font-semibold text-destructive">
                  Failed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="notebook" className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-muted-foreground">
            Open-source engineering education project.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Created by <span className="font-semibold text-foreground">Jana</span>
          <span className="mx-2">·</span>
          <a
            href="https://github.com"
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <CasePreview />
      </main>
      <Footer />
    </div>
  );
}
