import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from "react";
import { categories, judges } from "@/lib/mock-data";
import { Eye, EyeOff, Lock, Save, ChevronLeft, ChevronRight } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/judging")({
  component: Judging,
});

const modes = ["Preliminary", "Semi-Final", "Final", "Talent", "Interview"];
const weightedCategories = [
  { key: "interview", label: "Interview", weight: 30 },
  { key: "beauty", label: "Beauty", weight: 20 },
  { key: "speaking", label: "Public Speaking", weight: 20 },
  { key: "impact", label: "Community Impact", weight: 15 },
  { key: "leadership", label: "Leadership", weight: 15 },
];

function Judging() {
  const { contestants, scores, setScore, judgeMode, setJudgeMode } = useAppStore();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [transparencyMode, setTransparencyMode] = useState("live");
  const current = contestants[selectedIdx];

  const getScore = (contestantId: number, category: string) =>
    scores[contestantId]?.[category] ?? (78 + (contestantId * 3 + weightedCategories.findIndex(c => c.key === category) * 2) % 20);

  const getWeighted = (contestantId: number) => {
    return weightedCategories.reduce((sum, cat) => {
      const s = getScore(contestantId, cat.key);
      return sum + (s * cat.weight) / 100;
    }, 0);
  };

  const ranked = useMemo(() =>
    [...contestants].sort((a, b) => getWeighted(b.id) - getWeighted(a.id)),
    [contestants, scores]
  );

  function handleSubmit() {
    toast.success(`Scores submitted for ${current.name}!`);
    if (selectedIdx < contestants.length - 1) setSelectedIdx(i => i + 1);
  }

  return (
    <div>
      <PageHeader
        title="Live Judging System"
        subtitle="Weighted scoring · Real-time rankings · Transparency modes"
        actions={<>
          <Select value={judgeMode} onValueChange={setJudgeMode}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>{modes.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
          </Select>
          <Badge className="glass-gold border-0 text-gold">{judgeMode}</Badge>
          <Button className="bg-gold-gradient text-background" onClick={() => toast.success("Round submitted! Rankings updated.")}><Save className="h-4 w-4 mr-2" />Submit Round</Button>
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
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-4">
                  <img src={current.photo} className="h-16 w-16 rounded-2xl object-cover border border-gold/40" />
                  <div>
                    <Badge className="bg-gold-gradient text-background border-0 mb-1">{current.number}</Badge>
                    <div className="font-display text-2xl">{current.name}</div>
                    <div className="text-xs text-muted-foreground">{current.age} · {current.occupation}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" disabled={selectedIdx === 0} onClick={() => setSelectedIdx(i => i - 1)}><ChevronLeft className="h-4 w-4" /></Button>
                  <Button size="icon" variant="outline" disabled={selectedIdx === contestants.length - 1} onClick={() => setSelectedIdx(i => i + 1)}><ChevronRight className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="space-y-5">
                {weightedCategories.map((cat) => {
                  const val = getScore(current.id, cat.key);
                  return (
                    <div key={cat.key}>
                      <div className="flex justify-between mb-2 text-sm">
                        <div><span className="font-medium">{cat.label}</span> <span className="text-muted-foreground text-xs">({cat.weight}% weight)</span></div>
                        <div className="text-gold font-display text-lg">{val.toFixed(1)}/100</div>
                      </div>
                      <Slider value={[val]} max={100} step={0.5} onValueChange={([v]) => setScore(current.id, cat.key, v)} />
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <div>
                  <div className="text-xs text-muted-foreground">Weighted total</div>
                  <div className="text-3xl font-display text-gradient-gold">{getWeighted(current.id).toFixed(1)} / 100</div>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue={judges[0].name}>
                    <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                    <SelectContent>{judges.map(j => <SelectItem key={j.id} value={j.name}>{j.name}</SelectItem>)}</SelectContent>
                  </Select>
                  <Button className="bg-gold-gradient text-background" onClick={handleSubmit}>Submit Score</Button>
                </div>
              </div>
            </Card>

            <Card className="glass border-border p-5">
              <h3 className="font-display text-lg mb-3">Judge Notes</h3>
              <textarea className="w-full bg-secondary/40 border border-border rounded-lg p-3 text-sm h-32 resize-none" placeholder="Add private notes (visible to organizers only)..." defaultValue="Exceptional poise during the impromptu Q&A. Strong narrative on rural digital literacy." />
              <div className="mt-5">
                <h4 className="text-sm font-semibold mb-3">All Judges — {current.name.split(" ")[0]}</h4>
                <div className="space-y-2">
                  {judges.map((j) => (
                    <div key={j.id} className="flex items-center justify-between text-sm">
                      <span className="truncate mr-2">{j.name}</span>
                      <span className="text-gold font-display shrink-0">{(getWeighted(current.id) + j.id * 0.4).toFixed(1)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground mb-2">Contestant progress</div>
                <div className="flex gap-2 flex-wrap">
                  {contestants.map((c, i) => (
                    <button key={c.id} onClick={() => setSelectedIdx(i)} className={`h-8 w-8 rounded-full text-xs font-semibold transition ${i === selectedIdx ? "bg-gold-gradient text-background" : scores[c.id] ? "bg-primary/40 text-foreground" : "bg-secondary text-muted-foreground"}`}>{i + 1}</button>
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
              {weightedCategories.map((c) => <div key={c.key} className="col-span-1 text-center hidden md:block">{c.label.split(" ")[0]}</div>)}
              <div className="col-span-2 text-right">Score</div>
            </div>
            {ranked.map((c, i) => (
              <div key={c.id} className={`grid grid-cols-12 px-5 py-3 items-center text-sm border-b border-border/60 ${i < 3 ? "bg-gold/5" : ""}`}>
                <div className="col-span-1"><div className={`h-7 w-7 rounded-full grid place-items-center text-xs font-semibold ${i < 3 ? "bg-gold-gradient text-background" : "bg-secondary"}`}>{i + 1}</div></div>
                <div className="col-span-4 flex items-center gap-3">
                  <img src={c.photo} className="h-9 w-9 rounded-full object-cover border border-border" />
                  <div><div className="font-medium">{c.name}</div><div className="text-[11px] text-muted-foreground">{c.number}</div></div>
                </div>
                {weightedCategories.map((cat) => <div key={cat.key} className="col-span-1 text-center text-muted-foreground hidden md:block">{getScore(c.id, cat.key).toFixed(0)}</div>)}
                <div className="col-span-2 text-right text-gold font-display text-lg">{getWeighted(c.id).toFixed(1)}</div>
              </div>
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="transparency" className="mt-5">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { id: "live", icon: Eye, title: "Live Transparency", desc: "Contestants see their scores immediately after submission." },
              { id: "delayed", icon: EyeOff, title: "Delayed Transparency", desc: "Scores published once event concludes." },
              { id: "private", icon: Lock, title: "Private Judging", desc: "Only the judging panel and organizers see scores." },
            ].map((m) => {
              const active = transparencyMode === m.id;
              return (
                <Card key={m.id} className={`p-6 border ${active ? "glass-gold border-gold/40" : "glass border-border"}`}>
                  <m.icon className={`h-6 w-6 ${active ? "text-gold" : "text-muted-foreground"}`} />
                  <h3 className="font-display text-xl mt-4">{m.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{m.desc}</p>
                  <Button variant={active ? "default" : "outline"} className={`mt-5 w-full ${active ? "bg-gold-gradient text-background" : ""}`} onClick={() => { setTransparencyMode(m.id); toast.success(`${m.title} mode activated.`); }}>
                    {active ? "Currently Active" : "Switch to this mode"}
                  </Button>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
