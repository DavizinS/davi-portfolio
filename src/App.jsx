import { useState, useEffect, useRef } from "react";
import "./App.css";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SKILLS = [
  {
    id: "reactjs", label: <IconReact />, name: "React", area: "front",
    desc: "Interfaces modernas, SSR, landing pages e sistemas web com performance de produção.",
    tags: ["React 19", "Next.js 14", "Tailwind"], projects: 2,
  },
  {
    id: "csharp", label: <IconCsharp />, name: "C# / .NET", area: "back",
    desc: "Back-end robusto, APIs RESTful e sistemas corporativos com ASP.NET Core.",
    tags: [".NET 8", "ASP.NET Core", "EF Core"], projects: 2,
  },
  {
    id: "sql", label: <IconDB />, name: "SGBD", area: "back",
    desc: "Modelagem relacional, queries otimizadas e arquitetura de dados.",
    tags: ["PostgreSQL", "Modelagem", "Migrations"], projects: 3,
  },
  {
    id: "git", label: <IconGit />, name: "Git & APIs", area: "tools",
    desc: "Versionamento profissional, integração com APIs externas e Firebase.",
    tags: ["Git/GitHub", "REST", "Firebase"], projects: 4,
  },
  {
    id: "java", label: <IconJava />, name: "Java", area: "back",
    desc: "Aprendendo orientação a objetos, estruturas de dados e back-end Java. Cursando na Faetec.",
    tags: ["POO", "Faetec", "Em curso"],
    learning: true,
    iconStyle: { background: "rgba(249,115,22,.08)", borderColor: "rgba(249,115,22,.2)", color: "#fb923c" },
  },
];

const SKILL_AREAS = [
  { id: "all",   label: "Todos" },
  { id: "front", label: "Front-end" },
  { id: "back",  label: "Back-end" },
  { id: "data",  label: "Dados / Auto." },
  { id: "tools", label: "Ferramentas" },
];

const PROJECTS = [
  {
    id: "encontravagas", num: "001", name: "EncontraVagas.Rio",
    desc: "Plataforma de vagas de emprego focada no Rio de Janeiro. Motor de busca por profissão, filtro por cidade, publicação de vagas pelas empresas e painel de gerenciamento.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Vercel"],
    link: "https://encontravagas.rio",
    img: "/encontravagas-logo.png",
    LogoFallback: () => (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "3rem", height: "3rem" }}>
        <rect width="60" height="60" rx="12" fill="rgba(19,51,90,0.6)" />
        <path d="M12 30h36M12 22h24M12 38h28" stroke="#42b9eb" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="44" cy="22" r="5" fill="#f5a623" />
        <circle cx="44" cy="22" r="2.5" fill="#1a082d" />
      </svg>
    ),
  },
  {
    id: "mensalink", num: "002", name: "MensaLink",
    desc: "SaaS de gestão de pagamentos escolares. Sistema completo para controle de mensalidades, notificações automáticas e relatórios financeiros para instituições de ensino.",
    tech: ["C# / .NET", "PostgreSQL", "Automação"],
    link: "https://mensalink.com.br",
    img: "/mensalink.png",
    LogoFallback: () => (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "3rem", height: "3rem" }}>
        <rect width="60" height="60" rx="12" fill="rgba(60,232,204,0.08)" />
        <rect x="12" y="16" width="36" height="28" rx="4" stroke="#3ce8cc" strokeWidth="2.5" />
        <path d="M20 26l6 5 14-10" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "shopee", num: "003", name: "Shopee Xpress",
    desc: "Sistema de análise logística com tracking de performance para operações Shopee. Dashboards de KPIs e automação de relatórios operacionais.",
    tech: ["Python", "Excel/VBA", "Análise de dados"],
    link: null,
    img: "/shopee-logo.png",
    LogoFallback: () => (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "2.2rem", height: "2.2rem" }}>
        <rect width="60" height="60" rx="12" fill="rgba(249,115,22,0.08)" />
        <path d="M18 24h24l-3 16H21L18 24z" stroke="#fb923c" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M24 24c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#fb923c" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="25" cy="40" r="1.5" fill="#fb923c" />
        <circle cx="35" cy="40" r="1.5" fill="#fb923c" />
      </svg>
    ),
  },
];

const SOCIALS = [
  {
    label: "LinkedIn", href: "https://www.linkedin.com/in/davisantosrj",
    icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>),
  },
  {
    label: "Instagram", href: "https://www.instagram.com/dev.davirj",
    icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>),
  },
  {
    label: "WhatsApp", href: "https://wa.me/5521959294663",
    icon: (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>),
  },
];

/* ─────────────────────────────────────────────
   SERVIÇOS DATA
───────────────────────────────────────────── */
const SERVICOS = [
  {
    id: "landing",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    name: "Landing Page",
    tagline: "Converte visitante em cliente",
    deliveries: ["Design focado em conversão", "Responsivo e rápido", "Formulário / CTA integrado", "Deploy em produção"],
    prazo: "3–7 dias",
    prazoColor: "var(--teal)",
  },
  {
    id: "institucional",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    name: "Site Institucional",
    tagline: "Presença digital profissional",
    deliveries: ["Múltiplas páginas", "Portfólio / Galeria", "SEO básico configurado", "Painel simples de edição"],
    prazo: "7–14 dias",
    prazoColor: "var(--amber)",
  },
  {
    id: "sistema",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    name: "Sistema Web",
    tagline: "Automação e gestão de negócios",
    deliveries: ["Dashboard completo", "Autenticação segura", "API RESTful própria", "Banco de dados robusto"],
    prazo: "15–45 dias",
    prazoColor: "#fb923c",
  },
  {
    id: "automacao",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    ),
    name: "Automação",
    tagline: "Elimine tarefas repetitivas",
    deliveries: ["Bots e scripts Python", "Integração de sistemas", "Relatórios automáticos", "Notificações e alertas"],
    prazo: "5–20 dias",
    prazoColor: "var(--teal)",
  },
];

/* ─────────────────────────────────────────────
   CALCULADORA DATA
───────────────────────────────────────────── */
const CALC_SERVICOS = [
  {
    id: "landing",
    label: "Landing Page",
    min: 79.99,
    max: 499,
    levels: [
      { range: [0, 33],  label: "Simples",    desc: "1 seção, design padrão, formulário básico" },
      { range: [34, 66], label: "Completa",   desc: "5–8 seções, animações, integração de CTA" },
      { range: [67, 100], label: "Premium",   desc: "Seções ilimitadas, animações avançadas, A/B" },
    ],
  },
  {
    id: "institucional",
    label: "Site Institucional",
    min: 299,
    max: 1299,
    levels: [
      { range: [0, 33],  label: "Básico",     desc: "Até 4 páginas, blog simples, contato" },
      { range: [34, 66], label: "Profissional", desc: "Até 8 páginas, SEO, portfólio, painel" },
      { range: [67, 100], label: "Enterprise", desc: "Páginas ilimitadas, multi-idioma, CMS" },
    ],
  },
  {
    id: "sistema",
    label: "Sistema Web",
    min: 599,
    max: 3499,
    levels: [
      { range: [0, 33],  label: "MVP",        desc: "CRUD básico, auth, dashboard simples" },
      { range: [34, 66], label: "Completo",   desc: "Relatórios, notificações, API pública" },
      { range: [67, 100], label: "Avançado",  desc: "Microserviços, integrações, escalável" },
    ],
  },
];

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, particles = [], raf;
    const CHARS = ["</", "{}", "=>", "&&", "||", "()", "[]", "/*", "*/", "01", "10", ">>"];
    const COLORS = ["rgba(245,166,35,", "rgba(60,232,204,", "rgba(232,234,240,"];

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    function spawn() {
      return {
        x: Math.random() * W, y: Math.random() * H,
        char: CHARS[Math.floor(Math.random() * CHARS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.4 + 0.05,
        size: Math.random() * 9 + 7,
        speed: Math.random() * 0.25 + 0.05,
        drift: (Math.random() - 0.5) * 0.3,
      };
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.font = `${p.size}px 'DM Mono', monospace`;
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fillText(p.char, p.x, p.y);
        p.y -= p.speed; p.x += p.drift;
        if (p.y < -20) Object.assign(p, spawn(), { y: H + 10 });
      });
      raf = requestAnimationFrame(draw);
    }
    resize();
    particles = Array.from({ length: 55 }, spawn);
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [canvasRef]);
}

function useCursor(cursorRef) {
  useEffect(() => {
    const cur = cursorRef.current;
    if (!cur || window.matchMedia("(pointer: coarse)").matches) return;
    let mx = -100, my = -100, raf;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const loop = () => {
      cur.style.left = mx + "px";
      cur.style.top = my + "px";
      raf = requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", onMove);
    loop();
    const targets = document.querySelectorAll("a, button, .project-item, .skill-card, .servico-card");
    const addBig = () => cur.classList.add("big");
    const rmBig  = () => cur.classList.remove("big");
    targets.forEach((el) => { el.addEventListener("mouseenter", addBig); el.addEventListener("mouseleave", rmBig); });
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      targets.forEach((el) => { el.removeEventListener("mouseenter", addBig); el.removeEventListener("mouseleave", rmBig); });
    };
  }, [cursorRef]);
}

function useReveal(dep) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll(".reveal:not(.visible)");
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
        }),
        { threshold: 0.12 }
      );
      els.forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    }, 20);
    return () => clearTimeout(timer);
  }, [dep]);
}

function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function calcPrice(servico, rangeVal) {
  const t = rangeVal / 100;
  const raw = servico.min + (servico.max - servico.min) * t;
  return Math.round(raw / 10) * 10;
}

function getLevel(servico, rangeVal) {
  return servico.levels.find(l => rangeVal >= l.range[0] && rangeVal <= l.range[1]);
}

function formatCurrency(val) {
  return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useNavScroll();
  const close = () => setOpen(false);

  return (
    <>
      <nav className={`nav${scrolled ? " nav--scrolled" : ""}`}>
        <a href="#hero" className="nav-logo">davi.dev</a>
        <ul className="nav-links">
          <li><a href="#skills"   onClick={close}>Skills</a></li>
          <li><a href="#servicos" onClick={close}>Serviços</a></li>
          <li><a href="#projetos" onClick={close}>Projetos</a></li>
          <li><a href="#sobre"    onClick={close}>Sobre</a></li>
          <li><a href="#contato"  onClick={close}>Contato</a></li>
        </ul>
        <div className="nav-right">
          {scrolled && (
            <a href="#contato" className="btn-primary nav-cta">
              Solicitar orçamento
            </a>
          )}
          <button className="nav-mobile-btn" onClick={() => setOpen(true)} aria-label="Abrir menu">
            ☰
          </button>
        </div>
      </nav>

      <div className={`nav-mobile-menu${open ? " open" : ""}`}>
        <button className="nav-mobile-close" onClick={close}>✕</button>
        <a href="#skills"   onClick={close}>Skills</a>
        <a href="#servicos" onClick={close}>Serviços</a>
        <a href="#projetos" onClick={close}>Projetos</a>
        <a href="#sobre"    onClick={close}>Sobre</a>
        <a href="#contato"  onClick={close}>Contato</a>
        <a href="#contato"  onClick={close} className="btn-primary" style={{ marginTop: "1rem" }}>
          Solicitar orçamento
        </a>
      </div>
    </>
  );
}

//HERO
function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-inner">
        <div className="hero-available hero-eyebrow">
          <span className="available-dot" />
          Disponível para novos projetos
        </div>

        <h1 className="hero-name">
          Davi<em>Santos.</em>
        </h1>

        <p className="hero-desc">
          Transformo ideias em software real que{" "}
          <span className="hero-desc-highlight">gera resultado</span>.
          Sites, sistemas e automações do zero ao deploy, com atenção ao detalhe que faz diferença.
        </p>

        <div className="hero-cta-row">
          <a href="#servicos" className="btn-primary">
            <IconArrow /> Ver serviços &amp; preços
          </a>
          <a href="#projetos" className="btn-ghost">Ver projetos</a>
        </div>

        {/* Trust bar */}
        <div className="hero-trust">
          <div className="trust-item">
            <span className="trust-num">3</span>
            <span className="trust-label">produtos lançados</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <span className="trust-num">2+</span>
            <span className="trust-label">anos de experiência</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <span className="trust-num">ADS</span>
            <span className="trust-label">Análise e Dev. Sistemas</span>
          </div>
          <div className="trust-divider" />
          <div className="trust-item">
            <span className="trust-num">RJ</span>
            <span className="trust-label">baseado no Rio</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll">scroll</div>
    </section>
  );
}

//SKILLS 
function Skills() {
  const [activeArea, setActiveArea] = useState("all");
  const filtered = activeArea === "all" ? SKILLS : SKILLS.filter(s => s.area === activeArea);
  useReveal(activeArea);

  return (
    <section id="skills" className="skills-bg">
      <div className="section">
        <div className="section-label"><span className="section-num">01</span> Stack</div>
        <h2 className="section-title reveal">Skills &amp;<br />Ferramentas</h2>
        <p className="skills-intro reveal">
          Focado em construir sistemas robustos e produtos que escalam. Tecnologias que uso no dia a dia:
        </p>

        {/* Area filter */}
        <div className="skills-filter reveal">
          {SKILL_AREAS.map(area => (
            <button
              key={area.id}
              className={`skills-filter-btn${activeArea === area.id ? " active" : ""}`}
              onClick={() => setActiveArea(area.id)}
            >
              {area.label}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filtered.map((s) => (
            <div key={s.id} className={`skill-card reveal${s.learning ? " skill-card--learning" : ""}`}>
              {s.learning && <span className="skill-learning-badge">Em andamento</span>}
              {s.projects && (
                <span className="skill-projects-badge">{s.projects} {s.projects === 1 ? "projeto" : "projetos"}</span>
              )}
              <div className="skill-icon-fallback" style={s.iconStyle || {}}>{s.label}</div>
              <p className="skill-name">{s.name}</p>
              <p className="skill-desc">{s.desc}</p>
              <div className="skill-tags">
                {s.tags.map((t) => (
                  <span key={t} className={`skill-tag${s.learning ? " skill-tag--learning" : ""}`}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Calculadora */
function Servicos() {
  const [ranges, setRanges] = useState({ landing: 30, institucional: 30, sistema: 30 });

  const setRange = (id, val) => setRanges(prev => ({ ...prev, [id]: Number(val) }));

  const handleOrcamento = () => {
    const selectEl = document.getElementById("cf-subject");
    if (selectEl) selectEl.value = "freelance";
    const msgEl = document.getElementById("cf-msg");
    const summary = CALC_SERVICOS.map(s => {
      const preco = calcPrice(s, ranges[s.id]);
      const nivel = getLevel(s, ranges[s.id]);
      return `${s.label} (${nivel?.label}): ${formatCurrency(preco)}`;
    }).join("\n");
    if (msgEl) msgEl.value = `Olá Davi! Tenho interesse em um orçamento.\n\nSimulação feita:\n${summary}\n\nGostaria de conversar sobre meu projeto.`;
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="servicos" className="servicos-bg">
      <div className="section">
        <div className="section-label"><span className="section-num">02</span> Serviços</div>
        <h2 className="section-title reveal">
          O que posso<br /><em>construir pra você.</em>
        </h2>
        <p className="servicos-intro reveal">
          Do simples ao complexo. Entrego software que funciona de verdade e que
          o seu cliente vai adorar usar. Preços a partir de{" "}
          <strong style={{ color: "var(--amber)" }}>R$ 79,99</strong>.
        </p>

        {/* Cards de serviço */}
        <div className="servicos-grid">
          {SERVICOS.map((s) => (
            <div key={s.id} className="servico-card reveal">
              <div className="servico-card-header">
                <div className="servico-icon">{s.icon}</div>
                <span className="servico-prazo" style={{ color: s.prazoColor }}>
                  {s.prazo}
                </span>
              </div>
              <h3 className="servico-name">{s.name}</h3>
              <p className="servico-tagline">{s.tagline}</p>
              <ul className="servico-list">
                {s.deliveries.map(d => (
                  <li key={d} className="servico-list-item">
                    <IconCheck /> {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Calculadora */}
        <div className="calc-wrapper reveal">
          <div className="calc-header">
            <div>
              <p className="calc-eyebrow">// Simule seu projeto</p>
              <h3 className="calc-title">Calculadora de preços</h3>
              <p className="calc-desc">Arraste os sliders e veja uma estimativa em tempo real. Preço final depende da conversa.</p>
            </div>
            <div className="calc-cta-wrap">
              <button className="btn-primary" onClick={handleOrcamento}>
                <IconArrow /> Solicitar orçamento
              </button>
              <p className="calc-cta-hint">// Preenche o formulário abaixo automaticamente</p>
            </div>
          </div>

          <div className="calc-sliders">
            {CALC_SERVICOS.map(s => {
              const val = ranges[s.id];
              const preco = calcPrice(s, val);
              const nivel = getLevel(s, val);
              const pct = ((val - 0) / 100) * 100;

              return (
                <div key={s.id} className="calc-item">
                  <div className="calc-item-top">
                    <div>
                      <p className="calc-item-label">{s.label}</p>
                      <p className="calc-item-level">
                        <span className="calc-level-dot" />
                        {nivel?.label} {nivel?.desc}
                      </p>
                    </div>
                    <div className="calc-item-price">
                      <span className="calc-price-value">{formatCurrency(preco)}</span>
                      <span className="calc-price-range">
                        {formatCurrency(s.min)} – {formatCurrency(s.max)}
                      </span>
                    </div>
                  </div>

                  <div className="calc-range-wrap">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={val}
                      onChange={e => setRange(s.id, e.target.value)}
                      className="calc-range"
                      style={{ "--pct": `${pct}%` }}
                    />
                    <div className="calc-range-labels">
                      <span>Simples</span>
                      <span>Intermediário</span>
                      <span>Avançado</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="calc-total">
            <p className="calc-total-label">// Estimativa total do projeto</p>
            <p className="calc-total-value">
              {formatCurrency(
                CALC_SERVICOS.reduce((acc, s) => acc + calcPrice(s, ranges[s.id]), 0)
              )}
            </p>
            <p className="calc-total-note">
              * Valor estimado. O preço real é definido após entender seu projeto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Meus Projetos */
function Projects() {
  return (
    <section id="projetos" className="projects-bg">
      <div className="section">
        <div className="section-label"><span className="section-num">03</span> Trabalho</div>
        <h2 className="section-title reveal">Projetos<br />selecionados.</h2>

        <div className="projects-list">
          {PROJECTS.map(({ id, num, name, desc, tech, link, img, LogoFallback }) => (
            <div key={id} className="project-item reveal">
              <div>
                <p className="project-num">{num}</p>
                <h3 className="project-name">{name}</h3>
                <p className="project-desc">{desc}</p>
                <div className="project-tech">
                  {tech.map((t) => (<span key={t} className="project-tag">{t}</span>))}
                </div>
                {link && (
                  <a href={link} target="_blank" rel="noreferrer" className="project-link">Ver projeto</a>
                )}
              </div>
              <div className="project-logo-wrap">
                <ProjectLogo img={img} alt={name} Fallback={LogoFallback} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectLogo({ img, alt, Fallback }) {
  const [broken, setBroken] = useState(false);
  if (broken) return <Fallback />;
  return <img src={img} alt={alt} onError={() => setBroken(true)} style={{ width: "100%", height: "100%", objectFit: "contain" }} />;
}

/* SOBRE */
function Sobre() {
  const [photoError, setPhotoError] = useState(false);
  return (
    <section id="sobre" className="sobre-bg">
      <div className="section">
        <div className="section-label"><span className="section-num">04</span> Sobre</div>
        <div className="sobre-grid">
          <div className="sobre-left">
            <div className="sobre-photo-wrap reveal">
              {!photoError ? (
                <img src="/avatar.png" alt="Davi Santos" onError={() => setPhotoError(true)} />
              ) : (
                <div className="sobre-photo-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                  <span>Minha foto<br />/avatar.png</span>
                </div>
              )}
              <div className="sobre-photo-glow" />
            </div>
          </div>
          <div>
            <h2 className="section-title reveal">Quem sou<br />eu.</h2>
            <div className="sobre-text reveal">
              <p>
                Estudante de{" "}
                <span className="sobre-highlight">Análise e Desenvolvimento de Sistemas</span>,
                apaixonado por construir produtos que resolvem problemas reais não só código que funciona.
              </p>
              <p>
                Foco em sistemas back-end sólidos, automações que economizam tempo e interfaces que fazem
                sentido para quem usa. Atualmente aprendendo{" "}
                <span className="sobre-highlight">Java</span> na Faetec.
              </p>
              <p>
                Baseado no <span className="sobre-highlight">Rio de Janeiro</span>. Disponível para
                projetos freelance e oportunidades full-time.
              </p>
            </div>
            <div className="sobre-stats">
              {[
                { num: "2+", label: "anos de experiência" },
                { num: "3",  label: "produtos lançados" },
                { num: "ADS", label: "estudante ativo" },
                { num: "RJ",  label: "baseado no Rio" },
              ].map(({ num, label }) => (
                <div key={label} className="stat-box reveal">
                  <p className="stat-num">{num}</p>
                  <p className="stat-label">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* CONTATO */
function Contato() {
  const [form, setForm]     = useState({ name: "", email: "", assunto: "", descricao: "" });
  const [status, setStatus] = useState(null);
  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.descricao.trim()) { setStatus("error"); return; }
    setStatus("loading");
    try {
      const resposta = await fetch(`${import.meta.env.VITE_API_URL}/api/contato`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (resposta.ok) {
        setStatus("success");
        setForm({ name: "", email: "", assunto: "", descricao: "" });
        setTimeout(() => setStatus(null), 5000);
      } else { setStatus("error"); }
    } catch { setStatus("error"); }
  }

  return (
    <section id="contato" className="contato-bg">
      <div className="section">
        <div className="section-label"><span className="section-num">05</span> Contato</div>
        <div className="contact-grid">
          <div>
            <h2 className="section-title reveal">Vamos trabalhar<br /><em>juntos?</em></h2>
            <p className="contact-info-text reveal">
              Aberto a projetos freelance, parcerias e oportunidades full-time.<br />
              Me conta sua ideia respondo rápido.
            </p>
            <div className="contact-direct reveal">
              {SOCIALS.map(({ label, href, icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="contact-direct-item">
                  {icon}{" "}
                  {label === "WhatsApp" ? "+55 (21) 95929-4663"
                    : label === "LinkedIn" ? "linkedin.com/in/davisantosrj"
                    : "@dev.davirj"}
                </a>
              ))}
            </div>
          </div>

          <form className="contact-form reveal" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="cf-name">Nome</label>
                <input className="form-input" id="cf-name" type="text" placeholder="Seu nome" value={form.name} onChange={set("name")} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cf-email">E-mail</label>
                <input className="form-input" id="cf-email" type="email" placeholder="seu@email.com" value={form.email} onChange={set("email")} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="cf-subject">Assunto</label>
              <select className="form-select" id="cf-subject" value={form.assunto} onChange={set("assunto")}>
                <option value="">Selecione um assunto…</option>
                <option value="freelance">Projeto Freelance</option>
                <option value="job">Oportunidade de emprego</option>
                <option value="parceria">Parceria / Colaboração</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="cf-msg">Mensagem</label>
              <textarea className="form-textarea" id="cf-msg" placeholder="Me conta sobre seu projeto ou oportunidade…" value={form.descricao} onChange={set("descricao")} required />
            </div>
            <div className="form-submit">
              <div>
                <p className="form-note">// Preparado para enviar? Haha.</p>
                {status === "loading" && <p className="form-status loading">// Aguarda só um pouquinho...</p>}
                {status === "success" && <p className="form-status success">// Pronto! Você não vai se arrepender rs.</p>}
                {status === "error"   && <p className="form-status error">// Preencha nome, e-mail e mensagem.</p>}
              </div>
              <button type="submit" className="btn-primary" disabled={status === "loading"}>
                <IconSend /> {status === "loading" ? "Enviando..." : "Enviar formulário."}
              </button>
            </div>
          </form>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 DAVI SANTOS TODOS OS DIREITOS RESERVADOS</p>
          <p className="footer-built">Construído com <span>curiosidade</span> &amp; café</p>
        </div>
      </div>
    </section>
  );
}

/* ICONES */
function IconArrow() {
  return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>);
}
function IconSend() {
  return (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" /></svg>);
}
function IconCheck() {
  return (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>);
}
function IconJava() {
  return (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.0497 8.44062C22.6378 3.32607 19.2566 0 19.2566 0C19.7598 5.28738 13.813 6.53583 12.2189 10.1692C11.1312 12.6485 12.9638 14.8193 16.0475 17.5554C15.7749 16.9494 15.3544 16.3606 14.9288 15.7645C13.4769 13.7313 11.9645 11.6132 16.0497 8.44062Z" fill="#E76F00"/>
  <path d="M17.1015 18.677C17.1015 18.677 19.0835 17.0779 17.5139 15.3008C12.1931 9.27186 23.3333 6.53583 23.3333 6.53583C16.5317 9.8125 17.5471 11.7574 19.2567 14.1202C21.0871 16.6538 17.1015 18.677 17.1015 18.677Z" fill="#E76F00"/>
  <path d="M22.937 23.4456C29.0423 20.3258 26.2195 17.3278 24.2492 17.7317C23.7662 17.8305 23.5509 17.9162 23.5509 17.9162C23.5509 17.9162 23.7302 17.64 24.0726 17.5204C27.9705 16.1729 30.9682 21.4949 22.8143 23.6028C22.8143 23.6029 22.9088 23.5198 22.937 23.4456Z" fill="#5382A1"/>
  <path d="M10.233 19.4969C6.41312 18.9953 12.3275 17.6139 12.3275 17.6139C12.3275 17.6139 10.0307 17.4616 7.20592 18.8043C3.86577 20.3932 15.4681 21.1158 21.474 19.5625C22.0984 19.1432 22.9614 18.7798 22.9614 18.7798C22.9614 18.7798 20.5037 19.2114 18.0561 19.4145C15.0612 19.6612 11.8459 19.7093 10.233 19.4969Z" fill="#5382A1"/>
  <path d="M11.6864 22.4758C9.55624 22.2592 10.951 21.2439 10.951 21.2439C5.43898 23.0429 14.0178 25.083 21.7199 22.8682C20.9012 22.5844 20.3806 22.0653 20.3806 22.0653C16.6163 22.7781 14.441 22.7553 11.6864 22.4758Z" fill="#5382A1"/>
  <path d="M12.6145 25.6991C10.486 25.4585 11.7295 24.7474 11.7295 24.7474C6.72594 26.1222 14.7729 28.9625 21.1433 26.2777C20.0999 25.8787 19.3528 25.4181 19.3528 25.4181C16.5111 25.9469 15.1931 25.9884 12.6145 25.6991Z" fill="#5382A1"/>
  <path d="M25.9387 27.3388C25.9387 27.3388 26.8589 28.0844 24.9252 28.6612C21.2481 29.7566 9.62093 30.0874 6.39094 28.7049C5.22984 28.2082 7.40723 27.5189 8.09215 27.3742C8.80646 27.2219 9.21466 27.2503 9.21466 27.2503C7.9234 26.3558 0.868489 29.0067 5.63111 29.7659C18.6195 31.8372 29.3077 28.8331 25.9387 27.3388Z" fill="#5382A1"/>
  <path d="M28 28.9679C27.7869 31.6947 18.7877 32.2683 12.9274 31.8994C9.10432 31.6583 8.33812 31.0558 8.32691 31.047C11.9859 31.6402 18.1549 31.7482 23.1568 30.8225C27.5903 30.0016 28 28.9679 28 28.9679Z" fill="#5382A1"/>
  </svg>
  )
}
function IconCsharp() {
  return (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27.6947 22.9999C27.883 22.6617 28 22.2807 28 21.9385V10.0613C28 9.71913 27.8831 9.33818 27.6947 9L16 16L27.6947 22.9999Z" fill="#7F3A86"/>
    <path d="M17.0395 29.7433L26.9611 23.8047C27.2469 23.6336 27.5067 23.3382 27.695 23L16.0003 16L4.30566 23C4.49398 23.3382 4.75382 23.6337 5.03955 23.8047L14.9611 29.7433C15.5326 30.0855 16.468 30.0855 17.0395 29.7433Z" fill="#662579"/>
    <path d="M27.6947 8.99996C27.5064 8.6617 27.2465 8.36629 26.9608 8.19521L17.0392 2.25662C16.4677 1.91446 15.5323 1.91446 14.9608 2.25662L5.03922 8.19521C4.46761 8.53729 4 9.37709 4 10.0613V21.9386C4 22.2807 4.11694 22.6618 4.30533 23L16 16L27.6947 8.99996Z" fill="#9A5196"/>
    <path d="M16.0385 24C11.6061 24 8 20.4112 8 16C8 11.5888 11.6061 8 16.0385 8C18.8458 8 21.4674 9.47569 22.919 11.8618L19.4765 13.9265C18.7492 12.736 17.4399 12 16.0385 12C13.8222 12 12.0193 13.7944 12.0193 16C12.0193 18.2056 13.8222 20 16.0385 20C17.4362 20 18.7421 19.2681 19.4707 18.0832L22.9205 20.1359C21.4692 22.5234 18.8467 24 16.0385 24Z" fill="white"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M25.0001 13V13.9974H22.9999V13H22.0001V13.9974H21V15H22.0001V16.9948H21V18H22.0001V19H22.9999L23 18H25.0001V19H25.9999V18H27V17H25.9999V15H27V13.9974H25.9999V13H25.0001ZM25.0001 17V15H22.9999V16.9948L25.0001 17Z" fill="white"/>
    </svg>
  )
}
function IconDB() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 18V6" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M20 12L20 18" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M12 10C16.4183 10 20 8.20914 20 6C20 3.79086 16.4183 2 12 2C7.58172 2 4 3.79086 4 6C4 8.20914 7.58172 10 12 10Z" stroke="#1C274C" stroke-width="1.5"/>
    <path d="M20 12C20 14.2091 16.4183 16 12 16C7.58172 16 4 14.2091 4 12" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M20 18C20 20.2091 16.4183 22 12 22C7.58172 22 4 20.2091 4 18" stroke="#1C274C" stroke-width="1.5"/>
    </svg>
  )
}
function IconGit() {
  return (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.58536 17.4132C1.80488 16.6327 1.80488 15.3673 2.58536 14.5868L14.5868 2.58536C15.3673 1.80488 16.6327 1.80488 17.4132 2.58536L29.4146 14.5868C30.1951 15.3673 30.1951 16.6327 29.4146 17.4132L17.4132 29.4146C16.6327 30.1951 15.3673 30.1951 14.5868 29.4146L2.58536 17.4132Z" fill="#EE513B"/>
    <path d="M12.1489 5.06152L10.9336 6.27686L14.0725 9.41577C13.9455 9.68819 13.8746 9.99201 13.8746 10.3124C13.8746 11.222 14.4461 11.9981 15.2496 12.3012V19.9798C14.4461 20.2829 13.8746 21.059 13.8746 21.9686C13.8746 23.1422 14.826 24.0936 15.9996 24.0936C17.1732 24.0936 18.1246 23.1422 18.1246 21.9686C18.1246 21.144 17.6549 20.429 16.9684 20.0768V12.3117L19.9689 15.3122C19.8481 15.5791 19.7809 15.8754 19.7809 16.1874C19.7809 17.361 20.7323 18.3124 21.9059 18.3124C23.0795 18.3124 24.0309 17.361 24.0309 16.1874C24.0309 15.0138 23.0795 14.0624 21.9059 14.0624C21.6778 14.0624 21.4582 14.0983 21.2522 14.1648L18.0297 10.9423C18.0914 10.7433 18.1246 10.5317 18.1246 10.3124C18.1246 9.13878 17.1732 8.18738 15.9996 8.18738C15.7803 8.18738 15.5688 8.22061 15.3697 8.2823L12.1489 5.06152Z" fill="white"/>
    </svg>
  )
}
function IconReact() {
  return (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.6789 15.9759C18.6789 14.5415 17.4796 13.3785 16 13.3785C14.5206 13.3785 13.3211 14.5415 13.3211 15.9759C13.3211 17.4105 14.5206 18.5734 16 18.5734C17.4796 18.5734 18.6789 17.4105 18.6789 15.9759Z" fill="#53C1DE"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.7004 11.1537C25.2661 8.92478 25.9772 4.79148 23.4704 3.39016C20.9753 1.99495 17.7284 4.66843 16.0139 6.27318C14.3044 4.68442 10.9663 2.02237 8.46163 3.42814C5.96751 4.82803 6.73664 8.8928 7.3149 11.1357C4.98831 11.7764 1 13.1564 1 15.9759C1 18.7874 4.98416 20.2888 7.29698 20.9289C6.71658 23.1842 5.98596 27.1909 8.48327 28.5877C10.9973 29.9932 14.325 27.3945 16.0554 25.7722C17.7809 27.3864 20.9966 30.0021 23.4922 28.6014C25.9956 27.1963 25.3436 23.1184 24.7653 20.8625C27.0073 20.221 31 18.7523 31 15.9759C31 13.1835 26.9903 11.7923 24.7004 11.1537ZM24.4162 19.667C24.0365 18.5016 23.524 17.2623 22.8971 15.9821C23.4955 14.7321 23.9881 13.5088 24.3572 12.3509C26.0359 12.8228 29.7185 13.9013 29.7185 15.9759C29.7185 18.07 26.1846 19.1587 24.4162 19.667ZM22.85 27.526C20.988 28.571 18.2221 26.0696 16.9478 24.8809C17.7932 23.9844 18.638 22.9422 19.4625 21.7849C20.9129 21.6602 22.283 21.4562 23.5256 21.1777C23.9326 22.7734 24.7202 26.4763 22.85 27.526ZM9.12362 27.5111C7.26143 26.47 8.11258 22.8946 8.53957 21.2333C9.76834 21.4969 11.1286 21.6865 12.5824 21.8008C13.4123 22.9332 14.2816 23.9741 15.1576 24.8857C14.0753 25.9008 10.9945 28.557 9.12362 27.5111ZM2.28149 15.9759C2.28149 13.874 5.94207 12.8033 7.65904 12.3326C8.03451 13.5165 8.52695 14.7544 9.12123 16.0062C8.51925 17.2766 8.01977 18.5341 7.64085 19.732C6.00369 19.2776 2.28149 18.0791 2.28149 15.9759ZM9.1037 4.50354C10.9735 3.45416 13.8747 6.00983 15.1159 7.16013C14.2444 8.06754 13.3831 9.1006 12.5603 10.2265C11.1494 10.3533 9.79875 10.5569 8.55709 10.8297C8.09125 9.02071 7.23592 5.55179 9.1037 4.50354ZM20.3793 11.5771C21.3365 11.6942 22.2536 11.85 23.1147 12.0406C22.8562 12.844 22.534 13.6841 22.1545 14.5453C21.6044 13.5333 21.0139 12.5416 20.3793 11.5771ZM16.0143 8.0481C16.6054 8.66897 17.1974 9.3623 17.7798 10.1145C16.5985 10.0603 15.4153 10.0601 14.234 10.1137C14.8169 9.36848 15.414 8.67618 16.0143 8.0481ZM9.8565 14.5444C9.48329 13.6862 9.16398 12.8424 8.90322 12.0275C9.75918 11.8418 10.672 11.69 11.623 11.5748C10.9866 12.5372 10.3971 13.5285 9.8565 14.5444ZM11.6503 20.4657C10.6679 20.3594 9.74126 20.2153 8.88556 20.0347C9.15044 19.2055 9.47678 18.3435 9.85796 17.4668C10.406 18.4933 11.0045 19.4942 11.6503 20.4657ZM16.0498 23.9915C15.4424 23.356 14.8365 22.6531 14.2448 21.8971C15.4328 21.9423 16.6231 21.9424 17.811 21.891C17.2268 22.6608 16.6369 23.3647 16.0498 23.9915ZM22.1667 17.4222C22.5677 18.3084 22.9057 19.1657 23.1742 19.9809C22.3043 20.1734 21.3652 20.3284 20.3757 20.4435C21.015 19.4607 21.6149 18.4536 22.1667 17.4222ZM18.7473 20.5941C16.9301 20.72 15.1016 20.7186 13.2838 20.6044C12.2509 19.1415 11.3314 17.603 10.5377 16.0058C11.3276 14.4119 12.2404 12.8764 13.2684 11.4158C15.0875 11.2825 16.9178 11.2821 18.7369 11.4166C19.7561 12.8771 20.6675 14.4086 21.4757 15.9881C20.6771 17.5812 19.7595 19.1198 18.7473 20.5941ZM22.8303 4.4666C24.7006 5.51254 23.8681 9.22726 23.4595 10.8426C22.2149 10.5641 20.8633 10.3569 19.4483 10.2281C18.6239 9.09004 17.7698 8.05518 16.9124 7.15949C18.1695 5.98441 20.9781 3.43089 22.8303 4.4666Z" fill="#53C1DE"/>
    </svg>
  )
}

/* ROOT */
export default function App() {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);

  useParticles(canvasRef);
  useCursor(cursorRef);
  useReveal();

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <canvas id="particles" ref={canvasRef} />
      <Navbar />
      <Hero />
      <Skills />
      <Servicos />
      <Projects />
      <Sobre />
      <Contato />
    </>
  );
}
