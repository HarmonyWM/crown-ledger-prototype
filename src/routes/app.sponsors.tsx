import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { sponsors } from "@/lib/mock-data";
import { Upload, BarChart3 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/app/sponsors")({
  head: () => ({ meta: [{ title: "Sponsors — CrownLedger" }] }),
  component: Sponsors,
});

function Sponsors() {
  return (
    <div>
      <PageHeader
        title="Sponsor Portal"
        subtitle="5 sponsors · R 1.8M in commitments · 925K impressions this week"
        actions={<><Button variant="outline"><Upload className="h-4 w-4 mr-2"/>Upload Asset</Button><Button className="bg-gold-gradient text-background">Add Sponsor</Button></>}
      />
      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <Card className="glass border-border p-5">
          <h3 className="font-display text-lg mb-4">Impressions by Sponsor</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={sponsors}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)"/>
                <XAxis dataKey="name" stroke="#888" fontSize={11}/>
                <YAxis stroke="#888" fontSize={11}/>
                <Tooltip contentStyle={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}/>
                <Bar dataKey="impressions" fill="#D4AF37" radius={[6,6,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="glass border-border p-5">
          <h3 className="font-display text-lg mb-4">Click-through performance</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={sponsors}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)"/>
                <XAxis dataKey="name" stroke="#888" fontSize={11}/>
                <YAxis stroke="#888" fontSize={11}/>
                <Tooltip contentStyle={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}/>
                <Bar dataKey="clicks" fill="#6A0DAD" radius={[6,6,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sponsors.map((s) => (
          <Card key={s.name} className="glass border-border p-5">
            <div className="flex items-center justify-between"><h3 className="font-display text-xl">{s.name}</h3><Badge className="glass-gold border-0 text-gold">{s.tier}</Badge></div>
            <div className="grid grid-cols-2 gap-3 mt-5 text-sm">
              <div><div className="text-xs text-muted-foreground">Impressions</div><div className="text-xl font-display">{s.impressions.toLocaleString()}</div></div>
              <div><div className="text-xs text-muted-foreground">Clicks</div><div className="text-xl font-display text-gold">{s.clicks.toLocaleString()}</div></div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">Engagement rate</span><span className="text-gold">{((s.clicks/s.impressions)*100).toFixed(2)}%</span></div>
              <Progress value={(s.clicks/s.impressions)*100*15}/>
            </div>
            <Button variant="outline" className="w-full mt-5"><BarChart3 className="h-4 w-4 mr-2"/>View Report</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
