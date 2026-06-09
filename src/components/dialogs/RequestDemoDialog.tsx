import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function RequestDemoDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const submit = () => {
    toast.success("Demo request received", { description: "A CrownLedger specialist will reach out within 24 hours." });
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Request a Demo</DialogTitle>
          <DialogDescription>See how CrownLedger fits your pageant in a 30-minute walkthrough.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-2"><Label>Full name</Label><Input placeholder="Jane Doe" /></div>
          <div className="space-y-2"><Label>Organization</Label><Input placeholder="Miss Heritage SA" /></div>
          <div className="space-y-2"><Label>Work email</Label><Input type="email" placeholder="jane@miss-heritage.co.za" /></div>
          <div className="space-y-2"><Label>What are you looking to solve?</Label><Textarea rows={3} placeholder="e.g. transparent judging, ticketing, sponsor reporting..." /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button className="bg-gold-gradient text-background" onClick={submit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
