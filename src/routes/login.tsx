import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { roles } from "@/lib/mock-data";
import { ShieldCheck, KeyRound } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — CrownLedger" }] }),
  component: Login,
});

function Login() {
  const [role, setRole] = useState<string>("organizer");
  const [step, setStep] = useState<"creds" | "otp">("creds");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Brand panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-royal-gradient">
        <div className="absolute inset-0 -z-0">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gold/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/40 blur-[120px]" />
        </div>
        <Logo size="lg" />
        <div className="relative">
          <h2 className="text-4xl font-display font-semibold leading-tight">"CrownLedger gave our pageant a backstage worthy of the stage."</h2>
          <p className="mt-6 text-sm text-muted-foreground">— Khaya Nyembe, Director, Miss Soweto</p>
        </div>
        <div className="relative text-xs text-muted-foreground flex items-center gap-3">
          <ShieldCheck className="h-4 w-4 text-gold" /> Bank-grade encryption · POPIA · GDPR
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo /></div>
          <h1 className="text-3xl font-display font-semibold">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-2">Choose your role to access the right workspace.</p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {roles.map((r) => (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                className={`text-xs py-2 px-2 rounded-lg border transition ${
                  role === r.key
                    ? "border-gold/60 bg-gold/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <Card className="glass border-border p-6 mt-6">
            {step === "creds" ? (
              <Tabs defaultValue="email">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="email">Email + Password</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                </TabsList>
                <TabsContent value="email" className="space-y-4 pt-5">
                  <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="you@university.ac.za" defaultValue="demo@crownledger.co" /></div>
                  <div className="space-y-2">
                    <div className="flex justify-between"><Label>Password</Label><a href="#" className="text-xs text-gold hover:underline">Forgot?</a></div>
                    <Input type="password" defaultValue="demo-password" />
                  </div>
                  <label className="flex items-center gap-2 text-xs text-muted-foreground"><input type="checkbox" defaultChecked /> Require 2FA on this device</label>
                  <Button className="w-full bg-gold-gradient text-background" onClick={() => setStep("otp")}>Continue</Button>
                </TabsContent>
                <TabsContent value="social" className="pt-5 space-y-3">
                  <Button variant="outline" className="w-full" onClick={() => setStep("otp")}>
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5 17.6 35.5 12.5 30.4 12.5 24S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.9 0 19.5-8.7 19.5-19.5 0-1.2-.1-2.4-.4-3.5z"/></svg>
                    Continue with Google
                  </Button>
                  <Button variant="outline" className="w-full">Continue with Apple</Button>
                  <Button variant="outline" className="w-full">Continue with Microsoft</Button>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="space-y-5">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-2xl bg-gold/15 grid place-items-center mx-auto"><KeyRound className="h-5 w-5 text-gold" /></div>
                  <h3 className="font-display text-xl mt-3">Two-factor verification</h3>
                  <p className="text-xs text-muted-foreground mt-1">We sent a 6-digit code to your device</p>
                </div>
                <div className="flex justify-center gap-2">
                  {Array.from({length: 6}).map((_, i) => (
                    <Input key={i} maxLength={1} className="h-12 w-10 text-center text-lg font-display" defaultValue={["7","2","9","1","0","4"][i]} />
                  ))}
                </div>
                <Button className="w-full bg-gold-gradient text-background" onClick={() => navigate({ to: "/app" })}>Verify and enter dashboard</Button>
                <button onClick={() => setStep("creds")} className="text-xs text-muted-foreground hover:text-foreground w-full text-center">← Back</button>
              </div>
            )}
          </Card>

          <Separator className="my-6" />
          <p className="text-xs text-muted-foreground text-center">
            New to CrownLedger? <Link to="/" className="text-gold hover:underline">Book a demo</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
