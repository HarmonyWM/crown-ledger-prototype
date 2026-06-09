import { useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload } from "lucide-react";

export function AddContestantDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const submit = () => {
    if (!name.trim()) { toast.error("Name is required"); return; }
    toast.success(`${name} added to roster`, { description: "Profile pending verification" });
    setOpen(false); setName("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Add Contestant</DialogTitle>
          <DialogDescription>Register a new contestant for Miss UJ APK 2027.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-gold/40 cursor-pointer transition">
            <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
            <div className="text-sm mt-2">Upload portrait photo</div>
            <div className="text-xs text-muted-foreground">PNG or JPG · max 5MB</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label>Full name</Label><Input placeholder="Ayanda Mokoena" value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div className="space-y-2"><Label>Age</Label><Input type="number" placeholder="21" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label>Province</Label><Input placeholder="Gauteng" /></div>
            <div className="space-y-2"><Label>Occupation</Label><Input placeholder="Law Student" /></div>
          </div>
          <div className="space-y-2"><Label>Biography</Label><Textarea rows={3} placeholder="Tell her story..." /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label>Instagram</Label><Input placeholder="@handle" /></div>
            <div className="space-y-2"><Label>TikTok</Label><Input placeholder="@handle" /></div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button className="bg-gold-gradient text-background" onClick={submit}>Add Contestant</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
