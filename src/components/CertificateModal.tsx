import { X, Printer, Copy, Check } from "lucide-react";
import { useState } from "react";
import { CASES, totalXpAvailable } from "@/lib/casesData";
import { accuracy, certificateId, totalXp, type Profile, type Progress } from "@/lib/store";

type Props = { open: boolean; onClose: () => void; profile: Profile | null; progress: Progress };

export function CertificateModal({ open, onClose, profile, progress }: Props) {
  const [copied, setCopied] = useState(false);
  if (!open) return null;
  const id = certificateId(profile, progress);
  const xp = totalXp(progress);
  const acc = accuracy(progress);
  const date = new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
  const concepts = Array.from(new Set(progress.solved.flatMap((r) => r.concepts)));
  const summary = `Circuit Detective — Engineering Accomplishment\nEngineer: ${profile?.name ?? "Anonymous"}\nCases Solved: ${progress.solved.length}/${CASES.length}\nTotal XP: ${xp}/${totalXpAvailable}\nDiagnostic Accuracy: ${acc}%\nCertificate ID: ${id}\nDate: ${date}`;
  const copy = async () => { try { await navigator.clipboard.writeText(summary); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch {} };
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/50 px-4 py-10 print:static print:bg-transparent print:p-0">
      <div className="relative w-full max-w-3xl print:max-w-none">
        <button onClick={onClose} className="absolute -top-2 right-0 rounded-full bg-card p-2 shadow-[var(--shadow-paper)] hover:bg-highlight print:hidden" aria-label="Close"><X className="h-4 w-4" /></button>
        <div className="mb-4 flex flex-wrap gap-2 print:hidden">
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 font-tech text-[11px] uppercase tracking-[0.22em] text-background hover:-translate-y-0.5 transition-transform"><Printer className="h-3.5 w-3.5" /> Print / Save as PDF</button>
          <button onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-card px-4 py-2 font-tech text-[11px] uppercase tracking-[0.22em] text-foreground hover:-translate-y-0.5 transition-transform">{copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}{copied ? "Copied" : "Copy achievement summary"}</button>
        </div>
        <div id="cd-certificate" className="relative rounded-sm bg-card p-12 shadow-[var(--shadow-lifted)] print:shadow-none" style={{ backgroundImage: "radial-gradient(var(--grid-dot) 1px, transparent 1.2px)", backgroundSize: "22px 22px" }}>
          <div className="absolute inset-4 rounded-sm border-2 border-double border-foreground/30" />
          <div className="relative">
            <div className="text-center">
              <div className="font-tech text-[10px] uppercase tracking-[0.4em] text-secondary">circuit detective · vol.01</div>
              <h2 className="mt-4 font-editorial text-5xl italic leading-tight text-foreground sm:text-6xl">Certificate of<br /><span className="text-primary">Engineering Accomplishment</span></h2>
              <p className="mt-6 font-hand text-2xl text-ink">this notebook confirms that</p>
              <div className="mt-3 font-editorial text-5xl italic text-foreground">{profile?.name ?? "Anonymous Engineer"}</div>
              {profile?.team && <div className="mt-2 font-hand text-xl text-ink">of {profile.team}</div>}
              <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-foreground/75">has systematically investigated and diagnosed all five engineering failure cases — demonstrating patience, rigor, and the willingness to trust the multimeter over the assumption.</p>
            </div>
            <div className="mt-10 grid gap-6 border-y border-foreground/15 py-6 sm:grid-cols-4">
              <Stat label="cases solved" value={`${progress.solved.length}/${CASES.length}`} />
              <Stat label="total xp" value={`${xp}`} />
              <Stat label="accuracy" value={`${acc}%`} />
              <Stat label="awarded" value={date} />
            </div>
            <div className="mt-6">
              <div className="font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">skills mastered</div>
              <p className="mt-2 font-hand text-xl leading-snug text-ink">{concepts.length > 0 ? concepts.join(" · ") : "—"}</p>
            </div>
            <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">certificate id</div>
                <div className="mt-1 font-tech text-lg text-foreground">{id}</div>
              </div>
              <div className="text-right">
                <div className="font-hand text-2xl italic text-primary">— Circuit Detective</div>
                <div className="mt-1 font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">signed with solder</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media print { body * { visibility: hidden; } #cd-certificate, #cd-certificate * { visibility: visible; } #cd-certificate { position: absolute; inset: 0; margin: 0; box-shadow: none; } }`}</style>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (<div><div className="font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">{label}</div><div className="mt-1 font-editorial text-2xl italic text-foreground">{value}</div></div>);
}