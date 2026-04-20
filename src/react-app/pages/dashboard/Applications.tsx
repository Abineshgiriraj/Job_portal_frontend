import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, FileText, Calendar, Briefcase, Download, ExternalLink } from "lucide-react";
import { DashboardLayout } from "@/react-app/components/layout";
import { Button } from "@/react-app/components/ui/button";
import { Badge } from "@/react-app/components/ui/badge";
import api from "@/react-app/api/axios";
import type { Application } from "@/shared/types";
import { cn } from "@/react-app/lib/utils";

const statusConfig: Record<string, { label: string, className: string }> = {
  applied: { label: "Applied", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  shortlisted: { label: "Shortlisted", className: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  rejected: { label: "Rejected", className: "bg-destructive/10 text-destructive border-destructive/20" },
  hired: { label: "Hired", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<Application[]>("applications/my/");
        setApplications(response.data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
        setError("Failed to load your applications. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <DashboardLayout role="job_seeker">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">My Applications</h1>
        <p className="text-muted-foreground">
          Track the status of your job applications
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="glass rounded-xl p-12 text-center border-destructive/50">
          <p className="text-destructive mb-4">{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      ) : applications.length > 0 ? (
        <div className="grid gap-6">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      ) : (
        <div className="glass rounded-xl p-12 text-center">
          <p className="text-muted-foreground mb-6">
            You haven't applied to any jobs yet.
          </p>
          <Link to="/jobs">
            <Button variant="outline">Find Jobs to Apply</Button>
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
}

function ApplicationCard({ application }: { application: Application }) {
  const status = statusConfig[application.status] || { label: application.status, className: "" };

  return (
    <div className="glass rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300 group">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex gap-4">
          <div className="h-12 w-12 shrink-0 rounded-lg bg-secondary flex items-center justify-center text-primary border border-primary/10">
            <Briefcase className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <Link to={`/jobs/${application.job.id}`} className="hover:underline">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {application.job.title}
                </h3>
              </Link>
              <Badge variant="outline" className={cn("text-[10px] uppercase tracking-wider font-bold", status.className)}>
                {status.label}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Applied {new Date(application.applied_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a href={application.resume} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="secondary" className="gap-2">
              <Download className="h-4 w-4" />
              View Resume
            </Button>
          </a>
          <Link to={`/jobs/${application.job.id}`}>
            <Button size="sm" variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              View Job
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
