import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity, Cpu, Database, Globe, ShieldCheck, Building2, UserCog, KeyRound, CreditCard, FileText, Settings2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/admin")({
  head: () => ({ meta: [{ title: "Platform Admin — CrownLedger" }] }),
  component: Admin,
});

const tiles = [
  { label: "Organizations", value: "48", trend: "+6 this month" },
  { label: "Total users", value: "12,480", trend: "+312 this week" },
  { label: "Monthly recurring revenue", value: "R 482K", trend: "+18% MoM" },
  { label: "Active events", value: "8", trend: "Of 318 lifetime" },
  { label: "Votes processed (30d)", value: "2.42M", trend: "+34% MoM" },
  { label: "Payments processed (30d)", value: "R 26.8M", trend: "0.04% disputes" },
];

const health = [
  { label: "API uptime (30d)", value: 99.99, icon: Activity },
  { label: "Database load", value: 42, icon: Database },
  { label: "Edge cache hit-rate", value: 96, icon: Globe },
  { label: "CPU usage (avg)", value: 28, icon: Cpu },
];

const orgs = [
  { name: "Miss UJ APK Committee", plan: "Enterprise", events: 4, users: 38, mrr: "R 12,000" },
  { name: "Miss Soweto Trust", plan: "Professional", events: 2, users: 14, mrr: "R 7,999" },
  { name: "Miss Heritage SA", plan: "Enterprise", events: 6, users: 52, mrr: "R 18,500" },
  { name: "Tshwane Pageants", plan: "Starter", events: 1, users: 6, mrr: "R 2,999" },
  { name: "Face of Africa", plan: "Enterprise", events: 9, users: 84, mrr: "R 24,000" },
];

const users = [
  { name: "Tumelo Sibeko", email: "tumelo@miss-uj.co.za", role: "Pageant Organizer", org: "Miss UJ APK", status: "Active" },
  { name: "Dr. Thandiwe Sibiya", email: "thandiwe@biasa.org", role: "Judge", org: "Beauty Industry SA", status: "Active" },
  { name: "Khaya Nyembe", email: "khaya@misssoweto.co.za", role: "Pageant Organizer", org: "Miss Soweto", status: "Invited" },
  { name: "Ayanda Mokoena", email: "ayanda@uj.ac.za", role: "Contestant", org: "Miss UJ APK", status: "Active" },
  { name: "Coca-Cola SA", email: "sponsor@coca-cola.co.za", role: "Sponsor", org: "Coca-Cola", status: "Active" },
];

const roles = [
  { name: "Super Admin", users: 4, permissions: "Full platform access" },
  { name: "Pageant Organizer", users: 86, permissions: "Own events, contestants, judges, sponsors" },
  { name: "Judge", users: 284, permissions: "Assigned events, scorecards" },
  { name: "Contestant", users: 4118, permissions: "Own profile, journey, tickets" },
  { name: "Sponsor", users: 182, permissions: "Sponsored events, campaign analytics" },
  { name: "Audience Member", users: 7806, permissions: "Voting, tickets, livestream" },
];

const logs = [
  { ts: "14:32:08", actor: "tumelo@miss-uj.co.za", action: "Locked scoring for round Final", level: "info" },
  { ts: "14:29:12", actor: "system", action: "Sponsor banner CDN rotated", level: "info" },
  { ts: "14:21:44", actor: "thandiwe@biasa.org", action: "Submitted score for C04 Beauty 18/20", level: "info" },
  { ts: "13:58:03", actor: "khaya@misssoweto.co.za", action: "Invited 4 users to org Miss Soweto", level: "warn" },
  { ts: "13:42:19", actor: "system", action: "Refunded ticket R350 (dispute resolved)", level: "warn" },
];

function Admin() {
  return (
    <div>
      <PageHeader
        title="Platform Administration Centre"
        subtitle="Verity Digital control plane — organizations, users, roles, billing & audit"
        actions={<Badge className="glass-gold border-0 text-gold"><ShieldCheck className="h-3 w-3 mr-1"/>All systems operational</Badge>}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {tiles.map((t) => (
          <Card key={t.label} className="glass border-border p-5">
            <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{t.label}</div>
            <div className="mt-2 text-2xl font-display">{t.value}</div>
            <div className="text-xs text-gold mt-1">{t.trend}</div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="orgs" className="mt-6">
        <TabsList className="bg-secondary/40">
          <TabsTrigger value="orgs"><Building2 className="h-3.5 w-3.5 mr-1.5"/>Organizations</TabsTrigger>
          <TabsTrigger value="users"><UserCog className="h-3.5 w-3.5 mr-1.5"/>Users</TabsTrigger>
          <TabsTrigger value="roles"><KeyRound className="h-3.5 w-3.5 mr-1.5"/>Roles</TabsTrigger>
          <TabsTrigger value="billing"><CreditCard className="h-3.5 w-3.5 mr-1.5"/>Billing</TabsTrigger>
          <TabsTrigger value="logs"><FileText className="h-3.5 w-3.5 mr-1.5"/>Audit Logs</TabsTrigger>
          <TabsTrigger value="system"><Settings2 className="h-3.5 w-3.5 mr-1.5"/>System</TabsTrigger>
        </TabsList>

        <TabsContent value="orgs">
          <Card className="glass border-border p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display text-lg">Customer Organizations</h3>
              <Button size="sm" className="bg-gold-gradient text-background" onClick={() => toast.success("Invite sent to new organization")}>Add Organization</Button>
            </div>
            <Table>
              <TableHeader><TableRow><TableHead>Organization</TableHead><TableHead>Plan</TableHead><TableHead>Events</TableHead><TableHead>Users</TableHead><TableHead>MRR</TableHead><TableHead></TableHead></TableRow></TableHeader>
              <TableBody>{orgs.map((o) => (
                <TableRow key={o.name}>
                  <TableCell className="font-medium">{o.name}</TableCell>
                  <TableCell><Badge variant="outline" className={o.plan === "Enterprise" ? "border-gold/40 text-gold" : ""}>{o.plan}</Badge></TableCell>
                  <TableCell>{o.events}</TableCell><TableCell>{o.users}</TableCell><TableCell className="text-gold">{o.mrr}</TableCell>
                  <TableCell><Button variant="ghost" size="sm" onClick={() => toast(`Opening ${o.name}`)}>Manage</Button></TableCell>
                </TableRow>
              ))}</TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="glass border-border p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display text-lg">User Management</h3>
              <Button size="sm" className="bg-gold-gradient text-background" onClick={() => toast.success("Invite link copied to clipboard")}>Invite User</Button>
            </div>
            <Table>
              <TableHeader><TableRow><TableHead>User</TableHead><TableHead>Role</TableHead><TableHead>Organization</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
              <TableBody>{users.map((u) => (
                <TableRow key={u.email}>
                  <TableCell><div className="font-medium">{u.name}</div><div className="text-xs text-muted-foreground">{u.email}</div></TableCell>
                  <TableCell>{u.role}</TableCell><TableCell>{u.org}</TableCell>
                  <TableCell><Badge variant="outline" className={u.status === "Active" ? "border-gold/40 text-gold" : ""}>{u.status}</Badge></TableCell>
                  <TableCell><Button variant="ghost" size="sm" onClick={() => toast(`Editing ${u.name}`)}>Edit</Button></TableCell>
                </TableRow>
              ))}</TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card className="glass border-border p-5">
            <h3 className="font-display text-lg mb-4">Roles & Permissions</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {roles.map((r) => (
                <Card key={r.name} className="border-border p-4">
                  <div className="flex justify-between items-start"><div className="font-semibold">{r.name}</div><Badge variant="outline">{r.users}</Badge></div>
                  <div className="text-xs text-muted-foreground mt-2">{r.permissions}</div>
                  <Button variant="ghost" size="sm" className="mt-3 px-0" onClick={() => toast(`Editing permissions: ${r.name}`)}>Edit permissions →</Button>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <div className="grid lg:grid-cols-3 gap-4">
            {[
              { name: "Starter", price: "R 2,999", per: "per event", active: 14 },
              { name: "Professional", price: "R 7,999", per: "per event", active: 22 },
              { name: "Enterprise", price: "Custom", per: "annual licence", active: 12 },
            ].map((p) => (
              <Card key={p.name} className="glass border-border p-5">
                <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{p.name}</div>
                <div className="mt-2 text-3xl font-display">{p.price}<span className="text-sm text-muted-foreground"> {p.per}</span></div>
                <div className="mt-3 text-xs text-gold">{p.active} active subscriptions</div>
                <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => toast(`Editing ${p.name} plan`)}>Edit plan</Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs">
          <Card className="glass border-border p-5">
            <h3 className="font-display text-lg mb-4">Audit Trail (live)</h3>
            <div className="space-y-2 text-sm font-mono">
              {logs.map((l, i) => (
                <div key={i} className="flex gap-3 p-2 rounded border border-border/60">
                  <span className="text-muted-foreground">{l.ts}</span>
                  <Badge variant="outline" className={l.level === "warn" ? "border-gold/40 text-gold" : ""}>{l.level}</Badge>
                  <span className="text-muted-foreground">{l.actor}</span>
                  <span className="flex-1">{l.action}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card className="glass border-border p-5">
            <h3 className="font-display text-lg mb-4">Platform Health</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {health.map((h) => (
                <div key={h.label} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-secondary/60 grid place-items-center"><h.icon className="h-4 w-4 text-gold"/></div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm"><span>{h.label}</span><span className="text-gold">{h.value}%</span></div>
                    <Progress value={h.value} className="mt-1.5"/>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
