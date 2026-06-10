import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { useState, useRef, useEffect } from "react";
import { Heart, Send, Eye, Users, Radio, Settings } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/livestream")({
  component: Livestream,
});

const reactions: [string, string][] = [["❤️", "12.4k"], ["👑", "8.2k"], ["🔥", "6.1k"], ["✨", "4.8k"], ["💎", "3.2k"], ["👏", "11.0k"]];

function Livestream() {
  const { chatMessages, sendChat, sponsors } = useAppStore();
  const [message, setMessage] = useState("");
  const [viewerCount, setViewerCount] = useState(3124);
  const [showSettings, setShowSettings] = useState(false);
  const [streamTitle, setStreamTitle] = useState("Miss UJ APK 2027 · Finale Night");
  const [isLive, setIsLive] = useState(true);
  const [reactionCounts, setReactionCounts] = useState<Record<string, number>>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) setViewerCount(v => v + Math.floor(Math.random() * 10 - 3));
    }, 3000);
    return () => clearInterval(interval);
  }, [isLive]);

  function handleSend() {
    if (!message.trim()) return;
    sendChat({ name: "You", msg: message.trim(), time: new Date().toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" }), color: "text-gold" });
    setMessage("");
  }

  function handleReaction(emoji: string) {
    setReactionCounts(r => ({ ...r, [emoji]: (r[emoji] || 0) + 1 }));
    toast.success(`${emoji} reaction sent!`);
  }

  return (
    <div>
      <PageHeader
        title="Livestream"
        subtitle="Branded broadcast · Live chat · Reactions · Sponsor placement"
        actions={<>
          {isLive && <Badge className="bg-destructive/20 text-foreground border border-destructive/40">● ON AIR</Badge>}
          <Button variant="outline" onClick={() => setShowSettings(true)}><Settings className="h-4 w-4 mr-2" />Broadcast Settings</Button>
          <Button className={isLive ? "border-destructive/60 text-destructive" : "bg-gold-gradient text-background"} variant={isLive ? "outline" : "default"} onClick={() => { setIsLive(l => !l); toast.success(isLive ? "Stream ended." : "Stream started!"); }}>
            <Radio className="h-4 w-4 mr-2" />{isLive ? "End Stream" : "Go Live"}
          </Button>
        </>}
      />

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Card className="glass border-border overflow-hidden">
            <div className="relative aspect-video bg-gradient-to-br from-primary/40 via-background to-background grid place-items-center">
              <div className="text-center">
                <div className="h-20 w-20 rounded-full bg-gold-gradient grid place-items-center mx-auto shadow-glow"><Radio className="h-9 w-9 text-background" /></div>
                <div className="mt-4 font-display text-xl">{streamTitle}</div>
                <div className="text-xs text-muted-foreground">1080p · Multi-camera production</div>
              </div>
              <div className="absolute top-4 left-4 flex items-center gap-2">
                {isLive && <Badge className="bg-destructive text-foreground">● LIVE</Badge>}
                <Badge className="glass border-0"><Eye className="h-3 w-3 mr-1" />{viewerCount.toLocaleString()} watching</Badge>
              </div>
              <div className="absolute bottom-4 right-4"><Badge className="glass-gold border-0 text-gold">Powered by CrownLedger</Badge></div>
            </div>
          </Card>

          <div className="grid grid-cols-5 gap-2">
            {sponsors.slice(0, 5).map(s => (
              <div key={s.name} className="glass rounded-xl p-3 text-center text-xs font-semibold">{s.name}</div>
            ))}
          </div>

          <Card className="glass border-border p-5">
            <h3 className="font-display text-lg mb-3">Live Reactions</h3>
            <div className="grid grid-cols-6 gap-3 text-center">
              {reactions.map(([e, n]) => (
                <button key={e} onClick={() => handleReaction(e)} className="rounded-xl bg-secondary/40 p-3 hover:bg-gold/10 hover:scale-110 transition">
                  <div className="text-2xl">{e}</div>
                  <div className="text-xs text-gold mt-1">{reactionCounts[e] ? `+${reactionCounts[e]}` : n}</div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        <Card className="glass border-border p-5 flex flex-col h-[640px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg">Live Chat</h3>
            <Badge variant="outline"><Users className="h-3 w-3 mr-1" />{viewerCount > 1000 ? `${(viewerCount / 1000).toFixed(1)}k` : viewerCount}</Badge>
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {chatMessages.map((c, i) => (
              <div key={i} className="text-sm">
                <span className={`font-semibold ${c.color || "text-foreground"}`}>{c.name}</span>
                <span className="text-[10px] text-muted-foreground ml-1">{c.time}</span>
                <span className="text-muted-foreground"> · {c.msg}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="flex gap-2 mt-3">
            <Input
              className="flex-1"
              placeholder="Say something nice…"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
            />
            <Button size="icon" className="bg-gold-gradient text-background" onClick={handleSend}><Send className="h-4 w-4" /></Button>
          </div>
        </Card>
      </div>

      {/* Broadcast Settings */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="font-display text-2xl">Broadcast Settings</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2"><Label>Stream Title</Label><Input value={streamTitle} onChange={e => setStreamTitle(e.target.value)} /></div>
            <div className="space-y-2"><Label>Scheduled Start</Label><Input type="datetime-local" defaultValue="2027-08-15T19:00" /></div>
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <span className="text-sm">Stream Status</span>
              <Switch checked={isLive} onCheckedChange={setIsLive} />
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <span className="text-sm">Public Visibility</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <span className="text-sm">Live Chat Enabled</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <span className="text-sm">Sponsor Banners</span>
              <Switch defaultChecked />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowSettings(false)}>Cancel</Button>
            <Button className="bg-gold-gradient text-background" onClick={() => { toast.success("Broadcast settings saved."); setShowSettings(false); }}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
