import { Link } from "react-router";
import { Plus } from "lucide-react";
import { DashboardLayout } from "@/react-app/components/layout";
import { Button } from "@/react-app/components/ui/button";

export default function RecruiterJobsPage() {
  return (
    <DashboardLayout role="recruiter">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Job Postings</h1>
          <p className="text-muted-foreground">
            Your real job postings will appear here once wired to the backend.
          </p>
        </div>
        <Link to="/dashboard/create">
          <Button className="glow-primary">
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </Link>
      </div>

      <div className="glass rounded-xl p-12 text-center">
        <p className="text-muted-foreground">
          You have no jobs to display yet. Create a job to see it here.
        </p>
      </div>
    </DashboardLayout>
  );
}
