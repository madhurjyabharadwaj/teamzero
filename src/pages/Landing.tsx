import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/AppHeader";
import { AmbientBackground } from "@/components/AmbientBackground";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
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
      <AmbientBackground />
      <AppHeader />
      <main className="flex-1">
        <section className="container-page relative pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="mt-6 text-5xl md:text-7xl font-normal tracking-tight leading-[1.02]">
              Find your first teammate.
              <br />
              <span className="text-gradient">Not your hundredth contact.</span>
            </h1>
            <p className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              TeamZero helps phase-zero ESSEC founders move from <em className="text-foreground/80 not-italic">"I have an idea but no team"</em>{" "}
              to <em className="text-foreground/80 not-italic">"I have a few serious people worth speaking to."</em> Structured briefs, explainable matching, no infinite feed.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="text-base h-12 px-7 gradient-iridescent text-primary-foreground border-0 hover:opacity-95 shadow-glow btn-shimmer transition-transform hover:scale-[1.02]"
              >
                <Link to="/role">
                  Start as Founder <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base h-12 px-7 border-white/15 bg-white/5 hover:bg-white/10 hover:text-foreground backdrop-blur-md"
              >
                <Link to="/role">I'm a candidate</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container-page pb-28">
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <GlassCard className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="relative grid h-11 w-11 place-items-center rounded-xl gradient-iridescent text-primary-foreground shadow-glow">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground tabular-nums">
                      Step 0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="relative border-t border-white/5">
          <div className="container-page py-20 md:py-24 text-center relative">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-normal tracking-tight">
                Built for serious{" "}
                <span className="text-gradient">first conversations.</span>
              </h2>
              <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-lg">
                No public profiles. No social feed. No DM spam. Just structured matching inside a trusted ESSEC context.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-10 h-12 px-7 gradient-iridescent text-primary-foreground border-0 shadow-glow btn-shimmer transition-transform hover:scale-[1.02]"
              >
                <Link to="/role">Try the demo <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/5">
        <div className="container-page py-6 flex items-center justify-between text-sm text-muted-foreground">
          <span>TeamZero · Classroom MVP</span>
          <span>All profiles and data are demo content.</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;