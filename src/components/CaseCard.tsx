import { Link } from "@tanstack/react-router";
import { Lock, Check } from "lucide-react";
import type { CaseData } from "@/lib/casesData";
import { useI18n } from "@/localization/LocalizationContext";

type Props = {
  caseData: CaseData;
  index: number;
  unlocked: boolean;
  solved: boolean;
};

const colorMap: Record<string, string> = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-foreground",
  accent: "bg-accent text-accent-foreground",
  highlight: "bg-highlight text-foreground",
};

export function CaseCard({ caseData, index, unlocked, solved }: Props) {
  const { t } = useI18n();
  const rot = index % 2 === 0 ? -1.2 : 1.4;
  const content = (
    <div
      className="group relative h-full rounded-sm bg-card p-6 shadow-[var(--shadow-paper)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lifted)]"
      style={{ transform: `rotate(${unlocked ? rot : 0}deg)` }}
    >
      <div
        className="absolute -top-3 left-8 h-5 w-16 rotate-[-4deg] rounded-sm"
        style={{ background: "var(--tape)" }}
      />
      <div className="flex items-start justify-between">
        <div>
          <div className="font-tech text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            {t.caseCard.caseFile}
          </div>
          <div className="font-editorial text-4xl italic leading-none text-foreground">
            #{caseData.number}
          </div>
        </div>
        <span
          className={`inline-block rounded-full px-2.5 py-1 font-tech text-[9px] uppercase tracking-[0.2em] ${colorMap[caseData.color]}`}
        >
          {caseData.category}
        </span>
      </div>
      <h3 className="mt-6 font-editorial text-3xl italic leading-tight text-foreground">
        {caseData.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/70">
        {caseData.briefing}
      </p>
      <div className="mt-6 flex items-center justify-between border-t border-dashed border-foreground/20 pt-4 font-tech text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        <span>{caseData.difficulty}</span>
        <span>{caseData.estTime}</span>
        <span className="text-primary">+{caseData.xp} XP</span>
      </div>
      <div className="mt-5 flex items-center justify-between">
        {solved ? (
          <span className="inline-flex items-center gap-1.5 font-tech text-[11px] uppercase tracking-[0.22em] text-success">
            <Check className="h-3.5 w-3.5" aria-hidden /> {t.common.solved}
          </span>
        ) : unlocked ? (
          <span className="font-hand text-lg text-primary">{t.caseCard.open}</span>
        ) : (
          <span className="inline-flex items-center gap-1.5 font-tech text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <Lock className="h-3.5 w-3.5" aria-hidden /> {t.common.locked}
          </span>
        )}
      </div>
    </div>
  );

  if (!unlocked) {
    return <div className="opacity-60">{content}</div>;
  }

  return (
    <Link
      to="/case/$id"
      params={{ id: caseData.id }}
      className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
    >
      {content}
    </Link>
  );
}