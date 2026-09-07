import React, { useEffect, useRef, useState } from "react";

/**
 * ISABELLE — PORTFOLIO
 * ---------------------------------------------------------
 * Everything marked with EDIT ME is placeholder content —
 * swap it for your real projects, links, and words.
 * Design tokens are all in <Styles/> at the bottom —
 * change the hex values there to retheme the whole site.
 * ---------------------------------------------------------
 */

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
];

// EDIT ME — the areas you work in, shown around the radar and in the strip
const EXPERTISE = ["FINTECH", "INSURTECH", "AI", "WEB", "MOBILE"];

// EDIT ME — hover copy for each radar label
const RADAR_LABELS = [
  { text: "FINTECH", pos: "top", desc: "Digital solutions for financial services" },
  { text: "AI", pos: "left", desc: "Intelligent digital solutions" },
  { text: "WEB", pos: "right", desc: "Modern web applications" },
  { text: "MOBILE", pos: "bottom", desc: "Cross-platform mobile experiences" },
  { text: "INSURTECH", pos: "bottom-right", desc: "Technology for smarter insurance experiences" },
];

// EDIT ME — merge your fintech/insurtech concepts and dev projects here
const PROJECTS = [
  {
    title: "UbuntuCredit",
    tag: "Fintech concept",
    body: "An alternative credit-scoring idea for MSMEs, using mobile-money and trading history instead of formal collateral.",
  },
  {
    title: "InsurTech micro-cover",
    tag: "Hackathon entry",
    body: "A pay-as-you-trade micro-insurance concept for market vendors, priced against daily sales volume.",
  },
  {
    title: "Financial inclusion research",
    tag: "Independent research",
    body: "A study on how mobile-money infrastructure could support alternative credit models.",
  },
  {
    title: "Interactive HTML guide",
    tag: "Self-teaching project",
    body: "A self-built guide to HTML, with exercises rewritten around local context rather than generic examples.",
  },
  {
    title: "A gift, built in code",
    tag: "Personal project",
    body: "A small single-page web app made as a personal gift for someone close.",
  },
  {
    title: "This portfolio",
    tag: "You're looking at it",
    body: "First React build — a step up from static HTML.",
  },
];

const ABOUT_SKILLS = {
  frontend: ["React", "JavaScript", "HTML", "CSS"],
  design: ["Figma", "UI/UX Design", "Prototyping"],
  backend: ["Node.js", "Express.js", "REST APIs"],
};

const WORK_STEPS = [
  { number: "01", title: "UNDERSTAND", body: "I start with the problem and the people it affects.", meta: "DISCOVERY" },
  { number: "02", title: "BUILD", body: "I turn the idea into a working interface and system.", meta: "DEVELOPMENT" },
  { number: "03", title: "CONNECT", body: "I connect the frontend with the backend through APIs and data.", meta: "INTEGRATION" },
  { number: "04", title: "REFINE", body: "I test, improve, and polish the experience.", meta: "ITERATION" },
];

const SELECTED_PROJECTS = [
  {
    number: "01",
    title: "RCA Archive",
    url: "https://rca-archive.vercel.app/",
    description: "RCA Archive is a digital platform designed to help Rwanda Coding Academy students easily access and preserve past papers, notes, and other important academic documents in one place.",
    category: "Education · Digital Archive",
    type: "featured",
  },
  {
    number: "02",
    title: "Imizi",
    description: "Imizi is a digital platform designed to help families reconnect by preserving family memories and making it easier for members to discover and learn more about their family.",
    category: "Family · Digital Memories",
    type: "memories",
    url: "https://www.figma.com/proto/KcXYmlcJotgapNVJaB453N/HACKATHON?node-id=640-1326&p=f&t=l5zJYZ7XmYolGiBt-1&scaling=min-zoom&content-scaling=fixed&page-id=12%3A5&starting-point-node-id=640%3A1326",
  },
  {
    number: "03",
    title: "GreenTrace",
    description: "GreenTrace is a wildlife conservation solution designed to help protect wildlife and support the detection and prevention of illegal activities such as charcoal burning in protected forest areas through acoustic sensors.",
    category: "Wildlife Conservation · IoT",
    type: "sensor",
    url: "https://green-trace-kjhsshfvomrizpdn9aanaq.streamlit.app",
  },
];

const GITHUB_URL = "https://github.com/cadeau78gmail";
const LINKEDIN_URL = "https://www.linkedin.com/in/utuje-cadeau-isabelle-937495412/";
const TWITTER_URL = "https://x.com/cisabeh4";

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem("portfolio-theme") || "light";
    } catch {
      return "light";
    }
  });
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
  const themeTimer = useRef(null);

  useEffect(() => {
    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {
      return undefined;
    }
  }, [theme]);

  const toggleTheme = () => {
    window.clearTimeout(themeTimer.current);
    setIsThemeTransitioning(true);
    setTheme((current) => current === "light" ? "dark" : "light");
    themeTimer.curreH= window.setTimeout(() => setIsThemeTransitioning(false), 560);
  };

  return (
    <>
      <Styles />
      <div className={"page " + (theme === "light" ? "light-theme" : "dark-theme") + (isThemeTransitioning ? " is-theme-transitioning" : "")}>
        <Nav theme={theme} onToggleTheme={toggleTheme} />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <LetsConnect />
        <Footer />
      </div>
    </>
  );
}

/* ---------------------------------- NAV ---------------------------------- */

function Nav({ theme, onToggleTheme }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="nav">
      <span className="nav-mark">Cadeau Isabelle</span>
      <nav className="nav-links">
        {NAV_LINKS.map((l) => (
          <button key={l.id} className="nav-link" onClick={() => scrollTo(l.id)}>
            {l.label}
          </button>
        ))}
        <button className="nav-cta" onClick={() => scrollTo("contact")}>
          Let's connect ↗
        </button>
        <button
          className="theme-toggle"
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <span className="theme-toggle-track"><span className="theme-toggle-thumb">{theme === "light" ? "☀" : "☾"}</span></span>
        </button>
      </nav>
    </header>
  );
}

/* ---------------------------------- HERO ---------------------------------- */

function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="hero">
      <div className="hero-grid">
        <div className={"hero-copy" + (loaded ? " is-in" : "")}>
          <span className="status">
            <span className="status-dot" />
            OPEN TO NEW OPPORTUNITIES
          </span>
          <p className="eyebrow">SOFTWARE DEVELOPER &bull; FINTECH &bull; INSURTECH</p>
          <h1 className="headline">
            <span className="line">Turning ideas</span>
            <span className="line">into digital</span>
            <span className="line">experiences.</span>
          </h1>
          <p className="hero-sub">
            I'm Isabelle, a software developer focused on building
            thoughtful digital products where technology, finance, and
            real-world problems meet.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => go("projects")}>
              View my work <span className="btn-arrow">→</span>
            </button>
            <button className="btn-ghost" onClick={() => go("contact")}>
              Let's connect
            </button>
          </div>
        </div>

        <div className={"hero-visual" + (loaded ? " is-in" : "")}>
          <Radar />
        </div>
      </div>

      <div className="hero-bottom">
        <ExpertiseStrip />
        <ScrollIndicator />
      </div>
    </section>
  );
}

function Radar() {
  return (
    <div className="radar-wrap" aria-hidden="false" role="img" aria-label="Interactive visualization of Isabelle's areas of work">
      <div className="radar-rings">
        <span className="ring ring-1" />
        <span className="ring ring-2" />
        <span className="ring ring-3" />
        <span className="radar-sweep" />
        <span className="radar-node node-1" />
        <span className="radar-node node-2" />
        <span className="radar-node node-3" />
        <div className="radar-center">
          <span className="radar-center-name">ISABELLE</span>
          <span className="radar-center-role">Digital Builder</span>
        </div>
      </div>
      {RADAR_LABELS.map((l) => (
        <RadarLabel key={l.text} label={l} />
      ))}
    </div>
  );
}

function RadarLabel({ label }) {
  return (
    <div className={"radar-label pos-" + label.pos} tabIndex={0}>
      <span className="radar-label-text">{label.text}</span>
      <div className="radar-tooltip">
        <strong>{label.text}</strong>
        <span>{label.desc}</span>
      </div>
    </div>
  );
}

function ExpertiseStrip() {
  return (
    <div className="expertise-strip">
      {EXPERTISE.map((e, i) => (
        <span key={e} className="expertise-item">
          {e}
          {i < EXPERTISE.length - 1 && <span className="expertise-dot">&bull;</span>}
        </span>
      ))}
    </div>
  );
}

function ScrollIndicator() {
  return (
    <button className="scroll-indicator" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
      SCROLL TO EXPLORE
      <span className="scroll-arrow">↓</span>
    </button>
  );
}

/* ---------------------------------- ABOUT ---------------------------------- */

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const section = aboutRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={aboutRef} className={"section section-panel about-section" + (isVisible ? " is-visible" : "")}>
      <div className="about-main">
        <div className="about-intro">
          <p className="kicker about-kicker">About</p>
          <h2 className="section-title about-title">I build from interface to backend.</h2>
          <div className="about-copy">
            <p>
              I'm Isabelle, a full-stack developer who enjoys turning ideas into functional, thoughtful digital experiences. I work across both frontend and backend, building interfaces with React and developing the systems behind them with Node.js.
            </p>
            <p>
              I enjoy working on projects where technology meets real-world problems from FinTech and InsurTech concepts to platforms designed to make everyday experiences simpler and more accessible.
            </p>
          </div>
        </div>

        <div className="developer-card" aria-label="Full-stack development flow from frontend and design to backend">
          <div className="developer-card-head">
            <span className="developer-card-kicker">FULL-STACK</span>
            <span className="developer-card-title">DEVELOPER</span>
          </div>
          <div className="stack-flow">
            <div className="stack-layer stack-design">
              <span className="stack-label">DESIGN</span>
              <div className="tech-list">
                {ABOUT_SKILLS.design.map((skill) => <span className="tech-item" key={skill}>{skill}</span>)}
              </div>
            </div>
            <div className="flow-link" aria-hidden="true"><span className="flow-particle" /></div>
            <div className="stack-layer stack-frontend">
              <span className="stack-label">FRONTEND</span>
              <div className="tech-list">
                {ABOUT_SKILLS.frontend.map((skill) => <span className="tech-item" key={skill}>{skill}</span>)}
              </div>
            </div>
            <div className="flow-link" aria-hidden="true"><span className="flow-particle flow-particle-delay" /></div>
            <div className="stack-api">REST API</div>
            <div className="flow-link" aria-hidden="true"><span className="flow-particle flow-particle-delay" /></div>
            <div className="stack-layer stack-backend">
              <span className="stack-label">BACKEND</span>
              <div className="tech-list">
                {ABOUT_SKILLS.backend.filter((skill) => skill !== "REST APIs").map((skill) => <span className="tech-item" key={skill}>{skill}</span>)}
              </div>
            </div>
          </div>
          <span className="developer-card-foot">React <span>→</span> API <span>→</span> Node.js</span>
        </div>
      </div>

      <div className="how-i-work">
        <div className="how-head">
          <p className="kicker">How I work</p>
          <p className="how-summary">A clear path from a meaningful problem to a polished product.</p>
        </div>
        <div className="work-steps">
          <span className="workflow-particle" aria-hidden="true" />
          {WORK_STEPS.map((step) => (
            <article className="work-step" key={step.number}>
              <span className="work-step-node" aria-hidden="true" />
              <div className="work-step-head">
                <span className="work-step-number">{step.number}</span>
                <span className="work-step-meta">{step.meta}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              {step.number === "03" && (
                <span className="work-step-flow" aria-label="React to API to Node.js">REACT <b>→</b> API <b>→</b> NODE.JS</span>
              )}
            </article>
          ))}
        </div>
      </div>

      <p className="about-closing">Frontend thinking. Backend building. <span>Product mindset.</span></p>
    </section>
  );
}

/* ---------------------------------- PROJECTS ---------------------------------- */

function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const projectsRef = useRef(null);
  const projectCount = String(SELECTED_PROJECTS.length).padStart(2, "0");

  useEffect(() => {
    const section = projectsRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={projectsRef} className={"section projects-section" + (isVisible ? " is-visible" : "")}>
      <div className="projects-heading">
        <p className="kicker projects-kicker">Selected Work / {projectCount} Projects</p>
        <h2 className="section-title projects-title">Selected work</h2>
        <p className="projects-intro">A selection of digital products I've built to solve real-world problems.</p>
      </div>
      <div className="selected-projects" tabIndex={0} role="region" aria-label={`Selected projects, ${SELECTED_PROJECTS.length} projects`}>
        {SELECTED_PROJECTS.map((project) => <ProjectShowcase project={project} total={projectCount} key={`${project.number}-${project.title}`} />)}
      </div>
      <div className="projects-scroll-meta">
        <span>SCROLL TO EXPLORE <b>→</b></span>
        <span>01 / {projectCount}</span>
      </div>
    </section>
  );
}

function ProjectShowcase({ project, total }) {
  return (
    <article className={"showcase-project showcase-project-" + project.type}>
      <div className="project-visual" aria-hidden="true">
        {project.type === "featured" && <ArchiveVisual />}
        {project.type === "memories" && <MemoriesVisual />}
        {project.type === "sensor" && <SensorVisual />}
      </div>
      <div className="project-info">
        <div className="project-meta">
          <span>{project.number} / {total}</span>
          <span>{project.type === "featured" ? "Featured Project" : project.category.split(" · ")[1]}</span>
        </div>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        {project.type === "featured" && (
          <div className="project-story">
            <span><b>The problem</b>Resources can be difficult to access and organize.</span>
            <span className="story-arrow" aria-hidden="true">↓</span>
            <span><b>The solution</b>A centralized digital archive for academic resources.</span>
          </div>
        )}
        <div className="project-details">
          <span><b>Category</b>{project.category}</span>
          <span><b>Role</b>Full-Stack Developer</span>
        </div>
        <a
          className="project-link"
          href={project.url || "#projects"}
          target={project.url ? "_blank" : undefined}
          rel={project.url ? "noopener noreferrer" : undefined}
        >
          View project <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

function ArchiveVisual() {
  return (
    <div className="archive-visual">
      <div className="visual-topline"><span>RCA / ARCHIVE</span><span>SEARCH</span></div>
      <div className="archive-layout">
        <div className="archive-sidebar"><i /><i /><i /><i /></div>
        <div className="document-stack">
          <div className="document-sheet sheet-back"><span>NOTES</span><i /></div>
          <div className="document-sheet sheet-front"><span>PAST PAPERS</span><i /><i /><i /></div>
        </div>
        <span className="archive-pulse" />
      </div>
      <div className="visual-labels"><span>DOCUMENTS</span><span>ACCESS</span><span>ARCHIVE</span></div>
    </div>
  );
}

function MemoriesVisual() {
  return (
    <div className="memories-visual">
      <div className="visual-topline"><span>IMIZI / MEMORIES</span><span>CONNECTED</span></div>
      <div className="memory-network"><span className="memory-line line-one" /><span className="memory-line line-two" /><span className="memory-line line-three" /><i className="memory-node node-a" /><i className="memory-node node-b" /><i className="memory-node node-c" /><i className="memory-node node-d" /></div>
      <div className="visual-labels"><span>MEMORIES</span><span>FAMILY</span><span>CONNECTION</span></div>
    </div>
  );
}

function SensorVisual() {
  return (
    <div className="sensor-visual">
      <div className="visual-topline"><span>GREENTRACE / FIELD SIGNAL</span><span>MONITORING</span></div>
      <div className="sensor-display"><span className="sensor-label">ACOUSTIC SENSOR</span><div className="waveform"><i /><i /><i /><i /><i /><i /><i /></div><span className="sensor-label">DETECTION</span></div>
      <div className="visual-labels"><span>FOREST</span><span>SIGNAL</span><span>CONSERVATION</span></div>
    </div>
  );
}

/* ---------------------------------- CONTACT ---------------------------------- */

function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const email = "isabellecadeau78@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setSubmitted(false);
  };

  const submitForm = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!formState.name.trim()) nextErrors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(formState.email)) nextErrors.email = "Please enter a valid email.";
    if (!formState.message.trim()) nextErrors.message = "Please tell me a little about your idea.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    const subject = `Portfolio message from ${formState.name.trim()}`;
    const body = [
      `Name: ${formState.name.trim()}`,
      `Email: ${formState.email.trim()}`,
      "",
      formState.message.trim(),
    ].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const focusForm = () => document.getElementById("contact-form")?.querySelector("input")?.focus();

  return (
    <section id="contact" className="section section-contact contact-page">
      <div className="contact-hero">
        <p className="eyebrow contact-eyebrow">GET IN TOUCH</p>
        <h2 className="contact-page-title">Let&rsquo;s start a conversation.</h2>
        <p className="contact-page-intro">Have a project, idea, or opportunity in mind? I&rsquo;d love to hear about it.</p>
      </div>

      <div className="contact-main">
        <div className="contact-info">
          <p className="contact-label">LET&rsquo;S TALK</p>
          <p className="contact-copy">Whether you&rsquo;re working on a digital product, exploring an idea, or looking for a developer to collaborate with, let&rsquo;s connect.</p>
          <span className="conversation-status"><span /> OPEN TO CONVERSATIONS</span>
          <div className="contact-details">
            <div className="contact-detail">
              <span className="contact-detail-label">EMAIL</span>
              <button className="email-copy" type="button" onClick={copyEmail} aria-label={copied ? "Email copied" : "Copy email address"}>
                {copied ? "COPIED ✓" : email}
              </button>
              <a
                className="email-fallback"
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open email client ↗
              </a>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">SOCIAL</span>
              <div className="contact-socials">
                <a className="social-placeholder" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  <span className="contact-social-icon" aria-hidden="true"><SocialIcon name="GitHub" /></span>
                  GitHub
                </a>
                <a className="social-placeholder" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  <span className="contact-social-icon" aria-hidden="true"><SocialIcon name="LinkedIn" /></span>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="topic-block">
            <span className="contact-detail-label">WE CAN TALK ABOUT</span>
            <div className="topic-list">
              {["WEB DEVELOPMENT", "FULL-STACK PROJECTS", "FINTECH", "INSURTECH", "AI & TECHNOLOGY", "COLLABORATION"].map((topic) => <span className="topic-chip" key={topic}>{topic}</span>)}
            </div>
          </div>
        </div>

        <form id="contact-form" className="contact-form" onSubmit={submitForm} noValidate>
          <div className="form-heading"><span>CONTACT / 01</span><strong>START_A_CONVERSATION</strong></div>
          {submitted ? (
            <div className="form-success" role="status"><strong>EMAIL_READY ✓</strong><span>Your email app should open with the message addressed to {email}.</span></div>
          ) : (
            <>
              <FormField label="NAME" name="name" value={formState.name} onChange={updateField} error={errors.name} placeholder="Your name" />
              <FormField label="EMAIL" name="email" type="email" value={formState.email} onChange={updateField} error={errors.email} placeholder="Your email" />
              <FormField label="MESSAGE" name="message" value={formState.message} onChange={updateField} error={errors.message} placeholder="Tell me about your idea..." textarea />
              <button className="send-button" type="submit">SEND MESSAGE <span>→</span></button>
            </>
          )}
        </form>
      </div>

      <ContactFlow />

      <div className="contact-final-cta">
        <h3>Let&rsquo;s turn the next idea into something real.</h3>
        <p>Start a conversation and let&rsquo;s see where the idea can go.</p>
        <button type="button" onClick={focusForm}>START A CONVERSATION <span>→</span></button>
      </div>
    </section>
  );
}

function FormField({ label, name, type = "text", value, onChange, error, placeholder, textarea }) {
  const fieldId = `contact-${name}`;
  return (
    <label className="form-field" htmlFor={fieldId}>
      <span>{label}</span>
      {textarea ? <textarea id={fieldId} name={name} value={value} onChange={onChange} placeholder={placeholder} rows="5" aria-invalid={Boolean(error)} /> : <input id={fieldId} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} aria-invalid={Boolean(error)} />}
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

function ContactFlow() {
  return (
    <div className="contact-flow" aria-label="Idea to connection process">
      {["IDEA", "DESIGN", "CODE", "PRODUCT", "CONNECT"].map((step, index) => (
        <div className="contact-flow-step" key={step}><span className="contact-flow-node" /><span>{step}</span>{index < 4 && <i />}</div>
      ))}
    </div>
  );
}

function LetsConnect() {
  const [isVisible, setIsVisible] = useState(false);
  const connectRef = useRef(null);
  const socialLinks = [
    { name: "GitHub", icon: "GH", href: GITHUB_URL },
    { name: "LinkedIn", icon: "in", href: LINKEDIN_URL },
    { name: "Twitter / X", icon: "X", href: TWITTER_URL },
  ];

  useEffect(() => {
    const section = connectRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.16 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={connectRef} className={"section connect-section" + (isVisible ? " is-visible" : "")} aria-labelledby="connect-title">
      <div className="connect-grid-pattern" aria-hidden="true" />
      <div className="connect-content">
        <p className="eyebrow connect-eyebrow">LET&rsquo;S CONNECT</p>
        <h2 id="connect-title" className="connect-title">Have an idea? Let&rsquo;s build it.</h2>
        <p className="connect-intro">Have a project, idea, or opportunity in mind? Let&rsquo;s turn it into something real.</p>
        <button className="connect-cta" type="button" onClick={scrollToContact}>GET IN TOUCH <span aria-hidden="true">→</span></button>
      </div>

      <div className="connect-social-area">
        <p className="connect-label">FIND ME ONLINE</p>
        <div className="social-grid">
          {socialLinks.map((social) => (
            <a
              className="social-link"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              key={social.name}
              aria-label={`${social.name} profile`}
            >
              <span className="social-icon" aria-hidden="true"><SocialIcon name={social.name} /></span>
              <span>{social.name}</span>
              <span className="social-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>

      <div className="connect-footer-row">
        <span className="connect-status"><span /> OPEN TO COLLABORATION</span>
        <div className="connect-flow" aria-hidden="true">
          <span>IDEA</span><i /><span>BUILD</span><i /><span>CONNECT</span><b className="connect-particle" />
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ name }) {
  if (name === "GitHub") {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label="GitHub">
        <path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 7.85c.85 0 1.71.12 2.51.37 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    );
  }

  if (name === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" role="img" aria-label="LinkedIn">
        <path fill="currentColor" d="M5.2 3.5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM3.4 9.3H7v11.3H3.4V9.3Zm5.9 0h3.4v1.55h.05c.47-.89 1.62-1.83 3.34-1.83 3.57 0 4.23 2.35 4.23 5.41v6.17h-3.55v-5.47c0-1.31-.02-2.99-1.82-2.99-1.83 0-2.11 1.43-2.11 2.9v5.56H9.3V9.3Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="X / Twitter">
      <path fill="currentColor" d="M4.3 3.5h4.42l3.9 5.2 4.53-5.2h2.55l-5.9 6.77 6.2 8.23h-4.42l-4.2-5.58-4.86 5.58H4l6.23-7.15L4.3 3.5Zm3.25 1.74 9.03 11.7h1.06L8.62 5.24H7.55Z" />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span>Isabelle@2026 Rwanda Coding Academy</span>
    </footer>
  );
}

function SectionHead({ kicker, title }) {
  return (
    <div className="section-head">
      <p className="kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

/* ---------------------------------- STYLES ---------------------------------- */

function Styles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

      :root{
        --ink: #0A0F1E;
        --navy2: #111A2E;
        --text: #E8ECF4;
        --muted: rgba(232,236,244,0.65);
        --blue: #2F6FED;
        --cyan: #38BDF8;
      }

      .light-theme{
        --ink: #F4F7FB;
        --navy2: #EDF2F8;
        --text: #0B1220;
        --muted: #526174;
        --blue: #2563EB;
        --cyan: #2563EB;
      }

      html, body, #root{
        margin: 0;
        padding: 0;
        width: 100%;
        min-height: 100%;
      }

      *{ box-sizing: border-box; }

      .page{
        position: relative;
        --nav-height: 88px;
        font-family: 'Inter', sans-serif;
        color: var(--text);
        background: var(--ink);
        overflow-x: hidden;
        width: 100%;
        min-height: 100vh;
        /* Keeps content below the fixed navigation bar. */
        padding-top: var(--nav-height);
      }
      .page.is-theme-transitioning::after{
        content: '';
        position: fixed;
        z-index: 30;
        inset: 0;
        pointer-events: none;
        opacity: 0;
        background: radial-gradient(circle at 92% 30%, rgba(56,189,248,.08), transparent 34%);
        animation: themeAtmosphere .56s ease-in-out;
      }
      .page.is-theme-transitioning,
      .page.is-theme-transitioning *{
        transition: background .56s cubic-bezier(.22,.8,.24,1), background-color .56s cubic-bezier(.22,.8,.24,1), color .56s cubic-bezier(.22,.8,.24,1), border-color .56s cubic-bezier(.22,.8,.24,1), box-shadow .56s cubic-bezier(.22,.8,.24,1), fill .56s cubic-bezier(.22,.8,.24,1), stroke .56s cubic-bezier(.22,.8,.24,1) !important;
      }
      .page.is-theme-transitioning .theme-toggle-thumb{ transform: rotate(180deg) scale(.92); }
      @keyframes themeAtmosphere{
        0%{ opacity: 0; }
        45%{ opacity: 1; }
        100%{ opacity: 0; }
      }

      .light-theme .nav{
        background: rgba(244,247,251,0.92);
        border-bottom-color: #D8E0EA;
      }
      .light-theme .nav-link{ color: var(--text); }
      .light-theme .nav-cta{ color: #fff; }
      .light-theme .section-panel{ background: var(--navy2); }
      .light-theme .status,
      .light-theme .radar-label,
      .light-theme .project-meta span:last-child,
      .light-theme .social-link,
      .light-theme .contact-form,
      .light-theme .showcase-project,
      .light-theme .developer-card,
      .light-theme .document-sheet,
      .light-theme .memory-node,
      .light-theme .radar-center,
      .light-theme .work-step-node,
      .light-theme .contact-flow-node{
        background: #FFFFFF;
      }
      .light-theme .showcase-project,
      .light-theme .contact-form,
      .light-theme .developer-card{ box-shadow: 0 14px 30px rgba(38,76,112,0.08); }
      .light-theme .project-visual,
      .light-theme .contact-form input,
      .light-theme .contact-form textarea{ background: #FFFFFF; }
      .light-theme .project-info{ background: #FFFFFF; }
      .light-theme .project-meta span:last-child,
      .light-theme .project-story b,
      .light-theme .project-details b,
      .light-theme .visual-topline,
      .light-theme .visual-labels,
      .light-theme .sensor-label{ color: #526174; }
      .light-theme .contact-page,
      .light-theme .connect-section{ background: var(--ink); }
      .light-theme .topic-chip,
      .light-theme .tech-item,
      .light-theme .social-link,
      .light-theme .project-link{ border-color: #D8E0EA; }
      .light-theme .radar-label,
      .light-theme .status{ border-color: #D8E0EA; }
      .light-theme .ring{ border-color: rgba(37,99,235,0.28); }
      .light-theme .ring-2{ border-color: rgba(37,99,235,0.2); }
      .light-theme .ring-3{ border-color: rgba(37,99,235,0.13); }
      .light-theme .radar-sweep{ background: linear-gradient(90deg, var(--cyan), transparent); }
      .light-theme .radar-tooltip{ background: #FFFFFF; border-color: #D8E0EA; }
      .light-theme .radar-label:hover, .light-theme .radar-label:focus-visible{ color: var(--text); }
      .light-theme .work-step{ border-color: #D8E0EA; }
      .light-theme .work-steps,
      .light-theme .contact-final-cta,
      .light-theme .connect-footer-row{ border-color: #D8E0EA; }
      .light-theme .how-i-work::before,
      .light-theme .projects-section::before,
      .light-theme .contact-page::before,
      .light-theme .connect-grid-pattern{ opacity: .7; }
      .light-theme .form-field input:focus, .light-theme .form-field textarea:focus{ background: #FFFFFF; }
      .light-theme .social-link:hover, .light-theme .social-link:focus-visible{ background: #E8F0FF; }
      .light-theme .nav-cta:hover,
      .light-theme .btn-primary:hover,
      .light-theme .send-button:hover,
      .light-theme .contact-final-cta button:hover,
      .light-theme .connect-cta:hover{ background: #1D4ED8; }
      .light-theme .btn-ghost:hover,
      .light-theme .nav-link:hover,
      .light-theme .project-link:hover,
      .light-theme .email-copy:hover{ color: #2563EB; }
      .light-theme .form-field input,
      .light-theme .form-field textarea{ border-color: #D8E0EA; }
      .light-theme .form-field input::placeholder,
      .light-theme .form-field textarea::placeholder{ color: #526174; }
      .light-theme .form-field input:focus,
      .light-theme .form-field textarea:focus{ border-color: #2563EB; box-shadow: 0 0 0 3px rgba(37,99,235,.12); }
      .light-theme .theme-toggle-track{ background: #E8F0FF; border-color: #D8E0EA; }
      .light-theme .theme-toggle-thumb{ background: #2563EB; }

      .theme-toggle{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 32px;
        padding: 0;
        border: 0;
        background: none;
        color: var(--text);
        cursor: pointer;
      }
      .theme-toggle-track{
        display: flex;
        align-items: center;
        width: 44px;
        height: 24px;
        padding: 3px;
        border: 1px solid rgba(232,236,244,0.25);
        border-radius: 999px;
        background: rgba(17,26,46,0.72);
        transition: background .3s ease, border-color .3s ease;
      }
      .light-theme .theme-toggle-track{ justify-content: flex-end; background: #DCECF5; border-color: rgba(16,35,61,0.18); }
      .theme-toggle-thumb{
        display: grid;
        place-items: center;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--cyan);
        color: #fff;
        font-size: 10px;
        line-height: 1;
        box-shadow: 0 2px 7px rgba(0,0,0,.2);
        transition: transform .35s cubic-bezier(.2,.8,.2,1), background .3s ease;
      }
      .theme-toggle:active .theme-toggle-thumb{ transform: scale(.86); }

      .page :focus-visible{
        outline: 2px solid var(--cyan);
        outline-offset: 3px;
      }

      h1, h2, h3{
        font-family: 'Space Grotesk', sans-serif;
        margin: 0;
        color: inherit;
      }

      p{ margin: 0; }

      /* ---------- NAV ---------- */
      .nav{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 22px clamp(20px, 5vw, 64px);
        background: rgba(10,15,30,0.85);
        backdrop-filter: blur(8px);
        border-bottom: 1px solid rgba(232,236,244,0.08);
      }
      [id]{ scroll-margin-top: calc(var(--nav-height) + 16px); }
      .nav-mark{
        font-family: 'Space Grotesk', sans-serif;
        font-size: 20px;
        font-weight: 700;
        color: var(--text);
      }
      .nav-links{ display: flex; align-items: center; gap: clamp(14px, 3vw, 28px); }
      .nav-link{
        background: none;
        border: none;
        font: inherit;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        color: var(--text);
        cursor: pointer;
        padding: 4px 0;
        position: relative;
      }
      .nav-link::after{
        content: '';
        position: absolute;
        left: 0; bottom: -2px;
        width: 100%; height: 1px;
        background: var(--cyan);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform .25s ease;
      }
      .nav-link:hover::after{ transform: scaleX(1); }
      .nav-cta{
        background: var(--blue);
        color: white;
        border: none;
        font: inherit;
        font-size: 14px;
        padding: 10px 20px;
        border-radius: 999px;
        cursor: pointer;
        transition: transform .2s ease, background .2s ease;
      }
      .nav-cta:hover{ background: #2559c7; transform: translateY(-1px); }

      /* ---------- HERO ---------- */
      .hero{
        position: relative;
        min-height: 88vh;
        display: flex;
        align-items: center;
        padding: 40px clamp(20px, 6vw, 80px);
        gap: 40px;
      }
      .hero-copy{
        max-width: 640px;
        opacity: 0;
        transform: translateY(14px);
        transition: opacity .7s ease, transform .7s ease;
        position: relative;
        z-index: 2;
      }
      .hero-copy.is-in{ opacity: 1; transform: translateY(0); }
      .eyebrow{
        font-size: 13px;
        letter-spacing: 0.02em;
        color: var(--cyan);
        margin-bottom: 18px;
      }
      .headline{
        font-size: clamp(48px, 8vw, 92px);
        line-height: 1.02;
        font-weight: 700;
        letter-spacing: -0.02em;
        display: flex;
        flex-direction: column;
      }
      .headline .line.accent{ color: var(--blue); }
      .hero-sub{
        margin-top: 28px;
        font-size: 18px;
        line-height: 1.6;
        max-width: 46ch;
        color: var(--muted);
      }
      .hero-actions{
        margin-top: 36px;
        display: flex;
        gap: 16px;
        align-items: center;
        flex-wrap: wrap;
      }
      .btn-primary{
        background: var(--blue);
        color: white;
        border: none;
        padding: 14px 28px;
        border-radius: 999px;
        font: inherit;
        font-size: 15px;
        cursor: pointer;
        transition: transform .2s ease, background .2s ease;
      }
      .btn-primary:hover{ background: #2559c7; transform: translateY(-1px); }
      .btn-ghost{
        color: var(--text);
        text-decoration: none;
        font-size: 15px;
        border-bottom: 1px solid rgba(232,236,244,0.4);
        padding-bottom: 2px;
        transition: border-color .2s ease;
      }
      .btn-ghost:hover{ border-color: var(--text); }

      .rings-wrap{
        position: absolute;
        right: clamp(-40px, -2vw, 20px);
        top: 50%;
        transform: translateY(-50%);
        width: min(46vw, 460px);
        opacity: 0.9;
        z-index: 1;
      }
      .rings-svg{ width: 100%; height: auto; }

      /* ---------- SECTIONS ---------- */
      .section{
        padding: clamp(64px, 9vw, 120px) clamp(20px, 6vw, 80px);
      }
      .section-panel{ background: var(--navy2); }
      .section-head{ max-width: 620px; margin-bottom: 56px; }
      .kicker{
        font-size: 13px;
        color: var(--cyan);
        margin-bottom: 14px;
      }
      .section-title{
        font-size: clamp(28px, 3.6vw, 40px);
        font-weight: 700;
        line-height: 1.25;
      }

      /* about */
      .about-section{ overflow: hidden; }
      .about-main{
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(320px, .9fr);
        gap: clamp(44px, 8vw, 112px);
        align-items: center;
      }
      .about-intro{ max-width: 650px; }
      .about-kicker, .about-title, .about-copy, .developer-card,
      .how-i-work, .about-closing{
        opacity: 0;
        transform: translateY(16px);
        transition: opacity .65s ease, transform .65s ease;
      }
      .about-section.is-visible .about-kicker,
      .about-section.is-visible .about-title,
      .about-section.is-visible .about-copy,
      .about-section.is-visible .developer-card,
      .about-section.is-visible .how-i-work,
      .about-section.is-visible .about-closing{
        opacity: 1;
        transform: translateY(0);
      }
      .about-section.is-visible .about-title{ transition-delay: .08s; }
      .about-section.is-visible .about-copy{ transition-delay: .16s; }
      .about-section.is-visible .developer-card{ transition-delay: .22s; }
      .about-section.is-visible .how-i-work{ transition-delay: .32s; }
      .about-section.is-visible .about-closing{ transition-delay: 1.12s; }
      .about-title{ max-width: 620px; font-size: clamp(34px, 4.5vw, 56px); line-height: 1.1; }
      .about-copy{ margin-top: 30px; max-width: 62ch; }
      .about-copy p{
        font-size: 17px;
        line-height: 1.7;
        margin-bottom: 20px;
        color: var(--muted);
      }
      .about-copy p:last-child{ margin-bottom: 0; }

      .developer-card{
        position: relative;
        background: rgba(17,26,46,0.8);
        border: 1px solid rgba(56,189,248,0.22);
        border-radius: 12px;
        padding: clamp(24px, 4vw, 34px);
        box-shadow: 0 16px 36px rgba(0,0,0,0.18);
        animation: aboutFloat 6s ease-in-out infinite;
      }
      .developer-card-head{ display: flex; flex-direction: column; gap: 2px; margin-bottom: 30px; }
      .developer-card-kicker{ color: var(--cyan); font-size: 12px; letter-spacing: .12em; }
      .developer-card-title{ font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700; }
      .stack-flow{ display: flex; flex-direction: column; align-items: stretch; }
      .stack-layer{ display: flex; flex-direction: column; gap: 12px; }
      .stack-label{ color: var(--muted); font-size: 11px; letter-spacing: .1em; }
      .tech-list{ display: flex; flex-wrap: wrap; gap: 8px; }
      .tech-item{
        border: 1px solid rgba(232,236,244,0.14);
        border-radius: 6px;
        padding: 8px 10px;
        color: var(--text);
        font-size: 13px;
        transition: transform .2s ease, color .2s ease, border-color .2s ease, box-shadow .2s ease;
      }
      .tech-item:hover, .tech-item:focus-visible{
        color: var(--text);
        border-color: rgba(56,189,248,0.65);
        box-shadow: 0 0 14px rgba(56,189,248,0.12);
        transform: translateY(-2px);
      }
      .flow-link{ position: relative; width: 1px; height: 30px; margin: 8px auto; background: rgba(56,189,248,0.4); }
      .flow-particle{
        position: absolute;
        left: 50%;
        top: 0;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--cyan);
        box-shadow: 0 0 10px var(--cyan);
        transform: translate(-50%, -50%);
        animation: dataFlow 2.8s ease-in-out infinite;
      }
      .flow-particle-delay{ animation-delay: 1.4s; }
      .stack-api{
        align-self: center;
        border: 1px solid rgba(56,189,248,0.42);
        border-radius: 999px;
        color: var(--cyan);
        font-size: 12px;
        letter-spacing: .08em;
        padding: 8px 16px;
      }
      .developer-card-foot{ display: block; margin-top: 30px; color: var(--muted); font-size: 11px; letter-spacing: .04em; }
      .developer-card-foot span{ color: var(--cyan); padding: 0 5px; }
      @keyframes dataFlow{ 0%, 15%{ top: 0; opacity: 0; } 30%{ opacity: 1; } 85%{ top: 100%; opacity: 1; } 100%{ top: 100%; opacity: 0; } }
      @keyframes aboutFloat{ 0%, 100%{ transform: translateY(0); } 50%{ transform: translateY(-4px); } }

      .how-i-work{
        position: relative;
        isolation: isolate;
        margin-top: clamp(72px, 10vw, 128px);
      }
      .how-i-work::before{
        content: '';
        position: absolute;
        z-index: -1;
        inset: -28px -24px -34px;
        background-image: linear-gradient(rgba(56,189,248,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.035) 1px, transparent 1px);
        background-size: 28px 28px;
        mask-image: linear-gradient(to bottom, transparent, black 16%, black 84%, transparent);
        pointer-events: none;
      }
      .how-head{ display: flex; align-items: baseline; justify-content: space-between; gap: 24px; margin-bottom: 30px; }
      .how-head .kicker{ margin-bottom: 0; }
      .how-summary{ color: var(--muted); font-size: 14px; }
      .work-steps{
        position: relative;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        border-top: 1px solid rgba(232,236,244,0.12);
      }
      .work-steps::before{
        content: '';
        position: absolute;
        z-index: 0;
        top: 30px;
        left: 12.5%;
        right: 12.5%;
        height: 1px;
        background: var(--cyan);
        opacity: .42;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform .9s ease .34s;
      }
      .about-section.is-visible .work-steps::before{ transform: scaleX(1); }
      .workflow-particle{
        position: absolute;
        z-index: 2;
        top: 27px;
        left: 12.5%;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--cyan);
        box-shadow: 0 0 10px rgba(56,189,248,.8);
        opacity: 0;
        transform: translate(-50%, -50%);
      }
      .about-section.is-visible .workflow-particle{ animation: workflowParticle 7s ease-in-out .95s infinite; }
      @keyframes workflowParticle{
        0%, 8%{ left: 12.5%; opacity: 0; }
        16%, 84%{ opacity: 1; }
        92%, 100%{ left: 87.5%; opacity: 0; }
      }
      .work-step{
        position: relative;
        z-index: 1;
        padding: 52px 22px 0 0;
        border-right: 1px solid rgba(232,236,244,0.12);
        opacity: 0;
        transform: translateY(12px);
        transition: opacity .5s ease, transform .5s ease, background .25s ease, border-color .25s ease;
      }
      .work-step:not(:first-of-type){ padding-left: 22px; }
      .work-step:last-child{ border-right: none; }
      .about-section.is-visible .work-step{ opacity: 1; transform: translateY(0); }
      .about-section.is-visible .work-step:nth-of-type(1){ transition-delay: .38s; }
      .about-section.is-visible .work-step:nth-of-type(2){ transition-delay: .48s; }
      .about-section.is-visible .work-step:nth-of-type(3){ transition-delay: .58s; }
      .about-section.is-visible .work-step:nth-of-type(4){ transition-delay: .68s; }
      .work-step:hover{
        background: rgba(56,189,248,0.035);
        border-color: rgba(56,189,248,0.35);
        transform: translateY(-3px);
      }
      .work-step-node{
        position: absolute;
        top: 26px;
        left: 50%;
        width: 9px;
        height: 9px;
        border: 1px solid var(--cyan);
        border-radius: 50%;
        background: var(--navy2);
        box-shadow: 0 0 0 rgba(56,189,248,0);
        transform: translate(-50%, -50%);
        transition: background .2s ease, box-shadow .2s ease, transform .2s ease;
      }
      .about-section.is-visible .work-step-node{ animation: workflowNodeActive 8s ease-in-out infinite; }
      .about-section.is-visible .work-step:nth-of-type(2) .work-step-node{ animation-delay: 2s; }
      .about-section.is-visible .work-step:nth-of-type(3) .work-step-node{ animation-delay: 4s; }
      .about-section.is-visible .work-step:nth-of-type(4) .work-step-node{ animation-delay: 6s; }
      @keyframes workflowNodeActive{
        0%, 18%, 100%{ background: var(--navy2); box-shadow: 0 0 0 rgba(56,189,248,0); }
        8%, 14%{ background: var(--cyan); box-shadow: 0 0 14px rgba(56,189,248,.62); }
      }
      .work-step:hover .work-step-node{ background: var(--cyan); box-shadow: 0 0 14px rgba(56,189,248,.55); transform: translate(-50%, -50%) scale(1.15); }
      .work-step-head{ display: flex; align-items: baseline; gap: 10px; }
      .work-step-number{
        position: relative;
        display: inline-block;
        color: var(--cyan);
        font-family: 'Space Grotesk', sans-serif;
        font-size: 13px;
        transition: color .2s ease, transform .2s ease;
      }
      .work-step-number::after{
        content: '';
        position: absolute;
        left: 0;
        bottom: -7px;
        width: 22px;
        height: 1px;
        background: var(--cyan);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform .45s ease;
      }
      .about-section.is-visible .work-step-number::after{ transform: scaleX(1); }
      .work-step:hover .work-step-number{ color: var(--text); transform: translateY(-1px); }
      .work-step h3{ font-size: 15px; letter-spacing: .06em; margin: 18px 0 10px; }
      .work-step p{ color: var(--muted); font-size: 13px; line-height: 1.6; max-width: 24ch; }
      .work-step-meta{ color: rgba(232,236,244,.42); font-size: 9px; letter-spacing: .1em; }
      .work-step-flow{ display: block; margin-top: 18px; color: var(--cyan); font-size: 9px; letter-spacing: .08em; white-space: nowrap; }
      .work-step-flow b{ color: rgba(56,189,248,.55); font-weight: 500; padding: 0 3px; }
      .about-closing{ margin: clamp(64px, 9vw, 100px) 0 0; font-family: 'Space Grotesk', sans-serif; font-size: clamp(22px, 3vw, 34px); line-height: 1.25; max-width: 700px; }
      .about-closing span{ color: var(--cyan); }

      /* selected projects */
      .projects-section{ position: relative; overflow: hidden; }
      .projects-section::before{
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: .45;
        background-image: linear-gradient(rgba(56,189,248,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.025) 1px, transparent 1px);
        background-size: 34px 34px;
        mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
      }
      .projects-heading, .selected-projects, .projects-scroll-meta{ position: relative; z-index: 1; }
      .projects-heading{ max-width: 700px; margin-bottom: 52px; }
      .projects-kicker, .projects-title, .projects-intro, .showcase-project, .projects-scroll-meta{
        opacity: 0;
        transform: translateY(16px);
        transition: opacity .65s ease, transform .65s ease;
      }
      .projects-section.is-visible .projects-kicker,
      .projects-section.is-visible .projects-title,
      .projects-section.is-visible .projects-intro,
      .projects-section.is-visible .showcase-project,
      .projects-section.is-visible .projects-scroll-meta{ opacity: 1; transform: translateY(0); }
      .projects-section.is-visible .projects-title{ transition-delay: .08s; }
      .projects-section.is-visible .projects-intro{ transition-delay: .16s; }
      .projects-section.is-visible .showcase-project:nth-child(1){ transition-delay: .26s; }
      .projects-section.is-visible .showcase-project:nth-child(2){ transition-delay: .38s; }
      .projects-section.is-visible .showcase-project:nth-child(3){ transition-delay: .5s; }
      .projects-section.is-visible .projects-scroll-meta{ transition-delay: .62s; }
      .projects-title{ text-transform: uppercase; font-size: clamp(34px, 4.5vw, 56px); }
      .projects-intro{ margin-top: 18px; color: var(--muted); font-size: 17px; line-height: 1.6; max-width: 48ch; }
      .selected-projects{
        position: relative;
        display: flex;
        gap: 24px;
        overflow-x: auto;
        padding: 4px 8vw 18px 1px;
        scroll-snap-type: x mandatory;
        scroll-padding-inline: 1px;
        overscroll-behavior-x: contain;
        scrollbar-width: none;
      }
      .selected-projects::-webkit-scrollbar{ display: none; }
      .showcase-project{
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(320px, .82fr);
        flex: 0 0 clamp(680px, 78vw, 980px);
        min-width: 0;
        scroll-snap-align: start;
        background: rgba(17,26,46,.72);
        border: 1px solid rgba(232,236,244,.1);
        border-radius: 12px;
        overflow: hidden;
        transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease;
      }
      .showcase-project:hover{ transform: translateY(-5px); border-color: rgba(56,189,248,.4); box-shadow: 0 14px 32px rgba(0,0,0,.16); }
      .showcase-project:not(.showcase-project-featured){ grid-template-columns: minmax(260px, .8fr) minmax(0, 1fr); }
      .project-visual{ position: relative; z-index: 0; min-width: 0; min-height: 290px; overflow: hidden; background: #0d1629; transition: transform .45s ease; }
      .showcase-project:hover .project-visual{ transform: scale(1.015); }
      .project-info{ position: relative; z-index: 1; display: flex; flex-direction: column; align-items: flex-start; padding: clamp(24px, 4vw, 42px); background: rgba(17,26,46,.72); }
      .project-meta{ display: flex; justify-content: space-between; gap: 18px; width: 100%; color: var(--cyan); font-size: 11px; letter-spacing: .09em; text-transform: uppercase; }
      .project-meta span:last-child{ color: rgba(232,236,244,.48); text-align: right; }
      .project-info h3{ margin-top: 28px; font-size: clamp(28px, 4vw, 48px); text-transform: uppercase; }
      .showcase-project:not(.showcase-project-featured) .project-info h3{ font-size: clamp(24px, 3vw, 34px); }
      .project-description{ max-width: 58ch; margin-top: 16px; color: var(--muted); font-size: 14px; line-height: 1.7; }
      .project-story{ display: grid; gap: 7px; margin-top: 24px; padding-left: 14px; border-left: 1px solid rgba(56,189,248,.35); color: var(--muted); font-size: 11px; line-height: 1.5; }
      .project-story span{ display: flex; flex-direction: column; gap: 2px; }
      .project-story b, .project-details b{ color: rgba(232,236,244,.45); font-size: 9px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; }
      .story-arrow{ color: var(--cyan); }
      .project-details{ display: flex; flex-wrap: wrap; gap: 24px; margin-top: 26px; }
      .project-details span{ display: flex; flex-direction: column; gap: 4px; color: var(--text); font-size: 12px; }
      .project-link{ display: inline-flex; gap: 8px; align-items: center; margin-top: 30px; padding-bottom: 3px; border-bottom: 1px solid rgba(56,189,248,.5); color: var(--text); font-size: 13px; text-decoration: none; transition: color .2s ease, border-color .2s ease; }
      .project-link span{ color: var(--cyan); transition: transform .2s ease; }
      .project-link:hover, .project-link:focus-visible{ color: var(--cyan); border-color: var(--cyan); }
      .project-link:hover span, .project-link:focus-visible span{ transform: translate(2px, -2px); }
      .projects-scroll-meta{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        margin-top: 18px;
        color: var(--muted);
        font-size: 10px;
        letter-spacing: .12em;
      }
      .projects-scroll-meta b{
        display: inline-block;
        margin-left: 6px;
        color: var(--cyan);
        font-size: 15px;
        font-weight: 400;
        animation: projectScrollArrow 2.2s ease-in-out infinite;
      }
      @keyframes projectScrollArrow{
        0%, 100%{ transform: translateX(0); }
        50%{ transform: translateX(5px); }
      }

      .visual-topline, .visual-labels{ display: flex; min-width: 0; justify-content: space-between; gap: 12px; color: rgba(232,236,244,.46); font-size: 9px; letter-spacing: .1em; }
      .visual-topline{ padding: 20px 22px 0; }
      .visual-topline span{ min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .visual-topline span:last-child{ text-align: right; }
      .visual-labels{ position: absolute; right: 22px; bottom: 20px; left: 22px; }
      .archive-visual, .memories-visual, .sensor-visual{ position: relative; height: 100%; min-height: 290px; overflow: hidden; }
      .archive-layout{ position: absolute; inset: 62px 13% 54px; display: flex; align-items: center; justify-content: center; }
      .archive-sidebar{ position: absolute; left: 0; top: 10%; bottom: 10%; width: 12%; border-right: 1px solid rgba(56,189,248,.18); display: flex; flex-direction: column; align-items: center; gap: 18px; padding-top: 18px; }
      .archive-sidebar i{ width: 10px; height: 2px; background: rgba(56,189,248,.4); }
      .document-stack{ position: relative; width: 62%; height: 80%; }
      .document-sheet{ position: absolute; display: flex; flex-direction: column; gap: 10px; padding: 18px; border: 1px solid rgba(56,189,248,.3); background: rgba(17,26,46,.9); font-size: 10px; color: var(--cyan); letter-spacing: .08em; }
      .document-sheet i{ display: block; width: 80%; height: 2px; background: rgba(232,236,244,.18); }
      .document-sheet i:nth-child(3){ width: 62%; }.document-sheet i:nth-child(4){ width: 72%; }
      .sheet-back{ inset: 0 0 16% 16%; transform: rotate(5deg); opacity: .55; }
      .sheet-front{ inset: 12% 16% 0 0; transform: rotate(-4deg); box-shadow: 12px 14px 0 rgba(56,189,248,.08); }
      .archive-pulse{ position: absolute; right: 11%; top: 18%; width: 7px; height: 7px; border-radius: 50%; background: var(--cyan); box-shadow: 0 0 12px var(--cyan); animation: projectPulse 3.2s ease-in-out infinite; }
      @keyframes projectPulse{ 0%,100%{ opacity: .35; transform: scale(.8); } 50%{ opacity: 1; transform: scale(1); } }
      .memory-network{ position: absolute; inset: 74px 12% 62px; }
      .memory-line{ position: absolute; height: 1px; background: rgba(56,189,248,.32); transform-origin: left; }
      .line-one{ left: 18%; top: 45%; width: 42%; transform: rotate(-28deg); }.line-two{ left: 18%; top: 45%; width: 58%; transform: rotate(27deg); }.line-three{ left: 18%; top: 45%; width: 56%; transform: rotate(0); }
      .memory-node{ position: absolute; width: 14px; height: 14px; border: 1px solid var(--cyan); border-radius: 50%; background: var(--navy2); box-shadow: 0 0 0 rgba(56,189,248,0); transition: box-shadow .3s ease; }
      .memory-node::after{ content: ''; position: absolute; inset: 4px; border-radius: 50%; background: rgba(56,189,248,.45); }
      .node-a{ left: 14%; top: 40%; }.node-b{ left: 55%; top: 17%; }.node-c{ left: 75%; top: 63%; }.node-d{ left: 38%; top: 73%; }
      .showcase-project:hover .memory-node{ box-shadow: 0 0 12px rgba(56,189,248,.35); }
      .sensor-display{ position: absolute; inset: 72px 12% 58px; display: flex; flex-direction: column; justify-content: center; gap: 18px; }
      .sensor-label{ color: rgba(232,236,244,.5); font-size: 9px; letter-spacing: .1em; }
      .waveform{ height: 58px; display: flex; align-items: center; justify-content: center; gap: 5px; border-top: 1px solid rgba(56,189,248,.15); border-bottom: 1px solid rgba(56,189,248,.15); }
      .waveform i{ display: block; width: 2px; height: 18px; background: var(--cyan); opacity: .65; animation: waveform 2.4s ease-in-out infinite; }
      .waveform i:nth-child(2){ height: 34px; animation-delay: .12s; }.waveform i:nth-child(3){ height: 48px; animation-delay: .24s; }.waveform i:nth-child(4){ height: 26px; animation-delay: .36s; }.waveform i:nth-child(5){ height: 42px; animation-delay: .48s; }.waveform i:nth-child(6){ height: 20px; animation-delay: .6s; }.waveform i:nth-child(7){ height: 32px; animation-delay: .72s; }
      @keyframes waveform{ 50%{ transform: scaleY(.55); opacity: .35; } }

      /* contact */
      .contact-page{ position: relative; overflow: hidden; align-items: stretch; text-align: left; }
      .contact-page::before{
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        opacity: .38;
        background-image: linear-gradient(rgba(56,189,248,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.025) 1px, transparent 1px);
        background-size: 36px 36px;
        mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
      }
      .contact-hero, .contact-main, .contact-flow, .contact-final-cta{ position: relative; z-index: 1; }
      .contact-hero{ max-width: 760px; }
      .contact-eyebrow, .contact-page-title, .contact-page-intro, .contact-info, .contact-form, .contact-flow, .contact-final-cta{
        opacity: 0;
        transform: translateY(16px);
        animation: contactReveal .65s ease forwards;
      }
      .contact-page-title{ animation-delay: .08s; font-size: clamp(42px, 6vw, 76px); line-height: 1.04; }
      .contact-page-intro{ animation-delay: .16s; margin-top: 22px; max-width: 48ch; color: var(--muted); font-size: 18px; line-height: 1.65; }
      @keyframes contactReveal{ to{ opacity: 1; transform: translateY(0); } }
      .contact-main{ display: grid; grid-template-columns: minmax(0, .9fr) minmax(340px, 1.1fr); gap: clamp(44px, 8vw, 112px); margin-top: clamp(64px, 9vw, 110px); align-items: start; }
      .contact-info{ animation-delay: .24s; }
      .contact-form{ animation-delay: .34s; }
      .contact-label{ color: var(--cyan); font-size: 12px; letter-spacing: .12em; margin-bottom: 18px; }
      .contact-copy{ max-width: 42ch; color: var(--muted); font-size: 16px; line-height: 1.7; }
      .conversation-status{ display: inline-flex; align-items: center; gap: 8px; margin-top: 28px; color: var(--muted); font-size: 11px; letter-spacing: .07em; }
      .conversation-status span{ width: 7px; height: 7px; border-radius: 50%; background: #4ADE80; box-shadow: 0 0 0 rgba(74,222,128,.5); animation: conversationPulse 2.4s ease-out infinite; }
      @keyframes conversationPulse{ 70%{ box-shadow: 0 0 0 7px rgba(74,222,128,0); } }
      .contact-details{ display: grid; gap: 24px; margin-top: 42px; }
      .contact-detail{ display: flex; flex-direction: column; align-items: flex-start; gap: 8px; }
      .contact-detail-label{ color: rgba(232,236,244,.45); font-size: 10px; letter-spacing: .12em; }
      .email-copy{ padding: 0 0 4px; border: none; border-bottom: 1px solid rgba(56,189,248,.6); background: none; color: var(--text); font: inherit; font-size: 18px; cursor: pointer; transition: color .2s ease, border-color .2s ease; }
      .email-copy:hover{ color: var(--cyan); border-color: var(--cyan); }
      .email-fallback{ color: var(--muted); font-size: 11px; text-decoration: none; }
      .email-fallback:hover{ color: var(--cyan); }
      .contact-socials{ display: flex; flex-wrap: wrap; gap: 16px; }
      .social-placeholder{ display: inline-flex; align-items: center; gap: 8px; color: var(--muted); font-size: 14px; text-decoration: none; }
      .contact-social-icon{ display: inline-grid; place-items: center; width: 18px; height: 18px; color: var(--cyan); }
      .contact-social-icon svg{ display: block; width: 16px; height: 16px; }
      .social-placeholder:hover, .social-placeholder:focus-visible{ color: var(--cyan); }
      .social-placeholder small{ display: block; margin-top: 4px; color: rgba(232,236,244,.35); font-size: 9px; letter-spacing: .06em; }
      .topic-block{ margin-top: 48px; }
      .topic-list{ display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
      .topic-chip{ padding: 8px 10px; border: 1px solid rgba(232,236,244,.14); border-radius: 5px; color: var(--muted); font-size: 10px; letter-spacing: .04em; transition: transform .2s ease, color .2s ease, border-color .2s ease, background .2s ease; }
      .topic-chip:hover{ transform: translateY(-2px); color: var(--text); border-color: rgba(56,189,248,.55); background: rgba(56,189,248,.06); }
      .contact-form{ display: flex; flex-direction: column; gap: 24px; padding: clamp(24px, 4vw, 38px); background: rgba(17,26,46,.72); border: 1px solid rgba(232,236,244,.12); border-radius: 12px; }
      .form-heading{ display: flex; flex-direction: column; gap: 8px; margin-bottom: 8px; }
      .form-heading span{ color: var(--cyan); font-size: 10px; letter-spacing: .12em; }
      .form-heading strong{ font-family: 'Space Grotesk', sans-serif; font-size: 24px; letter-spacing: .03em; }
      .form-field{ display: flex; flex-direction: column; gap: 8px; color: var(--muted); font-size: 11px; letter-spacing: .08em; }
      .form-field input, .form-field textarea{ width: 100%; border: 1px solid rgba(232,236,244,.14); border-radius: 6px; background: rgba(10,15,30,.55); color: var(--text); font: inherit; font-size: 14px; letter-spacing: 0; padding: 13px 14px; outline: none; resize: vertical; transition: border-color .2s ease, box-shadow .2s ease, background .2s ease; }
      .form-field input{ min-height: 46px; }
      .form-field input::placeholder, .form-field textarea::placeholder{ color: rgba(232,236,244,.36); }
      .form-field input:focus, .form-field textarea:focus{ border-color: var(--cyan); background: rgba(10,15,30,.75); box-shadow: 0 0 0 3px rgba(56,189,248,.1); }
      .field-error{ color: #fca5a5; font-size: 11px; letter-spacing: 0; }
      .send-button, .contact-final-cta button{ align-self: flex-start; border: 1px solid var(--blue); border-radius: 999px; background: var(--blue); color: white; padding: 13px 20px; font: inherit; font-size: 12px; cursor: pointer; transition: transform .2s ease, box-shadow .2s ease, background .2s ease; }
      .send-button span, .contact-final-cta button span{ display: inline-block; margin-left: 8px; transition: transform .2s ease; }
      .send-button:hover, .contact-final-cta button:hover{ transform: translateY(-2px); background: #3b7bf2; box-shadow: 0 8px 20px rgba(47,111,237,.22); }
      .send-button:hover span, .contact-final-cta button:hover span{ transform: translateX(3px); }
      .form-success{ display: flex; flex-direction: column; gap: 12px; min-height: 220px; justify-content: center; color: var(--muted); line-height: 1.6; }
      .form-success strong{ color: var(--cyan); font-family: 'Space Grotesk', sans-serif; font-size: 22px; }
      .contact-flow{ display: flex; align-items: center; justify-content: center; margin: clamp(72px, 10vw, 128px) 0; animation-delay: .46s; }
      .contact-flow-step{ display: flex; align-items: center; gap: 10px; color: var(--muted); font-size: 10px; letter-spacing: .1em; }
      .contact-flow-node{ width: 8px; height: 8px; border: 1px solid var(--cyan); border-radius: 50%; background: var(--navy2); animation: flowNodePulse 3.8s ease-in-out infinite; }
      .contact-flow-step:nth-child(2) .contact-flow-node{ animation-delay: .7s; }.contact-flow-step:nth-child(3) .contact-flow-node{ animation-delay: 1.4s; }.contact-flow-step:nth-child(4) .contact-flow-node{ animation-delay: 2.1s; }.contact-flow-step:nth-child(5) .contact-flow-node{ animation-delay: 2.8s; }
      @keyframes flowNodePulse{ 50%{ background: var(--cyan); box-shadow: 0 0 12px rgba(56,189,248,.45); } }
      .contact-flow-step i{ width: clamp(20px, 5vw, 70px); height: 1px; margin: 0 6px; background: var(--cyan); opacity: .35; position: relative; overflow: hidden; }
      .contact-flow-step i::after{ content: ''; position: absolute; inset: 0; width: 18px; background: var(--cyan); transform: translateX(-100%); animation: flowData 4.5s linear infinite; }
      @keyframes flowData{ to{ transform: translateX(500%); } }
      .contact-final-cta{ padding-top: 34px; border-top: 1px solid rgba(232,236,244,.12); animation-delay: .54s; }
      .contact-final-cta h3{ max-width: 680px; font-size: clamp(28px, 4vw, 48px); line-height: 1.15; }
      .contact-final-cta p{ margin-top: 14px; color: var(--muted); font-size: 15px; }
      .contact-final-cta button{ margin-top: 26px; }

      /* let's connect */
      .connect-section{
        position: relative;
        isolation: isolate;
        overflow: hidden;
        display: grid;
        grid-template-columns: minmax(0, 1.1fr) minmax(300px, .9fr);
        gap: clamp(44px, 8vw, 112px);
        align-items: end;
        background: var(--ink);
      }
      .connect-grid-pattern{
        position: absolute;
        z-index: -1;
        inset: 0;
        opacity: .42;
        pointer-events: none;
        background-image: linear-gradient(rgba(56,189,248,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,.025) 1px, transparent 1px);
        background-size: 36px 36px;
        mask-image: linear-gradient(to bottom, transparent, black 18%, black 82%, transparent);
      }
      .connect-content, .connect-social-area, .connect-footer-row{
        opacity: 0;
        transform: translateY(16px);
        transition: opacity .65s ease, transform .65s ease;
      }
      .connect-section.is-visible .connect-content,
      .connect-section.is-visible .connect-social-area,
      .connect-section.is-visible .connect-footer-row{ opacity: 1; transform: translateY(0); }
      .connect-section.is-visible .connect-social-area{ transition-delay: .14s; }
      .connect-section.is-visible .connect-footer-row{ transition-delay: .42s; }
      .connect-title{ max-width: 650px; font-size: clamp(42px, 6vw, 76px); line-height: 1.04; }
      .connect-intro{ max-width: 48ch; margin-top: 22px; color: var(--muted); font-size: 18px; line-height: 1.65; }
      .connect-cta{
        display: inline-flex;
        align-items: center;
        gap: 9px;
        margin-top: 30px;
        border: 1px solid var(--blue);
        border-radius: 999px;
        padding: 13px 20px;
        background: var(--blue);
        color: white;
        font: inherit;
        font-size: 12px;
        cursor: pointer;
        transition: transform .2s ease, background .2s ease, box-shadow .2s ease;
      }
      .connect-cta span{ transition: transform .2s ease; }
      .connect-cta:hover{ transform: translateY(-2px); background: #3b7bf2; box-shadow: 0 8px 20px rgba(47,111,237,.22); }
      .connect-cta:hover span{ transform: translateX(3px); }
      .connect-label{ margin-bottom: 16px; color: var(--cyan); font-size: 12px; letter-spacing: .12em; }
      .social-grid{ display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
      .social-link{
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 11px;
        min-height: 58px;
        padding: 12px 14px;
        border: 1px solid rgba(232,236,244,.12);
        border-radius: 7px;
        color: var(--text);
        font-size: 13px;
        text-decoration: none;
        transition: transform .22s ease, color .22s ease, border-color .22s ease, background .22s ease, box-shadow .22s ease;
      }
      .social-link:hover, .social-link:focus-visible{
        transform: translateY(-3px);
        color: var(--text);
        border-color: rgba(56,189,248,.58);
        background: rgba(56,189,248,.055);
        box-shadow: 0 8px 18px rgba(0,0,0,.14);
      }
      .social-icon{ display: inline-grid; place-items: center; width: 22px; height: 22px; color: var(--cyan); font-family: 'Space Grotesk', sans-serif; font-size: 12px; font-weight: 700; transition: transform .22s ease; }
      .social-icon svg{ display: block; width: 18px; height: 18px; }
      .social-link:hover .social-icon, .social-link:focus-visible .social-icon{ transform: translateY(-2px); }
      .social-arrow{ color: var(--cyan); font-size: 16px; transition: transform .22s ease; }
      .social-link:hover .social-arrow, .social-link:focus-visible .social-arrow{ transform: translate(3px, -2px); }
      .connect-footer-row{ grid-column: 1 / -1; display: flex; align-items: center; justify-content: space-between; gap: 24px; padding-top: 28px; border-top: 1px solid rgba(232,236,244,.1); }
      .connect-status{ display: inline-flex; align-items: center; gap: 8px; color: var(--muted); font-size: 11px; letter-spacing: .07em; }
      .connect-status > span{ width: 7px; height: 7px; border-radius: 50%; background: #4ADE80; box-shadow: 0 0 0 rgba(74,222,128,.5); animation: connectStatusPulse 2.4s ease-out infinite; }
      @keyframes connectStatusPulse{ 70%{ box-shadow: 0 0 0 7px rgba(74,222,128,0); } }
      .connect-flow{ position: relative; display: flex; align-items: center; gap: 12px; color: var(--muted); font-size: 10px; letter-spacing: .1em; }
      .connect-flow i{ width: clamp(24px, 4vw, 62px); height: 1px; background: rgba(56,189,248,.4); position: relative; overflow: hidden; }
      .connect-flow i::after{ content: ''; position: absolute; inset: 0; width: 16px; background: var(--cyan); transform: translateX(-100%); animation: connectFlow 4.8s linear infinite; }
      .connect-flow i:nth-of-type(2)::after{ animation-delay: 1.6s; }
      .connect-particle{ position: absolute; left: 25%; top: 50%; width: 5px; height: 5px; border-radius: 50%; background: var(--cyan); box-shadow: 0 0 9px var(--cyan); transform: translate(-50%, -50%); animation: connectParticle 4.8s linear infinite; }
      @keyframes connectFlow{ to{ transform: translateX(500%); } }
      @keyframes connectParticle{ 0%{ left: 22%; opacity: 0; } 12%, 82%{ opacity: 1; } 100%{ left: 78%; opacity: 0; } }

      .footer{
        padding: 24px clamp(20px, 6vw, 80px) 36px;
        font-size: 13px;
        color: var(--muted);
        background: var(--ink);
      }

      @media (max-width: 760px){
        .page{ --nav-height: 65px; }
        .nav{ padding: 16px 20px; }
        .nav-mark{ font-size: 17px; }
        .nav-links{ gap: 10px; }
        .nav-cta{ padding: 9px 12px; font-size: 12px; }
        .theme-toggle{ width: 40px; }
        .hero{ flex-direction: column; align-items: flex-start; padding-top: 120px; padding-bottom: 60px; min-height: auto; }
        .rings-wrap{ position: relative; right: auto; top: auto; transform: none; width: 60vw; margin: 32px auto 0; opacity: 0.7; }
      }

      @media (prefers-reduced-motion: reduce){
        .hero-copy, .btn-primary{ transition: none !important; }
        .page.is-theme-transitioning::after{ animation: none; opacity: 0; }
        .page.is-theme-transitioning, .page.is-theme-transitioning *{ transition-duration: .01ms !important; }
      }

      /* ---------- HERO v2 (spec redesign) ---------- */
      .hero{
        min-height: auto;
        display: block;
        padding: 56px clamp(20px, 6vw, 80px) 40px;
      }
      .hero-grid{
        display: grid;
        grid-template-columns: minmax(0, 620px) minmax(300px, 420px);
        gap: clamp(56px, 8vw, 120px);
        align-items: center;
        min-height: 72vh;
      }
      .hero-copy, .hero-visual{
        opacity: 0;
        transform: translateY(14px);
        transition: opacity .6s ease, transform .6s ease;
      }
      .hero-copy.is-in{ opacity: 1; transform: translateY(0); }
      .hero-visual.is-in{ opacity: 1; transform: translateY(0); transition-delay: .15s; }

      .status{
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        letter-spacing: 0.04em;
        color: var(--muted);
        margin-bottom: 20px;
        border: 1px solid rgba(232,236,244,0.14);
        padding: 6px 12px;
        border-radius: 999px;
      }
      .status-dot{
        width: 7px; height: 7px;
        border-radius: 50%;
        background: #4ADE80;
        box-shadow: 0 0 0 0 rgba(74,222,128,0.6);
        animation: statusPulse 2.4s ease-out infinite;
      }
      @keyframes statusPulse{
        0%{ box-shadow: 0 0 0 0 rgba(74,222,128,0.55); }
        70%{ box-shadow: 0 0 0 7px rgba(74,222,128,0); }
        100%{ box-shadow: 0 0 0 0 rgba(74,222,128,0); }
      }

      .btn-arrow{ display: inline-block; transition: transform .2s ease; }
      .btn-primary:hover .btn-arrow{ transform: translateX(3px); }
      .btn-ghost{
        background: none;
        border: none;
        cursor: pointer;
        font-family: inherit;
      }
      .btn-ghost{ position: relative; }
      .btn-ghost::after{
        content: '';
        position: absolute;
        left: 0; bottom: -2px;
        width: 100%; height: 1px;
        background: var(--cyan);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform .2s ease;
      }
      .btn-ghost:hover{ color: var(--cyan); }
      .btn-ghost:hover::after{ transform: scaleX(1); }

      /* radar */
      .radar-wrap{
        position: relative;
        width: min(100%, 380px);
        aspect-ratio: 1;
        margin: 0 auto;
      }
      .radar-rings{
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .ring{
        position: absolute;
        border: 1px solid rgba(56,189,248,0.35);
        border-radius: 50%;
      }
      .ring-1{ width: 40%; height: 40%; }
      .ring-2{ width: 70%; height: 70%; border-color: rgba(56,189,248,0.22); }
      .ring-3{ width: 100%; height: 100%; border-color: rgba(56,189,248,0.12); }
      .radar-sweep{
        position: absolute;
        width: 50%; height: 2px;
        left: 50%; top: 50%;
        background: linear-gradient(90deg, var(--cyan), transparent);
        transform-origin: left center;
        animation: sweep 6s linear infinite;
        opacity: 0.7;
      }
      @keyframes sweep{ to{ transform: rotate(360deg); } }
      .radar-node{
        position: absolute;
        width: 5px; height: 5px;
        border-radius: 50%;
        background: var(--cyan);
        box-shadow: 0 0 6px var(--cyan);
      }
      .node-1{ top: 18%; left: 62%; animation: orbit1 9s linear infinite; }
      .node-2{ top: 70%; left: 30%; animation: orbit2 12s linear infinite; }
      .node-3{ top: 40%; left: 12%; animation: orbit1 14s linear infinite reverse; }
      @keyframes orbit1{ from{ transform: rotate(0deg) translateX(6px) rotate(0deg); } to{ transform: rotate(360deg) translateX(6px) rotate(-360deg); } }
      @keyframes orbit2{ from{ transform: rotate(0deg) translateX(4px) rotate(0deg); } to{ transform: rotate(-360deg) translateX(4px) rotate(360deg); } }
      .radar-center{
        position: relative;
        z-index: 2;
        width: 42%;
        aspect-ratio: 1;
        border-radius: 50%;
        background: var(--navy2);
        border: 1px solid rgba(56,189,248,0.4);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        animation: centerPulse 3.2s ease-in-out infinite;
      }
      @keyframes centerPulse{
        0%, 100%{ box-shadow: 0 0 0 0 rgba(56,189,248,0.25); }
        50%{ box-shadow: 0 0 0 10px rgba(56,189,248,0); }
      }
      .radar-center-name{ font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px; letter-spacing: 0.04em; }
      .radar-center-role{ font-size: 11px; color: var(--muted); margin-top: 4px; }

      .radar-label{
        position: absolute;
        font-size: 11px;
        letter-spacing: 0.04em;
        color: var(--muted);
        background: rgba(10,15,30,0.7);
        border: 1px solid rgba(232,236,244,0.12);
        padding: 5px 10px;
        border-radius: 999px;
        cursor: default;
        transition: color .2s ease, border-color .2s ease, transform .2s ease;
      }
      .radar-label:hover, .radar-label:focus-visible{
        color: var(--text);
        border-color: var(--cyan);
        transform: translateY(-2px);
      }
      .pos-top{ top: -4%; left: 50%; transform: translateX(-50%); }
      .pos-left{ top: 30%; left: -12%; }
      .pos-right{ top: 30%; right: -14%; }
      .pos-bottom{ bottom: -6%; left: 50%; transform: translateX(-50%); }
      .pos-bottom-right{ bottom: 4%; right: -18%; }

      .radar-tooltip{
        position: absolute;
        left: 50%;
        bottom: calc(100% + 10px);
        transform: translateX(-50%) translateY(4px);
        background: var(--navy2);
        border: 1px solid rgba(56,189,248,0.3);
        border-radius: 8px;
        padding: 10px 12px;
        width: 180px;
        display: flex;
        flex-direction: column;
        gap: 3px;
        font-size: 12px;
        color: var(--muted);
        opacity: 0;
        pointer-events: none;
        transition: opacity .2s ease, transform .2s ease;
        z-index: 5;
      }
      .radar-tooltip strong{ color: var(--text); font-size: 13px; }
      .radar-label:hover .radar-tooltip,
      .radar-label:focus-visible .radar-tooltip{
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }

      /* expertise strip + scroll indicator */
      .hero-bottom{
        margin-top: clamp(28px, 5vw, 56px);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 28px;
      }
      .expertise-strip{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        font-size: 12px;
        letter-spacing: 0.08em;
        color: var(--muted);
        max-width: 100%;
        overflow-x: auto;
        padding-bottom: 4px;
      }
      .expertise-dot{ margin-left: 10px; color: rgba(56,189,248,0.5); }
      .scroll-indicator{
        background: none;
        border: none;
        color: var(--muted);
        font-size: 11px;
        letter-spacing: 0.08em;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        font-family: inherit;
      }
      .scroll-indicator:hover{ color: var(--text); }
      .scroll-arrow{ animation: scrollBounce 2s ease-in-out infinite; }
      @keyframes scrollBounce{
        0%, 100%{ transform: translateY(0); }
        50%{ transform: translateY(4px); }
      }

      @media (max-width: 900px){
        .hero-grid{ grid-template-columns: 1fr; }
        .hero-visual{ order: 2; }
        .radar-wrap{ margin-top: 12px; }
        .pos-left{ left: 2%; }
        .pos-right{ right: 2%; }
        .pos-bottom-right{ right: 2%; }
        .about-main{ grid-template-columns: 1fr; gap: 52px; }
        .developer-card{ max-width: 560px; width: 100%; margin: 0 auto; }
        .work-steps{ grid-template-columns: repeat(2, 1fr); row-gap: 28px; }
        .work-step:nth-of-type(2){ border-right: none; }
        .work-step:nth-of-type(3){ border-top: 1px solid rgba(232,236,244,0.12); padding-top: 52px; }
        .work-step:nth-of-type(4){ border-top: 1px solid rgba(232,236,244,0.12); padding-top: 52px; }
        .showcase-project, .showcase-project:not(.showcase-project-featured){ grid-template-columns: 1fr; }
        .showcase-project:not(.showcase-project-featured) .project-visual{ min-height: 240px; }
        .contact-main{ grid-template-columns: 1fr; gap: 56px; }
        .contact-form{ max-width: 680px; width: 100%; }
        .connect-section{ grid-template-columns: 1fr; gap: 52px; }
        .connect-footer-row{ align-items: flex-start; flex-direction: column; }
      }

      @media (max-width: 560px){
        .about-title{ font-size: clamp(32px, 10vw, 44px); }
        .about-copy p{ font-size: 16px; }
        .how-head{ display: block; }
        .how-summary{ margin-top: 12px; }
        .work-steps{ grid-template-columns: 1fr; }
        .work-step, .work-step:not(:first-of-type), .work-step:nth-of-type(2), .work-step:nth-of-type(3), .work-step:nth-of-type(4){
          border-right: none;
          border-top: 1px solid rgba(232,236,244,0.12);
          padding: 52px 0 0 32px;
        }
        .work-step:first-of-type{ border-top: none; }
        .work-steps{ padding-left: 0; }
        .work-steps::before{
          top: 30px;
          bottom: 30px;
          left: 8px;
          right: auto;
          width: 1px;
          height: auto;
          transform: scaleY(0);
          transform-origin: top;
        }
        .about-section.is-visible .work-steps::before{ transform: scaleY(1); }
        .workflow-particle{
          top: 30px;
          left: 8px;
          transform: translate(-50%, -50%);
        }
        .about-section.is-visible .workflow-particle{ animation-name: workflowParticleVertical; }
        .work-step-node{ left: 8px; top: 26px; }
        .projects-heading{ margin-bottom: 36px; }
        .projects-intro{ font-size: 16px; }
        .showcase-project{ flex-basis: calc(100vw - 56px); }
        .project-visual, .archive-visual, .memories-visual, .sensor-visual{ min-height: 230px; }
        .project-info{ padding: 24px 20px 28px; }
        .project-meta{ align-items: flex-start; flex-direction: column; gap: 7px; }
        .project-meta span:last-child{ text-align: left; }
        .project-info h3{ margin-top: 22px; font-size: 30px; }
        .project-details{ gap: 18px; }
        .projects-scroll-meta{ align-items: flex-start; }
        .contact-page-title{ font-size: clamp(38px, 11vw, 56px); }
        .contact-page-intro{ font-size: 16px; }
        .contact-flow{ align-items: flex-start; flex-direction: column; gap: 0; margin: 72px 0; padding-left: 8px; }
        .contact-flow-step{ position: relative; min-height: 42px; gap: 10px; }
        .contact-flow-step i{ width: 1px; height: 28px; margin: 0; position: absolute; top: 14px; left: 3px; }
        .contact-flow-step i::after{ width: 1px; height: 10px; transform: translateY(-100%); animation-name: flowDataVertical; }
        .connect-title{ font-size: clamp(38px, 11vw, 56px); }
        .connect-intro{ font-size: 16px; }
        .social-grid{ grid-template-columns: 1fr; }
        .social-link{ min-height: 62px; }
        .connect-flow{ width: 100%; justify-content: space-between; gap: 8px; }
        .connect-flow i{ flex: 1; min-width: 18px; }
      }

      @keyframes flowDataVertical{ to{ transform: translateY(350%); } }

      @keyframes workflowParticleVertical{
        0%, 8%{ top: 30px; opacity: 0; }
        16%, 84%{ opacity: 1; }
        92%, 100%{ top: calc(100% - 30px); opacity: 0; }
      }

      @media (prefers-reduced-motion: reduce){
        .hero-copy, .hero-visual, .status-dot, .radar-sweep, .radar-node,
        .radar-center, .scroll-arrow, .developer-card, .flow-particle, .work-step,
        .workflow-particle, .work-step-node,
        .about-kicker, .about-title, .about-copy, .how-i-work, .about-closing,
        .projects-kicker, .projects-title, .projects-intro, .showcase-project, .projects-scroll-meta,
        .archive-pulse, .waveform i, .contact-eyebrow, .contact-page-title, .contact-page-intro,
        .contact-info, .contact-form, .contact-flow, .contact-final-cta, .conversation-status span,
        .contact-flow-node, .contact-flow-step i::after, .connect-content, .connect-social-area,
        .connect-footer-row, .connect-status > span, .connect-flow i::after, .connect-particle{
          animation: none !important;
          transition: none !important;
        }
        .hero-copy, .hero-visual{ opacity: 1 !important; transform: none !important; }
        .about-kicker, .about-title, .about-copy, .developer-card, .how-i-work, .about-closing{
          opacity: 1 !important;
          transform: none !important;
        }
        .work-step{ opacity: 1 !important; transform: none !important; }
        .work-step-number::after{ transform: scaleX(1); }
        .work-steps::before{ opacity: .42; transform: none; }
        .work-step-node{ background: var(--navy2); box-shadow: none; }
        .projects-kicker, .projects-title, .projects-intro, .showcase-project, .projects-scroll-meta{ opacity: 1 !important; transform: none !important; }
        .contact-eyebrow, .contact-page-title, .contact-page-intro, .contact-info, .contact-form, .contact-flow, .contact-final-cta{ opacity: 1 !important; transform: none !important; }
        .contact-flow-step i::after{ animation: none !important; transform: none !important; }
        .connect-content, .connect-social-area, .connect-footer-row{ opacity: 1 !important; transform: none !important; }
      }
    `}</style>
  );
}
