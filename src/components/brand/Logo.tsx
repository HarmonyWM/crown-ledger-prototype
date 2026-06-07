import { Link } from "@tanstack/react-router";
import { Crown } from "lucide-react";

export function Logo({ size = "md", to = "/" }: { size?: "sm" | "md" | "lg"; to?: string }) {
  const dims = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const text = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg";
  return (
    <Link to={to} className="flex items-center gap-3 group">
      <div className={`${dims} rounded-xl bg-gold-gradient grid place-items-center shadow-glow`}>
        <Crown className="h-5 w-5 text-background" strokeWidth={2.5} />
      </div>
      <div className="leading-tight">
        <div className={`${text} font-display font-semibold tracking-tight`}>
          Crown<span className="text-gradient-gold">Ledger</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">by Verity Digital</div>
      </div>
    </Link>
  );
}
