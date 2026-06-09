import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Copy, Archive, MapPin, Calendar, Users } from "lucide-react";
import { CreateEventDialog } from "@/components/dialogs/CreateEventDialog";
import { toast } from "sonner";


export const Route = createFileRoute("/app/events")({
  head: () => ({ meta: [{ title: "Events — CrownLedger" }] }),
  component: Events,
});

const events = [
  { name: "Miss UJ APK 2027", location: "UJ APK Campus, Johannesburg", date: "15 Aug 2027", status: "Live", contestants: 10, color: "bg-destructive/20 text-foreground border-destructive/40" },
  { name: "Miss Tshwane 2027", location: "Sun Arena, Pretoria", date: "12 Sep 2027", status: "Upcoming", contestants: 24, color: "bg-gold/15 text-gold border-gold/40" },
  { name: "Miss Heritage SA 2027", location: "Sandton Convention", date: "24 Sep 2027", status: "Upcoming", contestants: 32, color: "bg-gold/15 text-gold border-gold/40" },

  { name: "Mr & Miss Wits 2027", location: "Wits Great Hall", date: "10 Oct 2027", status: "Upcoming", contestants: 18, color: "bg-gold/15 text-gold border-gold/40" },
  { name: "Miss Tshwane 2026", location: "Sun Arena", date: "12 Nov 2026", status: "Completed", contestants: 30, color: "bg-secondary text-foreground border-border" },
  { name: "Face of Africa 2026", location: "Sandton Convention", date: "5 Dec 2026", status: "Completed", contestants: 42, color: "bg-secondary text-foreground border-border" },
  { name: "Miss UCT 2026", location: "Jameson Hall, Cape Town", date: "18 Jul 2026", status: "Archived", contestants: 16, color: "bg-secondary text-foreground border-border" },
];

function Events() {
  return (
    <div>
      <PageHeader
        title="Events"
        subtitle="Create, duplicate, archive and template every pageant in your circuit."
        actions={<>
          <Button variant="outline" onClick={() => toast("5 templates available", { description: "Miss University · Miss Community · Miss Charity · Miss Teen · Custom" })}><Copy className="h-4 w-4 mr-2"/>Templates</Button>
          <CreateEventDialog>
            <Button className="bg-gold-gradient text-background"><Plus className="h-4 w-4 mr-2"/>Create Event</Button>
          </CreateEventDialog>
        </>}
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {events.map((e) => (
          <Card key={e.name} className="glass border-border p-5 hover:border-gold/40 transition group">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl">{e.name}</h3>
                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin className="h-3 w-3"/>{e.location}</div>
              </div>
              <Badge className={`border ${e.color}`}>{e.status === "Live" && "● "}{e.status}</Badge>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div><div className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3"/>Date</div><div className="mt-1">{e.date}</div></div>
              <div><div className="text-xs text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3"/>Contestants</div><div className="mt-1">{e.contestants}</div></div>
            </div>
            <div className="flex gap-2 mt-5 opacity-80 group-hover:opacity-100 transition">
              <Link to="/app" className="flex-1"><Button size="sm" variant="outline" className="w-full">Open</Button></Link>
              <Button size="sm" variant="outline" onClick={() => toast.success(`${e.name} duplicated`)}><Copy className="h-3.5 w-3.5"/></Button>
              <Button size="sm" variant="outline" onClick={() => toast(`${e.name} archived`)}><Archive className="h-3.5 w-3.5"/></Button>
            </div>

          </Card>
        ))}
      </div>
    </div>
  );
}
