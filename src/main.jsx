import React from "react";
import { createRoot } from "react-dom/client";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import "./index.css";

const projects = [
  {
    name: "Mathrushree Bhavana",
    type: "Business website · Web development",
    description: "A welcoming digital home for a hospitality business, designed to make exploring the space and getting in touch feel effortless.",
    url: "https://mathrushreebhavana.vercel.app/",
    image: "/assets/mathrushree.png",
    size: "tall",
    number: "01",
  },
  {
    name: "Eyeshade Photography",
    type: "Booking platform · Full stack",
    description: "An AI-assisted booking experience built for 100+ events and a growing 10K+ user base.",
    url: "https://eyeshade-photography.vercel.app/",
    image: "/assets/eyeshade.png",
    size: "short",
    number: "02",
  },
];

const skillGroups = [
  ["Languages & development", "Java", "Python", "JavaScript", "TypeScript", "SQL", "Node.js", "React"],
  ["Cloud & infrastructure", "GCP", "Kubernetes", "Docker", "Jenkins", "Kafka", "Linux"],
  ["Tools & practices", "Splunk", "JIRA", "JUnit", "Agile", "Confluence", "ServiceNow", "CI/CD", "Airflow", "API testing"],
];

const experience = [
  {
    company: "Eyeshade Photography",
    role: "Full Stack Developer",
    date: "Jun 2025 — Present",
    points: [
      "Built an AI-assisted Java Spring Boot + React platform for 10K users, supporting around 240 concurrent requests through REST APIs on Google Cloud Run.",
      "Used Cursor, OpenAI and Claude Code to accelerate debugging by 70%, contributing to 15+ releases.",
    ],
  },
  {
    company: "Walmart Global Tech, Element",
    role: "Backend Software Developer",
    date: "Jul 2022 — Jun 2024",
    points: [
      "Built GCP microservices, Python ETL pipelines and SQL workflows to ingest metadata from 2,000+ AI models.",
      "Automated approvals for 2,000+ Generative AI applications, improving approval efficiency by 50% with Java, ServiceNow workflows and TDD.",
      "Improved CI/CD reliability by 60% across 15+ containerized repositories using Jenkins, Docker and Kubernetes.",
    ],
  },
  {
    company: "John Deere",
    role: "Backend Software Developer Intern",
    date: "Jul 2021 — Aug 2021",
    points: [
      "Developed a React Native webpage for 100+ internal contractors, improving adoption by 50%.",
      "Wrote 20+ JUnit unit and integration tests and helped reduce 30+ UI bugs using feedback from 200+ users.",
    ],
  },
  {
    company: "Microsoft Engage",
    role: "Software Developer Intern",
    date: "Jul 2020 — Aug 2020",
    points: [
      "Shipped a three-level AI game for 1,000+ new users using a minimax algorithm with JavaScript, React and Node.js.",
      "Selected from 200+ candidates; the game received an average 4.5-star rating from 450+ testers.",
    ],
  },
];

function SectionLabel({ children }) {
  return <p className="mb-4 text-[11px] font-bold uppercase tracking-[.22em] text-moss">{children}</p>;
}

function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <a href="#home" className="font-display text-xl font-semibold tracking-tight">CR<span className="text-moss">.</span></a>
          <div className="hidden items-center gap-8 text-md md:flex">
            <a className="nav-link" href="#work">Businesses</a>
            <a className="nav-link" href="#about">About</a>
            <a className="nav-link" href="#experience">Experience</a>
          </div>
          <a href="mailto:hello@chinmayi.dev" className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-moss">
            Let’s talk <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>

      <main id="home" className="mx-auto max-w-7xl px-5 md:px-10">
        <section className="relative grid min-h-[600px] items-center gap-12 pt-6 pb-12 md:grid-cols-[1.05fr_.95fr] md:py-12">          
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-3.5 py-2 text-xs text-muted">
              <span className="h-2 w-2 rounded-full bg-moss" /> Open to thoughtful collaborations
            </div>
            <p className="mb-4 text-sm font-medium tracking-wide text-muted">Building things for the real world</p>
            <h1 className="max-w-3xl font-display text-[clamp(3.5rem,8vw,6.8rem)] leading-[.98] tracking-[-.055em]">
              I'm Chinmayi Ramakrishna<br /><span className="italic text-moss">a Full Stack Developer</span>
            </h1>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-moss px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-ink">
                Explore my work <ArrowDownRight size={16} />
              </a>
              <div className="flex items-center gap-5">
                <a href="mailto:chinmayicr27@gmail.com" aria-label="Email" className="hover:text-ink"><Mail size={17} /></a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-ink"><Linkedin size={17} /></a>
                <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-ink"><Github size={17} /></a>
              </div></div>
            <div className="mt-16 flex gap-8 border-t border-line pt-6">
              <div><p className="font-display text-3xl">10K+</p><p className="mt-1 text-xs text-muted">Platform users</p></div>
              <div><p className="font-display text-3xl">4</p><p className="mt-1 text-xs text-muted">Teams & experiences</p></div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[480px]">
            <div className="absolute -right-4 -top-5 h-32 w-32 rounded-full border border-[#d8d1c7] md:-right-8 md:-top-8" />
            <div className="absolute -bottom-7 -left-7 h-36 w-36 rounded-full bg-[#f6dfe2]" />
            <div className="relative overflow-hidden rounded-[48%_48%_18px_18px] bg-[#f6dfe2]">
              <img
                src="/assets/profilePic.jpeg"
                alt="Warm, minimal creative workspace"
                className="h-[470px] w-full object-cover opacity-90 md:h-[560px]"
              />
              <div className="absolute inset-0 bg-[#49333a]/10" />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/40 bg-paper/85 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div><p className="font-display text-xl">Curiosity → Creation</p><p className="mt-1 text-xs text-muted">A little note about how I work</p></div>
                  <Sparkles className="text-moss" size={22} />
                </div>
              </div>
            </div>
            <p className="absolute -right-3 top-1/2 hidden -rotate-90 text-[10px] font-bold uppercase tracking-[.25em] text-muted md:block">Design-minded engineering</p>
          </div>
        </section>

        <section id="work" className="scroll-mt-24 border-t border-line py-20 md:py-24">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div><SectionLabel>01 / A few things I’ve made</SectionLabel><h2 className="section-heading">Businesses I support<span className="text-moss">.</span></h2></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {projects.map((project) => (
              <a
                key={project.number}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-line bg-white p-3 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
              >
                {/* Same image width and height */}
                <div className="relative h-[320px] w-full shrink-0 overflow-hidden rounded-[18px]">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 text-[10px] font-bold tracking-widest text-ink">
                    {project.number} / 02
                  </span>

                  <span className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-paper text-ink transition group-hover:bg-moss group-hover:text-white">
                    <ArrowUpRight size={17} />
                  </span>
                </div>

                {/* Same content layout */}
                <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.18em] text-moss">
                    {project.type}
                  </p>

                  <h3 className="mt-2 font-display text-2xl">
                    {project.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    {project.description}
                  </p>

                  <p className="mt-auto pt-5 text-xs font-semibold underline decoration-line underline-offset-4">
                    Visit live website
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="about" className="scroll-mt-24 grid gap-12 border-t border-line py-20 md:grid-cols-[.8fr_1.2fr] md:py-24">
          <div><SectionLabel>02 / A little about me</SectionLabel><h2 className="section-heading">Equal parts<br /><span className="italic text-moss">logic & creativity.</span></h2></div>
          <div>
            <p className="max-w-2xl text-lg leading-9 text-muted">I’m a full stack developer with experience building scalable backend services, cloud-native platforms and user-friendly web applications. I enjoy connecting the details — clean APIs, reliable infrastructure and intuitive interfaces — to make products work beautifully end to end.</p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {skillGroups.map(([group, ...skills]) => (
                <div key={group} className="border-t border-line pt-4">
                  <h3 className="mb-4 text-sm font-semibold">{group}</h3>
                  <div className="flex flex-wrap gap-2">{skills.map(skill => <span key={skill} className="rounded-full border border-line bg-white/70 px-3 py-2 text-xs text-muted">{skill}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="scroll-mt-24 border-t border-line py-20 md:py-24">
          <div className="mb-12"><SectionLabel>03 / Where I’ve been</SectionLabel><h2 className="section-heading">Experience<span className="text-moss">.</span></h2></div>
          <div className="space-y-0">
            {experience.map((job, i) => (
              <article key={job.company} className="grid gap-4 border-t border-line py-8 md:grid-cols-[.7fr_1.3fr] md:gap-12">
                <div><p className="font-display text-2xl">{job.company}</p><p className="mt-2 text-sm text-muted">{job.role}</p><p className="mt-2 text-xs text-moss">{job.date}</p></div>
                <ul className="space-y-3">{job.points.map(point => <li key={point} className="flex gap-3 text-sm leading-7 text-muted"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />{point}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 rounded-[30px] bg-[#f8e1e4] px-7 py-12 md:grid-cols-[1fr_auto] md:items-end md:px-12 md:py-14">
          <div><SectionLabel>04 / Next chapter</SectionLabel><h2 className="max-w-2xl font-display text-4xl leading-tight md:text-5xl">Have a good idea?<br /><span className="italic text-moss">Let’s make it real.</span></h2><p className="mt-4 max-w-lg text-sm leading-7 text-muted">I’m always happy to connect about interesting products, engineering challenges and creative collaborations.</p></div>
          <a href="mailto:hello@chinmayi.dev" className="inline-flex w-fit items-center gap-3 rounded-full bg-ink px-6 py-4 text-sm font-semibold text-white transition hover:bg-moss">Say hello <ArrowUpRight size={16} /></a>
        </section>

        <footer className="flex flex-col justify-between gap-5 py-9 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Chinmayi Ramakrishna. Made with curiosity.</p>
          <div className="flex items-center gap-5">
            <a href="mailto:chinmayicr27@gmail.com" aria-label="Email" className="hover:text-ink"><Mail size={17} /></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-ink"><Linkedin size={17} /></a>
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-ink"><Github size={17} /></a>
          </div>
        </footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);