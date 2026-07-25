import { useState } from "react";
import { X } from "lucide-react";
import type { Profile } from "@/lib/store";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (p: Profile) => void;
};

const LEVELS: Profile["level"][] = ["Beginner", "Electronics Explorer", "Robotics Builder"];
const AGES: Profile["ageGroup"][] = ["13–15", "16–18", "18+"];

export function OnboardingModal({ open, onClose, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [level, setLevel] = useState<Profile["level"]>("Beginner");
  const [ageGroup, setAgeGroup] = useState<Profile["ageGroup"]>("16–18");
  const [team, setTeam] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your engineer name.");
      return;
    }
    if (trimmed.length > 40) {
      setError("Name is a bit long — 40 chars max.");
      return;
    }
    onSubmit({
      name: trimmed,
      level,
      ageGroup,
      team: team.trim() ? team.trim().slice(0, 60) : undefined,
      createdAt: Date.now(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-foreground/40 px-4 py-8 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg rounded-md bg-card p-8 shadow-[var(--shadow-lifted)] animate-scale-in"
        style={{ backgroundImage: "radial-gradient(var(--grid-dot) 1px, transparent 1.2px)", backgroundSize: "18px 18px" }}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-foreground/50 hover:bg-foreground/5 hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6">
          <div className="font-tech text-[10px] uppercase tracking-[0.3em] text-secondary">
            enroll · engineer profile
          </div>
          <h2 className="mt-2 font-editorial text-4xl italic leading-tight text-foreground">
            Welcome to the lab.
          </h2>
          <p className="mt-2 font-hand text-xl text-ink">
            "before we open a case file, tell us who's investigating."
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              engineer name
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              maxLength={40}
              className="mt-2 w-full rounded-sm border border-foreground/20 bg-background px-3 py-2.5 font-editorial text-xl italic text-foreground outline-none focus:border-primary"
              placeholder="Ada Lovelace"
            />
          </div>

          <div>
            <label className="font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              experience level
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  className={`rounded-full border px-3 py-1.5 font-tech text-[11px] uppercase tracking-[0.2em] transition-all ${
                    level === l
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-foreground/20 bg-card text-foreground/70 hover:border-foreground/40"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              age group
            </label>
            <div className="mt-2 flex gap-2">
              {AGES.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAgeGroup(a)}
                  className={`flex-1 rounded-sm border px-3 py-2 font-tech text-xs tracking-[0.16em] transition-all ${
                    ageGroup === a
                      ? "border-secondary bg-secondary text-foreground"
                      : "border-foreground/20 bg-card text-foreground/70 hover:border-foreground/40"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-tech text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              school or robotics team <span className="normal-case tracking-normal text-foreground/40">(optional)</span>
            </label>
            <input
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              maxLength={60}
              className="mt-2 w-full rounded-sm border border-foreground/20 bg-background px-3 py-2.5 font-hand text-lg text-ink outline-none focus:border-primary"
              placeholder="Team Sparkfire · Robotics Club"
            />
          </div>

          {error && (
            <div className="rounded-sm bg-destructive/10 px-3 py-2 font-tech text-xs text-destructive">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-foreground px-6 py-3.5 font-tech text-[11px] uppercase tracking-[0.24em] text-background transition-transform hover:-translate-y-0.5"
          >
            Open my case files →
          </button>
        </form>
      </div>
    </div>
  );
}