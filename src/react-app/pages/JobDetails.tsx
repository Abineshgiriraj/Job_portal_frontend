import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, MapPin, DollarSign, Calendar, Briefcase, Loader2 } from "lucide-react";
import { PageLayout } from "@/react-app/components/layout";
import { Button } from "@/react-app/components/ui/button";
import { ExperienceBadge } from "@/react-app/components/ExperienceBadge";
import api from "@/react-app/api/axios";
import type { Job } from "@/shared/types";
import { useAuth } from "@/react-app/context/AuthContext";

export default function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    api.get(`jobs/${id}/`)
      .then((res) => {
        setJob(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load job details.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleApply = () => {
    navigate(`/jobs/${id}/apply`);
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (error || !job) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">{error || "Job not found"}</h2>
          <Button onClick={() => navigate("/jobs")}>Back to Jobs</Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="glass rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-3">{job.title}</h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4" />
                  <ExperienceBadge level={job.experience_level} />
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4" />
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  }).format(job.salary)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Posted {new Date(job.postedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {role === "job_seeker" && (
              <Button size="lg" className="px-8 glow-primary" onClick={handleApply}>
                Apply Now
              </Button>
            )}
          </div>

          <div className="prose prose-invert max-w-none border-t border-border pt-8">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Job Description</h2>
            <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
              {job.description}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
