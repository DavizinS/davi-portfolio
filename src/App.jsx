import { useState } from "react";
import { FaLinkedin, FaInstagram, FaWhatsapp, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

// nav comp
function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#1a082d]/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-purple-300">Davi Santos</h1>

        {/* Nav pc*/}
        <nav className="hidden md:flex gap-6 text-sm text-white">
          <a href="#skills" className="hover:text-purple-400">Skills</a>
          <a href="#projetos" className="hover:text-purple-400">Projetos</a>
          <a href="#contato" className="hover:text-purple-400">Contato</a>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white text-2xl">
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0e0b16] text-white text-center py-4 space-y-4">
          <a href="#skills" onClick={() => setOpen(false)} className="block">Skills</a>
          <a href="#projetos" onClick={() => setOpen(false)} className="block">Projetos</a>
          <a href="#contato" onClick={() => setOpen(false)} className="block">Contato</a>
        </div>
      )}
    </header>
  );
}

export default function App() {
  return (
    <div className="bg-[#0e0b16] text-white font-sans scroll-smooth overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 text-center md:text-left px-6 pt-32 bg-gradient-to-br from-[#1f1533] via-[#100d1e] to-[#0e0b16]">
        <img src="/avatar.png" alt="Avatar" className="w-48 h-48 rounded-full border-4 border-purple-600 shadow-lg" />
        <div>
          <h1 className="text-5xl font-bold text-purple-300">Davi Santos</h1>
          <p className="mt-3 text-white/70 max-w-xl">
            Desenvolvedor focado em soluções digitais, automações e sistemas web. Estudante de ADS e criador do MensaLink.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
            <a href="#contato" className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-full font-semibold transition">
              Fale comigo
            </a>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 px-6 bg-[#181324] text-center">
        <h2 className="text-3xl font-bold text-purple-300 mb-10">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { name: "C#", icon: "/csharp-logo.png", desc: ".NET, ASP.NET Core" },
            { name: "Python", icon: "/python-logo.png", desc: "Scripts, automações, bots" },
            { name: "SQL", icon: "/sql-logo.png", desc: "PostgreSQL, modelagem" },
            { name: "Git & APIs", icon: "/git-logo.png", desc: "Versionamento, REST, Firebase" }
          ].map((s, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }}
              className="bg-white/5 p-6 rounded-xl border border-purple-500/20 hover:ring-1 hover:ring-purple-400 transition">
              <img src={s.icon} alt={s.name} className="w-10 h-10 mx-auto mb-2" />
              <p className="font-semibold text-purple-200">{s.name}</p>
              <p className="text-xs text-white/60">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projetos */}
      <section id="projetos" className="py-24 px-6 bg-[#0e0b16] text-center">
        <h2 className="text-3xl font-bold text-purple-300 mb-10">Projetos</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            {
              name: "MensaLink",
              img: "/mensalink.png",
              desc: "SaaS de gestão de pagamentos escolares",
              link: "https://mensalink.com.br"
            },
            {
              name: "Shopee Xpress",
              img: "/shopee-logo.png",
              desc: "Planilhas com análise logística e Tracking de Perfomance"
            }
          ].map((p, i) => (
            <motion.div key={i} whileHover={{ scale: 1.03 }}
              className="bg-white/5 p-6 rounded-xl border border-purple-500/10 shadow hover:shadow-purple-500/20 transition">
              <img src={p.img} alt={p.name} className="w-20 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-purple-200">{p.name}</h3>
              <p className="text-sm text-white/60 mb-4">{p.desc}</p>
              {p.link && (
                <a href={p.link} target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-purple-600 rounded-full text-sm hover:bg-purple-700 transition">
                  Ver Projeto <FaExternalLinkAlt className="text-xs" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contato */}
      <footer id="contato" className="py-20 bg-[#120926] text-center text-sm text-white/80">
        <h4 className="text-purple-300 font-bold mb-4">Contato</h4>
        <div className="flex justify-center gap-6 text-2xl mb-4">
          <a href="https://www.linkedin.com/in/davisantosrj" target="_blank" className="hover:text-purple-300"><FaLinkedin /></a>
          <a href="https://www.instagram.com/dev.davirj" target="_blank" className="hover:text-purple-300"><FaInstagram /></a>
          <a href="https://wa.me/5521959280486" target="_blank" className="hover:text-purple-300"><FaWhatsapp /></a>
        </div>
        <p className="text-xs">Todos os direitos reservados © Davi Santos</p>
      </footer>
    </div>
  );
}
