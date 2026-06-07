export const photoA = "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop&auto=format";
export const photoB = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop&auto=format";

export type Contestant = {
  id: number;
  number: string;
  name: string;
  age: number;
  occupation: string;
  photo: string;
  bio: string;
  achievements: string[];
  social: { instagram: string; twitter: string };
  votes: number;
  score: number;
  journeyProgress: number;
  attendance: number;
};

const bios = [
  "A passionate advocate for youth empowerment in tech, blending intellect with grace.",
  "Future legal mind dedicated to constitutional reform and access to justice in South Africa.",
  "Grassroots activist mobilizing rural communities around clean water and education.",
  "Marketing strategist using brand storytelling to amplify African creative voices.",
  "Foundation Phase teacher pioneering literacy programmes across Soweto schools.",
  "Full-stack engineer building edtech tools used by over 2,000 township learners.",
  "Mental-health advocate offering free counselling drop-ins on campus.",
  "Founder of a sustainable beadwork brand stocked in three Johannesburg boutiques.",
  "PR specialist leading the comms desk at a youth-led non-profit.",
  "Mechanical engineering student designing low-cost prosthetics for amputee veterans.",
];

const names = [
  ["Ayanda Mokoena", 21, "Computer Science Student"],
  ["Lerato Khumalo", 22, "Law Student"],
  ["Naledi Molefe", 20, "Community Activist"],
  ["Zanele Nkosi", 23, "Marketing Graduate"],
  ["Boitumelo Maseko", 21, "Education Student"],
  ["Tshegofatso Mokoena", 24, "Software Developer"],
  ["Keabetswe Ndlovu", 22, "Psychology Student"],
  ["Karabo Modise", 20, "Entrepreneur"],
  ["Palesa Ramaila", 23, "Public Relations Graduate"],
  ["Refilwe Mabena", 21, "Engineering Student"],
] as const;

export const contestants: Contestant[] = names.map(([name, age, occ], i) => ({
  id: i + 1,
  number: `C${String(i + 1).padStart(2, "0")}`,
  name: name as string,
  age: age as number,
  occupation: occ as string,
  photo: i % 2 === 0 ? photoA : photoB,
  bio: bios[i],
  achievements: [
    "Dean's Merit List 2025",
    "UJ Leadership Award",
    "Mandela Day Volunteer 100hrs",
  ].slice(0, 2 + (i % 2)),
  social: {
    instagram: `@${(name as string).toLowerCase().replace(/\s+/g, ".")}`,
    twitter: `@${(name as string).split(" ")[0].toLowerCase()}_za`,
  },
  votes: 1240 + i * 173 + (i % 3) * 412,
  score: 78 + ((i * 13) % 20),
  journeyProgress: 55 + ((i * 7) % 40),
  attendance: 80 + ((i * 5) % 18),
}));

export const judges = [
  { id: 1, name: "Dr. Thandiwe Sibiya", title: "Chair – Beauty Industry SA", scored: 8 },
  { id: 2, name: "Sipho Dlamini", title: "Editor, GQ South Africa", scored: 10 },
  { id: 3, name: "Adv. Nomvula Pheto", title: "Human Rights Advocate", scored: 7 },
  { id: 4, name: "Lebo Mathosa Jr.", title: "Performing Arts Director", scored: 10 },
  { id: 5, name: "Mpho van der Merwe", title: "Founder, Africa Style Co.", scored: 9 },
];

export const categories = [
  { key: "beauty", label: "Beauty", weight: 20 },
  { key: "interview", label: "Interview", weight: 25 },
  { key: "speaking", label: "Public Speaking", weight: 20 },
  { key: "impact", label: "Community Impact", weight: 15 },
  { key: "stage", label: "Stage Presence", weight: 20 },
];

export const sponsors = [
  { name: "UJ FM", tier: "Platinum", impressions: 184320, clicks: 6420, color: "#6A0DAD" },
  { name: "Coca-Cola", tier: "Platinum", impressions: 312900, clicks: 11240, color: "#E61A27" },
  { name: "Standard Bank", tier: "Gold", impressions: 142180, clicks: 4830, color: "#0033A0" },
  { name: "MTN", tier: "Gold", impressions: 198420, clicks: 7110, color: "#FFCB05" },
  { name: "Clicks", tier: "Silver", impressions: 88210, clicks: 2940, color: "#E2231A" },
];

export const ticketTiers = [
  { name: "General", price: 150, sold: 312, capacity: 400 },
  { name: "VIP", price: 350, sold: 84, capacity: 120 },
  { name: "VVIP", price: 700, sold: 28, capacity: 40 },
];

export const event = {
  name: "Miss UJ APK 2027",
  location: "University of Johannesburg APK Campus",
  date: "15 August 2027",
  status: "Live",
  contestants: 10,
  judges: 5,
  audience: 500,
};

export const stats = {
  contestants: "12,480",
  votes: "2.4M",
  events: "318",
  tickets: "R 14.2M",
};

export const awards = [
  { name: "Miss Personality", winner: "Naledi Molefe", criterion: "Audience + Judge composite" },
  { name: "Best Community Impact", winner: "Boitumelo Maseko", criterion: "Service hours + outreach" },
  { name: "Best Public Speaker", winner: "Lerato Khumalo", criterion: "Speaking category top score" },
  { name: "Fan Favorite", winner: "Tshegofatso Mokoena", criterion: "Most audience votes" },
  { name: "Best Dressed", winner: "Karabo Modise", criterion: "Stylist panel vote" },
];

export const revenueSeries = [
  { day: "Mon", tickets: 12400, votes: 3200, sponsors: 8000 },
  { day: "Tue", tickets: 18200, votes: 4100, sponsors: 9200 },
  { day: "Wed", tickets: 22100, votes: 5800, sponsors: 12400 },
  { day: "Thu", tickets: 28400, votes: 7200, sponsors: 14800 },
  { day: "Fri", tickets: 36200, votes: 10400, sponsors: 18200 },
  { day: "Sat", tickets: 48200, votes: 16800, sponsors: 22400 },
  { day: "Sun", tickets: 52400, votes: 21200, sponsors: 24800 },
];

export const engagementSeries = [
  { hour: "18:00", viewers: 120, votes: 84 },
  { hour: "18:30", viewers: 320, votes: 210 },
  { hour: "19:00", viewers: 740, votes: 480 },
  { hour: "19:30", viewers: 1240, votes: 920 },
  { hour: "20:00", viewers: 2180, votes: 1640 },
  { hour: "20:30", viewers: 2840, votes: 2210 },
  { hour: "21:00", viewers: 3120, votes: 2680 },
];

export const roles = [
  { key: "contestant", label: "Contestant" },
  { key: "judge", label: "Judge" },
  { key: "organizer", label: "Organizer" },
  { key: "sponsor", label: "Sponsor" },
  { key: "audience", label: "Audience" },
  { key: "admin", label: "Administrator" },
] as const;
