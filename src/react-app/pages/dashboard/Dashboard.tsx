import { Link, Navigate } from "react-router";
import {
  Briefcase,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle2,
  Users,
  Eye,
  ArrowRight,
} from "lucide-react";
import { DashboardLayout } from "@/react-app/components/layout";
import { useAuth } from "@/react-app/context/AuthContext";
import { cn } from "@/react-app/lib/utils";

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  className,
}: {
  icon: typeof Briefcase;
  label: string;
  value: string | number;
  trend?: string;
  className?: string;
}) {
  return (
    <div className={cn("glass rounded-xl p-5", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {trend && (
            <p className="text-xs text-primary mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {trend}
            </p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
}

function SeekerDashboard() {
  return (
    <div className="glass rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-2">Job seeker dashboard</h2>
      <p className="text-sm text-muted-foreground">
        Your applications and recommendations will appear here once connected to the
        backend application APIs.
      </p>
      <div className="mt-4">
        <Link to="/jobs" className="text-primary text-sm inline-flex items-center gap-1">
          Browse jobs
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

function RecruiterDashboard() {
  return (
    <div className="glass rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-2">Recruiter dashboard</h2>
      <p className="text-sm text-muted-foreground">
        Your job postings and applicants will appear here once connected to the backend
        job and application APIs.
      </p>
      <div className="mt-4 flex gap-3">
        <Link
          to="/dashboard/jobs"
          className="text-primary text-sm inline-flex items-center gap-1"
        >
          View jobs
          <ArrowRight className="h-3 w-3" />
        </Link>
        <Link
          to="/dashboard/applicants"
          className="text-primary text-sm inline-flex items-center gap-1"
        >
          View applicants
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, role } = useAuth();

  if (!user || !role) {
    return <Navigate to="/login" replace />;
  }

  return (
    <DashboardLayout role={role}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {user?.name?.split(" ")[0] || "User"}
          </h1>
          <p className="text-muted-foreground">
            {role === "job_seeker"
              ? "Track your job applications and discover new opportunities"
              : "Manage your job postings and find the best candidates"}
          </p>
        </div>
      </div>

      {role === "job_seeker" ? <SeekerDashboard /> : <RecruiterDashboard />}
    </DashboardLayout>
  );
}
