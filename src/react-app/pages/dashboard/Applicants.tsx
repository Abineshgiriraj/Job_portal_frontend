import { DashboardLayout } from "@/react-app/components/layout";

export default function ApplicantsPage() {
  return (
    <DashboardLayout role="recruiter">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Applicants</h1>
        <p className="text-muted-foreground">
          Your real applicants will appear here once wired to the backend.
        </p>
      </div>
      <div className="glass rounded-xl p-12 text-center">
        <p className="text-muted-foreground">
          No applicants to display yet. Once candidates apply to your jobs, you’ll see
          them here.
        </p>
      </div>
    </DashboardLayout>
  );
}
