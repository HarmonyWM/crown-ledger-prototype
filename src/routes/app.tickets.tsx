import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ticketTiers } from "@/lib/mock-data";
import { Ticket as TicketIcon, QrCode, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/app/tickets")({
  head: () => ({ meta: [{ title: "Tickets — CrownLedger" }] }),
  component: Tickets,
});

const series = [
  { day: "M-30", sold: 12 },{ day: "M-25", sold: 48 },{ day: "M-20", sold: 92 },{ day: "M-15", sold: 168 },
  { day: "M-10", sold: 246 },{ day: "M-5", sold: 348 },{ day: "M-1", sold: 424 },
];

function Tickets() {
  const totalRevenue = ticketTiers.reduce((s,t) => s + t.sold*t.price, 0);
  const totalSold = ticketTiers.reduce((s,t) => s + t.sold, 0);
  const totalCap = ticketTiers.reduce((s,t) => s + t.capacity, 0);
  return (
    <div>
      <PageHeader
        title="Ticketing"
        subtitle="QR-secured tickets · Seat maps · Capacity controls"
        actions={<Button className="bg-gold-gradient text-background"><TicketIcon className="h-4 w-4 mr-2"/>Open Box Office</Button>}
      />
      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <Card className="glass border-border p-5"><div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Total revenue</div><div className="text-3xl font-display text-gradient-gold mt-2">R {totalRevenue.toLocaleString()}</div></Card>
        <Card className="glass border-border p-5"><div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Tickets sold</div><div className="text-3xl font-display mt-2">{totalSold}</div><div className="text-xs text-gold mt-1">of {totalCap}</div></Card>
        <Card className="glass border-border p-5"><div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Conversion</div><div className="text-3xl font-display mt-2">{((totalSold/totalCap)*100).toFixed(0)}%</div><Progress value={(totalSold/totalCap)*100} className="mt-2"/></Card>
        <Card className="glass border-border p-5"><div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Today</div><div className="text-3xl font-display mt-2">76</div><div className="text-xs text-gold flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3"/>+24% vs yesterday</div></Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {ticketTiers.map((t) => (
          <Card key={t.name} className={`p-6 border ${t.name==="VIP" ? "glass-gold border-gold/40" : "glass border-border"}`}>
            <div className="flex items-center justify-between"><h3 className="font-display text-2xl">{t.name}</h3><Badge variant="outline">R{t.price}</Badge></div>
            <div className="mt-4 text-4xl font-display text-gradient-gold">R {(t.sold*t.price).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">{t.sold} / {t.capacity} seats sold</div>
            <Progress value={(t.sold/t.capacity)*100} className="mt-3"/>
            <div className="mt-5 flex items-center gap-2"><Button variant="outline" className="flex-1"><QrCode className="h-4 w-4 mr-2"/>Scan</Button><Button className="flex-1 bg-gold-gradient text-background">Sell</Button></div>
          </Card>
        ))}
      </div>

      <Card className="glass border-border p-5 mt-6">
        <h3 className="font-display text-lg mb-4">Sales Curve (last 30 days)</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <AreaChart data={series}>
              <defs><linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D4AF37" stopOpacity={0.5}/><stop offset="100%" stopColor="#D4AF37" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid stroke="rgba(255,255,255,0.06)"/>
              <XAxis dataKey="day" stroke="#888" fontSize={11}/>
              <YAxis stroke="#888" fontSize={11}/>
              <Tooltip contentStyle={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}/>
              <Area type="monotone" dataKey="sold" stroke="#D4AF37" fill="url(#g3)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
