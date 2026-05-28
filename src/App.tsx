import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowDown, 
  Check, 
  HelpCircle, 
  Lock, 
  Plug, 
  Sparkles, 
  MessageSquare, 
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
  ShieldCheck,
  CheckCircle,
  TrendingUp,
  Cpu
} from 'lucide-react';
import GlowBackground from './components/GlowBackground';
import InteractiveSimulator from './components/InteractiveSimulator';
import BusinessModel from './components/BusinessModel';
import ContactQR from './components/ContactQR';
import HeroAnimatedBackground from './components/HeroAnimatedBackground';
// @ts-ignore
import logo from './assets/logo.svg';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Smooth scroll handler helper
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 font-sans ${
      isDarkMode 
        ? 'bg-[#050505] text-slate-150 selection:bg-cyan-500/30 selection:text-white' 
        : 'bg-[#fafafa] text-slate-800 selection:bg-cyan-500/10 selection:text-slate-900'
    }`}>
      {/* Immersive Background */}
      <GlowBackground isDarkMode={isDarkMode} />

      {/* HEADER: Minimalist, clean design */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        isDarkMode ? 'bg-[#050505]/80 border-white/10' : 'bg-white/80 border-slate-200/80 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); scrollToId('hero-section'); }}
              className="group flex items-center gap-2.5 focus:outline-none"
            >
              {/* Loaded Dynamically from assets/logo.svg */}
              <div className="group-hover:scale-105 transition-all duration-300 w-10 h-10 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="VIVE-X" 
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(34,211,238,0.25)]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className={`font-display font-bold text-2xl tracking-tighter select-none transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-950'
              }`}>
                VIVE-X
              </span>
            </a>
            
            {/* Subtle slogan in desktop */}
            <span className={`hidden md:inline-block h-4 w-[1px] mx-3 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
            <span className={`hidden md:inline-block text-xs font-mono tracking-wider ${
              isDarkMode ? 'text-slate-500' : 'text-slate-450'
            }`}>
              "Tus datos son tuyos"
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToId('como-funciona-section')}
              className={`text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer ${
                isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Cómo funciona
            </button>
            <button
              onClick={() => scrollToId('interactive-simulator')}
              className={`text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer ${
                isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Simulador
            </button>
            <button
              onClick={() => scrollToId('services-section')}
              className={`text-xs font-mono tracking-widest uppercase transition-colors cursor-pointer ${
                isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Servicios y BSL
            </button>
            <button
              onClick={() => scrollToId('contact-section')}
              className={`text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                isDarkMode 
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:text-white' 
                  : 'bg-slate-900 border-slate-950 text-white hover:bg-slate-800'
              }`}
            >
              Contacto
            </button>

            {/* Premium Theme Switcher Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border transition-all duration-300 flex items-center justify-center cursor-pointer ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 text-amber-400 hover:bg-white/10' 
                  : 'bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200 shadow-sm'
              }`}
              title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </nav>

          {/* Mobile Actions Container */}
          <div className="flex md:hidden items-center gap-2">
            {/* Quick theme change in header bar */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
                isDarkMode ? 'bg-white/5 border-white/10 text-amber-400' : 'bg-slate-100 border-slate-200 text-indigo-600'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg focus:outline-none cursor-pointer transition-colors ${
                isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-950 hover:bg-slate-105'
              }`}
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOB MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-x-0 top-18 z-40 backdrop-blur-lg border-b shadow-2xl md:hidden px-6 py-8 flex flex-col gap-6 ${
              isDarkMode ? 'bg-[#050505]/95 border-white/10' : 'bg-white/95 border-slate-200'
            }`}
          >
            <button
              onClick={() => scrollToId('como-funciona-section')}
              className={`text-sm font-semibold tracking-wide text-left ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-950'}`}
            >
              🛠️ Cómo funciona
            </button>
            <button
              onClick={() => scrollToId('interactive-simulator')}
              className={`text-sm font-semibold tracking-wide text-left ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-950'}`}
            >
              ⚙️ Simulador interactivo
            </button>
            <button
              onClick={() => scrollToId('services-section')}
              className={`text-sm font-semibold tracking-wide text-left ${isDarkMode ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-950'}`}
            >
              💼 Servicios y BSL
            </button>
            <button
              onClick={() => scrollToId('contact-section')}
              className={`text-sm font-semibold tracking-wide text-left ${isDarkMode ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-705 hover:text-cyan-700'}`}
            >
              📧 Contactar / Solicitar Demo
            </button>
            <div className={`h-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
            <div className={`text-center font-mono text-[9px] ${isDarkMode ? 'text-slate-500' : 'text-slate-450'}`}>
              "Tus datos son tuyos" • VIVE-X España 2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE ONE-PAGE SECTIONS */}
      <main className="relative z-10 w-full pt-18">

        {/* SECTION 1: HERO */}
        <section 
          id="hero-section" 
          className="relative min-h-[calc(100vh-4.5rem)] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden"
        >
          {/* Animated canvas network nodes inside the hero block */}
          <HeroAnimatedBackground isDarkMode={isDarkMode} />

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            
            {/* Interactive Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-widest mx-auto ${
                isDarkMode 
                  ? 'bg-cyan-550/10 border border-cyan-500/20 text-cyan-400' 
                  : 'bg-cyan-50 border border-cyan-200 text-cyan-800'
              }`}
            >
              <span>Facturación Electrónica España</span>
            </motion.div>

            {/* Title & Headline */}
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`text-4xl sm:text-6xl md:text-7xl font-extrabold font-display leading-[0.98] sm:leading-[0.92] md:leading-[0.9] tracking-tight bg-clip-text text-transparent ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-white via-slate-100 to-slate-400' 
                  : 'bg-gradient-to-r from-slate-900 via-slate-950 to-slate-700'
              }`}
            >
              Facturación electrónica. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Sin ataduras.
              </span>
            </motion.h1>

            {/* Sincere, impactful description */}
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.25 }}
              className={`max-w-2xl mx-auto text-sm sm:text-base md:text-xl font-light leading-relaxed ${
                isDarkMode ? 'text-slate-400' : 'text-slate-650'
              }`}
            >
              Funciona con tu programa actual. Tus datos son tuyos. <br />
              <strong className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Nosotros nos ocupamos de Hacienda.</strong>
            </motion.p>

            {/* Dynamic, non-overlapping CTA block */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              {/* Main CTA: Prominent button */}
              <button
                id="cta-hero-main"
                onClick={() => scrollToId('contact-section')}
                className={`w-full sm:w-auto px-8 py-4 font-bold rounded-2xl text-lg hover:scale-103 active:scale-97 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                  isDarkMode 
                    ? 'bg-white text-black hover:bg-slate-100 shadow-white/5' 
                    : 'bg-slate-950 text-white hover:bg-slate-850 shadow-slate-900/10'
                }`}
              >
                <span>Solicitar información</span>
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Secondary CTA: Direct scroll to simulator demo */}
              <button
                id="cta-hero-secondary"
                onClick={() => scrollToId('interactive-simulator')}
                className={`w-full sm:w-auto px-6 py-4 font-semibold text-sm rounded-2xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isDarkMode
                    ? 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-slate-300 hover:text-white'
                    : 'bg-slate-100 hover:bg-slate-150 border-slate-205 text-slate-700 hover:text-slate-900 shadow-sm'
                }`}
              >
                <span>Saber más / Ver Simulador</span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>
            </motion.div>

            {/* Quick Slogan footer */}
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5, delay: 0.55 }}
              className={`text-[10px] sm:text-xs font-mono tracking-wider font-semibold uppercase pt-4 ${
                isDarkMode ? 'text-slate-500' : 'text-slate-450'
              }`}
            >
              "Facturar no debería ser un problema."
            </motion.p>

            {/* Hero Down Arrow Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.6, 0], y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
              className="pt-6 hidden lg:flex flex-col items-center justify-center cursor-pointer"
              onClick={() => scrollToId('como-funciona-section')}
            >
              <span className={`text-[10px] font-mono tracking-widest uppercase mb-1 ${
                isDarkMode ? 'text-slate-550' : 'text-slate-450'
              }`}>
                Conoce las ventajas
              </span>
              <ArrowDown className={`w-4 h-4 ${isDarkMode ? 'text-slate-700' : 'text-slate-400'}`} />
            </motion.div>

          </div>
        </section>


        {/* SECTION 2: COMO FUNCIONA (3 PILLARS + INTEGRATION SIMULATOR) */}
        <section 
          id="como-funciona-section" 
          className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        >
          <div className="max-w-7xl mx-auto space-y-12">
            
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight leading-tight uppercase italic ${
                isDarkMode ? 'text-white' : 'text-slate-950'
              }`}>
                El "Sidecar Fiscal": Tu software intacto, nosotros el trámite.
              </h2>
              <p className={`text-xs sm:text-sm md:text-base leading-relaxed font-light ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                VIVE-X se coloca al lado de tus sistemas. No tienes que mudarte de software ni formarte de nuevo. Sin lock-in comercial, sin datos que salgan fuera de España.
              </p>
            </div>

            {/* 3 Visual Pillars directly replicating design HTML patterns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Pillar 1 */}
              <div className={`p-6 border rounded-3xl space-y-3 transition-all duration-300 flex flex-col items-start text-left ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:border-cyan-500/20 hover:bg-white/8' 
                  : 'bg-white border-slate-200 hover:border-cyan-550/40 hover:bg-slate-50 shadow-sm'
              }`}>
                <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center text-cyan-400 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8"/><path d="m16 6-4 4-4-4"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 18h.01"/><path d="M10 18h.01"/></svg>
                </div>
                <div>
                  <h3 className={`text-lg font-bold font-display ${isDarkMode ? 'text-white' : 'text-slate-955'}`}>
                    Funciona con tu programa
                  </h3>
                  <p className={`text-sm mt-1 leading-snug ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Odoo, FacturaScripts, Excel... lo que uses. Sin cambiar tu forma de trabajar ni perder un solo minuto de operación técnica.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className={`p-6 border rounded-3xl space-y-3 transition-all duration-300 flex flex-col items-start text-left ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:border-blue-500/20 hover:bg-white/8' 
                  : 'bg-white border-slate-200 hover:border-blue-550/40 hover:bg-slate-50 shadow-sm'
              }`}>
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <div>
                  <h3 className={`text-lg font-bold font-display ${isDarkMode ? 'text-white' : 'text-slate-955'}`}>
                    Tus datos son tuyos
                  </h3>
                  <p className={`text-sm mt-1 leading-snug ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Sin contratos con permanencia. Despliegas donde tú decidas: tu propio local, nube privada o VPS. Sin sorpresas comerciales ni lock-in.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className={`p-6 border rounded-3xl space-y-3 transition-all duration-300 flex flex-col items-start text-left ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:border-emerald-500/20 hover:bg-white/8' 
                  : 'bg-white border-slate-200 hover:border-emerald-555/40 hover:bg-slate-50 shadow-sm'
              }`}>
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <h3 className={`text-lg font-bold font-display ${isDarkMode ? 'text-white' : 'text-slate-955'}`}>
                    Nosotros lo hacemos
                  </h3>
                  <p className={`text-sm mt-1 leading-snug ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Firma digital criptográfica, encadenamiento Verifactu automático y envío directo certificado a Hacienda. Tu ERP solo envía un JSON simple.
                  </p>
                </div>
              </div>

            </div>

            {/* Interactive simulator widget embedded in the layout flow */}
            <InteractiveSimulator isDarkMode={isDarkMode} />

          </div>
        </section>

        {/* SECTION: PHILOSOPHY & SERVICES */}
        <section 
          id="services-section" 
          className={`relative px-4 sm:px-6 lg:px-8 border-t transition-colors duration-300 ${
            isDarkMode ? 'border-white/5 bg-[#070707]/20' : 'border-slate-200 bg-slate-50/30'
          }`}
        >
          <BusinessModel isDarkMode={isDarkMode} />
        </section>


        {/* SECTION 3: CIERRE / CONTACTO */}
        <section 
          id="contact-section" 
          className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-24"
        >
          <div className="max-w-7xl mx-auto space-y-8">
            {/* The contact panel */}
            <ContactQR isDarkMode={isDarkMode} />

            {/* Embedded Mini Trust message */}
            <div className={`text-center max-w-xl mx-auto text-[10px] md:text-xs font-mono tracking-wide ${
              isDarkMode ? 'text-slate-500' : 'text-slate-500'
            }`}>
              <span className={`font-semibold uppercase block mb-1 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-700'
              }`}>VIVE-X Sistemas y Servicios</span> 
              Cumple el Reglamento de Facturación de España (Real Decreto 1007/2023) • Sello Oficial Verifactu garantizado por diseño • Formato estructurado FacturaE.
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
