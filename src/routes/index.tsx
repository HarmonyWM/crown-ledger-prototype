import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/Logo";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Crown, Sparkles, ShieldCheck, Gavel, Vote, Ticket, BarChart3, Radio, Megaphone,
  CalendarDays, ArrowRight, Check, Users, Eye, Zap, Heart,
} from "lucide-react";
import { RequestDemoDialog } from "@/components/dialogs/RequestDemoDialog";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CrownLedger by Verity Digital — The Operating System for Modern Pageantry" },
      { name: "description", content: "Manage contestants, judges, sponsors, ticketing, audience voting, livestreams, communications and analytics from one platform." },
      { property: "og:title", content: "CrownLedger — The Operating System for Modern Pageantry" },
      { property: "og:description", content: "Built by Verity Digital to bring transparency, professionalism and efficiency to pageant management." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Users, title: "Contestant Management", desc: "Profiles, documents, photos, attendance and journey tracking in one workspace." },
  { icon: Gavel, title: "Live Judging", desc: "Weighted multi-category scoring with instant rankings and judge transparency modes." },
  { icon: Vote, title: "Audience Voting", desc: "Fraud-resistant voting with premium vote packages and live fan-favorite leaderboards." },
  { icon: Ticket, title: "Ticket Sales", desc: "General, VIP and VVIP tiers with QR tickets, seat maps and live capacity tracking." },
  { icon: Megaphone, title: "Sponsor Analytics", desc: "Give sponsors a portal with impressions, click-through and engagement they can prove." },
  { icon: CalendarDays, title: "Event Management", desc: "Templates, archives, duplicates and a finale command center for night-of-show." },
  { icon: BarChart3, title: "Executive Reporting", desc: "Boardroom-ready PDF reports for organizers, judges, sponsors and finance." },
  { icon: Radio, title: "Livestream + Chat", desc: "Branded livestream with sponsor banners, live reactions and viewer analytics." },
];

const why = [
  { icon: Eye, title: "Transparent Scoring", desc: "Weighted, auditable scorecards every judge and organizer can defend." },
  { icon: Zap, title: "Real-Time Judging", desc: "Tablet-driven scoring with live rankings and instant winner calculation." },
  { icon: Crown, title: "Centralized Management", desc: "Contestants, sponsors, tickets and comms in one source of truth." },
  { icon: Heart, title: "Audience Engagement", desc: "Voting, livestream and fan portals that grow your pageant's reach." },
  { icon: ShieldCheck, title: "Professional Operations", desc: "POPIA & GDPR aligned with role-based access for every stakeholder." },
];

const pricing = [
  { name: "Starter", price: "R 2,999", per: "per event", desc: "School & community pageants.", features: ["Up to 20 contestants", "Live judging", "Basic audience voting", "Ticket sales", "Contestant portal"], cta: "Start Free Trial" },
  { name: "Professional", price: "R 7,999", per: "per event", featured: true, desc: "Regional & franchised pageants.", features: ["Up to 100 contestants", "Advanced judging", "Audience voting", "Sponsor portal", "Ticketing & communications", "Analytics dashboard"], cta: "Request Demo" },
  { name: "Enterprise", price: "Custom", per: "annual licence", desc: "National pageants & organizations.", features: ["Unlimited contestants & judges", "Livestream integration", "Advanced analytics", "Custom branding", "Dedicated support", "API integrations"], cta: "Talk to Sales" },
];

const addons = [
  "Audience Voting Module", "Livestream Module", "Tablet Rental for Judges",
  "Custom Event Branding", "Event Website", "SMS Notifications", "Professional Analytics Package",
];

const animatedStats = [
  { v: 318, suffix: "", l: "Events Managed" },
  { v: 12480, suffix: "", l: "Contestants Registered" },
  { v: 2.4, suffix: "M", l: "Votes Processed", decimals: 1 },
  { v: 84210, suffix: "", l: "Tickets Sold" },
  { v: 182, suffix: "", l: "Sponsors Managed" },
];

function useCountUp(target: number, duration = 1600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0; const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setN(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return n;
}

function Stat({ v, suffix, l, decimals = 0 }: { v: number; suffix: string; l: string; decimals?: number }) {
  const n = useCountUp(v);
  const display = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString();
  return (
    <div className="glass rounded-2xl p-6 text-center">
      <div className="text-3xl md:text-4xl font-display font-semibold text-gradient-gold">{display}{suffix}</div>
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-2">{l}</div>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#why" className="hover:text-foreground">Why CrownLedger</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <Link to="/app" className="hover:text-foreground">Live Demo</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <RequestDemoDialog>
              <Button size="sm" className="bg-gold-gradient text-background hover:opacity-90">Request Demo <ArrowRight className="ml-1 h-3 w-3" /></Button>
            </RequestDemoDialog>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full bg-primary/20 blur-[160px]" />
          <div className="absolute top-40 right-0 w-[600px] h-[600px] rounded-full bg-gold/10 blur-[140px]" />
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
          <Badge className="glass-gold text-gold border-0 mb-6">
            <Sparkles className="h-3 w-3 mr-2" /> A Verity Digital product
          </Badge>
          <h1 className="text-5xl md:text-7xl font-display font-semibold leading-[1.05] tracking-tight">
            The Operating System for<br />
            <span className="text-gradient-gold">Modern Pageantry</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Manage contestants, judges, sponsors, ticketing, audience voting, livestreams, communications and analytics from one platform.
          </p>
          <p className="mt-3 text-sm text-muted-foreground max-w-2xl mx-auto">
            Built by Verity Digital to bring transparency, professionalism and efficiency to pageant management.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <RequestDemoDialog>
              <Button size="lg" className="bg-gold-gradient text-background hover:opacity-90 shadow-glow h-12 px-6">
                Request Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </RequestDemoDialog>
            <Link to="/app/events"><Button size="lg" variant="outline" className="h-12 px-6 border-border">Launch Event</Button></Link>
            <Link to="/app"><Button size="lg" variant="ghost" className="h-12 px-6">Explore Platform</Button></Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4">
            {animatedStats.map((s) => <Stat key={s.l} {...s} />)}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Badge variant="outline" className="border-gold/40 text-gold mb-4">Our Mission</Badge>
          <h2 className="text-3xl md:text-4xl font-display font-semibold leading-tight">
            "CrownLedger exists to bring <span className="text-gradient-gold">transparency, accountability and professionalism</span> to pageant management."
          </h2>
        </div>
      </section>

      {/* Why */}
      <section id="why" className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="outline" className="border-gold/40 text-gold mb-4">Why CrownLedger</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-semibold">Pageantry, professionalized.</h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {why.map((w) => (
              <Card key={w.title} className="glass border-border p-6 hover:border-gold/40 transition">
                <div className="h-11 w-11 rounded-xl bg-royal-gradient grid place-items-center mb-4"><w.icon className="h-5 w-5 text-gold" /></div>
                <h3 className="font-semibold">{w.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{w.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-gold/40 text-gold mb-4">The Platform</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-semibold">One platform. Every role. Zero spreadsheets.</h2>
            <p className="text-muted-foreground mt-4">
              Built for organizers, judges, contestants, sponsors, audience and administrators — each with a portal tailored to them.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f) => (
              <Card key={f.title} className="glass border-border p-6 hover:border-gold/40 transition group">
                <div className="h-11 w-11 rounded-xl bg-royal-gradient grid place-items-center mb-4 group-hover:scale-105 transition">
                  <f.icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="font-semibold text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="outline" className="border-gold/40 text-gold mb-4">Pricing</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-semibold">Built for one pageant or a national circuit.</h2>
            <p className="text-muted-foreground mt-4">Per-event pricing. No commission on ticket or vote revenue.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {pricing.map((p) => (
              <Card key={p.name} className={`p-7 border ${p.featured ? "glass-gold border-gold/40 relative shadow-glow" : "glass border-border"}`}>
                {p.featured && <Badge className="absolute -top-3 left-7 bg-gold-gradient text-background">Most Popular</Badge>}
                <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">CrownLedger {p.name}</div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-display font-semibold">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.per}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Best for: {p.desc}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.features.map((f) => <li key={f} className="flex gap-2 items-start"><Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />{f}</li>)}
                </ul>
                <RequestDemoDialog>
                  <Button className={`w-full mt-7 ${p.featured ? "bg-gold-gradient text-background hover:opacity-90" : ""}`} variant={p.featured ? "default" : "outline"}>
                    {p.cta}
                  </Button>
                </RequestDemoDialog>
              </Card>
            ))}
          </div>

          <div className="mt-14">
            <div className="text-center mb-6">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Optional Add-Ons</div>
              <h3 className="text-2xl font-display mt-2">Extend any plan</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {addons.map((a) => (
                <Badge key={a} variant="outline" className="border-border text-foreground py-2 px-4 text-sm">{a}</Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Crown className="h-10 w-10 text-gold mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-display font-semibold">The crown belongs on the contestant.<br/>The chaos belongs in the past.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <RequestDemoDialog>
              <Button size="lg" className="bg-gold-gradient text-background h-12 px-7">Request Demo</Button>
            </RequestDemoDialog>
            <Link to="/app"><Button size="lg" variant="outline" className="h-12 px-7">Launch Live Demo</Button></Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo />
            <p className="text-sm text-muted-foreground mt-4 max-w-sm">A Verity Digital product. Built in Johannesburg for pageant organizers across Africa and the world.</p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Product</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-gold">Features</a></li>
              <li><a href="#pricing" className="hover:text-gold">Pricing</a></li>
              <li><Link to="/app" className="hover:text-gold">Live Demo</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Company</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Verity Digital (Pty) Ltd</li>
              <li>Johannesburg, South Africa</li>
              <li>hello@crownledger.co</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-border flex flex-wrap justify-between gap-3 text-xs text-muted-foreground">
          <div>© 2027 Verity Digital. All rights reserved.</div>
          <div className="flex gap-4"><ShieldCheck className="h-3.5 w-3.5 inline" /> POPIA & GDPR compliant · ISO 27001 in progress</div>
        </div>
      </footer>
    </div>
  );
}
