import { Link, Navigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { DashboardLayout } from "@/react-app/components/layout";
import { useAuth } from "@/react-app/context/AuthContext";


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

