import { createFileRoute, Link } from "@tanstack/react-router";
import { Github, Search, ArrowRight, Lock } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ============================================================
   Playful, physical circuit components (SVG)
   ============================================================ */

function LedBulb({ lit = false, className = "" }: { lit?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 80 110" className={className}>
      <defs>
        <radialGradient id="ledGlow" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor={lit ? "oklch(0.85 0.20 30)" : "oklch(0.55 0.18 27 / 0.35)"} />
          <stop offset="100%" stopColor={lit ? "oklch(0.55 0.22 27)" : "oklch(0.35 0.15 27 / 0.15)"} />
        </radialGradient>
      </defs>
      {/* legs */}
      <rect x="30" y="70" width="3" height="35" fill="oklch(0.75 0.02 90)" />
      <rect x="47" y="70" width="3" height="40" fill="oklch(0.75 0.02 90)" />
      {/* base */}
      <rect x="22" y="62" width="36" height="12" rx="2" fill="oklch(0.35 0.02 250)" />
      {/* bulb */}
      <path
        d="M 20 60 Q 20 20 40 12 Q 60 20 60 60 Z"
        fill="url(#ledGlow)"
        stroke="oklch(0.30 0.05 27)"
        strokeWidth="1.5"
      />
      {/* highlight */}
      <ellipse cx="30" cy="30" rx="5" ry="12" fill="oklch(1 0 0 / 0.35)" />
      {lit && <circle cx="40" cy="42" r="24" fill="oklch(0.85 0.22 27 / 0.25)" />}
    </svg>
  );
}

function Resistor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 60" className={className}>
      {/* leads */}
      <line x1="0" y1="30" x2="40" y2="30" stroke="oklch(0.75 0.02 90)" strokeWidth="3" />
      <line x1="160" y1="30" x2="200" y2="30" stroke="oklch(0.75 0.02 90)" strokeWidth="3" />
      {/* body */}
      <rect x="40" y="14" width="120" height="32" rx="16" fill="var(--resistor-body)" stroke="oklch(0.45 0.06 60)" strokeWidth="1.5" />
      {/* bands */}
      <rect x="62" y="14" width="6" height="32" fill="oklch(0.30 0.05 30)" />
      <rect x="80" y="14" width="6" height="32" fill="var(--wire-red)" />
      <rect x="98" y="14" width="6" height="32" fill="oklch(0.55 0.15 60)" />
      <rect x="128" y="14" width="6" height="32" fill="var(--wire-yellow)" />
    </svg>
  );
}

function Capacitor({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 120" className={className}>
      <rect x="42" y="80" width="3" height="35" fill="oklch(0.75 0.02 90)" />
      <rect x="52" y="80" width="3" height="35" fill="oklch(0.75 0.02 90)" />
      <ellipse cx="45" cy="45" rx="35" ry="40" fill="oklch(0.35 0.12 265)" stroke="oklch(0.20 0.08 265)" strokeWidth="1.5" />
      <path d="M 22 40 Q 45 25 68 40" stroke="oklch(1 0 0 / 0.5)" strokeWidth="6" fill="none" strokeLinecap="round" />
      <text x="45" y="55" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700" fill="oklch(0.95 0.005 90)">
        100μF
      </text>
      <text x="45" y="70" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="oklch(0.85 0.02 90)">
        16V
      </text>
    </svg>
  );
}

function ChipDip({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 120" className={className}>
      {/* body */}
      <rect x="20" y="20" width="180" height="80" rx="6" fill="oklch(0.20 0.02 250)" />
      {/* notch */}
      <circle cx="35" cy="35" r="5" fill="oklch(0.10 0.02 250)" />
      <path d="M 100 20 A 10 10 0 0 1 120 20" fill="oklch(0.10 0.02 250)" />
      {/* pins */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <g key={i}>
          <rect x={30 + i * 22} y="4" width="10" height="16" fill="oklch(0.78 0.02 90)" />
          <rect x={30 + i * 22} y="100" width="10" height="16" fill="oklch(0.78 0.02 90)" />
        </g>
      ))}
      <text x="110" y="65" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="14" fontWeight="700" fill="oklch(0.95 0.005 90)">
        ATmega328P
      </text>
      <text x="110" y="82" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="oklch(0.70 0.02 90)">
        AU 2438
      </text>
    </svg>
  );
}

function Wire({
  d,
  color = "var(--wire-red)",
  width = 5,
}: {
  d: string;
  color?: string;
  width?: number;
}) {
  return (
    <>
      <path d={d} stroke="oklch(0 0 0 / 0.15)" strokeWidth={width + 1} fill="none" strokeLinecap="round" transform="translate(1,2)" />
      <path d={d} stroke={color} strokeWidth={width} fill="none" strokeLinecap="round" />
    </>
  );
}

/* ============================================================
   Layout pieces
   ============================================================ */

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-primary shadow-[var(--shadow-paper)] rotate-[-4deg]">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round">
            <path d="M4 12h3l2-4 3 8 2-4h6" />
          </svg>
        </div>
        <div className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-card ring-1 ring-border">
          <Search className="h-3.5 w-3.5 text-secondary" strokeWidth={2.75} />
        </div>
      </div>
      <div className="leading-tight">
        <div className="font-editorial text-xl italic text-foreground">Circuit Detective</div>
        <div className="font-tech text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          lab / v0.1
        </div>
      </div>
    </div>
  );
}

function Nav() {
  const links = [
    { label: "Case Files", href: "#cases" },
    { label: "Notebook", href: "#notebook" },
    { label: "About", href: "#about" },
  ];
  return (
    <header className="relative z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-6">
        <Brand />
        <nav className="hidden items-center gap-1 rounded-full border border-border bg-card/80 p-1.5 shadow-[var(--shadow-paper)] backdrop-blur md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full px-4 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com"
            className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-transform hover:-translate-y-px"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ---------- Hero: the workbench ---------- */

function Workbench() {
  return (
    <div className="relative">
      {/* corkboard / bench frame */}
      <div className="relative overflow-hidden rounded-[28px] border border-border bg-workbench p-6 shadow-[var(--shadow-lifted)] sm:p-10">
        {/* tape corners */}
        <div className="absolute -top-3 left-10 h-6 w-24 rotate-[-6deg] rounded-sm" style={{ background: "var(--tape)" }} />
        <div className="absolute -top-3 right-14 h-6 w-20 rotate-[7deg] rounded-sm" style={{ background: "var(--tape)" }} />

        {/* header strip */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-foreground/15 pb-4">
          <div className="font-tech text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            workbench · board_01.brd
          </div>
          <div className="flex items-center gap-4 font-tech text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> 3.3V
            </span>
            <span>Iₗₑd = <span className="text-destructive">0.00 mA</span></span>
            <span className="hidden sm:inline">t = 00:42</span>
          </div>
        </div>

        {/* the circuit scene */}
        <div className="relative mx-auto aspect-[16/10] w-full max-w-2xl">
          <svg viewBox="0 0 800 500" className="absolute inset-0 h-full w-full">
            {/* wires */}
            <Wire d="M 130 130 C 220 130, 260 190, 340 190" color="var(--wire-red)" />
            <Wire d="M 130 380 C 240 380, 300 320, 420 320" color="var(--wire-blue)" />
            <Wire d="M 500 190 C 590 190, 620 250, 660 250" color="var(--wire-yellow)" />
            <Wire d="M 560 320 C 620 320, 640 260, 660 260" color="var(--wire-green)" />

            {/* solder joints */}
            {[
              [130, 130],
              [340, 190],
              [500, 190],
              [660, 250],
              [130, 380],
              [420, 320],
              [560, 320],
            ].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="8" fill="oklch(0.75 0.03 90)" />
                <circle cx={x} cy={y} r="4" fill="oklch(0.40 0.02 250)" />
              </g>
            ))}

            {/* annotation callout */}
            <g>
              <path d="M 690 210 C 720 170, 740 150, 760 130" stroke="var(--ink)" strokeWidth="1.5" fill="none" strokeDasharray="3 4" />
              <text x="700" y="120" fontFamily="Instrument Serif" fontStyle="italic" fontSize="20" fill="var(--ink)">
                suspect?
              </text>
              <text x="700" y="140" fontFamily="Instrument Serif" fontStyle="italic" fontSize="14" fill="var(--muted-foreground)">
                check R7 →
              </text>
            </g>
          </svg>

          {/* components floating on the bench */}
          <div className="absolute" style={{ left: "3%", top: "12%" }}>
            <ChipDip className="w-44" />
          </div>
          <div className="absolute rotate-[-8deg]" style={{ left: "34%", top: "26%" }}>
            <Resistor className="w-40" />
            <div className="mt-1 pl-2 font-tech text-[10px] uppercase tracking-widest text-muted-foreground">R7 · 220Ω</div>
          </div>
          <div className="absolute" style={{ left: "9%", bottom: "6%" }}>
            <Capacitor className="w-16" />
          </div>
          <div className="absolute" style={{ right: "6%", top: "36%" }}>
            <LedBulb className="w-20" />
            <div className="mt-1 text-center font-tech text-[10px] uppercase tracking-widest text-destructive">LED · silent</div>
          </div>
        </div>

        {/* footer readout */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-foreground/15 pt-4 font-tech text-[11px] uppercase tracking-widest text-muted-foreground">
          <span>components: <span className="text-foreground">04</span></span>
          <span>faults: <span className="text-destructive">01</span></span>
          <span>hypotheses: <span className="text-foreground">02</span></span>
          <span>coverage: <span className="text-success">42%</span></span>
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
          backgroundImage: "radial-gradient(oklch(0.22 0.02 250 / 0.08) 1px, transparent 1.2px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse at top, black 45%, transparent 80%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground shadow-[var(--shadow-paper)]">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Case File #001 · now open for investigation
          </div>
          <h1 className="font-editorial text-5xl leading-[1.02] text-foreground sm:text-6xl md:text-[5.25rem]">
            Learn to think{" "}
            <em className="text-primary">like an engineer</em>.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Investigate failures, analyze evidence, and master systematic
            debugging through hands-on interactive engineering cases.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-paper)] transition-all hover:bg-[var(--primary-hover)] hover:-translate-y-0.5">
              Enter Case File #001
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              Explore cases
            </button>
          </div>
        </div>

        <div className="mt-14">
          <Workbench />
        </div>
      </div>
    </section>
  );
}

/* ---------- Philosophy: three notebook pages ---------- */

const notes = [
  {
    tape: "left" as const,
    kicker: "principle_01",
    title: "Investigation over memorization",
    body: "Learn how engineers diagnose failures instead of only studying systems when they work.",
    doodle: (
      <svg viewBox="0 0 120 80" className="h-16 w-full">
        <path d="M10 40 Q 30 10, 60 40 T 110 40" fill="none" stroke="var(--wire-blue)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="60" cy="40" r="14" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <line x1="70" y1="50" x2="82" y2="62" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tape: "right" as const,
    kicker: "principle_02",
    title: "Real engineering scenarios",
    body: "Practice troubleshooting inspired by real robotics and electronics competition failures.",
    doodle: (
      <svg viewBox="0 0 120 80" className="h-16 w-full">
        <rect x="20" y="20" width="80" height="40" rx="4" fill="none" stroke="var(--pcb-green)" strokeWidth="1.8" />
        <line x1="20" y1="35" x2="10" y2="35" stroke="var(--wire-red)" strokeWidth="2.5" />
        <line x1="20" y1="50" x2="10" y2="50" stroke="var(--wire-yellow)" strokeWidth="2.5" />
        <circle cx="40" cy="40" r="4" fill="var(--primary)" />
        <circle cx="60" cy="40" r="4" fill="var(--wire-blue)" />
        <circle cx="80" cy="40" r="4" fill="var(--success)" />
      </svg>
    ),
  },
  {
    tape: "left" as const,
    kicker: "principle_03",
    title: "Engineering notebook",
    body: "Track discoveries, hypotheses, and debugging progress the way real engineers do.",
    doodle: (
      <svg viewBox="0 0 120 80" className="h-16 w-full">
        <line x1="10" y1="20" x2="110" y2="20" stroke="var(--rule-line)" strokeWidth="1" />
        <line x1="10" y1="35" x2="110" y2="35" stroke="var(--rule-line)" strokeWidth="1" />
        <line x1="10" y1="50" x2="110" y2="50" stroke="var(--rule-line)" strokeWidth="1" />
        <line x1="10" y1="65" x2="110" y2="65" stroke="var(--rule-line)" strokeWidth="1" />
        <text x="14" y="32" fontFamily="Instrument Serif" fontStyle="italic" fontSize="14" fill="var(--ink)">hypothesis:</text>
        <text x="14" y="47" fontFamily="Instrument Serif" fontStyle="italic" fontSize="14" fill="var(--foreground)">R7 open ✗</text>
        <text x="14" y="62" fontFamily="Instrument Serif" fontStyle="italic" fontSize="14" fill="var(--primary)">solder cold ✓</text>
      </svg>
    ),
  },
];

function Philosophy() {
  return (
    <section id="about" className="relative border-y border-border bg-workbench">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 max-w-2xl">
          <div className="font-tech text-[10px] uppercase tracking-[0.28em] text-secondary">
            /* the method */
          </div>
          <h2 className="mt-3 font-editorial text-4xl leading-tight text-foreground sm:text-5xl">
            Three notes pinned above the bench.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {notes.map((n, i) => (
            <article
              key={n.kicker}
              className="relative rounded-sm bg-notebook px-6 pb-6 pt-8 shadow-[var(--shadow-paper)]"
              style={{ transform: `rotate(${i === 1 ? 1.2 : i === 0 ? -1.4 : 0.8}deg)` }}
            >
              {/* tape */}
              <div
                className="absolute -top-3 h-6 w-24 rounded-sm"
                style={{
                  background: "var(--tape)",
                  left: n.tape === "left" ? "18%" : undefined,
                  right: n.tape === "right" ? "18%" : undefined,
                  transform: `rotate(${n.tape === "left" ? -6 : 5}deg)`,
                }}
              />
              <div className="font-tech text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                {n.kicker}
              </div>
              <h3 className="mt-2 font-editorial text-2xl leading-snug text-foreground">
                {n.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                {n.body}
              </p>
              <div className="mt-5 border-t border-dashed border-foreground/15 pt-4">
                {n.doodle}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Case file: manila folder ---------- */

function CaseFile() {
  return (
    <section id="cases" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-tech text-[10px] uppercase tracking-[0.28em] text-secondary">
            /* featured investigation */
          </div>
          <h2 className="mt-3 font-editorial text-4xl leading-tight text-foreground sm:text-5xl">
            Your first <em className="ink-underline">case</em> is on the desk.
          </h2>
        </div>
        <a href="#" className="font-tech text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
          view archive →
        </a>
      </div>

      <div className="relative">
        {/* folder tab */}
        <div className="ml-6 inline-block rounded-t-lg bg-primary px-6 py-2 font-tech text-[11px] uppercase tracking-[0.24em] text-primary-foreground shadow-[var(--shadow-paper)]">
          Case File · #001
        </div>
        {/* folder body */}
        <div className="relative overflow-hidden rounded-[6px] rounded-tl-none border border-border bg-card shadow-[var(--shadow-lifted)]">
          {/* stamp */}
          <div className="pointer-events-none absolute right-8 top-8 rotate-[-14deg]">
            <div className="rounded-md border-[3px] border-destructive/70 px-4 py-1.5 font-tech text-xs uppercase tracking-[0.24em] text-destructive/80">
              locked · classified
            </div>
          </div>

          <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
            {/* Left: dossier */}
            <div className="border-b border-border p-8 md:border-b-0 md:border-r md:p-12">
              <div className="font-tech text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                incident report
              </div>
              <h3 className="mt-3 font-editorial text-5xl italic leading-none text-foreground">
                The Silent LED
              </h3>

              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-foreground/80">
                Minutes before a robotics competition, the robot indicator LED
                stops working. Voltage is present. Current is not.{" "}
                <span className="ink-underline">Find the failure.</span>
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-dashed border-foreground/15 pt-6">
                <div>
                  <dt className="font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    difficulty
                  </dt>
                  <dd className="mt-1.5 font-editorial text-xl italic text-success">
                    Beginner
                  </dd>
                </div>
                <div>
                  <dt className="font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    category
                  </dt>
                  <dd className="mt-1.5 font-editorial text-xl italic text-foreground">
                    Electronics Debugging
                  </dd>
                </div>
                <div>
                  <dt className="font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    est. time
                  </dt>
                  <dd className="mt-1.5 font-tech text-sm text-foreground">
                    ~ 18 min
                  </dd>
                </div>
                <div>
                  <dt className="font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    status
                  </dt>
                  <dd className="mt-1.5 inline-flex items-center gap-1.5 font-tech text-sm text-destructive">
                    <Lock className="h-3.5 w-3.5" /> Locked
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  disabled
                  className="inline-flex items-center gap-2 rounded-full bg-foreground/10 px-5 py-2.5 text-sm font-medium text-foreground/60"
                >
                  <Lock className="h-4 w-4" /> Unlocks soon
                </button>
                <button className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted">
                  Read the briefing
                </button>
              </div>
            </div>

            {/* Right: evidence board */}
            <div className="relative bg-workbench p-8 md:p-10">
              <div className="mb-4 flex items-center justify-between">
                <div className="font-tech text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  evidence · attached
                </div>
                <div className="font-tech text-[10px] text-muted-foreground">3 items</div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-center gap-4 rounded-lg border border-border bg-card p-3 shadow-[var(--shadow-paper)]">
                  <ChipDip className="h-10 w-16" />
                  <div className="flex-1">
                    <div className="font-editorial text-lg italic text-foreground">Microcontroller</div>
                    <div className="font-tech text-[10px] uppercase tracking-widest text-muted-foreground">U1 · ATmega328P</div>
                  </div>
                  <span className="font-tech text-[10px] uppercase tracking-widest text-success">OK</span>
                </li>
                <li className="flex items-center gap-4 rounded-lg border border-border bg-card p-3 shadow-[var(--shadow-paper)]">
                  <Resistor className="h-8 w-16" />
                  <div className="flex-1">
                    <div className="font-editorial text-lg italic text-foreground">Resistor</div>
                    <div className="font-tech text-[10px] uppercase tracking-widest text-muted-foreground">R7 · 220Ω</div>
                  </div>
                  <span className="font-tech text-[10px] uppercase tracking-widest text-muted-foreground">?</span>
                </li>
                <li className="flex items-center gap-4 rounded-lg border border-destructive/30 bg-card p-3 shadow-[var(--shadow-paper)]">
                  <LedBulb className="h-12 w-8" />
                  <div className="flex-1">
                    <div className="font-editorial text-lg italic text-foreground">Indicator LED</div>
                    <div className="font-tech text-[10px] uppercase tracking-widest text-muted-foreground">D3 · red 5mm</div>
                  </div>
                  <span className="font-tech text-[10px] uppercase tracking-widest text-destructive">FAIL</span>
                </li>
              </ul>

              <div className="mt-6 rounded-lg border border-dashed border-foreground/20 bg-card/60 p-4">
                <div className="font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  detective's note
                </div>
                <p className="mt-1.5 font-editorial text-lg italic leading-snug text-foreground">
                  "The multimeter reads 3.3V at D3 anode. No current flows.
                  Something between the source and the ground is lying."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer id="notebook" className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Brand />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            An open-source engineering education project. Built for curious
            students who'd rather take things apart than take notes.
          </p>
        </div>
        <div>
          <div className="font-tech text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            explore
          </div>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            <li><a href="#cases" className="hover:text-primary">Case Files</a></li>
            <li><a href="#notebook" className="hover:text-primary">Engineering Notebook</a></li>
            <li><a href="#about" className="hover:text-primary">About</a></li>
          </ul>
        </div>
        <div>
          <div className="font-tech text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            project
          </div>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            <li>
              <a href="https://github.com" className="inline-flex items-center gap-1.5 hover:text-primary">
                <Github className="h-4 w-4" /> Source on GitHub
              </a>
            </li>
            <li className="text-muted-foreground">
              Created by <span className="font-editorial text-base italic text-foreground">Jana</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 font-tech text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          <span>© 2026 · circuit_detective</span>
          <span>made with a soldering iron</span>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <CaseFile />
      </main>
      <Footer />
    </div>
  );
}
