import { DashboardLayout } from "@/react-app/components/layout";

export default function ApplicationsPage() {
  return (
    <DashboardLayout role="job_seeker">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">My Applications</h1>
        <p className="text-muted-foreground">
          Your real applications will appear here once wired to the backend.
        </p>
      </div>
      <div className="glass rounded-xl p-12 text-center">
        <p className="text-muted-foreground">
          No applications to display yet. Apply to jobs to see them here.
        </p>
      </div>
    </DashboardLayout>
  );
}
