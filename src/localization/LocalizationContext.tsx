import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, en, type Dict, type Lang } from "./strings";

const LANG_KEY = "cd_lang_v1";

type Ctx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  isRtl: boolean;
  t: Dict;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  /** Localised number formatting (Arabic-Indic digits in AR). */
  n: (value: number) => string;
};

const LocalizationContext = createContext<Ctx | null>(null);

function readStoredLang(): Lang | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LANG_KEY);
    return raw === "ar" || raw === "en" ? raw : null;
  } catch {
    return null;
  }
}

export function LocalizationProvider({ children }: { children: ReactNode }) {
  // Always start at "en" so SSR and the first client render agree.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = readStoredLang();
    if (stored) setLangState(stored);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(LANG_KEY, l);
    } catch {
      /* storage unavailable — language stays for this session only */
    }
  }, []);

  const value = useMemo<Ctx>(() => {
    const isRtl = lang === "ar";
    return {
      lang,
      isRtl,
      dir: isRtl ? "rtl" : "ltr",
      t: (dictionaries[lang] ?? en) as Dict,
      setLang,
      toggleLang: () => setLang(lang === "en" ? "ar" : "en"),
      n: (value: number) =>
        new Intl.NumberFormat(isRtl ? "ar-EG" : "en-US").format(value),
    };
  }, [lang, setLang]);

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useI18n(): Ctx {
  const ctx = useContext(LocalizationContext);
  if (!ctx) {
    throw new Error("useI18n must be used inside <LocalizationProvider>");
  }
  return ctx;
}

/** Replace {token} placeholders in a translated string. */
export function fill(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (m, k) =>
    k in vars ? String(vars[k]) : m,
  );
}
