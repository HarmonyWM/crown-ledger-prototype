import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAppStore, roleLabels, type Role } from "@/lib/store";
import { ShieldCheck, KeyRound, Crown, Users, Gavel, Megaphone, Ticket } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: Login,
});

const roleOptions: { key: Role; label: string; icon: typeof Crown; desc: string }[] = [
  { key: "organizer", label: "Organizer", icon: Crown, desc: "Manage your pageant" },
  { key: "judge", label: "Judge", icon: Gavel, desc: "Score contestants" },
  { key: "contestant", label: "Contestant", icon: Users, desc: "Your journey" },
  { key: "sponsor", label: "Sponsor", icon: Megaphone, desc: "Brand analytics" },
  { key: "audience", label: "Audience", icon: Ticket, desc: "Vote & tickets" },
  { key: "super_admin", label: "Super Admin", icon: ShieldCheck, desc: "Platform control" },
];

function Login() {
  const [role, setRole] = useState<Role>("organizer");
  const [step, setStep] = useState<"creds" | "otp">("creds");
  const [tab, setTab] = useState("signin");
  const navigate = useNavigate();
  const { setRole: setStoreRole } = useAppStore();

  function handleEnter() {
    setStoreRole(role);
    toast.success(`Welcome back! Signed in as ${roleLabels[role]}`);
    navigate({ to: "/app" });
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Brand panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-royal-gradient">
        <div className="absolute inset-0 -z-0">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gold/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/40 blur-[120px]" />
        </div>
        <Logo size="lg" />
        <div className="relative space-y-6">
          <h2 className="text-4xl font-display font-semibold leading-tight">The Operating System for Modern Pageantry</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Manage contestants, judges, sponsors, ticketing, audience voting, livestreams, communications and analytics from one platform.
          </p>
          <p className="text-xs text-muted-foreground">Built by Verity Digital to bring transparency, professionalism and efficiency to pageant management.</p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[["318", "Events Managed"], ["12,480", "Contestants"], ["2.4M", "Votes Processed"], ["R 14.2M", "Tickets Sold"]].map(([v, l]) => (
              <div key={l} className="glass rounded-xl p-3">
                <div className="text-xl font-display text-gold">{v}</div>
                <div className="text-xs text-muted-foreground mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative text-xs text-muted-foreground flex items-center gap-3">
          <ShieldCheck className="h-4 w-4 text-gold" /> Bank-grade encryption · POPIA · GDPR
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo /></div>
          <h1 className="text-3xl font-display font-semibold">Welcome to CrownLedger</h1>
          <p className="text-sm text-muted-foreground mt-2">Select your role to access your workspace.</p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {roleOptions.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.key}
                  onClick={() => setRole(r.key)}
                  className={`flex flex-col items-center gap-1 text-xs py-3 px-2 rounded-xl border transition ${
                    role === r.key
                      ? "border-gold/60 bg-gold/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-border hover:text-foreground"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${role === r.key ? "text-gold" : ""}`} />
                  {r.label}
                </button>
              );
            })}
          </div>

          <Card className="glass border-border p-6 mt-6">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="mt-5">
                {step === "creds" ? (
                  <div className="space-y-4">
                    <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="you@university.ac.za" defaultValue="demo@crownledger.co" /></div>
                    <div className="space-y-2">
                      <div className="flex justify-between"><Label>Password</Label><a href="#" className="text-xs text-gold hover:underline">Forgot password?</a></div>
                      <Input type="password" defaultValue="demo-password" />
                    </div>
                    <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer"><input type="checkbox" defaultChecked /> Require 2FA on this device</label>
                    <Button className="w-full bg-gold-gradient text-background" onClick={() => setStep("otp")}>Continue</Button>
                    <Separator />
                    <Button variant="outline" className="w-full" onClick={handleEnter}>
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5 17.6 35.5 12.5 30.4 12.5 24S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.9 0 19.5-8.7 19.5-19.5 0-1.2-.1-2.4-.4-3.5z"/></svg>
                      Continue with Google
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="text-center">
                      <div className="h-12 w-12 rounded-2xl bg-gold/15 grid place-items-center mx-auto"><KeyRound className="h-5 w-5 text-gold" /></div>
                      <h3 className="font-display text-xl mt-3">Two-factor verification</h3>
                      <p className="text-xs text-muted-foreground mt-1">We sent a 6-digit code to demo@crownledger.co</p>
                    </div>
                    <div className="flex justify-center gap-2">
                      {["7","2","9","1","0","4"].map((v, i) => (
                        <Input key={i} maxLength={1} className="h-12 w-10 text-center text-lg font-display" defaultValue={v} />
                      ))}
                    </div>
                    <Button className="w-full bg-gold-gradient text-background" onClick={handleEnter}>Verify and enter dashboard</Button>
                    <button onClick={() => setStep("creds")} className="text-xs text-muted-foreground hover:text-foreground w-full text-center">← Back</button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="register" className="mt-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2"><Label>First name</Label><Input placeholder="Ayanda" /></div>
                  <div className="space-y-2"><Label>Last name</Label><Input placeholder="Mokoena" /></div>
                </div>
                <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="you@university.ac.za" /></div>
                <div className="space-y-2"><Label>Password</Label><Input type="password" placeholder="Create a strong password" /></div>
                <div className="space-y-2">
                  <Label>Organisation</Label>
                  <Input placeholder="University name / pageant name" />
                </div>
                <Button className="w-full bg-gold-gradient text-background" onClick={() => { toast.success("Account created! Welcome to CrownLedger."); handleEnter(); }}>
                  Create account
                </Button>
              </TabsContent>
            </Tabs>
          </Card>

          <Separator className="my-6" />
          <p className="text-xs text-muted-foreground text-center">
            New to CrownLedger? <Link to="/" className="text-gold hover:underline">Request a demo</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
