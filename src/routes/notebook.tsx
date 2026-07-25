import { createFileRoute } from "@tanstack/react-router";
import { NotebookJournal } from "@/components/NotebookJournal";
import { SiteHeader } from "@/components/SiteHeader";
import { accuracy, totalXp, useProfile, useProgress } from "@/lib/store";
import { CASES, totalXpAvailable } from "@/lib/casesData";

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
  const { profile } = useProfile();
  const { progress, updateReflection } = useProgress();
  return (
    <div className="min-h-screen bg-cream text-foreground antialiased">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-10 sm:px-8">
        <section className="mb-12">
          <div className="font-tech text-[10px] uppercase tracking-[0.32em] text-secondary">chapter 03 · the notebook</div>
          <h1 className="mt-4 font-editorial text-5xl leading-[1.02] text-foreground sm:text-6xl">{profile ? `${profile.name.split(" ")[0]}'s ` : ""}<span className="italic text-primary">engineering notebook</span>.</h1>
          <p className="mt-4 font-hand text-2xl text-ink">"every solved case, every hypothesis — pressed between these pages."</p>
          <div className="mt-8 grid gap-4 border-y border-foreground/15 py-5 sm:grid-cols-4">
            <Stat label="cases solved" value={`${progress.solved.length}/${CASES.length}`} />
            <Stat label="total xp" value={`${totalXp(progress)}/${totalXpAvailable}`} />
            <Stat label="accuracy" value={`${accuracy(progress)}%`} />
            <Stat label="engineer" value={profile?.name ?? "—"} />
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