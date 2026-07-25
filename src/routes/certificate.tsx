import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CertificateModal } from "@/components/CertificateModal";
import { SiteHeader } from "@/components/SiteHeader";
import { useProfile, useProgress } from "@/lib/store";
import { CASES } from "@/lib/casesData";
import { Award, Lock } from "lucide-react";

export const Route = createFileRoute("/certificate")({
  head: () => ({ meta: [
    { title: "Certificate of Engineering Accomplishment — Circuit Detective" },
    { name: "description", content: "Your printable certificate awarded for solving all five Circuit Detective cases." },
    { property: "og:title", content: "Certificate of Engineering Accomplishment — Circuit Detective" },
    { property: "og:description", content: "Your printable certificate awarded for solving all five Circuit Detective cases." },
  ] }),
  component: CertificatePage,
});

function CertificatePage() {
  const { profile } = useProfile();
  const { progress } = useProgress();
  const [open, setOpen] = useState(false);
  const complete = progress.solved.length === CASES.length;
  return (
    <div className="min-h-screen bg-cream text-foreground antialiased">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-10 sm:px-8">
        <div className="font-tech text-[10px] uppercase tracking-[0.32em] text-secondary">chapter 04 · the recognition</div>
        <h1 className="mt-4 font-editorial text-5xl leading-[1.02] text-foreground sm:text-6xl">Certificate of <span className="italic text-primary">accomplishment</span>.</h1>
        {complete ? (
          <div className="mt-10 rounded-md bg-card p-10 text-center shadow-[var(--shadow-lifted)]">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-tech text-[11px] uppercase tracking-[0.22em] text-primary"><Award className="h-4 w-4" /> all five cases solved</div>
            <h2 className="mt-6 font-editorial text-4xl italic text-foreground">You've earned it, {profile?.name?.split(" ")[0] ?? "engineer"}.</h2>
            <p className="mx-auto mt-4 max-w-lg font-hand text-2xl text-ink">"print it. frame it. or tape it above your bench."</p>
            <button onClick={() => setOpen(true)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-tech text-[11px] uppercase tracking-[0.24em] text-background hover:-translate-y-0.5 transition-transform">View & print certificate</button>
          </div>
        ) : (
          <div className="mt-10 rounded-md bg-card p-10 text-center shadow-[var(--shadow-paper)]">
            <div className="inline-flex items-center gap-2 rounded-full bg-foreground/5 px-4 py-2 font-tech text-[11px] uppercase tracking-[0.22em] text-muted-foreground"><Lock className="h-4 w-4" /> {progress.solved.length}/{CASES.length} cases solved</div>
            <h2 className="mt-6 font-editorial text-4xl italic text-foreground">Not yet, engineer.</h2>
            <p className="mx-auto mt-4 max-w-lg font-hand text-2xl text-ink">"the certificate unlocks when all five case files are closed."</p>
            <Link to="/hub" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-tech text-[11px] uppercase tracking-[0.24em] text-primary-foreground">Back to the desk →</Link>
          </div>
        )}
        <CertificateModal open={open} onClose={() => setOpen(false)} profile={profile} progress={progress} />
      </main>
    </div>
  );
}