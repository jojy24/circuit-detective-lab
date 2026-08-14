import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/localization/LocalizationContext";
import { LanguageToggle } from "@/components/LanguageToggle";

function Brand() {
  const { t } = useI18n();
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="relative">
        <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-primary shadow-[var(--shadow-paper)] rotate-[-4deg]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden><path d="M4 12h3l2-4 3 8 2-4h6" /></svg>
        </div>
        <div className="absolute -bottom-1.5 -end-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-card ring-1 ring-border">
          <Search className="h-3.5 w-3.5 text-secondary" strokeWidth={2.75} aria-hidden />
        </div>
      </div>
      <div className="leading-tight">
        <div className="font-editorial text-xl italic text-foreground">{t.brand.name}</div>
        <div className="font-tech text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{t.brand.volume}</div>
      </div>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { label: t.nav.caseFiles, to: "/hub" as const },
    { label: t.nav.notebook, to: "/notebook" as const },
    { label: t.nav.certificate, to: "/certificate" as const },
  ];

  const isActive = (to: string) =>
    pathname === to || (to === "/hub" && pathname.startsWith("/case"));

  return (
    <header className="relative z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 pt-6 sm:px-8 sm:pt-8">
        <Brand />
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to}
              className={`font-tech text-[11px] uppercase tracking-[0.24em] transition-colors ${isActive(l.to) ? "text-primary" : "text-foreground/70 hover:text-primary"}`}>
              {l.label}
            </Link>
          ))}
          <LanguageToggle />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="cd-mobile-nav"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 bg-card text-foreground/80 transition-colors hover:border-primary hover:text-primary"
          >
            {open ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="cd-mobile-nav"
          className="mx-auto mt-4 max-w-7xl px-6 sm:px-8 md:hidden animate-fade-in"
        >
          <ul className="overflow-hidden rounded-md border border-foreground/15 bg-card shadow-[var(--shadow-paper)]">
            {links.map((l) => (
              <li key={l.to} className="border-b border-foreground/10 last:border-b-0">
                <Link
                  to={l.to}
                  className={`flex min-h-12 items-center px-5 font-tech text-[12px] uppercase tracking-[0.22em] ${isActive(l.to) ? "text-primary" : "text-foreground/80"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
