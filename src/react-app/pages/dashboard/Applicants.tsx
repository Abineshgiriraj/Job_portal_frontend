import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, FileText, Calendar, User, Mail, Phone, Briefcase, ExternalLink, Download, MoreHorizontal, Check, X, Star } from "lucide-react";
import { DashboardLayout } from "@/react-app/components/layout";
import { Button } from "@/react-app/components/ui/button";
import { Badge } from "@/react-app/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/react-app/components/ui/dropdown-menu";
import api from "@/react-app/api/axios";
import type { Application } from "@/shared/types";
import { cn } from "@/react-app/lib/utils";

const statusConfig: Record<string, { label: string, className: string, icon: React.ElementType }> = {
  applied: { label: "Applied", className: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: FileText },
  shortlisted: { label: "Shortlisted", className: "bg-purple-500/10 text-purple-400 border-purple-500/20", icon: Star },
  rejected: { label: "Rejected", className: "bg-destructive/10 text-destructive border-destructive/20", icon: X },
  hired: { label: "Hired", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: Check },
};

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplicants = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<Application[]>("applications/recruiter/");
      setApplicants(response.data);
    } catch (err) {
      console.error("Failed to fetch applicants:", err);
      setError("Failed to load applicants. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await api.patch(`applications/${id}/`, { status });
      await fetchApplicants(); // Refresh list after update
    } catch (err) {
      console.error("Failed to update status:", err);
      // Optionally show an error toast to the user
    }
  };

  return (
    <DashboardLayout role="recruiter">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Job Applicants</h1>
        <p className="text-muted-foreground">
          Review candidates who have applied to your job postings
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="glass rounded-xl p-12 text-center border-destructive/50">
          <p className="text-destructive mb-4">{error}</p>
          <Button variant="outline" onClick={fetchApplicants}>
            Retry
          </Button>
        </div>
      ) : applicants.length > 0 ? (
        <div className="grid gap-6">
          {applicants.map((applicant) => (
            <ApplicantCard key={applicant.id} applicant={applicant} onStatusUpdate={handleStatusUpdate} />
          ))}
        </div>
      ) : (
        <div className="glass rounded-xl p-12 text-center">
          <p className="text-muted-foreground">
            No applicants found for your job postings yet.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
}

function ApplicantCard({ applicant, onStatusUpdate }: { applicant: Application, onStatusUpdate: (id: string, status: string) => void }) {
  const status = statusConfig[applicant.status] || { label: applicant.status, className: "", icon: FileText };
  
  return (
    <div className="glass rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300 group">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex gap-4">
          <div className="h-12 w-12 shrink-0 rounded-full bg-secondary flex items-center justify-center text-primary border border-primary/10">
            <User className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {applicant.applicant.name}
              </h3>
              <Badge variant="outline" className={cn("text-[10px] uppercase tracking-wider font-bold", status.className)}>
                <status.icon className="h-3 w-3 mr-1.5" />
                {status.label}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5" />
                Applied for: <Link to={`/jobs/${applicant.job.id}`} className="hover:underline text-foreground font-medium">{applicant.job.title}</Link>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Applied on {new Date(applicant.applied_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a href={applicant.resume} target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="secondary" className="gap-2">
              <Download className="h-4 w-4" />
              Resume
            </Button>
          </a>
          
          <div className="flex items-center gap-2">
            {applicant.linkedin && (
              <a href={applicant.linkedin} target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </a>
            )}
            {applicant.portfolio && (
              <a href={applicant.portfolio} target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onStatusUpdate(applicant.id, "shortlisted")}>Shortlist</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusUpdate(applicant.id, "hired")}>Mark as Hired</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusUpdate(applicant.id, "rejected")} className="text-destructive">Reject</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {applicant.cover_letter && (
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Cover Letter</h4>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {applicant.cover_letter}
          </p>
        </div>
      )}
    </div>
  );
}
