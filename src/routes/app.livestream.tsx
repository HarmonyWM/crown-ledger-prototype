import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sponsors } from "@/lib/mock-data";
import { Heart, Send, Eye, Users, Radio } from "lucide-react";

export const Route = createFileRoute("/app/livestream")({
  head: () => ({ meta: [{ title: "Livestream — CrownLedger" }] }),
  component: Livestream,
});

const chat = [
  { name: "Nomsa K.", msg: "Lerato is owning that stage tonight! 💎", color: "text-gold" },
  { name: "Sipho M.", msg: "The interview round just got serious." },
  { name: "Boitumelo R.", msg: "Vote sent! Let's go #C04 👑" },
  { name: "UJ FM Official", msg: "We're loving the energy in APK tonight 📻" },
  { name: "Standard Bank", msg: "Proud to back this vision. #BetterTogether" },
  { name: "Karabo P.", msg: "Production value is broadcast quality." },
];

function Livestream() {
  return (
    <div>
      <PageHeader
        title="Livestream"
        subtitle="Branded broadcast · Chat · Reactions · Sponsor placement"
        actions={<>
          <Badge className="bg-destructive/20 text-foreground border border-destructive/40">● ON AIR</Badge>
          <Button variant="outline"><Radio className="h-4 w-4 mr-2"/>Broadcast settings</Button>
        </>}
      />
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Card className="glass border-border overflow-hidden">
            <div className="relative aspect-video bg-gradient-to-br from-primary/40 via-background to-background grid place-items-center">
              <div className="text-center">
                <div className="h-20 w-20 rounded-full bg-gold-gradient grid place-items-center mx-auto shadow-glow"><Radio className="h-9 w-9 text-background"/></div>
                <div className="mt-4 font-display text-xl">Miss UJ APK 2027 · Finale</div>
                <div className="text-xs text-muted-foreground">1080p · Multi-camera production</div>
              </div>
              <div className="absolute top-4 left-4 flex items-center gap-2"><Badge className="bg-destructive text-foreground">● LIVE</Badge><Badge className="glass border-0"><Eye className="h-3 w-3 mr-1"/>3,124 watching</Badge></div>
              <div className="absolute bottom-4 right-4"><Badge className="glass-gold border-0 text-gold">Powered by CrownLedger</Badge></div>
            </div>
          </Card>
          <div className="grid grid-cols-5 gap-2">
            {sponsors.map(s => (
              <div key={s.name} className="glass rounded-xl p-3 text-center text-xs font-semibold">{s.name}</div>
            ))}
          </div>
          <Card className="glass border-border p-5">
            <h3 className="font-display text-lg mb-3">Live Reactions</h3>
            <div className="grid grid-cols-6 gap-3 text-center">
              {[["❤️","12.4k"],["👑","8.2k"],["🔥","6.1k"],["✨","4.8k"],["💎","3.2k"],["👏","11.0k"]].map(([e,n]) => (
                <div key={e as string} className="rounded-xl bg-secondary/40 p-3">
                  <div className="text-2xl">{e}</div>
                  <div className="text-xs text-gold mt-1">{n}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="glass border-border p-5 flex flex-col h-[640px]">
          <div className="flex items-center justify-between mb-4"><h3 className="font-display text-lg">Live Chat</h3><Badge variant="outline"><Users className="h-3 w-3 mr-1"/>3.1k</Badge></div>
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {chat.map((c,i) => (
              <div key={i} className="text-sm">
                <span className={`font-semibold ${c.color || "text-foreground"}`}>{c.name}</span>
                <span className="text-muted-foreground"> · {c.msg}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-3"><input className="flex-1 bg-secondary/40 border border-border rounded-lg px-3 text-sm" placeholder="Say something nice…"/><Button size="icon" className="bg-gold-gradient text-background"><Send className="h-4 w-4"/></Button></div>
        </Card>
      </div>
    </div>
  );
}
