import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { contestants } from "@/lib/mock-data";
import { Heart, TrendingUp, Vote as VoteIcon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/app/voting")({
  head: () => ({ meta: [{ title: "Audience Voting — CrownLedger" }] }),
  component: Voting,
});

function Voting() {
  const ranked = [...contestants].sort((a,b) => b.votes - a.votes);
  const totalVotes = ranked.reduce((s,c) => s+c.votes, 0);
  return (
    <div>
      <PageHeader
        title="Audience Voting"
        subtitle="Fan Favorite leaderboard · One vote per account, premium packages available"
        actions={<Button className="bg-gold-gradient text-background"><VoteIcon className="h-4 w-4 mr-2"/>Manage Vote Packages</Button>}
      />
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Card className="glass border-border p-5"><div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Total votes</div><div className="text-3xl font-display mt-2">{totalVotes.toLocaleString()}</div><div className="text-xs text-gold mt-1 flex items-center gap-1"><TrendingUp className="h-3 w-3"/>+34% past 24h</div></Card>
        <Card className="glass border-border p-5"><div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Vote packages sold</div><div className="text-3xl font-display mt-2">1,284</div><div className="text-xs text-gold mt-1">R 96,720 revenue</div></Card>
        <Card className="glass-gold border-0 p-5"><div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Current Fan Favorite</div><div className="text-2xl font-display mt-2 text-gradient-gold">{ranked[0].name}</div><div className="text-xs text-gold mt-1 flex items-center gap-1"><Heart className="h-3 w-3 fill-gold"/>{ranked[0].votes.toLocaleString()} votes</div></Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="glass border-border p-5 lg:col-span-2">
          <h3 className="font-display text-lg mb-4">Live Vote Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer>
              <BarChart data={ranked} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)"/>
                <XAxis type="number" stroke="#888" fontSize={11}/>
                <YAxis dataKey="name" type="category" stroke="#888" fontSize={11} width={130}/>
                <Tooltip contentStyle={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}/>
                <Bar dataKey="votes" fill="#D4AF37" radius={[0,6,6,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass border-border p-5">
          <h3 className="font-display text-lg mb-4">Premium Vote Packages</h3>
          <div className="space-y-3">
            {[{n:"5 Votes", p:"R 25", sold: 612},{n:"10 Votes", p:"R 45", sold: 488, featured:true},{n:"20 Votes", p:"R 80", sold: 184}].map(pk => (
              <div key={pk.n} className={`p-4 rounded-xl border ${pk.featured ? "glass-gold border-gold/40" : "border-border"}`}>
                <div className="flex justify-between items-center">
                  <div><div className="font-semibold">{pk.n}</div><div className="text-xs text-muted-foreground">{pk.sold} sold</div></div>
                  <div className="text-xl font-display text-gold">{pk.p}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="glass border-border p-5 mt-6">
        <h3 className="font-display text-lg mb-4">Fan Favorite Leaderboard</h3>
        <div className="space-y-3">
          {ranked.map((c,i) => (
            <div key={c.id} className="flex items-center gap-4">
              <div className={`h-9 w-9 rounded-full grid place-items-center font-semibold text-sm ${i<3 ? "bg-gold-gradient text-background" : "bg-secondary"}`}>{i+1}</div>
              <img src={c.photo} className="h-10 w-10 rounded-full object-cover border border-border"/>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{c.name}</div>
                <Progress value={(c.votes/ranked[0].votes)*100} className="mt-1.5"/>
              </div>
              <div className="text-right"><div className="text-gold font-display text-lg">{c.votes.toLocaleString()}</div><div className="text-[11px] text-muted-foreground">{((c.votes/totalVotes)*100).toFixed(1)}%</div></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
