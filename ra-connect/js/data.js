/* =========================================================
   RA Connect — mock data
   Everything here is fictional and exists only to power the
   prototype. No real people, practices, or messages.
   ========================================================= */

const AVATAR_PALETTE = ["#1f5c5a", "#c9881f", "#cf5a36", "#3c6e8f", "#6b4a7a"];

function initialsOf(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function colorForName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}

/* ---------- Doctor directory ---------- */
const DOCTORS = [
  {
    id: "d01",
    name: "Dr. Maya Okafor",
    credentials: "MD, Rheumatology",
    specialty: "Rheumatologist",
    city: "Brooklyn",
    state: "NY",
    languages: ["English", "Yoruba"],
    yearsExperience: 14,
    acceptingPatients: true,
    telehealth: true,
    rating: 4.9,
    reviewCount: 212,
    bio: "Dr. Okafor focuses on early diagnosis and treat-to-target care for inflammatory arthritis, with a special interest in helping newly diagnosed patients understand their options.",
    phone: "(718) 555-0114",
    email: "m.okafor@raconnect-demo.org",
  },
  {
    id: "d02",
    name: "Dr. Sam Whitfield",
    credentials: "DO, Rheumatology",
    specialty: "Rheumatologist",
    city: "Smithtown",
    state: "NY",
    languages: ["English"],
    yearsExperience: 9,
    acceptingPatients: true,
    telehealth: true,
    rating: 4.7,
    reviewCount: 98,
    bio: "Dr. Whitfield treats RA, psoriatic arthritis, and lupus, and works closely with patients on biologic and JAK-inhibitor therapy decisions.",
    phone: "(631) 555-0188",
    email: "s.whitfield@raconnect-demo.org",
  },
  {
    id: "d03",
    name: "Priya Raman, NP",
    credentials: "DNP, Rheumatology",
    specialty: "Rheumatology Nurse Practitioner",
    city: "Queens",
    state: "NY",
    languages: ["English", "Hindi", "Tamil"],
    yearsExperience: 7,
    acceptingPatients: true,
    telehealth: true,
    rating: 4.8,
    reviewCount: 64,
    bio: "Priya supports day-to-day symptom management, medication refills, and flare planning between specialist visits.",
    phone: "(718) 555-0142",
    email: "p.raman@raconnect-demo.org",
  },
  {
    id: "d04",
    name: "Dr. Felix Nakamura",
    credentials: "MD, Orthopedic Surgery",
    specialty: "Orthopedic Surgeon",
    city: "Hartford",
    state: "CT",
    languages: ["English", "Japanese"],
    yearsExperience: 21,
    acceptingPatients: false,
    telehealth: false,
    rating: 4.9,
    reviewCount: 301,
    bio: "Dr. Nakamura specializes in joint preservation and replacement for patients whose RA has caused significant joint damage.",
    phone: "(860) 555-0199",
    email: "f.nakamura@raconnect-demo.org",
  },
  {
    id: "d05",
    name: "Dr. Renata Silva",
    credentials: "MD, Pain Management",
    specialty: "Pain Management Specialist",
    city: "Boston",
    state: "MA",
    languages: ["English", "Portuguese", "Spanish"],
    yearsExperience: 11,
    acceptingPatients: true,
    telehealth: true,
    rating: 4.6,
    reviewCount: 77,
    bio: "Dr. Silva builds individualized, non-opioid-first pain plans for people living with chronic inflammatory conditions.",
    phone: "(617) 555-0163",
    email: "r.silva@raconnect-demo.org",
  },
  {
    id: "d06",
    name: "Jordan Becker, PT",
    credentials: "DPT, OCS",
    specialty: "Physical Therapist",
    city: "Brooklyn",
    state: "NY",
    languages: ["English"],
    yearsExperience: 6,
    acceptingPatients: true,
    telehealth: false,
    rating: 4.8,
    reviewCount: 53,
    bio: "Jordan designs joint-friendly strength and mobility programs that adapt around flare days instead of fighting through them.",
    phone: "(718) 555-0177",
    email: "j.becker@raconnect-demo.org",
  },
  {
    id: "d07",
    name: "Dr. Aiko Tanaka",
    credentials: "MD, Rheumatology",
    specialty: "Rheumatologist",
    city: "Stamford",
    state: "CT",
    languages: ["English", "Japanese"],
    yearsExperience: 17,
    acceptingPatients: true,
    telehealth: true,
    rating: 4.9,
    reviewCount: 184,
    bio: "Dr. Tanaka has a long-standing research interest in RA in pregnancy and postpartum care planning.",
    phone: "(203) 555-0121",
    email: "a.tanaka@raconnect-demo.org",
  },
  {
    id: "d08",
    name: "Marcus Lindqvist, OT",
    credentials: "OTR/L, CHT",
    specialty: "Occupational Therapist",
    city: "Smithtown",
    state: "NY",
    languages: ["English", "Swedish"],
    yearsExperience: 10,
    acceptingPatients: true,
    telehealth: true,
    rating: 4.7,
    reviewCount: 41,
    bio: "Marcus is a certified hand therapist who helps patients protect small joints during everyday tasks at home and work.",
    phone: "(631) 555-0155",
    email: "m.lindqvist@raconnect-demo.org",
  },
  {
    id: "d09",
    name: "Dr. Olamide Bello",
    credentials: "MD, Rheumatology",
    specialty: "Rheumatologist",
    city: "Newark",
    state: "NJ",
    languages: ["English", "Yoruba", "French"],
    yearsExperience: 13,
    acceptingPatients: false,
    telehealth: true,
    rating: 4.8,
    reviewCount: 150,
    bio: "Dr. Bello focuses on RA care for patients also managing diabetes or cardiovascular risk, coordinating closely with primary care.",
    phone: "(973) 555-0136",
    email: "o.bello@raconnect-demo.org",
  },
  {
    id: "d10",
    name: "Hannah Reyes, RD",
    credentials: "RDN, CDCES",
    specialty: "Registered Dietitian",
    city: "Brooklyn",
    state: "NY",
    languages: ["English", "Tagalog", "Spanish"],
    yearsExperience: 8,
    acceptingPatients: true,
    telehealth: true,
    rating: 4.9,
    reviewCount: 67,
    bio: "Hannah helps patients explore anti-inflammatory eating patterns without restrictive dieting or guilt.",
    phone: "(718) 555-0190",
    email: "h.reyes@raconnect-demo.org",
  },
  {
    id: "d11",
    name: "Theo Marchetti, LCSW",
    credentials: "LCSW",
    specialty: "Mental Health Counselor",
    city: "Queens",
    state: "NY",
    languages: ["English", "Italian"],
    yearsExperience: 12,
    acceptingPatients: true,
    telehealth: true,
    rating: 4.9,
    reviewCount: 88,
    bio: "Theo specializes in supporting people coping with chronic illness, grief over physical changes, and flare-related anxiety.",
    phone: "(718) 555-0128",
    email: "t.marchetti@raconnect-demo.org",
  },
  {
    id: "d12",
    name: "Dr. Grace Eze",
    credentials: "MD, Rheumatology",
    specialty: "Rheumatologist",
    city: "Hempstead",
    state: "NY",
    languages: ["English", "Igbo"],
    yearsExperience: 19,
    acceptingPatients: true,
    telehealth: false,
    rating: 4.8,
    reviewCount: 233,
    bio: "Dr. Eze has led RA clinics for two decades and is known for unhurried visits and clear, plain-language explanations.",
    phone: "(516) 555-0149",
    email: "g.eze@raconnect-demo.org",
  },
];

/* ---------- Community channels ---------- */
const CHANNELS = [
  {
    id: "c-newly-diagnosed",
    name: "Newly Diagnosed",
    description: "Start here if you're new to an RA diagnosis.",
  },
  {
    id: "c-flares",
    name: "Managing Flares",
    description: "Strategies and support for hard days.",
  },
  {
    id: "c-meds",
    name: "Medication Talk",
    description: "Real talk about treatments and side effects.",
  },
  {
    id: "c-mobility",
    name: "Exercise & Mobility",
    description: "Movement that works with your joints, not against them.",
  },
  {
    id: "c-mind",
    name: "Mental Health & Coping",
    description: "On the emotional side of chronic illness.",
  },
  {
    id: "c-caregivers",
    name: "Caregivers Corner",
    description: "For partners, parents, and friends who support someone with RA.",
  },
];

const SEED_COMMUNITY_POSTS = {
  "c-newly-diagnosed": [
    {
      id: "p1",
      author: "Priya N.",
      timeLabel: "2 days ago",
      text: "Got my diagnosis three weeks ago and I'm still figuring out how to talk about it at work. Did anyone find a script that felt natural?",
      likes: 14,
      replies: [
        { author: "Dana K.", timeLabel: "2 days ago", text: "I kept it short the first time: 'I have an autoimmune condition that affects my joints, and some days I'll need to adjust how I work.' Nobody pushed for more." },
        { author: "Omar T.", timeLabel: "1 day ago", text: "This community helped me so much in my first month. You're not alone in this." },
      ],
    },
    {
      id: "p2",
      author: "Liu W.",
      timeLabel: "5 days ago",
      text: "Question for the group: how long did it take between your first symptoms and an actual rheumatologist appointment?",
      likes: 9,
      replies: [
        { author: "Grace H.", timeLabel: "4 days ago", text: "About five months for me, mostly waiting on a referral. Worth asking your PCP for an urgent referral if your joints are swelling." },
      ],
    },
  ],
  "c-flares": [
    {
      id: "p3",
      author: "Marisol A.",
      timeLabel: "10 hours ago",
      text: "Three-day flare in my hands this week. Heat packs before typing have been a small but real help. What's in your flare toolkit?",
      likes: 21,
      replies: [
        { author: "Ben C.", timeLabel: "8 hours ago", text: "Compression gloves overnight, plus telling my team in advance that voice-to-text days are coming." },
      ],
    },
  ],
  "c-meds": [
    {
      id: "p4",
      author: "Renee F.",
      timeLabel: "1 day ago",
      text: "Switching from methotrexate to a biologic next month. Anyone want to share how the first few injections felt?",
      likes: 17,
      replies: [
        { author: "Aiden P.", timeLabel: "20 hours ago", text: "Mild injection-site redness for me, gone in a day. The fatigue actually improved a lot after the switch." },
      ],
    },
  ],
  "c-mobility": [
    {
      id: "p5",
      author: "Tasha J.",
      timeLabel: "3 days ago",
      text: "Found that water walking twice a week has done more for my knees than anything else this year.",
      likes: 26,
      replies: [],
    },
  ],
  "c-mind": [
    {
      id: "p6",
      author: "Owen S.",
      timeLabel: "6 days ago",
      text: "Anyone else grieve the version of themselves before RA? Some days it hits out of nowhere.",
      likes: 33,
      replies: [
        { author: "Priya N.", timeLabel: "5 days ago", text: "All the time. Talking to a counselor who works with chronic illness specifically made a real difference for me." },
      ],
    },
  ],
  "c-caregivers": [
    {
      id: "p7",
      author: "Imani R.",
      timeLabel: "4 days ago",
      text: "Caregiver here — my partner has RA and I sometimes don't know whether to offer help or hold back. How do you like to be asked?",
      likes: 12,
      replies: [
        { author: "Dana K.", timeLabel: "3 days ago", text: "I love when my partner asks 'want help or company?' instead of just doing the task for me." },
      ],
    },
  ],
};

/* ---------- Seeded patient-doctor conversations ---------- */
const SEED_CONVERSATIONS = {
  d01: [
    { sender: "them", text: "Hi! Thanks for booking a consult. Feel free to send any questions before our visit.", time: "Mon 9:02 AM" },
    { sender: "me", text: "Thank you, Dr. Okafor. Should I bring my recent bloodwork?", time: "Mon 9:14 AM" },
    { sender: "them", text: "Yes, please bring the last 3 months if you have them, or have your lab send results over.", time: "Mon 9:20 AM" },
  ],
  d03: [
    { sender: "them", text: "Hi, this is Priya following up on your refill request — it's been sent to your pharmacy.", time: "Yesterday, 3:10 PM" },
  ],
  d06: [
    { sender: "me", text: "Hi Jordan, my wrists have been worse this week. Should I pause the stretches?", time: "Today, 8:01 AM" },
    { sender: "them", text: "Good question — switch to the gentle range-of-motion set (set B) until swelling settles, and let's check in Thursday.", time: "Today, 8:40 AM" },
  ],
};

const AUTO_REPLIES = [
  "Thanks for the update — noted in your chart. Let's discuss further at your next visit.",
  "Got it. In the meantime, keep tracking it and reach out sooner if it gets worse.",
  "That's a great question — I'll have more detail for you within a day or two.",
  "Thanks for letting me know. Sending you a quick resource on that now.",
];
