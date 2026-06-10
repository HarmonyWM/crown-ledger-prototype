import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { awards, contestants } from "@/lib/mock-data";
import { Trophy, Crown, Download, Star, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/app/awards")({
  component: Awards,
});

const fullAwards = [
  { name: "Miss UJ APK 2027", winner: "Tshegofatso Mokoena", criterion: "Highest overall weighted score", rank: "Winner", icon: Crown },
  { name: "First Princess", winner: "Lerato Khumalo", criterion: "Second highest overall score", rank: "1st Princess", icon: Star },
  { name: "Second Princess", winner: "Ayanda Mokoena", criterion: "Third highest overall score", rank: "2nd Princess", icon: Star },
  { name: "Miss Congeniality", winner: "Naledi Molefe", criterion: "Voted by fellow contestants", rank: "Special Award", icon: Sparkles },
  { name: "Miss Photogenic", winner: "Boitumelo Maseko", criterion: "Panel of photography judges", rank: "Special Award", icon: Sparkles },
  { name: "Community Impact Award", winner: "Keabetswe Ndlovu", criterion: "Highest community impact score", rank: "Special Award", icon: Trophy },
];

function Awards() {
  const { contestants: liveContestants } = useAppStore();
  const [selectedAward, setSelectedAward] = useState<typeof fullAwards[0] | null>(null);

  const winner = fullAwards[0];
  const winnerContestant = liveContestants.find(c => c.name === winner.winner);

  return (
    <div>
      <PageHeader
        title="Awards"
        subtitle="Auto-calculated based on scores, votes and judge weights."
        actions={<>
          <Button variant="outline" onClick={() => toast.success("All certificates exported as PDF.")}><Download className="h-4 w-4 mr-2" />Export All</Button>
          <Button className="bg-gold-gradient text-background" onClick={() => setSelectedAward(fullAwards[0])}><Trophy className="h-4 w-4 mr-2" />Generate Certificates</Button>
        </>}
      />

      <Card className="glass-gold border-0 p-8 mb-6 text-center">
        <Crown className="h-12 w-12 text-gold mx-auto" />
        {winnerContestant && <img src={winnerContestant.photo} className="h-24 w-24 rounded-full object-cover border-2 border-gold mx-auto mt-4" alt={winner.winner} />}
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mt-4">Predicted Winner</div>
        <div className="font-display text-5xl text-gradient-gold mt-2">{winner.winner}</div>
        <div className="text-sm text-muted-foreground mt-2">Weighted score 94.8 · 7,412 audience votes · Top judge in 3 of 5 categories</div>
        <Button className="mt-6 bg-gold-gradient text-background" onClick={() => setSelectedAward(fullAwards[0])}>
          <Trophy className="h-4 w-4 mr-2" />View Certificate
        </Button>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fullAwards.map((a) => {
          const c = liveContestants.find((c) => c.name === a.winner);
          const Icon = a.icon;
          return (
            <Card key={a.name} className="glass border-border p-5">
              <div className="flex items-center justify-between">
                <Badge className="glass-gold border-0 text-gold">{a.rank}</Badge>
                <Icon className="h-4 w-4 text-gold" />
              </div>
              <div className="font-display text-lg mt-3">{a.name}</div>
              <div className="flex items-center gap-3 mt-4">
                {c && <img src={c.photo} className="h-12 w-12 rounded-full object-cover border border-gold/40" />}
                <div>
                  <div className="font-display text-base">{a.winner}</div>
                  <div className="text-xs text-muted-foreground">{a.criterion}</div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => setSelectedAward(a)}>
                  <Trophy className="h-3.5 w-3.5 mr-1.5" />Certificate
                </Button>
                <Button size="sm" variant="outline" onClick={() => toast.success(`${a.name} certificate downloaded.`)}>
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Certificate Preview */}
      <Dialog open={!!selectedAward} onOpenChange={() => setSelectedAward(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle className="font-display text-xl">Certificate Preview</DialogTitle></DialogHeader>
          {selectedAward && (
            <div className="mt-4">
              <div className="border-4 border-gold/40 rounded-2xl p-8 text-center bg-gradient-to-b from-gold/5 to-background">
                <Crown className="h-10 w-10 text-gold mx-auto" />
                <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground mt-4">Certificate of Achievement</div>
                <div className="font-display text-3xl text-gradient-gold mt-3">{selectedAward.name}</div>
                <div className="mt-4 text-sm text-muted-foreground">This is to certify that</div>
                <div className="font-display text-4xl mt-2">{selectedAward.winner}</div>
                <div className="mt-4 text-sm text-muted-foreground">has been awarded</div>
                <div className="font-display text-xl text-gold mt-2">{selectedAward.rank}</div>
                <div className="mt-3 text-xs text-muted-foreground">{selectedAward.criterion}</div>
                <div className="mt-6 pt-4 border-t border-gold/20 flex justify-between text-xs text-muted-foreground">
                  <span>Miss UJ APK 2027</span>
                  <span className="text-gold">CrownLedger by Verity Digital</span>
                  <span>15 August 2027</span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-gold-gradient text-background" onClick={() => { toast.success("Certificate exported as PDF."); setSelectedAward(null); }}>
                <Download className="h-4 w-4 mr-2" />Download PDF Certificate
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
