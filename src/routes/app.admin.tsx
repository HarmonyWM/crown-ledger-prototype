import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Cpu, Database, Globe, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/app/admin")({
  head: () => ({ meta: [{ title: "Admin — CrownLedger" }] }),
  component: Admin,
});

const tiles = [
  { label: "Users", value: "12,480", trend: "+312 this week" },
  { label: "Events", value: "318", trend: "8 active" },
  { label: "Contestants", value: "4,118", trend: "Across all events" },
  { label: "Judges", value: "284", trend: "62 currently scoring" },
  { label: "Sponsors", value: "182", trend: "R 18.4M LTV" },
  { label: "Votes processed", value: "2.42M", trend: "+34% MoM" },
  { label: "Tickets issued", value: "84,210", trend: "R 14.2M revenue" },
  { label: "Payments processed", value: "R 26.8M", trend: "0.04% disputes" },
];

const health = [
  { label: "API uptime (30d)", value: 99.99, icon: Activity },
  { label: "Database load", value: 42, icon: Database },
  { label: "Edge cache hit-rate", value: 96, icon: Globe },
  { label: "CPU usage (avg)", value: 28, icon: Cpu },
];

function Admin() {
  return (
    <div>
      <PageHeader title="Administrator" subtitle="System-wide controls and platform health" actions={<Badge className="glass-gold border-0 text-gold"><ShieldCheck className="h-3 w-3 mr-1"/>All systems operational</Badge>}/>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((t) => (
          <Card key={t.label} className="glass border-border p-5">
            <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{t.label}</div>
            <div className="mt-2 text-2xl font-display">{t.value}</div>
            <div className="text-xs text-gold mt-1">{t.trend}</div>
          </Card>
        ))}
      </div>

      <Card className="glass border-border p-5 mt-6">
        <h3 className="font-display text-lg mb-4">Platform Health</h3>
        <div className="grid sm:grid-cols-2 gap-5">
          {health.map((h) => (
            <div key={h.label} className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-secondary/60 grid place-items-center"><h.icon className="h-4 w-4 text-gold"/></div>
              <div className="flex-1">
                <div className="flex justify-between text-sm"><span>{h.label}</span><span className="text-gold">{h.value}%</span></div>
                <Progress value={h.value} className="mt-1.5"/>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
