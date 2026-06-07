import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/Logo";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Crown, Sparkles, ShieldCheck, Gavel, Vote, Ticket, BarChart3, Radio, Megaphone,
  CalendarDays, Trophy, ArrowRight, Check, Star, Users,
} from "lucide-react";
import { stats } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CrownLedger by Verity Digital — The Operating System for Modern Pageants" },
      { name: "description", content: "Transforming pageantry through transparency, technology and trust. Run contestants, judging, tickets, voting and sponsors in one premium platform." },
      { property: "og:title", content: "CrownLedger — Operating System for Modern Pageants" },
      { property: "og:description", content: "Shopify for pageants. Canva for pageant operations. Salesforce for contestant management." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Users, title: "Contestant Management", desc: "Profiles, documents, photos, attendance and journey tracking in one luxury workspace." },
  { icon: Gavel, title: "Live Judging", desc: "Weighted multi-category scoring with instant rankings and judge transparency modes." },
  { icon: Vote, title: "Audience Voting", desc: "Fraud-resistant voting with premium vote packages and live fan-favorite leaderboards." },
  { icon: Ticket, title: "Ticket Sales", desc: "General, VIP and VVIP tiers with QR tickets, seat maps and live capacity tracking." },
  { icon: Megaphone, title: "Sponsor Analytics", desc: "Give sponsors a portal with impressions, click-through and engagement they can prove." },
  { icon: CalendarDays, title: "Event Management", desc: "Templates, archives, duplicates and a finale command center for night-of-show." },
  { icon: BarChart3, title: "Executive Reporting", desc: "Boardroom-ready PDF reports for organizers, judges, sponsors and finance." },
  { icon: Radio, title: "Livestream + Chat", desc: "Branded livestream with sponsor banners, live reactions and viewer analytics." },
];

const testimonials = [
  { name: "Dr. Thandiwe Sibiya", role: "Chair, Beauty Industry SA", quote: "CrownLedger removed the paperwork chaos. Our judges scored on iPads and the results were on screen in seconds." },
  { name: "Khaya Nyembe", role: "Director, Miss Soweto", quote: "Ticket revenue went up 38% in our first season. Sponsors finally have proof their money worked." },
  { name: "Lerato M.", role: "Contestant, Class of 2026", quote: "I could see my schedule, points and feedback in one place. It made me feel taken seriously." },
];

const pricing = [
  { name: "Starter", price: "R 2,500", per: "per event", desc: "For first-time organizers running a single pageant.", features: ["Up to 25 contestants", "Live judging", "Audience voting", "QR ticketing", "Basic analytics"], cta: "Start Free Trial" },
  { name: "Professional", price: "R 7,500", per: "per event", featured: true, desc: "For franchised pageants and university circuits.", features: ["Up to 100 contestants", "Multi-event dashboard", "Sponsor portal", "Livestream module", "Custom branding", "Priority support"], cta: "Book Demo" },
  { name: "Enterprise", price: "Custom", per: "annual licence", desc: "For national bodies and broadcasters.", features: ["Unlimited events & users", "White-label apps", "API & SSO", "Dedicated CSM", "Bias-detection AI", "On-site finale support"], cta: "Talk to Sales" },
];

function Landing() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <Link to="/app" className="hover:text-foreground">Live Demo</Link>
            <Link to="/roadmap" className="hover:text-foreground">Roadmap</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link to="/app"><Button size="sm" className="bg-gold-gradient text-background hover:opacity-90">Launch Demo <ArrowRight className="ml-1 h-3 w-3" /></Button></Link>
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
            <Sparkles className="h-3 w-3 mr-2" /> Trusted by 318 pageants across 14 countries
          </Badge>
          <h1 className="text-5xl md:text-7xl font-display font-semibold leading-[1.05] tracking-tight">
            Transforming Pageantry Through<br />
            <span className="text-gradient-gold">Transparency, Technology & Trust</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            CrownLedger is the complete operating system for modern pageants —
            contestants, judging, ticketing, audience engagement and sponsor analytics in one premium platform.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/app"><Button size="lg" className="bg-gold-gradient text-background hover:opacity-90 shadow-glow h-12 px-6">
              Book Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button></Link>
            <Link to="/login"><Button size="lg" variant="outline" className="h-12 px-6 border-border">
              Start Free Trial
            </Button></Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: stats.contestants, l: "Contestants Managed" },
              { v: stats.votes, l: "Votes Cast" },
              { v: stats.events, l: "Events Hosted" },
              { v: stats.tickets, l: "Tickets Sold" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-6">
                <div className="text-3xl md:text-4xl font-display font-semibold text-gradient-gold">{s.v}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-2">{s.l}</div>
              </div>
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

      {/* Showcase strip */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="border-primary/40 text-foreground mb-4">Finale Command Center</Badge>
            <h2 className="text-4xl font-display font-semibold">Run finale night like a broadcast studio.</h2>
            <p className="text-muted-foreground mt-4">
              Live judge activity, contestant queue, stage timer, MC prompts and instant rankings — projected to the main screen and synchronized with your livestream.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Weighted scoring with transparency modes", "Real-time winner prediction", "MC dashboard with cues", "Automatic award calculation"].map((b) => (
                <li key={b} className="flex items-start gap-3"><Check className="h-4 w-4 text-gold mt-0.5" /> {b}</li>
              ))}
            </ul>
            <div className="mt-8"><Link to="/app/judging"><Button className="bg-gold-gradient text-background">Open Live Judging</Button></Link></div>
          </div>
          <div className="glass-gold rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Live Now</div>
                <div className="text-2xl font-display font-semibold mt-1">Miss UJ APK 2027</div>
              </div>
              <Badge className="bg-destructive/20 text-foreground border border-destructive/40">● LIVE</Badge>
            </div>
            <div className="space-y-3">
              {["Tshegofatso Mokoena", "Lerato Khumalo", "Naledi Molefe", "Ayanda Mokoena"].map((n, i) => (
                <div key={n} className="flex items-center gap-3 glass rounded-xl p-3">
                  <div className="h-8 w-8 rounded-full bg-gold-gradient grid place-items-center text-background font-semibold text-sm">{i+1}</div>
                  <div className="flex-1 text-sm font-medium">{n}</div>
                  <div className="text-gold font-display text-lg">{(94.8 - i*1.7).toFixed(1)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-display font-semibold text-center">Loved by the pageant world.</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            {testimonials.map((t) => (
              <Card key={t.name} className="glass border-border p-6">
                <div className="flex gap-0.5 mb-4">{Array.from({length: 5}).map((_,i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}</div>
                <p className="text-sm leading-relaxed">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-royal-gradient grid place-items-center text-xs font-semibold">{t.name.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
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
            <h2 className="text-4xl md:text-5xl font-display font-semibold">Built for one pageant or a hundred.</h2>
            <p className="text-muted-foreground mt-4">Per-event pricing. No commission on ticket or vote revenue.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {pricing.map((p) => (
              <Card key={p.name} className={`p-7 border ${p.featured ? "glass-gold border-gold/40 relative shadow-glow" : "glass border-border"}`}>
                {p.featured && <Badge className="absolute -top-3 left-7 bg-gold-gradient text-background">Most Popular</Badge>}
                <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{p.name}</div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-display font-semibold">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.per}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.features.map((f) => <li key={f} className="flex gap-2 items-start"><Check className="h-4 w-4 text-gold mt-0.5 shrink-0" />{f}</li>)}
                </ul>
                <Link to="/login" className="block mt-7">
                  <Button className={`w-full ${p.featured ? "bg-gold-gradient text-background hover:opacity-90" : ""}`} variant={p.featured ? "default" : "outline"}>
                    {p.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Crown className="h-10 w-10 text-gold mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-display font-semibold">The crown belongs on the contestant.<br/>The chaos belongs in the past.</h2>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/app"><Button size="lg" className="bg-gold-gradient text-background h-12 px-7">Launch Live Demo</Button></Link>
            <Link to="/login"><Button size="lg" variant="outline" className="h-12 px-7">Start Free Trial</Button></Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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
              <li><Link to="/roadmap" className="hover:text-gold">Roadmap</Link></li>
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
