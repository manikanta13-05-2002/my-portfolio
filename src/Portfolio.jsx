import { useState, useEffect, useRef } from "react";
import { Mail, Phone, Linkedin, ArrowRight, ExternalLink, ChevronDown, Code2, Brain, Database, Layers, Wrench, Users } from "lucide-react";

/* ─────────────────────────────────────────
   GLOBAL STYLES injected once into <head>
───────────────────────────────────────── */
const GlobalStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      :root {
        --ink: #0d0f14; --paper: #f4f1eb; --accent: #e8500a;
        --accent2: #1a3a5c; --muted: #7a7469; --light: #ede9e0;
        --border: rgba(13,15,20,0.12);
      }
      html { scroll-behavior: smooth; }
      body { font-family: 'DM Sans', sans-serif; background: var(--paper); color: var(--ink); overflow-x: hidden; margin: 0; }
      .syne { font-family: 'Syne', sans-serif; }

      /* Noise overlay */
      #root::before {
        content: '';
        position: fixed; inset: 0; pointer-events: none; z-index: 9999;
        opacity: 0.35;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
      }

      /* Scroll reveal */
      .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
      .reveal.visible { opacity: 1; transform: none; }
      .reveal-delay-1 { transition-delay: 0.1s; }
      .reveal-delay-2 { transition-delay: 0.2s; }
      .reveal-delay-3 { transition-delay: 0.3s; }
      .reveal-delay-4 { transition-delay: 0.4s; }

      /* Fade in up for hero */
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-up-1 { animation: fadeUp 0.7s 0.05s ease both; }
      .fade-up-2 { animation: fadeUp 0.7s 0.15s ease both; }
      .fade-up-3 { animation: fadeUp 0.7s 0.25s ease both; }
      .fade-up-4 { animation: fadeUp 0.7s 0.35s ease both; }
      .fade-up-5 { animation: fadeUp 0.7s 0.45s ease both; }

      /* Nav link hover */
      .nav-link { position: relative; }
      .nav-link::after {
        content: ''; position: absolute; left: 0; bottom: -3px;
        width: 0; height: 2px; background: var(--accent);
        transition: width 0.2s ease;
      }
      .nav-link:hover::after, .nav-link.active::after { width: 100%; }
      .nav-link.active { color: var(--accent) !important; }

      /* Hover cards */
      .card-hover { transition: transform 0.22s ease, box-shadow 0.22s ease; }
      .card-hover:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(13,15,20,0.13); }

      .highlight-hover { transition: border-color 0.2s, background 0.2s; }
      .highlight-hover:hover { border-color: var(--accent) !important; background: rgba(232,80,10,0.06) !important; }

      .cert-hover { transition: border-color 0.2s, transform 0.2s; }
      .cert-hover:hover { border-color: var(--accent) !important; transform: translateY(-3px); }

      .contact-link-hover { transition: background 0.2s, transform 0.2s; }
      .contact-link-hover:hover { background: rgba(255,255,255,0.28) !important; transform: translateY(-2px); }

      .btn-primary-hover { transition: background 0.2s, transform 0.2s; }
      .btn-primary-hover:hover { background: #c73f00 !important; transform: translateY(-2px); }
      .btn-outline-hover { transition: border-color 0.2s, color 0.2s, transform 0.2s; }
      .btn-outline-hover:hover { border-color: var(--accent) !important; color: var(--accent) !important; transform: translateY(-2px); }

      .timeline-item-hover { transition: border-color 0.2s; }
      .timeline-item-hover:hover { border-color: var(--accent) !important; }

      /* Scrollbar */
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: var(--paper); }
      ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 3px; }

      @media (max-width: 768px) {
        .hide-mobile { display: none !important; }
        .hero-grid { grid-template-columns: 1fr !important; }
        .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        .edu-grid { grid-template-columns: 1fr !important; }
        section { padding: 4rem 1.5rem !important; }
        .nav-pad { padding: 1.2rem 1.5rem !important; }
        .hero-pad { padding: 7rem 1.5rem 3rem !important; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(link); document.head.removeChild(style); };
  }, []);
  return null;
};

/* ─────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────── */
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
};

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const NAV_ITEMS = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

const SKILLS = [
  { icon: <Code2 size={28} />, title: "Programming Languages", tags: ["Python", "JavaScript", "Java", "SQL"] },
  { icon: <Brain size={28} />, title: "Machine Learning & Data Science", tags: ["Scikit-learn", "K-Means", "Decision Trees", "Random Forest", "SMOTE", "Association Rules", "Pandas", "NumPy", "Data Visualisation"] },
  { icon: <Layers size={28} />, title: "Frontend Development", tags: ["ReactJS", "Responsive Design", "Component Architecture", "State Management", "HTML / CSS"] },
  { icon: <Database size={28} />, title: "Backend & APIs", tags: ["Node.js", "Express.js", "Ruby on Rails", "REST APIs", "MongoDB", "PostgreSQL"] },
  { icon: <Code2 size={28} />, title: "CS Fundamentals", tags: ["Data Structures", "Algorithms", "OOP", "System Design", "Query Optimisation"] },
  { icon: <Wrench size={28} />, title: "Tools & Platforms", tags: ["Git / GitHub", "VS Code", "Jupyter Notebook", "Agile / Scrum"] },
];

const EXPERIENCE = [
  {
    period: "Jun 2023 – Jul 2024 · 1+year",
    company: "Accenture Solutions Pvt. Ltd.",
    role: "Web Application Developer",
    bullets: [
      "Completed structured enterprise training in MERN Stack (MongoDB, Express, React, Node.js)",
      "Designed and developed ReactJS-based, mobile-responsive UIs deployed in production systems",
      "Built reusable UI component libraries with consistent state management and API-driven workflows",
      "Integrated RESTful services enabling scalable frontend-backend communication",
      "Collaborated with backend engineers, QA teams, and product stakeholders in agile sprint cycles",
      "Improved application performance through systematic debugging, profiling, and code optimisation",
    ],
  },
  {
    period: "Aug 2022 – Present · 2 Years",
    company: "University of Memphis",
    role: "Technical Operations Coordinator — Athletics & Campus Systems",
    bullets: [
      "Managed data-driven operational workflows supporting thousands of student and event records across high-traffic campus programs",
      "Coordinated resource scheduling using digital systems, improving turnaround times for recurring operational cycles",
      "Acted as technical liaison between departments — translating operational requirements into system-level processes",
      "Applied analytical thinking to identify workflow bottlenecks and implement process improvements",
      "Maintained structured data records and documentation to support reporting and compliance requirements",
      "Trained and onboarded new student workers on digital tools and operational protocols",
    ],
  },
];

const PROJECTS = [
  {
    num: "01",
    badge: "Machine Learning · Data Mining",
    name: "Traffic Accident Severity Prediction — Addis Ababa",
    desc: "End-to-end data mining pipeline on 12,316 real crash records to predict injury severity and uncover accident patterns. Tackled severe class imbalance (fatal cases <2%) and high-cardinality categorical features.",
    highlights: [
      "K-Means clustering (K=10) to profile accident scenarios across light, weather & road conditions",
      "Decision Tree + Random Forest with SMOTE to handle imbalanced severity classes",
      "Association rule mining linking road context patterns to crash severity",
      "Full OneHotEncoding pipeline: 15 categorical features → 113-dimensional feature matrix",
    ],
    tech: ["Python", "Scikit-learn", "SMOTE", "K-Means", "Pandas", "Data Mining"],
  },
  {
    num: "02",
    badge: "Database Systems · ML",
    name: "Adaptive PSALM — ML-Enhanced Cardinality Estimation",
    desc: "Enhanced the PSALM database framework with ML to solve cardinality estimation under fine-grained access control (FGAC). Achieved 70% reduction in Mean Relative Error over the static baseline.",
    highlights: [
      "Variance-aware adaptive sampling — dynamically adjusts rates per user partition",
      "ML-based user clustering (K-Means) enabling efficient sample reuse across similar users",
      "Hybrid cardinality estimator stabilising predictions on small partitions",
      "MRE reduced from 0.3755 (baseline PSALM) → 0.112 (Adaptive PSALM)",
    ],
    tech: ["Python", "K-Means", "SQL", "Query Optimisation", "Database Systems"],
  },
  {
    num: "03",
    badge: "Full-Stack · E-Commerce · UofM",
    name: "SkyDrive — Flying Cars Marketplace",
    desc: "A Carvana-inspired online marketplace for buying and selling flying cars, built as a 4-person agile team project at UofM. Led backend engineering as top contributor (30%), owning core platform features end-to-end.",
    highlights: [
      "Full vehicle listing system — browse, filter, sort, and detail views for flying car inventory",
      "Order management, wishlist functionality, and user registration with authentication",
      "Admin panel with route handlers for vehicle moderation and user management",
      "Resolved critical runtime errors and refactored MVC controllers across 20+ pull requests",
    ],
    tech: ["Ruby on Rails", "PostgreSQL", "HTML / ERB", "CSS", "GitHub", "Agile / Scrum"],
  },
  {
    num: "04",
    badge: "Frontend · Production · Accenture",
    name: "Enterprise React UI — Accenture Production System",
    desc: "Shipped mobile-responsive ReactJS interfaces integrated into Accenture's enterprise production environment. Built reusable component systems and API-driven workflows serving real end users at scale.",
    highlights: [
      "Component library of reusable React UI elements with consistent state management",
      "RESTful API integration enabling dynamic real-time content across frontend-backend boundary",
      "Performance optimisation via profiling and code-splitting, reducing load times measurably",
      "Cross-browser and cross-device consistency verified through QA collaboration",
    ],
    tech: ["ReactJS", "Node.js", "REST APIs", "MongoDB", "Express.js"],
  },
];

/* ─────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────── */

/** NAVBAR */
const Navbar = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1.4rem 4rem",
      background: scrolled ? "rgba(244,241,235,0.92)" : "rgba(244,241,235,0.7)",
      backdropFilter: "blur(14px)",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all 0.3s ease",
    }} className="nav-pad">
      <a href="#hero" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em", color: "var(--ink)", textDecoration: "none" }}>
        MK<span style={{ color: "var(--accent)" }}>.</span>
      </a>
      <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none" }} className="hide-mobile">
        {NAV_ITEMS.map(item => (
          <li key={item}>
            <button
              onClick={() => scrollTo(item)}
              className={`nav-link ${activeSection === item.toLowerCase() ? "active" : ""}`}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: ".85rem", fontWeight: 500, letterSpacing: ".08em",
                textTransform: "uppercase",
                color: activeSection === item.toLowerCase() ? "var(--accent)" : "var(--muted)",
                fontFamily: "'DM Sans', sans-serif", padding: 0,
              }}
            >{item}</button>
          </li>
        ))}
      </ul>
      <a href="mailto:jonnalagaddamani13@gmail.com" style={{
        background: "var(--accent)", color: "#fff",
        padding: ".55rem 1.4rem", borderRadius: "4px",
        fontSize: ".82rem", fontWeight: 600, textDecoration: "none",
        fontFamily: "'DM Sans', sans-serif",
        transition: "background 0.2s",
      }} className="hide-mobile btn-primary-hover">Hire Me</a>
    </nav>
  );
};

/** HERO */
const Hero = () => (
  <section id="hero" style={{
    minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr",
    alignItems: "center", padding: "8rem 4rem 4rem", gap: "4rem",
    position: "relative", overflow: "hidden",
  }} className="hero-grid hero-pad">
    {/* BG number */}
    <div style={{
      position: "absolute", right: "-3rem", top: "50%", transform: "translateY(-50%)",
      fontFamily: "Syne, sans-serif", fontWeight: 800,
      fontSize: "clamp(12rem, 20vw, 20rem)", color: "rgba(13,15,20,0.04)",
      lineHeight: 1, userSelect: "none", pointerEvents: "none",
    }} className="hide-mobile">MK</div>

    {/* Left */}
    <div>
      <div className="fade-up-1" style={{
        display: "inline-block", background: "var(--accent)", color: "#fff",
        fontSize: ".72rem", fontWeight: 600, letterSpacing: ".14em",
        textTransform: "uppercase", padding: ".35rem .9rem", borderRadius: "2px", marginBottom: "1.4rem",
      }}>Open to Opportunities · Graduating Jun 2026</div>

      <h1 className="syne fade-up-2" style={{ fontWeight: 800, fontSize: "clamp(2.8rem, 5.5vw, 5rem)", lineHeight: 1.04, letterSpacing: "-.03em" }}>
        Mani Kanta<br /><span style={{ color: "var(--accent)" }}>Jonnalagadda</span>
      </h1>

      <p className="fade-up-3" style={{ marginTop: "1.4rem", fontSize: "1.05rem", fontWeight: 300, color: "var(--muted)", lineHeight: 1.65, maxWidth: "46ch" }}>
        Graduate Software Engineer at the University of Memphis. Full-stack developer &amp; machine learning engineer — building scalable, data-driven software that solves real problems.
      </p>

      <div className="fade-up-4" style={{ display: "flex", gap: "1rem", marginTop: "2.4rem", flexWrap: "wrap" }}>
        <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="btn-primary-hover"
          style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".85rem 2rem", borderRadius: "4px", fontSize: ".9rem", fontWeight: 600, background: "var(--accent)", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
          Get In Touch <ArrowRight size={16} />
        </button>
        <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          className="btn-outline-hover"
          style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".85rem 2rem", borderRadius: "4px", fontSize: ".9rem", fontWeight: 600, background: "transparent", color: "var(--ink)", border: "1.5px solid var(--border)", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
          View My Work
        </button>
      </div>

      <div className="fade-up-5" style={{ display: "flex", gap: "1.2rem", marginTop: "2rem" }}>
        {[
          { href: "mailto:jonnalagaddamani13@gmail.com", icon: <Mail size={18} /> },
          { href: "tel:+19013194723", icon: <Phone size={18} /> },
          { href: "https://linkedin.com/in/manikantajonnalagaddamani13", icon: <Linkedin size={18} /> },
        ].map(({ href, icon }, i) => (
          <a key={i} href={href} target="_blank" rel="noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "40px", height: "40px", borderRadius: "8px",
            border: "1.5px solid var(--border)", color: "var(--muted)",
            transition: "all 0.2s", textDecoration: "none",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}>
            {icon}
          </a>
        ))}
      </div>
    </div>

    {/* Right card */}
    <div className="fade-up-3" style={{ position: "relative" }}>
      <div style={{ background: "var(--ink)", color: "var(--paper)", borderRadius: "16px", padding: "2.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 260, height: 260, background: "var(--accent)", borderRadius: "50%", top: -80, right: -80, opacity: .12 }} />
        <div style={{ fontSize: ".72rem", letterSpacing: ".14em", textTransform: "uppercase", opacity: .5, marginBottom: ".6rem" }}>At a glance</div>
        <div className="syne" style={{ fontWeight: 700, fontSize: "1.35rem", marginBottom: "1.8rem" }}>Software Engineer · Memphis, TN</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
          {[
            { num: "3+", desc: "Years of experience" },
            { num: "3.5", desc: "GPA · MS Comp Sci" },
            { num: "MERN", desc: "Full-stack certified" },
            { num: "ML", desc: "Data science projects" },
          ].map(({ num, desc }) => (
            <div key={num} style={{ background: "rgba(255,255,255,.06)", borderRadius: "10px", padding: "1.2rem" }}>
              <div className="syne" style={{ fontWeight: 800, fontSize: "2rem", color: "var(--accent)" }}>{num}</div>
              <div style={{ fontSize: ".78rem", opacity: .6, marginTop: ".2rem" }}>{desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center", gap: ".5rem", fontSize: ".82rem", opacity: .5 }}>
          📍 University of Memphis · Memphis, TN
        </div>
      </div>
      {/* Scroll cue */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
        <ChevronDown size={22} color="var(--muted)" style={{ animation: "fadeUp 1.5s infinite alternate ease-in-out" }} />
      </div>
    </div>
  </section>
);

/** ABOUT */
const About = () => {
  useReveal();
  return (
    <section id="about" style={{ background: "var(--ink)", color: "var(--paper)", padding: "7rem 4rem" }}>
      <div className="reveal section-header" style={{ marginBottom: "3.5rem" }}>
        <div style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: ".7rem", marginBottom: ".8rem" }}>
          About Me <span style={{ flex: 1, maxWidth: 60, height: 1, background: "var(--accent)", display: "inline-block" }} />
        </div>
        <h2 className="syne" style={{ fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 2.8rem)", letterSpacing: "-.03em" }}>
          Turning ideas into<br />elegant software
        </h2>
      </div>

      <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "start" }}>
        <div className="reveal" style={{ fontSize: "1.05rem", lineHeight: 1.75, fontWeight: 300, opacity: .85 }}>
          <p>I'm a Graduate Software Engineer pursuing my MS in Computer Science at the University of Memphis (graduating June 2026). My work sits at the intersection of full-stack engineering and machine learning — building systems that are fast, reliable, and driven by data.</p>
          <p style={{ marginTop: "1.2rem" }}>At Accenture, I built ReactJS-based production UIs, integrated RESTful services, and shipped features within agile sprint cycles. At UofM, I've spent 3+ years applying technical skills in data-driven operations and stakeholder management.</p>
          <p style={{ marginTop: "1.2rem" }}>My academic projects span traffic accident severity prediction with ML pipelines, adaptive ML-enhanced database cardinality estimation, and a full-stack flying cars e-commerce marketplace — all shipped end-to-end.</p>
        </div>

        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {[
            { icon: "🤖", label: "Machine Learning & Data Science", desc: "Classification, clustering, SMOTE, association rules, Python pipelines" },
            { icon: "⚙️", label: "Full-Stack Engineering", desc: "MERN stack, Ruby on Rails, REST APIs, scalable architecture" },
            { icon: "🗄️", label: "Advanced Database Systems", desc: "Query optimisation, cardinality estimation, access control, SQL" },
            { icon: "🤝", label: "Agile Team Collaboration", desc: "Cross-functional delivery, QA, product stakeholders, version control" },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="highlight-hover" style={{ border: "1px solid rgba(255,255,255,.1)", borderRadius: "10px", padding: "1.4rem 1.6rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
              <span style={{ fontSize: "1.6rem", lineHeight: 1, flexShrink: 0 }}>{icon}</span>
              <div>
                <div className="syne" style={{ fontWeight: 700, fontSize: ".95rem" }}>{label}</div>
                <div style={{ fontSize: ".82rem", opacity: .55, marginTop: ".2rem" }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** SKILLS */
const Skills = () => {
  useReveal();
  return (
    <section id="skills" style={{ background: "var(--light)", padding: "7rem 4rem" }}>
      <div className="reveal" style={{ marginBottom: "3.5rem" }}>
        <div style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: ".7rem", marginBottom: ".8rem" }}>
          Technical Skills <span style={{ flex: 1, maxWidth: 60, height: 1, background: "var(--accent)", display: "inline-block" }} />
        </div>
        <h2 className="syne" style={{ fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 2.8rem)", letterSpacing: "-.03em" }}>Tools of the trade</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        {SKILLS.map(({ icon, title, tags }, i) => (
          <div key={title} className={`reveal reveal-delay-${Math.min(i + 1, 4)} card-hover`} style={{ background: "var(--paper)", borderRadius: "12px", padding: "2rem", border: "1px solid var(--border)" }}>
            <div style={{ color: "var(--accent)", marginBottom: "1rem" }}>{icon}</div>
            <div className="syne" style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "1rem", color: "var(--accent2)" }}>{title}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
              {tags.map(tag => (
                <span key={tag} style={{ fontSize: ".76rem", fontWeight: 500, background: "var(--light)", color: "var(--ink)", padding: ".3rem .75rem", borderRadius: "20px", border: "1px solid var(--border)" }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/** EXPERIENCE */
const Experience = () => {
  useReveal();
  return (
    <section id="experience" style={{ background: "var(--paper)", padding: "7rem 4rem" }}>
      <div className="reveal" style={{ marginBottom: "3.5rem" }}>
        <div style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: ".7rem", marginBottom: ".8rem" }}>
          Experience <span style={{ flex: 1, maxWidth: 60, height: 1, background: "var(--accent)", display: "inline-block" }} />
        </div>
        <h2 className="syne" style={{ fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 2.8rem)", letterSpacing: "-.03em" }}>Where I've worked</h2>
      </div>

      <div style={{ position: "relative", paddingLeft: "2.5rem" }}>
        <div style={{ position: "absolute", left: ".5rem", top: ".5rem", bottom: ".5rem", width: 2, background: "linear-gradient(to bottom, var(--accent), transparent)" }} />
        {EXPERIENCE.map(({ period, company, role, bullets }, idx) => (
          <div key={role} className={`reveal reveal-delay-${idx + 1}`} style={{ position: "relative", paddingBottom: "3rem" }}>
            <div style={{ position: "absolute", left: "-2.15rem", top: ".35rem", width: 14, height: 14, borderRadius: "50%", background: "var(--accent)", border: "3px solid var(--paper)", boxShadow: "0 0 0 2px var(--accent)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: ".6rem" }}>
              <span style={{ fontSize: ".76rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent)", background: "rgba(232,80,10,.1)", padding: ".25rem .7rem", borderRadius: "3px" }}>{period}</span>
              <span style={{ fontSize: ".82rem", color: "var(--muted)", fontWeight: 500 }}>{company}</span>
            </div>
            <div className="syne" style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: ".8rem" }}>{role}</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".5rem" }}>
              {bullets.map((b, i) => (
                <li key={i} style={{ fontSize: ".9rem", lineHeight: 1.6, color: "var(--muted)", paddingLeft: "1.2rem", position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "var(--accent)" }}>→</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

/** PROJECTS */
const Projects = () => {
  useReveal();
  const [expanded, setExpanded] = useState(null);
  return (
    <section id="projects" style={{ background: "var(--light)", padding: "7rem 4rem" }}>
      <div className="reveal" style={{ marginBottom: "3.5rem" }}>
        <div style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: ".7rem", marginBottom: ".8rem" }}>
          Academic & Professional Projects <span style={{ flex: 1, maxWidth: 60, height: 1, background: "var(--accent)", display: "inline-block" }} />
        </div>
        <h2 className="syne" style={{ fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 2.8rem)", letterSpacing: "-.03em" }}>Things I've built</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.8rem" }}>
        {PROJECTS.map((p, idx) => (
          <div key={p.num} className={`reveal reveal-delay-${Math.min(idx + 1, 4)} card-hover`}
            style={{ background: "var(--paper)", borderRadius: "14px", border: "1px solid var(--border)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {/* Top */}
            <div style={{ background: "var(--ink)", padding: "2.5rem 2rem 2rem", position: "relative", overflow: "hidden", minHeight: 150, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div style={{ position: "absolute", right: "1rem", top: "-.5rem", fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "6rem", color: "rgba(255,255,255,.05)", lineHeight: 1 }}>{p.num}</div>
              <span style={{ display: "inline-block", fontSize: ".68rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", background: "var(--accent)", color: "#fff", padding: ".25rem .7rem", borderRadius: "3px", marginBottom: ".7rem", width: "fit-content" }}>{p.badge}</span>
              <div className="syne" style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--paper)", lineHeight: 1.3 }}>{p.name}</div>
            </div>
            {/* Body */}
            <div style={{ padding: "1.5rem 2rem 2rem", flex: 1, display: "flex", flexDirection: "column" }}>
              <p style={{ fontSize: ".88rem", lineHeight: 1.65, color: "var(--muted)", flex: 1 }}>{p.desc}</p>

              {/* Expandable highlights */}
              <button onClick={() => setExpanded(expanded === idx ? null : idx)}
                style={{ marginTop: "1rem", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: ".4rem", fontSize: ".78rem", fontWeight: 600, color: "var(--accent)", fontFamily: "'DM Sans', sans-serif", padding: 0 }}>
                {expanded === idx ? "Hide details ↑" : "Key highlights ↓"}
              </button>

              {expanded === idx && (
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".35rem", marginTop: ".7rem" }}>
                  {p.highlights.map((h, i) => (
                    <li key={i} style={{ fontSize: ".8rem", color: "var(--muted)", paddingLeft: "1rem", position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: "var(--accent)", fontWeight: 700 }}>·</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginTop: "1.2rem" }}>
                {p.tech.map(t => (
                  <span key={t} style={{ fontSize: ".73rem", fontWeight: 600, color: "var(--accent2)", background: "rgba(26,58,92,.08)", padding: ".25rem .7rem", borderRadius: "3px" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/** EDUCATION */
const Education = () => {
  useReveal();
  return (
    <section id="education" style={{ background: "var(--ink)", color: "var(--paper)", padding: "7rem 4rem" }}>
      <div className="reveal" style={{ marginBottom: "3.5rem" }}>
        <div style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--accent)", display: "flex", alignItems: "center", gap: ".7rem", marginBottom: ".8rem" }}>
          Education <span style={{ flex: 1, maxWidth: 60, height: 1, background: "var(--accent)", display: "inline-block" }} />
        </div>
        <h2 className="syne" style={{ fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 2.8rem)", letterSpacing: "-.03em" }}>Academic background</h2>
      </div>

      <div className="edu-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* MS */}
        <div className="reveal card-hover" style={{ border: "1px solid rgba(255,255,255,.1)", borderRadius: "14px", padding: "2rem", position: "relative", overflow: "hidden", transition: "border-color .2s" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"}>
          <div style={{ position: "absolute", width: 160, height: 160, borderRadius: "50%", background: "var(--accent)", bottom: -60, right: -60, opacity: .06 }} />
          <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1rem" }}>🎓 Current · Expected Jun 2026</div>
          <div className="syne" style={{ fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.35, marginBottom: ".5rem" }}>Master of Science in Computer Science</div>
          <div style={{ fontSize: ".88rem", opacity: .6, marginBottom: "1rem" }}>University of Memphis — Memphis, TN</div>
          <div className="syne" style={{ fontWeight: 800, fontSize: "1.8rem", color: "var(--accent)" }}>3.5<span style={{ fontSize: "1rem", opacity: .5 }}>/4.0</span></div>
          <div style={{ fontSize: ".72rem", opacity: .5, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "1.2rem" }}>GPA</div>
          <div style={{ fontSize: ".72rem", opacity: .45, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: ".5rem" }}>Relevant Coursework</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
            {["Data Structures & Algorithms", "Software Engineering", "Web Development", "Advanced Database Systems", "Data Mining", "Machine Learning"].map(c => (
              <span key={c} style={{ fontSize: ".72rem", background: "rgba(255,255,255,.07)", padding: ".25rem .65rem", borderRadius: "3px" }}>{c}</span>
            ))}
          </div>
        </div>
        {/* BTech */}
        <div className="reveal reveal-delay-1 card-hover" style={{ border: "1px solid rgba(255,255,255,.1)", borderRadius: "14px", padding: "2rem", position: "relative", overflow: "hidden", transition: "border-color .2s" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"}>
          <div style={{ position: "absolute", width: 160, height: 160, borderRadius: "50%", background: "var(--accent)", bottom: -60, right: -60, opacity: .06 }} />
          <div style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1rem" }}>🏛️ Undergraduate · India</div>
          <div className="syne" style={{ fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.35, marginBottom: ".5rem" }}>Bachelor of Technology in Information Technology</div>
          <div style={{ fontSize: ".88rem", opacity: .6, marginBottom: "1rem" }}>R.V.R & J.C College of Engineering, India</div>
          <div className="syne" style={{ fontWeight: 800, fontSize: "1.8rem", color: "var(--accent)" }}>8.35<span style={{ fontSize: "1rem", opacity: .5 }}>/10</span></div>
          <div style={{ fontSize: ".72rem", opacity: .5, letterSpacing: ".08em", textTransform: "uppercase" }}>GPA</div>
        </div>
      </div>

      {/* Certifications inline */}
      <div className="reveal" style={{ marginTop: "3rem" }}>
        <div style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.2rem" }}>Certifications</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem" }}>
          {[
            { icon: "🏆", name: "Tech Expressway — MERN Stack", org: "Accenture" },
            { icon: "📊", name: "Data Analytics with Python", org: "NPTEL" },
          ].map(({ icon, name, org }) => (
            <div key={name} className="cert-hover" style={{ display: "flex", alignItems: "center", gap: "1.2rem", border: "1px solid rgba(255,255,255,.12)", borderRadius: "10px", padding: "1.2rem 1.6rem", minWidth: 260 }}>
              <span style={{ fontSize: "2rem" }}>{icon}</span>
              <div>
                <div className="syne" style={{ fontWeight: 700, fontSize: ".95rem" }}>{name}</div>
                <div style={{ fontSize: ".78rem", opacity: .55, marginTop: ".2rem" }}>{org}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** CONTACT */
const Contact = () => {
  useReveal();
  return (
    <section id="contact" style={{ background: "var(--accent)", color: "#fff", padding: "7rem 4rem", textAlign: "center" }}>
      <div className="reveal" style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(255,255,255,.7)", marginBottom: ".8rem", display: "flex", justifyContent: "center", alignItems: "center", gap: ".7rem" }}>
        Let's Connect
      </div>
      <h2 className="syne reveal reveal-delay-1" style={{ fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 2.8rem)", letterSpacing: "-.03em", color: "#fff" }}>Open to new opportunities</h2>
      <p className="reveal reveal-delay-2" style={{ fontSize: "1.05rem", opacity: .85, margin: "1.2rem auto 2.5rem", maxWidth: "50ch" }}>
        Actively seeking Software Engineer, Full-Stack, or ML-adjacent roles. Let's build something meaningful together.
      </p>
      <div className="reveal reveal-delay-3" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1.2rem" }}>
        {[
          { href: "mailto:jonnalagaddamani13@gmail.com", icon: <Mail size={18} />, label: "jonnalagaddamani13@gmail.com" },
          { href: "tel:+19013194723", icon: <Phone size={18} />, label: "(901) 319-4723" },
          { href: "https://linkedin.com/in/manikantajonnalagaddamani13", icon: <Linkedin size={18} />, label: "LinkedIn Profile" },
        ].map(({ href, icon, label }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" className="contact-link-hover"
            style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", background: "rgba(255,255,255,.18)", color: "#fff", padding: ".9rem 1.8rem", borderRadius: "6px", textDecoration: "none", fontWeight: 600, fontSize: ".9rem", backdropFilter: "blur(4px)" }}>
            {icon} {label}
          </a>
        ))}
      </div>
    </section>
  );
};

/** FOOTER */
const Footer = () => (
  <footer style={{ background: "var(--ink)", color: "rgba(255,255,255,.3)", textAlign: "center", padding: "2rem", fontSize: ".8rem", letterSpacing: ".04em" }}>
    © 2026 Mani Kanta Jonnalagadda · MS Computer Science, University of Memphis · Built with React
  </footer>
);

/* ─────────────────────────────────────────
   ROOT APP
───────────────────────────────────────── */
export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  // Scroll-spy
  useEffect(() => {
    const sections = ["hero", "about", "skills", "experience", "projects", "education", "contact"];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveSection(id);
      }, { threshold: 0.4 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <>
      <GlobalStyles />
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
