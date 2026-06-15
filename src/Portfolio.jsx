import { useState, useEffect } from "react";
import { Mail, Phone, Linkedin, ArrowRight, ChevronDown, Database, BarChart3, Cloud, Wrench, Github, LineChart } from "lucide-react";

const GlobalStyles = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      :root { --ink:#0d0f14; --paper:#f4f1eb; --accent:#e8500a; --accent2:#1a3a5c; --muted:#7a7469; --light:#ede9e0; --border:rgba(13,15,20,0.12); }
      html { scroll-behavior: smooth; }
      body { font-family:'DM Sans',sans-serif; background:var(--paper); color:var(--ink); overflow-x:hidden; margin:0; }
      .syne { font-family:'Syne',sans-serif; }
      #root::before { content:''; position:fixed; inset:0; pointer-events:none; z-index:9999; opacity:.35;
        background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E"); }
      .reveal { opacity:0; transform:translateY(32px); transition:opacity .7s ease,transform .7s ease; }
      .reveal.visible { opacity:1; transform:none; }
      .reveal-delay-1{transition-delay:.1s} .reveal-delay-2{transition-delay:.2s}
      .reveal-delay-3{transition-delay:.3s} .reveal-delay-4{transition-delay:.4s}
      @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
      .fade-up-1{animation:fadeUp .7s .05s ease both} .fade-up-2{animation:fadeUp .7s .15s ease both}
      .fade-up-3{animation:fadeUp .7s .25s ease both} .fade-up-4{animation:fadeUp .7s .35s ease both}
      .fade-up-5{animation:fadeUp .7s .45s ease both}
      .nav-link{position:relative}
      .nav-link::after{content:'';position:absolute;left:0;bottom:-3px;width:0;height:2px;background:var(--accent);transition:width .2s ease}
      .nav-link:hover::after,.nav-link.active::after{width:100%}
      .nav-link.active{color:var(--accent)!important}
      .card-hover{transition:transform .22s ease,box-shadow .22s ease}
      .card-hover:hover{transform:translateY(-5px);box-shadow:0 20px 50px rgba(13,15,20,.13)}
      .highlight-hover{transition:border-color .2s,background .2s}
      .highlight-hover:hover{border-color:var(--accent)!important;background:rgba(232,80,10,.06)!important}
      .btn-primary-hover{transition:background .2s,transform .2s}
      .btn-primary-hover:hover{background:#c73f00!important;transform:translateY(-2px)}
      .btn-outline-hover{transition:border-color .2s,color .2s,transform .2s}
      .btn-outline-hover:hover{border-color:var(--accent)!important;color:var(--accent)!important;transform:translateY(-2px)}
      ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:var(--paper)} ::-webkit-scrollbar-thumb{background:var(--accent);border-radius:3px}
      @media(max-width:768px){
        .hide-mobile{display:none!important}
        .hero-grid{grid-template-columns:1fr!important;padding:6rem 1.2rem 3rem!important;overflow-x:hidden!important}
        .about-grid{grid-template-columns:1fr!important;gap:2rem!important}
        .edu-grid{grid-template-columns:1fr!important}
        section{padding:4rem 1.2rem!important}
        .nav-pad{padding:1.2rem 1.5rem!important}
        h1{font-size:2.2rem!important;word-break:break-word!important}
        .stat-row{grid-template-columns:1fr 1fr!important;gap:.8rem!important}
        .stat{padding:.8rem!important} .stat-num{font-size:1.4rem!important}
        #hero{overflow:hidden!important}
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(link); document.head.removeChild(style); };
  }, []);
  return null;
};

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

// ── DATA ──
const NAV_ITEMS = ["About", "Skills", "Experience", "Projects", "Achievements", "Education", "Contact"];

const SKILLS = [
  { icon: <Database size={28}/>, title: "Languages & Query", tags: ["SQL (PostgreSQL, MySQL)","Query Optimization","Python (Pandas, NumPy, Scikit-learn)","Matplotlib","Seaborn","R","Bash Scripting"] },
  { icon: <BarChart3 size={28}/>, title: "BI & Visualization", tags: ["Power BI","Looker Studio","Tableau","Excel (Pivot Tables, Charts)","KPI Dashboards","Data Storytelling"] },
  { icon: <LineChart size={28}/>, title: "Analytics", tags: ["EDA","A/B Testing","Statistical Analysis","Cohort Analysis","Regression","Predictive Modeling","ETL","Root Cause Analysis"] },
  { icon: <Cloud size={28}/>, title: "Cloud & Databases", tags: ["Snowflake","BigQuery","Amazon Redshift","PostgreSQL","MySQL","MongoDB","AWS (Training)","Git / GitHub","Agile / Scrum"] },
  { icon: <Wrench size={28}/>, title: "Spreadsheets & Automation", tags: ["Excel (VLOOKUP/XLOOKUP)","PivotTables","Power Query","Macros","Google Sheets","Automated Reporting"] },
];

const EXPERIENCE = [
  { period:"Nov 2025 – May 2026", company:"First South Financial Bank", role:"Data Analyst Intern",
    bullets:[
      "Designed and maintained Power BI dashboards tracking member account growth, loan portfolio performance, deposit trends, and branch-level KPIs for senior leadership",
      "Wrote and optimized complex SQL queries against PostgreSQL and Redshift to extract, clean, and model member transaction data for monthly regulatory and executive reporting",
      "Automated weekly and monthly reporting workflows using Python (Pandas) and Excel (Power Query, Macros), reducing manual analyst effort by an estimated 35% per cycle",
      "Conducted cohort and retention analysis on member lifecycle data, identifying loan origination funnel drop-offs and contributing to a 10% improvement in member retention",
      "Partnered with compliance and risk teams to validate data quality and maintain audit-ready reporting in a federally regulated banking environment",
    ]},
  { period:"Jan 2022 – Jul 2024", company:"Accenture Solutions Pvt. Ltd. — Philippines Banking Client", role:"Data Integration Analyst",
    bullets:[
      "Built real-time financial KPI dashboards for an enterprise banking system serving millions of customers; integrated 10+ RESTful APIs powering high-volume transaction data pipelines",
      "Optimized SQL data-layer queries improving response times by 25%; validated data integrity across integrations in Agile sprints with bi-weekly stakeholder reporting",
      "Translated complex financial data findings into plain-language summaries for non-technical business stakeholders across bi-weekly cross-functional reporting cycles",
    ]},
];

const PROJECTS = [
  { num:"01", badge:"Machine Learning · Data Mining", name:"Traffic Accident Severity Prediction — Addis Ababa",
    github:"https://github.com/manikanta13-05-2002",
    desc:"End-to-end data mining pipeline on 12,316 real crash records to predict injury severity and uncover accident patterns. Tackled severe class imbalance (fatal <2%) and high-cardinality categorical features.",
    highlights:["K-Means clustering (K=10) to profile accident scenarios across light, weather & road conditions","Decision Tree + Random Forest with SMOTE to handle imbalanced severity classes","Association rule mining linking road context patterns to crash severity","Full OneHotEncoding pipeline: 15 features → 113-dimensional feature matrix"],
    tech:["Python","Scikit-learn","SMOTE","K-Means","Pandas","Jupyter Notebook"] },
  { num:"02", badge:"Database Systems · ML", name:"Adaptive PSALM — ML-Enhanced Cardinality Estimation",
    github:"https://github.com/manikanta13-05-2002",
    desc:"Enhanced the PSALM database framework with ML to solve cardinality estimation under fine-grained access control. Achieved 70% reduction in Mean Relative Error over the static baseline.",
    highlights:["Variance-aware adaptive sampling — dynamically adjusts rates per user partition","ML-based user clustering (K-Means) enabling efficient sample reuse across similar users","Hybrid cardinality estimator stabilising predictions on small partitions","MRE reduced from 0.3755 (baseline) → 0.112 (Adaptive PSALM)"],
    tech:["Python","K-Means","SQL","Query Optimisation","Jupyter Notebook"] },
  { num:"03", badge:"Full-Stack · E-Commerce · UofM", name:"SkyDrive — Flying Cars Marketplace",
    github:"https://github.com/comp-7012-s25/team-aquamarine",
    desc:"Carvana-inspired marketplace for buying and selling flying cars. Led backend engineering as top contributor (30%) on a 4-person agile team at UofM across 20+ pull requests.",
    highlights:["Full vehicle listing — browse, filter, sort, and detail views for flying car inventory","Order management, wishlist, and user registration with authentication","Admin panel with route handlers for vehicle moderation and user management","Refactored MVC controllers and resolved critical runtime errors across sprints"],
    tech:["Ruby on Rails","PostgreSQL","HTML / ERB","CSS","GitHub","Agile"] },
];

const ACHIEVEMENTS = [
  { icon:"☁️", title:"AWS Cloud Practitioner", org:"Amazon Web Services", status:"In Training", statusColor:"#ca8a04", statusBg:"#fef9c3",
    desc:"Currently completing AWS Cloud Practitioner certification training — covering cloud concepts, AWS core services, security, architecture, pricing, and support." },
  { icon:"🤖", title:"Prompt Engineering Training", org:"Handshake AI", status:"Completed ✓", statusColor:"#16a34a", statusBg:"#dcfce7",
    desc:"Completed AI prompt engineering training covering effective prompting strategies, AI application design, and practical use of large language models for productivity." },
  { icon:"📊", title:"Intro to Splunk", org:"Splunk Inc.", status:"Completed ✓", statusColor:"#16a34a", statusBg:"#dcfce7",
    desc:"Foundational training in Splunk for log analysis, search processing language (SPL), and operational data monitoring." },
  { icon:"🏆", title:"National Society of Leadership & Success", org:"NSLS — University of Memphis Chapter", status:"Member", statusColor:"#1a3a5c", statusBg:"#e8f0fe",
    desc:"Selected member of NSLS, one of the largest leadership honour societies in the US, recognising leadership development and community impact." },
  { icon:"🏅", title:"MERN Stack Enterprise Development", org:"Tech Expressway, Accenture", status:"Completed ✓", statusColor:"#16a34a", statusBg:"#dcfce7",
    desc:"Enterprise-level MERN stack certification covering MongoDB, Express.js, ReactJS, and Node.js in production engineering contexts." },
  { icon:"📈", title:"Data Analytics with Python", org:"NPTEL", status:"Completed ✓", statusColor:"#16a34a", statusBg:"#dcfce7",
    desc:"National certification in data analytics covering Python, statistical analysis, data visualisation, and applied analytics techniques." },
];

// ── SECTION HEADER HELPER ──
const SectionHeader = ({ eyebrow, title, dark=false }) => (
  <div style={{ marginBottom:"3.5rem" }}>
    <div style={{ fontSize:".72rem", fontWeight:600, letterSpacing:".16em", textTransform:"uppercase", color:"var(--accent)", display:"flex", alignItems:"center", gap:".7rem", marginBottom:".8rem" }}>
      {eyebrow} <span style={{ flex:1, maxWidth:60, height:1, background:"var(--accent)", display:"inline-block" }}/>
    </div>
    <h2 className="syne" style={{ fontWeight:800, fontSize:"clamp(2rem,3.5vw,2.8rem)", letterSpacing:"-.03em", color: dark ? "var(--paper)" : "var(--ink)" }}
      dangerouslySetInnerHTML={{ __html: title }} />
  </div>
);

// ── NAVBAR ──
const Navbar = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:"smooth" });
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.4rem 4rem", background: scrolled ? "rgba(244,241,235,0.92)" : "rgba(244,241,235,0.7)", backdropFilter:"blur(14px)", borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent", transition:"all .3s ease" }} className="nav-pad">
      <a href="#hero" style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"1.1rem", letterSpacing:"-.02em", color:"var(--ink)", textDecoration:"none" }}>MK<span style={{ color:"var(--accent)" }}>.</span></a>
      <ul style={{ display:"flex", gap:"2rem", listStyle:"none" }} className="hide-mobile">
        {NAV_ITEMS.map(item => (
          <li key={item}>
            <button onClick={() => scrollTo(item)} className={`nav-link ${activeSection===item.toLowerCase()?"active":""}`}
              style={{ background:"none", border:"none", cursor:"pointer", fontSize:".82rem", fontWeight:500, letterSpacing:".08em", textTransform:"uppercase", color: activeSection===item.toLowerCase() ? "var(--accent)" : "var(--muted)", fontFamily:"'DM Sans',sans-serif", padding:0 }}>
              {item}
            </button>
          </li>
        ))}
      </ul>
      <a href="mailto:jonnalagaddamani13@gmail.com" className="btn-primary-hover hide-mobile"
        style={{ background:"var(--accent)", color:"#fff", padding:".55rem 1.4rem", borderRadius:"4px", fontSize:".82rem", fontWeight:600, textDecoration:"none" }}>Hire Me</a>
    </nav>
  );
};

// ── HERO ──
const Hero = () => (
  <section id="hero" style={{ minHeight:"100vh", display:"grid", gridTemplateColumns:"1fr 1fr", alignItems:"center", padding:"8rem 4rem 4rem", gap:"4rem", position:"relative", overflow:"hidden" }} className="hero-grid">
    <div style={{ position:"absolute", right:"-3rem", top:"50%", transform:"translateY(-50%)", fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"clamp(12rem,20vw,20rem)", color:"rgba(13,15,20,0.04)", lineHeight:1, userSelect:"none", pointerEvents:"none" }} className="hide-mobile">MK</div>
    <div>
      <div className="fade-up-1" style={{ display:"inline-block", background:"var(--accent)", color:"#fff", fontSize:".72rem", fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", padding:".35rem .9rem", borderRadius:"2px", marginBottom:"1.4rem" }}>Open to Opportunities · Graduating May 2026</div>
      <h1 className="syne fade-up-2" style={{ fontWeight:800, fontSize:"clamp(2.8rem,5.5vw,5rem)", lineHeight:1.04, letterSpacing:"-.03em" }}>
        Mani Kanta<br /><span style={{ color:"var(--accent)" }}>Jonnalagadda</span>
      </h1>
      <p className="fade-up-3" style={{ marginTop:"1.4rem", fontSize:"1.05rem", fontWeight:300, color:"var(--muted)", lineHeight:1.65, maxWidth:"46ch" }}>
        Data Analyst with 3+ years in financial services — delivering KPI dashboards, automated reporting pipelines, and data-driven insights in regulated banking environments.
      </p>
      <div className="fade-up-4" style={{ display:"flex", gap:"1rem", marginTop:"2.4rem", flexWrap:"wrap" }}>
        <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })} className="btn-primary-hover"
          style={{ display:"inline-flex", alignItems:"center", gap:".5rem", padding:".85rem 2rem", borderRadius:"4px", fontSize:".9rem", fontWeight:600, background:"var(--accent)", color:"#fff", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
          Get In Touch <ArrowRight size={16}/>
        </button>
        <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior:"smooth" })} className="btn-outline-hover"
          style={{ display:"inline-flex", alignItems:"center", gap:".5rem", padding:".85rem 2rem", borderRadius:"4px", fontSize:".9rem", fontWeight:600, background:"transparent", color:"var(--ink)", border:"1.5px solid var(--border)", cursor:"pointer", fontFamily:"'DM Sans',sans-serif" }}>
          View My Work
        </button>
      </div>
      <div className="fade-up-5" style={{ display:"flex", gap:"1.2rem", marginTop:"2rem" }}>
        {[
          { href:"mailto:jonnalagaddamani13@gmail.com", icon:<Mail size={18}/> },
          { href:"tel:+19013194723", icon:<Phone size={18}/> },
          { href:"https://linkedin.com/in/manikantajonnalagadda13", icon:<Linkedin size={18}/> },
          { href:"https://github.com/manikanta13-05-2002", icon:<Github size={18}/> },
        ].map(({ href, icon }, i) => (
          <a key={i} href={href} target="_blank" rel="noreferrer"
            style={{ display:"flex", alignItems:"center", justifyContent:"center", width:"40px", height:"40px", borderRadius:"8px", border:"1.5px solid var(--border)", color:"var(--muted)", transition:"all .2s", textDecoration:"none" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="var(--accent)"; e.currentTarget.style.color="var(--accent)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--muted)"; }}>
            {icon}
          </a>
        ))}
      </div>
    </div>
    <div className="fade-up-3">
      <div style={{ background:"var(--ink)", color:"var(--paper)", borderRadius:"16px", padding:"2.5rem", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", width:260, height:260, background:"var(--accent)", borderRadius:"50%", top:-80, right:-80, opacity:.12 }}/>
        <div style={{ fontSize:".72rem", letterSpacing:".14em", textTransform:"uppercase", opacity:.5, marginBottom:".6rem" }}>At a glance</div>
        <div className="syne" style={{ fontWeight:700, fontSize:"1.35rem", marginBottom:"1.8rem" }}>Data Analyst · Memphis, TN</div>
        <div className="stat-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.2rem" }}>
          {[
            { num:"3+", desc:"Years in financial services" },
            { num:"3.45", desc:"GPA · MS Comp Sci" },
            { num:"35%", desc:"Reduction in manual effort" },
            { num:"6", desc:"Certifications & training" },
          ].map(({ num, desc }) => (
            <div key={num} className="stat" style={{ background:"rgba(255,255,255,.06)", borderRadius:"10px", padding:"1.2rem" }}>
              <div className="syne stat-num" style={{ fontWeight:800, fontSize:"2rem", color:"var(--accent)" }}>{num}</div>
              <div style={{ fontSize:".78rem", opacity:.6, marginTop:".2rem" }}>{desc}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:"1.5rem", fontSize:".82rem", opacity:.5 }}>📍 University of Memphis · Memphis, TN</div>
      </div>
      <div style={{ display:"flex", justifyContent:"center", marginTop:"2rem" }}>
        <ChevronDown size={22} color="var(--muted)"/>
      </div>
    </div>
  </section>
);

// ── ABOUT ──
const About = () => { useReveal(); return (
  <section id="about" style={{ background:"var(--ink)", color:"var(--paper)", padding:"7rem 4rem" }}>
    <div className="reveal"><SectionHeader eyebrow="About Me" title="Turning data into<br/>actionable insight" dark/></div>
    <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:"5rem", alignItems:"start" }}>
      <div className="reveal" style={{ fontSize:"1.05rem", lineHeight:1.75, fontWeight:300, opacity:.85 }}>
        <p>I'm a Data Analyst with 3+ years of experience across financial services — from regional banking to global payments. My work centers on building KPI dashboards, automating reporting pipelines, and surfacing insights that drive real business decisions in regulated environments.</p>
        <p style={{ marginTop:"1.2rem" }}>At First South Financial Bank, I built Power BI dashboards tracking loan portfolios and deposit trends, and automated reporting workflows that cut manual effort by 35%. At Accenture, I built real-time financial KPI dashboards for an enterprise banking system serving millions of customers.</p>
        <p style={{ marginTop:"1.2rem" }}>I'm pursuing my MS in Computer Science at the University of Memphis (graduating May 2026), training for AWS Cloud Practitioner certification, and an active NSLS member focused on leadership development.</p>
      </div>
      <div className="reveal" style={{ display:"flex", flexDirection:"column", gap:"1.2rem" }}>
        {[
          { icon:"📊", label:"BI & Dashboard Development", desc:"Power BI, Looker Studio, Tableau — KPI dashboards for executive and regulatory reporting" },
          { icon:"🗄️", label:"SQL & Cloud Data Warehouses", desc:"PostgreSQL, Redshift, Snowflake, BigQuery — query optimization and data modeling" },
          { icon:"⚙️", label:"Reporting Automation", desc:"Python (Pandas), Excel Power Query & Macros — automated recurring reporting workflows" },
          { icon:"📈", label:"Statistical Analysis", desc:"EDA, A/B testing, cohort analysis, regression, predictive modeling, ETL" },
        ].map(({ icon, label, desc }) => (
          <div key={label} className="highlight-hover" style={{ border:"1px solid rgba(255,255,255,.1)", borderRadius:"10px", padding:"1.4rem 1.6rem", display:"flex", alignItems:"flex-start", gap:"1rem" }}>
            <span style={{ fontSize:"1.6rem", lineHeight:1, flexShrink:0 }}>{icon}</span>
            <div>
              <div className="syne" style={{ fontWeight:700, fontSize:".95rem" }}>{label}</div>
              <div style={{ fontSize:".82rem", opacity:.55, marginTop:".2rem" }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);};

// ── SKILLS ──
const Skills = () => { useReveal(); return (
  <section id="skills" style={{ background:"var(--light)", padding:"7rem 4rem" }}>
    <div className="reveal"><SectionHeader eyebrow="Technical Skills" title="Tools of the trade"/></div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.5rem" }}>
      {SKILLS.map(({ icon, title, tags }, i) => (
        <div key={title} className={`reveal reveal-delay-${Math.min(i+1,4)} card-hover`} style={{ background:"var(--paper)", borderRadius:"12px", padding:"2rem", border:"1px solid var(--border)" }}>
          <div style={{ color:"var(--accent)", marginBottom:"1rem" }}>{icon}</div>
          <div className="syne" style={{ fontWeight:700, fontSize:"1rem", marginBottom:"1rem", color:"var(--accent2)" }}>{title}</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:".5rem" }}>
            {tags.map(tag => <span key={tag} style={{ fontSize:".76rem", fontWeight:500, background:"var(--light)", color:"var(--ink)", padding:".3rem .75rem", borderRadius:"20px", border:"1px solid var(--border)" }}>{tag}</span>)}
          </div>
        </div>
      ))}
    </div>
  </section>
);};

// ── EXPERIENCE ──
const Experience = () => { useReveal(); return (
  <section id="experience" style={{ background:"var(--paper)", padding:"7rem 4rem" }}>
    <div className="reveal"><SectionHeader eyebrow="Experience" title="Where I've worked"/></div>
    <div style={{ position:"relative", paddingLeft:"2.5rem" }}>
      <div style={{ position:"absolute", left:".5rem", top:".5rem", bottom:".5rem", width:2, background:"linear-gradient(to bottom,var(--accent),transparent)" }}/>
      {EXPERIENCE.map(({ period, company, role, bullets }, idx) => (
        <div key={role} className={`reveal reveal-delay-${idx+1}`} style={{ position:"relative", paddingBottom:"3rem" }}>
          <div style={{ position:"absolute", left:"-2.15rem", top:".35rem", width:14, height:14, borderRadius:"50%", background:"var(--accent)", border:"3px solid var(--paper)", boxShadow:"0 0 0 2px var(--accent)" }}/>
          <div style={{ display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap", marginBottom:".6rem" }}>
            <span style={{ fontSize:".76rem", fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"var(--accent)", background:"rgba(232,80,10,.1)", padding:".25rem .7rem", borderRadius:"3px" }}>{period}</span>
            <span style={{ fontSize:".82rem", color:"var(--muted)", fontWeight:500 }}>{company}</span>
          </div>
          <div className="syne" style={{ fontWeight:700, fontSize:"1.2rem", marginBottom:".8rem" }}>{role}</div>
          <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:".5rem" }}>
            {bullets.map((b, i) => (
              <li key={i} style={{ fontSize:".9rem", lineHeight:1.6, color:"var(--muted)", paddingLeft:"1.2rem", position:"relative" }}>
                <span style={{ position:"absolute", left:0, color:"var(--accent)" }}>→</span>{b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);};

// ── PROJECTS ──
const Projects = () => {
  useReveal();
  const [expanded, setExpanded] = useState(null);
  return (
    <section id="projects" style={{ background:"var(--light)", padding:"7rem 4rem" }}>
      <div className="reveal"><SectionHeader eyebrow="Academic & Technical Projects" title="Things I've built"/></div>

      <div className="reveal" style={{ background:"var(--ink)", color:"var(--paper)", borderRadius:"12px", padding:"1.4rem 1.8rem", marginBottom:"2rem", display:"flex", alignItems:"center", gap:"1rem" }}>
        <Github size={28} color="var(--accent)"/>
        <div>
          <div className="syne" style={{ fontWeight:700, fontSize:"1rem" }}>ML & Data Projects on GitHub</div>
          <div style={{ fontSize:".85rem", opacity:.7, marginTop:".2rem" }}>All data analysis and machine learning projects built in Jupyter Notebook are available at <a href="https://github.com/manikanta13-05-2002" target="_blank" rel="noreferrer" style={{ color:"var(--accent)" }}>github.com/manikanta13-05-2002</a></div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))", gap:"1.8rem" }}>
        {PROJECTS.map((p, idx) => (
          <div key={p.num} className={`reveal reveal-delay-${Math.min(idx+1,4)} card-hover`} style={{ background:"var(--paper)", borderRadius:"14px", border:"1px solid var(--border)", overflow:"hidden", display:"flex", flexDirection:"column" }}>
            <div style={{ background:"var(--ink)", padding:"2.5rem 2rem 2rem", position:"relative", overflow:"hidden", minHeight:150, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
              <div style={{ position:"absolute", right:"1rem", top:"-.5rem", fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"6rem", color:"rgba(255,255,255,.05)", lineHeight:1 }}>{p.num}</div>
              <span style={{ display:"inline-block", fontSize:".68rem", fontWeight:600, letterSpacing:".12em", textTransform:"uppercase", background:"var(--accent)", color:"#fff", padding:".25rem .7rem", borderRadius:"3px", marginBottom:".7rem", width:"fit-content" }}>{p.badge}</span>
              <div className="syne" style={{ fontWeight:700, fontSize:"1.1rem", color:"var(--paper)", lineHeight:1.3 }}>{p.name}</div>
            </div>
            <div style={{ padding:"1.5rem 2rem 2rem", flex:1, display:"flex", flexDirection:"column" }}>
              <p style={{ fontSize:".88rem", lineHeight:1.65, color:"var(--muted)", flex:1 }}>{p.desc}</p>
              <button onClick={() => setExpanded(expanded===idx ? null : idx)}
                style={{ marginTop:"1rem", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:".4rem", fontSize:".78rem", fontWeight:600, color:"var(--accent)", fontFamily:"'DM Sans',sans-serif", padding:0 }}>
                {expanded===idx ? "Hide details ↑" : "Key highlights ↓"}
              </button>
              {expanded===idx && (
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:".35rem", marginTop:".7rem" }}>
                  {p.highlights.map((h, i) => (
                    <li key={i} style={{ fontSize:".8rem", color:"var(--muted)", paddingLeft:"1rem", position:"relative" }}>
                      <span style={{ position:"absolute", left:0, color:"var(--accent)", fontWeight:700 }}>·</span>{h}
                    </li>
                  ))}
                </ul>
              )}
              <div style={{ display:"flex", flexWrap:"wrap", gap:".5rem", marginTop:"1.2rem" }}>
                {p.tech.map(t => <span key={t} style={{ fontSize:".73rem", fontWeight:600, color:"var(--accent2)", background:"rgba(26,58,92,.08)", padding:".25rem .7rem", borderRadius:"3px" }}>{t}</span>)}
              </div>
              <a href={p.github} target="_blank" rel="noreferrer"
                style={{ marginTop:"1rem", display:"inline-flex", alignItems:"center", gap:".4rem", fontSize:".82rem", fontWeight:600, color:"var(--ink)", textDecoration:"none" }}
                onMouseEnter={e => e.currentTarget.style.color="var(--accent)"}
                onMouseLeave={e => e.currentTarget.style.color="var(--ink)"}>
                <Github size={15}/> View on GitHub →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ── ACHIEVEMENTS ──
const Achievements = () => { useReveal(); return (
  <section id="achievements" style={{ background:"var(--paper)", padding:"7rem 4rem" }}>
    <div className="reveal"><SectionHeader eyebrow="Certifications & Achievements" title="Credentials &amp; Leadership"/></div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:"1.5rem" }}>
      {ACHIEVEMENTS.map(({ icon, title, org, status, statusColor, statusBg, desc }, i) => (
        <div key={title} className={`reveal reveal-delay-${Math.min(i+1,4)} card-hover`}
          style={{ background:"var(--light)", borderRadius:"14px", padding:"1.8rem", border:"1px solid var(--border)", display:"flex", flexDirection:"column", gap:"1rem" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <span style={{ fontSize:"2.2rem" }}>{icon}</span>
            <span style={{ fontSize:".72rem", fontWeight:700, background:statusBg, color:statusColor, padding:".25rem .7rem", borderRadius:"20px" }}>{status}</span>
          </div>
          <div>
            <div className="syne" style={{ fontWeight:700, fontSize:"1rem", color:"var(--ink)" }}>{title}</div>
            <div style={{ fontSize:".8rem", color:"var(--accent)", fontWeight:600, marginTop:".2rem" }}>{org}</div>
          </div>
          <p style={{ fontSize:".82rem", color:"var(--muted)", lineHeight:1.6 }}>{desc}</p>
        </div>
      ))}
    </div>
  </section>
);};

// ── EDUCATION ──
const Education = () => { useReveal(); return (
  <section id="education" style={{ background:"var(--ink)", color:"var(--paper)", padding:"7rem 4rem" }}>
    <div className="reveal"><SectionHeader eyebrow="Education" title="Academic background" dark/></div>
    <div className="edu-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem" }}>
      {[
        { flag:"🎓 Current · May 2026", degree:"Master of Science in Computer Science", school:"University of Memphis — Memphis, TN", gpa:"3.45", gpaOf:"/4.0", courses:["Machine Learning","Database Systems","Statistical Computing","Data Analytics","Algorithms"] },
        { flag:"🏛️ Undergraduate · India", degree:"Bachelor of Technology in Information Technology", school:"R.V.R & J.C College of Engineering, India", gpa:"8.35", gpaOf:"/10", courses:["Data Structures","RDBMS","Business Intelligence","Statistical Methods"] },
      ].map(({ flag, degree, school, gpa, gpaOf, courses }) => (
        <div key={degree} className="reveal card-hover"
          style={{ border:"1px solid rgba(255,255,255,.1)", borderRadius:"14px", padding:"2rem", position:"relative", overflow:"hidden", transition:"border-color .2s" }}
          onMouseEnter={e => e.currentTarget.style.borderColor="var(--accent)"}
          onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,.1)"}>
          <div style={{ position:"absolute", width:160, height:160, borderRadius:"50%", background:"var(--accent)", bottom:-60, right:-60, opacity:.06 }}/>
          <div style={{ fontSize:".7rem", fontWeight:600, letterSpacing:".12em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"1rem" }}>{flag}</div>
          <div className="syne" style={{ fontWeight:700, fontSize:"1.1rem", lineHeight:1.35, marginBottom:".5rem" }}>{degree}</div>
          <div style={{ fontSize:".88rem", opacity:.6, marginBottom:"1rem" }}>{school}</div>
          <div className="syne" style={{ fontWeight:800, fontSize:"1.8rem", color:"var(--accent)" }}>{gpa}<span style={{ fontSize:"1rem", opacity:.5 }}>{gpaOf}</span></div>
          <div style={{ fontSize:".72rem", opacity:.5, letterSpacing:".08em", textTransform:"uppercase", marginBottom: courses.length ? "1.2rem" : 0 }}>GPA</div>
          {courses.length > 0 && <>
            <div style={{ fontSize:".72rem", opacity:.45, textTransform:"uppercase", letterSpacing:".1em", marginBottom:".5rem" }}>Relevant Coursework</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:".4rem" }}>
              {courses.map(c => <span key={c} style={{ fontSize:".72rem", background:"rgba(255,255,255,.07)", padding:".25rem .65rem", borderRadius:"3px" }}>{c}</span>)}
            </div>
          </>}
        </div>
      ))}
    </div>
  </section>
);};

// ── CONTACT ──
const Contact = () => { useReveal(); return (
  <section id="contact" style={{ background:"var(--accent)", color:"#fff", padding:"7rem 4rem", textAlign:"center" }}>
    <div className="reveal" style={{ fontSize:".72rem", fontWeight:600, letterSpacing:".16em", textTransform:"uppercase", color:"rgba(255,255,255,.7)", marginBottom:".8rem" }}>Let's Connect</div>
    <h2 className="syne reveal reveal-delay-1" style={{ fontWeight:800, fontSize:"clamp(2rem,3.5vw,2.8rem)", letterSpacing:"-.03em" }}>Open to new opportunities</h2>
    <p className="reveal reveal-delay-2" style={{ fontSize:"1.05rem", opacity:.85, margin:"1.2rem auto 2.5rem", maxWidth:"50ch" }}>
      Actively seeking Data Analyst, Business Intelligence, or Analytics Engineer roles. Graduating May 2026. Let's build something meaningful.
    </p>
    <div className="reveal reveal-delay-3" style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:"1.2rem" }}>
      {[
        { href:"mailto:jonnalagaddamani13@gmail.com", icon:<Mail size={18}/>, label:"jonnalagaddamani13@gmail.com" },
        { href:"tel:+19013194723", icon:<Phone size={18}/>, label:"(901) 319-4723" },
        { href:"https://linkedin.com/in/manikantajonnalagadda13", icon:<Linkedin size={18}/>, label:"LinkedIn" },
        { href:"https://github.com/manikanta13-05-2002", icon:<Github size={18}/>, label:"GitHub" },
      ].map(({ href, icon, label }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer"
          style={{ display:"inline-flex", alignItems:"center", gap:".6rem", background:"rgba(255,255,255,.18)", color:"#fff", padding:".9rem 1.8rem", borderRadius:"6px", textDecoration:"none", fontWeight:600, fontSize:".9rem", backdropFilter:"blur(4px)", transition:"background .2s,transform .2s" }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,.28)"; e.currentTarget.style.transform="translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,.18)"; e.currentTarget.style.transform="translateY(0)"; }}>
          {icon} {label}
        </a>
      ))}
    </div>
  </section>
);};

const Footer = () => (
  <footer style={{ background:"var(--ink)", color:"rgba(255,255,255,.3)", textAlign:"center", padding:"2rem", fontSize:".8rem", letterSpacing:".04em" }}>
    © 2026 Mani Kanta Jonnalagadda · MS Computer Science, University of Memphis · Built with React
  </footer>
);

// ── ROOT APP ──
export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  useEffect(() => {
    const sections = ["hero","about","skills","experience","projects","achievements","education","contact"];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveSection(id); }, { threshold: 0.4 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);
  return (
    <>
      <GlobalStyles/>
      <Navbar activeSection={activeSection}/>
      <main>
        <Hero/><About/><Skills/><Experience/><Projects/><Achievements/><Education/><Contact/>
      </main>
      <Footer/>
    </>
  );
}