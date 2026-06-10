import { createContext, useContext, useState, ReactNode } from "react";
import { contestants as initialContestants, sponsors as initialSponsors, ticketTiers as initialTiers } from "./mock-data";

export type Role = "super_admin" | "organizer" | "judge" | "contestant" | "sponsor" | "audience";

export type AppEvent = {
  id: string;
  name: string;
  location: string;
  date: string;
  status: "Live" | "Upcoming" | "Completed" | "Archived";
  contestants: number;
  description: string;
  ticketing: boolean;
  voting: boolean;
  livestream: boolean;
};

type ChatMessage = { name: string; msg: string; time: string; color?: string };

type AppState = {
  role: Role;
  setRole: (r: Role) => void;
  events: AppEvent[];
  addEvent: (e: Omit<AppEvent, "id">) => void;
  contestants: typeof initialContestants;
  addContestant: (c: (typeof initialContestants)[0]) => void;
  votes: Record<number, number>;
  castVote: (id: number, count: number) => void;
  scores: Record<string, Record<string, number>>;
  setScore: (contestantId: number, category: string, value: number) => void;
  judgeMode: string;
  setJudgeMode: (m: string) => void;
  chatMessages: ChatMessage[];
  sendChat: (msg: ChatMessage) => void;
  ticketTiers: typeof initialTiers;
  sellTicket: (name: string, qty: number) => void;
  sponsors: typeof initialSponsors;
  addSponsor: (s: (typeof initialSponsors)[0]) => void;
  broadcasts: { title: string; channel: string; audience: string; time: string; status: string }[];
  addBroadcast: (b: { title: string; channel: string; audience: string }) => void;
};

const Ctx = createContext<AppState | null>(null);

const defaultEvents: AppEvent[] = [
  { id: "1", name: "Miss UJ APK 2027", location: "UJ APK Campus, Johannesburg", date: "15 Aug 2027", status: "Live", contestants: 10, description: "Annual University of Johannesburg flagship pageant.", ticketing: true, voting: true, livestream: true },
  { id: "2", name: "Miss Tshwane 2027", location: "Sun Arena, Pretoria", date: "12 Sep 2027", status: "Upcoming", contestants: 24, description: "Premier pageant for the Tshwane metropolitan region.", ticketing: true, voting: true, livestream: false },
  { id: "3", name: "Miss Heritage SA 2027", location: "Sandton Convention Centre", date: "24 Sep 2027", status: "Upcoming", contestants: 30, description: "Celebrating South African heritage and culture.", ticketing: true, voting: true, livestream: true },
  { id: "4", name: "Miss Soweto 2027", location: "Soweto Theatre", date: "22 Oct 2027", status: "Upcoming", contestants: 20, description: "Community-rooted pageant celebrating Soweto.", ticketing: true, voting: false, livestream: false },
  { id: "5", name: "Face of Africa 2026", location: "Sandton Convention Centre", date: "5 Dec 2026", status: "Completed", contestants: 42, description: "Pan-African national pageant.", ticketing: true, voting: true, livestream: true },
  { id: "6", name: "Miss UCT 2026", location: "Jameson Hall, Cape Town", date: "18 Jul 2026", status: "Archived", contestants: 16, description: "University of Cape Town annual pageant.", ticketing: false, voting: true, livestream: false },
];

const defaultBroadcasts = [
  { title: "Final dress rehearsal moved to 14:00", channel: "Push + Email", audience: "Contestants, Judges", time: "2h ago", status: "Delivered" },
  { title: "VIP guest list now live", channel: "Email", audience: "Sponsors", time: "5h ago", status: "Delivered" },
  { title: "Voting opens at 19:30", channel: "Push", audience: "Audience (12,480)", time: "Yesterday", status: "Delivered" },
  { title: "Sponsor handover packets ready for pickup", channel: "In-app", audience: "Sponsor leads", time: "2 days ago", status: "Delivered" },
];

const defaultChat: ChatMessage[] = [
  { name: "Nomsa K.", msg: "Lerato is owning that stage tonight! 💎", time: "20:12", color: "text-gold" },
  { name: "Sipho M.", msg: "The interview round just got serious.", time: "20:13" },
  { name: "Boitumelo R.", msg: "Vote sent! Let's go #C04 👑", time: "20:14" },
  { name: "UJ FM Official", msg: "We're loving the energy in APK tonight 📻", time: "20:15", color: "text-primary" },
  { name: "Standard Bank", msg: "Proud to back this vision. #BetterTogether", time: "20:16" },
  { name: "Karabo P.", msg: "Production value is broadcast quality.", time: "20:17" },
];

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("organizer");
  const [events, setEvents] = useState<AppEvent[]>(defaultEvents);
  const [contestants, setContestants] = useState(initialContestants);
  const [votes, setVotes] = useState<Record<number, number>>(() =>
    Object.fromEntries(initialContestants.map((c) => [c.id, c.votes]))
  );
  const [scores, setScores] = useState<Record<string, Record<string, number>>>({});
  const [judgeMode, setJudgeMode] = useState("Preliminary");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(defaultChat);
  const [ticketTiers, setTicketTiers] = useState(initialTiers);
  const [sponsors, setSponsors] = useState(initialSponsors);
  const [broadcasts, setBroadcasts] = useState(defaultBroadcasts);

  const addEvent = (e: Omit<AppEvent, "id">) =>
    setEvents((prev) => [{ ...e, id: Date.now().toString() }, ...prev]);

  const addContestant = (c: (typeof initialContestants)[0]) =>
    setContestants((prev) => [...prev, c]);

  const castVote = (id: number, count: number) =>
    setVotes((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + count }));

  const setScore = (contestantId: number, category: string, value: number) =>
    setScores((prev) => ({
      ...prev,
      [contestantId]: { ...(prev[contestantId] ?? {}), [category]: value },
    }));

  const sendChat = (msg: ChatMessage) =>
    setChatMessages((prev) => [...prev, msg]);

  const sellTicket = (name: string, qty: number) =>
    setTicketTiers((prev) =>
      prev.map((t) => (t.name === name ? { ...t, sold: t.sold + qty } : t))
    );

  const addSponsor = (s: (typeof initialSponsors)[0]) =>
    setSponsors((prev) => [...prev, s]);

  const addBroadcast = (b: { title: string; channel: string; audience: string }) =>
    setBroadcasts((prev) => [{ ...b, time: "Just now", status: "Delivered" }, ...prev]);

  return (
    <Ctx.Provider value={{ role, setRole, events, addEvent, contestants, addContestant, votes, castVote, scores, setScore, judgeMode, setJudgeMode, chatMessages, sendChat, ticketTiers, sellTicket, sponsors, addSponsor, broadcasts, addBroadcast }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAppStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppStore must be used within AppStoreProvider");
  return ctx;
}

export const roleNav: Record<Role, string[]> = {
  super_admin: ["/app", "/app/events", "/app/contestants", "/app/judging", "/app/voting", "/app/tickets", "/app/livestream", "/app/sponsors", "/app/analytics", "/app/communications", "/app/awards", "/app/reports", "/app/admin", "/app/roadmap"],
  organizer: ["/app", "/app/events", "/app/contestants", "/app/judging", "/app/voting", "/app/tickets", "/app/livestream", "/app/sponsors", "/app/analytics", "/app/communications", "/app/awards", "/app/reports"],
  judge: ["/app", "/app/judging", "/app/contestants"],
  contestant: ["/app", "/app/contestants", "/app/voting", "/app/tickets"],
  sponsor: ["/app", "/app/sponsors", "/app/analytics"],
  audience: ["/app", "/app/voting", "/app/tickets", "/app/livestream"],
};

export const roleLabels: Record<Role, string> = {
  super_admin: "Super Admin",
  organizer: "Pageant Organizer",
  judge: "Judge",
  contestant: "Contestant",
  sponsor: "Sponsor",
  audience: "Audience Member",
};
