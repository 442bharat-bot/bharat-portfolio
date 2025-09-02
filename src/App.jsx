import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, Line, AreaChart, Area
} from "recharts";

const data = {
  name: "Bharat Surana",
  tagline: "Sales & Marketing • MSc Business Analytics, University of Leeds",
  location: "Leeds, United Kingdom",
  email: "442bharat@gmail.com",
  phone: "+44 79796 19087",
  links: {
    linkedin: "https://linkedin.com/in/bharat442",
    github: "https://github.com/bharat442",
    resume: "https://drive.google.com/file/d/1TzPfLMlKNxYScpJXqlrpk9ot7ZZoyRqV/view?usp=drive_link"
  },
  summary:
    "Sales and marketing specialist blending strategy with analytics. I build funnels, lead teams, and turn messy data into decisions. Comfortable in fast-moving environments where results matter.",
  highlights: [
    { label: "Revenue growth", value: "35%", sub: "in 6 months (Dhwani Astro)" },
    { label: "Acquisition lift", value: "40%", sub: "downloads & new users" },
    { label: "Conversion", value: "+25%", sub: "CRM-led funnel" }
  ],
  skillsRadar: [
    { skill: "Sales", score: 90 }, { skill: "Marketing", score: 88 },
    { skill: "CRM", score: 85 }, { skill: "Power BI", score: 78 },
    { skill: "Excel", score: 82 }, { skill: "R / SQL", score: 70 },
    { skill: "Forecasting", score: 74 }, { skill: "Stakeholders", score: 92 }
  ],
  dhwaniMonthly: [
    { month: "Jan", revenueIdx: 100, cvr: 2.1, cac: 1.0 },
    { month: "Feb", revenueIdx: 106, cvr: 2.4, cac: 0.95 },
    { month: "Mar", revenueIdx: 112, cvr: 2.6, cac: 0.91 },
    { month: "Apr", revenueIdx: 118, cvr: 2.8, cac: 0.88 },
    { month: "May", revenueIdx: 126, cvr: 3.0, cac: 0.85 },
    { month: "Jun", revenueIdx: 135, cvr: 3.2, cac: 0.82 }
  ],
  channelMix: [
    { channel: "Paid Social", before: 45, after: 52 },
    { channel: "Google Ads", before: 30, after: 33 },
    { channel: "Email/CRM", before: 15, after: 25 },
    { channel: "Influencers", before: 10, after: 18 }
  ],
  projects: [
    { title: "Forecasting US Consumer Spending", tag: ["analytics"], blurb:
      "Built and compared ETS/ARIMA baselines to produce actionable spend signals, then translated insights into campaign pacing guidance.",
      stack: ["R","Time series","ETS","ARIMA"], impact:
      "Improved planning discipline and informed monthly budget spread.", link: "#" },
    { title: "Shareholder Visualisation for Board Briefing", tag: ["analytics","viz"],
      blurb:"Power BI dashboards to map shareholder structures and control, with clear callouts for concentration risk.",
      stack:["Power BI","DAX","Data modelling"], impact:"Sharper board discussion; faster what‑if analysis.", link:"#"},
    { title: "Dhwani Astro Growth Engine", tag:["sales","marketing"], blurb:
      "Orchestrated full-funnel ops: paid + influencer + CRM. Built loops to reduce CAC and nudge LTV.",
      stack:["Meta","Google Ads","HubSpot","Lifecycle"], impact:"35% revenue growth in 6 months, +40% acquisition, +25% CVR.", link:"#"},
    { title: "Barnshenn Presales Playbook", tag:["sales"], blurb:
      "Analysed requirements, sharpened pitch templates, and cleaned CRM signals for faster follow-ups.",
      stack:["Discovery","Solutions briefs","CRM hygiene"], impact:"Higher pitch success and clearer pipeline visibility.", link:"#"},
  ],
  experience: [
    { role:"Sales & Business Development Analyst (Intern)", company:"Barnshenn",
      location:"Manchester, UK", dates:"Oct 2024 – Dec 2024",
      points:[ "Analysed client requirements for customised education solutions",
               "Researched new opportunities and improved CRM pipeline tracking",
               "Presented findings that sharpened presales strategy" ] },
    { role:"Sales & Marketing Team Lead", company:"Dhwani Astro", location:"New Delhi, India",
      dates:"Jan 2024 – Aug 2024", points:[ "Directed digital campaigns across social, search, and email",
      "Built CRM-driven funnel; +25% lead-to-sale conversion", "Formed influencer/community partnerships across regions" ]},
    { role:"Marketing & Business Development Consultant", company:"Kuadro Studio", location:"Gurgaon, India",
      dates:"Dec 2023 – Aug 2024", points:[ "Launched digital initiatives for a fashion client",
      "Competitor benchmarking and proposals for high-value wins", "Data-backed sales decks and performance reports" ]},
    { role:"Marketing & Strategy Intern", company:"Kuadro Studio", location:"Gurgaon, India",
      dates:"Sept 2023 – Nov 2023", points:[ "Market research and campaign planning",
      "Dashboards for marketing ROI", "Process improvements across delivery" ]}
  ],
  education: [
    { degree:"MSc – Business Analytics & Decision Sciences", school:"University of Leeds", dates:"Sept 2024 – Present" },
    { degree:"BBA – Business Analytics", school:"Bharati Vidyapeeth Institute of Management & Research", dates:"Jul 2020 – Jun 2024" }
  ],
  certificates: [
    "Complete Python Developer: Zero to Mastery",
    "Data Analyst: Excel, SQL & Tableau",
    "AI for Business Decision-Making",
    "Advanced AI Training for Sales & Marketing"
  ]
};

const Section = ({ id, title, children }) => (
  <section id={id} className="relative py-16 sm:py-20">
    <div className="max-w-6xl mx-auto px-6">
      <motion.h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6"
        initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.5 }}>
        {title}
      </motion.h2>
      {children}
    </div>
  </section>
);

const Card = ({ children, className = "" }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ duration: 0.5 }}
    className={`bg-white/70 dark:bg-zinc-900/60 backdrop-blur border border-zinc-200/60 dark:border-zinc-800 rounded-2xl shadow-sm ${className}`}>
    {children}
  </motion.div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">{children}</span>
);

const Pill = ({ value, label, sub }) => (
  <Card className="p-5 flex flex-col items-start">
    <div className="text-3xl font-bold">{value}</div>
    <div className="text-sm text-zinc-600 dark:text-zinc-400">{label}</div>
    {sub && <div className="text-xs mt-1 text-zinc-500">{sub}</div>}
  </Card>
);

const FancyBG = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute -top-24 -left-24 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-25 bg-gradient-to-tr from-sky-400 via-fuchsia-400 to-indigo-400 dark:opacity-20" />
    <div className="absolute -bottom-24 -right-24 w-[42rem] h-[42rem] rounded-full blur-3xl opacity-25 bg-gradient-to-tr from-violet-400 via-emerald-400 to-cyan-400 dark:opacity-20" />
  </div>
);

const useProjectFilters = () => {
  const [active, setActive] = useState("all");
  const filtered = useMemo(() => {
    if (active === "all") return data.projects;
    return data.projects.filter((p) => p.tag.includes(active));
  }, [active]);
  return { active, setActive, filtered };
};

export default function App() {
  const { active, setActive, filtered } = useProjectFilters();
  return (
    <div className="dark min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <FancyBG />
      <header className="sticky top-0 z-20 backdrop-blur bg-white/60 dark:bg-zinc-950/50 border-b border-zinc-200/60 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#top" className="font-semibold tracking-tight">Bharat Surana</a>
          <nav className="flex gap-4 text-sm">
            <a className="hover:opacity-80" href="#projects">Projects</a>
            <a className="hover:opacity-80" href="#experience">Experience</a>
            <a className="hover:opacity-80" href="#skills">Skills</a>
            <a className="hover:opacity-80" href="#education">Education</a>
            <a className="hover:opacity-80" href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-16 sm:pt-24 pb-10">
          <div className="grid md:grid-cols-[1.2fr,1fr] gap-8 items-center">
            <div>
              <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }} className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
                {data.name}
              </motion.h1>
              <p className="mt-3 text-lg sm:text-xl text-zinc-700 dark:text-zinc-300">{data.tagline}</p>
              <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-300">{data.summary}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`mailto:${data.email}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">📧 Email</a>
                <a href={data.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-zinc-300 dark:border-zinc-700">🔗 LinkedIn</a>
                <a href={data.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-zinc-300 dark:border-zinc-700">🐙 GitHub</a>
                <a href={data.links.resume} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-zinc-300 dark:border-zinc-700">📄 CV</a>
              </div>

              <div className="mt-4 flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                📍 {data.location}
                <span className="inline-flex items-center gap-2">📞 {data.phone}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {data.highlights.map((h, i) => (
                <Pill key={i} value={h.value} label={h.label} sub={h.sub} />
              ))}
              <Card className="col-span-3 p-0 overflow-hidden">
                <div className="p-4 border-b border-zinc-200/70 dark:border-zinc-800 flex items-center gap-2 text-sm">📈 Dhwani Astro: revenue index vs CAC</div>
                <div className="h-44 p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.dhwaniMonthly} margin={{ left: 6, right: 6, top: 6, bottom: 0 }}>
                      <defs>
                        <linearGradient id="revg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.5} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="month" tickLine={false} axisLine={false} />
                      <YAxis yAxisId="left" tickLine={false} axisLine={false} />
                      <YAxis yAxisId="right" orientation="right" hide />
                      <Tooltip />
                      <Area yAxisId="left" type="monotone" dataKey="revenueIdx" stroke="#22c55e" fillOpacity={1} fill="url(#revg)" name="Revenue Index" />
                      <Line yAxisId="right" type="monotone" dataKey="cac" stroke="#ef4444" dot={false} name="CAC (relative)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Section id="projects" title="Selected work">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <Badge>🔎 Filter</Badge>
          {[
            { key: "all", label: "All" },
            { key: "sales", label: "Sales" },
            { key: "marketing", label: "Marketing" },
            { key: "analytics", label: "Analytics" },
            { key: "viz", label: "Visualisation" }
          ].map((btn) => (
            <button key={btn.key} onClick={() => setActive(btn.key)}
              className={`px-3 py-1.5 rounded-xl text-sm border ${
                active === btn.key ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                                   : "border-zinc-300 dark:border-zinc-700" }`}>
              {btn.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <Card key={i} className="p-5 flex flex-col">
              <div className="flex items-start justify-between">
                <h3 className="font-medium text-lg">{p.title}</h3>
                <span className="opacity-60">↗</span>
              </div>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{p.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.stack.map((s, j) => (<Badge key={j}>{s}</Badge>))}
              </div>
              <div className="mt-4 text-sm text-emerald-600 dark:text-emerald-400 font-medium">{p.impact}</div>
            </Card>
          ))}
        </div>

        <Card className="mt-6 p-0 overflow-hidden">
          <div className="p-4 border-b border-zinc-200/70 dark:border-zinc-800 flex items-center gap-2 text-sm">📈 Channel mix before → after</div>
          <div className="h-64 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.channelMix} margin={{ left: 6, right: 12, top: 6, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="channel" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="before" name="Before (%)" />
                <Bar dataKey="after" name="After (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </Section>

      <Section id="experience" title="Experience">
        <div className="grid md:grid-cols-2 gap-6">
          {data.experience.map((e, i) => (
            <Card key={i} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-zinc-500">{e.dates}</div>
                  <h3 className="text-lg font-semibold mt-1">{e.role}</h3>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2 mt-1">
                    <span>💼 {e.company}</span>
                    <span className="inline-flex items-center gap-1">📍 {e.location}</span>
                  </div>
                </div>
                <Badge>Impact</Badge>
              </div>
              <ul className="mt-3 text-sm list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
                {e.points.map((p, j) => (<li key={j}>{p}</li>))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="skills" title="Skills that matter">
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          <Card className="p-6">
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">Profile strength</div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data.skillsRadar} cx="50%" cy="50%" outerRadius="80%">
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis />
                  <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">A few real numbers I care about</div>
            <div className="grid grid-cols-3 gap-4">
              {data.highlights.map((h, i) => (<Pill key={i} value={h.value} label={h.label} sub={h.sub} />))}
            </div>
          </Card>
        </div>
      </Section>

      <Section id="contact" title="Let’s talk">
        <Card className="p-6">
          <div className="grid md:grid-cols-[1.2fr,1fr] gap-6 items-center">
            <div>
              <p className="text-zinc-600 dark:text-zinc-300">If you’re hiring for sales, marketing, or an analytics-minded hybrid, I’d love to chat. I enjoy roles where I can build funnels, ship experiments, and prove impact with data.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={`mailto:${data.email}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">📧 Email</a>
                <a href={data.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-zinc-300 dark:border-zinc-700">🔗 LinkedIn</a>
                <a href={data.links.resume} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-zinc-300 dark:border-zinc-700">📄 Download CV</a>
              </div>
            </div>
            <div className="flex items-start">
              <div>
                <div className="text-sm text-zinc-500">Based in</div>
                <div className="font-medium">{data.location}</div>
                <div className="text-sm mt-2 text-zinc-500">Open to</div>
                <div className="font-medium">Sales • Marketing • Analyst</div>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      <footer className="py-10 text-center text-xs text-zinc-500">© {new Date().getFullYear()} {data.name}. Built with React, Tailwind, Framer Motion, and Recharts.</footer>
    </div>
  );
}
