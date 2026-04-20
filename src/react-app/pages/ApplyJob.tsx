import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Upload, FileText, Loader2, CheckCircle2, Phone, Briefcase, Linkedin, Github, DollarSign, MessageSquare } from "lucide-react";
import { PageLayout } from "@/react-app/components/layout";
import { Button } from "@/react-app/components/ui/button";
import { Input } from "@/react-app/components/ui/input";
import { Label } from "@/react-app/components/ui/label";
import { Textarea } from "@/react-app/components/ui/textarea";
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

  const [formData, setFormData] = useState({
    phone: "",
    experience_years: "",
    linkedin: "",
    portfolio: "",
    cover_letter: "",
    expected_salary: "",
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

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
      const data = new FormData();
      data.append("job", id);
      data.append("resume", resume);
      data.append("phone", formData.phone);
      data.append("experience_years", formData.experience_years);
      
      if (formData.linkedin) data.append("linkedin", formData.linkedin);
      if (formData.portfolio) data.append("portfolio", formData.portfolio);
      if (formData.cover_letter) data.append("cover_letter", formData.cover_letter);
      if (formData.expected_salary) data.append("expected_salary", formData.expected_salary);

      await api.post("applications/apply/", data, {
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
        // Handle Django Rest Framework standard error format (detail or field-specific errors)
        if (data.detail) {
          setError(data.detail);
        } else if (typeof data === 'object') {
          const firstError = Object.values(data)[0];
          setError(Array.isArray(firstError) ? firstError[0] : String(firstError));
        } else {
          setError("Application failed. Please check your inputs.");
        }
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
      <div className="max-w-3xl mx-auto">
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
            Applying for <span className="font-medium text-foreground">{job.title}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive animate-fade-in">
              {error}
            </div>
          )}

          {/* Section: Professional Details */}
          <div className="glass rounded-xl p-8 space-y-6">
            <h2 className="text-xl font-semibold border-b border-border pb-4">Professional Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="pl-10"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience_years">Years of Experience *</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="experience_years"
                    type="number"
                    min="0"
                    placeholder="e.g. 5"
                    className="pl-10"
                    value={formData.experience_years}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expected_salary">Expected Salary (Annual USD)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="expected_salary"
                    type="number"
                    placeholder="e.g. 120000"
                    className="pl-10"
                    value={formData.expected_salary}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    className="pl-10"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio / GitHub URL</Label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="portfolio"
                    type="url"
                    placeholder="https://github.com/username"
                    className="pl-10"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section: Resume & Cover Letter */}
          <div className="glass rounded-xl p-8 space-y-6">
            <h2 className="text-xl font-semibold border-b border-border pb-4">Documents</h2>
            
            <div className="space-y-4">
              <Label className="text-base font-semibold">Upload your Resume *</Label>
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

            <div className="space-y-2 pt-4">
              <Label htmlFor="cover_letter" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Cover Letter
              </Label>
              <Textarea
                id="cover_letter"
                placeholder="Tell us why you're a great fit for this role..."
                className="min-h-[150px]"
                value={formData.cover_letter}
                onChange={handleInputChange}
              />
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
