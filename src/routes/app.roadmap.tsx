import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/roadmap")({
  head: () => ({ meta: [{ title: "Roadmap — CrownLedger" }] }),
  component: Roadmap,
});

const phases = [
  { phase: "Phase 1", title: "Today", status: "Shipped", items: ["Contestant management","Live judging","Audience voting","Ticketing","Sponsor portal","Livestream","Analytics","Reports"] },
  { phase: "Phase 2", title: "Q3 2027", status: "In Build", items: ["AI score analysis","Bias detection","Mobile apps (iOS / Android)","Multi-pageant management","Franchise support"] },
  { phase: "Phase 3", title: "Q1 2028", status: "Planned", items: ["National rankings","Contestant career profiles","Digital certificates","Scholarship tracking","Sponsor marketplace"] },
];

function Roadmap() {
  return (
    <div>
      <PageHeader title="Product Roadmap" subtitle="The next 12 months of CrownLedger"/>
      <div className="grid lg:grid-cols-3 gap-4">
        {phases.map((p) => (
          <Card key={p.phase} className={`p-6 border ${p.status==="In Build" ? "glass-gold border-gold/40" : "glass border-border"}`}>
            <div className="flex items-center justify-between"><Badge variant="outline">{p.phase}</Badge><Badge className={p.status==="Shipped" ? "bg-gold/15 text-gold border border-gold/40" : p.status==="In Build" ? "bg-primary/30 text-foreground border border-primary/40" : "bg-secondary"}>{p.status}</Badge></div>
            <h3 className="font-display text-2xl mt-4">{p.title}</h3>
            <ul className="mt-5 space-y-2 text-sm">
              {p.items.map(i => <li key={i} className="flex gap-2 items-start"><Sparkles className="h-3.5 w-3.5 text-gold mt-1 shrink-0"/>{i}</li>)}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
