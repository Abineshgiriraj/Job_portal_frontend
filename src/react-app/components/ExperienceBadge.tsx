import { cn } from "@/react-app/lib/utils";

export type ExperienceLevel = "entry" | "mid" | "senior" | "lead";

interface ExperienceBadgeProps {
  level: ExperienceLevel;
  className?: string;
}

const levelConfig: Record<
  ExperienceLevel,
  { label: string; className: string }
> = {
  entry: {
    label: "Entry Level",
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  mid: {
    label: "Mid Level",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  senior: {
    label: "Senior",
    className: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  lead: {
    label: "Lead",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
};

export function ExperienceBadge({ level, className }: ExperienceBadgeProps) {
  const config = levelConfig[level];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
