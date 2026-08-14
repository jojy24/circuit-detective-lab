import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CASES, totalXpAvailable } from "@/lib/casesData";
import { accuracy, isCaseUnlocked, totalXp, useProfile, useProgress } from "@/lib/store";
import { CaseCard } from "@/components/CaseCard";
import { OnboardingModal } from "@/components/OnboardingModal";
import { SiteHeader } from "@/components/SiteHeader";
import { Award } from "lucide-react";
import { useI18n } from "@/localization/LocalizationContext";

export const Route = createFileRoute("/hub")({
  head: () => ({ meta: [
    { title: "Case Investigation Hub — Circuit Detective" },
    { name: "description", content: "Choose an engineering case to investigate. Diagnose faults, form hypotheses, unlock progressive cases." },
    { property: "og:title", content: "Case Investigation Hub — Circuit Detective" },
    { property: "og:description", content: "Choose an engineering case to investigate. Diagnose faults, form hypotheses, unlock progressive cases." },
  ] }),
  component: HubPage,
});

function HubPage() {
  const { t } = useI18n();
  const { profile, setProfile, hydrated: pH } = useProfile();
  const { progress, hydrated: prH } = useProgress();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const hydrated = pH && prH;
  const showModal = hydrated && (!profile || modalOpen);
  const solvedCount = progress.solved.length;
  const allDone = solvedCount === CASES.length;
  return (
    <div className="min-h-screen bg-cream text-foreground antialiased">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-8">
        <section className="mb-14 grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end">
          <div>
            <div className="font-tech text-[10px] uppercase tracking-[0.32em] text-secondary">{t.hub.kicker}</div>
            <h1 className="mt-4 font-editorial text-5xl leading-[1.02] text-foreground sm:text-6xl">{t.hub.title} <span className="italic text-primary">{profile ? profile.name.split(" ")[0] : t.common.engineer}</span>.</h1>
            <p className="mt-4 max-w-lg font-hand text-2xl leading-snug text-ink">{t.hub.note}</p>
          </div>
          <div className="rounded-sm bg-card p-6 shadow-[var(--shadow-paper)]">
            <div className="grid grid-cols-3 gap-4">
              <Stat label={t.hub.statSolved} value={`${solvedCount}/${CASES.length}`} />
              <Stat label={t.hub.statXp} value={`${totalXp(progress)}`} sub={`${t.common.of} ${totalXpAvailable}`} />
              <Stat label={t.hub.statAccuracy} value={`${accuracy(progress)}%`} />
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-foreground/10"><div className="h-full bg-primary transition-all duration-500" style={{ width: `${(solvedCount / CASES.length) * 100}%` }} /></div>
            {allDone && (
              <button onClick={() => navigate({ to: "/certificate" })} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 font-tech text-[11px] uppercase tracking-[0.22em] text-primary-foreground"><Award className="h-4 w-4" aria-hidden /> {t.hub.claimCertificate}</button>
            )}
          </div>
        </section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <CaseCard key={c.id} caseData={c} index={i} unlocked={isCaseUnlocked(i, progress)} solved={progress.solved.some((r) => r.caseId === c.id)} />
          ))}
        </div>
        {profile && (
          <div className="mt-12 flex items-center justify-between border-t border-foreground/15 pt-6 font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            <span>{t.hub.signedInAs} <span className="text-foreground">{profile.name}</span> · {t.onboarding.levels[profile.level]}</span>
            <button onClick={() => setProfile(null)} className="hover:text-primary">{t.hub.resetProfile}</button>
          </div>
        )}
      </main>
      <OnboardingModal open={showModal} onClose={() => (profile ? setModalOpen(false) : navigate({ to: "/" }))} onSubmit={(p) => { setProfile(p); setModalOpen(false); }} />
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (<div><div className="font-tech text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div><div className="mt-1 font-editorial text-2xl italic text-foreground">{value}</div>{sub && <div className="font-tech text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{sub}</div>}</div>);
}