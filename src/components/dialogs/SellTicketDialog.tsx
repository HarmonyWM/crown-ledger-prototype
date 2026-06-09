import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ticketTiers } from "@/lib/mock-data";

export function SellTicketDialog({ children, defaultTier }: { children: ReactNode; defaultTier?: string }) {
  const [open, setOpen] = useState(false);
  const [tier, setTier] = useState(defaultTier ?? ticketTiers[0].name);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const price = ticketTiers.find((t) => t.name === tier)?.price ?? 0;

  const submit = () => {
    if (!name.trim()) { toast.error("Buyer name is required"); return; }
    toast.success("Tickets issued", { description: `${qty} × ${tier} · R ${(qty * price).toLocaleString()} · QR sent to buyer` });
    setOpen(false); setName(""); setQty(1);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Sell Tickets</DialogTitle>
          <DialogDescription>Issue QR-secured tickets to a buyer.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2"><Label>Buyer name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Khaya Nyembe" /></div>
          <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="khaya@example.com" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label>Tier</Label>
              <Select value={tier} onValueChange={setTier}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{ticketTiers.map((t) => <SelectItem key={t.name} value={t.name}>{t.name} · R{t.price}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Quantity</Label><Input type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, +e.target.value || 1))} /></div>
          </div>
          <div className="rounded-lg glass-gold p-4 flex items-center justify-between">
            <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Total</div>
            <div className="text-2xl font-display text-gradient-gold">R {(qty * price).toLocaleString()}</div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button className="bg-gold-gradient text-background" onClick={submit}>Charge & Issue QR</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
