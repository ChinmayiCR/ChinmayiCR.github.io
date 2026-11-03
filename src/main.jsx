import React from "react";
import { createRoot } from "react-dom/client";
import { ArrowDownRight, ArrowUpRight, GitBranch, Mail, Linkedin,Sparkles } from "lucide-react";
import "./index.css";

import { useEffect, useRef, useState } from "react";

// Global scroll progress indicator
function GlobalScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      const percentage =
        scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

      setProgress(percentage);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[100] h-[2px] w-full bg-transparent">
      <div
        className="h-full bg-moss transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// Progressive blur reveal
function RevealCard({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-8 opacity-0 blur-md"
      }`}
    >
      {children}
    </div>
  );
}

// Animate numeric values when visible
function AnimatedMetric({ value }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  const numericValue = parseInt(value.replace(/[^\d]/g, ""), 10);
  const suffix = value.match(/(\+?%?)$/)?.[0] || "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || !Number.isFinite(numericValue)) return;

    const duration = 1400;
    const startTime = performance.now();

    let frame;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out
      const eased = 1 - Math.pow(1 - progress, 4);

      setCount(Math.round(numericValue * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [started, numericValue]);

  return (
    <span
      ref={ref}
      className="font-semibold text-ink tabular-nums"
    >
      {count.toLocaleString("en-US")}{suffix}
    </span>
  );
}

// Animate numbers inside existing experience descriptions
function AnimatedPoint({ text }) {
  const parts = text.split(/(\d[\d,]*(?:\+)?%?)/g);

  return (
    <>
      {parts.map((part, index) =>
        /^\d[\d,]*(?:\+)?%?$/.test(part) ? (
          <AnimatedMetric key={index} value={part} />
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}

// Fade sections into view
function SectionFadeObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-section-fade]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}

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
  ["Programming languages", "Java", "Python", "JavaScript", "TypeScript", "SQL", "Node.js", "React", "Go", "C#", ".NET"],
  ["Cloud & infrastructure", "AWS", "GCP", "Kubernetes", "Docker", "Jenkins", "Kafka"],
  ["Tools & practices", "Splunk", "JIRA", "JUnit", "Agile", "Confluence", "ServiceNow", "CI/CD", "Airflow", "API testing", "REST APIs"],
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

const education = [
  {
    university: "The University of Texas at Dallas",
    degree: "Master's in Computer Science",
    location: "Dallas, United States",
    specialization: "Cyber Defense",
    date: "August 2024 — May 2026",
    points: [
      "Affiliations/Awards: Grace Hopper Scholar (chosen out of 500+ applicants)",
      "Relevant coursework: Advanced Operating Systems, Database Systems, Data Structures",
    ],
  },
  {
    university: "National Institute of Technology Karnataka",
    degree: "Bachelor's in Information Technology",
    location: "Surathkal, India",
    specialization: "",
    date: "July 2018 — April 2022",
    points: [
        "Relevant coursework: Object-Oriented Programming, Web Application Development, Computer Networks",
    ],
  }
];

function SectionLabel({ children }) {
  return <p className="mb-4 text-[11px] font-bold uppercase tracking-[.22em] text-moss">{children}</p>;
}

function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <GlobalScrollProgress />
      <SectionFadeObserver />
      <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">

          <a
            href="#home"
            className="logo-mark group relative inline-flex items-center font-display text-3xl font-semibold tracking-tight"
          >
            <span className="logo-text">CR</span>
            <span className="logo-dot">.</span>
            <span className="logo-shine" />
          </a>
          <div className="hidden items-center gap-8 text-md md:flex">
            <a className="nav-link" href="#work">Businesses</a>
            <a className="nav-link" href="#about">About</a>
            <a className="nav-link" href="#experience">Experience</a>
            <a className="nav-link" href="#education">Education</a>
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
            <h1 className="hero-heading max-w-4xl font-display text-[clamp(3.5rem,8vw,6.8rem)] leading-[.98] tracking-[-.055em]">
              <span className="hero-intro block">
                I'm <span className="hero-name">Chinmayi</span>
                <br />
                <span className="hero-name">Ramakrishna</span>
              </span>

              <span className="hero-role relative mt-3 inline-block italic text-moss">
                a Full Stack Developer
                <span className="hero-underline" />
              </span>
            </h1>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-moss px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-ink">
                Explore my work <ArrowDownRight size={16} />
              </a>
              <div className="flex items-center gap-5">
                <a href="mailto:chinmayicr27@gmail.com" aria-label="Email" className="hover:text-ink"><Mail size={17} /></a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-ink"><Linkedin size={17} /></a>
                <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-ink"><GitBranch size={17} /></a>
              </div></div>
            <div className="mt-16 flex gap-8 border-t border-line pt-6">
              <div><p className="font-display text-3xl">10K+</p><p className="mt-1 text-xs text-muted">Platform users</p></div>
              <div><p className="font-display text-3xl">4</p><p className="mt-1 text-xs text-muted">Teams & experiences</p></div>
            </div>
          </div>

          
          <div className="profile-scene relative mx-auto w-full max-w-[480px]">

            {/* Decorative animated ring */}
            <div className="profile-ring absolute -right-4 -top-5 h-32 w-32 rounded-full border border-[#d8d1c7] md:-right-8 md:-top-8" />

            {/* Floating background circle */}
            <div className="profile-orbit absolute -bottom-7 -left-7 h-36 w-36 rounded-full bg-[#f6dfe2]" />

            {/* Main interactive image */}
            <div
              className="profile-card group relative overflow-hidden rounded-[48%_48%_18px_18px] bg-[#f6dfe2]"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotateX = ((y / rect.height) - 0.5) * -5;
                const rotateY = ((x / rect.width) - 0.5) * 5;

                e.currentTarget.style.transform =
                  `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

                e.currentTarget.style.setProperty("--x", `${x}px`);
                e.currentTarget.style.setProperty("--y", `${y}px`);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "perspective(1000px) rotateX(0deg) rotateY(0deg)";
              }}
            >
              <img
                src="/assets/profilePic.jpeg"
                alt="Chinmayi Ramakrishna"
                className="h-[470px] w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105 md:h-[560px]"
              />

              {/* Soft image overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[#49333a]/10 transition-opacity duration-500 group-hover:opacity-0" />

              {/* Cursor spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(280px circle at var(--x) var(--y), rgba(255,255,255,0.22), transparent 70%)",
                }}
              />

              {/* Floating information panel */}
              <div className="profile-note absolute bottom-5 left-5 right-5 rounded-2xl border border-white/40 bg-paper/85 p-5 shadow-lg shadow-ink/5 backdrop-blur-md transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-paper/95">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-xl">
                      Curiosity → Creation
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      A little note about how I work
                    </p>
                  </div>

                  <Sparkles
                    className="text-moss transition-transform duration-700 group-hover:rotate-45 group-hover:scale-125"
                    size={22}
                  />
                </div>
              </div>
            </div>

            {/* Side caption */}
            <p className="profile-caption absolute -right-3 top-1/2 hidden -rotate-90 text-[10px] font-bold uppercase tracking-[.25em] text-muted md:block">
              Design-minded engineering
            </p>

            {/* Decorative floating dot */}
            <div className="profile-dot absolute -right-2 top-1/3 h-3 w-3 rounded-full bg-moss md:-right-5" />

          </div>

        </section>

        
        <section
          id="work"
          className="scroll-mt-24 border-t border-line py-20 md:py-24"
        >
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <SectionLabel>01 / A few things I’ve made</SectionLabel>
              <h2 className="section-heading">
                Businesses I support<span className="text-moss">.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {projects.map((project) => (
              <a
                key={project.number}
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-line bg-white p-3 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-moss/50 hover:shadow-xl hover:shadow-ink/5"
                style={{ transformStyle: "preserve-3d" }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;

                  const rotateX = ((y / rect.height) - 0.5) * -6;
                  const rotateY = ((x / rect.width) - 0.5) * 6;

                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

                  e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
                  e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
                }}
              >
                {/* Cursor-following spotlight */}
                <div
                  className="pointer-events-none absolute inset-0 z-10 rounded-[26px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(143, 160, 120, 0.12), transparent 70%)",
                  }}
                />

                {/* Project image */}
                <div className="relative h-[320px] w-full shrink-0 overflow-hidden rounded-[18px]">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 text-[10px] font-bold tracking-widest text-ink backdrop-blur-sm">
                    {project.number} / 02
                  </span>

                  {/* Sliding action icons */}
                  <div className="absolute bottom-4 right-4 flex translate-y-3 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-paper/90 text-ink backdrop-blur-md transition-colors duration-300 hover:bg-moss hover:text-white"
                      title="GitHub"
                    >
                      <GitBranch size={17} />
                    </span>

                    <span
                      className="grid h-10 w-10 place-items-center rounded-full bg-moss text-white transition-colors duration-300 hover:bg-ink"
                      title="Live Demo"
                    >
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                </div>

                {/* Project content */}
                <div className="relative z-10 flex flex-1 flex-col px-3 pb-3 pt-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.18em] text-moss">
                    {project.type}
                  </p>

                  <h3 className="mt-2 font-display text-2xl transition-colors duration-300 group-hover:text-moss">
                    {project.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    {project.description}
                  </p>

                  <p className="mt-auto pt-5 text-xs font-semibold underline decoration-line underline-offset-4 transition-colors duration-300 group-hover:text-moss">
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
              {skillGroups.map(([group, ...skills], groupIndex) => (
                <div key={group} className="border-t border-line pt-4">
                  <h3 className="mb-5 text-sm font-semibold">{group}</h3>

                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => (
                      <span
                        key={skill}
                        style={{
                          animationDelay: `${(index % 5) * 0.25}s`,
                        }}
                        className="
                          skill-bubble
                          relative cursor-default
                          rounded-full border border-line
                          bg-white/70 px-4 py-2.5
                          text-xs font-medium text-muted
                          transition-all duration-300 ease-out
                          hover:-translate-y-1.5
                          hover:scale-105
                          hover:border-moss
                          hover:bg-white
                          hover:text-ink
                          hover:shadow-lg hover:shadow-moss/10
                        "
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        <section
          id="experience"
          data-section-fade
          className="scroll-mt-24 border-t border-line py-20 md:py-24"
        >
          <div className="grid gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-12">

            {/* Sticky left title */}
            <div className="md:sticky md:top-28 md:self-start">
              <SectionLabel>03 / Where I've been</SectionLabel>

              <h2 className="section-heading">
                Experience<span className="text-moss">.</span>
              </h2>

              <p className="mt-4 max-w-xs text-sm leading-7 text-muted">
                A journey of building, learning, and creating meaningful impact.
              </p>
            </div>

            {/* Experience content */}
            <div className="space-y-0">
              {experience.map((job, i) => (
                <RevealCard key={job.company} delay={i * 120}>
                  <article className="grid gap-4 border-t border-line py-8 sm:grid-cols-[.7fr_1.3fr] sm:gap-8">

                    {/* Company details */}
                    <div>
                      <p className="font-display text-2xl transition-colors duration-300 hover:text-moss">
                        {job.company}
                      </p>

                      <p className="mt-2 text-sm text-muted">
                        {job.role}
                      </p>

                      <p className="mt-2 text-xs text-moss">
                        {job.date}
                      </p>
                    </div>

                    {/* Achievements */}
                    <ul className="space-y-3">
                      {job.points.map((point, index) => (
                        <li
                          key={index}
                          className="flex gap-3 text-sm leading-7 text-muted"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />

                          <span>
                            <AnimatedPoint text={point} />
                          </span>
                        </li>
                      ))}
                    </ul>

                  </article>
                </RevealCard>
              ))}
            </div>

          </div>
        </section>


        
        <section
          id="education"
          data-section-fade
          className="scroll-mt-24 border-t border-line py-20 md:py-24"
        >
          <div className="mb-12">
            <SectionLabel>04 / Where I studied</SectionLabel>
            <h2 className="section-heading">
              Education<span className="text-moss">.</span>
            </h2>
          </div>

          <div className="relative space-y-0">
            {education.map((study, i) => (
              <RevealCard key={study.university} delay={i * 150}>
                <article className="group relative grid gap-6 border-t border-line py-9 transition-all duration-500 hover:border-moss/50 md:grid-cols-[.7fr_1.3fr] md:gap-12">

                  {/* Timeline accent */}
                  <div className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-moss transition-transform duration-700 group-hover:scale-y-100" />

                  {/* University details */}
                  <div className="pl-5">
                    <p className="font-display text-2xl transition-all duration-300 group-hover:translate-x-1 group-hover:text-moss">
                      {study.degree}
                    </p>

                    <p className="mt-2 text-sm text-muted">
                      {study.specialization}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-line bg-white/70 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-moss">
                        {study.date}
                      </span>

                      <span className="rounded-full border border-line bg-white/70 px-3 py-1.5 text-[10px] text-muted">
                        {study.location}
                      </span>
                    </div>
                  </div>

                  {/* Achievements */}
                  <ul className="space-y-3 pl-5 md:pl-0">
                    {study.points.map((point, index) => (
                      <li
                        key={point}
                        style={{ transitionDelay: `${index * 60}ms` }}
                        className="flex gap-3 text-sm leading-7 text-muted transition-all duration-300 group-hover:translate-x-1"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss transition-transform duration-300 group-hover:scale-125" />
                        {point}
                      </li>
                    ))}
                  </ul>

                </article>
              </RevealCard>
            ))}
          </div>
        </section>


        <section className="grid gap-8 rounded-[30px] bg-[#f8e1e4] px-7 py-12 md:grid-cols-[1fr_auto] md:items-end md:px-12 md:py-14">
          <div><SectionLabel>05 / Next chapter</SectionLabel><h2 className="max-w-2xl font-display text-4xl leading-tight md:text-5xl">Have a good idea?<br /><span className="italic text-moss">Let’s make it real.</span></h2><p className="mt-4 max-w-lg text-sm leading-7 text-muted">I’m always happy to connect about interesting products, engineering challenges and creative collaborations.</p></div>
          <a href="mailto:hello@chinmayi.dev" className="inline-flex w-fit items-center gap-3 rounded-full bg-ink px-6 py-4 text-sm font-semibold text-white transition hover:bg-moss">Say hello <ArrowUpRight size={16} /></a>
        </section>

        <footer className="flex flex-col justify-between gap-5 py-9 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Chinmayi Ramakrishna. Made with curiosity.</p>
          <div className="flex items-center gap-5">
            <a href="mailto:chinmayicr27@gmail.com" aria-label="Email" className="hover:text-ink"><Mail size={17} /></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-ink"><Linkedin size={17} /></a>
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-ink"><GitBranch size={17} /></a>
          </div>
        </footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);