import { cn } from "@/react-app/lib/utils";

export type ApplicationStatus = "applied" | "shortlisted" | "rejected" | "hired";

interface StatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

const statusConfig: Record<
  ApplicationStatus,
  { label: string; className: string }
> = {
  applied: {
    label: "Applied",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  shortlisted: {
    label: "Shortlisted",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  rejected: {
    label: "Rejected",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  hired: {
    label: "Hired",
    className: "bg-success/10 text-success border-success/20",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

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
