import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { revenueSeries, engagementSeries, sponsors } from "@/lib/mock-data";
import { Area, AreaChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — CrownLedger" }] }),
  component: Analytics,
});

const COLORS = ["#D4AF37", "#6A0DAD", "#F7F4EA", "#9b59b6", "#E2231A"];

function Analytics() {
  return (
    <div>
      <PageHeader title="Executive Analytics" subtitle="Board-room ready charts across every revenue and engagement vector." />
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="glass border-border p-5 lg:col-span-2">
          <h3 className="font-display text-lg mb-3">Revenue Breakdown</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={revenueSeries}>
                <defs>
                  <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D4AF37" stopOpacity={0.6}/><stop offset="100%" stopColor="#D4AF37" stopOpacity={0}/></linearGradient>
                  <linearGradient id="a2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6A0DAD" stopOpacity={0.6}/><stop offset="100%" stopColor="#6A0DAD" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)"/>
                <XAxis dataKey="day" stroke="#888" fontSize={11}/><YAxis stroke="#888" fontSize={11}/>
                <Tooltip contentStyle={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}/>
                <Legend wrapperStyle={{ fontSize: 11 }}/>
                <Area type="monotone" dataKey="tickets" stroke="#D4AF37" fill="url(#a1)" strokeWidth={2}/>
                <Area type="monotone" dataKey="sponsors" stroke="#6A0DAD" fill="url(#a2)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="glass border-border p-5">
          <h3 className="font-display text-lg mb-3">Sponsor Share of Voice</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={sponsors} dataKey="impressions" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
                  {sponsors.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}
                </Pie>
                <Tooltip contentStyle={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}/>
                <Legend wrapperStyle={{ fontSize: 11 }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <Card className="glass border-border p-5">
          <h3 className="font-display text-lg mb-3">Engagement Tonight</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={engagementSeries}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)"/>
                <XAxis dataKey="hour" stroke="#888" fontSize={11}/><YAxis stroke="#888" fontSize={11}/>
                <Tooltip contentStyle={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}/>
                <Line dataKey="viewers" stroke="#D4AF37" strokeWidth={2} dot={false}/>
                <Line dataKey="votes" stroke="#6A0DAD" strokeWidth={2} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="glass border-border p-5">
          <h3 className="font-display text-lg mb-3">Demographics</h3>
          <div className="space-y-3 text-sm">
            {[["18-24", 48],["25-34", 31],["35-44", 14],["45+", 7]].map(([l,v]) => (
              <div key={l as string}>
                <div className="flex justify-between text-xs mb-1"><span>{l}</span><span className="text-gold">{v}%</span></div>
                <div className="h-2 rounded-full bg-secondary/50 overflow-hidden"><div className="h-full bg-gold-gradient" style={{ width: `${v}%` }}/></div>
              </div>
            ))}
            <div className="pt-4 border-t border-border mt-4 grid grid-cols-3 gap-3 text-center">
              <div><div className="text-2xl font-display text-gold">62%</div><div className="text-xs text-muted-foreground">Female</div></div>
              <div><div className="text-2xl font-display text-gold">36%</div><div className="text-xs text-muted-foreground">Male</div></div>
              <div><div className="text-2xl font-display text-gold">2%</div><div className="text-xs text-muted-foreground">Other</div></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
