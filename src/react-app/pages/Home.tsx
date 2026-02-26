import { PageLayout } from "@/react-app/components/layout";
import { Briefcase, Search, MapPin, Building2 } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { Input } from "@/react-app/components/ui/input";

export default function HomePage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-12 md:py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/50 text-sm text-muted-foreground mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            2,500+ jobs available
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Find your next{" "}
            <span className="text-gradient">opportunity</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with top companies and discover roles that match your skills.
            Your career journey starts here.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Job title, company, or keyword"
                className="pl-10 h-12 bg-card border-border"
              />
            </div>
            <div className="relative flex-1 sm:max-w-[200px]">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Location"
                className="pl-10 h-12 bg-card border-border"
              />
            </div>
            <Button size="lg" className="h-12 px-8 glow-primary">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "2,500+", label: "Active Jobs" },
            { value: "850+", label: "Companies" },
            { value: "12K+", label: "Job Seekers" },
            { value: "98%", label: "Success Rate" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-12">
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            Trusted by leading companies
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
          {["Vercel", "Stripe", "Linear", "Notion", "Figma", "GitHub"].map(
            (company) => (
              <div
                key={company}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Building2 className="h-5 w-5" />
                <span className="font-medium">{company}</span>
              </div>
            )
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="glass rounded-2xl p-8 md:p-12 text-center glow-primary">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to take the next step?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Create your profile and let companies find you. Join thousands of
            professionals who found their dream job through HireFlow.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="glow-primary">
              <Briefcase className="h-4 w-4 mr-2" />
              Browse Jobs
            </Button>
            <Button size="lg" variant="outline">
              Post a Job
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
