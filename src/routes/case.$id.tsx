import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import { CASES, type ComponentReading } from "@/lib/casesData";
import { isCaseUnlocked, useProfile, useProgress } from "@/lib/store";
import { MultimeterDrawer } from "@/components/MultimeterDrawer";
import { SiteHeader } from "@/components/SiteHeader";
import { fill, useI18n } from "@/localization/LocalizationContext";

export const Route = createFileRoute("/case/$id")({
  head: ({ params }) => {
    const c = CASES.find((x) => x.id === params.id);
    const title = c ? `Case #${c.number}: ${c.title} — Circuit Detective` : "Case File — Circuit Detective";
    const desc = c ? c.briefing : "Engineering case investigation.";
    return { meta: [
      { title }, { name: "description", content: desc },
      { property: "og:title", content: title }, { property: "og:description", content: desc },
    ] };
  },
  component: CasePage,
});

function CasePage() {
  const { t } = useI18n();
  const { id } = useParams({ from: "/case/$id" });
  const navigate = useNavigate();
  const { profile, hydrated: pH } = useProfile();
  const { progress, recordAttempt, solveCase, hydrated: prH } = useProgress();
  const data = useMemo(() => CASES.find((c) => c.id === id), [id]);
  const caseIndex = useMemo(() => CASES.findIndex((c) => c.id === id), [id]);
  const [inspected, setInspected] = useState<Set<string>>(new Set());
  const [active, setActive] = useState<ComponentReading | null>(null);
  const [chosen, setChosen] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const [attempts, setAttempts] = useState(0);
  const [reflection, setReflection] = useState("");
  const [showExp, setShowExp] = useState(false);
  const startRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!pH || !prH || !data) return;
    if (!profile) { navigate({ to: "/hub" }); return; }
    if (!isCaseUnlocked(caseIndex, progress)) navigate({ to: "/hub" });
  }, [pH, prH, profile, data, caseIndex, progress, navigate]);

  if (!data) return (
    <div className="min-h-screen bg-cream"><SiteHeader />
      <div className="mx-auto max-w-3xl px-8 py-24 text-center">
        <h1 className="font-editorial text-4xl italic">{t.common.notFound}</h1>
        <Link to="/hub" className="mt-4 inline-block font-hand text-xl text-primary">← {t.common.backToDesk}</Link>
      </div></div>
  );

  const inspect = (c: ComponentReading) => { setActive(c); setInspected((p) => { const n = new Set(p); n.add(c.id); return n; }); };
  const canDiagnose = inspected.size >= Math.max(2, data.components.length - 1);
  const alreadySolved = progress.solved.some((r) => r.caseId === data.id);
  const submit = () => {
    if (!chosen) return;
    const hyp = data.hypotheses.find((h) => h.id === chosen);
    if (!hyp) return;
    const na = attempts + 1; setAttempts(na); recordAttempt(hyp.correct);
    if (hyp.correct) {
      setFeedback("correct"); setShowExp(true);
      if (!alreadySolved) solveCase({ caseId: data.id, solvedAt: Date.now(), attempts: na, timeSeconds: Math.round((Date.now() - startRef.current) / 1000), xp: data.xp, concepts: data.concepts, reflection: reflection.trim() || undefined });
    } else setFeedback("wrong");
  };
  const nextCase = CASES[caseIndex + 1];

  return (
    <div className="min-h-screen bg-cream text-foreground antialiased">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-6 sm:px-8">
        <Link to="/hub" className="inline-flex items-center gap-1.5 font-tech text-[11px] uppercase tracking-[0.24em] text-foreground/60 hover:text-primary"><ArrowLeft className="h-3.5 w-3.5" aria-hidden /> {t.investigation.backToDesk}</Link>
        <section className="mt-6 border-l-2 border-foreground/20 pl-6 sm:pl-8">
          <div className="font-tech text-[10px] uppercase tracking-[0.32em] text-muted-foreground">{t.investigation.incident} #{data.number} · {data.category}</div>
          <h1 className="mt-3 font-editorial text-5xl italic leading-none text-foreground sm:text-6xl">{data.title}.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80">{data.briefing}</p>
          <p className="mt-3 max-w-2xl font-hand text-xl text-ink">{data.scene}</p>
        </section>
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <section>
            <div className="mb-4 flex items-center justify-between font-tech text-[10px] uppercase tracking-[0.28em] text-secondary">
              <span>{t.investigation.evidenceWorkbench}</span>
              <span className="text-muted-foreground">{inspected.size}/{data.components.length} {t.investigation.inspected}</span>
            </div>
            <div className="relative rounded-md bg-workbench p-6 shadow-[var(--shadow-paper)]">
              <div className="grid gap-4 sm:grid-cols-2">
                {data.components.map((c) => {
                  const isActive = active?.id === c.id;
                  const wasInsp = inspected.has(c.id);
                  const flow = feedback === "correct" && c.isFaulty;
                  return (
                    <button key={c.id} onClick={() => inspect(c)}
                      className={`group relative flex items-center gap-4 rounded-md border-2 bg-card p-4 text-left shadow-[var(--shadow-paper)] transition-all hover:-translate-y-0.5 ${isActive ? "border-primary" : wasInsp ? "border-secondary/60" : "border-transparent"} ${flow ? "ring-2 ring-success animate-pulse" : ""}`}>
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-background text-3xl"><span>{c.emoji}</span></div>
                      <div className="min-w-0 flex-1">
                        <div className="font-editorial text-xl italic leading-tight text-foreground">{c.name}</div>
                        <div className="mt-0.5 font-tech text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{c.meta}</div>
                        {wasInsp && (
                          <div className={`mt-1 font-tech text-[11px] tabular-nums ${c.status === "ok" ? "text-success" : c.status === "warn" ? "text-primary" : "text-destructive"}`}>{c.reading}</div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 font-hand text-lg text-ink">{t.investigation.probeHint}</p>
            </div>
          </section>
          <aside className="space-y-6">
            <MultimeterDrawer active={active} />
            <div className="rounded-md bg-card p-6 shadow-[var(--shadow-paper)]">
              <div className="flex items-center justify-between">
                <div className="font-tech text-[10px] uppercase tracking-[0.28em] text-secondary">{t.investigation.diagnosisPanel}</div>
                <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{attempts} {attempts === 1 ? t.common.attempt : t.common.attempts}</span>
              </div>
              {!canDiagnose ? (
                <p className="mt-4 font-hand text-lg text-ink">{fill(t.investigation.gatherMore, { n: Math.max(2, data.components.length - 1) })}</p>
              ) : (
                <>
                  <p className="mt-3 text-sm text-foreground/75">{t.investigation.selectFault}</p>
                  <div className="mt-4 space-y-2">
                    {data.hypotheses.map((h) => {
                      const sel = chosen === h.id;
                      return (
                        <button key={h.id} disabled={feedback === "correct"} onClick={() => setChosen(h.id)}
                          className={`w-full rounded-sm border px-4 py-3 text-left text-[14px] leading-snug transition-all ${sel ? "border-primary bg-primary/10 text-foreground" : "border-foreground/15 bg-background/60 text-foreground/80 hover:border-foreground/30"} ${feedback === "correct" ? "opacity-70" : ""}`}>
                          {h.text}
                        </button>
                      );
                    })}
                  </div>
                  {feedback === "wrong" && (
                    <div className="mt-4 rounded-sm border border-destructive/30 bg-destructive/5 p-3">
                      <div className="font-tech text-[10px] uppercase tracking-[0.24em] text-destructive">{t.investigation.keepGoing}</div>
                      <p className="mt-1 font-hand text-lg text-ink">"{data.hint}"</p>
                      <button onClick={() => { setChosen(null); setFeedback("idle"); }} className="mt-2 inline-flex items-center gap-1.5 font-tech text-[10px] uppercase tracking-[0.22em] text-primary hover:underline"><RotateCcw className="h-3 w-3" aria-hidden /> {t.investigation.reExamine}</button>
                    </div>
                  )}
                  {feedback === "correct" && (
                    <div className="mt-4 rounded-sm border border-success/40 bg-success/10 p-3">
                      <div className="inline-flex items-center gap-1.5 font-tech text-[10px] uppercase tracking-[0.24em] text-success"><CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> {t.investigation.caseSolved}</div>
                      <p className="mt-2 font-hand text-lg text-ink">{fill(t.investigation.xpLogged, { xp: data.xp })}</p>
                    </div>
                  )}
                  {feedback !== "correct" && (
                    <button onClick={submit} disabled={!chosen} className="mt-4 w-full rounded-full bg-foreground px-6 py-3 font-tech text-[11px] uppercase tracking-[0.24em] text-background disabled:opacity-40">{t.investigation.submit}</button>
                  )}
                </>
              )}
            </div>
          </aside>
        </div>
        {showExp && (
          <section className="mt-12 rounded-md bg-card p-8 shadow-[var(--shadow-lifted)] animate-fade-in">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-1.5 font-tech text-[10px] uppercase tracking-[0.28em] text-primary"><Sparkles className="h-3.5 w-3.5" aria-hidden /> {t.investigation.physics}</div>
                <h2 className="mt-3 font-editorial text-3xl italic text-foreground">{t.investigation.whyTitle}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">{data.explanation}</p>
                <div className="mt-4"><div className="font-tech text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{t.investigation.conceptsMastered}</div><p className="mt-1 font-hand text-lg text-ink">{data.concepts.join(" · ")}</p></div>
              </div>
              <div>
                <div className="font-tech text-[10px] uppercase tracking-[0.28em] text-secondary">{t.investigation.reflectionLabel}</div>
                <textarea value={reflection} onChange={(e) => setReflection(e.target.value.slice(0, 500))} rows={4} className="mt-3 w-full rounded-sm border border-foreground/20 bg-background p-3 font-hand text-lg text-ink outline-none focus:border-primary" placeholder={t.investigation.reflectionPlaceholder} />
                <button onClick={() => solveCase({ caseId: data.id, solvedAt: progress.solved.find((r) => r.caseId === data.id)?.solvedAt ?? Date.now(), attempts, timeSeconds: Math.round((Date.now() - startRef.current) / 1000), xp: data.xp, concepts: data.concepts, reflection: reflection.trim() || undefined })} className="mt-2 font-tech text-[10px] uppercase tracking-[0.22em] text-primary hover:underline">{t.investigation.saveReflection}</button>
                <div className="mt-6 flex flex-wrap gap-3">
                  {nextCase ? (
                    <Link to="/case/$id" params={{ id: nextCase.id }} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-tech text-[11px] uppercase tracking-[0.24em] text-primary-foreground">{t.investigation.nextCase} {nextCase.title} →</Link>
                  ) : (
                    <Link to="/certificate" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-tech text-[11px] uppercase tracking-[0.24em] text-primary-foreground">{t.investigation.claimCertificate}</Link>
                  )}
                  <Link to="/hub" className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 font-tech text-[11px] uppercase tracking-[0.24em] text-foreground">{t.investigation.backToDesk}</Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}