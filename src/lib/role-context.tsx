import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "super_admin" | "organizer" | "judge" | "contestant" | "sponsor" | "audience";

export const roleMeta: Record<Role, { label: string; description: string; avatar: string }> = {
  super_admin: { label: "Super Admin", description: "Verity Digital platform owner", avatar: "VD" },
  organizer:   { label: "Pageant Organizer", description: "Miss UJ APK 2027 director", avatar: "TS" },
  judge:       { label: "Judge", description: "Dr. Thandiwe Sibiya", avatar: "TS" },
  contestant:  { label: "Contestant", description: "Ayanda Mokoena · C01", avatar: "AM" },
  sponsor:     { label: "Sponsor", description: "Coca-Cola brand manager", avatar: "CC" },
  audience:    { label: "Audience Member", description: "Public viewer", avatar: "AU" },
};

// Which nav keys each role may access
export const roleNav: Record<Role, string[]> = {
  super_admin: ["dashboard", "events", "contestants", "judging", "voting", "tickets", "livestream", "sponsors", "analytics", "communications", "awards", "reports", "admin", "roadmap"],
  organizer:   ["dashboard", "events", "contestants", "judging", "voting", "tickets", "livestream", "sponsors", "communications", "awards", "reports", "analytics"],
  judge:       ["dashboard", "judging", "contestants", "awards"],
  contestant:  ["dashboard", "events", "voting", "tickets", "communications", "awards"],
  sponsor:     ["dashboard", "sponsors", "analytics", "livestream"],
  audience:    ["dashboard", "events", "voting", "tickets", "livestream"],
};

type Ctx = { role: Role; setRole: (r: Role) => void };
const RoleContext = createContext<Ctx>({ role: "organizer", setRole: () => {} });

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>("organizer");
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("cl_role") : null;
    if (stored && stored in roleMeta) setRoleState(stored as Role);
  }, []);
  const setRole = (r: Role) => { setRoleState(r); if (typeof window !== "undefined") localStorage.setItem("cl_role", r); };
  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
}

export const useRole = () => useContext(RoleContext);
