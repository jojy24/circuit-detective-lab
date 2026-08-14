import { Languages } from "lucide-react";
import { useI18n } from "@/localization/LocalizationContext";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { t, lang, setLang } = useI18n();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      aria-label={t.meta.switchLabel}
      title={t.meta.switchLabel}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-foreground/20 bg-card px-3.5 py-1.5 font-tech text-[11px] uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-primary hover:text-primary ${className}`}
    >
      <Languages className="h-3.5 w-3.5" aria-hidden />
      <span className={lang === "en" ? "font-arabic tracking-normal text-[13px] normal-case" : ""}>
        {t.meta.otherLangName}
      </span>
    </button>
  );
}
