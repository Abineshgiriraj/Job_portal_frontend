import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Plus, Loader2 } from "lucide-react";
import { DashboardLayout } from "@/react-app/components/layout";
import { Button } from "@/react-app/components/ui/button";
import { JobCard } from "@/react-app/components/JobCard";
import api from "@/react-app/api/axios";
import type { Job } from "@/shared/types";

export default function RecruiterJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<Job[]>("jobs/my-jobs/");
        setJobs(response.data);
      } catch (err) {
        console.error("Failed to fetch recruiter jobs:", err);
        setError("Failed to load your job postings. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyJobs();
  }, []);

  return (
    <DashboardLayout role="recruiter">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Job Postings</h1>
          <p className="text-muted-foreground">
            Manage and track the performance of your job listings
          </p>
        </div>
        <Link to="/dashboard/create">
          <Button className="glow-primary">
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </Link>
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
      ) : jobs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="glass rounded-xl p-12 text-center">
          <p className="text-muted-foreground mb-6">
            You haven't posted any jobs yet.
          </p>
          <Link to="/dashboard/create">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Post Your First Job
            </Button>
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
}
