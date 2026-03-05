import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Upload, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { PageLayout } from "@/react-app/components/layout";
import { Button } from "@/react-app/components/ui/button";
import { Input } from "@/react-app/components/ui/input";
import { Label } from "@/react-app/components/ui/label";
import api, { isApiError } from "@/react-app/api/axios";
import type { Job } from "@/shared/types";

export default function ApplyJobPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingJob, setIsFetchingJob] = useState(true);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

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
        setIsFetchingJob(false);
      });
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        setError("Please upload a PDF file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB.");
        return;
      }
      setResume(file);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume || !id) {
      setError("Please select a resume to upload.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("job", id);
      formData.append("resume", resume);

      await api.post("applications/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsSuccess(true);
      setTimeout(() => {
        navigate("/dashboard/applications");
      }, 3000);
    } catch (err: unknown) {
      if (isApiError(err) && err.response?.data) {
        const data = err.response.data as any;
        setError(data.detail || data.message || "Failed to submit application.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetchingJob) {
    return (
      <PageLayout>
        <div className="flex h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (!job) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Job not found</h2>
          <Button onClick={() => navigate("/jobs")}>Back to Jobs</Button>
        </div>
      </PageLayout>
    );
  }

  if (isSuccess) {
    return (
      <PageLayout>
        <div className="max-w-md mx-auto text-center py-20 animate-fade-in">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-3">Application Submitted!</h1>
          <p className="text-muted-foreground mb-8">
            Your application for <span className="font-semibold text-foreground">{job.title}</span> has been sent successfully. 
            Redirecting you to your applications...
          </p>
          <Button onClick={() => navigate("/dashboard/applications")} className="w-full">
            View My Applications
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Job Details
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Apply for this Role</h1>
          <p className="text-muted-foreground">
            Applying for <span className="font-medium text-foreground">{job.title}</span> at <span className="font-medium text-foreground">{job.location}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive animate-fade-in">
              {error}
            </div>
          )}

          <div className="glass rounded-xl p-8 space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-semibold">Upload your Resume *</Label>
              <p className="text-sm text-muted-foreground">
                Please upload your resume in PDF format (max 5MB).
              </p>
              
              <div 
                className={`relative border-2 border-dashed rounded-xl p-10 transition-all flex flex-col items-center justify-center gap-4 ${
                  resume ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/30 hover:bg-secondary/50'
                }`}
              >
                <input
                  type="file"
                  id="resume"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  required
                />
                
                {resume ? (
                  <>
                    <div className="rounded-full bg-primary/10 p-3">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-foreground">{resume.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(resume.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-destructive"
                      onClick={(e) => {
                        e.preventDefault();
                        setResume(null);
                      }}
                    >
                      Remove and replace
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="rounded-full bg-secondary p-3 text-muted-foreground">
                      <Upload className="h-8 w-8" />
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Click or drag to upload</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF only, up to 5MB</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !resume} className="min-w-[180px] glow-primary">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}
