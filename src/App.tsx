import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect } from "react";

export default function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-pink-500/30 overflow-x-hidden">
      {/* Background Mesh Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-6">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("portfolio")}
            className="flex items-center gap-2 font-bold text-xl"
          >
            <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center text-xs">
              P
            </div>
            <p>Portfolio</p>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex! gap-10 items-center">
            {["AboutMe", "Experience", "Projects"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="relative text-sm font-medium text-white/80 hover:text-white transition"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-pink-500 transition-all duration-300 hover:w-full" />
              </button>
            ))}

            <button
              onClick={() => scrollToSection("Contact")}
              className="bg-white text-black px-6 py-2 rounded-lg text-sm font-bold"
            >
              Contact
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="fixed top-22 left-0 w-full bg-black/95 backdrop-blur-md border-t border-white/10 md:hidden z-40"
            >
              <div className="flex flex-col px-6 py-8 gap-6">
                {[
                  { id: "AboutMe", label: "ABOUT ME" },
                  { id: "Experience", label: "EXPERIENCE" },
                  { id: "Projects", label: "PROJECTS" },
                  { id: "Contact", label: "CONTACT" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      scrollToSection(item.id);
                      setOpen(false);
                    }}
                    className="text-left text-lg font-bold tracking-widest hover:text-pink-400 transition"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <section
          id="portfolio"
          className="min-h-screen flex flex-col items-center justify-center text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative mb-8 group">
              <div className="absolute inset-0 bg-pink-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <div className="relative w-32 h-32 md:w-48 md:h-48 bg-gray-800 rounded-full mx-auto overflow-hidden border border-white/10 ring-8 ring-white/5 shadow-2xl">
                <img
                  src="https://img5.pic.in.th/file/secure-sv1/565126b0-27b8-4671-995e-92bc1833175e.jpg"
                  alt="Avatar"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-[100px] font-black mb-4 tracking-tighter leading-none bg-linear-to-b from-white to-gray-500 bg-clip-text text-transparent">
              Aunchana <br className="md:hidden" /> Kongmanee!
            </h1>
            <p className="text-lg md:text-2xl font-medium mb-8 text-gray-300">
              Student{" "}
              <span className="text-pink-500 italic font-serif">
                {" "}
                Computer Science{" "}
              </span>
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              className="h-px bg-pink-500 mx-auto mb-8"
            />
            <p className="max-w-xl mx-auto text-gray-400 tracking-[0.2em] uppercase text-xs md:text-sm mb-10">
              | Building Frontend Projects OGS |
            </p>
            <button
              onClick={() => scrollToSection("Contact")}
              className="group relative px-10 py-4 bg-transparent border border-white/20 rounded-full overflow-hidden transition-all"
            >
              <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 group-hover:text-black font-bold uppercase tracking-widest text-sm">
                Contact Me
              </span>
            </button>
          </motion.div>
        </section>

        {/* About Me */}
        <section id="AboutMe" className="py-32 px-6 max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
              ABOUT ME
            </h2>
            <p className="text-pink-500 text-xs font-black tracking-[0.5em] mb-16">
              EXPLORE NOW
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {[
                { label: "English Name", val: "Aunchan Kongmanee" },
                { label: "Level", val: "Bachelor’s Degree (4-year)" },
                { label: "Faculty", val: "Science and Technology" },
                { label: "Major", val: "Computer Science" },
              ].map((info, i) => (
                <motion.div
                  key={i}
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
                >
                  <p className="text-pink-500 text-[10px] uppercase font-bold mb-1">
                    {info.label}
                  </p>
                  <p className="text-lg font-medium text-gray-200">
                    {info.val}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 p-8 border border-pink-500/20 rounded-3xl bg-linear-to-br from-pink-500/5 to-transparent">
              <h3 className="text-2xl font-bold mb-2">
                Loei Rajabhat University
              </h3>
              <p className="text-gray-400">June 6 2022 - March 13 2026</p>
            </div>
          </motion.div>
        </section>

        {/* Experience */}
        <section id="Experience" className="py-32 px-6 max-w-5xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
              EXPERIENCE
            </h2>
            <p className="text-pink-500 text-xs font-bold tracking-[0.5em] mt-2">
              CAREER PATH
            </p>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            className="relative border-l border-white/10 pl-8 ml-4"
          >
            <div className="absolute w-4 h-4 bg-pink-500 rounded-full -left-2.25 top-0 shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
            <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-2">
              <div>
                <h3 className="text-2xl font-bold text-white italic">
                  One Geo Survey{" "}
                  <span className="text-pink-500 font-normal">
                    / Internship
                  </span>
                </h3>
                <p className="text-gray-400 mt-2 max-w-lg">
                  Frontend Internship. Building modern web interfaces and
                  learning industry-standard workflows.
                </p>
              </div>
              <span className="text-gray-500 text-xs font-mono bg-white/5 px-4 py-1 rounded-full border border-white/10">
                NOV 2025 - FEB 2026
              </span>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="flex gap-3 flex-wrap"
            >
              {["Javascript", "Node.js", "React", "Typescript", "Tailwind"].map(
                (tag) => (
                  <motion.span
                    key={tag}
                    variants={{
                      initial: { opacity: 0, scale: 0.8 },
                      whileInView: { opacity: 1, scale: 1 },
                    }}
                    className="text-[10px] px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/5 text-pink-300 font-bold uppercase tracking-wider"
                  >
                    {tag}
                  </motion.span>
                )
              )}
            </motion.div>
          </motion.div>
        </section>

        {/* Projects */}
        <section id="Projects" className="py-32 px-6 max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
              PROJECTS
            </h2>
            <p className="text-pink-500 text-xs font-bold tracking-[0.5em] mt-2">
              WORK SAMPLES
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            {[
              {
                name: "OGS Daily News",
                desc: "Modern News Platform using React Router for seamless navigation.",
                tag: "React Router",
                image: "https://img2.pic.in.th/pic/-2025-12-19-161344.png",
              },
              {
                name: "List User Management",
                desc: "State management application using Redux for complex data flow.",
                tag: "React Redux",
                image:
                  "https://img5.pic.in.th/file/secure-sv1/-2025-12-22-113332.png",
              },
              {
                name: "borrowing and returning equipment and sports areas at Loei Rajabhat University",
                desc: "Web Application Built With System Development Life Cycle : SDLC ADDIE Model, Visual Studio Code, MySQL, CSS, JavaScript, React, Node.js",
                tag: "Project",
                image:
                  "https://img5.pic.in.th/file/secure-sv1/-2025-12-24-162547.png",
              },
            ].map((proj, idx) => (
              <motion.div
                key={proj.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
                className="group bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden hover:border-pink-500/50 transition-all duration-500 shadow-2xl"
              >
                <div className="relative w-full overflow-hidden bg-[#111] flex items-center justify-center p-2 min-h-62.5">
                  <div
                    className="absolute inset-0 opacity-20 blur-2xl scale-150 transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${proj.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold uppercase">
                      {proj.tag}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="font-bold text-2xl mb-2 group-hover:text-pink-400 transition-colors">
                    {proj.name}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {proj.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Contact Section */}
      <section id="Contact" className="py-32 px-6">
        <motion.div
          whileInView={{ opacity: 1, scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          className="max-w-4xl mx-auto bg-linear-to-b from-white/10 to-transparent p-16 rounded-[4rem] text-center border border-white/10"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            Contact
          </h2>
          <p className="text-pink-500 text-xs font-bold tracking-[0.5em] mb-12 uppercase">
            Internship
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12">
            {[
              { name: "GitHub", url: "https://github.com/UserMiniBaby" },
              { name: "GitLab", url: "https://gitlab.com/UserMiniBaby" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-bold hover:text-pink-500 transition-colors flex items-center justify-center gap-2 group"
              >
                {link.name}
                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        <footer className="mt-24 text-center pb-12 opacity-40 text-[10px] uppercase tracking-[0.3em]">
          © 2025 Aunchana Kongmanee • Developed with Passion
        </footer>
      </section>
    </div>
  );
}
