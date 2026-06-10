import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { Download, FileText, BarChart3, TrendingUp, Users, Ticket, Vote, Megaphone, Radio } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { revenueSeries, engagementSeries, sponsors, contestants, ticketTiers } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/app/reports")({
  component: Reports,
});

const COLORS = ["#D4AF37", "#6A0DAD", "#F7F4EA", "#9b59b6", "#E2231A"];

const reportCards = [
  { name: "Contestant Performance", pages: 24, updated: "Today, 18:42", desc: "Scores, journey progress, attendance and judge feedback.", icon: Users, tab: "contestants" },
  { name: "Voting Analytics", pages: 12, updated: "Today, 18:50", desc: "Vote distribution, package sales, fan favorite trends.", icon: Vote, tab: "voting" },
  { name: "Ticket Sales Report", pages: 10, updated: "Today, 17:30", desc: "Revenue per tier, conversion rates, check-in stats.", icon: Ticket, tab: "tickets" },
  { name: "Sponsor ROI Report", pages: 16, updated: "Yesterday", desc: "Impressions, clicks, dwell time, engagement per sponsor.", icon: Megaphone, tab: "sponsors" },
  { name: "Livestream Analytics", pages: 8, updated: "Today, 21:00", desc: "Viewer counts, peak times, reactions, chat volume.", icon: Radio, tab: "livestream" },
  { name: "Executive Summary", pages: 6, updated: "3 days ago", desc: "Board-ready KPI summaries across all revenue vectors.", icon: BarChart3, tab: "executive" },
];

function Reports() {
  const [openReport, setOpenReport] = useState<typeof reportCards[0] | null>(null);

  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Boardroom-ready exports · One click · Branded with your pageant"
        actions={<Button className="bg-gold-gradient text-background" onClick={() => toast.success("All reports downloaded as ZIP.")}><Download className="h-4 w-4 mr-2" />Download All</Button>}
      />

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Revenue", value: "R 168,400", trend: "+18%", icon: TrendingUp },
          { label: "Audience Votes", value: "24,812", trend: "+34%", icon: Vote },
          { label: "Tickets Sold", value: "424", trend: "86% capacity", icon: Ticket },
          { label: "Sponsor Impressions", value: "925K", trend: "+12%", icon: Megaphone },
        ].map(k => (
          <Card key={k.label} className="glass border-border p-5">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{k.label}</div>
              <k.icon className="h-4 w-4 text-gold" />
            </div>
            <div className="mt-2 text-2xl font-display">{k.value}</div>
            <div className="text-xs text-gold mt-1">{k.trend}</div>
          </Card>
        ))}
      </div>

      {/* Report Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {reportCards.map((r) => (
          <Card key={r.name} className="glass border-border p-5 flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-gold-gradient grid place-items-center shrink-0"><r.icon className="h-5 w-5 text-background" /></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display text-lg">{r.name}</h3>
                <Badge variant="outline">{r.pages}pp</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{r.desc}</p>
              <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground flex-wrap gap-2">
                <span>Updated {r.updated}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setOpenReport(r)}><BarChart3 className="h-3.5 w-3.5 mr-1" />View</Button>
                  <Button size="sm" variant="outline" onClick={() => toast.success(`${r.name} exported as PDF.`)}><Download className="h-3.5 w-3.5 mr-1" />PDF</Button>
                  <Button size="sm" variant="outline" onClick={() => toast.success(`${r.name} exported as Excel.`)}><FileText className="h-3.5 w-3.5 mr-1" />Excel</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Report Detail Sheet */}
      <Sheet open={!!openReport} onOpenChange={() => setOpenReport(null)}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {openReport && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle className="font-display text-2xl">{openReport.name}</SheetTitle>
              </SheetHeader>
              <Tabs defaultValue={openReport.tab}>
                <TabsList className="mb-4">
                  <TabsTrigger value={openReport.tab}>Charts</TabsTrigger>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                </TabsList>
                <TabsContent value={openReport.tab}>
                  {openReport.tab === "tickets" && (
                    <div className="h-72"><ResponsiveContainer><BarChart data={ticketTiers}><CartesianGrid stroke="rgba(255,255,255,0.06)" /><XAxis dataKey="name" stroke="#888" fontSize={11} /><YAxis stroke="#888" fontSize={11} /><Tooltip contentStyle={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} /><Bar dataKey="sold" fill="#D4AF37" radius={[6, 6, 0, 0]} /><Bar dataKey="capacity" fill="#6A0DAD" radius={[6, 6, 0, 0]} opacity={0.4} /></BarChart></ResponsiveContainer></div>
                  )}
                  {openReport.tab === "contestants" && (
                    <div className="h-72"><ResponsiveContainer><BarChart data={contestants.slice(0, 8)} layout="vertical"><CartesianGrid stroke="rgba(255,255,255,0.06)" /><XAxis type="number" stroke="#888" fontSize={11} /><YAxis dataKey="name" type="category" stroke="#888" fontSize={10} width={120} /><Tooltip contentStyle={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} /><Bar dataKey="score" fill="#D4AF37" radius={[0, 6, 6, 0]} /></BarChart></ResponsiveContainer></div>
                  )}
                  {openReport.tab === "sponsors" && (
                    <div className="h-72"><ResponsiveContainer><PieChart><Pie data={sponsors} dataKey="impressions" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>{sponsors.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip contentStyle={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} /><Legend wrapperStyle={{ fontSize: 11 }} /></PieChart></ResponsiveContainer></div>
                  )}
                  {(openReport.tab === "voting" || openReport.tab === "executive") && (
                    <div className="h-72"><ResponsiveContainer><AreaChart data={revenueSeries}><defs><linearGradient id="rg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D4AF37" stopOpacity={0.6} /><stop offset="100%" stopColor="#D4AF37" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="rgba(255,255,255,0.06)" /><XAxis dataKey="day" stroke="#888" fontSize={11} /><YAxis stroke="#888" fontSize={11} /><Tooltip contentStyle={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} /><Area type="monotone" dataKey="votes" stroke="#D4AF37" fill="url(#rg1)" strokeWidth={2} /></AreaChart></ResponsiveContainer></div>
                  )}
                  {openReport.tab === "livestream" && (
                    <div className="h-72"><ResponsiveContainer><AreaChart data={engagementSeries}><defs><linearGradient id="rg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6A0DAD" stopOpacity={0.6} /><stop offset="100%" stopColor="#6A0DAD" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="rgba(255,255,255,0.06)" /><XAxis dataKey="hour" stroke="#888" fontSize={11} /><YAxis stroke="#888" fontSize={11} /><Tooltip contentStyle={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} /><Area type="monotone" dataKey="viewers" stroke="#6A0DAD" fill="url(#rg2)" strokeWidth={2} /></AreaChart></ResponsiveContainer></div>
                  )}
                </TabsContent>
                <TabsContent value="summary" className="space-y-3 text-sm text-muted-foreground">
                  <p>{openReport.desc}</p>
                  <p>This report covers data from Miss UJ APK 2027, updated as of {openReport.updated}.</p>
                  <p>Total pages: {openReport.pages} · Format: PDF, Excel · Branding: CrownLedger / Verity Digital</p>
                </TabsContent>
              </Tabs>
              <div className="flex gap-3 mt-6">
                <Button className="flex-1 bg-gold-gradient text-background" onClick={() => { toast.success(`${openReport.name} exported as PDF.`); setOpenReport(null); }}><Download className="h-4 w-4 mr-2" />Export PDF</Button>
                <Button variant="outline" className="flex-1" onClick={() => { toast.success(`${openReport.name} exported as Excel.`); setOpenReport(null); }}><FileText className="h-4 w-4 mr-2" />Export Excel</Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
