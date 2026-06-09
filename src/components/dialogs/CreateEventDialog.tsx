import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const templates = ["Custom", "Miss University", "Miss Community", "Miss Charity", "Miss Teen"];

export function CreateEventDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [template, setTemplate] = useState("Custom");
  const [ticketing, setTicketing] = useState(true);
  const [voting, setVoting] = useState(true);
  const [livestream, setLivestream] = useState(false);

  const submit = () => {
    if (!name.trim()) { toast.error("Event name is required"); return; }
    toast.success(`${name} created`, { description: `${template} template · saved as draft` });
    setOpen(false);
    setName("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Create Event</DialogTitle>
          <DialogDescription>Spin up a new pageant from a template in under a minute.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2"><Label>Event name</Label><Input placeholder="Miss Heritage SA 2027" value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label>Date</Label><Input type="date" /></div>
            <div className="space-y-2"><Label>Registration deadline</Label><Input type="date" /></div>
          </div>
          <div className="space-y-2"><Label>Venue</Label><Input placeholder="Sandton Convention Centre" /></div>
          <div className="space-y-2"><Label>Description</Label><Textarea placeholder="Brief pageant description, theme, prize pool..." rows={3} /></div>
          <div className="space-y-2"><Label>Template</Label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{templates.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="rounded-lg border border-border p-3 space-y-3">
            <div className="flex items-center justify-between"><Label className="text-sm">Ticketing module</Label><Switch checked={ticketing} onCheckedChange={setTicketing} /></div>
            <div className="flex items-center justify-between"><Label className="text-sm">Audience voting</Label><Switch checked={voting} onCheckedChange={setVoting} /></div>
            <div className="flex items-center justify-between"><Label className="text-sm">Livestream</Label><Switch checked={livestream} onCheckedChange={setLivestream} /></div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button className="bg-gold-gradient text-background" onClick={submit}>Create Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
