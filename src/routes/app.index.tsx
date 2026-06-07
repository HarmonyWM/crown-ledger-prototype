import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { contestants, event, judges, revenueSeries, ticketTiers, sponsors, engagementSeries } from "@/lib/mock-data";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart, Legend } from "recharts";
import { ArrowUpRight, TrendingUp, Users, Ticket, Vote, Crown, Calendar, Radio } from "lucide-react";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Dashboard — CrownLedger" }] }),
  component: Dashboard,
});

const kpis = [
  { label: "Active Contestants", value: "10", trend: "+2 this week", icon: Users, color: "text-gold" },
  { label: "Tickets Sold", value: "R 168,400", trend: "+18% vs last event", icon: Ticket, color: "text-gold" },
  { label: "Audience Votes", value: "24,812", trend: "+34% past 24h", icon: Vote, color: "text-gold" },
  { label: "Sponsor Impressions", value: "925.6K", trend: "+12% week", icon: TrendingUp, color: "text-gold" },
];

function Dashboard() {
  const top = [...contestants].sort((a,b) => b.score - a.score).slice(0,5);
  return (
    <div>
      <PageHeader
        title="Finale Command Center"
        subtitle="Miss UJ APK 2027 · Live · University of Johannesburg APK"
        actions={<>
          <Link to="/app/livestream"><Button variant="outline"><Radio className="h-4 w-4 mr-2" />Open Livestream</Button></Link>
          <Link to="/app/judging"><Button className="bg-gold-gradient text-background">Enter Judge Mode</Button></Link>
        </>}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.label} className="glass border-border p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{k.label}</div>
              <k.icon className={`h-4 w-4 ${k.color}`} />
            </div>
            <div className="mt-3 text-3xl font-display font-semibold">{k.value}</div>
            <div className="text-xs text-gold mt-1 flex items-center gap-1"><ArrowUpRight className="h-3 w-3" /> {k.trend}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <Card className="glass border-border p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg">Revenue & Engagement (last 7 days)</h3>
              <p className="text-xs text-muted-foreground">Ticket sales, vote packages, sponsor revenue</p>
            </div>
            <Badge className="glass-gold border-0 text-gold">+ R 184k week</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={revenueSeries}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D4AF37" stopOpacity={0.6}/><stop offset="100%" stopColor="#D4AF37" stopOpacity={0}/></linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6A0DAD" stopOpacity={0.5}/><stop offset="100%" stopColor="#6A0DAD" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" stroke="#888" fontSize={11}/>
                <YAxis stroke="#888" fontSize={11}/>
                <Tooltip contentStyle={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="tickets" stroke="#D4AF37" fill="url(#g1)" strokeWidth={2}/>
                <Area type="monotone" dataKey="sponsors" stroke="#6A0DAD" fill="url(#g2)" strokeWidth={2}/>
                <Area type="monotone" dataKey="votes" stroke="#F7F4EA" fill="none" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass-gold border-0 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg">Live Rankings</h3>
            <Badge className="bg-destructive/20 text-foreground border border-destructive/40">● LIVE</Badge>
          </div>
          <div className="space-y-2">
            {top.map((c, i) => (
              <div key={c.id} className="flex items-center gap-3 p-2 rounded-lg bg-background/30">
                <div className="h-8 w-8 rounded-full bg-gold-gradient grid place-items-center text-background font-semibold text-sm">{i+1}</div>
                <img src={c.photo} className="h-9 w-9 rounded-full object-cover border border-gold/40" alt={c.name}/>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{c.name}</div>
                  <div className="text-[10px] text-muted-foreground">{c.number}</div>
                </div>
                <div className="text-gold font-display text-lg">{c.score.toFixed(1)}</div>
              </div>
            ))}
          </div>
          <Link to="/app/judging"><Button variant="outline" className="w-full mt-4">View full leaderboard</Button></Link>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-6">
        <Card className="glass border-border p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg">Livestream Engagement</h3>
            <Badge variant="outline">Tonight</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={engagementSeries}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="hour" stroke="#888" fontSize={11}/>
                <YAxis stroke="#888" fontSize={11}/>
                <Tooltip contentStyle={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11 }}/>
                <Line type="monotone" dataKey="viewers" stroke="#D4AF37" strokeWidth={2} dot={false}/>
                <Line type="monotone" dataKey="votes" stroke="#6A0DAD" strokeWidth={2} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass border-border p-5">
          <h3 className="font-display text-lg mb-4">Tonight at a Glance</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3"><Calendar className="h-4 w-4 text-gold" /><div><div className="font-medium">{event.date}</div><div className="text-xs text-muted-foreground">{event.location}</div></div></div>
            <div className="flex items-center gap-3"><Users className="h-4 w-4 text-gold" /><div><div className="font-medium">{event.contestants} contestants · {event.judges} judges</div><div className="text-xs text-muted-foreground">{event.audience} seated audience</div></div></div>
            <div>
              <div className="flex justify-between text-xs mb-1"><span>Tickets capacity</span><span className="text-gold">86%</span></div>
              <Progress value={86} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1"><span>Judging completion</span><span className="text-gold">72%</span></div>
              <Progress value={72} />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1"><span>Sponsor delivery</span><span className="text-gold">94%</span></div>
              <Progress value={94} />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <Card className="glass border-border p-5">
          <h3 className="font-display text-lg mb-4">Ticket Tiers</h3>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={ticketTiers}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="#888" fontSize={11}/>
                <YAxis stroke="#888" fontSize={11}/>
                <Tooltip contentStyle={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}/>
                <Bar dataKey="sold" fill="#D4AF37" radius={[6,6,0,0]}/>
                <Bar dataKey="capacity" fill="#6A0DAD" radius={[6,6,0,0]} opacity={0.4}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass border-border p-5">
          <h3 className="font-display text-lg mb-4">Judge Activity</h3>
          <div className="space-y-3">
            {judges.map((j) => (
              <div key={j.id} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-royal-gradient grid place-items-center text-xs font-semibold">{j.name.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{j.name}</div>
                  <div className="text-xs text-muted-foreground">{j.title}</div>
                </div>
                <div className="w-32">
                  <Progress value={(j.scored/10)*100} />
                  <div className="text-[10px] text-muted-foreground mt-1 text-right">{j.scored}/10 scored</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="glass border-border p-5 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg">Sponsor Performance</h3>
          <Link to="/app/sponsors"><Button variant="ghost" size="sm">View all <ArrowUpRight className="h-3 w-3 ml-1"/></Button></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {sponsors.map((s) => (
            <div key={s.name} className="rounded-xl border border-border p-4">
              <div className="flex items-center justify-between"><div className="font-semibold">{s.name}</div><Badge variant="outline" className="text-[10px]">{s.tier}</Badge></div>
              <div className="mt-3 text-2xl font-display">{(s.impressions/1000).toFixed(1)}k</div>
              <div className="text-xs text-muted-foreground">impressions · {s.clicks.toLocaleString()} clicks</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
