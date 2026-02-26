import { Link } from "react-router";
import { MapPin, DollarSign, Clock, Building2, Wifi, Users } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { ExperienceBadge } from "@/react-app/components/ExperienceBadge";
import type { Job } from "@/shared/types";
import { cn } from "@/react-app/lib/utils";

interface JobCardProps {
  job: Job;
  className?: string;
}

const locationTypeIcons = {
  remote: Wifi,
  hybrid: Users,
  onsite: Building2,
};

const locationTypeLabels = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
};

function formatSalary(min: number, max: number, currency: string): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
  return `${formatter.format(min)} - ${formatter.format(max)}`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Posted yesterday";
  if (diffDays < 7) return `Posted ${diffDays} days ago`;
  if (diffDays < 30) return `Posted ${Math.floor(diffDays / 7)} weeks ago`;
  return `Posted ${Math.floor(diffDays / 30)} months ago`;
}

export function JobCard({ job, className }: JobCardProps) {
  const LocationIcon = locationTypeIcons[job.locationType];

  return (
    <div
      className={cn(
        "group relative rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:bg-card/80 hover:glow-primary",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Company Logo */}
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-secondary">
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt={job.company}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-muted-foreground">
              {job.company[0]}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>
            </div>
            <ExperienceBadge level={job.experienceLevel} />
          </div>

          {/* Meta info */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <LocationIcon className="h-3.5 w-3.5" />
              {locationTypeLabels[job.locationType]}
            </span>
            <span className="flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5" />
              {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
            </span>
          </div>

          {/* Description preview */}
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
            {job.description}
          </p>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formatDate(job.postedAt)}
            </span>
            <Link to={`/jobs/${job.id}`}>
              <Button
                size="sm"
                variant="outline"
                className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
