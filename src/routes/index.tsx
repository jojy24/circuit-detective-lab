import { createFileRoute } from "@tanstack/react-router";
import { Github, Search, ArrowUpRight, Lock } from "lucide-react";
import heroWorkbench from "@/assets/hero-workbench.jpg";
import compLed from "@/assets/comp-led.png";
import compResistor from "@/assets/comp-resistor.png";
import compBattery from "@/assets/comp-battery.png";
import compBreadboard from "@/assets/comp-breadboard.png";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ---------- primitives ---------- */

function ArrowSquiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 90" className={className} fill="none">
      <path
        d="M4 12 C 40 6, 70 40, 60 60 C 55 72, 40 78, 30 70"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="0"
      />
      <path
        d="M22 62 L 30 70 L 36 60"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function CircleDoodle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg
        viewBox="0 0 200 80"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-x-4 -inset-y-2 w-[calc(100%+2rem)] h-[calc(100%+1rem)]"
        fill="none"
      >
        <path
          d="M20 40 C 20 12, 180 6, 190 38 C 196 66, 60 76, 12 60 C 4 56, 6 46, 20 40 Z"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function Sticker({
  children,
  color = "highlight",
  rotate = -3,
  className = "",
}: {
  children: React.ReactNode;
  color?: "highlight" | "secondary" | "accent" | "primary";
  rotate?: number;
  className?: string;
}) {
  const bg = {
    highlight: "bg-highlight text-foreground",
    secondary: "bg-secondary text-foreground",
    accent: "bg-accent text-accent-foreground",
    primary: "bg-primary text-primary-foreground",
  }[color];
  return (
    <span
      className={`inline-block px-3 py-1 font-tech text-[10px] uppercase tracking-[0.22em] shadow-[var(--shadow-paper)] ${bg} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

/* ---------- header ---------- */

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-primary shadow-[var(--shadow-paper)] rotate-[-4deg]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
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
          notebook / vol.01
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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 pt-8">
        <Brand />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-tech text-[11px] uppercase tracking-[0.24em] text-foreground/70 transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com"
            className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-card px-4 py-1.5 font-tech text-[11px] uppercase tracking-[0.22em] text-foreground transition-transform hover:-translate-y-px"
          >
            <Github className="h-3.5 w-3.5" /> GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-10 px-8 pt-16 pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:pt-24">
        {/* Left column — editorial title */}
        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-foreground/30" />
            <span className="font-tech text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              volume 01 · investigation
            </span>
          </div>

          <h1 className="font-editorial text-[3.4rem] leading-[0.95] text-foreground sm:text-[4.2rem] lg:text-[5.4rem]">
            Learn to think
            <br />
            <span className="italic text-primary">like an engineer</span>
            <span className="text-foreground">.</span>
          </h1>

          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-foreground/75">
            Investigate failures, analyze evidence, and master systematic
            debugging through interactive engineering cases — one broken
            circuit at a time.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <button className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3.5 font-tech text-[11px] uppercase tracking-[0.24em] text-background transition-transform hover:-translate-y-0.5">
              Enter Case File #001
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href="#cases"
              className="font-hand text-2xl text-primary underline decoration-wavy decoration-primary/40 underline-offset-4 hover:decoration-primary"
            >
              or peek at the cases →
            </a>
          </div>

          {/* handwritten margin note */}
          <div className="mt-14 flex items-start gap-4">
            <ArrowSquiggle className="mt-1 h-16 w-24 shrink-0" />
            <p className="font-hand max-w-xs text-2xl leading-tight text-ink">
              "engineers don't memorize systems — they learn how systems break."
            </p>
          </div>
        </div>

        {/* Right column — the workbench photograph */}
        <div className="relative">
          <div className="relative">
            {/* tape strips */}
            <div
              className="absolute -top-4 left-12 z-10 h-6 w-28 rotate-[-6deg] rounded-sm shadow-sm"
              style={{ background: "var(--tape)" }}
            />
            <div
              className="absolute -top-4 right-16 z-10 h-6 w-24 rotate-[7deg] rounded-sm shadow-sm"
              style={{ background: "var(--tape)" }}
            />

            <img
              src={heroWorkbench}
              alt="Circuit workbench with breadboard, LED, resistor, battery and colorful wires"
              width={1600}
              height={1104}
              className="w-full rounded-md shadow-[var(--shadow-lifted)]"
            />

            {/* annotation callouts */}
            <div className="absolute -left-4 top-10 hidden md:block">
              <div className="flex items-end gap-2">
                <span className="font-hand text-2xl text-primary rotate-[-6deg]">
                  power source
                </span>
                <svg viewBox="0 0 60 40" className="h-8 w-12">
                  <path
                    d="M4 8 C 20 6, 40 20, 54 32"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M48 30 L 54 32 L 52 24"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="absolute right-2 top-2 hidden md:block">
              <Sticker color="highlight" rotate={4}>
                subject · board #001
              </Sticker>
            </div>

            <div className="absolute -bottom-6 right-4 hidden md:flex items-center gap-2">
              <svg viewBox="0 0 60 40" className="h-8 w-12 rotate-180">
                <path
                  d="M4 8 C 20 6, 40 20, 54 32"
                  stroke="var(--secondary)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M48 30 L 54 32 L 52 24"
                  stroke="var(--secondary)"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-hand text-2xl text-secondary rotate-[3deg]">
                the suspect
              </span>
            </div>
          </div>

          {/* readings strip */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-foreground/20 pt-4 font-tech text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            <span>V<sub>cc</sub> = <span className="text-foreground">3.3v</span></span>
            <span>I<sub>led</sub> = <span className="text-destructive">0.00 mA</span></span>
            <span>t = 00:42</span>
            <span>fault ● <span className="text-destructive">detected</span></span>
          </div>
        </div>
      </div>

      {/* marquee-ish tag row */}
      <div className="border-y border-foreground/10 bg-card/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-8 py-4 font-tech text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          <span>● electronics debugging</span>
          <span>● robotics failure analysis</span>
          <span>● systematic thinking</span>
          <span>● hypothesis method</span>
          <span>● open source</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- philosophy: open editorial pages, not cards ---------- */

function Philosophy() {
  return (
    <section id="about" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-8 py-28">
        <div className="mb-20 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end">
          <div>
            <div className="font-tech text-[10px] uppercase tracking-[0.32em] text-secondary">
              chapter 01 · the method
            </div>
            <h2 className="mt-4 font-editorial text-5xl leading-[1.02] text-foreground sm:text-6xl">
              Three principles,
              <br />
              <span className="italic">pinned above the bench.</span>
            </h2>
          </div>
          <p className="font-hand text-2xl leading-snug text-ink md:pl-8">
            "We don't teach circuits. We teach the questions
            engineers ask when a circuit refuses to work."
          </p>
        </div>

        {/* Row 01 — Investigation */}
        <article className="relative grid gap-8 border-t border-foreground/15 py-14 md:grid-cols-[80px_minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="font-editorial text-6xl italic text-primary/70">01</div>
          <div>
            <Sticker color="primary" rotate={-3} className="mb-4">
              investigation
            </Sticker>
            <h3 className="font-editorial text-4xl italic leading-tight text-foreground">
              Investigation over memorization.
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-foreground/75">
              Learn how engineers <CircleDoodle>diagnose failures</CircleDoodle>{" "}
              instead of only studying systems when they work.
            </p>
          </div>
          <div className="relative flex items-center justify-center">
            <img
              src={compLed}
              alt="Red LED component"
              width={200}
              height={200}
              loading="lazy"
              className="h-40 w-auto rotate-[-8deg] drop-shadow-[0_20px_20px_oklch(0.24_0.08_265/0.15)]"
            />
            <span className="absolute -right-2 top-4 font-hand text-xl text-secondary rotate-[6deg]">
              exhibit A →
            </span>
          </div>
        </article>

        {/* Row 02 — Real scenarios */}
        <article className="relative grid gap-8 border-t border-foreground/15 py-14 md:grid-cols-[80px_minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="font-editorial text-6xl italic text-secondary/80">02</div>
          <div>
            <Sticker color="secondary" rotate={2} className="mb-4">
              scenario
            </Sticker>
            <h3 className="font-editorial text-4xl italic leading-tight text-foreground">
              Real engineering scenarios.
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-foreground/75">
              Practice troubleshooting inspired by real robotics and
              electronics challenges — the kind that fail
              <span className="handwritten text-primary"> minutes before a demo</span>.
            </p>
          </div>
          <div className="relative flex items-center justify-center">
            <img
              src={compBreadboard}
              alt="Breadboard with jumper wires"
              width={300}
              height={200}
              loading="lazy"
              className="h-40 w-auto rotate-[4deg] drop-shadow-[0_20px_20px_oklch(0.24_0.08_265/0.15)]"
            />
          </div>
        </article>

        {/* Row 03 — Notebook */}
        <article className="relative grid gap-8 border-y border-foreground/15 py-14 md:grid-cols-[80px_minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="font-editorial text-6xl italic text-accent-foreground/70">03</div>
          <div>
            <Sticker color="accent" rotate={-4} className="mb-4">
              notebook
            </Sticker>
            <h3 className="font-editorial text-4xl italic leading-tight text-foreground">
              An engineering notebook of your own.
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-foreground/75">
              Track discoveries, hypotheses, and debugging progress —
              the way real engineers do, in a book you can flip back through.
            </p>
          </div>
          <div className="relative">
            {/* faux notebook page */}
            <div
              className="relative rounded-sm bg-card p-5 shadow-[var(--shadow-paper)] rotate-[-3deg]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--rule-line) 1px, transparent 1px)",
                backgroundSize: "100% 22px",
                backgroundPosition: "0 20px",
              }}
            >
              <div className="font-tech text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
                entry / 03 · 42
              </div>
              <p className="mt-2 font-hand text-xl leading-[22px] text-ink">
                hypothesis: R7 open circuit
                <br />
                measured: 3.3V at anode
                <br />
                current: 0.00 mA — ✗
                <br />
                <span className="text-primary">next: check solder joints</span>
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ---------- case file: editorial dossier ---------- */

function CaseFile() {
  return (
    <section id="cases" className="relative bg-workspace">
      <div className="mx-auto max-w-7xl px-8 py-28">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-tech text-[10px] uppercase tracking-[0.32em] text-secondary">
              chapter 02 · the first case
            </div>
            <h2 className="mt-4 font-editorial text-5xl leading-[1.02] text-foreground sm:text-6xl">
              Case File{" "}
              <span className="italic text-primary">#001</span>.
            </h2>
          </div>
          <p className="font-hand text-xl text-ink md:max-w-xs md:text-right">
            "clipped to the desk this morning — still warm from the printer."
          </p>
        </div>

        <div className="relative grid gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
          {/* Left: the dossier */}
          <div className="relative">
            <div className="absolute -top-6 left-10 z-10">
              <Sticker color="primary" rotate={-6}>
                classified · locked
              </Sticker>
            </div>

            {/* the file itself — no card, editorial page */}
            <div className="relative border-l-2 border-foreground/20 pl-8">
              <div className="font-tech text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                incident report · robotics lab
              </div>
              <h3 className="mt-4 font-editorial text-6xl italic leading-none text-foreground sm:text-7xl">
                The Silent LED.
              </h3>

              <p className="mt-8 max-w-md text-lg leading-relaxed text-foreground/80">
                Minutes before a robotics competition, the robot
                indicator LED stops working. Voltage is present.
                Current is not.{" "}
                <span
                  className="font-editorial italic"
                  style={{
                    backgroundImage:
                      "linear-gradient(transparent 62%, var(--highlight) 62%, var(--highlight) 92%, transparent 92%)",
                    padding: "0 0.15em",
                  }}
                >
                  Find the failure.
                </span>
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-y-6 gap-x-8 border-t border-dashed border-foreground/20 pt-6 sm:grid-cols-4">
                <div>
                  <dt className="font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    difficulty
                  </dt>
                  <dd className="mt-2 font-editorial text-2xl italic text-success">
                    Beginner
                  </dd>
                </div>
                <div>
                  <dt className="font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    category
                  </dt>
                  <dd className="mt-2 font-editorial text-2xl italic text-foreground">
                    Electronics
                  </dd>
                </div>
                <div>
                  <dt className="font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    est. time
                  </dt>
                  <dd className="mt-2 font-tech text-sm text-foreground">
                    ~ 18 min
                  </dd>
                </div>
                <div>
                  <dt className="font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                    status
                  </dt>
                  <dd className="mt-2 inline-flex items-center gap-1.5 font-tech text-sm text-destructive">
                    <Lock className="h-3.5 w-3.5" /> Locked
                  </dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <button
                  disabled
                  className="inline-flex items-center gap-2 rounded-full bg-foreground/10 px-6 py-3 font-tech text-[11px] uppercase tracking-[0.24em] text-foreground/60"
                >
                  <Lock className="h-3.5 w-3.5" /> Unlocks soon
                </button>
                <a
                  href="#"
                  className="font-hand text-2xl text-primary underline decoration-wavy decoration-primary/40 underline-offset-4"
                >
                  read the briefing →
                </a>
              </div>
            </div>
          </div>

          {/* Right: evidence pinned to the wall */}
          <div className="relative">
            <div className="mb-6 flex items-center justify-between border-b border-foreground/15 pb-3">
              <div className="font-tech text-[10px] uppercase tracking-[0.32em] text-secondary">
                evidence · pinned
              </div>
              <div className="font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                03 items
              </div>
            </div>

            <ul className="space-y-8">
              {[
                {
                  img: compBattery,
                  h: 130,
                  w: 100,
                  name: "9V Battery",
                  meta: "PWR · Vin",
                  status: "OK",
                  statusColor: "text-success",
                  note: "reads 9.02 V",
                  rot: -4,
                },
                {
                  img: compResistor,
                  h: 60,
                  w: 200,
                  name: "Resistor · 220Ω",
                  meta: "R7 · 1/4W",
                  status: "?",
                  statusColor: "text-muted-foreground",
                  note: "untested — start here",
                  rot: 2,
                },
                {
                  img: compLed,
                  h: 130,
                  w: 100,
                  name: "Indicator LED",
                  meta: "D3 · red 5mm",
                  status: "FAIL",
                  statusColor: "text-destructive",
                  note: "3.3V present · no current",
                  rot: -5,
                },
              ].map((c) => (
                <li key={c.name} className="relative flex items-center gap-6 border-b border-dashed border-foreground/15 pb-6">
                  <div
                    className="relative flex h-24 w-24 shrink-0 items-center justify-center"
                    style={{ transform: `rotate(${c.rot}deg)` }}
                  >
                    <img
                      src={c.img}
                      alt={c.name}
                      loading="lazy"
                      className="max-h-24 w-auto drop-shadow-[0_14px_14px_oklch(0.24_0.08_265/0.18)]"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-editorial text-2xl italic text-foreground">
                      {c.name}
                    </div>
                    <div className="mt-1 font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                      {c.meta}
                    </div>
                    <div className="mt-2 font-hand text-lg text-ink">
                      {c.note}
                    </div>
                  </div>
                  <div className={`font-tech text-[11px] uppercase tracking-[0.24em] ${c.statusColor}`}>
                    {c.status}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-start gap-4">
              <svg viewBox="0 0 60 60" className="h-12 w-12 shrink-0">
                <circle cx="30" cy="30" r="22" fill="none" stroke="var(--primary)" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M20 30 L 28 38 L 42 22" stroke="var(--primary)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-hand text-xl leading-tight text-ink">
                "the multimeter is honest. the circuit is lying.
                somewhere between the two — the answer."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer id="notebook" className="border-t border-foreground/15 bg-card">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Brand />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground/75">
            An open-source engineering education project — a beautiful
            notebook for curious students who'd rather take things apart
            than take notes.
          </p>
          <p className="mt-4 font-hand text-xl text-ink">
            — created by <span className="text-primary">Jana</span>
          </p>
        </div>
        <div>
          <div className="font-tech text-[10px] uppercase tracking-[0.28em] text-secondary">
            explore
          </div>
          <ul className="mt-4 space-y-2 font-editorial text-lg italic text-foreground/85">
            <li><a href="#cases" className="hover:text-primary">Case Files</a></li>
            <li><a href="#notebook" className="hover:text-primary">Engineering Notebook</a></li>
            <li><a href="#about" className="hover:text-primary">About the Project</a></li>
          </ul>
        </div>
        <div>
          <div className="font-tech text-[10px] uppercase tracking-[0.28em] text-secondary">
            build
          </div>
          <ul className="mt-4 space-y-2 font-editorial text-lg italic text-foreground/85">
            <li>
              <a href="https://github.com" className="inline-flex items-center gap-1.5 hover:text-primary">
                <Github className="h-4 w-4" /> Source
              </a>
            </li>
            <li>Contribute a case</li>
            <li>Report a bug</li>
          </ul>
        </div>
        <div>
          <div className="font-tech text-[10px] uppercase tracking-[0.28em] text-secondary">
            colophon
          </div>
          <p className="mt-4 text-sm leading-relaxed text-foreground/75">
            Set in <span className="font-editorial italic">Instrument Serif</span>,
            <span className="font-hand"> Caveat</span>, and
            <span className="font-tech"> JetBrains Mono</span>.
          </p>
        </div>
      </div>
      <div className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5 font-tech text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          <span>© 2026 · circuit_detective</span>
          <span>soldered with care</span>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-cream text-foreground antialiased">
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
