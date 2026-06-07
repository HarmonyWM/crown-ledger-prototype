import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";

export const Route = createFileRoute("/app/reports")({
  head: () => ({ meta: [{ title: "Reports — CrownLedger" }] }),
  component: Reports,
});

const reports = [
  { name: "Contestant Performance Report", pages: 24, updated: "Today, 18:42", desc: "Per-contestant scores, journey progress, attendance and judge feedback." },
  { name: "Judge Activity Report", pages: 8, updated: "Today, 18:30", desc: "Submission timelines, scoring variance and bias indicators across all judges." },
  { name: "Sponsor ROI Report", pages: 16, updated: "Yesterday", desc: "Impressions, clicks, dwell time and conversion per sponsor placement." },
  { name: "Financial Report", pages: 12, updated: "Yesterday", desc: "Ticketing, vote packages, sponsor revenue, refunds and taxable income." },
  { name: "Event Operations Report", pages: 18, updated: "2 days ago", desc: "Setup, run-of-show timing, incidents, audience flow and post-event analytics." },
  { name: "Executive Summary (Board Pack)", pages: 6, updated: "3 days ago", desc: "Single-page summaries across KPIs for the board and key stakeholders." },
];

function Reports() {
  return (
    <div>
      <PageHeader title="Reports" subtitle="Boardroom-ready PDFs · One click · Branded with your pageant" actions={<Button className="bg-gold-gradient text-background"><Download className="h-4 w-4 mr-2"/>Download All</Button>}/>
      <div className="grid md:grid-cols-2 gap-4">
        {reports.map((r) => (
          <Card key={r.name} className="glass border-border p-5 flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-gold-gradient grid place-items-center shrink-0"><FileText className="h-5 w-5 text-background"/></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap"><h3 className="font-display text-lg">{r.name}</h3><Badge variant="outline">{r.pages}pp</Badge></div>
              <p className="text-sm text-muted-foreground mt-1">{r.desc}</p>
              <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground"><span>Updated {r.updated}</span><Button size="sm" variant="outline"><Download className="h-3.5 w-3.5 mr-1"/>PDF</Button></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
