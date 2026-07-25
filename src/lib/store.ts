import { useCallback, useEffect, useState } from "react";

export type Profile = {
  name: string;
  level: "Beginner" | "Electronics Explorer" | "Robotics Builder";
  ageGroup: "13–15" | "16–18" | "18+";
  team?: string;
  createdAt: number;
};

export type CaseRecord = {
  caseId: string;
  solvedAt: number;
  attempts: number;
  timeSeconds: number;
  reflection?: string;
  xp: number;
  concepts: string[];
};

export type Progress = {
  solved: CaseRecord[];
  totalAttempts: number;
  totalCorrect: number;
  streak: number;
};

const PROFILE_KEY = "cd_profile_v1";
const PROGRESS_KEY = "cd_progress_v1";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("cd:storage", { detail: { key } }));
  } catch {
    /* noop */
  }
}

export function useProfile() {
  const [profile, setProfileState] = useState<Profile | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProfileState(read<Profile | null>(PROFILE_KEY, null));
    setHydrated(true);
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.key === PROFILE_KEY) {
        setProfileState(read<Profile | null>(PROFILE_KEY, null));
      }
    };
    window.addEventListener("cd:storage", onChange);
    return () => window.removeEventListener("cd:storage", onChange);
  }, []);

  const setProfile = useCallback((p: Profile | null) => {
    if (p) write(PROFILE_KEY, p);
    else if (typeof window !== "undefined") {
      window.localStorage.removeItem(PROFILE_KEY);
      window.dispatchEvent(new CustomEvent("cd:storage", { detail: { key: PROFILE_KEY } }));
    }
    setProfileState(p);
  }, []);

  return { profile, setProfile, hydrated };
}

const emptyProgress: Progress = { solved: [], totalAttempts: 0, totalCorrect: 0, streak: 0 };

export function useProgress() {
  const [progress, setProgressState] = useState<Progress>(emptyProgress);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgressState(read<Progress>(PROGRESS_KEY, emptyProgress));
    setHydrated(true);
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.key === PROGRESS_KEY) {
        setProgressState(read<Progress>(PROGRESS_KEY, emptyProgress));
      }
    };
    window.addEventListener("cd:storage", onChange);
    return () => window.removeEventListener("cd:storage", onChange);
  }, []);

  const recordAttempt = useCallback((correct: boolean) => {
    const next: Progress = {
      ...read<Progress>(PROGRESS_KEY, emptyProgress),
    };
    next.totalAttempts += 1;
    if (correct) next.totalCorrect += 1;
    write(PROGRESS_KEY, next);
    setProgressState(next);
  }, []);

  const solveCase = useCallback((record: CaseRecord) => {
    const current = read<Progress>(PROGRESS_KEY, emptyProgress);
    const existing = current.solved.find((r) => r.caseId === record.caseId);
    const solved = existing
      ? current.solved.map((r) => (r.caseId === record.caseId ? { ...record, attempts: Math.max(record.attempts, r.attempts) } : r))
      : [...current.solved, record];
    const next: Progress = {
      ...current,
      solved,
      streak: current.streak + (existing ? 0 : 1),
    };
    write(PROGRESS_KEY, next);
    setProgressState(next);
  }, []);

  const updateReflection = useCallback((caseId: string, reflection: string) => {
    const current = read<Progress>(PROGRESS_KEY, emptyProgress);
    const next: Progress = {
      ...current,
      solved: current.solved.map((r) => (r.caseId === caseId ? { ...r, reflection } : r)),
    };
    write(PROGRESS_KEY, next);
    setProgressState(next);
  }, []);

  const resetProgress = useCallback(() => {
    write(PROGRESS_KEY, emptyProgress);
    setProgressState(emptyProgress);
  }, []);

  return { progress, recordAttempt, solveCase, updateReflection, resetProgress, hydrated };
}

export function isCaseUnlocked(caseIndex: number, progress: Progress): boolean {
  if (caseIndex === 0) return true;
  return progress.solved.length >= caseIndex;
}

export function accuracy(progress: Progress): number {
  if (progress.totalAttempts === 0) return 0;
  return Math.round((progress.totalCorrect / progress.totalAttempts) * 100);
}

export function totalXp(progress: Progress): number {
  return progress.solved.reduce((s, r) => s + r.xp, 0);
}

export function certificateId(profile: Profile | null, progress: Progress): string {
  const base = `${profile?.name ?? "engineer"}-${progress.solved.length}-${progress.solved[progress.solved.length - 1]?.solvedAt ?? Date.now()}`;
  let hash = 0;
  for (let i = 0; i < base.length; i++) hash = (hash * 31 + base.charCodeAt(i)) >>> 0;
  return `CD-${hash.toString(36).toUpperCase().padStart(8, "0").slice(0, 8)}`;
}