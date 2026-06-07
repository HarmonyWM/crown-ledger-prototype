import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { awards, contestants } from "@/lib/mock-data";
import { Trophy, Crown } from "lucide-react";

export const Route = createFileRoute("/app/awards")({
  head: () => ({ meta: [{ title: "Awards — CrownLedger" }] }),
  component: Awards,
});

function Awards() {
  return (
    <div>
      <PageHeader title="Awards" subtitle="Auto-calculated based on scores, votes and judge weights." actions={<Button className="bg-gold-gradient text-background"><Trophy className="h-4 w-4 mr-2"/>Generate Certificates</Button>}/>
      <Card className="glass-gold border-0 p-8 mb-6 text-center">
        <Crown className="h-12 w-12 text-gold mx-auto" />
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mt-4">Predicted Winner</div>
        <div className="font-display text-5xl text-gradient-gold mt-2">Tshegofatso Mokoena</div>
        <div className="text-sm text-muted-foreground mt-2">Weighted score 94.8 · 7,412 audience votes · Top judge in 3 of 5 categories</div>
      </Card>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {awards.map((a) => {
          const c = contestants.find((c) => c.name === a.winner);
          return (
            <Card key={a.name} className="glass border-border p-5">
              <div className="flex items-center justify-between"><Badge className="glass-gold border-0 text-gold">{a.name}</Badge><Trophy className="h-4 w-4 text-gold"/></div>
              <div className="flex items-center gap-3 mt-4">
                {c && <img src={c.photo} className="h-12 w-12 rounded-full object-cover border border-gold/40"/>}
                <div><div className="font-display text-lg">{a.winner}</div><div className="text-xs text-muted-foreground">{a.criterion}</div></div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
