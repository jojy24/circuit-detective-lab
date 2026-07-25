import { Link, useRouterState } from "@tanstack/react-router";
import { Search } from "lucide-react";

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="relative">
        <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-primary shadow-[var(--shadow-paper)] rotate-[-4deg]">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M4 12h3l2-4 3 8 2-4h6" /></svg>
        </div>
        <div className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-card ring-1 ring-border">
          <Search className="h-3.5 w-3.5 text-secondary" strokeWidth={2.75} />
        </div>
      </div>
      <div className="leading-tight">
        <div className="font-editorial text-xl italic text-foreground">Circuit Detective</div>
        <div className="font-tech text-[10px] uppercase tracking-[0.22em] text-muted-foreground">notebook / vol.01</div>
      </div>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const links = [
    { label: "Case Files", to: "/hub" as const },
    { label: "Notebook", to: "/notebook" as const },
    { label: "Certificate", to: "/certificate" as const },
  ];
  return (
    <header className="relative z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-6 sm:px-8 sm:pt-8">
        <Brand />
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => {
            const active = pathname === l.to || (l.to === "/hub" && pathname.startsWith("/case"));
            return (
              <Link key={l.to} to={l.to}
                className={`font-tech text-[11px] uppercase tracking-[0.24em] transition-colors ${active ? "text-primary" : "text-foreground/70 hover:text-primary"}`}>
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}