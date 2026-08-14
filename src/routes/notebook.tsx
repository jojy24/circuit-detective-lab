import { createFileRoute } from "@tanstack/react-router";
import { NotebookJournal } from "@/components/NotebookJournal";
import { SiteHeader } from "@/components/SiteHeader";
import { accuracy, totalXp, useProfile, useProgress } from "@/lib/store";
import { CASES, totalXpAvailable } from "@/lib/casesData";
import { useI18n } from "@/localization/LocalizationContext";

export const Route = createFileRoute("/notebook")({
  head: () => ({ meta: [
    { title: "Engineering Notebook — Circuit Detective" },
    { name: "description", content: "Your handwritten record of solved cases, reflections, and concepts mastered." },
    { property: "og:title", content: "Engineering Notebook — Circuit Detective" },
    { property: "og:description", content: "Your handwritten record of solved cases, reflections, and concepts mastered." },
  ] }),
  component: NotebookPage,
});

function NotebookPage() {
  const { t } = useI18n();
  const { profile } = useProfile();
  const { progress, updateReflection } = useProgress();
  return (
    <div className="min-h-screen bg-cream text-foreground antialiased">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-10 sm:px-8">
        <section className="mb-12">
          <div className="font-tech text-[10px] uppercase tracking-[0.32em] text-secondary">{t.notebook.kicker}</div>
          <h1 className="mt-4 font-editorial text-5xl leading-[1.02] text-foreground sm:text-6xl">{profile ? `${profile.name.split(" ")[0]}${t.notebook.titleOwner}` : ""}<span className="italic text-primary">{t.notebook.title}</span>.</h1>
          <p className="mt-4 font-hand text-2xl text-ink">{t.notebook.note}</p>
          <div className="mt-8 grid gap-4 border-y border-foreground/15 py-5 sm:grid-cols-4">
            <Stat label={t.notebook.statCases} value={`${progress.solved.length}/${CASES.length}`} />
            <Stat label={t.notebook.statXp} value={`${totalXp(progress)}/${totalXpAvailable}`} />
            <Stat label={t.notebook.statAccuracy} value={`${accuracy(progress)}%`} />
            <Stat label={t.notebook.statEngineer} value={profile?.name ?? "—"} />
          </div>
        </section>
        <NotebookJournal progress={progress} onUpdateReflection={updateReflection} />
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (<div><div className="font-tech text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div><div className="mt-1 font-editorial text-2xl italic text-foreground truncate">{value}</div></div>);
}