import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { Heart, TrendingUp, Vote as VoteIcon, Plus, Edit2, PowerOff } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/voting")({
  component: Voting,
});

const defaultPackages = [
  { id: 1, name: "Bronze", votes: 5, price: "R 25", active: true, sold: 612 },
  { id: 2, name: "Silver", votes: 20, price: "R 80", active: true, sold: 488, featured: true },
  { id: 3, name: "Gold", votes: 50, price: "R 175", active: true, sold: 184 },
  { id: 4, name: "Platinum", votes: 100, price: "R 320", active: true, sold: 72 },
];

function Voting() {
  const { contestants, votes, castVote } = useAppStore();
  const [packages, setPackages] = useState(defaultPackages);
  const [showManage, setShowManage] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [newPkg, setNewPkg] = useState({ name: "", votes: "", price: "" });

  const ranked = [...contestants].map(c => ({ ...c, votes: votes[c.id] ?? c.votes })).sort((a, b) => b.votes - a.votes);
  const totalVotes = ranked.reduce((s, c) => s + c.votes, 0);

  function handleAddPkg() {
    if (!newPkg.name || !newPkg.votes) { toast.error("Name and vote count required."); return; }
    setPackages(p => [...p, { id: Date.now(), name: newPkg.name, votes: Number(newPkg.votes), price: newPkg.price || "Free", active: true, sold: 0 }]);
    toast.success(`Package "${newPkg.name}" created.`);
    setNewPkg({ name: "", votes: "", price: "" });
    setShowAdd(false);
  }

  return (
    <div>
      <PageHeader
        title="Audience Voting"
        subtitle="Fan Favorite leaderboard · Premium packages · Live results"
        actions={<Button className="bg-gold-gradient text-background" onClick={() => setShowManage(true)}><VoteIcon className="h-4 w-4 mr-2" />Manage Packages</Button>}
      />

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Card className="glass border-border p-5">
          <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Total votes</div>
          <div className="text-3xl font-display mt-2">{totalVotes.toLocaleString()}</div>
          <div className="text-xs text-gold mt-1 flex items-center gap-1"><TrendingUp className="h-3 w-3" />+34% past 24h</div>
        </Card>
        <Card className="glass border-border p-5">
          <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Packages sold</div>
          <div className="text-3xl font-display mt-2">{packages.reduce((s, p) => s + p.sold, 0).toLocaleString()}</div>
          <div className="text-xs text-gold mt-1">R 96,720 revenue</div>
        </Card>
        <Card className="glass-gold border-0 p-5">
          <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Fan Favorite</div>
          <div className="text-2xl font-display mt-2 text-gradient-gold">{ranked[0]?.name}</div>
          <div className="text-xs text-gold mt-1 flex items-center gap-1"><Heart className="h-3 w-3 fill-gold" />{(votes[ranked[0]?.id] ?? ranked[0]?.votes ?? 0).toLocaleString()} votes</div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="glass border-border p-5 lg:col-span-2">
          <h3 className="font-display text-lg mb-4">Live Vote Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer>
              <BarChart data={ranked} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis type="number" stroke="#888" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#888" fontSize={11} width={130} />
                <Tooltip contentStyle={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                <Bar dataKey="votes" fill="#D4AF37" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass border-border p-5">
          <h3 className="font-display text-lg mb-4">Vote Packages</h3>
          <div className="space-y-3">
            {packages.filter(p => p.active).map(pk => (
              <div key={pk.id} className={`p-4 rounded-xl border ${pk.featured ? "glass-gold border-gold/40" : "border-border"}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{pk.name} — {pk.votes} votes</div>
                    <div className="text-xs text-muted-foreground">{pk.sold} sold</div>
                  </div>
                  <div className="text-xl font-display text-gold">{pk.price}</div>
                </div>
                <Button size="sm" className="w-full mt-3 bg-gold-gradient text-background" onClick={() => { toast.success(`${pk.name} package purchased! ${pk.votes} votes added.`); }}>Buy Package</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="glass border-border p-5 mt-6">
        <h3 className="font-display text-lg mb-4">Fan Favorite Leaderboard</h3>
        <div className="space-y-3">
          {ranked.map((c, i) => (
            <div key={c.id} className="flex items-center gap-4">
              <div className={`h-9 w-9 rounded-full grid place-items-center font-semibold text-sm ${i < 3 ? "bg-gold-gradient text-background" : "bg-secondary"}`}>{i + 1}</div>
              <img src={c.photo} className="h-10 w-10 rounded-full object-cover border border-border" />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{c.name}</div>
                <Progress value={(c.votes / ranked[0].votes) * 100} className="mt-1.5" />
              </div>
              <div className="text-right shrink-0">
                <div className="text-gold font-display text-lg">{c.votes.toLocaleString()}</div>
                <div className="text-[11px] text-muted-foreground">{((c.votes / totalVotes) * 100).toFixed(1)}%</div>
              </div>
              <Button size="sm" variant="outline" onClick={() => { castVote(c.id, 1); toast.success(`Vote cast for ${c.name}!`); }}>
                <Heart className="h-3.5 w-3.5 text-gold" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Manage Packages Sheet */}
      <Dialog open={showManage} onOpenChange={setShowManage}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="font-display text-2xl">Manage Vote Packages</DialogTitle></DialogHeader>
          <div className="space-y-3 mt-2">
            {packages.map(pk => (
              <div key={pk.id} className="flex items-center justify-between p-3 border border-border rounded-xl">
                <div>
                  <div className="font-semibold text-sm">{pk.name} — {pk.votes} votes · {pk.price}</div>
                  <div className="text-xs text-muted-foreground">{pk.sold} sold · {pk.active ? "Active" : "Disabled"}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => toast.info(`Edit ${pk.name}`)}><Edit2 className="h-3.5 w-3.5" /></Button>
                  <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => { setPackages(p => p.map(x => x.id === pk.id ? { ...x, active: !x.active } : x)); toast.info(pk.active ? `${pk.name} disabled.` : `${pk.name} enabled.`); }}><PowerOff className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4 bg-gold-gradient text-background" onClick={() => { setShowManage(false); setShowAdd(true); }}><Plus className="h-4 w-4 mr-2" />Add New Package</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle className="font-display text-xl">New Vote Package</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2"><Label>Package Name</Label><Input placeholder="Diamond" value={newPkg.name} onChange={e => setNewPkg(p => ({ ...p, name: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Number of Votes</Label><Input type="number" placeholder="200" value={newPkg.votes} onChange={e => setNewPkg(p => ({ ...p, votes: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Price</Label><Input placeholder="R 600" value={newPkg.price} onChange={e => setNewPkg(p => ({ ...p, price: e.target.value }))} /></div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button className="bg-gold-gradient text-background" onClick={handleAddPkg}>Create Package</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
