import { useEffect, useState } from "react";
import type { ComponentReading } from "@/lib/casesData";
import { useI18n } from "@/localization/LocalizationContext";

type Props = {
  active: ComponentReading | null;
};

export function MultimeterDrawer({ active }: Props) {
  const { t } = useI18n();
  const [display, setDisplay] = useState<string>(t.multimeter.idle);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplay(t.multimeter.idle);
      return;
    }
    setScanning(true);
    setDisplay(t.multimeter.scanning);
    const timer = window.setTimeout(() => {
      setDisplay(active.reading);
      setScanning(false);
    }, 550);
    return () => window.clearTimeout(timer);
  }, [active, t]);

  const statusColor =
    active?.status === "ok"
      ? "text-success"
      : active?.status === "warn"
        ? "text-primary"
        : active?.status === "fail"
          ? "text-destructive"
          : "text-muted-foreground";

  return (
    <div className="relative rounded-lg bg-foreground p-5 text-background shadow-[var(--shadow-lifted)]">
      <div className="flex items-center justify-between font-tech text-[10px] uppercase tracking-[0.28em] text-background/60">
        <span>{t.multimeter.header}</span>
        <span className={scanning ? "animate-pulse text-highlight" : "text-highlight"}>{t.multimeter.live}</span>
      </div>
      <div className="mt-3 rounded-sm bg-black/60 px-4 py-6 text-center">
        <div className="font-tech text-[9px] uppercase tracking-[0.32em] text-highlight/70">
          {active?.meta ?? t.multimeter.probePrompt}
        </div>
        <div className={`mt-2 font-tech text-3xl tabular-nums ${active ? statusColor : "text-background/40"}`}>
          {display}
        </div>
        <div className="mt-1 font-tech text-[10px] uppercase tracking-[0.24em] text-background/50">
          {active?.name ?? t.multimeter.noSignal}
        </div>
      </div>
      {active && (
        <p className="mt-4 font-hand text-lg leading-tight text-background/85">
          {active.diagnostic}
        </p>
      )}
    </div>
  );
}