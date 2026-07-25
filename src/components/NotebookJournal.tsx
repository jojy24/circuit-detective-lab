import { useState } from "react";
import { CASES } from "@/lib/casesData";
import type { Progress } from "@/lib/store";

type Props = {
  progress: Progress;
  onUpdateReflection: (caseId: string, text: string) => void;
};

export function NotebookJournal({ progress, onUpdateReflection }: Props) {
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  if (progress.solved.length === 0) {
    return (
      <div className="rounded-sm bg-card p-10 text-center shadow-[var(--shadow-paper)]">
        <p className="font-hand text-2xl text-ink">
          "the notebook is still blank — solve a case to write your first entry."
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {progress.solved
        .slice()
        .sort((a, b) => b.solvedAt - a.solvedAt)
        .map((record, idx) => {
          const data = CASES.find((c) => c.id === record.caseId);
          if (!data) return null;
          const date = new Date(record.solvedAt);
          const isEditing = editing === record.caseId;
          return (
            <article
              key={record.caseId}
              className="relative rounded-sm bg-card p-8 shadow-[var(--shadow-paper)] animate-fade-in"
              style={{
                transform: `rotate(${idx % 2 === 0 ? -0.3 : 0.4}deg)`,
                backgroundImage: "linear-gradient(var(--rule-line) 1px, transparent 1px)",
                backgroundSize: "100% 28px",
                backgroundPosition: "0 28px",
              }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-foreground/15 pb-3">
                <div>
                  <div className="font-tech text-[10px] uppercase tracking-[0.28em] text-secondary">
                    entry · case #{data.number}
                  </div>
                  <h3 className="mt-1 font-editorial text-3xl italic text-foreground">
                    {data.title}
                  </h3>
                </div>
                <div className="text-right font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                  <div>{date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</div>
                  <div className="mt-1">
                    {record.attempts} attempt{record.attempts === 1 ? "" : "s"} · +{record.xp} XP
                  </div>
                </div>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <div className="font-tech text-[10px] uppercase tracking-[0.22em] text-muted-foreground">fault</div>
                  <p className="mt-1 font-editorial text-xl italic text-primary">{data.fault}</p>
                </div>
                <div>
                  <div className="font-tech text-[10px] uppercase tracking-[0.22em] text-muted-foreground">concepts mastered</div>
                  <p className="mt-1 font-hand text-lg text-ink">{record.concepts.join(" · ")}</p>
                </div>
              </div>
              <div className="mt-6">
                <div className="font-tech text-[10px] uppercase tracking-[0.22em] text-muted-foreground">reflection</div>
                {isEditing ? (
                  <div className="mt-2 space-y-2">
                    <textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value.slice(0, 500))}
                      rows={3}
                      className="w-full rounded-sm border border-foreground/20 bg-background/60 p-3 font-hand text-lg text-ink outline-none focus:border-primary"
                      placeholder="what did you learn?"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => { onUpdateReflection(record.caseId, draft); setEditing(null); }}
                        className="rounded-full bg-foreground px-4 py-1.5 font-tech text-[10px] uppercase tracking-[0.22em] text-background"
                      >save</button>
                      <button
                        onClick={() => setEditing(null)}
                        className="rounded-full border border-foreground/20 px-4 py-1.5 font-tech text-[10px] uppercase tracking-[0.22em] text-foreground/70"
                      >cancel</button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => { setEditing(record.caseId); setDraft(record.reflection ?? ""); }}
                    className="mt-2 block w-full text-left font-hand text-xl leading-snug text-ink hover:text-primary"
                  >
                    {record.reflection || "— add a reflection —"}
                  </button>
                )}
              </div>
            </article>
          );
        })}
    </div>
  );
}