import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, CalendarDays, Users, Gavel, Vote, Ticket, Radio,
  Megaphone, BarChart3, MessagesSquare, Trophy, FileBarChart, Shield, Rocket, Bell, Search, ChevronDown,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useRole, roleMeta, roleNav, type Role } from "@/lib/role-context";
import { toast } from "sonner";

type NavItem = { key: string; to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const allNav: NavItem[] = [
  { key: "dashboard", to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { key: "events", to: "/app/events", label: "Events", icon: CalendarDays },
  { key: "contestants", to: "/app/contestants", label: "Contestants", icon: Users },
  { key: "judging", to: "/app/judging", label: "Live Judging", icon: Gavel },
  { key: "voting", to: "/app/voting", label: "Audience Voting", icon: Vote },
  { key: "tickets", to: "/app/tickets", label: "Tickets", icon: Ticket },
  { key: "livestream", to: "/app/livestream", label: "Livestream", icon: Radio },
  { key: "sponsors", to: "/app/sponsors", label: "Sponsors", icon: Megaphone },
  { key: "analytics", to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { key: "communications", to: "/app/communications", label: "Communications", icon: MessagesSquare },
  { key: "awards", to: "/app/awards", label: "Awards", icon: Trophy },
  { key: "reports", to: "/app/reports", label: "Reports", icon: FileBarChart },
  { key: "admin", to: "/app/admin", label: "Admin Center", icon: Shield },
  { key: "roadmap", to: "/app/roadmap", label: "Roadmap", icon: Rocket },
];

const roleOrder: Role[] = ["super_admin", "organizer", "judge", "contestant", "sponsor", "audience"];

export function AppShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { role, setRole } = useRole();
  const allowed = new Set(roleNav[role]);
  const nav = allNav.filter((i) => allowed.has(i.key));
  const meta = roleMeta[role];

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-sidebar sticky top-0 h-screen">
        <div className="p-5 border-b border-sidebar-border">
          <Logo size="sm" to="/app" />
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {nav.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to as string}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  active
                    ? "bg-primary/15 text-foreground border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-sidebar-border space-y-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition text-left">
              <Avatar className="h-9 w-9 border border-gold/40"><AvatarFallback className="bg-royal-gradient text-foreground text-xs">{meta.avatar}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate">{meta.label}</div>
                <div className="text-[10px] text-muted-foreground truncate">{meta.description}</div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel className="text-xs text-muted-foreground">Switch role (demo)</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {roleOrder.map((r) => (
                <DropdownMenuItem key={r} onClick={() => { setRole(r); toast.success(`Switched to ${roleMeta[r].label}`); }}>
                  <div>
                    <div className="text-sm font-medium">{roleMeta[r].label}</div>
                    <div className="text-[11px] text-muted-foreground">{roleMeta[r].description}</div>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/">Sign out</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="glass-gold rounded-xl p-3 text-xs">
            <div className="font-semibold mb-1">Enterprise Plan</div>
            <div className="text-muted-foreground">Renews 12 Sep 2027</div>
          </div>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl">
          <div className="flex items-center gap-4 px-6 py-3">
            <div className="lg:hidden"><Logo size="sm" to="/app" /></div>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search contestants, events, judges…" className="pl-9 bg-secondary/50 border-border" />
            </div>
            <Badge className="bg-primary/20 text-foreground border border-primary/40 hidden md:inline-flex">
              <span className="relative flex h-2 w-2 mr-2"><span className="absolute inline-flex h-2 w-2 rounded-full bg-gold animate-ping opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-gold" /></span>
              Miss UJ APK 2027 · Live
            </Badge>
            <button className="relative p-2 rounded-lg hover:bg-secondary/60" onClick={() => toast("3 new notifications", { description: "Judge scores pending · 2 ticket queries" })}>
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-gold" />
            </button>
            <Avatar className="h-9 w-9 border border-gold/40">
              <AvatarFallback className="bg-royal-gradient text-foreground text-xs">{meta.avatar}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
