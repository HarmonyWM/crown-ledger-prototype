import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { Bell, Mail, MessageSquare, Send, Clock, Smartphone, MessageCircle } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/communications")({
  component: Comms,
});

const audiences = ["All (540 people)", "Contestants only (10)", "Judges only (5)", "Sponsors only (5)", "Audience / Ticket holders (500)", "VIP guests (84)"];

function Comms() {
  const { broadcasts, addBroadcast } = useAppStore();
  const [subject, setSubject] = useState("Tonight at 19:30 — Doors open");
  const [body, setBody] = useState("Hi team, doors open at 19:30. Contestants, please be in the green room by 18:00 in your evening attire. Sponsors — VIP lounge access via Gate 2.");
  const [audience, setAudience] = useState(audiences[0]);
  const [channels, setChannels] = useState({ push: true, email: true, inapp: true, sms: false, whatsapp: false });
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleTime, setScheduleTime] = useState("");

  function getChannelLabel() {
    return Object.entries(channels).filter(([, v]) => v).map(([k]) => ({ push: "Push", email: "Email", inapp: "In-app", sms: "SMS", whatsapp: "WhatsApp" }[k])).join(" + ");
  }

  function handleSend() {
    if (!subject) { toast.error("Subject is required."); return; }
    addBroadcast({ title: subject, channel: getChannelLabel(), audience });
    toast.success(`Broadcast sent to ${audience}.`);
    setSubject("");
    setBody("");
  }

  function handleSchedule() {
    if (!scheduleTime) { toast.error("Please select a date and time."); return; }
    addBroadcast({ title: `[Scheduled] ${subject}`, channel: getChannelLabel(), audience });
    toast.success(`Broadcast scheduled for ${new Date(scheduleTime).toLocaleString("en-ZA")}.`);
    setShowSchedule(false);
  }

  const channelConfig = [
    { key: "push", label: "Push Notification", icon: Bell },
    { key: "email", label: "Email", icon: Mail },
    { key: "inapp", label: "In-app Inbox", icon: MessageSquare },
    { key: "sms", label: "SMS", icon: Smartphone },
    { key: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  ];

  return (
    <div>
      <PageHeader
        title="Communication Center"
        subtitle="One branded channel. No WhatsApp chaos."
        actions={<Button className="bg-gold-gradient text-background" onClick={() => { setSubject(""); setBody(""); }}><Send className="h-4 w-4 mr-2" />New Broadcast</Button>}
      />

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <Card className="glass border-border p-5"><div className="flex items-center gap-3"><Bell className="h-5 w-5 text-gold" /><div><div className="text-xs text-muted-foreground">Push Sent</div><div className="text-2xl font-display">142,810</div></div></div></Card>
        <Card className="glass border-border p-5"><div className="flex items-center gap-3"><Mail className="h-5 w-5 text-gold" /><div><div className="text-xs text-muted-foreground">Emails Sent</div><div className="text-2xl font-display">48,392</div></div></div></Card>
        <Card className="glass border-border p-5"><div className="flex items-center gap-3"><MessageSquare className="h-5 w-5 text-gold" /><div><div className="text-xs text-muted-foreground">In-app Messages</div><div className="text-2xl font-display">9,124</div></div></div></Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Compose */}
        <Card className="glass border-border p-5">
          <h3 className="font-display text-lg mb-4">Compose Broadcast</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Audience</Label>
              <select className="w-full bg-secondary/40 border border-border rounded-lg px-3 py-2 text-sm" value={audience} onChange={e => setAudience(e.target.value)}>
                {audiences.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="space-y-2"><Label>Subject *</Label><Input placeholder="Subject line…" value={subject} onChange={e => setSubject(e.target.value)} /></div>
            <div className="space-y-2"><Label>Message</Label><textarea className="w-full bg-secondary/40 border border-border rounded-lg px-3 py-2 text-sm h-32 resize-none" value={body} onChange={e => setBody(e.target.value)} placeholder="Your message…" /></div>
            <div className="space-y-2">
              <Label>Channels</Label>
              <div className="space-y-2">
                {channelConfig.map(({ key, label, icon: Icon }) => (
                  <label key={key} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:border-gold/40 transition">
                    <input type="checkbox" checked={channels[key as keyof typeof channels]} onChange={e => setChannels(c => ({ ...c, [key]: e.target.checked }))} />
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-gold-gradient text-background" onClick={handleSend}><Send className="h-4 w-4 mr-2" />Send Now</Button>
              <Button variant="outline" onClick={() => setShowSchedule(true)}><Clock className="h-4 w-4 mr-2" />Schedule</Button>
            </div>
          </div>
        </Card>

        {/* History */}
        <Card className="glass border-border p-5">
          <h3 className="font-display text-lg mb-4">Message History</h3>
          <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
            {broadcasts.map((a, i) => (
              <div key={i} className="py-4 flex items-start gap-4">
                <div className="h-9 w-9 rounded-xl bg-gold/15 grid place-items-center shrink-0"><Send className="h-4 w-4 text-gold" /></div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{a.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{a.audience} · {a.channel}</div>
                </div>
                <div className="text-right shrink-0">
                  <Badge variant="outline" className="border-gold/40 text-gold text-[10px]">{a.status}</Badge>
                  <div className="text-xs text-muted-foreground mt-1">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Schedule Modal */}
      <Dialog open={showSchedule} onOpenChange={setShowSchedule}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle className="font-display text-xl">Schedule Broadcast</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <p className="text-sm text-muted-foreground">"{subject || "Your message"}" will be sent to {audience}.</p>
            <div className="space-y-2"><Label>Date & Time</Label><Input type="datetime-local" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} /></div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowSchedule(false)}>Cancel</Button>
            <Button className="bg-gold-gradient text-background" onClick={handleSchedule}><Clock className="h-4 w-4 mr-2" />Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
