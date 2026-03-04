import { useState, useEffect, useRef } from "react";
import "./App.css";

/*SKILLS*/
const SKILLS = [
  {
    id: "csharp",
    label: "C#",
    name: "C# / .NET",
    desc: "Back-end robusto, APIs RESTful e sistemas corporativos com ASP.NET Core.",
    tags: [".NET 8", "ASP.NET Core", "EF Core"],
    learning: false,
  },
  {
    id: "python",
    label: "Py",
    name: "Python",
    desc: "Scripts de automação, bots, pipelines de dados e integrações.",
    tags: ["Automação", "Bots", "FastAPI"],
    learning: false,
  },
  {
    id: "sql",
    label: "SQL",
    name: "SQL & Bancos",
    desc: "Modelagem relacional, queries otimizadas e arquitetura de dados.",
    tags: ["PostgreSQL", "Modelagem", "Migrations"],
    learning: false,
  },
  {
    id: "git",
    label: "Git",
    name: "Git & APIs",
    desc: "Versionamento profissional, integração com APIs externas e Firebase.",
    tags: ["Git/GitHub", "REST", "Firebase"],
    learning: false,
  },
  {
    id: "java",
    label: "☕",
    name: "Java",
    desc: "Aprendendo orientação a objetos, estruturas de dados e back-end Java. Cursando na Faetec.",
    tags: ["POO", "Faetec", "Em curso"],
    learning: true,
    iconStyle: {
      background: "rgba(249,115,22,.08)",
      borderColor: "rgba(249,115,22,.2)",
      color: "#fb923c",
    },
  },
];

const PROJECTS = [
  {
    id: "encontravagas",
    num: "001",
    name: "EncontraVagas.Rio",
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
    id: "mensalink",
    num: "002",
    name: "MensaLink",
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
    id: "shopee",
    num: "003",
    name: "Shopee Xpress",
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
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/davisantosrj",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/dev.davirj",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5521959280486",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

/*particulas do canva*/
function useParticles(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, particles = [], raf;

    const CHARS = ["</", "{}", "=>", "&&", "||", "()", "[]", "/*", "*/", "01", "10", ">>"];
    const COLORS = ["rgba(245,166,35,", "rgba(60,232,204,", "rgba(232,234,240,"];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    function spawn() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
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
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -20) Object.assign(p, spawn(), { y: H + 10 });
      });
      raf = requestAnimationFrame(draw);
    }

    resize();
    particles = Array.from({ length: 55 }, spawn);
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

/*cursor*/
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

    const targets = document.querySelectorAll("a, button, .project-item, .skill-card");
    const addBig = () => cur.classList.add("big");
    const rmBig  = () => cur.classList.remove("big");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", addBig);
      el.addEventListener("mouseleave", rmBig);
    });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", addBig);
        el.removeEventListener("mouseleave", rmBig);
      });
    };
  }, [cursorRef]);
}


function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}


function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <nav className="nav">
        <a href="#hero" className="nav-logo">davi.dev</a>
        <ul className="nav-links">
          <li><a href="#skills" onClick={close}>Skills</a></li>
          <li><a href="#projetos" onClick={close}>Projetos</a></li>
          <li><a href="#sobre" onClick={close}>Sobre</a></li>
          <li><a href="#contato" onClick={close}>Contato</a></li>
        </ul>
        <button className="nav-mobile-btn" onClick={() => setOpen(true)} aria-label="Abrir menu">
          ☰
        </button>
      </nav>

      <div className={`nav-mobile-menu${open ? " open" : ""}`}>
        <button className="nav-mobile-close" onClick={close}>✕</button>
        <a href="#skills"   onClick={close}>Skills</a>
        <a href="#projetos" onClick={close}>Projetos</a>
        <a href="#sobre"    onClick={close}>Sobre</a>
        <a href="#contato"  onClick={close}>Contato</a>
      </div>
    </>
  );
}


function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-inner">
        <p className="hero-eyebrow">Desenvolvedor &amp; Criador de Produtos</p>
        <h1 className="hero-name">
          Davi<em>Santos.</em>
        </h1>
        <p className="hero-desc">
          Transformo ideias em software real. Sistemas web, automações e produtos digitais
          construídos com atenção ao detalhe — do back-end ao produto final.
        </p>
        <div className="hero-cta-row">
          <a href="#projetos" className="btn-primary">
            <IconArrow /> Ver projetos
          </a>
          <a href="#contato" className="btn-ghost">Fale comigo</a>
        </div>
      </div>
      <div className="hero-scroll">scroll</div>
    </section>
  );
}

//minhas skills
function Skills() {
  return (
    <section id="skills" className="skills-bg">
      <div className="section">
        <div className="section-label"><span className="section-num">01</span> Stack</div>
        <h2 className="section-title reveal">Skills &amp;<br />Ferramentas</h2>
        <p className="skills-intro reveal">
          Focado em construir sistemas robustos e produtos que escalam. Tecnologias que uso no dia a dia:
        </p>

        <div className="skills-grid">
          {SKILLS.map((s) => (
            <div
              key={s.id}
              className={`skill-card reveal${s.learning ? " skill-card--learning" : ""}`}
            >
              {s.learning && <span className="skill-learning-badge">Em andamento</span>}
              <div className="skill-icon-fallback" style={s.iconStyle || {}}>
                {s.label}
              </div>
              <p className="skill-name">{s.name}</p>
              <p className="skill-desc">{s.desc}</p>
              <div className="skill-tags">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className={`skill-tag${s.learning ? " skill-tag--learning" : ""}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function Projects() {
  return (
    <section id="projetos" className="projects-bg">
      <div className="section">
        <div className="section-label"><span className="section-num">02</span> Trabalho</div>
        <h2 className="section-title reveal">Projetos<br />selecionados.</h2>

        <div className="projects-list">
          {PROJECTS.map(({ id, num, name, desc, tech, link, img, LogoFallback }) => (
            <div key={id} className="project-item reveal">
              <div>
                <p className="project-num">{num}</p>
                <h3 className="project-name">{name}</h3>
                <p className="project-desc">{desc}</p>
                <div className="project-tech">
                  {tech.map((t) => (
                    <span key={t} className="project-tag">{t}</span>
                  ))}
                </div>
                {link && (
                  <a href={link} target="_blank" rel="noreferrer" className="project-link">
                    Ver projeto
                  </a>
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
  return (
    <img
      src={img}
      alt={alt}
      onError={() => setBroken(true)}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  );
}


function Sobre() {
  const [photoError, setPhotoError] = useState(false);

  return (
    <section id="sobre" className="sobre-bg">
      <div className="section">
        <div className="section-label"><span className="section-num">03</span> Sobre</div>

        <div className="sobre-grid">
          {/* Foto */}
          <div className="sobre-left">
            <div className="sobre-photo-wrap reveal">
              {!photoError ? (
                <img
                  src="/avatar.png"
                  alt="Davi Santos"
                  onError={() => setPhotoError(true)}
                />
              ) : (
                <div className="sobre-photo-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                  <span>Adicione sua foto:<br />/avatar.png</span>
                </div>
              )}
              <div className="sobre-photo-glow" />
            </div>
          </div>

          {/* Texto + Stats */}
          <div>
            <h2 className="section-title reveal">Quem sou<br />eu.</h2>
            <div className="sobre-text reveal">
              <p>
                Estudante de{" "}
                <span className="sobre-highlight">Análise e Desenvolvimento de Sistemas</span>,
                apaixonado por construir produtos que resolvem problemas reais — não só código que funciona.
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
                { num: "2+",  label: "anos de experiência" },
                { num: "3",   label: "produtos lançados" },
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


const WA_NUMBER = "5521959294663";

function buildWhatsAppUrl({ name, subject, email, message }) {
  const subjectLabel = subject || "Assunto não especificado";
  const text =
    `Olá, me chamo *${name}*.\n` +
    `Vim aqui para tratar do assunto: *${subjectLabel}*\n\n` +
    `${message}\n\n` +
    `E-mail para retorno: ${email}`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

function Contato() {
  const [form, setForm]     = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();

    //Validação
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      return;
    }

    const url = buildWhatsAppUrl(form);
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus(null), 5000);
  }

  return (
    <section id="contato" className="contato-bg">
      <div className="section">
        <div className="section-label"><span className="section-num">04</span> Contato</div>

        <div className="contact-grid">
          {/* Info */}
          <div>
            <h2 className="section-title reveal">
              Vamos trabalhar<br /><em>juntos?</em>
            </h2>
            <p className="contact-info-text reveal">
              Aberto a projetos freelance, parcerias e oportunidades full-time.<br />
              Me conta sua ideia — respondo rápido.
            </p>
            <div className="contact-direct reveal">
              {SOCIALS.map(({ label, href, icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="contact-direct-item">
                  {icon} {label === "WhatsApp" ? "+55 (21) 95929-4663" : label === "LinkedIn" ? "linkedin.com/in/davisantosrj" : "@dev.davirj"}
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="contact-form reveal" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="cf-name">Nome</label>
                <input
                  className="form-input" id="cf-name" type="text"
                  placeholder="Seu nome" value={form.name}
                  onChange={set("name")} required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="cf-email">E-mail</label>
                <input
                  className="form-input" id="cf-email" type="email"
                  placeholder="seu@email.com" value={form.email}
                  onChange={set("email")} required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="cf-subject">Assunto</label>
              <select
                className="form-select" id="cf-subject"
                value={form.subject} onChange={set("subject")}
              >
                <option value="">Selecione um assunto…</option>
                <option value="freelance">Projeto Freelance</option>
                <option value="job">Oportunidade de emprego</option>
                <option value="parceria">Parceria / Colaboração</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="cf-msg">Mensagem</label>
              <textarea
                className="form-textarea" id="cf-msg"
                placeholder="Me conta sobre seu projeto ou oportunidade…"
                value={form.message} onChange={set("message")} required
              />
            </div>

            <div className="form-submit">
              <div>
                <p className="form-note">// Vai entrar em contato pelo Whatsapp.</p>
                {status === "success" && (
                  <p className="form-status success">// Pronto! Agora é só enviar a mensagem. ✓</p>
                )}
                {status === "error" && (
                  <p className="form-status error">// Preencha nome, e-mail e mensagem.</p>
                )}
              </div>
              <button type="submit" className="btn-primary">
                <IconSend /> Enviar via WhatsApp
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 DAVI SANTOS — TODOS OS DIREITOS RESERVADOS</p>
          <p className="footer-built">Construído com <span>curiosidade</span> &amp; café</p>
        </div>
      </div>
    </section>
  );
}


function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17l9.2-9.2M17 17V7H7" />
    </svg>
  );
}
function IconSend() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
    </svg>
  );
}


export default function App() {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);

  useParticles(canvasRef);
  useCursor(cursorRef);
  useReveal();

  return (
    <>
      {/* Cursor dot */}
      <div id="cursor" ref={cursorRef} />

      {/* Canvas de partículas */}
      <canvas id="particles" ref={canvasRef} />

      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Sobre />
      <Contato />
    </>
  );
}
