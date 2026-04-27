import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/AppHeader";
import { Card } from "@/components/ui/card";
import { ArrowRight, ClipboardList, Sparkles, Users } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Write a structured brief",
    desc: "Tell us your project, the role you need, and the commitment you expect. Takes 5 minutes.",
  },
  {
    icon: Sparkles,
    title: "See explainable matches",
    desc: "Get ranked candidates with specific reasons — no black box, no infinite feed.",
  },
  {
    icon: Users,
    title: "Invite and start a conversation",
    desc: "Shortlist a few people and send a structured invite. They reply Interested, Maybe, or Not a fit.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1">
        <section className="container-page pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary bg-primary-soft px-3 py-1.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> ESSEC pilot — demo
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Find your first teammate.
              <br />
              <span className="text-primary">Not your hundredth contact.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              TeamZero helps phase-zero ESSEC founders move from <em>"I have an idea but no team"</em>{" "}
              to <em>"I have a few serious people worth speaking to."</em> Structured briefs, explainable
              matching, no infinite feed.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="text-base">
                <Link to="/role">
                  Start as Founder <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base">
                <Link to="/role">I'm a candidate</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container-page pb-24">
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <Card key={s.title} className="p-6 shadow-soft">
                <div className="flex items-center gap-3 mb-4">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-muted-foreground tabular-nums">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-secondary/40">
          <div className="container-page py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Built for serious first conversations.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              No public profiles. No social feed. No DM spam. Just structured matching inside a trusted
              ESSEC context.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/role">Try the demo <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t border-border">
        <div className="container-page py-6 flex items-center justify-between text-sm text-muted-foreground">
          <span>TeamZero · Classroom MVP</span>
          <span>All profiles and data are demo content.</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;