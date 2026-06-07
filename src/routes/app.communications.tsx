import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, MessageSquare, Send } from "lucide-react";

export const Route = createFileRoute("/app/communications")({
  head: () => ({ meta: [{ title: "Communications — CrownLedger" }] }),
  component: Comms,
});

const announcements = [
  { title: "Final dress rehearsal moved to 14:00", channel: "Push + Email", audience: "Contestants, Judges", time: "2h ago", status: "Delivered" },
  { title: "VIP guest list now live", channel: "Email", audience: "Sponsors", time: "5h ago", status: "Delivered" },
  { title: "Voting opens at 19:30", channel: "Push", audience: "Audience (12,480)", time: "Yesterday", status: "Delivered" },
  { title: "Sponsor handover packets ready for pickup", channel: "In-app", audience: "Sponsor leads", time: "2 days ago", status: "Delivered" },
];

function Comms() {
  return (
    <div>
      <PageHeader title="Communication Center" subtitle="Replace WhatsApp chaos with one branded channel." actions={<Button className="bg-gold-gradient text-background"><Send className="h-4 w-4 mr-2"/>New Broadcast</Button>}/>
      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="glass border-border p-5"><div className="flex items-center gap-3"><Bell className="h-5 w-5 text-gold"/><div><div className="text-xs text-muted-foreground">Push notifications</div><div className="text-2xl font-display">142,810</div></div></div></Card>
        <Card className="glass border-border p-5"><div className="flex items-center gap-3"><Mail className="h-5 w-5 text-gold"/><div><div className="text-xs text-muted-foreground">Emails sent</div><div className="text-2xl font-display">48,392</div></div></div></Card>
        <Card className="glass border-border p-5"><div className="flex items-center gap-3"><MessageSquare className="h-5 w-5 text-gold"/><div><div className="text-xs text-muted-foreground">In-app messages</div><div className="text-2xl font-display">9,124</div></div></div></Card>
      </div>

      <Card className="glass border-border p-5 mt-6">
        <h3 className="font-display text-lg mb-4">Recent Broadcasts</h3>
        <div className="divide-y divide-border">
          {announcements.map((a, i) => (
            <div key={i} className="py-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="font-medium">{a.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{a.audience} · {a.channel}</div>
              </div>
              <Badge variant="outline" className="border-gold/40 text-gold">{a.status}</Badge>
              <div className="text-xs text-muted-foreground w-20 text-right">{a.time}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="glass border-border p-5 mt-6">
        <h3 className="font-display text-lg mb-4">Compose</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <input className="w-full bg-secondary/40 border border-border rounded-lg px-3 py-2 text-sm" placeholder="Subject" defaultValue="Tonight at 19:30 — Doors open"/>
            <textarea className="w-full bg-secondary/40 border border-border rounded-lg px-3 py-2 text-sm h-40" defaultValue="Hi team, doors open at 19:30. Contestants, please be in the green room by 18:00 in your evening attire. Sponsors — VIP lounge access via Gate 2."/>
            <div className="flex gap-2"><Button className="bg-gold-gradient text-background"><Send className="h-4 w-4 mr-2"/>Send to 540 people</Button><Button variant="outline">Schedule</Button></div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="font-semibold">Channels</div>
            {["Push notification","Email","In-app inbox","SMS (premium)"].map(c => (
              <label key={c} className="flex items-center gap-3 p-3 border border-border rounded-lg"><input type="checkbox" defaultChecked={!c.includes("SMS")}/>{c}</label>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
