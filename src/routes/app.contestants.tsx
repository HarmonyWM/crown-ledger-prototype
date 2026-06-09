import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { contestants } from "@/lib/mock-data";
import { Plus, Filter, Instagram, Trophy } from "lucide-react";
import { AddContestantDialog } from "@/components/dialogs/AddContestantDialog";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/app/contestants")({
  head: () => ({ meta: [{ title: "Contestants — CrownLedger" }] }),
  component: Contestants,
});

function Contestants() {
  const [q, setQ] = useState("");
  const filtered = contestants.filter((c) =>
    c.name.toLowerCase().includes(q.toLowerCase()) || c.number.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div>
      <PageHeader
        title="Contestants"
        subtitle="10 contestants competing in Miss UJ APK 2027"
        actions={<>
          <Button variant="outline" onClick={() => toast("Filter panel opened", { description: "Filter by province · score · status" })}><Filter className="h-4 w-4 mr-2"/>Filter</Button>
          <AddContestantDialog>
            <Button className="bg-gold-gradient text-background"><Plus className="h-4 w-4 mr-2"/>Add Contestant</Button>
          </AddContestantDialog>
        </>}
      />
      <div className="mb-5"><Input placeholder="Search by name or contestant number…" className="max-w-sm bg-secondary/50" value={q} onChange={(e) => setQ(e.target.value)}/></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((c) => (
          <Card key={c.id} className="glass border-border overflow-hidden hover:border-gold/40 transition group cursor-pointer" onClick={() => toast(`${c.name}`, { description: `Score ${c.score.toFixed(1)} · ${c.votes.toLocaleString()} votes · ${c.occupation}` })}>

            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              <img src={c.photo} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-700"/>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"/>
              <Badge className="absolute top-3 left-3 bg-gold-gradient text-background border-0">{c.number}</Badge>
              <Badge className="absolute top-3 right-3 glass border-0 text-gold"><Trophy className="h-3 w-3 mr-1"/>{c.score.toFixed(1)}</Badge>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="font-display text-lg leading-tight">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.age} · {c.occupation}</div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-xs text-muted-foreground line-clamp-2">{c.bio}</p>
              <div>
                <div className="flex justify-between text-[11px] mb-1"><span className="text-muted-foreground">Journey progress</span><span className="text-gold">{c.journeyProgress}%</span></div>
                <Progress value={c.journeyProgress} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <div className="flex gap-3"><span className="flex items-center gap-1"><Instagram className="h-3 w-3"/>{c.social.instagram}</span></div>
                <span>{c.votes.toLocaleString()} votes</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
