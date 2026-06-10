import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Upload, BarChart3, Plus, CheckCircle2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/sponsors")({
  component: Sponsors,
});

function Sponsors() {
  const { sponsors, addSponsor } = useAppStore();
  const [showAdd, setShowAdd] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState<(typeof sponsors)[0] | null>(null);
  const [form, setForm] = useState({ name: "", tier: "Silver", contact: "", email: "" });

  function handleAdd() {
    if (!form.name) { toast.error("Sponsor name is required."); return; }
    addSponsor({ name: form.name, tier: form.tier, impressions: 0, clicks: 0, color: "#D4AF37" });
    toast.success(`${form.name} added as a ${form.tier} sponsor.`);
    setShowAdd(false);
    setForm({ name: "", tier: "Silver", contact: "", email: "" });
  }

  return (
    <div>
      <PageHeader
        title="Sponsor Portal"
        subtitle={`${sponsors.length} sponsors · R 1.8M in commitments · ${(sponsors.reduce((s, sp) => s + sp.impressions, 0) / 1000).toFixed(0)}K impressions`}
        actions={<>
          <Button variant="outline" onClick={() => setShowUpload(true)}><Upload className="h-4 w-4 mr-2" />Upload Asset</Button>
          <Button className="bg-gold-gradient text-background" onClick={() => setShowAdd(true)}><Plus className="h-4 w-4 mr-2" />Add Sponsor</Button>
        </>}
      />

      <div className="grid lg:grid-cols-2 gap-4 mb-6">
        <Card className="glass border-border p-5">
          <h3 className="font-display text-lg mb-4">Impressions by Sponsor</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={sponsors}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="#888" fontSize={11} />
                <YAxis stroke="#888" fontSize={11} />
                <Tooltip contentStyle={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                <Bar dataKey="impressions" fill="#D4AF37" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="glass border-border p-5">
          <h3 className="font-display text-lg mb-4">Click-through Performance</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={sponsors}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="#888" fontSize={11} />
                <YAxis stroke="#888" fontSize={11} />
                <Tooltip contentStyle={{ background: "#1a1a22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                <Bar dataKey="clicks" fill="#6A0DAD" radius={[6, 6, 0, 0]} />
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
            {s.impressions > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">Engagement rate</span><span className="text-gold">{((s.clicks / s.impressions) * 100).toFixed(2)}%</span></div>
                <Progress value={(s.clicks / s.impressions) * 100 * 15} />
              </div>
            )}
            <Button variant="outline" className="w-full mt-5" onClick={() => setSelectedSponsor(s)}>
              <BarChart3 className="h-4 w-4 mr-2" />View Report
            </Button>
          </Card>
        ))}
      </div>

      {/* Add Sponsor Modal */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="font-display text-2xl">Add Sponsor</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2"><Label>Sponsor Name *</Label><Input placeholder="Groblersdal Mall" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="space-y-2">
              <Label>Sponsorship Tier</Label>
              <Select value={form.tier} onValueChange={v => setForm(f => ({ ...f, tier: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Platinum", "Gold", "Silver", "Bronze"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Contact Person</Label><Input placeholder="Zanele Dlamini" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} /></div>
            <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="zanele@sponsor.co.za" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
            <Button className="bg-gold-gradient text-background" onClick={handleAdd}><CheckCircle2 className="h-4 w-4 mr-2" />Add Sponsor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Asset Modal */}
      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="font-display text-2xl">Upload Sponsor Asset</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label>Sponsor</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select sponsor" /></SelectTrigger><SelectContent>{sponsors.map(s => <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>)}</SelectContent></Select>
            </div>
            <div className="space-y-2">
              <Label>Asset Type</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent>
                {["Logo", "Banner", "Advertisement", "Promotional Video"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent></Select>
            </div>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-gold/40 transition" onClick={() => toast.info("File picker would open here.")}>
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <div className="text-sm text-muted-foreground">Click to upload or drag and drop</div>
              <div className="text-xs text-muted-foreground mt-1">PNG, JPG, SVG, MP4 up to 50MB</div>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowUpload(false)}>Cancel</Button>
            <Button className="bg-gold-gradient text-background" onClick={() => { toast.success("Asset uploaded successfully."); setShowUpload(false); }}>Upload Asset</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sponsor Report Sheet */}
      <Sheet open={!!selectedSponsor} onOpenChange={() => setSelectedSponsor(null)}>
        <SheetContent className="overflow-y-auto">
          {selectedSponsor && (
            <>
              <SheetHeader><SheetTitle className="font-display text-2xl">{selectedSponsor.name} — Report</SheetTitle></SheetHeader>
              <div className="mt-6 space-y-4">
                <Badge className="glass-gold border-0 text-gold">{selectedSponsor.tier} Sponsor</Badge>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Impressions", value: selectedSponsor.impressions.toLocaleString() },
                    { label: "Clicks", value: selectedSponsor.clicks.toLocaleString() },
                    { label: "Engagement Rate", value: selectedSponsor.impressions ? `${((selectedSponsor.clicks / selectedSponsor.impressions) * 100).toFixed(2)}%` : "N/A" },
                    { label: "Audience Reach", value: "48,200" },
                    { label: "Dwell Time", value: "2m 14s avg" },
                    { label: "Conversions", value: "284" },
                  ].map(({ label, value }) => (
                    <div key={label} className="glass rounded-xl p-4">
                      <div className="text-xs text-muted-foreground">{label}</div>
                      <div className="text-xl font-display mt-1 text-gold">{value}</div>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-gold-gradient text-background" onClick={() => { toast.success(`${selectedSponsor.name} report exported.`); setSelectedSponsor(null); }}>
                  <Upload className="h-4 w-4 mr-2 rotate-180" />Export PDF Report
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
