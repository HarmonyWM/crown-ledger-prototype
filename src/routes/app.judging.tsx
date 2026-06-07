import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { contestants, categories, judges } from "@/lib/mock-data";
import { Eye, EyeOff, Lock, Save } from "lucide-react";

export const Route = createFileRoute("/app/judging")({
  head: () => ({ meta: [{ title: "Live Judging — CrownLedger" }] }),
  component: Judging,
});

function Judging() {
  const ranked = [...contestants].sort((a,b) => b.score - a.score);
  return (
    <div>
      <PageHeader
        title="Live Judging System"
        subtitle="Weighted scoring · Real-time rankings · Transparency modes"
        actions={<>
          <Button variant="outline"><Eye className="h-4 w-4 mr-2"/>Mode: Live Transparency</Button>
          <Button className="bg-gold-gradient text-background"><Save className="h-4 w-4 mr-2"/>Submit Round</Button>
        </>}
      />

      <Tabs defaultValue="score">
        <TabsList>
          <TabsTrigger value="score">Score Entry</TabsTrigger>
          <TabsTrigger value="leaderboard">Live Leaderboard</TabsTrigger>
          <TabsTrigger value="transparency">Transparency</TabsTrigger>
        </TabsList>

        <TabsContent value="score" className="mt-5">
          <div className="grid lg:grid-cols-3 gap-4">
            <Card className="glass border-border p-5 lg:col-span-2">
              <div className="flex items-center gap-4 mb-5">
                <img src={contestants[0].photo} className="h-16 w-16 rounded-2xl object-cover border border-gold/40"/>
                <div>
                  <Badge className="bg-gold-gradient text-background border-0 mb-1">{contestants[0].number}</Badge>
                  <div className="font-display text-2xl">{contestants[0].name}</div>
                  <div className="text-xs text-muted-foreground">{contestants[0].age} · {contestants[0].occupation}</div>
                </div>
              </div>
              <div className="space-y-5">
                {categories.map((cat, i) => (
                  <div key={cat.key}>
                    <div className="flex justify-between mb-2 text-sm">
                      <div><span className="font-medium">{cat.label}</span> <span className="text-muted-foreground text-xs">({cat.weight}% weight)</span></div>
                      <div className="text-gold font-display text-lg">{(78 + i*3).toFixed(1)}/100</div>
                    </div>
                    <Slider defaultValue={[78 + i*3]} max={100} step={0.5} />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <div>
                  <div className="text-xs text-muted-foreground">Weighted total</div>
                  <div className="text-3xl font-display text-gradient-gold">88.6 / 100</div>
                </div>
                <Button className="bg-gold-gradient text-background">Submit Score</Button>
              </div>
            </Card>

            <Card className="glass border-border p-5">
              <h3 className="font-display text-lg mb-3">Judge Notes</h3>
              <textarea className="w-full bg-secondary/40 border border-border rounded-lg p-3 text-sm h-32" placeholder="Add private notes (visible to organizers only)..."
                defaultValue="Exceptional poise during the impromptu Q&A. Strong narrative on rural digital literacy. Outfit transitions were clean."/>
              <div className="mt-5">
                <h4 className="text-sm font-semibold mb-3">Other Judges Scored</h4>
                <div className="space-y-2">
                  {judges.slice(0,4).map((j) => (
                    <div key={j.id} className="flex items-center justify-between text-sm">
                      <span>{j.name}</span>
                      <span className="text-gold font-display">{(86 + j.id*0.7).toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-5">
          <Card className="glass border-border overflow-hidden">
            <div className="grid grid-cols-12 px-5 py-3 text-xs uppercase tracking-[0.15em] text-muted-foreground border-b border-border">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Contestant</div>
              {categories.map((c) => <div key={c.key} className="col-span-1 text-center">{c.label.split(" ")[0]}</div>)}
              <div className="col-span-2 text-right">Weighted</div>
            </div>
            {ranked.map((c, i) => (
              <div key={c.id} className={`grid grid-cols-12 px-5 py-3 items-center text-sm border-b border-border/60 ${i<3 ? "bg-gold/5" : ""}`}>
                <div className="col-span-1"><div className={`h-7 w-7 rounded-full grid place-items-center text-xs font-semibold ${i<3 ? "bg-gold-gradient text-background" : "bg-secondary"}`}>{i+1}</div></div>
                <div className="col-span-4 flex items-center gap-3">
                  <img src={c.photo} className="h-9 w-9 rounded-full object-cover border border-border"/>
                  <div><div className="font-medium">{c.name}</div><div className="text-[11px] text-muted-foreground">{c.number}</div></div>
                </div>
                {categories.map((cat, idx) => <div key={cat.key} className="col-span-1 text-center text-muted-foreground">{(70 + ((c.id*7+idx*3)%25)).toFixed(0)}</div>)}
                <div className="col-span-2 text-right text-gold font-display text-lg">{c.score.toFixed(1)}</div>
              </div>
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="transparency" className="mt-5">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Eye, title: "Live Transparency", desc: "Contestants see their scores immediately after submission.", active: true },
              { icon: EyeOff, title: "Delayed Transparency", desc: "Scores published once event concludes." },
              { icon: Lock, title: "Private Judging", desc: "Only the judging panel and organizers see scores." },
            ].map((m) => (
              <Card key={m.title} className={`p-6 border ${m.active ? "glass-gold border-gold/40" : "glass border-border"}`}>
                <m.icon className={`h-6 w-6 ${m.active ? "text-gold" : "text-muted-foreground"}`}/>
                <h3 className="font-display text-xl mt-4">{m.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{m.desc}</p>
                <Button variant={m.active ? "default" : "outline"} className={`mt-5 w-full ${m.active ? "bg-gold-gradient text-background" : ""}`}>
                  {m.active ? "Currently Active" : "Switch to this mode"}
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
